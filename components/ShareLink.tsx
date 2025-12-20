"use client";
import { useState } from "react";

export default function ShareLink({ funnelId }: { funnelId: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/f/${funnelId}`;
  const message = `Check out this digital asset I just launched on Nexus: ${url}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="space-y-3">
      <button 
        onClick={copyLink}
        className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
      >
        {copied ? "Link Secured! " : "Copy Market Link"}
      </button>
      
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={shareWhatsApp}
          className="py-3 rounded-xl bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all"
        >
          WhatsApp
        </button>
        <button 
          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, "_blank")}
          className="py-3 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all"
        >
          Twitter (X)
        </button>
      </div>
    </div>
  );
}