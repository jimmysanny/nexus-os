import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import PayWithPaystack from "@/components/PayWithPaystack";
import { Badge } from "@/components/ui/primitives";
import { ShieldCheck } from "lucide-react";

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  // 1. Get the Product ID (Next.js 15 requires awaiting params)
  const { id } = await params;
  
  // 2. Get the Current User (to pre-fill email)
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress || "guest@nexusos.africa";

  // 3. Fetch the Product from DB
  const product = await prisma.funnel.findUnique({
    where: { id }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-8 pb-0 text-center">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Checkout</h5>
            <h1 className="text-2xl font-bold text-white">Nexus Secure</h1>
            <Badge variant="success" className="mt-2 inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SSL Encrypted
            </Badge>
        </div>

        {/* Product Details */}
        <div className="p-8">
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-6">
                <h2 className="text-lg font-bold text-white mb-1">{product.name}</h2>
                <p className="text-sm text-slate-400 line-clamp-2">{product.description || "Digital Asset"}</p>
                
                <div className="my-4 border-t border-slate-800"></div>
                
                <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Due</span>
                    <span className="text-3xl font-black text-indigo-400">
                        {product.currency} {product.price}
                    </span>
                </div>
            </div>

            {/* The Payment Button - Connected with REAL Data */}
            <PayWithPaystack 
                amount={product.price}       // ✅ Passes the real price (e.g. 100)
                email={customerEmail}        // ✅ Passes the real email
                planId={product.id}          // ✅ Passes the ID for the Webhook
                onSuccess={async () => {
                    "use server"
                    // In a real app, we might redirect here
                    console.log("Redirecting...");
                }}
            />
            
            <p className="text-center text-xs text-slate-600 mt-4">
                Powered by <span className="text-slate-400 font-bold">Paystack</span>
            </p>
        </div>
      </div>
    </div>
  );
}