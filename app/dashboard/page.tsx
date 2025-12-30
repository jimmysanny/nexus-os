import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Activity } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // 1. Fetch Key Stats
  const products = await db.product.findMany({
    where: { userId },
    include: { orders: true }
  });

  const orders = await db.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5 
  });

  // 2. Calculate Real Revenue (Using the new 'amount' field)
  // We filter for 'isPaid: true' to only count real money.
  const totalRevenue = orders.reduce((total, order) => {
    if (order.isPaid) {
      return total + (order.amount || 0);
    }
    return total;
  }, 0);

  const totalSales = orders.filter(o => o.isPaid).length;
  const activeFunnels = products.filter(p => p.isPublished).length;

  return (
    <div className="p-8 bg-black min-h-screen text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Dashboard Overview</h1>
      
      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-[#0B0F1A] border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F1A] border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{totalSales}</div>
            <p className="text-xs text-slate-500">across all funnels</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F1A] border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Funnels</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeFunnels} / {products.length}</div>
            <p className="text-xs text-slate-500">currently live</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0B0F1A] border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Products</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{products.length}</div>
            <p className="text-xs text-slate-500">in your inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ORDERS TABLE */}
      <h2 className="text-xl font-bold text-white mb-4">Recent Sales</h2>
      <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl overflow-hidden">
         {orders.length === 0 ? (
           <div className="p-8 text-center text-slate-500">No sales yet.</div>
         ) : (
           <div className="w-full">
             <div className="flex bg-slate-900/50 p-3 text-xs font-bold text-slate-400 border-b border-slate-800">
               <div className="flex-1">CUSTOMER</div>
               <div className="w-32">AMOUNT</div>
               <div className="w-32">STATUS</div>
             </div>
             {orders.map((order) => (
               <div key={order.id} className="flex p-4 border-b border-slate-800/50 text-sm hover:bg-slate-900/30 transition">
                 <div className="flex-1 text-white">{order.email || "Anonymous"}</div>
                 <div className="w-32 text-indigo-400 font-mono">KES {order.amount?.toLocaleString()}</div>
                 <div className="w-32">
                   {order.isPaid ? (
                     <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold">PAID</span>
                   ) : (
                     <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold">PENDING</span>
                   )}
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}