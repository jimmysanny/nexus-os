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
  const { id } = await params;
  let product;

  if (id === "demo") {
    product = {
      id: "demo",
      name: "The 7-Figure Creator Roadmap",
      description: "Stop guessing. Get the exact step-by-step blueprint.",
      price: 25000,
      isPublished: true,
      fileUrl: "https://utfs.io/f/9e17300c-6625-4c03-b0c6-30d876d75c6d-1d.svg"
    };
  } else {
    try {
      product = await db.product.findUnique({ where: { id } });
    } catch (error) { return notFound(); }
  }

  if (!product || !product.isPublished) return notFound();

  const isImage = (url: string) => url?.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i);

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-4 px-3 py-1">Instant Access</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">{product.name}</h1>
              <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-indigo-500/50 pl-6">{product.description}</p>
            </div>
            <div className="pt-8 border-t border-slate-800">
              <div className="flex items-end gap-4 mb-6">
                <div className="text-5xl font-bold text-white tracking-tighter">
                  KES {product.price?.toLocaleString() ?? "0"}
                </div>
              </div>
              <Link href="/sign-up"> 
                <Button size="lg" className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 rounded-xl transition-all hover:scale-[1.02]">
                  Buy Now for KES {product.price?.toLocaleString() ?? "0"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F1A] shadow-2xl shadow-indigo-500/10">
            {product.fileUrl && isImage(product.fileUrl) ? <Image src={product.fileUrl} alt={product.name} fill className="object-cover" /> : <div className="flex items-center justify-center h-full flex-col gap-4"><div className="h-24 w-24 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 shadow-inner"><ShieldCheck className="h-10 w-10 text-indigo-500" /></div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}