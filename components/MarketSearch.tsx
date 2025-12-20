"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MarketSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("q") || "");
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (text) {
        params.set("q", text);
      } else {
        params.delete("q");
      }
      router.replace(`/market?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text, searchParams, router]);

  return (
    <div className="max-w-md mx-auto mb-8 relative">
       <input 
         type="text" 
         placeholder="Search any digital asset..." 
         className="w-full bg-[#1e293b] text-white border border-slate-700 rounded-full py-4 pl-12 pr-6 outline-none focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
         value={text}
         onChange={(e) => setText(e.target.value)}
       />
       <svg className="w-5 h-5 text-slate-500 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
       </svg>
    </div>
  );
}