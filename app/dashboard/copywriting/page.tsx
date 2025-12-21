"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const TONES = [
  { id: "viral", label: " Viral", desc: "Short, punchy, high-energy hooks." },
  { id: "professional", label: " Professional", desc: "Trustworthy, clear, B2B focused." },
  { id: "urgent", label: " Urgent", desc: "Scarcity-driven, sales-heavy." },
  { id: "story", label: " Storyteller", desc: "Engaging, narrative, emotional." },
];

interface ResultItem {
  text: string;
  tag: string; // Explains the strategy (e.g. "Authority Anchor")
}

export default function CopywritingPage() {
  const [tool, setTool] = useState("headline"); 
  const [tone, setTone] = useState("viral");
  const [input, setInput] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // --- SMART UTILITIES ---
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      // Simple capitalizer: Ignore small words if not first
      if (["a", "an", "the", "for", "and", "nor", "but", "or", "yet", "so"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) {
         return txt.toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const getContextKeywords = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("lead") || t.includes("exec") || t.includes("business")) {
      return { benefit: "Authority", action: "Scale", result: "Market Dominance", pain: "stagnation" };
    }
    if (t.includes("fit") || t.includes("weight") || t.includes("health")) {
      return { benefit: "Vitality", action: "Transform", result: "Peak Performance", pain: "fatigue" };
    }
    if (t.includes("money") || t.includes("finance") || t.includes("invest")) {
      return { benefit: "Wealth", action: "Multiply", result: "Financial Freedom", pain: "uncertainty" };
    }
    return { benefit: "Results", action: "Upgrade", result: "Success", pain: "mediocrity" };
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    setTimeout(() => {
      const rawProduct = input.trim();
      // Auto-Capitalize for headlines, keep normal for sentences
      const productTitle = toTitleCase(rawProduct);
      const productNormal = rawProduct;
      
      const rawWho = audience.trim() || "you";
      const whoTitle = toTitleCase(rawWho);
      const whoNormal = rawWho;

      const ctx = getContextKeywords(rawProduct + " " + rawWho);
      
      let outputs: ResultItem[] = [];

      // --- 1. HEADLINE ALGORITHMS ---
      if (tool === "headline") {
        if (tone === "professional") {
          outputs = [
            { text: `The Strategic Framework for ${ctx.benefit}: Why ${productTitle} Works`, tag: "Authority Anchor" },
            { text: `How ${productTitle} Is Redefining ${ctx.result} for ${whoTitle}`, tag: "Market Shift" },
            { text: `A CEO's Guide to ${ctx.benefit}: Implementing ${productTitle}`, tag: "Executive Appeal" },
            { text: `Stop Accepting ${toTitleCase(ctx.pain)}. Start Achieving ${ctx.result} with ${productTitle}.`, tag: "Pain/Solution" },
            { text: `${productTitle}: The Competitive Advantage for Modern ${whoTitle}`, tag: "Value Prop" }
          ];
        } else if (tone === "urgent") {
          outputs = [
            { text: ` STOP: Do Not Buy Another Asset Until You See ${productTitle}`, tag: "Pattern Interrupt" },
            { text: `Why ${whoTitle} Are Rushing to Secure ${productTitle} Before Midnight`, tag: "Social Scarcity" },
            { text: `The Cost of ${toTitleCase(ctx.pain)} is Rising. Fix it NOW with ${productTitle}.`, tag: "Loss Aversion" },
            { text: `Final Call: Unlock ${ctx.result} with ${productTitle} (Closing Soon)`, tag: "Urgency" },
            { text: `3 Signs You Are Failing at ${ctx.benefit} (And How to Fix It Today)`, tag: "Problem Aware" }
          ];
        } else { // Viral
          outputs = [
            { text: `I Used ${productTitle} for 30 Days to ${ctx.action} My Results... Look at This.`, tag: "Case Study Hook" },
            { text: `The ${ctx.benefit} Secret That Gurus Are Hiding From ${whoTitle}`, tag: "Curiosity Gap" },
            { text: `How to Get ${ctx.result} Without The Stress of ${toTitleCase(ctx.pain)}`, tag: "Benefit w/o Pain" },
            { text: `Why 99% of ${whoTitle} Fail at ${ctx.benefit} (And How ${productTitle} Saves You)`, tag: "Us vs Them" },
            { text: `Forget the Old Way. ${productTitle} is the New Standard.`, tag: "New Mechanism" }
          ];
        }
      }

      // --- 2. EMAIL SEQUENCES ---
      else if (tool === "email") {
         // Simplified for brevity, normally would use similar logic
         outputs = [
             { text: `Subject: Is ${ctx.pain} costing you money?\n\nHi,\n\nWe analyzed the market and found a common trend among ${whoNormal}: the struggle with ${ctx.pain}.\n\nThat is why we engineered ${productTitle}.\n\nIt is not just a tool; it is a system designed to help you ${ctx.action.toLowerCase()} your output and achieve ${ctx.result}.\n\nReview the case study here: [Link]`, tag: "Problem/Agitate/Solve" },
             { text: `Subject: I found the cheat code for ${ctx.benefit}\n\nHi,\n\nI used to hate ${ctx.pain}. It kept me up at night.\n\nThen I found ${productTitle}, and everything changed.\n\nIt is the fastest way to ${ctx.action.toLowerCase()} your life and finally reach ${ctx.result}.\n\nDon't waitgrab it here: [Link]`, tag: "Personal Story" }
         ];
      }

      // --- 3. AD COPY ---
      else {
         outputs = [
           { text: ` STOP SCROLLING if you want ${ctx.result.toUpperCase()}!\n\n${productTitle} is the unfair advantage for ${whoNormal}.\n\n 10x Your ${ctx.benefit}\n Eliminate ${ctx.pain}\n Proven System\n\nClick below to ${ctx.action.toLowerCase()} your results! `, tag: "Direct Response" },
           { text: `They laughed when I bought ${productTitle}...\n\nBut when they saw my ${ctx.result}? Silence.\n\nDon't let the competition beat you. Master ${ctx.benefit} today.\n\n Link in bio!`, tag: "Story Hook" }
         ];
      }

      setResults(outputs);
      setHistory(prev => [rawProduct, ...prev].slice(0, 5));
      setLoading(false);
    }, 800);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
       <PageHeader title="AI Copywriting Studio" subtitle="Generate professional, revenue-driving sales copy." />
       
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-8">
          {/* SIDEBAR */}
          <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto space-y-8">
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">1. Asset Type</p>
               <div className="space-y-1">
                  {[
                    { id: "headline", label: " Viral Headlines" },
                    { id: "email", label: " Email Sequence" },
                    { id: "ad", label: " Ad & Social Copy" },
                  ].map((t) => (
                    <button 
                      key={t.id}
                      onClick={() => { setTool(t.id); setResults([]); }} 
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === t.id ? "bg-slate-900 text-white shadow-md transform scale-[1.02]" : "hover:bg-slate-50 text-slate-600"}`}
                    >
                      {t.label}
                    </button>
                  ))}
               </div>
             </div>
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">2. Voice & Tone</p>
               <div className="space-y-2">
                  {TONES.map((t) => (
                    <button 
                      key={t.id} 
                      onClick={() => setTone(t.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${tone === t.id ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-transparent hover:bg-slate-50 text-slate-500"}`}
                    >
                      <span className="block font-bold text-sm">{t.label}</span>
                      <span className="block text-[10px] opacity-70 leading-tight mt-0.5">{t.desc}</span>
                    </button>
                  ))}
               </div>
             </div>
          </div>
   
          {/* WORKSPACE */}
          <div className="lg:col-span-9 flex flex-col gap-6 h-full">
             <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product / Topic</label>
                   <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="e.g. leadership masterclass" 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-bold focus:bg-white transition-all"
                     onKeyDown={(e) => e.key === "Enter" && generate()}
                   />
                </div>
                <div className="flex-1 w-full space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Audience</label>
                   <input 
                     value={audience}
                     onChange={(e) => setAudience(e.target.value)}
                     placeholder="e.g. executives" 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium focus:bg-white transition-all"
                   />
                </div>
                <button 
                  onClick={generate}
                  disabled={!input || loading}
                  className="h-[46px] bg-blue-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 whitespace-nowrap flex items-center gap-2"
                >
                  {loading ? (<><span className="animate-spin text-lg"></span> Processing...</>) : (<><span></span> Generate</>)}
                </button>
             </div>

             <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                {results.length === 0 && !loading && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4"></div>
                      <h3 className="text-lg font-bold text-slate-900">Ready to Write</h3>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Enter your product details above. The AI will format, capitalize, and optimize the copy automatically.</p>
                   </div>
                )}

                {loading && (
                   <div className="space-y-6 animate-pulse">
                      {[1,2,3].map(i => (<div key={i} className="h-28 bg-slate-50 rounded-2xl border border-slate-100"></div>))}
                   </div>
                )}

                {results.length > 0 && !loading && (
                   <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                         <h3 className="font-bold text-slate-900 flex items-center gap-2"><span></span> Generated Options</h3>
                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{TONES.find(t => t.id === tone)?.label}</span>
                      </div>
                      <div className="grid gap-4">
                        {results.map((res, i) => (
                           <div key={i} className="group relative p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300">
                              <div className="mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-md">{res.tag}</span>
                              </div>
                              <pre className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed font-sans">{res.text}</pre>
                              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                   onClick={() => handleCopy(res.text, i)}
                                   className={`text-xs font-bold px-4 py-2 rounded-full shadow-sm border transition-all flex items-center gap-2 ${copiedIndex === i ? "bg-green-500 text-white border-green-500" : "bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:border-blue-500"}`}
                                >
                                   {copiedIndex === i ? (<span> Copied</span>) : (<span> Copy</span>)}
                                </button>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}