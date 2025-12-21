"use client";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";

// --- CONFIG ---
const TONES = [
  { id: "viral", label: " Viral", desc: "Short, punchy hooks" },
  { id: "professional", label: " Professional", desc: "Trustworthy, B2B" },
  { id: "urgent", label: " Urgent", desc: "Scarcity-driven" },
  { id: "story", label: " Storyteller", desc: "Narrative, emotional" },
];

interface ResultItem {
  id: string;
  text: string;
  tag: string;
  timestamp: number;
}

export default function CopywritingPage() {
  const [activeTab, setActiveTab] = useState("generator"); // generator | library
  const [tool, setTool] = useState("headline"); 
  const [tone, setTone] = useState("viral");
  const [input, setInput] = useState("");
  const [audience, setAudience] = useState("");
  
  const [results, setResults] = useState<ResultItem[]>([]);
  const [saved, setSaved] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // --- PERSISTENCE (Load Saved Items) ---
  useEffect(() => {
    const localSaved = localStorage.getItem("nexus_saved_copy");
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  // --- HELPER LOGIC ---
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      if (["a", "an", "the", "for", "and", "nor", "but", "or", "yet", "so"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) {
         return txt.toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const getContextKeywords = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("lead") || t.includes("exec") || t.includes("business")) return { benefit: "Authority", action: "Scale", result: "Market Dominance", pain: "stagnation" };
    if (t.includes("fit") || t.includes("weight") || t.includes("health")) return { benefit: "Vitality", action: "Transform", result: "Peak Performance", pain: "fatigue" };
    if (t.includes("money") || t.includes("finance") || t.includes("invest")) return { benefit: "Wealth", action: "Multiply", result: "Financial Freedom", pain: "uncertainty" };
    return { benefit: "Results", action: "Upgrade", result: "Success", pain: "mediocrity" };
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    setTimeout(() => {
      const rawProduct = input.trim();
      const productTitle = toTitleCase(rawProduct);
      const rawWho = audience.trim() || "you";
      const whoTitle = toTitleCase(rawWho);
      const ctx = getContextKeywords(rawProduct + " " + rawWho);
      
      let outputs: ResultItem[] = [];
      const createItem = (text: string, tag: string) => ({ id: Math.random().toString(36).substr(2, 9), text, tag, timestamp: Date.now() });

      // LOGIC MAPPING
      if (tool === "headline") {
        if (tone === "professional") {
          outputs = [
            createItem(`The Strategic Framework for ${ctx.benefit}: Why ${productTitle} Works`, "Authority Anchor"),
            createItem(`How ${productTitle} Is Redefining ${ctx.result} for ${whoTitle}`, "Market Shift"),
            createItem(`A CEO's Guide to ${ctx.benefit}: Implementing ${productTitle}`, "Executive Appeal"),
            createItem(`${productTitle}: The Competitive Advantage for Modern ${whoTitle}`, "Value Prop")
          ];
        } else if (tone === "urgent") {
          outputs = [
            createItem(` STOP: Do Not Buy Another Asset Until You See ${productTitle}`, "Pattern Interrupt"),
            createItem(`Why ${whoTitle} Are Rushing to Secure ${productTitle} Before Midnight`, "Social Scarcity"),
            createItem(`Final Call: Unlock ${ctx.result} with ${productTitle} (Closing Soon)`, "Urgency")
          ];
        } else { 
          outputs = [
            createItem(`I Used ${productTitle} for 30 Days to ${ctx.action} My Results... Look at This.`, "Case Study Hook"),
            createItem(`The ${ctx.benefit} Secret That Gurus Are Hiding From ${whoTitle}`, "Curiosity Gap"),
            createItem(`Why 99% of ${whoTitle} Fail at ${ctx.benefit} (And How ${productTitle} Saves You)`, "Us vs Them")
          ];
        }
      } else if (tool === "email") {
         outputs = [
             createItem(`Subject: Is ${ctx.pain} costing you money?\n\nHi,\n\nWe analyzed the market and found a common trend among ${rawWho}: the struggle with ${ctx.pain}.\n\nThat is why we engineered ${productTitle}.\n\nIt is not just a tool; it is a system designed to help you ${ctx.action.toLowerCase()} your output.`, "Problem/Agitate/Solve"),
             createItem(`Subject: I found the cheat code for ${ctx.benefit}\n\nHi,\n\nI used to hate ${ctx.pain}. It kept me up at night.\n\nThen I found ${productTitle}, and everything changed.\n\nIt is the fastest way to ${ctx.action.toLowerCase()} your life.`, "Personal Story")
         ];
      } else {
         outputs = [
           createItem(` STOP SCROLLING if you want ${ctx.result.toUpperCase()}!\n\n${productTitle} is the unfair advantage for ${rawWho}.\n\n 10x Your ${ctx.benefit}\n Eliminate ${ctx.pain}\n\nClick below! `, "Direct Response"),
           createItem(`They laughed when I bought ${productTitle}...\n\nBut when they saw my ${ctx.result}? Silence.\n\nDon't let the competition beat you.`, "Story Hook")
         ];
      }

      setResults(outputs);
      setLoading(false);
    }, 800);
  };

  // --- ACTIONS ---
  const toggleSave = (item: ResultItem) => {
    const exists = saved.find(s => s.id === item.id);
    let newSaved;
    if (exists) {
      newSaved = saved.filter(s => s.id !== item.id);
    } else {
      newSaved = [item, ...saved];
    }
    setSaved(newSaved);
    localStorage.setItem("nexus_saved_copy", JSON.stringify(newSaved));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
       <div className="flex justify-between items-start">
          <PageHeader title="AI Copywriting Studio" subtitle="Generate, edit, and save high-converting sales copy." />
          {/* TABS */}
          <div className="bg-white border border-slate-200 p-1 rounded-xl flex gap-1 shadow-sm">
             <button onClick={() => setActiveTab("generator")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "generator" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Generator</button>
             <button onClick={() => setActiveTab("library")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "library" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Saved Library ({saved.length})</button>
          </div>
       </div>
       
       {activeTab === "generator" ? (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-8">
            {/* SIDEBAR */}
            <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto space-y-8">
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">1. Asset Type</p>
                 <div className="space-y-1">
                    {[{ id: "headline", label: " Viral Headlines" }, { id: "email", label: " Email Sequence" }, { id: "ad", label: " Ad & Social Copy" }].map((t) => (
                      <button key={t.id} onClick={() => { setTool(t.id); setResults([]); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === t.id ? "bg-slate-900 text-white shadow-md transform scale-[1.02]" : "hover:bg-slate-50 text-slate-600"}`}>{t.label}</button>
                    ))}
                 </div>
               </div>
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">2. Voice & Tone</p>
                 <div className="grid grid-cols-1 gap-2">
                    {TONES.map((t) => (
                      <button key={t.id} onClick={() => setTone(t.id)} className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${tone === t.id ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-transparent hover:bg-slate-50 text-slate-500"}`}>
                        <span className="block font-bold text-sm">{t.label}</span>
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
                     <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. leadership masterclass" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-bold focus:bg-white transition-all" onKeyDown={(e) => e.key === "Enter" && generate()} />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Audience</label>
                     <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. executives" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium focus:bg-white transition-all" />
                  </div>
                  <button onClick={generate} disabled={!input || loading} className="h-[46px] bg-blue-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 whitespace-nowrap flex items-center gap-2">
                    {loading ? (<><span className="animate-spin text-lg"></span> Processing...</>) : (<><span></span> Generate</>)}
                  </button>
               </div>
  
               <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                  {results.length === 0 && !loading && (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4"></div>
                        <h3 className="text-lg font-bold text-slate-900">Ready to Write</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Enter your product details. Your history will be saved automatically.</p>
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
                          {results.map((res) => {
                             const isSaved = saved.some(s => s.id === res.id);
                             return (
                             <div key={res.id} className="group relative p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <div className="mb-2 flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-md">{res.tag}</span>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button onClick={() => toggleSave(res)} className={`p-2 rounded-full border transition-all ${isSaved ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-slate-200 text-slate-400 hover:text-red-500"}`}>
                                        {isSaved ? "" : ""}
                                     </button>
                                     <button onClick={() => handleCopy(res.text, res.id)} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${copiedIndex === res.id ? "bg-green-500 text-white border-green-500" : "bg-white text-slate-600 border-slate-200 hover:border-blue-500"}`}>
                                        {copiedIndex === res.id ? " Copied" : "Copy"}
                                     </button>
                                  </div>
                                </div>
                                <div contentEditable className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed font-sans outline-none focus:text-blue-900 focus:bg-blue-50/50 rounded p-1 transition-colors" suppressContentEditableWarning>
                                   {res.text}
                                </div>
                             </div>
                          )})}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
       ) : (
         // LIBRARY VIEW
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex-1 overflow-y-auto">
            {saved.length === 0 ? (
               <div className="text-center py-20">
                  <div className="text-4xl mb-4 grayscale opacity-30"></div>
                  <h3 className="font-bold text-slate-900">Your library is empty</h3>
                  <p className="text-slate-500 text-sm mt-2">Generate some copy and click the heart icon to save it here.</p>
                  <button onClick={() => setActiveTab("generator")} className="mt-6 text-blue-600 font-bold text-sm hover:underline">Go to Generator </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {saved.map((res) => (
                     <div key={res.id} className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                        <div className="mb-4 flex justify-between items-start">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded-md">{res.tag}</span>
                           <button onClick={() => toggleSave(res)} className="text-xs text-red-500 hover:text-red-700 font-bold">Remove</button>
                        </div>
                        <pre className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed font-sans text-sm">{res.text}</pre>
                        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                           <button onClick={() => handleCopy(res.text, res.id)} className="text-xs font-bold text-blue-600 hover:underline">
                              {copiedIndex === res.id ? "Copied!" : "Copy to Clipboard"}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
       )}
    </div>
  );
}