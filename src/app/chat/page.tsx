"use client";

import { useState, useEffect, useRef } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Win95Window } from "@/components/Win95Window";

const MESSAGE_LIMIT = 25;

interface ChatMessage {
  from: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface BuddyInfo {
  name: string;
  status: "online" | "away" | "offline";
  awayMsg?: string;
  icon: string;
}

const BUDDIES: BuddyInfo[] = [
  { name: "SurferDude99", status: "online", icon: "🏄" },
  { name: "CyberGrrl", status: "online", icon: "💜" },
  { name: "~*DarkAngel*~", status: "away", awayMsg: "BRB getting pizza 🍕", icon: "🖤" },
  { name: "NightOwl_2000", status: "online", icon: "🦉" },
  { name: "SkaterBoi", status: "away", awayMsg: "At the skatepark. Back l8r!", icon: "🛹" },
  { name: "StarGazer", status: "offline", icon: "⭐" },
  { name: "HackerMan", status: "online", icon: "💻" },
  { name: "AngelWings", status: "offline", icon: "👼" },
  { name: "PunkRock4Eva", status: "online", icon: "🎸" },
  { name: "MoonChild", status: "away", awayMsg: "zzZZzz 😴", icon: "🌙" },
];

const CHATROOMS = [
  { name: "#general", users: 47, desc: "Talk about anything!" },
  { name: "#music", users: 23, desc: "90s music only 🎵" },
  { name: "#gaming", users: 31, desc: "N64 > PlayStation, fight me" },
  { name: "#movies", users: 18, desc: "Currently watching: The Matrix" },
  { name: "#random", users: 52, desc: "The chaos room" },
];

const BOT_RESPONSES = [
  "lol totally!! 😂",
  "no way!! thats so cool",
  "BRB phone is ringing",
  "have u seen the new page on the web ring? its sick",
  "a/s/l? jk jk 😜",
  "dude check out this MIDI file i found",
  "u should come to #music chatroom later",
  "haha same!! we should meet up IRL",
  "thats awesome, sign my guestbook plz!",
  "wait hold on my mom needs the phone",
  "g2g dinner time, ttyl! 👋",
  "ROFL 🤣🤣🤣",
  "that reminds me of this website i bookmarked",
  "nice homepage btw, love the fire text",
  "have u tried the arcade yet? i got high score on snake",
];

function playUhOhSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(600, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.setValueAtTime(0, now + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {}
}

function playNudgeSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(200 + i * 100, now + i * 0.08);
      gain.gain.setValueAtTime(0.05, now + i * 0.08);
      gain.gain.setValueAtTime(0, now + i * 0.08 + 0.06);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.06);
    }
  } catch {}
}

