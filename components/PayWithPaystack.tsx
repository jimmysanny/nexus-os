"use client";

import { PaystackButton } from "react-paystack";
import { toast } from "sonner";

interface PayWithPaystackProps {
  amount: number;
  email: string;
  onSuccess?: () => void;
}

export default function PayWithPaystack({ amount, email, onSuccess }: PayWithPaystackProps) {
  // EXPLICITLY grab the key to ensure the browser sees it
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // SAFETY CHECK: If the key is missing, show a red error button instead of crashing
  if (!publicKey) {
    console.error("CRITICAL ERROR: Paystack Key is missing. Check Vercel Environment Variables.");
    return (
      <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
        <p className="font-bold">System Error: Payment Key Missing</p>
        <p className="text-sm">Please contact support.</p>
      </div>
    );
  }

  const componentProps = {
    email,
    amount: amount * 100, // Convert KES to Cents
    publicKey,
    text: "Pay Now (Secure)",
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