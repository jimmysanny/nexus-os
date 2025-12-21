"use client";
import { useState } from "react";
import PaystackButton from "@/components/PaystackButton";

// FIXED: Added 'coupons' to the interface so the build stops crashing
interface CheckoutProps {
  funnel: any;
  affiliateCode?: string;
  coupons?: any[];
}

export default function SmartCheckout({ funnel, affiliateCode, coupons }: CheckoutProps) {
  const [email, setEmail] = useState("");
  
  // Logic to handle currency conversion
  const isKenyan = true; 
  const chargeAmount = funnel.price; 
  const chargeCurrency = "KES";

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-[32px] shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Secure Checkout</p>
        <h3 className="text-2xl font-black text-slate-900">{funnel.name}</h3>
        <p className="text-4xl font-black text-blue-600 mt-4">
           <span className="text-lg text-slate-400 align-top mr-1">KES</span>
           {chargeAmount.toLocaleString()}
        </p>
      </div>

      <div className="space-y-6">
        <div>
           <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">Email Address</label>
           <input 
             type="email" 
             required
             placeholder="where.to.send@receipt.com"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:border-blue-500 transition-all font-medium"
           />
        </div>

        {/* Pass the email and affiliateCode correctly to the button */}
        <div className={!email ? "opacity-50 pointer-events-none grayscale" : ""}>
           <PaystackButton 
              amount={chargeAmount} 
              funnelId={funnel.id} 
              currency={chargeCurrency} 
              email={email}
              affiliateCode={affiliateCode} 
           />
        </div>
        
        <p className="text-center text-[10px] text-slate-400 font-medium">
            256-bit Encrypted Payment via Paystack
        </p>
      </div>
    </div>
  );
}