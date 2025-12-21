import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch funnels with their orders safely
  const funnels = await prisma.funnel.findMany({
    where: { userId: user.id },
    include: { orders: true },
    orderBy: { createdAt: "desc" }
  });

  const totalRevenue = funnels.reduce((acc, funnel) => {
    return acc + funnel.orders.reduce((sum, order) => sum + order.amount, 0);
  }, 0);

  const totalSales = funnels.reduce((acc, funnel) => acc + funnel.orders.length, 0);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
           <p className="text-slate-500">Welcome back, {user.firstName}</p>
        </div>
        <Link href="/dashboard/create" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
          + New Asset
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
           <p className="text-4xl font-black mt-2">KES {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Sales</p>
           <p className="text-4xl font-black mt-2">{totalSales}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Assets</p>
           <p className="text-4xl font-black mt-2">{funnels.length}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="font-bold text-lg">Your Digital Assets</h3>
        </div>
        {funnels.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
             <p>No assets created yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
             {funnels.map((funnel) => (
                <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`} className="block p-6 hover:bg-slate-50 transition-colors flex justify-between items-center">
                   <div>
                      <p className="font-bold text-slate-900">{funnel.name}</p>
                      <p className="text-sm text-slate-500">{funnel.orders.length} sales • KES {funnel.price}</p>
                   </div>
                   <span className="text-slate-300">→</span>
                </Link>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}