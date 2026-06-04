"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const DIALUP_PHASES = [
  "Initializing modem...",
  "Dialing ISP: 1-800-DIAL-UP...",
  "ATDT 18005553927...",
  "Connecting at 28,800 bps...",
  "Verifying username and password...",
  "Negotiating network protocols...",
  "Establishing PPP connection...",
  "Assigned IP: 192.168.0.97",
  "Connected! Welcome to Dial-Up.",
];

const VISITOR_BASE = 8472;

function DialUpIntro({ onComplete }: { onComplete: () => void }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const playDialUpSound = useCallback(() => {
    const ctx = new AudioContext();
    setAudioCtx(ctx);
    const now = ctx.currentTime;

    const dial = ctx.createOscillator();
    const dialGain = ctx.createGain();
    dial.type = "square";
    dial.frequency.setValueAtTime(350, now);
    dial.frequency.setValueAtTime(440, now + 0.5);
    dialGain.gain.setValueAtTime(0.08, now);
    dialGain.gain.setValueAtTime(0, now + 1);
    dial.connect(dialGain).connect(ctx.destination);
    dial.start(now);
    dial.stop(now + 1);

    const handshake = ctx.createOscillator();
    const hGain = ctx.createGain();
    handshake.type = "sawtooth";
    handshake.frequency.setValueAtTime(1200, now + 1.2);
    handshake.frequency.linearRampToValueAtTime(2400, now + 2);
    handshake.frequency.linearRampToValueAtTime(300, now + 2.5);
    handshake.frequency.linearRampToValueAtTime(1800, now + 3);
    hGain.gain.setValueAtTime(0.06, now + 1.2);
    hGain.gain.setValueAtTime(0, now + 3.5);
    handshake.connect(hGain).connect(ctx.destination);
    handshake.start(now + 1.2);
    handshake.stop(now + 3.5);

    const noise = ctx.createBufferSource();
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03;
    }
    noise.buffer = noiseBuffer;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.4, now + 1);
    nGain.gain.setValueAtTime(0, now + 4);
    noise.connect(nGain).connect(ctx.destination);
    noise.start(now + 1);
    noise.stop(now + 4);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timers: NodeJS.Timeout[] = [];
    DIALUP_PHASES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrentPhase(i);
          if (i === DIALUP_PHASES.length - 1) {
            setTimeout(onComplete, 1500);
          }
        }, i * 600 + 500)
      );
    });

    return () => {
      timers.forEach(clearTimeout);
      audioCtx?.close();
    };
  }, [isPlaying, onComplete, audioCtx]);

  if (!isPlaying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 overflow-hidden">
        <pre className="text-green-400 text-[6px] sm:text-sm mb-8 text-center leading-relaxed">
{`
 ██████╗  ██╗ █████╗ ██╗       ██╗   ██╗██████╗
 ██╔══██╗ ██║██╔══██╗██║       ██║   ██║██╔══██╗
 ██║  ██║ ██║███████║██║  ███  ██║   ██║██████╔╝
 ██║  ██║ ██║██╔══██║██║       ██║   ██║██╔═══╝
 ██████╔╝ ██║██║  ██║███████╗  ╚██████╔╝██║
 ╚═════╝  ╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝ ╚═╝
`}
        </pre>
        <p className="text-gray-400 mb-8 text-sm">The Internet You Remember</p>
        <button
          onClick={() => {
            playDialUpSound();
            setIsPlaying(true);
          }}
          className="win95-button text-lg px-8 py-3 hover:bg-gray-300 transition-none"
        >
          🖱️ Click to Connect
        </button>
        <p className="text-gray-600 text-xs mt-4">Best viewed in Netscape Navigator 4.0 • 800x600 resolution</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black font-mono p-4">
      <div className="w-full max-w-lg">
        <div className="win95-titlebar mb-0">
          <span>📞 Dial-Up Connection</span>
          <span className="flex gap-1">
            <span className="win95-button !px-1 !py-0 text-xs">_</span>
            <span className="win95-button !px-1 !py-0 text-xs">□</span>
            <span className="win95-button !px-1 !py-0 text-xs">✕</span>
          </span>
        </div>
        <div className="bg-[#c0c0c0] p-4 win95-border">
          <div className="bg-black p-4 win95-border-inset min-h-[250px]">
            {DIALUP_PHASES.slice(0, currentPhase + 1).map((phase, i) => (
              <div
                key={i}
                className={`text-sm mb-1 ${
                  i === currentPhase ? "text-green-400" : "text-green-800"
                }`}
              >
                {i < currentPhase ? "✓" : ">"} {phase}
              </div>
            ))}
            {currentPhase < DIALUP_PHASES.length - 1 && (
              <span className="text-green-400 blink">█</span>
            )}
          </div>
          <div className="mt-3 dialup-progress">
            <div
              className="dialup-progress-bar"
              style={{
                width: `${((currentPhase + 1) / DIALUP_PHASES.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center font-[Tahoma,Arial,sans-serif]">
            Connected at {currentPhase > 2 ? "28,800" : "..."} bps
          </p>
        </div>
      </div>
    </div>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState(VISITOR_BASE);
  useEffect(() => {
    setCount(VISITOR_BASE + Math.floor(Math.random() * 200));
  }, []);

  return (
    <div className="flex items-center justify-center gap-1 my-4">
      <span className="text-yellow-300 text-xs">You are visitor #</span>
      <div className="flex">
        {String(count).padStart(6, "0").split("").map((d, i) => (
          <span
            key={i}
            className="bg-black text-red-500 border border-gray-600 px-1 font-mono text-sm"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueeText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="marquee inline-block">{children}</div>
    </div>
  );
}

function GuestbookPreview() {
  const entries = [
    { name: "~*xXDarkAngelXx*~", msg: "Cool site!!! A/S/L? 😎", date: "03/15/1997" },
    { name: "SurferDude99", msg: "This place ROCKS! Bookmarked!!", date: "03/12/1997" },
    { name: "CyberGrrl", msg: "OMG finally a place thats not all corporate!! ❤️", date: "03/10/1997" },
    { name: "NightOwl_2000", msg: "signed ur guestbook!! sign mine back plz", date: "03/08/1997" },
  ];

  return (
    <div className="bg-black/50 p-3 win95-border-inset">
      <h3 className="text-yellow-300 text-center mb-2 text-sm">
        📖 Latest Guestbook Entries
      </h3>
      {entries.map((e, i) => (
        <div key={i} className="border-b border-green-900 py-2 text-xs">
          <span className="text-cyan-400">{e.name}</span>
          <span className="text-gray-500"> ({e.date})</span>
          <p className="text-green-300 mt-1">{e.msg}</p>
        </div>
      ))}
    </div>
  );
}

function MainSite() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className={`min-h-screen crt-on ${showContent ? "opacity-100" : "opacity-0"}`}>
      {/* Top toolbar */}
      <div className="bg-[#c0c0c0] border-b-2 border-gray-600 px-2 py-1 flex items-center gap-2 text-xs font-[Tahoma,Arial,sans-serif] text-black sticky top-0 z-50">
        <span className="font-bold">📍 Location:</span>
        <div className="flex-1 bg-white win95-border-inset px-2 py-0.5 text-xs">
          http://www.dial-up.net/~home
        </div>
        <button className="win95-button text-xs">Go!</button>
      </div>

      {/* Under construction banner */}
      <div className="under-construction">
        <div className="bg-black text-center py-1">
          <span className="text-yellow-300 blink text-xs">
            ⚠️ THIS SITE IS UNDER CONSTRUCTION ⚠️
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-purple-900 py-2 border-y border-purple-500">
        <MarqueeText>
          <span className="rainbow text-lg font-bold">
            ★ ★ ★ Welcome to DIAL-UP — The Internet You Remember ★ ★ ★ Where the web is slow, the vibes are real, and your mom can&apos;t call while you&apos;re online ★ ★ ★
          </span>
        </MarqueeText>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Main title */}
        <div className="text-center my-8">
          <h1 className="text-4xl sm:text-6xl font-bold fire-text mb-2" style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}>
            DIAL-UP
          </h1>
          <p className="text-cyan-300 text-lg">
            ~ The World&apos;s First Anti-Social Media ~
          </p>
          <hr className="retro my-4" />
          <p className="rainbow text-sm font-bold">
            We don&apos;t want your attention. We want you to have a life.
          </p>
        </div>

        <VisitorCounter />

        {/* Navigation as 90s table layout */}
        <div className="bg-[#c0c0c0] win95-border p-1 my-6">
          <div className="win95-titlebar">
            <span>🌐 Dial-Up Navigator</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3">
            {[
              { icon: "🏠", label: "My Homepage", desc: "Build your site" },
              { icon: "💬", label: "Chat Rooms", desc: "ICQ style" },
              { icon: "📧", label: "You've Got Mail", desc: "Slow mail" },
              { icon: "📋", label: "Forums", desc: "phpBB vibes" },
              { icon: "🔗", label: "Web Rings", desc: "Explore" },
              { icon: "🎮", label: "Arcade", desc: "Retro games" },
              { icon: "📻", label: "Radio", desc: "MIDI jams" },
              { icon: "🛒", label: "Marketplace", desc: "Trade stuff" },
            ].map((item) => (
              <button
                key={item.label}
                className="win95-button flex flex-col items-center py-3 px-2 hover:bg-gray-200"
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-xs font-bold">{item.label}</span>
                <span className="text-[10px] text-gray-600">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* What is Dial-Up section */}
        <div className="my-8">
          <div className="bg-[#c0c0c0] win95-border">
            <div className="win95-titlebar">
              <span>📄 readme.txt — What is Dial-Up?</span>
            </div>
            <div className="p-4 text-black text-sm font-[Tahoma,Arial,sans-serif]">
              <p className="mb-3">
                <b>Dial-Up</b> is everything the internet used to be — and everything modern social media isn&apos;t.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <b>📸 Post once a day.</b> One photo. One thought. Make it count. No infinite scroll, no spam.
                </li>
                <li>
                  <b>⏳ Everything loads slow.</b> On purpose. Feel that dial-up connection. Appreciate what you see.
                </li>
                <li>
                  <b>🚪 We kick you out.</b> 2 hours daily max. After that, the screen goes dark. Go outside.
                </li>
                <li>
                  <b>💬 Chat has limits.</b> 25 messages with someone? We&apos;ll tell you both: &quot;Go grab a coffee instead.&quot;
                </li>
                <li>
                  <b>🌙 We sleep at midnight.</b> Even the internet needs rest. So do you.
                </li>
                <li>
                  <b>📵 Weekends = 1 hour only.</b> It&apos;s the weekend. Touch grass. See friends. Live.
                </li>
                <li>
                  <b>🤖 No algorithm.</b> No recommendations. No &quot;suggested for you.&quot; Just a chronological feed and Web Rings.
                </li>
              </ul>
              <hr className="my-3" />
              <p className="text-center italic text-gray-600">
                &quot;Every other platform wants your attention. We want you to have a life.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Stats / info boxes */}
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="bg-black border-2 border-green-500 p-4 text-center">
            <div className="text-3xl font-bold text-green-400 pulse-glow">2h</div>
            <div className="text-green-600 text-xs mt-1">Daily Limit</div>
            <div className="text-gray-500 text-[10px] mt-1">Then we turn off your screen</div>
          </div>
          <div className="bg-black border-2 border-cyan-500 p-4 text-center">
            <div className="text-3xl font-bold text-cyan-400 pulse-glow">25</div>
            <div className="text-cyan-600 text-xs mt-1">Messages Then...</div>
            <div className="text-gray-500 text-[10px] mt-1">&quot;Go out together&quot;</div>
          </div>
          <div className="bg-black border-2 border-purple-500 p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 pulse-glow">0</div>
            <div className="text-purple-600 text-xs mt-1">Algorithms</div>
            <div className="text-gray-500 text-[10px] mt-1">Just real people</div>
          </div>
        </div>

        {/* Guestbook */}
        <GuestbookPreview />

        {/* Sign up section */}
        <div className="my-8 text-center">
          <div className="under-construction inline-block p-1">
            <div className="bg-black px-8 py-6">
              <h2 className="text-yellow-300 text-2xl font-bold mb-2 blink">
                ★ JOIN THE REVOLUTION ★
              </h2>
              <p className="text-green-400 text-sm mb-4">
                Get your own homepage. Chat with real humans. Log off and live.
              </p>
              <Link href="/signup">
                <button className="win95-button text-lg px-8 py-3 hover:bg-gray-200">
                  🖱️ Sign Me Up!
                </button>
              </Link>
              <p className="text-gray-600 text-xs mt-3">
                Free forever. We don&apos;t sell your data. We don&apos;t even want it.
              </p>
            </div>
          </div>
        </div>

        {/* Web ring */}
        <div className="text-center my-6 border border-dashed border-green-800 p-3">
          <p className="text-yellow-300 text-xs mb-2">🔗 This site is part of the</p>
          <p className="text-cyan-400 font-bold">Anti-Social Media Web Ring</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="win95-button text-xs">← Prev</button>
            <button className="win95-button text-xs">Random</button>
            <button className="win95-button text-xs">Next →</button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center my-8 text-xs text-gray-500">
          <hr className="retro mb-4" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>📧 webmaster@dial-up.net</span>
            <span>|</span>
            <span>Made with ❤️ and 28.8kbps</span>
          </div>
          <p className="text-[10px]">
            © 1997 Dial-Up Networks Inc. All rights reserved.
            <br />
            Best viewed in 800x600 with Netscape Navigator 4.0
            <br />
            This page has been accessed{" "}
            <span className="text-green-400">
              {(VISITOR_BASE + 147).toLocaleString()}
            </span>{" "}
            times since March 1, 1997
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <span className="border border-gray-600 px-2 py-0.5 text-[9px]">
              🏆 Best of the Web &apos;97
            </span>
            <span className="border border-gray-600 px-2 py-0.5 text-[9px]">
              ✅ Bobby Approved
            </span>
            <span className="border border-gray-600 px-2 py-0.5 text-[9px]">
              🔵 Netscape Now!
            </span>
          </div>
          <p className="text-[9px] text-gray-700 mt-3">
            No cookies. No tracking. No ads. No algorithm. Just vibes.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  const [connected, setConnected] = useState(false);

  return connected ? <MainSite /> : <DialUpIntro onComplete={() => setConnected(true)} />;
}
