"use client";
import dynamic from "next/dynamic";
import { recordOrder } from "@/app/actions/actions";

const PaystackPop = dynamic(() => import("@paystack/inline-js"), { ssr: false });

interface PaystackProps {
  amount: number;
  funnelId: string;
  currency: string;
  email: string;
  affiliateCode?: string; // <--- FIXED: Added this prop
}

export default function PaystackButton({ amount, funnelId, currency, email, affiliateCode }: PaystackProps) {
  const handlePayment = () => {
    // @ts-ignore
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email || "customer@nexus.os",
      amount: amount * 100,
      currency: currency,
      onSuccess: async (transaction: any) => {
        // We pass the affiliate code to the server action
        await recordOrder(funnelId, amount, transaction.reference, email, affiliateCode);
        alert("Payment Successful! Check your email.");
        window.location.reload();
      },
      onCancel: () => {
        alert("Transaction cancelled.");
      }
    });
  };

  return (
    <button onClick={handlePayment} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
      Pay {currency} {amount.toLocaleString()}
    </button>
  );
}