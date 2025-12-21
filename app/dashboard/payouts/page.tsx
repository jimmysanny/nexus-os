import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import PageHeader from "@/components/PageHeader";

export default async function PayoutsPage() {
  const user = await currentUser();
  if (!user) return <div>Sign in required</div>;

  // Fetch verified orders from DB (Webhook populated)
  const orders = await prisma.order.findMany({
    where: { funnel: { userId: user.id } },
    orderBy: { createdAt: "desc" },
    include: { funnel: true }
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-8">
      <PageHeader title="Financials" subtitle="Verified Revenue & Payouts" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Earned</p>
            <p className="text-4xl font-black">KES {totalRevenue.toLocaleString()}</p>
         </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
         </div>
         {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No verified transactions yet.</div>
         ) : (
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                     <th className="px-6 py-4">Product</th>
                     <th className="px-6 py-4">Customer</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {orders.map(order => (
                     <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{order.funnel.name}</td>
                        <td className="px-6 py-4 text-slate-600">{order.customerEmail}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">KES {order.amount}</td>
                        <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">PAID</span></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
    </div>
  );
}