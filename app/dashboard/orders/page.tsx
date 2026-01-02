import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // FIX: Query orders via the Product relation
  const orders = await db.order.findMany({
    where: {
      product: {
        userId: userId,
      },
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Orders & Revenue</h1>
        <div className="text-slate-400 text-sm">
          Total Orders: <span className="text-white font-bold">{orders.length}</span>
        </div>
      </div>

      <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900/50">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">Date</TableHead>
              <TableHead className="text-slate-400">Product</TableHead>
              <TableHead className="text-slate-400">Customer</TableHead>
              <TableHead className="text-slate-400">Price</TableHead>
              <TableHead className="text-slate-400">Your Net (90%)</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow className="border-slate-800 hover:bg-transparent">
                 <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                   No orders found. Share your funnel links to start selling!
                 </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="border-slate-800 hover:bg-slate-900/30">
                  <TableCell className="text-slate-300 font-medium">
                    {format(new Date(order.createdAt), "MMM do, yyyy")}
                  </TableCell>
                  <TableCell className="text-white">
                    {order.product.name}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {order.customerEmail}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    KES {order.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-green-400 font-bold">
                    KES {order.net.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={order.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}