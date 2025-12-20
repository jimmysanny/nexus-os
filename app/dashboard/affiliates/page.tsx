import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";

export default async function AffiliateDashboard() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // 1. Get the User's "Merchant" Profile (to get their username/ref code)
  const merchant = await prisma.merchant.findUnique({
    where: { userId: user.id }
  });

  // If they haven not set a username yet, they cannot be an affiliate
  const username = merchant?.username;

  let totalSales = 0;
  let commissionEarned = 0;
  let saleCount = 0;

  if (username) {
    // 2. Find Orders where THEY were the referrer
    const affiliateOrders = await prisma.order.findMany({
      where: { 
        affiliateCode: username, // This matches ?ref=james
        status: "SUCCESS"
      }
    });

    saleCount = affiliateOrders.length;
    
    // Calculate Commission (Let's assume standard 10% for now)
    const COMMISSION_RATE = 0.10; 
    
    affiliateOrders.forEach(order => {
      totalSales += order.amount;
      commissionEarned += (order.amount * COMMISSION_RATE);
    });
  }

  return (
    <div>
      <DashboardNav title="Affiliate Program" subtitle="Promote & Earn" />
      
      {!username ? (
        <div className="p-10 bg-orange-50 rounded-[32px] border border-orange-100 text-center">
           <h3 className="text-orange-900 font-black text-lg mb-2">Partner Account Inactive</h3>
           <p className="text-orange-700 mb-6">You need to claim a Username in Settings before you can start earning commissions.</p>
           <a href="/dashboard/settings" className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-700">
             Claim Username
           </a>
        </div>
      ) : (
        <div className="space-y-8">
           {/* 1. LINK GENERATOR */}
           <div className="bg-blue-600 text-white p-8 rounded-[40px] shadow-xl shadow-blue-900/20 relative overflow-hidden">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black mb-2">Your Unique Referral Link</h3>
                 <p className="text-blue-200 mb-6 text-sm">Share this link. When anyone buys *anything* on the platform, you get paid.</p>
                 
                 <div className="flex gap-2">
                    <code className="bg-blue-800/50 px-6 py-4 rounded-xl font-mono text-sm flex-1 border border-blue-400/30">
                       https://nexus.ke/market?ref={username}
                    </code>
                    <button className="px-6 py-4 bg-white text-blue-900 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-50">
                       Copy
                    </button>
                 </div>
              </div>
              {/* Decoration */}
              <div className="absolute -right-10 -bottom-10 text-[200px] opacity-10 rotate-12"></div>
           </div>

           {/* 2. STATS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Sales Generated</p>
                 <div className="text-3xl font-black text-slate-900">KES {totalSales.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-slate-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Your Commission (10%)</p>
                 <div className="text-3xl font-black text-green-600">KES {commissionEarned.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-slate-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Successful Referrals</p>
                 <div className="text-3xl font-black text-blue-600">{saleCount}</div>
              </div>
           </div>
           
           <div className="text-center p-8">
              <p className="text-xs text-slate-400 font-medium">
                 * Payouts are processed every Friday via M-Pesa or Bank Transfer.
              </p>
           </div>
        </div>
      )}
    </div>
  );
}