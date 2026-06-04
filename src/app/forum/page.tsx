"use client";

import { useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Win95Window } from "@/components/Win95Window";

interface ForumPost {
  id: number;
  author: string;
  authorIcon: string;
  title: string;
  content: string;
  date: string;
  replies: number;
  views: number;
  lastReply: string;
  category: string;
  signature: string;
  isSticky?: boolean;
}

const CATEGORIES = [
  { name: "📢 Announcements", desc: "Official Dial-Up news and updates", posts: 12, color: "#ff6600" },
  { name: "💬 General Discussion", desc: "Talk about anything and everything", posts: 847, color: "#00ff00" },
  { name: "🎵 Music", desc: "90s music only. No exceptions.", posts: 234, color: "#ff69b4" },
  { name: "🎮 Gaming", desc: "N64, PS1, PC games, emulators", posts: 456, color: "#00ffff" },
  { name: "🌐 Homepage Showcase", desc: "Show off your Dial-Up homepage!", posts: 189, color: "#ffff00" },
  { name: "🔧 Tech Support", desc: "My modem isn't working plz help", posts: 321, color: "#ff0000" },
  { name: "🎬 Movies & TV", desc: "No spoilers or you're banned", posts: 156, color: "#cc66ff" },
  { name: "🏀 Sports", desc: "Go outside and play too!", posts: 98, color: "#66ff66" },
];

const FORUM_POSTS: ForumPost[] = [
  {
    id: 1,
    author: "WebMaster",
    authorIcon: "👑",
    title: "📌 WELCOME TO DIAL-UP FORUMS — READ THE RULES FIRST!!!",
    content: "Welcome everyone! Please read the rules before posting.\n\n1. Be respectful\n2. No spam\n3. Keep it 90s\n4. Sign others' guestbooks\n5. Have fun!\n\nViolators will be BANNED. No exceptions. This is a community, treat it like one.",
    date: "03/01/1997",
    replies: 47,
    views: 2841,
    lastReply: "NightOwl_2000",
    category: "📢 Announcements",
    signature: "═══════════════════\n👑 WebMaster — Dial-Up Admin\n\"Building the web, one page at a time\"\nICQ: 10000001\n═══════════════════",
    isSticky: true,
  },
  {
    id: 2,
    author: "SurferDude99",
    authorIcon: "🏄",
    title: "does anyone else miss when the internet was SIMPLE??",
    content: "like seriously... i remember when you could just surf the web and find weird cool pages made by random people. now everything is just corporate garbage. thats why i love this place. anyone else feel the same?\n\nalso check out my homepage i just added new MIDI music 🎵",
    date: "06/03/1997",
    replies: 23,
    views: 456,
    lastReply: "CyberGrrl",
    category: "💬 General Discussion",
    signature: "~*~*~*~*~*~*~*~*~*~\n🏄 SurferDude99 🏄\n\"Catch the wave, ride the web\"\nVisit my homepage!\n~*~*~*~*~*~*~*~*~*~",
  },
  {
    id: 3,
    author: "CyberGrrl",
    authorIcon: "💜",
    title: "What's your TOP 5 songs of 1997?? 🎵",
    content: "Mine are:\n1. Wannabe - Spice Girls\n2. MMMBop - Hanson\n3. Bitter Sweet Symphony - The Verve\n4. Karma Police - Radiohead\n5. Tubthumping - Chumbawamba\n\nDon't @ me, these are CLASSICS. What are yours??\n\nAlso does anyone have the MIDI for Bitter Sweet Symphony? I want it on my homepage SO BAD",
    date: "06/02/1997",
    replies: 45,
    views: 892,
    lastReply: "PunkRock4Eva",
    category: "🎵 Music",
    signature: "♪♫♪♫♪♫♪♫♪♫♪♫♪♫♪\n💜 CyberGrrl 💜\n\"Girl power on the internet!\"\n♪♫♪♫♪♫♪♫♪♫♪♫♪♫♪",
  },
  {
    id: 4,
    author: "HackerMan",
    authorIcon: "💻",
    title: "HOW TO: Make fire text on your homepage 🔥🔥🔥",
    content: "Ok so everyone keeps asking me how I got fire text on my page. Here's the CSS trick:\n\nStep 1: Add the fire-text class\nStep 2: Customize the colors\nStep 3: ???\nStep 4: PROFIT\n\nNo but seriously it's pretty easy. Just use text-shadow with orange and red colors. I'll post the full tutorial on my homepage later today.\n\nYou're welcome 😎",
    date: "06/01/1997",
    replies: 67,
    views: 1547,
    lastReply: "SkaterBoi",
    category: "🔧 Tech Support",
    signature: "╔══════════════════╗\n║ 💻 HackerMan 💻   ║\n║ \"I'm in.\"          ║\n║ PGP Key: 0xDEADBEEF║\n╚══════════════════╝",
  },
  {
    id: 5,
    author: "SkaterBoi",
    authorIcon: "🛹",
    title: "GoldenEye 007 is the GREATEST GAME EVER MADE. fight me.",
    content: "just played 4 player split screen for like 6 hours straight. proximity mines in the facility = CHAOS.\n\noddjob is BANNED in my house btw. if you pick oddjob you're a cheater and you know it.\n\nwho wants to organize a Dial-Up gaming night?? we could all play at the same time and talk about it on the forum.\n\nalso license to kill mode + slappers only = perfection",
    date: "05/30/1997",
    replies: 89,
    views: 1203,
    lastReply: "NightOwl_2000",
    category: "🎮 Gaming",
    signature: "______|_______|______\n   🛹 SkaterBoi 🛹\n  \"sk8 or die dude\"\n  Tony Hawk is my hero\n______|_______|______",
  },
  {
    id: 6,
    author: "AngelWings",
    authorIcon: "👼",
    title: "Check out my homepage!! just redesigned everything ✨",
    content: "I spent ALL WEEKEND working on it and I'm so proud!! New background, new MIDI music (it plays Careless Whisper now 😍), new guestbook, and I added a web ring section!\n\nPlease visit and sign my guestbook!! I'll sign yours back I promise!! 💕\n\nAlso if anyone knows how to make a hit counter go faster... asking for a friend 😏",
    date: "05/28/1997",
    replies: 34,
    views: 678,
    lastReply: "StarGazer",
    category: "🌐 Homepage Showcase",
    signature: "·.¸¸.·♩♪♫ AngelWings ♫♪♩·.¸¸.·\n   👼 Spreading love online 👼\n  \"Be the angel you wish to see\"\n·.¸¸.·♩♪♫♩♪♫♩♪♫·.¸¸.·",
  },
];

