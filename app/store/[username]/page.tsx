import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTheme } from "@/lib/themes";

export default async function StorefrontPage({ params }: { params: { username: string } }) {
  const merchant = await prisma.merchant.findUnique({
    where: { username: params.username }
  });

  if (!merchant) return notFound();

  const funnels = await prisma.funnel.findMany({
    where: { userId: merchant.userId, published: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-slate-50">
       {/* Store Header */}
       <div className="bg-white border-b border-slate-200">
          <div className="h-48 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="max-w-4xl mx-auto px-6 h-full flex items-end pb-8 relative z-10">
                <div className="flex items-end gap-6 translate-y-12">
                   <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                      <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-5xl">
                         🦁
                      </div>
                   </div>
                   <div className="mb-4">
                      <h1 className="text-3xl font-black text-white mb-1 shadow-black drop-shadow-md">{merchant.name || "Nexus Store"}</h1>
                      <p className="text-slate-300 font-medium max-w-md">{merchant.bio || "Digital Creator & Entrepreneur"}</p>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Store Content */}
       <div className="max-w-4xl mx-auto px-6 pt-20 pb-20">
          {/* Social Links */}
          <div className="flex gap-4 mb-12">
             {merchant.twitter && <a href={`https://twitter.com/${merchant.twitter}`} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-500 transition-colors">Twitter</a>}
             {merchant.instagram && <a href={`https://instagram.com/${merchant.instagram}`} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-slate-600 border border-slate-200 hover:border-pink-400 hover:text-pink-500 transition-colors">Instagram</a>}
          </div>

          {/* Product Grid */}
          <h2 className="text-xl font-black text-slate-900 mb-6">Latest Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {funnels.map((funnel) => {
                const theme = getTheme(funnel.themeColor);
                return (
                   <Link key={funnel.id} href={`/f/${funnel.id}`} className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
                      <div className={`h-40 ${theme.secondary} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                         
                      </div>
                      <div className="p-8">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accent} bg-white border border-slate-100 px-2 py-1 rounded-md`}>{funnel.category}</span>
                               <h3 className="text-xl font-bold text-slate-900 mt-2">{funnel.name}</h3>
                            </div>
                            <span className="text-2xl font-black text-slate-900">KES {funnel.price}</span>
                         </div>
                         <p className="text-slate-500 text-sm line-clamp-2 mb-6">{funnel.description || "No description provided."}</p>
                         <button className={`w-full py-3 rounded-xl font-bold text-white ${theme.primary}`}>
                            View Details
                         </button>
                      </div>
                   </Link>
                );
             })}
          </div>
       </div>
       
       <div className="text-center pb-8 opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Powered by Nexus OS</p>
       </div>
    </div>
  );
}