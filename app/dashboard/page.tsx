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
       {/* Welcome Section */}
       <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="relative z-10">
             <h1 className="text-3xl font-black mb-2">Command Center</h1>
             <p className="text-slate-400">You have {funnels.length} active assets generating revenue.</p>
          </div>
          <div className="relative z-10 mt-4 md:mt-0">
             <Link href="/dashboard/create" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                <span>+</span> Create New Asset
             </Link>
          </div>
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
       </div>

       {/* Quick Stats */}
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
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Conv. Rate</p>
             <p className="text-2xl font-black text-slate-900 mt-1">2.4%</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Plan</p>
             <p className="text-2xl font-black text-slate-900 mt-1">Pro</p>
          </div>
       </div>

       {/* Funnel Grid */}
       <div className="space-y-4">
          <h3 className="font-bold text-xl text-slate-900 px-2">Your Assets</h3>
          {funnels.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No assets created yet.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funnels.map((funnel) => {
                   const theme = getTheme(funnel.themeColor);
                   return (
                      <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all hover:-translate-y-1">
                         <div className={`h-32 rounded-2xl ${theme.secondary} mb-6 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform`}>
                            
                         </div>
                         <h4 className="font-bold text-lg text-slate-900 mb-1">{funnel.name}</h4>
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