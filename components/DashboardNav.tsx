"use client";
import { UserButton } from "@clerk/nextjs";

export default function DashboardNav({ title = "Dashboard", subtitle = "Manage your empire" }) {
  return (
    <div className="bg-white border-b border-slate-100 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:block text-right mr-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">System Status</p>
              <p className="text-[9px] font-bold text-green-500 uppercase flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
              </p>
           </div>
           <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}