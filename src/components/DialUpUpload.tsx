"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Win95Window } from "./Win95Window";

interface DialUpUploadProps {
  onComplete?: (imageUrl: string) => void;
}

function playDialUpNoise(duration: number) {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const noise = ctx.createBufferSource();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);

    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);
  } catch {}
}

export function DialUpUpload({ onComplete }: DialUpUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanLines, setScanLines] = useState(0);
  const [phase, setPhase] = useState<"idle" | "connecting" | "uploading" | "processing" | "done">("idle");
  const [statusText, setStatusText] = useState("Ready to upload.");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const revealImage = useCallback((imageSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const maxW = 320;
      const maxH = 240;
      const scale = Math.min(maxW / img.width, maxH / img.height);
      const w = Math.floor(img.width * scale);
      const h = Math.floor(img.height * scale);

      canvas.width = w;
      canvas.height = h;

      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, w, h);

      let currentLine = 0;
      const linesPerTick = 2;
      const totalLines = h;

      const revealInterval = setInterval(() => {
        const endLine = Math.min(currentLine + linesPerTick, totalLines);

        ctx.drawImage(
          img,
          0, currentLine * (img.height / h),
          img.width, linesPerTick * (img.height / h),
          0, currentLine,
          w, endLine - currentLine
        );

        // Add scanline + noise effect to revealed area
        for (let y = currentLine; y < endLine; y++) {
          if (y % 2 === 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, y, w, 1);
          }
        }

        currentLine = endLine;
        setScanLines(currentLine);
        setProgress(Math.floor((currentLine / totalLines) * 100));

        if (currentLine >= totalLines) {
          clearInterval(revealInterval);

          // Add final CRT/low-quality effects
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
          for (let y = 0; y < h; y += 2) {
            ctx.fillRect(0, y, w, 1);
          }

          // Slight color shift
          const imageData = ctx.getImageData(0, 0, w, h);
          const pixels = imageData.data;
          for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = Math.min(255, pixels[i] + 10);     // R boost
            pixels[i + 1] = Math.max(0, pixels[i + 1] - 5); // G reduce
            pixels[i + 2] = Math.min(255, pixels[i + 2] + 15); // B boost
          }
          ctx.putImageData(imageData, 0, 0);

          setPhase("done");
          setStatusText("Upload complete! 📸");
          onComplete?.(canvas.toDataURL());
        }
      }, 80);
    };
    img.src = imageSrc;
  }, [onComplete]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const startUpload = () => {
    if (!imagePreview) return;

    setUploading(true);
    setPhase("connecting");
    setStatusText("Connecting to Dial-Up image server...");
    setProgress(0);
    playDialUpNoise(15);

    setTimeout(() => {
      setPhase("uploading");
      setStatusText("Uploading via 28.8kbps modem... please wait...");

      setTimeout(() => {
        setPhase("processing");
        setStatusText("Processing image (applying 90s webcam quality)...");

        setTimeout(() => {
          revealImage(imagePreview);
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const reset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setUploading(false);
    setProgress(0);
    setScanLines(0);
    setPhase("idle");
    setStatusText("Ready to upload.");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Win95Window title="📸 Dial-Up Image Upload v1.0">
      <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
        {/* Info banner */}
        <div className="bg-yellow-100 border border-yellow-400 p-2 mb-3 text-[10px]">
          ⚠️ Uploads are limited to 1 per day. Images are processed through our 90s Webcam Quality Filter™ (320x240 max, added scanlines, color shift). This is a feature, not a bug.
        </div>

        {/* File select */}
        {!uploading && (
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="win95-button text-xs"
              >
                📁 Choose File...
              </button>
              <span className="text-gray-500 text-[10px]">
                {selectedFile ? selectedFile.name : "No file selected"}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Preview before upload */}
        {imagePreview && !uploading && (
          <div className="mb-3">
            <div className="text-[10px] text-gray-500 mb-1">Original (this will be degraded to 90s quality):</div>
            <div className="bg-black p-2 win95-border-inset inline-block">
              <img src={imagePreview} alt="Preview" className="max-w-[200px] max-h-[150px] pixelated" />
            </div>
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="mb-3">
            {/* Canvas for line-by-line reveal */}
            <div className="bg-black p-2 win95-border-inset flex justify-center mb-3">
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="pixelated"
                style={{ backgroundColor: "#1a1a1a" }}
              />
            </div>

            {/* Progress bar */}
            <div className="dialup-progress mb-2">
              <div className="dialup-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-[10px]">
              <span>{statusText}</span>
              <span className="font-mono">{progress}%</span>
            </div>

            {/* Speed info */}
            <div className="text-[10px] text-gray-400 mt-1">
              Speed: 28,800 bps | {scanLines} lines rendered | ETA: who knows lol
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          {!uploading && imagePreview && (
            <button onClick={startUpload} className="win95-button text-xs font-bold">
              📤 Upload (Slowly)
            </button>
          )}
          {phase === "done" && (
            <button onClick={reset} className="win95-button text-xs">
              🔄 Upload Another (tomorrow)
            </button>
          )}
          {uploading && phase !== "done" && (
            <div className="flex items-center gap-2">
              <span className="blink text-red-600 text-[10px]">● UPLOADING</span>
              <span className="text-[10px] text-gray-500">Please don&apos;t pick up the phone...</span>
            </div>
          )}
        </div>
      </div>
    </Win95Window>
  );
}
