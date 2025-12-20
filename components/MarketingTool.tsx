"use client";
import { useState } from "react";

export default function MarketingTool({ emailList }: { emailList: string }) {
  const [copied, setCopied] = useState(false);

  const copyEmails = () => {
    navigator.clipboard.writeText(emailList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-4 shadow-xl">
      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">CUSTOMER EMAIL EXPORT</p>
      <p className="text-xs text-slate-400 leading-relaxed">Copy all customer emails to clipboard for use in Gmail/Outlook (BCC).</p>
      <textarea 
        readOnly 
        value={emailList} 
        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] font-mono text-slate-300 outline-none" 
      />
      <button 
        onClick={copyEmails} 
        className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-white hover:text-blue-600'}`}
      >
        {copied ? "List Copied " : "COPY EMAIL LIST"}
      </button>
    </div>
  );
}