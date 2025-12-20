import { prisma } from "@/lib/prisma";
import SmartCheckout from "@/components/SmartCheckout";
import StoreNav from "@/components/StoreNav";

// We update the type to expect a Promise
export default async function PublicFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  // CRITICAL FIX: We "await" the params before using them
  const { id } = await params;

  const funnel = await prisma.funnel.findUnique({
    where: { id: id },
    include: { coupons: true }
  });

  if (!funnel) return <div className="min-h-screen flex items-center justify-center font-black text-slate-300">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <StoreNav />
      <div className="flex flex-col items-center justify-center p-6 pb-20">
        <SmartCheckout funnel={funnel} coupons={funnel.coupons} />
        <div className="mt-8 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Powered by Nexus OS</p>
        </div>
      </div>
    </div>
  );
}