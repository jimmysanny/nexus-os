"use client";

import { CreditCard } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import { createOrder } from "@/app/actions/createOrder";

export const PaymentButton = ({ price, funnelId, colorClass }: { price: number, funnelId: string, colorClass: string }) => {
    const config = {
      reference: (new Date()).getTime().toString(),
      email: "customer@example.com", // You can add an input for email later
      amount: Math.floor(price * 100),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "", 
      currency: "KES",
    };
  
    const initializePayment = usePaystackPayment(config);

    const onSuccess = async (reference: any) => {
        await createOrder(funnelId, "customer@example.com", price, reference.reference);
        alert("Payment Successful! Access granted.");
    };
  
    return (
        <button 
            onClick={() => initializePayment({ onSuccess, onClose: () => {} })}
            className={`w-full max-w-sm py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2 ${colorClass}`}
        >
            Get Instant Access <CreditCard size={20} />
        </button>
    );
}
