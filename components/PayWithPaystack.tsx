"use client"
import React, { useState } from "react";
import Script from "next/script";

export default function PayWithPaystack({ amount, email, planId, onSuccess }: any) {
  // FALLBACK KEY: Ensures payments work 100% of the time
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_live_f4b6caa5badf46e992b3a307e9b49aa3316cb9fc";
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBuy = () => {
    if (!isLoaded) { alert("Loading payment system..."); return; }
    
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: Math.ceil(Number(amount) * 100), // Force Integer (Kobo)
      currency: "KES",
      ref: new Date().getTime().toString(),
      metadata: { funnelId: planId },
      callback: (resp: any) => { 
        console.log(resp); 
        // Redirect to Success Page
        window.location.href = "/success/" + resp.reference;
      },
    });
    handler.openIframe();
  };

  return (
    <div className="w-full">
      <Script src="https://js.paystack.co/v1/inline.js" onLoad={() => setIsLoaded(true)} />
      <button onClick={handleBuy} disabled={!isLoaded} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg">
        {isLoaded ? "Buy Now (Secure)" : "Loading..."}
      </button>
    </div>
  );
}
