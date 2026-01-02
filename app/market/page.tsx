import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";

export default async function MarketplacePage() {
  const products = await db.product.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } });
  
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-[#020817]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">N</span></div>
          <span className="text-xl font-bold text-white tracking-tight">Nexus Marketplace</span>
        </div>
        <div className="flex items-center gap-4"><Link href="/"><Button variant="ghost">Home</Button></Link><Link href="/sign-in"><Button>Seller Login</Button></Link></div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
           <div><h1 className="text-3xl font-bold text-white">Discover Digital Products</h1></div>
           <Button variant="outline" className="hidden md:flex"><ShoppingBag className="h-4 w-4 mr-2" /> View Cart</Button>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl"><h3 className="text-xl font-medium text-slate-300">Marketplace is Empty</h3><Link href="/sign-up"><Button className="mt-6">Start Selling</Button></Link></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={'/f/' + product.id} key={product.id} className="group bg-[#0B0F1A] border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:scale-[1.02] shadow-lg">
                 <div className="relative aspect-video bg-slate-900">
                    {product.fileUrl && product.fileUrl.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i) ? <Image src={product.fileUrl} alt={product.name} fill className="object-cover" /> : <div className="h-full w-full flex items-center justify-center bg-slate-800"><ShoppingBag className="h-10 w-10 text-slate-600" /></div>}
                    {/* FIX: Safe Price Check */}
                    <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border-0">KES {product.price?.toLocaleString() ?? "0"}</Badge>
                 </div>
                 <div className="p-6">
                    <h3 className="font-bold text-lg text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                       <span className="text-xs text-indigo-400 font-medium group-hover:underline">View Details &rarr;</span>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}