import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const funnels = await prisma.funnel.findMany({
    where: { userId: user.id },
    include: { orders: true },
    orderBy: { createdAt: "desc" }
  });

  const totalRevenue = funnels.reduce((acc, funnel) => {
    return acc + funnel.orders.reduce((sum, order) => sum + order.amount, 0);
  }, 0);

  const totalSales = funnels.reduce((acc, funnel) => acc + funnel.orders.length, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h1 className="text-4xl font-black text-slate-900 tracking-tight">Command Center</h1>
             <p className="text-slate-500 font-medium mt-1">Welcome back, {user.firstName}. Ready to scale?</p>
          </div>
          <Link href="/dashboard/create" className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:shadow-none hover:translate-y-1">
            <span> Launch New Asset</span>
          </Link>
        </div>

        <DashboardNav title="" />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl"></span>
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Lifetime Earnings</p>
             <p className="text-5xl font-black mt-3 text-slate-900 tracking-tight">
               <span className="text-2xl align-top opacity-50 mr-1">KES</span>
               {totalRevenue.toLocaleString()}
             </p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Customers</p>
             <p className="text-5xl font-black mt-3 text-slate-900 tracking-tight">{totalSales}</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Funnels</p>
             <p className="text-5xl font-black mt-3 text-slate-900 tracking-tight">{funnels.length}</p>
          </div>
        </div>

        {/* Assets List */}
        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <h3 className="font-bold text-xl text-slate-900">Your Digital Empire</h3>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Activity</span>
          </div>
          {funnels.length === 0 ? (
            <div className="p-20 text-center">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"></div>
               <h3 className="text-lg font-bold text-slate-900">No products yet</h3>
               <p className="text-slate-500 mb-6">Create your first digital asset to start selling.</p>
               <Link href="/dashboard/create" className="text-blue-600 font-bold hover:underline">Create Product &rarr;</Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
               {funnels.map((funnel) => (
                  <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`} className="flex flex-col md:flex-row md:items-center justify-between p-8 hover:bg-blue-50/30 transition-colors group">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                           {funnel.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{funnel.name}</p>
                           <p className="text-sm text-slate-500 font-medium">
                              {funnel.orders.length} sales  <span className="text-green-600 font-bold">KES {funnel.price}</span>
                           </p>
                        </div>
                     </div>
                     <div className="mt-4 md:mt-0 flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${funnel.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                           {funnel.published ? "Live" : "Draft"}
                        </span>
                        <span className="text-slate-300 group-hover:translate-x-1 transition-transform"></span>
                     </div>
                  </Link>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}