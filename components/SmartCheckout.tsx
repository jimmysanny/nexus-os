"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PaystackButton from "./PaystackButton";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function SmartCheckout({ funnel, coupons }: { funnel: any, coupons: any[] }) {
  const { isSignedIn, isLoaded } = useUser();
  const searchParams = useSearchParams();
  
  const [currency, setCurrency] = useState("KES");
  const [loadingGeo, setLoadingGeo] = useState(true);

  //  WORLD CURRENCY RATES (Base: KES 1)
  // These are "Display Rates". We will charge International users in USD.
  const RATES: Record<string, number> = {
    KES: 1,       // Kenya (Base)
    USD: 129,     // USA (1 USD = 129 KES)
    EUR: 140,     // Europe (1 EUR = 140 KES)
    GBP: 165,     // UK (1 GBP = 165 KES)
    CAD: 95,      // Canada
    AUD: 85,      // Australia
    INR: 1.5,     // India
    NGN: 0.08,    // Nigeria
    ZAR: 7,       // South Africa
    GHS: 8,       // Ghana
    TZS: 0.05,    // Tanzania
    UGX: 0.035    // Uganda
  };

  const SYMBOLS: Record<string, string> = {
    KES: "KES", USD: "$", EUR: "", GBP: "", CAD: "C$", AUD: "A$", 
    INR: "", NGN: "", ZAR: "R", GHS: "", TZS: "TSh", UGX: "USh"
  };

  useEffect(() => {
    // 1. AUTO-DETECT LOCATION
    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country = data.country_code; // e.g. "DE", "GB", "IN"
        const currencyCode = data.currency; // API often gives us the currency code directly!

        // If the currency is in our list, switch to it. Otherwise default to USD.
        if (RATES[currencyCode]) {
           setCurrency(currencyCode);
        } else {
           setCurrency("USD"); // Default for rest of world (Japan, Brazil, etc)
        }
      } catch (e) {
        setLoadingGeo(false);
      }
      setLoadingGeo(false);
    };
    detectLocation();
  }, []);

  // CALCULATE DISPLAY PRICE
  const basePriceKES = funnel.price;
  const rate = RATES[currency] || 129;
  
  // Logic: If currency is KES, divide by 1. If USD, divide by 129.
  const finalDisplayPrice = Math.round(basePriceKES / (currency === "KES" ? 1 : rate));

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);
  const [affiliate, setAffiliate] = useState("");

  const checkCoupon = () => {
    const found = coupons.find(c => c.code === code.toUpperCase());
    if (found) { setDiscount(found.percent); setApplied(true); } 
    else { alert("Invalid Code"); }
  };

  const finalChargeAmount = Math.round(finalDisplayPrice * (1 - discount / 100));
  
  // IMPORTANT: WE ONLY CHARGE IN KES or USD (Paystack Limitation)
  // If user selects Euro, we show Euro, but silently charge USD equivalent.
  const chargeCurrency = currency === "KES" ? "KES" : "USD";
  const chargeAmount = currency === "KES" 
     ? finalChargeAmount 
     : Number((basePriceKES / RATES["USD"] * (1 - discount / 100)).toFixed(2));

  if (!isLoaded) return <div className="p-10 text-center text-slate-400">Loading secure terminal...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 relative overflow-hidden">
      
      {/* WORLD DROPDOWN */}
      <div className="absolute top-6 right-6">
         <select 
           value={currency} 
           onChange={(e) => setCurrency(e.target.value)}
           className="bg-slate-50 border border-slate-200 text-[10px] font-black rounded-lg px-2 py-1 outline-none cursor-pointer uppercase"
         >
           {Object.keys(RATES).map(c => (
             <option key={c} value={c}>{SYMBOLS[c]} {c}</option>
           ))}
         </select>
      </div>

      <div className="text-center mb-8 mt-2">
        <h1 className="text-2xl font-black text-slate-900 mb-2">{funnel.name}</h1>
        <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
           {loadingGeo ? <span className="animate-pulse">Locating...</span> : "Global Secure Checkout"}
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl mb-8 space-y-3">
        <div className="flex justify-between text-sm font-bold text-slate-400">
          <span>Subtotal</span>
          <span>{SYMBOLS[currency]} {finalDisplayPrice.toLocaleString()}</span>
        </div>
        {applied && (
           <div className="flex justify-between text-sm font-black text-green-600">
             <span>Discount</span>
             <span>-{discount}%</span>
           </div>
        )}
        <div className="h-px bg-slate-200 my-2"></div>
        <div className="flex justify-between text-xl font-black text-slate-900">
          <span>Total</span>
          <span>{SYMBOLS[currency]} {finalChargeAmount.toLocaleString()}</span>
        </div>
        {currency !== "KES" && currency !== "USD" && (
           <p className="text-[9px] text-right text-slate-400 italic">
             *Processed as USD {chargeAmount}
           </p>
        )}
      </div>

      {!isSignedIn ? (
        <div className="text-center space-y-4">
           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <span className="text-4xl mb-2 block"></span>
              <h3 className="text-blue-900 font-black text-sm mb-2">Member Access Only</h3>
              <p className="text-blue-600 text-xs font-medium mb-4">
                 Join Nexus OS to purchase this asset securely.
              </p>
              <div className="grid grid-cols-2 gap-3">
                 <SignInButton mode="modal"><button className="w-full py-3 bg-white border border-blue-200 text-blue-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Login</button></SignInButton>
                 <SignUpButton mode="modal"><button className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700">Sign Up</button></SignUpButton>
              </div>
           </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-8">
            <input placeholder="Promo Code" className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold uppercase outline-none" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={checkCoupon} className="bg-slate-900 text-white px-5 rounded-xl text-[10px] font-black uppercase tracking-widest">Apply</button>
          </div>

          {/* WE PASS THE CHARGE CURRENCY (USD/KES) NOT THE DISPLAY CURRENCY */}
          <PaystackButton amount={chargeAmount} funnelId={funnel.id} currency={chargeCurrency} affiliateCode={affiliate} />
          
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
             <div className="flex justify-center gap-2 opacity-50 grayscale">
                <span className="text-[10px] font-bold">VISA  MASTERCARD  APPLE PAY  GOOGLE PAY</span>
             </div>
          </div>
        </>
      )}
    </div>
  );
}