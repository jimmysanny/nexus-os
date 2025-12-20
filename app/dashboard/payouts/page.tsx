import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";

export default async function PayoutsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // STRATEGY: Calculate what we owe creators dynamically
  
  // 1. Fetch ALL successful orders across the entire platform
  const allOrders = await prisma.order.findMany({
    where: { status: "SUCCESS" },
    include: { funnel: true }
  });

  // 2. Group by Creator (User ID)
  const ledger: Record<string, { totalSales: number; count: number; email: string }> = {};

  allOrders.forEach(order => {
    // If you are the admin, you see everyone. 
    // In a real app, we would fetch the creator's email from Clerk, 
    // but here we will group by their User ID for now.
    const creatorId = order.funnel.userId;
    
    if (!ledger[creatorId]) {
      ledger[creatorId] = { totalSales: 0, count: 0, email: creatorId };
    }
    ledger[creatorId].totalSales += order.amount;
    ledger[creatorId].count += 1;
  });

  // 3. Define Platform Fee (e.g., 10%)
  const PLATFORM_FEE = 0.10;

  return (
    <div>
      <DashboardNav title="Financials" subtitle="Creator Payouts" />
      
      <div className="grid grid-cols-1 gap-8">
        {/* PAYOUTS TABLE */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <div>
               <h3 className="text-lg font-black text-slate-900">Pending Payouts</h3>
               <p className="text-xs text-slate-400 font-bold mt-1">Global Creator Liabilities</p>
             </div>
             <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
                Net-30 Terms
             </span>
          </div>
          
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-8 py-6">Creator ID / Wallet</th>
                <th className="px-8 py-6 text-center">Items Sold</th>
                <th className="px-8 py-6 text-right">Gross Volume</th>
                <th className="px-8 py-6 text-right text-red-400">Your Fee (10%)</th>
                <th className="px-8 py-6 text-right text-green-600">Payout Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Object.entries(ledger).length === 0 && (
                <tr><td colSpan={5} className="p-10 text-center text-slate-300 font-bold italic">No sales data available yet.</td></tr>
              )}
              {Object.entries(ledger).map(([id, data]) => {
                const fee = data.totalSales * PLATFORM_FEE;
                const payout = data.totalSales - fee;
                
                // Highlight YOUR own account differently
                const isMe = id === user.id;

                return (
                  <tr key={id} className={isMe ? "bg-blue-50/50" : "hover:bg-slate-50"}>
                    <td className="px-8 py-6">
                      <span className={`font-black ${isMe ? "text-blue-700" : "text-slate-900"}`}>
                        {isMe ? "YOU (Platform Owner)" : id.substring(0, 15) + "..."}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-slate-500">{data.count}</td>
                    <td className="px-8 py-6 text-right font-bold text-slate-400">KES {data.totalSales.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right font-bold text-red-400">- KES {fee.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right font-black text-green-600 text-lg">KES {payout.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 text-slate-400 p-8 rounded-[32px] text-xs font-mono">
           <span className="text-white font-bold uppercase tracking-widest block mb-2">Global SaaS Strategy</span>
           <p>Since you hold the funds (Merchant of Record), you can payout these creators via PayPal, Wise, or Crypto, regardless of their country.</p>
        </div>
      </div>
    </div>
  );
}