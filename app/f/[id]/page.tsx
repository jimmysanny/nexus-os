import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Zap, Globe, Smartphone, Lock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FunnelPageProps {
  params: Promise<{ id: string }>;
}

export default async function FunnelPage({ params }: FunnelPageProps) {
  // FIX: Await params for Next.js 15
  const { id } = await params;

  let product;

  // DEMO DATA
  if (id === "demo") {
    product = {
      id: "demo",
      name: "The 7-Figure Creator Roadmap",
      description: "Stop guessing. Get the exact step-by-step blueprint to launch, scale, and automate your digital business across Africa.",
      price: 25000,
      isPublished: true,
      fileUrl: "https://utfs.io/f/9e17300c-6625-4c03-b0c6-30d876d75c6d-1d.svg"
    };
  } else {
    // REAL DATA
    try {
      product = await db.product.findUnique({ where: { id } });
    } catch (error) {
      return notFound();
    }
  }

  if (!product || !product.isPublished) return notFound();

  const isImage = (url: string) => url?.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i);

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans selection:bg-indigo-500/30">
      <nav className="border-b border-slate-800 bg-[#0B0F1A]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-indigo-400">NEXUS OS</div>
          <Link href="/sign-in"><Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">Seller Login</Button></Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-4 px-3 py-1">Instant Access</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">{product.name}</h1>
              <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-indigo-500/50 pl-6">{product.description || "No description provided yet."}</p>
            </div>
            
            <div className="pt-8 border-t border-slate-800">
              <div className="flex items-end gap-4 mb-6">
                {/* FIX: Handle null price safely */}
                <div className="text-5xl font-bold text-white tracking-tighter">
                  {product.price ? "KES " + product.price.toLocaleString() : "FREE"}
                </div>
              </div>
              
              {/* BUY BUTTON */}
              {/* Using a Link to Sign Up for now (Platform Collection Mode) */}
              <Link href="/sign-up"> 
                <Button size="lg" className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 rounded-xl transition-all hover:scale-[1.02]">
                  {/* FIX: Handle null price in button text too */}
                  Buy Now for {product.price ? "KES " + product.price.toLocaleString() : "FREE"} 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <p className="text-xs text-slate-500 mt-4 text-center flex items-center justify-center gap-2"><Lock className="h-3 w-3" /> Encrypted & Secure Payment</p>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F1A] shadow-2xl shadow-indigo-500/10 animate-in fade-in zoom-in duration-700 delay-150">
            {product.fileUrl && isImage(product.fileUrl) ? <Image src={product.fileUrl} alt={product.name} fill className="object-cover" /> : <div className="flex items-center justify-center h-full flex-col gap-4"><div className="h-24 w-24 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 shadow-inner"><ShieldCheck className="h-10 w-10 text-indigo-500" /></div><p className="text-slate-500 font-medium">Digital Course Content</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}