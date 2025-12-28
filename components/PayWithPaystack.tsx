'use client'

import React, { useState } from 'react';
import Script from 'next/script';

export default function PayWithPaystack({ 
  amount, 
  email, 
  planId, 
  onSuccess 
}: { 
  amount: number | string, // Accept string or number to be safe
  email: string, 
  planId: string,
  onSuccess?: () => void
}) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handleBuy = () => {
    if (!isScriptLoaded) {
      alert("Payment system loading... please wait.");
      return;
    }
    
    if (!publicKey) {
      alert("Payment Key missing!");
      return;
    }

    // FORCE CONVERSION: Ensure it is a number, multiply by 100, remove decimals.
    // Example: 100.00 -> 10000 (Kobo)
    const finalAmount = Math.ceil(Number(amount) * 100);

    console.log("Processing Payment:", { email, finalAmount, planId });

    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Error: Invalid Price detected. Please contact support.");
      return;
    }

    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: finalAmount, // Send the clean integer
      currency: "KES", // Explicitly set currency to avoid confusion
      ref: (new Date()).getTime().toString(),
      metadata: {
        funnelId: planId,
        custom_fields: []
      },
      callback: function(response: any) {
        console.log("Payment Complete:", response);
        if (onSuccess) onSuccess();
      },
      onClose: function() {
        console.log("Payment closed");
      }
    });

    handler.openIframe();
  };

  return (
    <div className="w-full">
      <Script 
        src="https://js.paystack.co/v1/inline.js" 
        onLoad={() => setIsScriptLoaded(true)}
      />

      <button 
        onClick={handleBuy}
        disabled={!isScriptLoaded}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isScriptLoaded ? "Buy Now (Secure)" : "Loading..."}
      </button>
    </div>
  );
}