function BuddyList({
  onSelectBuddy,
  selectedBuddy,
}: {
  onSelectBuddy: (name: string) => void;
  selectedBuddy: string | null;
}) {
  const online = BUDDIES.filter((b) => b.status === "online");
  const away = BUDDIES.filter((b) => b.status === "away");
  const offline = BUDDIES.filter((b) => b.status === "offline");

  return (
    <Win95Window title="👥 Buddy List — Dial-Up Messenger">
      <div className="text-xs font-[Tahoma,Arial,sans-serif] text-black">
        <div className="bg-yellow-100 border border-yellow-400 p-1.5 mb-2 text-[10px]">
          Your away message: <i>&quot;Surfing the web! 🌊&quot;</i>
        </div>

        <div className="mb-2">
          <div className="font-bold text-green-700 mb-1">
            🟢 Online ({online.length})
          </div>
          {online.map((b) => (
            <div
              key={b.name}
              onClick={() => onSelectBuddy(b.name)}
              className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[#000080] hover:text-white ${
                selectedBuddy === b.name ? "bg-[#000080] text-white" : ""
              }`}
            >
              <span>{b.icon}</span>
              <span className="font-bold">{b.name}</span>
            </div>
          ))}
        </div>

        <div className="mb-2">
          <div className="font-bold text-yellow-600 mb-1">
            🟡 Away ({away.length})
          </div>
          {away.map((b) => (
            <div
              key={b.name}
              onClick={() => onSelectBuddy(b.name)}
              className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-[#000080] hover:text-white ${
                selectedBuddy === b.name ? "bg-[#000080] text-white" : ""
              }`}
            >
              <span>{b.icon}</span>
              <span className="font-bold">{b.name}</span>
              <span className="text-[10px] opacity-60 ml-1">— {b.awayMsg}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="font-bold text-gray-500 mb-1">
            ⚫ Offline ({offline.length})
          </div>
          {offline.map((b) => (
            <div key={b.name} className="flex items-center gap-1 px-2 py-1 opacity-50">
              <span>{b.icon}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Win95Window>
  );
}

function ChatWindow({
  buddyName,
  onClose,
}: {
  buddyName: string;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: buddyName,
      text: "hey!! whats up? 😊",
      time: "4:32 PM",
      isMe: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isNudging, setIsNudging] = useState(false);
  const [showGoOut, setShowGoOut] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buddy = BUDDIES.find((b) => b.name === buddyName);
  const messageCount = messages.length;
  const remaining = MESSAGE_LIMIT - messageCount;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messageCount >= MESSAGE_LIMIT) {
      setShowGoOut(true);
    }
  }, [messageCount]);

  const sendMessage = () => {
    if (!input.trim() || showGoOut) return;

    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    const newMessages: ChatMessage[] = [
      ...messages,
      { from: "You", text: input.trim(), time, isMe: true },
    ];
    setMessages(newMessages);
    setInput("");

    if (newMessages.length < MESSAGE_LIMIT) {
      const delay = 2000 + Math.random() * 5000;
      setTimeout(() => {
        playUhOhSound();
        const response = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        const replyTime = new Date();
        setMessages((prev) => [
          ...prev,
          {
            from: buddyName,
            text: response,
            time: replyTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            isMe: false,
          },
        ]);
      }, delay);
    }
  };

  const nudge = () => {
    playNudgeSound();
    setIsNudging(true);
    setTimeout(() => setIsNudging(false), 500);
    setMessages((prev) => [
      ...prev,
      {
        from: "System",
        text: `You have nudged ${buddyName}! 💥`,
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        isMe: false,
      },
    ]);
  };

  if (showGoOut) {
    return (
      <div className={`${isNudging ? "animate-[glitch_0.5s]" : ""}`}>
        <Win95Window title={`💬 Chat with ${buddy?.icon || ""} ${buddyName}`}>
          <div className="text-center py-8 font-[Tahoma,Arial,sans-serif]">
            <div className="text-6xl mb-4">☕</div>
            <h2 className="text-xl font-bold text-black mb-2">
              25 messages reached!
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              You two clearly have a lot to talk about.
            </p>
            <div className="bg-yellow-100 border-2 border-yellow-500 p-4 mx-auto max-w-sm mb-4">
              <p className="text-lg font-bold text-yellow-800">
                ☕ Why not grab a coffee together?
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                The best conversations happen face to face.
              </p>
            </div>
            <p className="text-[10px] text-gray-500">
              Chat with {buddyName} will reset tomorrow.
            </p>
            <button onClick={onClose} className="win95-button mt-4 text-xs text-black">
              ← Back to Buddy List
            </button>
          </div>
        </Win95Window>
      </div>
    );
  }

  return (
    <div className={`${isNudging ? "animate-[glitch_0.5s]" : ""}`}>
      <Win95Window title={`💬 Chat with ${buddy?.icon || ""} ${buddyName}`}>
        <div className="font-[Tahoma,Arial,sans-serif] text-black">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-gray-200 px-2 py-1 text-[10px] mb-2 win95-border-inset">
            <span>
              {buddy?.status === "online" ? "🟢" : "🟡"} {buddyName} is {buddy?.status}
              {buddy?.awayMsg ? ` — ${buddy.awayMsg}` : ""}
            </span>
            <span className={`font-bold ${remaining <= 5 ? "text-red-600" : "text-gray-600"}`}>
              {remaining} messages left
            </span>
          </div>

          {/* Messages */}
          <div className="bg-white win95-border-inset p-2 h-64 overflow-y-auto text-xs">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-1 ${msg.from === "System" ? "text-gray-500 italic text-center" : ""}`}>
                {msg.from !== "System" && (
                  <>
                    <span className="text-gray-400 text-[10px]">[{msg.time}] </span>
                    <span className={`font-bold ${msg.isMe ? "text-blue-600" : "text-red-600"}`}>
                      {msg.from}:
                    </span>{" "}
                  </>
                )}
                <span>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Warning when close to limit */}
          {remaining <= 5 && remaining > 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 text-[10px] text-center p-1 mt-1">
              ⚠️ Only {remaining} messages left before we suggest meeting IRL!
            </div>
          )}

          {/* Input */}
          <div className="flex gap-1 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="win95-border-inset flex-1 px-2 py-1 bg-white text-black text-xs"
            />
            <button onClick={sendMessage} className="win95-button text-xs">
              Send
            </button>
            <button onClick={nudge} className="win95-button text-xs" title="Nudge!">
              💥
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1 mt-2">
            <button className="win95-button text-[10px]">😀 Emoticons</button>
            <button className="win95-button text-[10px]">📁 Send File</button>
            <button className="win95-button text-[10px]">🎵 Send Sound</button>
            <button onClick={onClose} className="win95-button text-[10px] ml-auto">
              ✕ Close
            </button>
          </div>
        </div>
      </Win95Window>
    </div>
  );
}

function ChatRooms() {
  return (
    <Win95Window title="🏠 Chat Rooms">
      <div className="text-xs font-[Tahoma,Arial,sans-serif] text-black">
        <p className="mb-2 text-[10px] text-gray-600">
          Join a room and chat with strangers! Remember: be cool 😎
        </p>
        {CHATROOMS.map((room) => (
          <div
            key={room.name}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer border-b border-gray-300"
          >
            <div>
              <span className="font-bold">{room.name}</span>
              <span className="ml-2 text-[10px] opacity-60">{room.desc}</span>
            </div>
            <span className="text-[10px]">👥 {room.users}</span>
          </div>
        ))}
      </div>
    </Win95Window>
  );
}

export default function ChatPage() {
  const [selectedBuddy, setSelectedBuddy] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#008080]">
      <Toolbar currentPath="/~chat" />

      <div className="p-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Buddy List */}
          <div>
            <BuddyList
              onSelectBuddy={(name) => setSelectedBuddy(name)}
              selectedBuddy={selectedBuddy}
            />
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {selectedBuddy ? (
              <ChatWindow
                key={selectedBuddy}
                buddyName={selectedBuddy}
                onClose={() => setSelectedBuddy(null)}
              />
            ) : (
              <Win95Window title="💬 Dial-Up Messenger v3.1">
                <div className="text-center py-12 font-[Tahoma,Arial,sans-serif] text-black">
                  <div className="text-6xl mb-4">💬</div>
                  <h2 className="text-lg font-bold mb-2">Welcome to Dial-Up Messenger!</h2>
                  <p className="text-xs text-gray-600 mb-4">
                    Select a buddy from your list to start chatting.
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Remember: 25 messages per person, then go meet IRL! ☕
                  </p>
                </div>
              </Win95Window>
            )}

            {/* Chat Rooms */}
            <div className="mt-4">
              <ChatRooms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
