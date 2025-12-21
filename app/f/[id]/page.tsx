import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SmartCheckout from "@/components/SmartCheckout";
import StoreNav from "@/components/StoreNav";

export default async function FunnelPage({ params, searchParams }: { params: { id: string }, searchParams: { ref?: string } }) {
  // Fix: Fetch funnel AND coupons safely
  const funnel = await prisma.funnel.findUnique({
    where: { id: params.id },
    include: { coupons: true } 
  });

  if (!funnel || !funnel.published) return notFound();

  // Fix: Ensure undefined is passed if no ref exists, matching the interface
  const affiliateCode = searchParams.ref || undefined;

  return (
    <div className="min-h-screen bg-slate-50">
       <StoreNav />
       <div className="flex flex-col items-center justify-center p-6 pb-20">
          <SmartCheckout 
            funnel={funnel} 
            affiliateCode={affiliateCode} 
            coupons={funnel.coupons} 
          />
          
          <div className="mt-8 text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Powered by Nexus OS</p>
          </div>
       </div>
    </div>
  );
}