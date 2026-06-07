"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash params from the URL (Supabase puts tokens there)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        // Also check for code in query params (PKCE flow)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");
        const errorDescription = urlParams.get("error_description");

        if (error) {
          setStatus("error");
          setMessage(errorDescription || error);
          return;
        }

        if (code) {
          // Exchange code for session
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setStatus("error");
            setMessage(exchangeError.message);
            return;
          }
          setStatus("success");
          return;
        }

        if (accessToken && refreshToken) {
          // Set session from tokens
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) {
            setStatus("error");
            setMessage(sessionError.message);
            return;
          }
          setStatus("success");
          return;
        }

        // Try to get existing session (maybe redirect already set cookies)
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setStatus("success");
          return;
        }

        setStatus("error");
        setMessage("No authentication data found in URL.");
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Unknown error");
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="win95-border bg-[#c0c0c0] max-w-md w-full">
        {/* Title bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between text-sm font-bold">
          <span>📧 Email Verification</span>
          <div className="flex gap-1">
            <span className="win95-button px-1 text-xs">×</span>
          </div>
        </div>

        <div className="p-6 text-center">
          {status === "loading" && (
            <>
              <div className="text-4xl mb-4">📡</div>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
                Verifying your email...
              </h2>
              <div className="dialup-progress h-4 max-w-xs mx-auto mb-4">
                <div className="h-full bg-[#000080] animate-pulse" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-gray-600">
                Connecting to mail server... please wait...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
                Email Verified!
              </h2>
              <pre className="text-[10px] text-green-700 mb-4 leading-relaxed">{`
  ╔══════════════════════════╗
  ║   WELCOME TO DIAL-UP!   ║
  ║                          ║
  ║  Your account is active  ║
  ║  You are now one of us   ║
  ╚══════════════════════════╝
              `}</pre>
              <p className="text-sm mb-4">
                Your screen name is confirmed. Time to explore the web like it&apos;s 1997.
              </p>
              <div className="space-y-2">
                <Link href="/" className="win95-button block text-center px-4 py-2 no-underline text-black font-bold">
                  🖥️ Enter Dial-Up
                </Link>
                <Link href="/profile" className="win95-button block text-center px-4 py-2 no-underline text-black text-sm">
                  👤 Set Up Your Homepage
                </Link>
              </div>
              <p className="text-[10px] text-gray-500 mt-4">
                Remember: 2 hours daily. Make every minute count.
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-lg font-bold mb-2 text-red-700" style={{ fontFamily: "Tahoma, Arial, sans-serif" }}>
                Verification Failed
              </h2>
              <div className="bg-white win95-border-inset p-3 mb-4 text-left">
                <p className="text-xs font-mono text-red-600">
                  ERROR: {message || "Could not verify email"}
                </p>
              </div>
              <p className="text-sm mb-4">
                The link may have expired. Try signing up again.
              </p>
              <div className="space-y-2">
                <Link href="/signup" className="win95-button block text-center px-4 py-2 no-underline text-black">
                  📝 Try Again
                </Link>
                <Link href="/" className="win95-button block text-center px-4 py-2 no-underline text-black text-sm">
                  🏠 Back to Home
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Status bar */}
        <div className="bg-[#c0c0c0] border-t border-gray-400 px-2 py-0.5 text-[10px] text-gray-600">
          {status === "loading" && "⏳ Connecting to authentication server..."}
          {status === "success" && "✅ Connected — Welcome aboard!"}
          {status === "error" && "❌ Connection failed"}
        </div>
      </div>
    </div>
  );
}
