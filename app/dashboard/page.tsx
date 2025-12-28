import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/primitives";
import { DollarSign, CreditCard, Package } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return <div>Unauthorized</div>;

  // Fetch Real Analytics
  const funnelCount = await prisma.funnel.count({ where: { userId } });
  
  // Placeholder for orders (Since we don't have Order model yet, we simulate 0)
  // TODO: Connect this to real Order model when we build the webhook
  const salesCount = 0; 
  const totalRevenue = 0; 

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-slate-400">Overview of your digital empire.</p>
        </div>
        <Link href="/dashboard/funnels/new">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition">
            + Create Funnel
          </button>
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Revenue Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-400">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">KES {totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-slate-500">+0% from last month</p>
        </Card>

        {/* Sales Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-400">Sales</h3>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">+{salesCount}</div>
          <p className="text-xs text-slate-500">+0% from last month</p>
        </Card>

        {/* Funnels Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-400">Active Funnels</h3>
            <Package className="h-4 w-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold">{funnelCount}</div>
          <p className="text-xs text-slate-500">Products currently live</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6 bg-slate-900/50">
           <h3 className="font-semibold mb-4">Recent Activity</h3>
           <div className="h-[200px] flex items-center justify-center text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded">
              No sales recorded yet. Start promoting your funnels!
           </div>
        </Card>
      </div>
    </div>
  );
}
