import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; // FIXED IMPORT
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package, ShoppingBag } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch Orders via Product Relation
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
    take: 5,
  });

  const products = await db.product.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalRevenue = orders.reduce((acc, order) => acc + order.net, 0);
  const totalSales = orders.length;
  const activeProducts = products.filter((p) => p.isPublished).length;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">KES {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-slate-500">Net Earnings (90%)</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalSales}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Products</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeProducts}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}