"use client";
import Link from "next/link";
import { useState } from "react";

export default function VaultCard({ funnel }: { funnel: any }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!funnel.digitalProductUrl) return;
    navigator.clipboard.writeText(funnel.digitalProductUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">📦</div>
        <h3 className="font-black text-lg">{funnel.name} Asset</h3>
        <p className="text-[10px] font-mono text-blue-500 break-all bg-blue-50 p-3 rounded-xl border border-blue-100">
          {funnel.digitalProductUrl || "No Link Assigned"}
        </p>
      </div>
      
      <div className="mt-8 flex gap-2">
        <Link href={`/dashboard/funnels/${funnel.id}`} className="flex-1 text-center py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
          Edit Link
        </Link>
        <button 
          onClick={copyToClipboard}
          className={`px-6 rounded-2xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-200'}`}
        >
          {copied ? "" : ""}
        </button>
      </div>
    </div>
  );
}