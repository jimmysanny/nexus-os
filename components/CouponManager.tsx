"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CouponManager({ funnelId, coupons }: { funnelId: string, coupons: any[] }) {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(10);
  const router = useRouter();

  const addCoupon = async () => {
    if (!code) return;
    await fetch("/api/coupons", {
      method: "POST",
      body: JSON.stringify({ code: code.toUpperCase(), percent, funnelId })
    });
    setCode("");
    router.refresh();
  };

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 space-y-6">
      <div className="flex justify-between items-center">
         <h3 className="font-black text-lg">Flash Sale Codes</h3>
         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marketing</span>
      </div>
      
      <div className="flex gap-4">
        <input 
          placeholder="CODE (e.g. SAVE20)" 
          className="flex-1 p-4 bg-slate-50 rounded-2xl text-xs font-bold outline-none uppercase"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <select 
          className="p-4 bg-slate-50 rounded-2xl text-xs font-bold outline-none"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
        >
          <option value={10}>10% OFF</option>
          <option value={20}>20% OFF</option>
          <option value={50}>50% OFF</option>
          <option value={100}>FREE</option>
        </select>
        <button 
          onClick={addCoupon}
          className="px-6 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {coupons.length === 0 && <p className="text-xs text-slate-400 italic">No active coupons.</p>}
        {coupons.map(c => (
          <div key={c.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="font-black text-slate-900">{c.code}</span>
            <span className="text-[10px] font-black bg-green-100 text-green-600 px-3 py-1 rounded-full">-{c.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}