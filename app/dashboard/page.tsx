import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package, ShoppingBag } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // 1. FETCH ORDERS (Corrected Relational Query)
  // We find orders where the RELATED PRODUCT belongs to this user.
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

  // 2. FETCH PRODUCTS
  const products = await db.product.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 3. CALCULATE METRICS
  const totalRevenue = orders.reduce((acc, order) => acc + order.net, 0);
  const totalSales = orders.length;
  const activeProducts = products.filter((p) => p.isPublished).length;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        </div>
        
        {/* METRIC CARDS */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">KES {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-slate-500">+20.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+{totalSales}</div>
              <p className="text-xs text-slate-500">+19% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Products</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeProducts}</div>
              <p className="text-xs text-slate-500">{products.length} total drafts</p>
            </CardContent>
          </Card>
        </div>

        {/* RECENT SALES TABLE */}
        <div className="grid gap-4 grid-cols-1">
          <Card className="bg-[#0B0F1A] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ShoppingBag className="h-12 w-12 text-slate-700 mb-4" />
                  <p className="text-slate-400">No sales yet.</p>
                  <p className="text-sm text-slate-600">Share your product links to start earning.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center">
                       <div className="h-9 w-9 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <DollarSign className="h-4 w-4 text-indigo-500" />
                       </div>
                       <div className="ml-4 space-y-1">
                         <p className="text-sm font-medium leading-none text-white">{order.customerEmail}</p>
                         <p className="text-sm text-slate-400">{order.product.name}</p>
                       </div>
                       <div className="ml-auto font-medium text-green-500">+KES {order.net.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}