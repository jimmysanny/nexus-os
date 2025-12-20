import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StoreNav from "@/components/StoreNav";

// NEXT 15: params is a Promise
export default async function CreatorProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  // 1. Find the Merchant by USERNAME (Not ID)
  const merchant = await prisma.merchant.findUnique({
    where: { username: username }
  });

  if (!merchant) return <div className="p-20 text-center font-bold text-slate-400">Store not found.</div>;

  // 2. Fetch their PUBLISHED products using their User ID
  const products = await prisma.funnel.findMany({
    where: { 
      userId: merchant.userId,
      published: true 
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-200">
      <div className="bg-[#0f172a] text-white pb-24">
        <StoreNav />
        <div className="max-w-4xl mx-auto px-6 pt-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-black shadow-2xl shadow-blue-900/50">
            {merchant.name ? merchant.name.substring(0, 1).toUpperCase() : "M"}
          </div>
          <h1 className="text-3xl font-black mb-2">{merchant.name || "Creator Store"} <span className="inline-flex ml-2 text-blue-500" title="Verified Creator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </span> <span className="inline-flex ml-2 text-blue-500" title="Verified Creator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </span></h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            {merchant.bio || "Welcome to my digital store."}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/f/${p.id}`} className="group">
              <div className="bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                   📦
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">{p.category}</span>
                  <div className="mt-2 font-black text-slate-900">KES {p.price.toLocaleString()}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}