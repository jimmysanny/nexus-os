import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import RevenueChart from "@/components/RevenueChart";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // 1. FETCH REAL DATA
  const products = await prisma.funnel.findMany({ where: { userId: user.id } });
  
  // Get all orders for this user (products they own)
  const productIds = products.map(p => p.id);
  const orders = await prisma.order.findMany({
    where: { 
      funnelId: { in: productIds },
      status: "SUCCESS"
    },
    orderBy: { createdAt: "desc" }
  });

  // 2. CALCULATE TOTALS
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const totalSales = orders.length;
  
  // 3. GENERATE 7-DAY CHART DATA
  const today = new Date();
  const chartData = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue"
    
    // Sum orders for this specific day
    const dayTotal = orders
      .filter(o => o.createdAt.toLocaleDateString() === d.toLocaleDateString())
      .reduce((acc, o) => acc + o.amount, 0);
      
    chartData.push({ day: dateStr, amount: dayTotal });
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <DashboardNav />
      
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
           <div>
             <h1 className="text-3xl font-black text-slate-900">Command Center</h1>
             <p className="text-slate-500 font-medium">Welcome back, {user.firstName}. Here is your empire at a glance.</p>
           </div>
           <div className="flex gap-3">
             <Link href="/dashboard/funnels/new" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all">
               + New Product
             </Link>
             <Link href="/market" className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
               View Store
             </Link>
           </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {/* REVENUE CARD */}
           <div className="bg-blue-600 text-white p-8 rounded-[32px] shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest mb-1">Total Revenue</p>
                <h2 className="text-4xl font-black">KES {totalRevenue.toLocaleString()}</h2>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-9xl text-blue-500 opacity-20 group-hover:scale-110 transition-transform"></div>
           </div>

           {/* SALES CARD */}
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Sales</p>
                <h2 className="text-4xl font-black text-slate-900">{totalSales}</h2>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-9xl text-slate-100 group-hover:scale-110 transition-transform"></div>
           </div>

           {/* PRODUCTS CARD */}
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Products</p>
                <h2 className="text-4xl font-black text-slate-900">{products.length}</h2>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-9xl text-slate-100 group-hover:scale-110 transition-transform"></div>
           </div>
        </div>

        {/* THE NEW VISUAL CHART */}
        <div className="mb-10">
           <RevenueChart data={chartData} />
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center">
             <h3 className="font-black text-slate-900">Recent Transactions</h3>
             <Link href="/dashboard/payouts" className="text-blue-600 text-xs font-bold hover:underline">View All</Link>
           </div>
           
           {orders.length === 0 ? (
             <div className="p-12 text-center">
               <p className="text-slate-400 font-bold mb-4">No sales yet.</p>
               <p className="text-sm text-slate-500">Share your product links to start seeing data here!</p>
             </div>
           ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <tr>
                      <th className="px-8 py-4">Customer</th>
                      <th className="px-8 py-4">Amount</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-900">
                           {order.customerEmail || "Anonymous"}
                        </td>
                        <td className="px-8 py-4 font-black text-slate-900">
                           KES {order.amount.toLocaleString()}
                        </td>
                        <td className="px-8 py-4">
                           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                             {order.status}
                           </span>
                        </td>
                        <td className="px-8 py-4 font-mono text-xs">
                           {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}