import { db } from "@/lib/db";
import { DollarSign, Users, ShoppingBag, ArrowUpRight } from "lucide-react";

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { funnel: true }
  });

  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const totalCustomers = new Set(orders.map(o => o.customerEmail)).size;

  return (
    <div className="p-8 space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-bold">Sales & Revenue</h1>
        <p className="text-gray-400">Track every dollar coming into your business.</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><DollarSign size={24}/></div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">+12.5% <ArrowUpRight size={12}/></span>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <h2 className="text-3xl font-bold mt-1">${totalRevenue.toFixed(2)}</h2>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 w-fit"><ShoppingBag size={24}/></div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm font-medium">Total Orders</p>
            <h2 className="text-3xl font-bold mt-1">{orders.length}</h2>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <div className="p-3 bg-green-500/10 rounded-xl text-green-500 w-fit"><Users size={24}/></div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm font-medium">Unique Customers</p>
            <h2 className="text-3xl font-bold mt-1">{totalCustomers}</h2>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="font-bold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Funnel</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 font-medium text-sm">{order.customerEmail}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{order.funnel.name}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-bold">PAID</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-right">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No sales recorded yet. Send your link to someone!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
