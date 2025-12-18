import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DollarSign, ShoppingBag, Activity, Users } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // 1. Fetch Real Data
  const funnels = await db.funnel.findMany({
    where: { userId: user.id },
    include: { 
      orders: { orderBy: { createdAt: "desc" }, take: 5 } 
    }
  });

  // 2. Calculate Stats
  const totalFunnels = funnels.length;
  const activeFunnels = funnels.filter(f => f.published).length;
  
  // Flatten orders to get totals
  const allOrders = funnels.flatMap(f => f.orders);
  const totalRevenue = allOrders.reduce((acc, order) => acc + order.amount, 0);
  const totalSales = allOrders.length;
  
  // Get recent sales across all funnels
  // (We sort again just to be safe if multiple funnels have orders)
  const recentSales = allOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="p-8 text-white max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back, {user.firstName || "User"}. Here is what is happening today.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* REVENUE CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-white mt-1">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
                    <DollarSign size={24} />
                </div>
            </div>
        </div>

        {/* SALES CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Total Sales</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{totalSales}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                    <ShoppingBag size={24} />
                </div>
            </div>
        </div>

        {/* FUNNELS CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Active Funnels</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{activeFunnels} <span className="text-gray-500 text-lg font-normal">/ {totalFunnels}</span></h3>
                </div>
                <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
                    <Activity size={24} />
                </div>
            </div>
        </div>
        
        {/* CUSTOMERS CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Unique Customers</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{new Set(allOrders.map(o => o.customerEmail)).size}</h3>
                </div>
                <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
                    <Users size={24} />
                </div>
            </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
        {recentSales.length === 0 ? (
            <p className="text-gray-500">No recent sales. Time to launch a new funnel!</p>
        ) : (
            <div className="space-y-4">
                {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-900/50 text-green-400 flex items-center justify-center font-bold">
                                $
                            </div>
                            <div>
                                <p className="font-bold text-white">{sale.customerEmail}</p>
                                <p className="text-xs text-gray-400">{new Date(sale.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <span className="font-mono font-bold text-green-400">+${sale.amount}</span>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