function ThreadView({ post, onBack }: { post: ForumPost; onBack: () => void }) {
  const fakeReplies = [
    {
      author: "NightOwl_2000", icon: "🦉", date: "same day",
      text: "YESSS totally agree!! this is why dial-up is the best thing ever. the old internet was magic ✨",
      sig: "🦉 NightOwl_2000\n\"Who needs sleep when you have internet?\"",
    },
    {
      author: "PunkRock4Eva", icon: "🎸", date: "same day",
      text: "bruh facts. i built my first homepage when i was 12 and it had like 47 animated GIFs on it. THAT was peak internet. none of this minimalist crap.",
      sig: "🎸 PunkRock4Eva 🎸\n\"Smash the system, build a homepage\"",
    },
    {
      author: "MoonChild", icon: "🌙", date: "next day",
      text: "this place feels like home already 🥺 signed everyone's guestbook btw!! sign mine back plz <3",
      sig: "🌙 MoonChild 🌙\n\"dreaming in pixels\"",
    },
  ];

  return (
    <Win95Window title={`📋 Thread: ${post.title}`}>
      <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
        <button onClick={onBack} className="win95-button text-xs mb-3">
          ← Back to Forum
        </button>

        {/* Original post */}
        <div className="border-2 border-gray-400 mb-3">
          <div className="bg-[#000080] text-white px-2 py-1 flex justify-between">
            <span className="font-bold">{post.authorIcon} {post.author}</span>
            <span>{post.date}</span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="bg-gray-200 p-2 sm:w-32 text-center border-b sm:border-b-0 sm:border-r border-gray-400 shrink-0 flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0">
              <div className="text-2xl sm:text-3xl sm:mb-1">{post.authorIcon}</div>
              <div className="font-bold text-[10px]">{post.author}</div>
              <div className="text-[9px] text-gray-500 hidden sm:block mt-1">Posts: {Math.floor(Math.random() * 500) + 50}</div>
              <div className="text-[9px] text-gray-500 hidden sm:block">Joined: Jan 1997</div>
            </div>
            <div className="p-2 sm:p-3 flex-1 min-w-0">
              {post.content.split("\n").map((line, i) => (
                <p key={i} className="mb-1 break-words">{line}</p>
              ))}
              <div className="mt-4 pt-2 border-t border-gray-300 text-[9px] text-gray-500 whitespace-pre-line font-mono overflow-x-auto">
                {post.signature}
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        {fakeReplies.map((reply, i) => (
          <div key={i} className="border-2 border-gray-300 mb-2">
            <div className="bg-gray-300 px-2 py-1 flex justify-between">
              <span className="font-bold">{reply.icon} {reply.author}</span>
              <span>{reply.date}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="bg-gray-100 p-2 sm:w-32 text-center border-b sm:border-b-0 sm:border-r border-gray-300 shrink-0 flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0">
                <div className="text-xl sm:text-2xl sm:mb-1">{reply.icon}</div>
                <div className="font-bold text-[10px]">{reply.author}</div>
              </div>
              <div className="p-2 sm:p-3 flex-1 min-w-0">
                <p className="break-words">{reply.text}</p>
                <div className="mt-3 pt-2 border-t border-gray-200 text-[9px] text-gray-500 whitespace-pre-line font-mono overflow-x-auto">
                  {reply.sig}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Reply box */}
        <div className="border-2 border-gray-400 p-3 bg-gray-100 mt-3">
          <div className="font-bold mb-2">✍️ Post a Reply:</div>
          <textarea
            className="win95-border-inset w-full px-2 py-1 bg-white text-black h-20 resize-none text-xs mb-2"
            placeholder="Type your reply here... Remember to be cool 😎"
          />
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-gray-500">
              Replies are delivered with a random delay of 10min - 2h ⏰
            </div>
            <button className="win95-button text-xs">📨 Post Reply</button>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}

export default function ForumPage() {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-[#008080]">
        <Toolbar currentPath="/~forum" />
        <div className="p-4 max-w-5xl mx-auto">
          <ThreadView post={selectedPost} onBack={() => setSelectedPost(null)} />
        </div>
      </div>
    );
  }

  const filteredPosts = selectedCategory
    ? FORUM_POSTS.filter((p) => p.category === selectedCategory)
    : FORUM_POSTS;

  return (
    <div className="min-h-screen bg-[#008080]">
      <Toolbar currentPath="/~forum" />

      <div className="p-4 max-w-5xl mx-auto">
        {/* Forum header */}
        <Win95Window title="📋 Dial-Up Forums — Where opinions load slowly">
          <div className="font-[Tahoma,Arial,sans-serif] text-black">
            <div className="text-center mb-3">
              <h1 className="text-xl font-bold">Dial-Up Community Forums</h1>
              <p className="text-xs text-gray-600">
                Threads: 2,847 | Posts: 14,392 | Members: 1,247 | Welcome, ~CoolDude97~!
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                ⏰ Replies are delivered with a random delay. Patience is a virtue.
              </p>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <div className="bg-gray-200 px-2 py-1 font-bold text-xs border-b border-gray-400">
                📁 Categories
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 text-blue-600 underline font-normal"
                  >
                    [show all]
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-300">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 px-3 py-2 border border-gray-200 cursor-pointer hover:bg-gray-100 text-xs ${
                      selectedCategory === cat.name ? "bg-blue-50 border-blue-300" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-bold" style={{ color: cat.color }}>{cat.name}</div>
                      <div className="text-[10px] text-gray-500">{cat.desc}</div>
                    </div>
                    <div className="text-[10px] text-gray-400">{cat.posts} posts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts table */}
            <div>
              <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold flex">
                <span className="flex-1">Thread</span>
                <span className="w-12 sm:w-16 text-center hidden sm:block">Replies</span>
                <span className="w-12 sm:w-16 text-center hidden sm:block">Views</span>
                <span className="w-10 sm:w-24 text-center">💬</span>
              </div>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`flex items-center px-2 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 text-xs ${
                    post.isSticky ? "bg-yellow-50" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#000080] hover:underline truncate">
                      {post.title}
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                      by {post.authorIcon} {post.author} — {post.date}
                    </div>
                  </div>
                  <div className="w-12 sm:w-16 text-center text-gray-600 hidden sm:block">{post.replies}</div>
                  <div className="w-12 sm:w-16 text-center text-gray-600 hidden sm:block">{post.views.toLocaleString()}</div>
                  <div className="w-10 sm:w-24 text-center text-[10px] text-gray-500 shrink-0">{post.replies}</div>
                </div>
              ))}
            </div>

            {/* Page nav */}
            <div className="flex justify-center gap-1 mt-3">
              <span className="win95-button px-2 py-0.5 text-xs win95-border-inset bg-gray-300">1</span>
              <button className="win95-button px-2 py-0.5 text-xs">2</button>
              <button className="win95-button px-2 py-0.5 text-xs">3</button>
              <button className="win95-button px-2 py-0.5 text-xs">...</button>
              <button className="win95-button px-2 py-0.5 text-xs">47</button>
              <button className="win95-button px-2 py-0.5 text-xs">Next →</button>
            </div>
          </div>
        </Win95Window>
      </div>
    </div>
  );
}
