import { db } from "@/lib/db";
// FIXED: Added "/server" to the import path below
import { currentUser } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // 1. Get all funnels owned by this user
  const funnels = await db.funnel.findMany({
    where: { userId: user.id },
    include: { 
      orders: {
        orderBy: { createdAt: 'desc' }
      } 
    }
  });

  // 2. Flatten the list (Combine orders from all funnels)
  const allOrders = funnels.flatMap(f => f.orders.map(o => ({ ...o, funnelName: f.name })));

  return (
    <div className="p-8 text-white max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">Customer Transactions</h1>
            <p className="text-gray-400">Real-time tracking of your revenue.</p>
        </div>
        <div className="bg-green-900/30 border border-green-900 text-green-400 px-4 py-2 rounded-lg font-mono">
            Total Sales: ${allOrders.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {allOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
                <p>No sales yet. Share your funnel to start making money!</p>
            </div>
        ) : (
            <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer Email</th>
                        <th className="p-4">Funnel</th>
                        <th className="p-4 text-right">Amount</th>
                        <th className="p-4 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {allOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-800/50 transition">
                            <td className="p-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 font-medium">{order.customerEmail}</td>
                            <td className="p-4 text-blue-400 text-sm">{order.funnelName}</td>
                            <td className="p-4 text-right font-mono">${order.amount.toFixed(2)}</td>
                            <td className="p-4 text-center">
                                <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded-full border border-green-900">
                                    {order.status}
                                </span>
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
