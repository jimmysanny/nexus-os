import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const funnels = await prisma.funnel.findMany({
    where: { userId: user.id },
    include: { orders: true }
  });

  const allOrders = funnels.flatMap(f => f.orders);
  const totalRevenue = allOrders.reduce((acc, order) => acc + order.amount, 0);

  return (
    <div className="space-y-8">
      <PageHeader title="Analytics" subtitle="Deep dive into your performance metrics" />
      
      {/* Revenue Card */}
      <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
         <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Revenue</p>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">KES {totalRevenue.toLocaleString()}</h2>
         </div>
         <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center text-3xl"></div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
         <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
         </div>
         <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              {allOrders.length === 0 ? (
                 <tr><td className="p-8 text-center text-slate-400">No sales yet.</td></tr>
              ) : (
                allOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-medium text-slate-900">{order.customerEmail || "Anonymous"}</td>
                    <td className="p-6 font-bold text-green-600">+ KES {order.amount.toLocaleString()}</td>
                    <td className="p-6 text-right text-slate-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
         </table>
      </div>
    </div>
  );
}