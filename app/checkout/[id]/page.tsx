import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PayWithPaystack from "@/components/PayWithPaystack";
import { currentUser } from "@clerk/nextjs/server";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.funnel.findUnique({ where: { id } });
  const user = await currentUser(); 
  
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-start mb-6 border-b pb-6">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Checkout</p>
                    <h2 className="text-2xl font-black text-gray-900 mt-1">Nexus Secure</h2>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded flex items-center">
                     SSL ENCRYPTED
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                <p className="font-bold text-gray-800 text-lg mb-1 leading-tight">{product.headline[0]}</p>
                <p className="text-sm text-gray-500 mb-4">{product.name}</p>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <span className="text-gray-600 font-medium">Total Due</span>
                    <span className="text-3xl font-black text-blue-600">KES {product.price}</span>
                </div>
            </div>

            {/* PAYMENT COMPONENT */}
            <PayWithPaystack product={product} email={user?.emailAddresses[0]?.emailAddress || "guest@nexus.africa"} />
        </div>
    </div>
  );
}
