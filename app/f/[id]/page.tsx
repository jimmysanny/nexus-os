import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server"; 
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, ArrowRight, Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FunnelPageProps {
  params: Promise<{ id: string }>;
}

export default async function FunnelPage({ params }: FunnelPageProps) {
  const { id } = await params;
  const { userId } = await auth();

  let product;
  if (id === "demo") {
    product = { id: "demo", userId: "demo_user", name: "Demo Product", description: "Demo", price: 25000, isPublished: true, fileUrl: "", paymentLink: "" };
  } else {
    try { product = await db.product.findUnique({ where: { id } }); } catch (error) { return notFound(); }
  }

  if (!product || !product.isPublished) return notFound();

  const isOwner = userId === product.userId;
  const isImage = (url: string) => url?.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i);
  
  // DETERMINE BUY LINK
  // If user provided a Paystack link, use it. Otherwise, default to sign-up (waitlist).
  const buyLink = product.paymentLink ? product.paymentLink : "/sign-up";

  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans">
      <nav className="border-b border-slate-800 bg-[#0B0F1A]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-indigo-400">NEXUS OS</div>
          {isOwner ? <Badge variant="outline" className="border-indigo-500 text-indigo-400">You are the Seller</Badge> : <Link href="/sign-in"><Button variant="outline">Seller Login</Button></Link>}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <div className="flex gap-2 mb-4"><Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">Instant Access</Badge>{isOwner && <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Owner View</Badge>}</div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">{product.name}</h1>
              <p className="text-lg text-slate-400 pl-6 border-l-2 border-indigo-500/50">{product.description}</p>
            </div>
            
            <div className="pt-8 border-t border-slate-800">
              {isOwner ? (
                <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-500" /> Your Product File</h3>
                  {product.fileUrl ? <Link href={product.fileUrl} target="_blank"><Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-14"><Download className="mr-2 h-5 w-5" /> Access File Now</Button></Link> : <div className="text-yellow-500 text-sm">No file uploaded yet.</div>}
                </div>
              ) : (
                <>
                  <div className="text-5xl font-bold text-white mb-6">KES {product.price?.toLocaleString() ?? "0"}</div>
                  {/* DYNAMIC BUY BUTTON */}
                  <Link href={buyLink} target={product.paymentLink ? "_blank" : "_self"}> 
                    <Button size="lg" className="w-full h-16 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl rounded-xl transition-all hover:scale-[1.02]">
                      {product.paymentLink ? "Pay Now via Paystack" : "Join Waitlist"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-xs text-slate-500 mt-4 text-center flex items-center justify-center gap-2"><Lock className="h-3 w-3" /> Encrypted & Secure Payment</p>
                </>
              )}
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F1A]">
             {product.fileUrl && isImage(product.fileUrl) ? <Image src={product.fileUrl} alt={product.name} fill className="object-cover" /> : <div className="flex items-center justify-center h-full flex-col gap-4"><div className="h-24 w-24 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800"><ShieldCheck className="h-10 w-10 text-indigo-500" /></div><p className="text-slate-500 font-medium">Digital Content</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}