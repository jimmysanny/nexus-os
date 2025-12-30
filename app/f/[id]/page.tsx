import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";

// Next.js 15: params is a Promise
export default async function SalesPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // FIX: Use 'db.product' instead of 'db.funnel'
  const product = await db.product.findUnique({
    where: { id }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
          <ShieldCheck className="h-4 w-4" />
          Verified Secure Checkout
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          {product.name}
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {product.description || "Unlock instant access to this premium digital asset."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={"/checkout/" + product.id}>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white h-14 px-8 text-lg rounded-full">
              Buy Now for KES {product.price.toLocaleString()} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500 text-sm">
        <p>Powered by Nexus OS</p>
      </div>
    </div>
  );
}