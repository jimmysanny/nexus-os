import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SalesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.funnel.findUnique({ where: { id } });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white">
       <nav className="p-6 border-b flex justify-between items-center sticky top-0 bg-white/95 z-20">
          <span className="font-bold text-xl">NEXUS</span>
          <Link href="/market" className="text-sm font-bold hover:underline">Cancel</Link>
       </nav>

       <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div>
            <h1 className="text-6xl font-black text-slate-900 mb-6 leading-none">{product.headline[0]}</h1>
            <p className="text-xl text-slate-600 mb-8">{product.description || "Unlock immediate access to this verified digital asset."}</p>
         </div>
         <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-xl">
            <div className="mb-8 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase">One-Time Price</p>
                <p className="text-6xl font-black text-slate-900">${product.price}</p>
            </div>
            <Link href={`/checkout/${product.id}`} className="block w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl text-center shadow-lg transition-transform hover:scale-[1.02]">
                Secure Checkout
            </Link>
         </div>
       </div>
    </div>
  );
}
