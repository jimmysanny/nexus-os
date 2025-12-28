import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/primitives";
import { ArrowRight } from "lucide-react";

export default async function MarketPage() {
  const products = await prisma.funnel.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Market Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
             NEXUS MARKET
           </h1>
           <div className="flex gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-indigo-400 transition">Creator Login</Link>
           </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Discover Africa&apos;s Best <span className="text-indigo-500">Digital Assets</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          Courses, templates, and software built by top creators.
          <br className="hidden md:block" />
          <span className="text-white font-medium">Instant Access. Secure Payments via Mobile Money & Card.</span>
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/checkout/${product.id}`} className="group">
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition duration-300 h-full flex flex-col">
                <div className="h-48 bg-slate-800 relative group-hover:bg-slate-700 transition">
                  {/* Placeholder for Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold text-4xl opacity-20">
                    {product.name.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-400 transition">{product.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">{product.description || "No description provided."}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <div className="font-bold text-xl text-green-400">
                      {product.currency} {product.price}
                    </div>
                    <Badge variant="default">Buy Now <ArrowRight className="w-3 h-3 ml-1 inline" /></Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <p className="text-xl">No products found in the marketplace yet.</p>
              <Link href="/dashboard/funnels/new" className="text-indigo-400 hover:underline mt-2 inline-block">
                Be the first to list one!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
