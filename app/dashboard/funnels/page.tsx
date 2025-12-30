import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProductCard } from "@/components/dashboard/product-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function FunnelsPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // Fetch products safely
  const products = await db.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Funnels</h1>
          <p className="text-sm text-slate-400">Manage your products and checkout links</p>
        </div>
        <Link href="/dashboard/funnels/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Funnel
          </Button>
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
           <p className="text-slate-400 mb-4">No funnels found.</p>
           <Link href="/dashboard/funnels/new">
            <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
              Create your first one
            </Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              // We force a default of 0 if price is missing to prevent crashes
              price={product.price || 0}
              isPublished={product.isPublished}
            />
          ))}
        </div>
      )}
    </div>
  );
}