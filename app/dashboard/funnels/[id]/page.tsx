import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ThemePicker from "@/components/ThemePicker";
import { getTheme } from "@/lib/themes";

export default async function FunnelDetailsPage({ params }: { params: { id: string } }) {
  const funnel = await prisma.funnel.findUnique({
    where: { id: params.id },
    include: { orders: true }
  });

  if (!funnel) return notFound();
  
  const theme = getTheme(funnel.themeColor);
  const revenue = funnel.orders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
       {/* Breadcrumb */}
       <div className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900">{funnel.name}</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h1 className="text-3xl font-black text-slate-900">{funnel.name}</h1>
                      <Link href={`/f/${funnel.id}`} target="_blank" className={`text-sm font-bold ${theme.accent} hover:underline mt-1 inline-block`}>
                         View Live Page 
                      </Link>
                   </div>
                   <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-black uppercase tracking-widest text-slate-500">
                      {funnel.orders.length} Sales
                   </span>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between">
                   <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
                      <p className="text-3xl font-black text-slate-900">KES {revenue.toLocaleString()}</p>
                   </div>
                   <div className="text-4xl opacity-20">💰</div>
                </div>
             </div>
          </div>

          {/* Sidebar / Settings */}
          <div className="space-y-6">
             {/* THEME PICKER INJECTED HERE */}
             <ThemePicker funnelId={funnel.id} currentTheme={funnel.themeColor || "blue"} />
             
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm opacity-50 pointer-events-none">
                <h3 className="font-bold text-slate-900 mb-2">Coupons</h3>
                <p className="text-xs text-slate-400">Discount management coming soon.</p>
             </div>
          </div>
       </div>
    </div>
  );
}