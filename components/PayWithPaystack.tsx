'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const PaystackButton = dynamic(
  () => import('react-paystack').then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function PayWithPaystack({ 
  amount, 
  email, 
  planId, // This is actually the funnelId
  onSuccess 
}: { 
  amount: number, 
  email: string, 
  planId: string,
  onSuccess?: () => void
}) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  if (!publicKey) {
    return <div className="text-red-500">Error: Missing Payment Key</div>;
  }

  const componentProps = {
    email,
    amount: amount * 100, // Convert to kobo/cents
    publicKey,
    text: "Buy Now",
    // CRITICAL: Send custom data so the Webhook knows what this payment is for
    metadata: {
      funnelId: planId, 
      custom_fields: [] 
    },
    onSuccess: (reference: any) => {
      console.log(reference);
      if (onSuccess) onSuccess();
    },
    onClose: () => alert("Transaction cancelled"),
  };

  return (
    <div className="w-full">
      {/* @ts-ignore - react-paystack types conflict workaround */}
      <PaystackButton {...componentProps} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-all" />
    </div>
  );
}
