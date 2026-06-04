"use client";

import { useState, useEffect, useCallback } from "react";

const DAILY_LIMIT_MS = 2 * 60 * 60 * 1000; // 2 hours
const WEEKEND_LIMIT_MS = 1 * 60 * 60 * 1000; // 1 hour on weekends
const SHUTDOWN_HOUR = 0; // midnight
const SLOWDOWN_HOUR = 22; // 10 PM
const WARNING_THRESHOLD = 10 * 60 * 1000; // warn at 10 min left

function getStorageKey() {
  const d = new Date();
  return `dialup_time_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function isWeekend() {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function CRTShutdown({ timeSpent }: { timeSpent: number }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
      {phase < 2 && (
        <div className={`w-full h-full bg-white ${phase >= 1 ? 'crt-off' : ''}`} />
      )}
      {phase >= 2 && (
        <div className="text-center p-8 max-w-lg">
          {phase === 2 && (
            <>
              <div className="w-2 h-2 bg-white rounded-full mx-auto mb-8 animate-pulse" />
              <div className="text-white/0 animate-[fadeIn_2s_forwards]" style={{ animation: "fadeIn 2s forwards" }}>
                <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  That&apos;s enough for today.
                </h1>
              </div>
            </>
          )}
          {phase >= 3 && (
            <div>
              <div className="text-gray-400 text-lg mb-6" style={{ fontFamily: "Georgia, serif" }}>
                You spent {formatTime(timeSpent)} online today.
              </div>
              <div className="space-y-4 text-gray-500 text-sm" style={{ fontFamily: "Georgia, serif" }}>
                <p>The real world is still out there.</p>
                <p>Call a friend. Take a walk. Read a book.</p>
                <p>Watch the sunset — it doesn&apos;t need to load.</p>
              </div>
              <div className="mt-12 text-gray-700 text-xs">
                <p>See you tomorrow. Same time, same place.</p>
                <p className="mt-2 text-gray-800">— Dial-Up</p>
              </div>
              <div className="mt-8 text-gray-800 text-[10px]">
                {isWeekend() ? (
                  <p>Weekend mode: 1 hour daily limit 🌿</p>
                ) : (
                  <p>Weekday mode: 2 hours daily limit ⏰</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MidnightShutdown() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
      <div className="text-center p-8 max-w-lg">
        <div className="text-6xl mb-6">🌙</div>
        <h1 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
          Even the internet sleeps.
        </h1>
        <p className="text-gray-400 text-lg mb-6" style={{ fontFamily: "Georgia, serif" }}>
          It&apos;s past midnight. Time for rest.
        </p>
        <div className="text-gray-600 text-sm space-y-2" style={{ fontFamily: "Georgia, serif" }}>
          <p>Put the screen down.</p>
          <p>Tomorrow is a new day with new posts to discover.</p>
          <p>Good night. 💤</p>
        </div>
        <div className="mt-8 text-gray-800 text-xs">
          Dial-Up will be back at 6:00 AM
        </div>
      </div>
    </div>
  );
}

function TimeWarning({ remaining }: { remaining: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-yellow-900/90 border-t-2 border-yellow-500 px-4 py-2 text-center">
      <span className="text-yellow-300 text-sm font-bold blink">
        ⚠️ {formatTime(remaining)} remaining today
      </span>
      <span className="text-yellow-100/60 text-xs ml-3">
        Make it count — then go live your life
      </span>
    </div>
  );
}

function StatusBar({ timeSpent, limit }: { timeSpent: number; limit: number }) {
  const remaining = limit - timeSpent;
  const pct = Math.min(100, (timeSpent / limit) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9990] bg-[#c0c0c0] border-t-2 border-gray-400 px-2 py-0.5 flex items-center gap-3 text-[10px] font-[Tahoma,Arial,sans-serif] text-black">
      <span>⏰ Online: {formatTime(timeSpent)}</span>
      <div className="flex-1 max-w-[200px] dialup-progress h-3">
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            backgroundColor: pct > 80 ? "#cc0000" : pct > 60 ? "#cc6600" : "#000080",
          }}
        />
      </div>
      <span className={pct > 80 ? "text-red-600 font-bold" : ""}>
        {formatTime(remaining)} left
      </span>
      <span className="text-gray-500">|</span>
      <span className="text-gray-500">
        {isWeekend() ? "🌿 Weekend mode (1h)" : "📅 Weekday (2h)"}
      </span>
    </div>
  );
}

export function TimeGuard({ children }: { children: React.ReactNode }) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isMidnight, setIsMidnight] = useState(false);
  const [mounted, setMounted] = useState(false);

  const limit = isWeekend() ? WEEKEND_LIMIT_MS : DAILY_LIMIT_MS;
  const remaining = limit - timeSpent;
  const showWarning = remaining > 0 && remaining < WARNING_THRESHOLD;

  const loadTimeSpent = useCallback(() => {
    try {
      const key = getStorageKey();
      const saved = localStorage.getItem(key);
      if (saved) {
        setTimeSpent(parseInt(saved, 10));
      }
    } catch {}
  }, []);

  useEffect(() => {
    setMounted(true);
    loadTimeSpent();
  }, [loadTimeSpent]);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setTimeSpent((prev) => {
        const next = prev + 1000;
        try {
          localStorage.setItem(getStorageKey(), String(next));
        } catch {}
        return next;
      });

      const hour = new Date().getHours();
      if (hour >= SHUTDOWN_HOUR && hour < 6) {
        setIsMidnight(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    if (timeSpent >= limit) {
      setIsShutdown(true);
    }
  }, [timeSpent, limit]);

  if (!mounted) return <>{children}</>;
  if (isMidnight) return <MidnightShutdown />;
  if (isShutdown) return <CRTShutdown timeSpent={timeSpent} />;

  const hour = new Date().getHours();
  const isSlowdown = hour >= SLOWDOWN_HOUR;

  return (
    <div className={isSlowdown ? "opacity-90" : ""}>
      {children}
      <StatusBar timeSpent={timeSpent} limit={limit} />
      {showWarning && <TimeWarning remaining={remaining} />}
      {isSlowdown && (
        <div className="fixed top-auto bottom-8 left-1/2 -translate-x-1/2 z-[9995] bg-purple-900/80 border border-purple-500 px-4 py-1 text-purple-300 text-[10px] rounded">
          🌙 Evening mode — things are slowing down...
        </div>
      )}
      {/* Bottom padding for status bar */}
      <div className="h-6" />
    </div>
  );
}
