"use client";

import { UserButton, SignOutButton } from "@clerk/nextjs";
import { Globe, Home, Layout, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900/50 hidden md:flex flex-col fixed h-full">
        <div className="p-6 h-16 flex items-center border-b border-gray-800">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            Nexus OS
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition">
            <Home size={20} /> Overview
          </Link>
          <Link href="/dashboard/funnels" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition">
            <Layout size={20} /> My Funnels
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition">
            <Settings size={20} /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
           {/* FORCE REDIRECT TO HOME ON SIGN OUT */}
           <SignOutButton redirectUrl="/">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition font-bold cursor-pointer">
                <LogOut size={20} /> Sign Out
              </button>
           </SignOutButton>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER (Pushed right to clear fixed sidebar) */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-gray-800 flex items-center justify-end px-8 gap-4 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <span className="text-sm text-gray-400">Welcome back</span>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="flex-1 bg-black p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
