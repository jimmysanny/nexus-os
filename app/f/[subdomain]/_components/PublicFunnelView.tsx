"use client";
import { usePaystackPayment } from "react-paystack";

export default function PublicFunnelView({ funnel }: { funnel: any }) {
  const config = {
    reference: new Date().getTime().toString(),
    email: "customer@example.com",
    amount: funnel.price * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
    currency: "KES",
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-4 ${funnel.font === 'serif' ? 'font-serif' : 'font-sans'}`}>
      <div className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="h-64 relative">
          <img src={funnel.heroImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">
            <h1 className="text-3xl font-bold text-white leading-tight">{funnel.headline}</h1>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <p className="text-gray-600 text-lg">{funnel.subheadline}</p>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
            <span className="text-gray-400">Price</span>
            <span className="text-3xl font-black text-blue-600">${funnel.price}</span>
          </div>
          <button 
            onClick={() => initializePayment({ onSuccess: () => alert("Thank you for your purchase!"), onClose: () => {} })}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:scale-[1.02] transition shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
      <p className="mt-8 text-gray-400 text-sm">Powered by Nexus OS</p>
    </div>
  );
}
