import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await db.order.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 bg-black min-h-screen text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-2">Customer Orders</h1>
      <p className="text-slate-400 mb-8">Track your sales and customer details.</p>

      <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Your order history will appear here once payments are processed.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400 font-medium">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/30">
                  <td className="p-4 text-white font-medium">{order.product?.name || "Unknown Product"}</td>
                  <td className="p-4 text-slate-400">{order.email || "N/A"}</td>
                  <td className="p-4 text-indigo-400 font-mono">KES {order.amount.toLocaleString()}</td>
                  <td className="p-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    {order.isPaid ? (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                         Completed
                       </span>
                    ) : (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                         Pending
                       </span>
                    )}
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