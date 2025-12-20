"use client";
import dynamic from "next/dynamic";

// Dynamically load Paystack to avoid "window not found" errors
const PaystackPop = dynamic(() => import("@paystack/inline-js"), { ssr: false });

export default function PaystackButton({ amount, funnelId, currency, affiliateCode }: { amount: number, funnelId: string, currency: string, affiliateCode?: string }) {
  
  const handlePayment = () => {
    // @ts-ignore
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Make sure this is in your .env
      email: "customer@example.com", // In a real app, ask the user for this!
      amount: amount * 100, // Paystack expects Kobo/Cents
      currency: currency, // <--- THIS IS THE MAGIC KEY (USD or KES)
      ref: "" + Math.floor((Math.random() * 1000000000) + 1),
      onSuccess: async (transaction: any) => {
        // SAVE ORDER TO DATABASE
        await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            funnelId,
            amount,
            currency,
            reference: transaction.reference,
            affiliateCode
          })
        });
        alert("Payment Successful! Check your email.");
        window.location.reload();
      },
      onCancel: () => {
        alert("Transaction cancelled.");
      }
    });
  };

  return (
    <button 
      onClick={handlePayment}
      className="w-full py-4 bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
    >
      <span>Pay {currency} {amount.toLocaleString()}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    </button>
  );
}