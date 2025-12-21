"use client";
import dynamic from "next/dynamic";
import { recordOrder } from "@/app/actions/actions";

// Fix: Handle missing types by using 'require' logic inside dynamic import if needed, 
// or just strictly typing the props we know exist.
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
    // @ts-ignore - Silence the module error
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      currency: currency,
      onSuccess: async (transaction: any) => {
        await recordOrder(funnelId, amount, transaction.reference, email, affiliateCode);
        alert("Payment Successful!");
        window.location.reload(); // Refresh to show success state
      },
      onCancel: () => {
        alert("Transaction cancelled.");
      }
    });
  };

  return (
    <button onClick={handlePayment} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
      Pay {currency} {amount.toLocaleString()}
    </button>
  );
}