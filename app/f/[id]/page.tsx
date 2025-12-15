"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PaystackWrapper from "@/components/PaystackWrapper";
import { Loader2, CheckCircle, Video } from "lucide-react";

export default function PublicFunnelPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "funnels", id));
        if (docSnap.exists()) {
          setBlocks(docSnap.data().blocks || []);
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={48} /></div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {blocks.map((block) => (
        <div key={block.id} className="w-full">
            
            {/* HERO */}
            {block.type === 'hero' && (
                <div className="py-20 px-6 text-center bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {block.content?.headline || "Master Your Digital Growth"}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            {block.content?.subheadline || "Join the exclusive program today."}
                        </p>
                    </div>
                </div>
            )}

            {/* CHECKOUT */}
            {block.type === 'checkout' && (
                <div className="py-12 px-6">
                    <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                        <div className="flex justify-center mb-6 text-green-500"><CheckCircle size={48} /></div>
                        <h3 className="font-bold text-2xl text-center mb-2">
                            {block.content?.productName || "Premium Masterclass"}
                        </h3>
                        <p className="text-center text-gray-400 mb-8">
                            Lifetime Access • KES {block.content?.price || "5000"}
                        </p>
                        <div className="w-full">
                            <PaystackWrapper 
                                email="customer@example.com"
                                amount={(parseInt(block.content?.price) || 5000) * 100}
                                publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
                                currency="KES"
                                text={"Pay KES " + (block.content?.price || "5000")}
                                className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-xl font-bold text-lg transition"
                                onSuccess={() => alert("Payment Successful!")}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* TEXT */}
            {block.type === 'text' && (
                <div className="py-12 px-6">
                    <div className="max-w-2xl mx-auto prose prose-invert prose-lg text-gray-300 whitespace-pre-wrap">
                        {block.content?.text || "Insert your text here."}
                    </div>
                </div>
            )}

             {/* VIDEO */}
            {block.type === 'video' && (
                <div className="py-12 px-6 bg-gray-950">
                    <div className="max-w-4xl mx-auto aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
                        <Video size={64} className="text-gray-700" />
                    </div>
                </div>
            )}
        </div>
      ))}
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 mt-12"><p>Powered by Nexus Africa</p></footer>
    </div>
  );
}