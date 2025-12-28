import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/primitives";
import { Plus, ExternalLink, MoreVertical } from "lucide-react";

export default async function FunnelsPage() {
  const { userId } = await auth();
  
  if (!userId) return <div>Unauthorized</div>;

  const funnels = await prisma.funnel.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">My Funnels</h2>
           <p className="text-slate-400">Manage your products and offers.</p>
        </div>
        <Link href="/dashboard/funnels/new">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition">
            <Plus className="w-4 h-4" /> Create New
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card (Empty State) */}
        <Link href="/dashboard/funnels/new" className="group relative block h-full">
           <div className="h-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-12 hover:border-indigo-500/50 hover:bg-slate-900/50 transition">
              <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition">
                 <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="font-medium text-slate-400 group-hover:text-indigo-300">Create new funnel</p>
           </div>
        </Link>

        {/* Existing Funnels */}
        {funnels.map((funnel) => (
          <Card key={funnel.id} className="flex flex-col relative group">
             <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                   <div className="h-10 w-10 rounded bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-lg font-bold text-slate-500">
                      {funnel.name.substring(0,1).toUpperCase()}
                   </div>
                   <button className="text-slate-500 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
                <h3 className="font-semibold text-lg mb-1">{funnel.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {funnel.description || "No description."}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium">
                   <span className={`px-2 py-1 rounded-full border ${funnel.published ? "bg-green-900/30 text-green-400 border-green-900" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
                      {funnel.published ? "Published" : "Draft"}
                   </span>
                   <span className="text-slate-500">{funnel.currency} {funnel.price}</span>
                </div>
             </div>
             <div className="border-t border-slate-800 p-4 bg-slate-900/50 flex items-center justify-between">
                <Link href={`/checkout/${funnel.id}`} className="text-sm text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition">
                   <ExternalLink className="w-3 h-3" /> View Page
                </Link>
                <span className="text-xs text-slate-600">
                   {new Date(funnel.createdAt).toLocaleDateString()}
                </span>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
