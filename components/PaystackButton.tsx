"use client";
import dynamic from "next/dynamic";
import { recordOrder } from "@/app/actions/actions";

const PaystackPop = dynamic(() => import("@paystack/inline-js"), { ssr: false });

interface PaystackProps {
  amount: number;
  funnelId: string;
  currency: string;
  email: string;
  affiliateCode?: string;
}

export default function PaystackButton({ amount, funnelId, currency, email, affiliateCode }: PaystackProps) {
  const handlePayment = () => {
    // @ts-ignore
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      currency: currency,
      onSuccess: async (transaction: any) => {
        await recordOrder(funnelId, amount, transaction.reference, email, affiliateCode);
        alert("Payment Successful!");
        window.location.reload(); 
      },
      onCancel: () => { alert("Transaction cancelled."); }
    });
  };

  return (
    <button onClick={handlePayment} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg">
      Pay {currency} {amount.toLocaleString()}
    </button>
  );
}