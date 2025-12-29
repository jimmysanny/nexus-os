"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";

interface PayWithPaystackProps {
  amount: number;
  email: string;
  planId?: string; // <--- ADDED THIS LINE (The missing pocket)
  onSuccess?: () => void;
}

export default function PayWithPaystack({ amount, email, planId, onSuccess }: PayWithPaystackProps) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  if (!publicKey) {
    console.error("CRITICAL ERROR: Paystack Key is missing.");
    return (
      <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
        <p className="font-bold">System Error: Payment Key Missing</p>
      </div>
    );
  }

  const componentProps = {
    email,
    amount: amount * 100,
    publicKey,
    text: "Pay Now (Secure)",
    // We attach the ID here so you know WHICH product they bought
    metadata: {
      custom_fields: [
        {
          display_name: "Product ID",
          variable_name: "product_id",
          value: planId || "unknown",
        },
      ],
    },
    onSuccess: () => {
      toast.success("Payment Received!");
      if (onSuccess) onSuccess();
    },
    onClose: () => toast.info("Payment cancelled"),
  };

  return (
    <div className="w-full">
      <PaystackButton 
        {...componentProps} 
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition shadow-md flex items-center justify-center gap-2" 
      />
    </div>
  );
}