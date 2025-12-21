import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getTheme } from "@/lib/themes";

export default async function DashboardPage() {
  const user = await currentUser();
  const funnels = await prisma.funnel.findMany({
    where: { userId: user?.id },
    include: { orders: true },
    orderBy: { createdAt: "desc" }
  });

  const totalRevenue = funnels.reduce((acc, f) => acc + f.orders.reduce((sum, o) => sum + o.amount, 0), 0);

  return (
    <div className="space-y-8">
       {/* Welcome Banner (Replaces Nav in visual importance) */}
       <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden flex justify-between items-center">
          <div className="relative z-10">
             <h1 className="text-3xl font-black mb-2">Command Center</h1>
             <p className="text-slate-400 font-medium">Overview of your digital empire.</p>
          </div>
          <Link href="/dashboard/create" className="relative z-10 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
             <span className="text-xl">+</span> New Product
          </Link>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Revenue</p>
             <p className="text-2xl font-black text-slate-900 mt-1">KES {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Orders</p>
             <p className="text-2xl font-black text-slate-900 mt-1">{funnels.reduce((acc, f) => acc + f.orders.length, 0)}</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active</p>
             <p className="text-2xl font-black text-slate-900 mt-1">{funnels.length}</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Plan</p>
             <p className="text-2xl font-black text-slate-900 mt-1">Pro</p>
          </div>
       </div>

       {/* Products List */}
       <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
             <h3 className="font-bold text-xl text-slate-900">Your Products</h3>
          </div>
          
          {funnels.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium mb-4">No assets created yet.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funnels.map((funnel) => {
                   const theme = getTheme(funnel.themeColor);
                   return (
                      <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                         <div className={`h-40 rounded-2xl ${theme.secondary} mb-6 flex items-center justify-center text-4xl overflow-hidden`}>
                            {funnel.logoUrl ? <img src={funnel.logoUrl} className="w-full h-full object-cover" /> : ""}
                         </div>
                         <h4 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{funnel.name}</h4>
                         <div className="flex justify-between items-center text-sm text-slate-500">
                            <span>{funnel.orders.length} Sales</span>
                            <span className={`font-bold ${theme.accent}`}>KES {funnel.price}</span>
                         </div>
                      </Link>
                   );
                })}
             </div>
          )}
       </div>
    </div>
  );
}