import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { DollarSign, Package, ShoppingCart, Activity } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // 1. Fetch Key Stats
  const products = await (db as any).product.findMany({
    where: { userId },
    include: { orders: true } // Assuming 'orders' relation exists
  });

  // 2. Calculate Metrics
  const totalFunnels = products.length;
  const activeFunnels = products.filter((p: any) => p.isPublished).length;
  
  // Calculate Revenue (Safe calculation)
  let totalRevenue = 0;
  let totalSales = 0;
  
  products.forEach((product: any) => {
    const productSales = product.orders ? product.orders.length : 0;
    totalSales += productSales;
    totalRevenue += (productSales * product.price);
  });

  return (
    <div className="p-8 space-y-8 bg-black min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* TOTAL REVENUE */}
        <Card className="bg-[#0B0F1A] border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* TOTAL SALES */}
        <Card className="bg-[#0B0F1A] border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
            <p className="text-xs text-slate-500"> across all funnels</p>
          </CardContent>
        </Card>

        {/* ACTIVE FUNNELS */}
        <Card className="bg-[#0B0F1A] border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Funnels</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFunnels} / {totalFunnels}</div>
            <p className="text-xs text-slate-500">currently live</p>
          </CardContent>
        </Card>

         {/* PRODUCTS */}
        <Card className="bg-[#0B0F1A] border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Products</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFunnels}</div>
            <p className="text-xs text-slate-500">in your inventory</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}