"use client";
import { useState } from "react";
import PaystackButton from "@/components/PaystackButton";
import { getTheme } from "@/lib/themes";

interface CheckoutProps {
  funnel: any;
  affiliateCode?: string;
  coupons?: any[]; 
}

export default function SmartCheckout({ funnel, affiliateCode, coupons }: CheckoutProps) {
  const [email, setEmail] = useState("");
  const theme = getTheme(funnel.themeColor); // <-- FETCH THEME
  
  const chargeAmount = funnel.price; 
  const chargeCurrency = "KES";

  return (
    <div className="max-w-md mx-auto">
      {/* Dynamic Trust Badges */}
      <div className="flex justify-center mb-6 gap-4">
         <span className={`${theme.secondary} ${theme.accent} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1`}>
           🔒 Secure SSL
         </span>
         <span className={`${theme.secondary} ${theme.accent} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1`}>
            Instant Access
         </span>
      </div>

      <div className={`bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden`}>
        {/* Dynamic Gradient Bar */}
        <div className={`absolute top-0 left-0 w-full h-2 ${theme.primary}`}></div>
        
        <div className="text-center mb-8 pt-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">You are purchasing</p>
          <h3 className="text-2xl font-black text-slate-900 leading-tight">{funnel.name}</h3>
          <div className="mt-6 flex justify-center items-baseline gap-1">
             <span className="text-lg font-bold text-slate-400">KES</span>
             <span className={`text-5xl font-black tracking-tighter ${theme.accent}`}>{chargeAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
             <input 
               type="email" 
               required
               placeholder="your@email.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className={`w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-slate-900 transition-all font-medium text-slate-900`}
             />
          </div>

          <div className={!email ? "opacity-50 pointer-events-none grayscale" : ""}>
             <div className="relative group">
                {/* Dynamic Button Color */}
                <div className={`absolute -inset-1 ${theme.primary} rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200`}></div>
                <div className="relative">
                   <PaystackButton 
                      amount={chargeAmount} 
                      funnelId={funnel.id} 
                      currency={chargeCurrency} 
                      email={email}
                      affiliateCode={affiliateCode} 
                   />
                </div>
             </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Guaranteed Safe Checkout
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}