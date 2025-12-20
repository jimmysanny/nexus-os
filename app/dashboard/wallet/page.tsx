"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";

export default function WalletPage() {
  const [stats, setStats] = useState({ revenue: 0, balance: 0, fee: 0 });
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    fetch("/api/merchant/stats").then(res => res.json()).then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const handleWithdraw = async () => {
    if (stats.balance <= 0) return alert("No funds available.");
    setRequesting(true);
    const res = await fetch("/api/payouts", {
      method: "POST",
      body: JSON.stringify({ amount: stats.balance })
    });
    if (res.ok) alert("Payout request sent! You will receive an email confirmation.");
    setRequesting(false);
  };

  if (loading) return <div className="p-20 font-black text-slate-400">Syncing with bank...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav title="Earnings" subtitle="Withdraw your profit" />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-[#0f172a] text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">Available to Withdraw</p>
              <h2 className="text-5xl font-black mb-6">KES {stats.balance.toLocaleString()}</h2>
              <button onClick={handleWithdraw} disabled={requesting} className="px-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
                 {requesting ? "Processing..." : "Request Payout (M-Pesa)"}
              </button>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-[32px] border border-slate-100">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Total Earned</p>
              <p className="text-2xl font-black">KES {stats.revenue.toLocaleString()}</p>
           </div>
           <div className="bg-white p-6 rounded-[32px] border border-slate-100">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Processing Fees</p>
              <p className="text-2xl font-black text-red-500">- KES {stats.fee.toLocaleString()}</p>
           </div>
        </div>
      </div>
    </div>
  );
}