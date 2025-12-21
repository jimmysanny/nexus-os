import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheme } from "@/lib/themes";
import PageHeader from "@/components/PageHeader";

export default async function FunnelsPage() {
  const user = await currentUser();
  if (!user) return notFound();

  const funnels = await prisma.funnel.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { orders: true }
  });

  return (
    <div className="space-y-8">
       {/* Replaced broken DashboardNav props with clean PageHeader */}
       <div className="flex justify-between items-start">
          <PageHeader title="Products" subtitle="Manage your digital inventory" />
          <Link href="/dashboard/create" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-slate-200">
             <span>+</span> New Product
          </Link>
       </div>

       {funnels.length === 0 ? (
          <div className="bg-white p-20 rounded-[32px] border border-dashed border-slate-200 text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"></div>
             <p className="text-slate-500 font-medium mb-4">You have not created any products yet.</p>
             <Link href="/dashboard/create" className="text-blue-600 font-bold hover:underline">Launch your first asset &rarr;</Link>
          </div>
       ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {funnels.map((funnel) => {
                const theme = getTheme(funnel.themeColor);
                return (
                   <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      <div className={`h-40 rounded-2xl ${theme.secondary} mb-6 flex items-center justify-center text-4xl overflow-hidden`}>
                         {funnel.logoUrl ? <img src={funnel.logoUrl} className="w-full h-full object-cover" /> : ""}
                      </div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{funnel.name}</h4>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                         <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${funnel.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                            {funnel.published ? "Live" : "Draft"}
                         </span>
                         <span className={`font-bold ${theme.accent}`}>KES {funnel.price}</span>
                      </div>
                   </Link>
                );
             })}
          </div>
       )}
    </div>
  );
}