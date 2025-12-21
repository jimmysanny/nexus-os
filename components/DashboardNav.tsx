"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 mb-6 text-sm font-bold text-slate-500 overflow-x-auto pb-2">
         <Link href="/dashboard" className="hover:text-blue-600 whitespace-nowrap">Overview</Link>
         <Link href="/dashboard/analytics" className="hover:text-blue-600 whitespace-nowrap">Analytics</Link>
         <Link href="/dashboard/wallet" className="hover:text-blue-600 whitespace-nowrap">Wallet</Link>
         <Link href="/dashboard/copywriting" className="hover:text-blue-600 whitespace-nowrap">AI Copywriting</Link>
         <Link href="/dashboard/affiliates" className="hover:text-blue-600 whitespace-nowrap">Affiliates</Link>
      </div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}