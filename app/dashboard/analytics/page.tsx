import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ExportButton from "@/components/ExportButton";

export default async function AnalyticsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const realOrders = await prisma.order.findMany({
    where: { status: "SUCCESS" },
    include: { funnel: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-[#FBFCFE] p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Market <span className="text-blue-600">Intelligence</span></h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Data Portability Active</p>
          </div>
          <div className="flex gap-4">
            <ExportButton data={realOrders} />
            <Link href="/dashboard" className="bg-white border border-slate-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center">HQ</Link>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest italic text-blue-600">Transaction Ledger</h3>
            <span className="text-[10px] font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full">{realOrders.length} Records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-10 py-6">Customer</th>
                  <th className="px-10 py-6">Asset</th>
                  <th className="px-10 py-6">Yield (KES)</th>
                  <th className="px-10 py-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {realOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6 font-bold text-slate-900">{order.customerEmail}</td>
                    <td className="px-10 py-6 text-slate-500 font-medium">{order.funnel?.name}</td>
                    <td className="px-10 py-6 font-black text-slate-900">{order.amount.toLocaleString()}</td>
                    <td className="px-10 py-6 text-right text-slate-400 text-xs font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}