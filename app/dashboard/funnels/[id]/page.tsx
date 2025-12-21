import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ThemePicker from "@/components/ThemePicker";
import { getTheme } from "@/lib/themes";
import PageHeader from "@/components/PageHeader";

export default async function FunnelDetailsPage({ params }: { params: { id: string } }) {
  const funnel = await prisma.funnel.findUnique({
    where: { id: params.id },
    include: { orders: true }
  });

  if (!funnel) return notFound();
  
  const theme = getTheme(funnel.themeColor);
  const revenue = funnel.orders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="space-y-8">
       {/* Clean Breadcrumb */}
       <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-900">Products</Link>
          <span>/</span>
          <span className="text-slate-900">{funnel.name}</span>
       </div>

       <div className="flex justify-between items-start">
          <PageHeader title={funnel.name} subtitle="Manage product settings and theme." />
          <div className="flex gap-2">
             <Link href={`/f/${funnel.id}`} target="_blank" className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-900 transition-all flex items-center gap-2">
                <span>View Live</span>
                <span></span>
             </Link>
             <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all">
                Save Changes
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats Area */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                   <p className="text-4xl font-black text-slate-900">KES {revenue.toLocaleString()}</p>
                </div>
                <div className={`w-16 h-16 rounded-2xl ${theme.secondary} flex items-center justify-center text-3xl`}>
                   
                </div>
             </div>
             
             {/* Product Details Form (Simulated) */}
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Price (KES)</label>
                      <input disabled defaultValue={funnel.price} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-500" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                      <input disabled defaultValue={funnel.category} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-500" />
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar / Theme Picker */}
          <div className="space-y-6">
             <ThemePicker funnelId={funnel.id} currentTheme={funnel.themeColor || "blue"} />
             
             <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 text-sm">QR Code</h3>
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-2">
                   <span className="text-4xl"></span>
                </div>
                <p className="text-center text-xs text-slate-400">Scan to checkout</p>
             </div>
          </div>
       </div>
    </div>
  );
}