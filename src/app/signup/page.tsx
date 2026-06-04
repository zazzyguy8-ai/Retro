"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const SCREEN_NAME_SUGGESTIONS = [
  "~*CyberKnight*~",
  "ShadowSurfer99",
  "xX_DarkPhoenix_Xx",
  "MoonWalker_2000",
  "PixelDreamer",
  "NeonRider",
  "ByteStorm",
  "StarChaser97",
];

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screenName, setScreenName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!screenName.trim()) {
      setError("You need a screen name! Every netizen needs one.");
      return;
    }
    if (screenName.length < 3) {
      setError("Screen name too short! At least 3 characters.");
      return;
    }
    if (!email.includes("@")) {
      setError("That doesn't look like a valid email address...");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters. Hackers are everywhere!");
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp(email, password, screenName.trim());
    setLoading(false);

    if (authError) {
      setError(authError);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#c0c0c0] win95-border max-w-md w-full">
          <div className="win95-titlebar">
            <span>✅ Registration Complete!</span>
          </div>
          <div className="p-6 text-center font-[Tahoma,Arial,sans-serif] text-black">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">Welcome to Dial-Up!</h2>
            <p className="text-sm mb-4">
              Your account has been created, <b>{screenName}</b>!
            </p>
            <div className="bg-yellow-100 border border-yellow-400 p-3 mb-4 text-xs text-left">
              📧 Check your email for a confirmation link. Once confirmed, you can log in and start building your homepage!
            </div>
            <Link href="/login">
              <button className="win95-button px-6 py-2 font-bold">
                🖱️ Go to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-4xl font-bold fire-text mb-2"
            style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
          >
            DIAL-UP
          </h1>
          <p className="text-cyan-400 text-sm">Join the revolution. Get your own homepage.</p>
        </div>

        {/* Registration window */}
        <div className="bg-[#c0c0c0] win95-border">
          <div className="win95-titlebar">
            <span>📝 New Member Registration — Dial-Up Networks</span>
            <span className="flex gap-0.5">
              <span className="win95-button !px-1 !py-0 text-xs">_</span>
              <span className="win95-button !px-1 !py-0 text-xs">□</span>
              <span className="win95-button !px-1 !py-0 text-xs">✕</span>
            </span>
          </div>
          <div className="p-4 font-[Tahoma,Arial,sans-serif] text-black text-xs">
            <div className="bg-blue-50 border border-blue-300 p-2 mb-4 text-[10px]">
              👋 Welcome! Fill out the form below to create your Dial-Up account. It&apos;s free forever and we don&apos;t sell your data. We don&apos;t even want it.
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Screen Name */}
              <div>
                <label className="font-bold block mb-1">
                  🏷️ Screen Name: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={screenName}
                  onChange={(e) => setScreenName(e.target.value)}
                  placeholder="~YourCoolName~"
                  className="win95-border-inset w-full px-2 py-1.5 bg-white text-black"
                  maxLength={30}
                />
                <div className="text-[10px] text-gray-500 mt-1">
                  This is how people will know you. Make it cool! Suggestions:{" "}
                  {SCREEN_NAME_SUGGESTIONS.slice(0, 3).map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setScreenName(s)}
                      className="text-blue-600 underline mx-0.5"
                    >
                      {s}{i < 2 ? "," : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-bold block mb-1">
                  📧 Email Address: <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="win95-border-inset w-full px-2 py-1.5 bg-white text-black"
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-bold block mb-1">
                  🔒 Password: <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="win95-border-inset w-full px-2 py-1.5 bg-white text-black"
                />
                <div className="text-[10px] text-gray-500 mt-1">
                  🔐 Minimum 6 characters. Don&apos;t use &quot;password123&quot; please.
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-100 border border-gray-300 p-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="mt-0.5" required />
                  <span className="text-[10px] text-gray-700">
                    I understand that Dial-Up will limit my screen time to 2 hours daily (1 hour on weekends), will kick me out at midnight, and will tell me to &quot;go outside&quot; regularly. I accept this because I want to have a life. 🌿
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-100 border border-red-400 p-2 text-red-700 text-[10px]">
                  ❌ {error}
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center justify-between pt-2">
                <Link href="/login" className="text-blue-600 underline text-[10px]">
                  Already have an account? Log in
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="win95-button px-6 py-2 font-bold"
                >
                  {loading ? "⏳ Creating account..." : "🖱️ Sign Me Up!"}
                </button>
              </div>
            </form>

            <hr className="my-3" />
            <p className="text-center text-[9px] text-gray-400">
              No cookies. No tracking. No ads. No algorithm. Just vibes.
              <br />
              © 1997 Dial-Up Networks Inc.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-500 text-xs hover:text-cyan-400">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
