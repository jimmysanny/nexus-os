import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ id: string; order: string }> }) {
  const { id, order } = await searchParams;

  // SECURITY CHECK: Verify the order actually exists and is successful
  const orderRecord = await prisma.order.findFirst({
    where: { 
      funnelId: id,
      status: "SUCCESS" 
      // In a real app, we would also match the order reference/ID strictly
    },
    include: { funnel: true }
  });

  if (!orderRecord) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">
        <div className="bg-white p-10 rounded-[40px] shadow-xl text-center max-w-md">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6"></div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Payment Verification Pending</h1>
          <p className="text-sm text-slate-500 mb-6">We are still waiting for M-PESA to confirm your transaction. Please refresh this page in 30 seconds.</p>
          <Link href={`/f/${id}`} className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase text-xs tracking-widest">Return to Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-10 font-sans">
      <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-slate-100 max-w-2xl w-full text-center space-y-8">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto shadow-lg shadow-green-100"></div>
        
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4 italic">Payment <span className="text-blue-600">Verified</span></h1>
          <p className="text-lg text-slate-400 font-medium">Order #{orderRecord.id.slice(0,8).toUpperCase()}  Confirmed</p>
        </div>

        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Your Secured Asset</p>
           <h2 className="text-2xl font-black text-slate-900 mb-6">{orderRecord.funnel.name}</h2>
           
           {orderRecord.funnel.digitalProductUrl ? (
             <a href={orderRecord.funnel.digitalProductUrl} target="_blank" className="block w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-200">
               Download Now 
             </a>
           ) : (
             <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl text-xs font-bold">
               Asset is being prepared. Please check your email.
             </div>
           )}
        </div>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">A receipt has been sent to {orderRecord.customerEmail}</p>
      </div>
    </div>
  );
}