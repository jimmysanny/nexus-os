import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await db.product.findUnique({ where: { id } });

  if (!product) return notFound();

  // FIX: Handle nullable price safely
  const price = product.price || 0;

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0B0F1A] border border-slate-800 rounded-xl p-8">
        <h1 className="text-xl font-bold text-white mb-2">Checkout</h1>
        <p className="text-slate-400 mb-6">Purchase <span className="text-white font-medium">{product.name}</span></p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400">Price</span>
          <span className="text-2xl font-bold text-white">KES {price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2 text-xs text-green-400 items-center mb-8"><CheckCircle className="h-3 w-3" /> Instant Delivery</div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12">Pay Now</Button>
      </div>
    </div>
  );
}