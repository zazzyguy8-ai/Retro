"use client";

import { useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Win95Window } from "@/components/Win95Window";

interface MailMessage {
  id: number;
  from: string;
  fromIcon: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  deliveredIn: string;
}

const INBOX: MailMessage[] = [
  {
    id: 1,
    from: "WebMaster",
    fromIcon: "👑",
    subject: "Welcome to Dial-Up! 🎉",
    body: "Hey ~CoolDude97~!\n\nWelcome to Dial-Up — the internet you remember.\n\nHere's what you need to know:\n- Build your homepage (it's like YOUR corner of the web)\n- Chat with friends (25 messages, then go meet IRL!)\n- Post on the forums (replies come slow, like the old days)\n- Explore Web Rings to discover new people\n- And most importantly... LOG OFF SOMETIMES! 😄\n\nWe're building something different here. Not another social media that wants to steal your attention. A place that WANTS you to go outside.\n\nWelcome home.\n\n— WebMaster\nDial-Up Admin",
    date: "06/04/1997",
    read: false,
    deliveredIn: "32 minutes",
  },
  {
    id: 2,
    from: "CyberGrrl",
    fromIcon: "💜",
    subject: "RE: Your homepage is AMAZING",
    body: "OMG thank you so much for signing my guestbook!!! 💕\n\nI LOVE your homepage btw, the fire text is SO COOL. How did you get the stars background?? I've been trying to figure it out for days lol.\n\nAlso did you see the new chat rooms? There's a #music one now and people are sharing MIDI files. You should totally join!\n\nWe should be web ring buddies!! I'll add you to mine if you add me to yours 🔗\n\nttyl!\n— CyberGrrl\n\nP.S. my ICQ is 29471836, add me!! 😊",
    date: "06/03/1997",
    read: false,
    deliveredIn: "1 hour 47 minutes",
  },
  {
    id: 3,
    from: "SkaterBoi",
    fromIcon: "🛹",
    subject: "GoldenEye tournament this weekend??",
    body: "yo dude!\n\nme and some guys from the forum are thinking about doing a GoldenEye tournament this weekend. not online obviously (lol) but we're gonna play at the same time and post our scores on the forum.\n\nrules:\n- facility, proximity mines\n- NO ODDJOB (you know who you are)\n- license to kill mode\n- best of 5 rounds\n\nyou in??\n\nalso the platform is kicking us off for the weekend (only 1 hour lol) so we gotta coordinate timing.\n\nlet me know!\n- SkaterBoi\n\nP.S. check my homepage i added a new skateboarding section 🛹",
    date: "06/02/1997",
    read: true,
    deliveredIn: "2 hours 12 minutes",
  },
  {
    id: 4,
    from: "AngelWings",
    fromIcon: "👼",
    subject: "~*~signed your guestbook~*~ 💕",
    body: "heyyy!!\n\njust visited your homepage and signed your guestbook! your page is super cool, i love the MIDI music choice haha never gonna give you up 😂\n\ncan you sign mine back? pretty pleaseee!! 🥺\n\nalso i noticed we have some mutual buddies on the buddy list. small internet huh??\n\nanyway just wanted to say hi and welcome to dial-up! this place is awesome, everyone is so nice. way better than those big corporate sites.\n\nxoxo,\n~*AngelWings*~\n\n·.¸¸.·♩♪♫ spread love online ♫♪♩·.¸¸.·",
    date: "06/01/1997",
    read: true,
    deliveredIn: "58 minutes",
  },
  {
    id: 5,
    from: "HackerMan",
    fromIcon: "💻",
    subject: "Fire text tutorial — as promised",
    body: "Hey,\n\nSaw you were asking about fire text on the forums. Here's how to do it:\n\nBasically you just need text-shadow with multiple layers of orange/red colors. The trick is using multiple shadows to create that glow effect.\n\nAlso pro tip: use Impact or Arial Black font for maximum fire text energy. Comic Sans fire text looks... weird. Trust me I tried.\n\nIf you need any other homepage tricks just ask. I've been building websites since like 1995 so I know all the hacks 😎\n\n— HackerMan\n\nP.S. DO NOT view source on my page. I mean it. There's nothing to see there. Definitely no easter eggs.",
    date: "05/30/1997",
    read: true,
    deliveredIn: "1 hour 23 minutes",
  },
];

function YouveGotMail({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#c0c0c0] win95-border p-0 max-w-sm">
        <div className="win95-titlebar">
          <span>📧 New Mail!</span>
          <button onClick={onDismiss} className="win95-button !px-1 !py-0 text-xs">✕</button>
        </div>
        <div className="p-6 text-center font-[Tahoma,Arial,sans-serif] text-black">
          <div className="text-6xl mb-4">📬</div>
          <h2 className="text-xl font-bold mb-2">You&apos;ve Got Mail!</h2>
          <p className="text-sm text-gray-600 mb-4">
            You have {INBOX.filter((m) => !m.read).length} new messages in your inbox.
          </p>
          <p className="text-[10px] text-gray-400 mb-4">
            Remember: mail on Dial-Up is delivered with a delay, just like real letters. ✉️
          </p>
          <button onClick={onDismiss} className="win95-button px-6 py-1">
            Open Inbox
          </button>
        </div>
      </div>
    </div>
  );
}

