"use client";

import { Toolbar } from "@/components/Toolbar";
import { DialUpUpload } from "@/components/DialUpUpload";
import { Win95Window } from "@/components/Win95Window";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#008080]">
      <Toolbar currentPath="/~upload" />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <DialUpUpload
              onComplete={(url) => {
                console.log("Upload complete:", url);
              }}
            />
          </div>

          <div>
            <Win95Window title="📋 Upload Rules">
              <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs space-y-3">
                <div className="bg-yellow-50 border border-yellow-300 p-2">
                  <p className="font-bold mb-1">📸 Daily Upload Limit: 1 photo per day</p>
                  <p className="text-[10px] text-gray-600">
                    Make it count. When you can only post once, every post matters.
                  </p>
                </div>

                <div>
                  <p className="font-bold mb-1">What happens to your photo:</p>
                  <ul className="list-disc pl-4 space-y-1 text-[10px] text-gray-700">
                    <li>Downscaled to 320x240 (authentic 90s webcam resolution)</li>
                    <li>Scanlines added (CRT monitor effect)</li>
                    <li>Color shifted (warm, slightly oversaturated)</li>
                    <li>Uploaded line-by-line with dial-up speed simulation</li>
                    <li>Everyone sees it load slowly — that&apos;s the experience!</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold mb-1">Why the limits?</p>
                  <p className="text-[10px] text-gray-700">
                    Modern social media wants you to post constantly. We want you to post ONCE and make it meaningful. Like taking a photo on a disposable camera — you only have 27 shots, so every one counts.
                  </p>
                </div>

                <div className="border-t border-gray-300 pt-2 text-center">
                  <p className="text-[10px] text-gray-400 italic">
                    &quot;The best camera is the one you actually think before using.&quot;
                  </p>
                </div>
              </div>
            </Win95Window>

            <div className="mt-4">
              <Win95Window title="🖼️ Recent Uploads from the Community">
                <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { user: "SurferDude99", desc: "sunset at the beach 🌅", color: "#ff6633" },
                      { user: "CyberGrrl", desc: "my cat Mr. Whiskers 🐱", color: "#9966cc" },
                      { user: "SkaterBoi", desc: "new deck!! 🛹", color: "#339933" },
                      { user: "AngelWings", desc: "coffee & coding ☕", color: "#cc6699" },
                      { user: "HackerMan", desc: "my setup 💻", color: "#336699" },
                      { user: "NightOwl_2000", desc: "3am vibes 🌙", color: "#333366" },
                    ].map((post) => (
                      <div key={post.user} className="text-center">
                        <div
                          className="w-full aspect-square win95-border-inset flex items-center justify-center text-2xl"
                          style={{ backgroundColor: post.color }}
                        >
                          {post.desc.slice(-2)}
                        </div>
                        <div className="text-[9px] mt-1 text-cyan-700 font-bold">{post.user}</div>
                        <div className="text-[8px] text-gray-500 truncate">{post.desc}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[10px] text-gray-400 mt-3">
                    All photos uploaded at 28.8kbps • 320x240 resolution
                  </p>
                </div>
              </Win95Window>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
