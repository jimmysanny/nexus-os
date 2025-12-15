const fs = require('fs');
const path = require('path');

console.log("🚀 Installing Public Page Viewer...");

const files = {
  // THE PUBLIC PAGE (What customers see)
  'app/f/[id]/page.tsx': `"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PaystackWrapper from "@/components/PaystackWrapper";
import { Video, Loader2, CheckCircle } from "lucide-react";

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
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="animate-pulse">Loading Nexus Page...</p>
    </div>
  );

  if (!blocks || blocks.length === 0) return (
    <div className="h-screen bg-black flex items-center justify-center text-gray-500">
        <p>This page is empty or does not exist.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {blocks.map((block) => (
        <div key={block.id} className="w-full">
            
            {/* HERO SECTION */}
            {block.type === 'hero' && (
                <div className="py-20 px-6 text-center bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Master Your Digital Growth
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            Join the exclusive program today and transform your business with our proven strategies.
                        </p>
                    </div>
                </div>
            )}

            {/* CHECKOUT SECTION */}
            {block.type === 'checkout' && (
                <div className="py-12 px-6">
                    <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-blue-500/30 transition duration-500">
                        <div className="flex justify-center mb-6 text-green-500">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="font-bold text-2xl text-center mb-2">Premium Masterclass</h3>
                        <p className="text-center text-gray-400 mb-8">Lifetime Access • KES 5,000</p>
                        
                        <div className="w-full">
                            <PaystackWrapper 
                                email="customer@example.com"
                                amount={5000 * 100}
                                publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
                                currency="KES"
                                text="Secure Your Spot"
                                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/20"
                                onSuccess={() => alert("Payment Successful!")}
                            />
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                            🔒 Secured by Paystack
                        </p>
                    </div>
                </div>
            )}

            {/* VIDEO SECTION */}
            {block.type === 'video' && (
                <div className="py-12 px-6 bg-gray-950">
                    <div className="max-w-4xl mx-auto aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 shadow-2xl">
                        <Video size={64} className="text-gray-700" />
                    </div>
                </div>
            )}

            {/* TEXT SECTION */}
            {block.type === 'text' && (
                <div className="py-12 px-6">
                    <div className="max-w-2xl mx-auto prose prose-invert prose-lg text-gray-300">
                        <p>This is where you tell your story. Explain the problem your customer faces, and how your product solves it. Use clear, simple language.</p>
                        <ul>
                            <li>Benefit number one</li>
                            <li>Benefit number two</li>
                            <li>Benefit number three</li>
                        </ul>
                    </div>
                </div>
            )}

        </div>
      ))}
      
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 mt-12">
        <p>Powered by Nexus Africa</p>
      </footer>
    </div>
  );
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  console.log("Updated file: " + filePath);
});

console.log("\n✅ Public Viewer Installed!");
console.log("👉 You can now visit your live page!");