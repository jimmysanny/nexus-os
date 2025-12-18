import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { CreditCard, Users, DollarSign, Activity } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return <div>Please sign in</div>;

  // 1. Fetch all funnels for this user
  const funnels = await db.funnel.findMany({
    where: { userId: user.id },
    include: { orders: true },
  });

  // 2. Calculate Real Stats
  const totalFunnels = funnels.length;
  
  // Flatten all orders from all funnels into one list
  const allOrders = funnels.flatMap(f => f.orders);
  
  const totalSales = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="p-8 text-white space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <span className="text-gray-400">Welcome back, {user.firstName}</span>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* REVENUE CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-1">${totalRevenue.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <DollarSign size={24} />
            </div>
          </div>
          <span className="text-green-400 text-sm font-medium">+100% from last month</span>
        </div>

        {/* SALES CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Sales</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalSales}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <CreditCard size={24} />
            </div>
          </div>
        </div>

        {/* FUNNELS CARD */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Funnels</p>
              <h3 className="text-3xl font-bold text-white mt-1">{totalFunnels}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
              <Activity size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT CUSTOMERS TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users size={18} className="text-gray-400" /> Recent Customers
          </h3>
        </div>
        
        {allOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No sales yet. Share your funnel to get started!
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {allOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/30 transition">
                  <td className="p-4 text-white font-medium">{order.customerEmail}</td>
                  <td className="p-4 text-green-400 font-bold">+${order.amount}</td>
                  <td className="p-4">
                    <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
