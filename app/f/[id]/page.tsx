import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SmartCheckout from "@/components/SmartCheckout";
import StoreNav from "@/components/StoreNav";

export default async function FunnelPage({ params, searchParams }: { params: { id: string }, searchParams: { ref?: string } }) {
  const funnel = await prisma.funnel.findUnique({
    where: { id: params.id },
    include: { coupons: true } // Fetch coupons to pass to checkout
  });

  if (!funnel || !funnel.published) return notFound();

  // Safely handle affiliate code
  const affiliateCode = searchParams.ref || undefined;

  return (
    <div className="min-h-screen bg-slate-50">
       <StoreNav />
       <div className="flex flex-col items-center justify-center p-6 pb-20">
          {/* We pass the funnel (which includes coupons) and the coupons array explicitly */}
          <SmartCheckout funnel={funnel} affiliateCode={affiliateCode} coupons={funnel.coupons} />
          
          <div className="mt-8 text-center">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Powered by Nexus OS</p>
          </div>
       </div>
    </div>
  );
}