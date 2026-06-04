"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export function Toolbar({ currentPath }: { currentPath: string }) {
  const { user, screenName, signOut } = useAuth();

  return (
    <div className="bg-[#c0c0c0] border-b-2 border-gray-600 sticky top-0 z-50 font-[Tahoma,Arial,sans-serif] text-black">
      {/* Menu bar - hidden on mobile */}
      <div className="hidden sm:flex items-center justify-between px-2 py-0.5 text-xs border-b border-gray-400">
        <div className="flex items-center gap-1">
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">File</span>
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">Edit</span>
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">View</span>
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">Go</span>
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">Bookmarks</span>
          <span className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer">Help</span>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-[10px]">👤 {screenName || "User"}</span>
              <button
                onClick={() => signOut()}
                className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer"
              >
                🚪 Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer no-underline text-black">
                🔑 Log In
              </Link>
              <Link href="/signup" className="px-2 hover:bg-[#000080] hover:text-white cursor-pointer no-underline text-black">
                📝 Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Navigation buttons - scrollable on mobile */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-400 overflow-x-auto">
        <Link href="/" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">🏠</Link>
        <Link href="/profile" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">👤</Link>
        <Link href="/chat" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">💬</Link>
        <Link href="/mail" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">📧</Link>
        <Link href="/forum" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">📋</Link>
        <Link href="/upload" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap shrink-0">📸</Link>
        <div className="ml-auto flex items-center gap-1 shrink-0">
          {user ? (
            <button
              onClick={() => signOut()}
              className="win95-button text-xs px-2 py-0.5 whitespace-nowrap"
            >
              🚪
            </button>
          ) : (
            <>
              <Link href="/login" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap">🔑</Link>
              <Link href="/signup" className="win95-button text-xs px-2 py-0.5 no-underline text-black whitespace-nowrap">📝</Link>
            </>
          )}
        </div>
      </div>
      {/* Address bar - compact on mobile */}
      <div className="flex items-center gap-1 sm:gap-2 px-2 py-1">
        <span className="font-bold text-[10px] sm:text-xs hidden sm:inline">📍 Location:</span>
        <div className="flex-1 bg-white win95-border-inset px-1 sm:px-2 py-0.5 text-[10px] sm:text-xs truncate">
          dial-up.net{currentPath}
        </div>
      </div>
    </div>
  );
}
