"use client";
import dynamic from "next/dynamic";
import { recordOrder } from "@/app/actions/actions";

// We use require to bypass strict type checking for now
const PaystackPop = dynamic(() => import("@paystack/inline-js"), { ssr: false });

export default function PaystackButton({ amount, funnelId, currency, email }: { amount: number, funnelId: string, currency: string, email: string }) {
  const handlePayment = () => {
    // @ts-ignore
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email || "customer@nexus.os",
      amount: amount * 100,
      currency: currency,
      onSuccess: async (transaction: any) => {
        await recordOrder(funnelId, amount, transaction.reference, email);
        alert("Payment Successful!");
        window.location.reload();
      },
      onCancel: () => {
        alert("Transaction cancelled.");
      }
    });
  };

  return (
    <button onClick={handlePayment} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all">
      Pay {currency} {amount.toLocaleString()}
    </button>
  );
}