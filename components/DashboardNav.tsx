"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({ title, subtitle }: { title?: string, subtitle?: string }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) => 
    `px-6 py-2 rounded-full text-sm font-bold transition-all ${
      isActive(path) 
      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-slate-200 rounded-full w-fit shadow-sm">
         <Link href="/dashboard" className={linkClass("/dashboard")}>Overview</Link>
         <Link href="/dashboard/analytics" className={linkClass("/dashboard/analytics")}>Analytics</Link>
         <Link href="/dashboard/copywriting" className={linkClass("/dashboard/copywriting")}>AI Studio</Link>
         <Link href="/dashboard/affiliates" className={linkClass("/dashboard/affiliates")}>Affiliates</Link>
         <Link href="/dashboard/wallet" className={linkClass("/dashboard/wallet")}>Wallet</Link>
      </div>
      {(title || subtitle) && (
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}