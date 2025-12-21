"use client";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";

const TONES = [
  { id: "viral", label: " Viral", desc: "Hooks that stop the scroll." },
  { id: "professional", label: " Professional", desc: "High-status, executive language." },
  { id: "urgent", label: " Urgent", desc: "Scarcity that forces action." },
  { id: "story", label: " Storyteller", desc: "Deep, emotional narratives." },
];

interface ResultItem {
  id: string;
  text: string;
  tag: string;
  timestamp: number;
}

export default function CopywritingPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [tool, setTool] = useState("headline"); 
  const [tone, setTone] = useState("viral");
  const [input, setInput] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [saved, setSaved] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    const localSaved = localStorage.getItem("nexus_saved_copy");
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  // --- SMART UTILITIES ---
  const autoCorrect = (text: string) => {
     let clean = text;
     const typos: Record<string, string> = {
       "leadeship": "Leadership", "laedership": "Leadership",
       "managment": "Management", "entreprenuer": "Entrepreneur"
     };
     Object.keys(typos).forEach(k => {
        clean = clean.replace(new RegExp(`\\b${k}\\b`, "gi"), typos[k]);
     });
     return clean;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      if (["a", "an", "the", "for", "and", "but", "or", "in", "on", "at", "to", "of"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) {
         return txt.toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // --- THE NEW "SCENARIO MATRIX" ---
  // Instead of swapping words, we swap entire concepts based on the niche.
  const generateScenarios = (product: string, who: string, rawInput: string) => {
    const t = rawInput.toLowerCase();
    const isBiz = t.match(/lead|exec|biz|money|finance|invest|scale|ceo|manager/);
    const isHealth = t.match(/fit|weight|health|diet|muscle|gym|yoga/);
    const isTech = t.match(/code|app|soft|dev|data|ai|web/);
    
    let scenarios: { text: string; tag: string }[] = [];

    // --- 1. BUSINESS / LEADERSHIP SCENARIOS ---
    if (isBiz) {
       scenarios = [
         { text: `Stop Managing, Start Leading: Why ${product} is the Standard for Modern Executives.`, tag: "Identity Shift" },
         { text: `The "Silent Killer" of Most Careers is Stagnation. ${product} is the Cure.`, tag: "Career Fear" },
         { text: `A CEO's Honest Review: "I wish I had ${product} ten years ago."`, tag: "Authority Proof" },
         { text: `Why Top ${who} Are Quietly Switching to ${product} (And Leaving MBAs Behind)`, tag: "Us vs Them" },
         { text: `The 30-Day Protocol to 2x Your Influence Without "Office Politics".`, tag: "Benefit w/o Pain" }
       ];
    }
    // --- 2. HEALTH / FITNESS SCENARIOS ---
    else if (isHealth) {
       scenarios = [
         { text: `Your Trainer is Lying to You: Why ${product} Works Better Than Cardio.`, tag: "Contrarian Hook" },
         { text: `How to Sculpt Your Dream Physique Without Giving Up Carbs (The ${product} Method).`, tag: "Eat What You Want" },
         { text: `I Tried ${product} for 30 Days. My Doctor Was Shocked at the Results.`, tag: "Shock Value" },
         { text: `The "Biology Hack" That Makes ${product} Unfairly Effective for ${who}.`, tag: "Pseudo-Science Hook" },
         { text: `Stop Renting Your Body. Own It with ${product}.`, tag: "Ownership Frame" }
       ];
    }
    // --- 3. TECH / CODING SCENARIOS ---
    else if (isTech) {
       scenarios = [
         { text: `Stop Writing Boilerplate. Let ${product} Architect Your Systems For You.`, tag: "Efficiency Promise" },
         { text: `Why Senior Devs Are Calling ${product} "The End of Legacy Code".`, tag: "Industry Shift" },
         { text: `Shipping to Prod on Fridays? With ${product}, You Finally Can.`, tag: "Developer Humor" },
         { text: `The Full-Stack Secret: How ${product} Replaces 3 Other Tools in Your Stack.`, tag: "Cost/Complexity Saver" }
       ];
    }
    // --- 4. GENERIC / FALLBACK SCENARIOS ---
    else {
       scenarios = [
         { text: `The Strategic Framework for Excellence: Why ${product} Works.`, tag: "Logic Appeal" },
         { text: `I Deconstructed the Top Solutions. Here is Why ${product} Wins.`, tag: "Comparison" },
         { text: `How to Get Elite Results Without The Usual Stress (Using ${product}).`, tag: "Simplicity Hook" },
         { text: `Why 99% of ${who} Fail at this (And How ${product} Fixes It).`, tag: "Statistic Hook" }
       ];
    }

    // Apply Tone Filters
    if (tone === "urgent") {
        scenarios = scenarios.map(s => ({ ...s, text: ` ${s.text} (Expires Soon)` }));
    }
    
    return scenarios;
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    setTimeout(() => {
      // Clean and Format Inputs
      const rawProduct = autoCorrect(input.trim());
      const product = toTitleCase(rawProduct);
      const rawWho = audience.trim() || "Everyone";
      const who = toTitleCase(rawWho);
      
      const createItem = (text: string, tag: string) => ({ id: Math.random().toString(36).substr(2, 9), text, tag, timestamp: Date.now() });

      // Run the Niche Matrix
      const scenarios = generateScenarios(product, who, rawProduct + " " + rawWho);
      
      // Map to Result Items
      const outputs = scenarios.slice(0, 5).map(s => createItem(s.text, s.tag));

      setResults(outputs);
      setLoading(false);
    }, 1200);
  };

  const toggleSave = (item: ResultItem) => {
    const exists = saved.find(s => s.id === item.id);
    let newSaved = exists ? saved.filter(s => s.id !== item.id) : [item, ...saved];
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
          <PageHeader title="AI Copywriting Studio" subtitle="Context-aware engine for niche-specific sales copy." />
          <div className="bg-white border border-slate-200 p-1 rounded-xl flex gap-1 shadow-sm">
             <button onClick={() => setActiveTab("generator")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "generator" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Generator</button>
             <button onClick={() => setActiveTab("library")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "library" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Library ({saved.length})</button>
          </div>
       </div>
       
       {activeTab === "generator" ? (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-8">
            {/* Sidebar remains the same... */}
            <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto space-y-8">
               <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">1. Asset Type</p>
                 <div className="space-y-1">
                    {[{ id: "headline", label: " Viral Headlines" }].map((t) => (
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
     
            <div className="lg:col-span-9 flex flex-col gap-6 h-full">
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product / Topic</label>
                     <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. leadership program" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-bold focus:bg-white transition-all" onKeyDown={(e) => e.key === "Enter" && generate()} />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Audience</label>
                     <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. executives" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium focus:bg-white transition-all" />
                  </div>
                  <button onClick={generate} disabled={!input || loading} className="h-[46px] bg-slate-900 text-white px-8 rounded-xl font-bold text-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-300 whitespace-nowrap flex items-center gap-2">
                    {loading ? (<><span className="animate-spin text-lg"></span> Analyzing...</>) : (<><span></span> Generate</>)}
                  </button>
               </div>
  
               <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                  {results.length === 0 && !loading && (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4 grayscale"></div>
                        <h3 className="text-lg font-bold text-slate-900">Context Engine Active</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">I will detect your industry (Business, Health, Tech) and generate specialized hooks.</p>
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
                           <h3 className="font-bold text-slate-900 flex items-center gap-2"><span></span> Niche-Specific Results</h3>
                           <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{TONES.find(t => t.id === tone)?.label}</span>
                        </div>
                        <div className="grid gap-4">
                          {results.map((res) => {
                             const isSaved = saved.some(s => s.id === res.id);
                             return (
                             <div key={res.id} className="group relative p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                                <div className="mb-2 flex justify-between items-start">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 px-2 py-1 rounded-md">{res.tag}</span>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button onClick={() => toggleSave(res)} className={`p-2 rounded-full border transition-all ${isSaved ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-slate-200 text-slate-400 hover:text-red-500"}`}>{isSaved ? "" : ""}</button>
                                     <button onClick={() => handleCopy(res.text, res.id)} className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${copiedIndex === res.id ? "bg-green-500 text-white border-green-500" : "bg-white text-slate-600 border-slate-200 hover:border-blue-500"}`}>{copiedIndex === res.id ? " Copied" : "Copy"}</button>
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
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex-1 overflow-y-auto text-center">
            {saved.length === 0 ? <p className="text-slate-400 mt-20">No saved assets yet.</p> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{saved.map(res => <div key={res.id} className="p-6 bg-slate-50 rounded-2xl border text-left"><p className="text-sm font-bold mb-2">{res.tag}</p><pre className="whitespace-pre-wrap text-sm">{res.text}</pre></div>)}</div>}
         </div>
       )}
    </div>
  );
}