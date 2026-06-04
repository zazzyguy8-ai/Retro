"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn(email, password);
    setLoading(false);

    if (authError) {
      setError(authError);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <pre className="text-green-400 text-[8px] sm:text-xs mb-4 leading-tight">
{`
 ██████╗  ██╗ █████╗ ██╗       ██╗   ██╗██████╗
 ██╔══██╗ ██║██╔══██╗██║       ██║   ██║██╔══██╗
 ██║  ██║ ██║███████║██║  ███  ██║   ██║██████╔╝
 ██║  ██║ ██║██╔══██║██║       ██║   ██║██╔═══╝
 ██████╔╝ ██║██║  ██║███████╗  ╚██████╔╝██║
 ╚═════╝  ╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝ ╚═╝
`}
          </pre>
          <p className="text-gray-400 text-sm">Connect to the internet you remember</p>
        </div>

        {/* Login window */}
        <div className="bg-[#c0c0c0] win95-border">
          <div className="win95-titlebar">
            <span>🔑 Dial-Up Network Login</span>
            <span className="flex gap-0.5">
              <span className="win95-button !px-1 !py-0 text-xs">_</span>
              <span className="win95-button !px-1 !py-0 text-xs">□</span>
              <span className="win95-button !px-1 !py-0 text-xs">✕</span>
            </span>
          </div>
          <div className="p-4 font-[Tahoma,Arial,sans-serif] text-black text-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🖥️</div>
              <div>
                <p className="font-bold">Welcome back to Dial-Up!</p>
                <p className="text-[10px] text-gray-600">
                  Enter your credentials to connect.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="font-bold block mb-1">📧 Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="win95-border-inset w-full px-2 py-1.5 bg-white text-black"
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1">🔒 Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="win95-border-inset w-full px-2 py-1.5 bg-white text-black"
                  required
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" />
                <span className="text-[10px]">💾 Save password (don&apos;t if this is a shared computer!)</span>
              </label>

              {error && (
                <div className="bg-red-100 border border-red-400 p-2 text-red-700 text-[10px]">
                  ❌ {error}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <Link href="/signup" className="text-blue-600 underline text-[10px]">
                  New here? Sign up!
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="win95-button px-6 py-2 font-bold"
                >
                  {loading ? "📞 Connecting..." : "📞 Connect"}
                </button>
              </div>
            </form>

            <hr className="my-3" />

            <div className="text-center text-[9px] text-gray-500">
              <p>Trouble connecting? Make sure nobody is using the phone line.</p>
              <p className="mt-1">© 1997 Dial-Up Networks Inc.</p>
            </div>
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
