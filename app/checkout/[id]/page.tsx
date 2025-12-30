import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck } from "lucide-react";

// In Next.js 15, params is a Promise
export default async function CheckoutPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // We MUST await params before using properties like 'id'
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-slate-200 font-sans">
      <div className="max-w-md w-full bg-[#0B0F1A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-2 bg-indigo-600 w-full"></div>
        <div className="p-8">
          <div className="flex items-center gap-2 text-indigo-400 mb-6">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold tracking-wider uppercase">Secure Checkout</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-slate-400 text-sm mb-6">
            {product.description || "Premium digital asset"}
          </p>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Price</span>
              <span className="text-2xl font-bold text-white">KES {product.price.toLocaleString()}</span>
            </div>
            <div className="flex gap-2 text-xs text-green-400 items-center">
              <Check className="h-3 w-3" /> Instant Delivery
            </div>
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-lg mb-4">
            Pay Now
          </Button>

          <Link href="/market">
            <Button variant="ghost" className="w-full text-slate-500 hover:text-white">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}