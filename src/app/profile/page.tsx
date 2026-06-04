"use client";

import { useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Win95Window } from "@/components/Win95Window";

const BACKGROUNDS = [
  { name: "Stars", value: "star-bg", preview: "⭐" },
  { name: "Matrix", value: "bg-black", preview: "🟩" },
  { name: "Ocean", value: "bg-[#000080]", preview: "🌊" },
  { name: "Fire", value: "bg-[#330000]", preview: "🔥" },
  { name: "Purple Haze", value: "bg-[#1a0033]", preview: "🟣" },
  { name: "Midnight", value: "bg-[#0a0a1a]", preview: "🌙" },
];

const MIDI_SONGS = [
  { name: "None", file: "" },
  { name: "♪ Take On Me", file: "take-on-me" },
  { name: "♪ Careless Whisper", file: "careless-whisper" },
  { name: "♪ Never Gonna Give You Up", file: "never-gonna" },
  { name: "♪ Wonderwall", file: "wonderwall" },
  { name: "♪ Smells Like Teen Spirit", file: "teen-spirit" },
  { name: "♪ Macarena", file: "macarena" },
];

const CURSORS = [
  { name: "Default", value: "auto" },
  { name: "Crosshair", value: "crosshair" },
  { name: "Wait (Hourglass)", value: "wait" },
  { name: "Help (?)", value: "help" },
  { name: "Move (+)", value: "move" },
];

const FONTS = [
  "Comic Sans MS",
  "Courier New",
  "Times New Roman",
  "Papyrus",
  "Impact",
  "Arial Black",
];

const TEXT_COLORS = [
  { name: "Matrix Green", value: "#00ff00" },
  { name: "Cyber Cyan", value: "#00ffff" },
  { name: "Hot Pink", value: "#ff69b4" },
  { name: "Sunset Orange", value: "#ff6600" },
  { name: "Electric Yellow", value: "#ffff00" },
  { name: "Ghost White", value: "#ffffff" },
  { name: "Laser Red", value: "#ff0000" },
];

interface ProfileConfig {
  username: string;
  tagline: string;
  bio: string;
  background: string;
  font: string;
  textColor: string;
  cursor: string;
  midi: string;
  showGuestbook: boolean;
  showVisitorCounter: boolean;
  showUnderConstruction: boolean;
  showWebRing: boolean;
  marqueeText: string;
  interests: string;
  favoriteLinks: string;
}

const DEFAULT_PROFILE: ProfileConfig = {
  username: "~CoolDude97~",
  tagline: "Welcome to my corner of the web!",
  bio: "Hey! I'm just a regular person who loves the OLD internet. Remember when websites had personality? When you could hear someone's homepage? When loading a page was an EVENT? Yeah, me too. That's why I'm here.\n\nI believe in slow internet, real conversations, and going outside sometimes.",
  background: "star-bg",
  font: "Comic Sans MS",
  textColor: "#00ff00",
  cursor: "auto",
  midi: "never-gonna",
  showGuestbook: true,
  showVisitorCounter: true,
  showUnderConstruction: true,
  showWebRing: true,
  marqueeText: "★ Welcome to my homepage! ★ Sign my guestbook! ★ You're awesome! ★",
  interests: "Retro computing, 90s music, skateboarding, pizza, Star Wars, Tamagotchi",
  favoriteLinks: "http://www.spacejam.com\nhttp://www.hampsterdance.com\nhttp://www.zombo.com",
};

const GUESTBOOK_ENTRIES = [
  { name: "~*StarGazer*~", msg: "Awesome page dude!! Luv the music 🎵", date: "06/02/1997", color: "#ff69b4" },
  { name: "ByteMe_2000", msg: "A/S/L? cool site, signed ur guestbook!!", date: "05/28/1997", color: "#00ffff" },
  { name: "SkaterBoi", msg: "DUDE this page is SICK! How did u get the fire text??", date: "05/25/1997", color: "#ff6600" },
  { name: "AngelWings", msg: "~*~visited and signed~*~ come check out my page too!! xoxo", date: "05/20/1997", color: "#ff69b4" },
  { name: "HackerMan", msg: "nice HTML skills bro. keep it up 👍", date: "05/15/1997", color: "#00ff00" },
];

