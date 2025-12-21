"use client";
import { useState } from "react";
import PaystackButton from "@/components/PaystackButton";

interface CheckoutProps {
  funnel: any;
  affiliateCode?: string;
  coupons?: any[]; 
}

export default function SmartCheckout({ funnel, affiliateCode, coupons }: CheckoutProps) {
  const [email, setEmail] = useState("");
  const chargeAmount = funnel.price; 
  const chargeCurrency = "KES";

  return (
    <div className="max-w-md mx-auto">
      {/* Trust Badge Header */}
      <div className="flex justify-center mb-6 gap-4">
         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
           🔒 Secure SSL
         </span>
         <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            Instant Delivery
         </span>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="text-center mb-8 pt-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">You are purchasing</p>
          <h3 className="text-2xl font-black text-slate-900 leading-tight">{funnel.name}</h3>
          <div className="mt-6 flex justify-center items-baseline gap-1">
             <span className="text-lg font-bold text-slate-400">KES</span>
             <span className="text-5xl font-black text-slate-900 tracking-tighter">{chargeAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Where should we send it?</label>
             <input 
               type="email" 
               required
               placeholder="your@email.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
             />
             <p className="text-[10px] text-slate-400 font-medium ml-1">You will receive a download link instantly.</p>
          </div>

          <div className={!email ? "opacity-50 pointer-events-none grayscale" : ""}>
             <PaystackButton 
                amount={chargeAmount} 
                funnelId={funnel.id} 
                currency={chargeCurrency} 
                email={email}
                affiliateCode={affiliateCode} 
             />
          </div>
          
          <div className="pt-4 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Guaranteed Safe Checkout
             </p>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="text-center mt-8 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Powered by Nexus OS</p>
      </div>
    </div>
  );
}