import DashboardNav from "@/components/DashboardNav";
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
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <DashboardNav title="Analytics" subtitle="Deep dive into your performance" />
      <div className="grid grid-cols-2 gap-6">
         <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Revenue</p>
            <p className="text-4xl font-black mt-2">KES {totalRevenue.toLocaleString()}</p>
         </div>
      </div>
      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden">
         <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              {allOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="p-6 font-medium text-slate-900">{order.customerEmail || "Anonymous"}</td>
                  <td className="p-6 font-bold">KES {order.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}