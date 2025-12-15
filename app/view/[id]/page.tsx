"use client";
import { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PaystackButton } from "react-paystack";
import { Video, Loader2, CheckCircle2 } from "lucide-react";

// --- The 'Read-Only' Components ---
function BlockRenderer({ block }: any) {
  // Paystack Config
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: "customer@example.com", // In a real app, you'd ask for email first
    amount: 5000 * 100, // KES 5,000
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: 'KES',
    text: "Pay Now",
    onSuccess: () => alert("Payment Received!"),
  };

  switch (block.type) {
    case 'hero':
      return (
        <section className="py-20 px-6 text-center bg-black text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Master Your Digital Growth
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This is the headline your customer sees. It was generated dynamically from your database.
          </p>
        </section>
      );
    
    case 'text':
      return (
        <section className="py-12 px-6 bg-gray-950 text-gray-300">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            <p>This is a text block. In a real scenario, this would display the custom text you wrote in the editor.</p>
            <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Benefit number one</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Another amazing feature</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Instant access upon payment</li>
            </ul>
          </div>
        </section>
      );

    case 'video':
      return (
        <section className="py-12 px-6 bg-black flex justify-center">
          <div className="w-full max-w-4xl aspect-video bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <Video size={64} className="text-gray-700" />
          </div>
        </section>
      );

    case 'checkout':
      return (
        <section className="py-20 px-6 bg-gray-900">
            <div className="max-w-md mx-auto bg-white text-black p-8 rounded-2xl shadow-xl text-center">
                <h2 className="text-2xl font-bold mb-2">Premium Masterclass</h2>
                <div className="text-4xl font-extrabold mb-6">KES 5,000</div>
                <div className="w-full">
                    <PaystackButton {...paystackConfig} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg hover:shadow-green-500/20" />
                </div>
                <p className="mt-4 text-xs text-gray-400 uppercase tracking-wider">Secured by Paystack & Nexus Africa</p>
            </div>
        </section>
      );
      
    default:
      return null;
  }
}

// --- The Public Page ---
export default function PublicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next.js 15 Fix
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
        try {
            const docRef = doc(db, "funnels", id);
            const snap = await getDoc(docRef);
            if(snap.exists()) {
                setBlocks(snap.data().blocks || []);
            }
        } catch(e) {
            console.error("Error:", e);
        }
        setLoading(false);
    };
    fetchPage();
  }, [id]);

  if(loading) return <div className="h-screen bg-black text-white flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={48}/></div>;

  return (
    <main className="min-h-screen bg-black text-white">
        {blocks.length === 0 ? (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-gray-500">Page not found or empty.</h1>
            </div>
        ) : (
            blocks.map((block: any) => <BlockRenderer key={block.id} block={block} />)
        )}
        
        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900 mt-12">
            Powered by <span className="font-bold text-gray-500">Nexus Africa</span>
        </footer>
    </main>
  );
}