function ComposeWindow({ onClose }: { onClose: () => void }) {
  return (
    <Win95Window title="✉️ New Message">
      <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <label className="font-bold w-12">To:</label>
            <input className="win95-border-inset flex-1 px-2 py-1 bg-white text-black" placeholder="Screen name..." />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold w-12">Subject:</label>
            <input className="win95-border-inset flex-1 px-2 py-1 bg-white text-black" placeholder="What's this about?" />
          </div>
        </div>
        <textarea
          className="win95-border-inset w-full px-2 py-1 bg-white text-black h-40 resize-none text-xs"
          placeholder="Write your message here... Take your time, it won't arrive instantly anyway! ⏰"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-[10px] text-gray-500">
            ⏰ This message will be delivered in 30min - 2 hours
          </div>
          <div className="flex gap-1">
            <button onClick={onClose} className="win95-button text-xs">Cancel</button>
            <button className="win95-button text-xs font-bold">📨 Send</button>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}

export default function MailPage() {
  const [selectedMail, setSelectedMail] = useState<MailMessage | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [inbox, setInbox] = useState(INBOX);

  const unreadCount = inbox.filter((m) => !m.read).length;

  const openMail = (mail: MailMessage) => {
    setSelectedMail(mail);
    setInbox((prev) => prev.map((m) => m.id === mail.id ? { ...m, read: true } : m));
  };

  return (
    <div className="min-h-screen bg-[#008080]">
      <Toolbar currentPath="/~mail" />

      {showWelcome && unreadCount > 0 && (
        <YouveGotMail onDismiss={() => setShowWelcome(false)} />
      )}

      <div className="p-4 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Sidebar */}
          <div>
            <Win95Window title="📧 Dial-Up Mail v1.0">
              <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
                <button
                  onClick={() => { setShowCompose(true); setSelectedMail(null); }}
                  className="win95-button w-full text-left px-2 py-1.5 mb-2 font-bold"
                >
                  ✉️ Compose New Message
                </button>

                <div className="space-y-0.5">
                  <div className="font-bold bg-gray-200 px-2 py-1">
                    📥 Inbox ({unreadCount} new)
                  </div>
                  {inbox.map((mail) => (
                    <div
                      key={mail.id}
                      onClick={() => { openMail(mail); setShowCompose(false); }}
                      className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white border-b border-gray-200 ${
                        selectedMail?.id === mail.id ? "bg-[#000080] text-white" : ""
                      } ${!mail.read ? "font-bold" : ""}`}
                    >
                      <span>{mail.read ? "📭" : "📬"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{mail.fromIcon} {mail.from}</div>
                        <div className="truncate text-[10px] opacity-70">{mail.subject}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-0.5">
                  <div className="font-bold bg-gray-200 px-2 py-1">📤 Sent</div>
                  <div className="px-2 py-2 text-gray-400 text-center text-[10px]">No sent messages yet</div>
                </div>

                <div className="mt-3 bg-yellow-50 border border-yellow-300 p-2 text-[10px]">
                  📮 Mail on Dial-Up is delivered with a delay of 30 minutes to 2 hours. Good things come to those who wait!
                </div>
              </div>
            </Win95Window>
          </div>

          {/* Content area */}
          <div className="lg:col-span-2">
            {showCompose ? (
              <ComposeWindow onClose={() => setShowCompose(false)} />
            ) : selectedMail ? (
              <Win95Window title={`📧 ${selectedMail.subject}`}>
                <div className="font-[Tahoma,Arial,sans-serif] text-black text-xs">
                  <div className="bg-gray-100 p-2 mb-3 win95-border-inset">
                    <div className="flex justify-between">
                      <div>
                        <div><b>From:</b> {selectedMail.fromIcon} {selectedMail.from}</div>
                        <div><b>Subject:</b> {selectedMail.subject}</div>
                        <div><b>Date:</b> {selectedMail.date}</div>
                      </div>
                      <div className="text-right text-[10px] text-gray-500">
                        <div>📮 Delivered in:</div>
                        <div className="font-bold">{selectedMail.deliveredIn}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 win95-border-inset min-h-[300px] whitespace-pre-line text-xs leading-relaxed">
                    {selectedMail.body}
                  </div>

                  <div className="flex gap-1 mt-3">
                    <button className="win95-button text-xs">↩️ Reply</button>
                    <button className="win95-button text-xs">↪️ Forward</button>
                    <button className="win95-button text-xs">🗑️ Delete</button>
                    <button className="win95-button text-xs">📁 Save</button>
                  </div>
                </div>
              </Win95Window>
            ) : (
              <Win95Window title="📧 Dial-Up Mail">
                <div className="text-center py-16 font-[Tahoma,Arial,sans-serif] text-black">
                  <div className="text-6xl mb-4">📧</div>
                  <h2 className="text-lg font-bold mb-2">Welcome to Dial-Up Mail!</h2>
                  <p className="text-xs text-gray-600 mb-2">
                    Select a message from your inbox to read it.
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Unlike modern email, messages here take time to arrive.
                    <br />
                    It&apos;s like writing real letters — but on the internet! ✉️
                  </p>
                </div>
              </Win95Window>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
