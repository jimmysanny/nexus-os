import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, LogIn, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/dashboard/product-card"; // Reusing the card style

export default async function MarketPage() {
  const { userId } = await auth();

  // Fetch only PUBLISHED products
  const products = await db.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      
      {/* SMART HEADER */}
      <header className="border-b border-slate-800 bg-[#0B0F1A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
            <span className="font-bold text-xl tracking-tight text-white">NEXUS OS</span>
          </Link>

          {/* NAVIGATION BUTTONS */}
          <div className="flex items-center gap-4">
            {userId ? (
              // IF LOGGED IN: Show "Dashboard" button
              <Link href="/dashboard">
                <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            ) : (
              // IF GUEST: Show "Login" button
              <Link href="/sign-in">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  Creator Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MARKET CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Discover Premium Assets</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore high-quality digital tools, guides, and resources created by expert developers and creators.
          </p>
        </div>

        {products.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Marketplace is Empty</h2>
            <p className="text-slate-400 mb-8 text-center max-w-md">
              No products have been published yet. Be the first creator to launch on Nexus OS.
            </p>
            {userId && (
              <Link href="/dashboard/funnels">
                <Button size="lg" className="bg-white text-black hover:bg-slate-200">
                  Create First Product <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        ) : (
          // PRODUCT GRID
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
               <div key={product.id} className="group relative bg-[#0B0F1A] border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition duration-300">
                 {/* COVER AREA (Simple color placeholder for now) */}
                 <div className="h-48 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition duration-500">
                    <span className="text-6xl font-bold text-slate-700 select-none">
                      {product.name.charAt(0)}
                    </span>
                 </div>
                 
                 <div className="p-6">
                   <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                   <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
                     {product.description || "No description provided."}
                   </p>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                     <span className="text-lg font-bold text-indigo-400">
                       KES {product.price.toLocaleString()}
                     </span>
                     <Link href={"/checkout/" + product.id}>
                       <Button size="sm" className="bg-white text-black hover:bg-slate-200 font-semibold">
                         Buy Now
                       </Button>
                     </Link>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}