import Link from "next/link";
import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import { db } from "@/lib/db"; // <--- FIXED: Using 'db'
import { formatPrice } from "@/lib/format";

async function getProducts() {
  try {
    const products = await db.product.findMany({ // <--- FIXED: Using 'db'
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    return [];
  }
}

export default async function MarketplacePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link href="/" className="font-bold text-xl text-indigo-600">Nexus OS</Link>
             <span className="text-gray-300">|</span>
             <span className="font-semibold text-gray-700">Marketplace</span>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900">Login</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white p-8 rounded-full inline-flex mb-4 shadow-sm">
               <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Marketplace is empty</h3>
            <p className="text-gray-500 mt-2">Be the first to list a product on Nexus OS.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={\/checkout/\\} className="group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 h-full flex flex-col">
                  <div className="aspect-[16/9] bg-gray-100 relative">
                    <div className="flex items-center justify-center h-full text-gray-300 bg-indigo-50">
                       <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900">
                       {formatPrice(product.price)}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center text-indigo-600 text-sm font-medium">
                       Buy Now <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
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