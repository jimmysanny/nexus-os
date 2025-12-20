import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function CustomersPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch all orders, sorted by newest first
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { funnel: true }, // Include funnel name
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Customers</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
          {orders.length} Total Orders
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No customers yet. Share your funnel link to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product Purchased</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.customerEmail || "Anonymous"}
                    </td>
                    <td className="px-6 py-4">
                      {order.funnel?.name || "Unknown Funnel"}
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