function ProfileEditor({
  config,
  setConfig,
}: {
  config: ProfileConfig;
  setConfig: (c: ProfileConfig) => void;
}) {
  return (
    <Win95Window title="🔧 Homepage Builder v2.0">
      <div className="space-y-3 text-xs text-black font-[Tahoma,Arial,sans-serif]">
        <div>
          <label className="font-bold block mb-1">Screen Name:</label>
          <input
            type="text"
            value={config.username}
            onChange={(e) => setConfig({ ...config, username: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black"
            maxLength={30}
          />
        </div>

        <div>
          <label className="font-bold block mb-1">Tagline:</label>
          <input
            type="text"
            value={config.tagline}
            onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black"
            maxLength={80}
          />
        </div>

        <div>
          <label className="font-bold block mb-1">About Me:</label>
          <textarea
            value={config.bio}
            onChange={(e) => setConfig({ ...config, bio: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black h-20 resize-none"
            maxLength={500}
          />
        </div>

        <div>
          <label className="font-bold block mb-1">Marquee Text:</label>
          <input
            type="text"
            value={config.marqueeText}
            onChange={(e) => setConfig({ ...config, marqueeText: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black"
            maxLength={100}
          />
        </div>

        <div>
          <label className="font-bold block mb-1">Interests:</label>
          <input
            type="text"
            value={config.interests}
            onChange={(e) => setConfig({ ...config, interests: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black"
          />
        </div>

        <div>
          <label className="font-bold block mb-1">Favorite Links (one per line):</label>
          <textarea
            value={config.favoriteLinks}
            onChange={(e) => setConfig({ ...config, favoriteLinks: e.target.value })}
            className="win95-border-inset w-full px-2 py-1 bg-white text-black h-16 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold block mb-1">Background:</label>
            <div className="flex flex-wrap gap-1">
              {BACKGROUNDS.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => setConfig({ ...config, background: bg.value })}
                  className={`win95-button px-2 py-1 text-xs ${config.background === bg.value ? "win95-border-inset bg-gray-300" : ""}`}
                >
                  {bg.preview} {bg.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Text Color:</label>
            <div className="flex flex-wrap gap-1">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setConfig({ ...config, textColor: c.value })}
                  className={`win95-button px-2 py-1 text-xs ${config.textColor === c.value ? "win95-border-inset bg-gray-300" : ""}`}
                >
                  <span style={{ color: c.value }}>■</span> {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold block mb-1">Font:</label>
            <select
              value={config.font}
              onChange={(e) => setConfig({ ...config, font: e.target.value })}
              className="win95-border-inset w-full px-1 py-1 bg-white text-black"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold block mb-1">Cursor:</label>
            <select
              value={config.cursor}
              onChange={(e) => setConfig({ ...config, cursor: e.target.value })}
              className="win95-border-inset w-full px-1 py-1 bg-white text-black"
            >
              {CURSORS.map((c) => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="font-bold block mb-1">🎵 MIDI Background Music:</label>
          <select
            value={config.midi}
            onChange={(e) => setConfig({ ...config, midi: e.target.value })}
            className="win95-border-inset w-full px-1 py-1 bg-white text-black"
          >
            {MIDI_SONGS.map((s) => (
              <option key={s.file} value={s.file}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { key: "showGuestbook", label: "📖 Guestbook" },
            { key: "showVisitorCounter", label: "🔢 Visitor Counter" },
            { key: "showUnderConstruction", label: "🚧 Under Construction" },
            { key: "showWebRing", label: "🔗 Web Ring" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={config[key as keyof ProfileConfig] as boolean}
                onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </Win95Window>
  );
}

function ProfilePreview({ config }: { config: ProfileConfig }) {
  const visitorCount = 4721;

  return (
    <div
      className={`${config.background} min-h-[600px] p-2 sm:p-4 overflow-hidden`}
      style={{ color: config.textColor, fontFamily: config.font, cursor: config.cursor }}
    >
      {/* Under construction */}
      {config.showUnderConstruction && (
        <div className="under-construction mb-3">
          <div className="bg-black text-center py-1">
            <span className="text-yellow-300 blink text-xs">
              🚧 THIS PAGE IS UNDER CONSTRUCTION 🚧
            </span>
          </div>
        </div>
      )}

      {/* Marquee */}
      {config.marqueeText && (
        <div className="overflow-hidden whitespace-nowrap mb-4 py-1 border-y border-current/30">
          <div className="marquee inline-block rainbow font-bold text-sm">
            {config.marqueeText}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className="text-xl sm:text-4xl font-bold mb-2 fire-text break-words"
          style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
        >
          {config.username}&apos;s Homepage
        </h1>
        <p className="text-sm sm:text-lg italic opacity-80 break-words">{config.tagline}</p>
        <hr className="retro my-3" />
      </div>

      {/* Visitor counter */}
      {config.showVisitorCounter && (
        <div className="flex items-center justify-center gap-1 mb-4">
          <span className="text-yellow-300 text-xs">You are visitor #</span>
          <div className="flex">
            {String(visitorCount).padStart(6, "0").split("").map((d, i) => (
              <span key={i} className="bg-black text-red-500 border border-gray-600 px-1 font-mono text-sm">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MIDI player */}
      {config.midi && (
        <div className="bg-black/60 border border-gray-600 p-2 mb-4 max-w-xs mx-auto">
          <div className="flex items-center gap-2 text-xs">
            <span>🎵</span>
            <div className="flex-1 bg-[#1a1a1a] px-2 py-0.5 text-green-400 text-[10px] font-mono">
              NOW PLAYING: {MIDI_SONGS.find(s => s.file === config.midi)?.name || ""}
            </div>
            <div className="flex gap-1">
              <button className="win95-button !px-1 !py-0 text-[10px]">⏮</button>
              <button className="win95-button !px-1 !py-0 text-[10px]">▶</button>
              <button className="win95-button !px-1 !py-0 text-[10px]">⏭</button>
            </div>
          </div>
        </div>
      )}

      {/* About Me */}
      <div className="bg-black/40 border border-current/30 p-4 mb-4">
        <h2 className="text-xl font-bold mb-2 text-center">
          ~ About Me ~
        </h2>
        {config.bio.split("\n").map((line, i) => (
          <p key={i} className="text-sm mb-2 leading-relaxed">{line}</p>
        ))}
      </div>

      {/* Interests */}
      {config.interests && (
        <div className="bg-black/40 border border-current/30 p-4 mb-4">
          <h2 className="text-xl font-bold mb-2 text-center">
            ~ My Interests ~
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {config.interests.split(",").map((interest, i) => (
              <span key={i} className="bg-black/60 border border-current/30 px-2 py-1 text-xs">
                ★ {interest.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Links */}
      {config.favoriteLinks && (
        <div className="bg-black/40 border border-current/30 p-4 mb-4">
          <h2 className="text-xl font-bold mb-2 text-center">
            ~ Cool Links ~
          </h2>
          <ul className="text-sm space-y-1">
            {config.favoriteLinks.split("\n").filter(Boolean).map((link, i) => (
              <li key={i}>
                👉 <span className="text-cyan-400 underline cursor-pointer">{link.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Guestbook */}
      {config.showGuestbook && (
        <div className="bg-black/40 border border-current/30 p-4 mb-4">
          <h2 className="text-xl font-bold mb-3 text-center">
            📖 Sign My Guestbook!
          </h2>
          <div className="space-y-3 mb-4">
            {GUESTBOOK_ENTRIES.map((entry, i) => (
              <div key={i} className="border-b border-current/20 pb-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: entry.color }} className="font-bold text-sm">{entry.name}</span>
                  <span className="text-gray-500 text-[10px]">{entry.date}</span>
                </div>
                <p className="text-xs mt-1 opacity-80">{entry.msg}</p>
              </div>
            ))}
          </div>
          <div className="bg-black/40 p-2 border border-current/20">
            <div className="text-xs mb-1 font-bold">✍️ Leave a message:</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Your name..."
                className="win95-border-inset px-2 py-1 bg-white text-black text-xs w-full sm:flex-1"
              />
              <input
                type="text"
                placeholder="Your message..."
                className="win95-border-inset px-2 py-1 bg-white text-black text-xs w-full sm:flex-[2]"
              />
              <button className="win95-button text-xs shrink-0">Sign!</button>
            </div>
          </div>
        </div>
      )}

      {/* Web Ring */}
      {config.showWebRing && (
        <div className="text-center my-4 border border-dashed border-current/30 p-3">
          <p className="text-xs mb-1 opacity-60">🔗 This site is part of the</p>
          <p className="text-cyan-400 font-bold text-sm">Dial-Up Homepages Web Ring</p>
          <div className="flex justify-center gap-3 mt-2">
            <button className="win95-button text-xs">← Prev</button>
            <button className="win95-button text-xs">Random</button>
            <button className="win95-button text-xs">Next →</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-6 text-xs opacity-50">
        <hr className="retro mb-3" />
        <p>Made with Dial-Up Homepage Builder v2.0</p>
        <p>Last updated: June 4, 1997</p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="border border-current/20 px-1 text-[9px]">📧 Email Me</span>
          <span className="border border-current/20 px-1 text-[9px]">💬 ICQ: 48291637</span>
          <span className="border border-current/20 px-1 text-[9px]">🏠 AIM: {config.username}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_PROFILE);
  const [showEditor, setShowEditor] = useState(true);

  return (
    <div className="min-h-screen bg-[#008080]">
      <Toolbar currentPath="/~profile" />

      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowEditor(true)}
              className={`win95-button text-xs ${showEditor ? "win95-border-inset bg-gray-300" : ""}`}
            >
              🔧 Edit Homepage
            </button>
            <button
              onClick={() => setShowEditor(false)}
              className={`win95-button text-xs ${!showEditor ? "win95-border-inset bg-gray-300" : ""}`}
            >
              👁️ Preview Only
            </button>
          </div>

          <div className={`grid ${showEditor ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"} gap-4`}>
            {/* Editor */}
            {showEditor && (
              <div className="order-2 lg:order-1">
                <ProfileEditor config={config} setConfig={setConfig} />
              </div>
            )}

            {/* Preview */}
            <div className={showEditor ? "order-1 lg:order-2" : ""}>
              <Win95Window title={`🌐 Preview — ${config.username}'s Homepage`}>
                <div className="win95-border-inset overflow-hidden max-h-[80vh] overflow-y-auto">
                  <ProfilePreview config={config} />
                </div>
              </Win95Window>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
