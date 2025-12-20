import { prisma } from "@/lib/prisma";
import Link from "next/link";
import MarketSearch from "@/components/MarketSearch";

// NEXT 15: params and searchParams are Promises
export default async function MarketPage({ searchParams }: { searchParams: Promise<{ category?: string, q?: string }> }) {
  const { category, q } = await searchParams;

  // BUILD THE DATABASE QUERY
  const whereClause: any = { published: true };
  
  // 1. Filter by Category (if clicked)
  if (category && category !== "All") {
    whereClause.category = category;
  }

  // 2. Filter by Search Text (if typed)
  if (q) {
    whereClause.OR = [
      { name: { contains: q, mode: "insensitive" } }, // Search Name
      { description: { contains: q, mode: "insensitive" } } // Search Description
    ];
  }

  const products = await prisma.funnel.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  const categories = ["All", "Software", "E-books", "Templates", "Courses", "Graphics"];

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* HEADER */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/50">N</div>
        <Link href="/dashboard" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
          Back to HQ
        </Link>
      </nav>

      {/* HERO & SEARCH */}
      <div className="text-center pt-10 pb-12 px-6">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
          Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Assets.</span>
        </h1>
        
        {/* NEW: SEARCH BAR */}
        <MarketSearch />

        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {categories.map((c) => (
            <Link 
              key={c} 
              href={c === "All" ? "/market" : `/market?category=${c}`}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                (category === c || (!category && c === "All"))
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105" 
                  : "bg-[#1e293b] text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/f/${p.id}`} className="group relative block bg-[#1e293b] rounded-[32px] overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1">
              <div className="aspect-square bg-slate-800 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                
              </div>
              <div className="p-6">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">{p.name}</h3>
                 </div>
                 <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.category}</span>
                    <span className="text-white font-black bg-slate-900 px-3 py-1 rounded-lg">KES {p.price.toLocaleString()}</span>
                 </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 font-bold text-lg">No assets match your search.</p>
            <Link href="/market" className="text-blue-500 text-sm font-bold mt-2 inline-block hover:underline">Clear Filters</Link>
          </div>
        )}
      </div>
    </div>
  );
}