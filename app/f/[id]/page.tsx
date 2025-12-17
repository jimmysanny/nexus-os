"use client";
import { useEffect, useState, use } from "react";
import { Loader2, CheckCircle, Lock, ShieldCheck, PlayCircle } from "lucide-react";
import PaystackWrapper from "@/components/PaystackWrapper";
import { getPublicFunnel } from "@/app/actions/funnel";

export default function PublicFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicFunnel(id);
        if (data && data.blocks) {
             setBlocks(data.blocks as any[]);
        } else {
             setError(true);
        }
      } catch (e) { setError(true); }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading Experience...</p>
    </div>
  );

  if (error) return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <p className="text-gray-600 mb-6">This funnel does not exist or has been moved.</p>
            <a href="/dashboard/funnels" className="text-blue-600 hover:underline">Return to Dashboard</a>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Brand Header */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-center">
        <span className="font-bold text-xl tracking-tight text-gray-800">Nexus Powered</span>
      </nav>

      {blocks.map((block) => (
        <div key={block.id} className="w-full">
            {/* HERO SECTION */}
            {block.type === 'hero' && (
                <section className="bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            New Offer
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                            {block.data?.title || "Master Your Digital Empire"}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {block.data?.subtitle || "Join the exclusive program today and transform your business."}
                        </p>
                    </div>
                </section>
            )}

            {/* VIDEO SECTION */}
            {block.type === 'video' && (
                <section className="bg-gray-50 py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white flex items-center justify-center relative group cursor-pointer">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                            <PlayCircle size={80} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-300 relative z-10" />
                        </div>
                    </div>
                </section>
            )}

            {/* TEXT SECTION */}
            {block.type === 'text' && (
                <section className="bg-white py-20 px-6">
                    <div className="max-w-3xl mx-auto prose prose-lg prose-blue text-gray-600">
                        <p className="whitespace-pre-wrap">{block.data?.content || "This is where your sales copy goes."}</p>
                    </div>
                </section>
            )}

            {/* CHECKOUT SECTION */}
            {block.type === 'checkout' && (
                <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-blue-50/30">
                    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                        <div className="bg-blue-600 p-3"></div>
                        <div className="p-10 text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Access</h3>
                            <div className="flex justify-center items-baseline gap-1 mb-2">
                                <span className="text-4xl font-extrabold text-gray-900">
                                    KES {block.data?.price || "5000"}
                                </span>
                            </div>
                            <p className="text-gray-500 mb-8 text-sm">One-time payment • Lifetime access</p>
                            
                            <div className="w-full">
                                <PaystackWrapper 
                                    email="customer@example.com"
                                    amount={(Number(block.data?.price) || 5000) * 100}
                                    publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
                                    currency="KES"
                                    text="Get Instant Access"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 flex justify-center items-center gap-2"
                                    onSuccess={() => alert("Payment Successful!")}
                                />
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                                <Lock size={12} /> Secure 256-bit SSL Encrypted
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
      ))}
    </div>
  );
}