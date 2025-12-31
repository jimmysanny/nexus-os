import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PreviewPageProps {
  params: {
    funnelId: string;
  };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  // 1. Fetch the Product Data
  const product = await db.product.findUnique({
    where: {
      id: params.funnelId,
    },
  });

  // 2. If no product found, show 404
  if (!product) {
    return notFound();
  }

  // Helper to check if asset is an image
  const isImage = (url: string) => url?.match(/\.(jpeg|jpg|png|webp|gif)$/i);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-[#0B0F1A]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-indigo-400">NEXUS OS</div>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
            Login
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Content */}
          <div className="space-y-8">
            <div>
              {product.isPublished ? (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-4">Available Now</Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-500 border-yellow-500/20 mb-4">Coming Soon</Badge>
              )}
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                {product.description || "No description provided yet."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="h-5 w-5 text-indigo-500" />
                <span>Instant Access upon purchase</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Globe className="h-5 w-5 text-indigo-500" />
                <span>Secure SSL Payment</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Zap className="h-5 w-5 text-indigo-500" />
                <span>Lifetime Updates included</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <div className="flex items-end gap-4 mb-6">
                <div className="text-4xl font-bold text-white">
                  {product.price ? "KES " + product.price : "FREE"}
                </div>
                <div className="text-slate-500 mb-1 line-through">
                  {product.price ? "KES " + (product.price * 1.5) : ""}
                </div>
              </div>
              
              <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                Get Access Now
              </Button>
              <p className="text-xs text-slate-500 mt-4 text-center md:text-left">
                30-Day Money-Back Guarantee  Secure Checkout
              </p>
            </div>
          </div>

          {/* RIGHT: Visual Asset */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F1A] shadow-2xl shadow-indigo-500/10">
            {product.fileUrl && isImage(product.fileUrl) ? (
              <Image 
                src={product.fileUrl} 
                alt={product.name} 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full flex-col gap-4">
                <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                   <ShieldCheck className="h-10 w-10 text-indigo-500" />
                </div>
                <p className="text-slate-500 font-medium">Digital Course Content</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}