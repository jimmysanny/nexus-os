"use client";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TONES = [
  { id: "viral", label: " Viral", desc: "Aggressive hooks." },
  { id: "professional", label: " Professional", desc: "Corporate & Clean." },
  { id: "urgent", label: " Urgent", desc: "Scarcity focused." },
  { id: "story", label: " Storyteller", desc: "Emotional narrative." },
];

const TOOLS = [
  { id: "headline", label: "Headline Generator", icon: "" },
  { id: "email", label: "Email Sequence", icon: "" },
  { id: "ad", label: "Ad Creative", icon: "" },
];

const QUICK_STARTS = [
  { label: "Leadership Course", audience: "Managers" },
  { label: "Keto Diet Plan", audience: "New Moms" },
  { label: "SaaS Analytics Tool", audience: "Founders" },
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
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    const localSaved = localStorage.getItem("nexus_saved_copy");
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  // --- LOGIC ENGINE ---
  const autoCorrect = (text: string) => {
     let clean = text;
     const typos: Record<string, string> = { "leadeship": "Leadership", "managment": "Management", "entreprenuer": "Entrepreneur" };
     Object.keys(typos).forEach(k => { clean = clean.replace(new RegExp(`\\b${k}\\b`, "gi"), typos[k]); });
     return clean;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      if (["a", "an", "the", "for", "and", "but", "or", "in", "on", "at", "to", "of", "is"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) return txt.toLowerCase();
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);
    
    // THE SMART LOADER SEQUENCE
    setLoadingText("Analyzing Context...");
    setTimeout(() => setLoadingText("Identifying Pain Points..."), 600);
    setTimeout(() => setLoadingText("Drafting Hooks..."), 1200);

    setTimeout(() => {
      const rawProduct = autoCorrect(input.trim());
      const product = toTitleCase(rawProduct);
      const rawWho = audience.trim() || "Everyone";
      const who = toTitleCase(rawWho);
      
      const t = rawProduct.toLowerCase();
      let scenarios: { text: string; tag: string }[] = [];

      // NICHE MATRIX (Compressed)
      if (t.match(/lead|exec|biz|money|finance|invest|scale|ceo/)) {
         scenarios = [
           { text: `Stop Managing, Start Leading: Why ${product} is the Standard for ${who}.`, tag: "Authority" },
           { text: `The "Silent Killer" of Most Careers is Stagnation. ${product} is the Cure.`, tag: "Fear/Solution" },
           { text: `Why Top ${who} Are Quietly Switching to ${product} (And Leaving MBAs Behind)`, tag: "Social Proof" },
           { text: `The 30-Day Protocol to 2x Your Influence Without "Office Politics".`, tag: "Benefit" }
         ];
      } else if (t.match(/fit|weight|health|diet|muscle|gym/)) {
         scenarios = [
           { text: `Your Trainer is Lying to You: Why ${product} Works Better Than Cardio.`, tag: "Contrarian" },
           { text: `How to Sculpt Your Dream Physique Without Giving Up Carbs (The ${product} Method).`, tag: "Objection Handling" },
           { text: `The "Biology Hack" That Makes ${product} Unfairly Effective for ${who}.`, tag: "Curiosity" }
         ];
      } else if (t.match(/code|app|soft|dev|data|ai|web/)) {
         scenarios = [
           { text: `Stop Writing Boilerplate. Let ${product} Architect Your Systems For You.`, tag: "Efficiency" },
           { text: `Why Senior Devs Are Calling ${product} "The End of Legacy Code".`, tag: "Industry Shift" },
           { text: `Shipping to Prod on Fridays? With ${product}, You Finally Can.`, tag: "Insider Humor" }
         ];
      } else {
         scenarios = [
           { text: `The Strategic Framework for Excellence: Why ${product} Works.`, tag: "Logic" },
           { text: `I Deconstructed the Top Solutions. Here is Why ${product} Wins.`, tag: "Analysis" },
           { text: `Why 99% of ${who} Fail at this (And How ${product} Fixes It).`, tag: "Statistic" }
         ];
      }

      if (tone === "urgent") scenarios = scenarios.map(s => ({ ...s, text: ` ${s.text} (Expires Soon)` }));
      
      const createItem = (text: string, tag: string) => ({ id: Math.random().toString(36).substr(2, 9), text, tag, timestamp: Date.now() });
      setResults(scenarios.map(s => createItem(s.text, s.tag)));
      setLoading(false);
    }, 1800);
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

  const loadQuickStart = (p: string, a: string) => {
    setInput(p);
    setAudience(a);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6">
       {/* HEADER & TABS */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <PageHeader title="AI Studio" subtitle="The world's smartest copywriting engine." />
          <div className="bg-slate-100 p-1 rounded-xl flex shadow-inner">
             <button onClick={() => setActiveTab("generator")} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "generator" ? "bg-white text-slate-900 shadow-sm scale-105" : "text-slate-500 hover:text-slate-700"}`}>Generator</button>
             <button onClick={() => setActiveTab("library")} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "library" ? "bg-white text-slate-900 shadow-sm scale-105" : "text-slate-500 hover:text-slate-700"}`}>Library ({saved.length})</button>
          </div>
       </div>
       
       {activeTab === "generator" ? (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-4">
            {/* SIDEBAR */}
            <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2">
               <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-2">
                  {TOOLS.map((t) => (
                    <button key={t.id} onClick={() => { setTool(t.id); setResults([]); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${tool === t.id ? "bg-slate-900 text-white shadow-md" : "hover:bg-slate-50 text-slate-600"}`}>
                      <span className="text-lg">{t.icon}</span>
                      <span className="text-xs font-bold">{t.label}</span>
                    </button>
                  ))}
               </div>
               
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 block">Voice & Tone</label>
                  <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-4 space-y-2">
                    {TONES.map((t) => (
                      <button key={t.id} onClick={() => setTone(t.id)} className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all ${tone === t.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-transparent hover:bg-slate-50 text-slate-500"}`}>
                        <div className="flex justify-between items-center">
                           <span className="font-bold text-xs">{t.label}</span>
                           {tone === t.id && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                        </div>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
     
            {/* WORKSPACE */}
            <div className="lg:col-span-9 flex flex-col gap-6 h-full">
               {/* INPUT BAR */}
               <div className="bg-white p-1 rounded-[24px] border border-slate-200 shadow-sm flex flex-col md:flex-row">
                  <div className="flex-1 p-3">
                     <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1 block">Product Name</label>
                     <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. Leadership Masterclass" className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="w-px bg-slate-100 my-3 hidden md:block"></div>
                  <div className="flex-1 p-3">
                     <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1 block">Target Audience</label>
                     <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Executives" className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
                  <div className="p-3 flex items-end">
                     <button onClick={generate} disabled={!input || loading} className="h-[46px] w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2">
                       {loading ? "Thinking..." : "Generate"}
                     </button>
                  </div>
               </div>
  
               {/* RESULTS AREA */}
               <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto relative">
                  {results.length === 0 && !loading && (
                     <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm"></div>
                        <h3 className="text-lg font-black text-slate-900">Ready to Create</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 mb-6 font-medium">Select a tool or pick a quick-start template below.</p>
                        
                        <div className="flex flex-wrap justify-center gap-2">
                           {QUICK_STARTS.map((q, i) => (
                              <button key={i} onClick={() => loadQuickStart(q.label, q.audience)} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                                 {q.label}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {loading && (
                     <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                        <p className="text-sm font-bold text-slate-900 animate-pulse">{loadingText}</p>
                     </div>
                  )}

                  {results.length > 0 && !loading && (
                     <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2">
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{results.length} Results Generated</span>
                        </div>
                        <div className="grid gap-4">
                          {results.map((res) => {
                             const isSaved = saved.some(s => s.id === res.id);
                             return (
                             <div key={res.id} className="group bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 relative">
                                <div className="flex justify-between items-start mb-3">
                                  <span className="px-2 py-1 bg-slate-100 rounded-md text-[9px] font-black uppercase tracking-wider text-slate-500">{res.tag}</span>
                                  <div className="flex gap-2">
                                     <button onClick={() => toggleSave(res)} className={`text-lg transition-transform active:scale-90 ${isSaved ? "grayscale-0" : "grayscale opacity-30 hover:opacity-100"}`}></button>
                                     <button onClick={() => handleCopy(res.text, res.id)} className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${copiedIndex === res.id ? "bg-green-100 text-green-700 border-green-200" : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"}`}>
                                        {copiedIndex === res.id ? "Copied" : "Copy"}
                                     </button>
                                  </div>
                                </div>
                                <div contentEditable suppressContentEditableWarning className="text-slate-800 text-sm font-medium leading-relaxed outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 rounded p-1">
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
               <div className="flex flex-col items-center justify-center h-full opacity-50">
                  <span className="text-4xl mb-2"></span>
                  <p className="font-bold text-slate-400">Library Empty</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {saved.map(res => (
                     <div key={res.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                        <button onClick={() => toggleSave(res)} className="absolute top-4 right-4 text-xs font-bold text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-2">{res.tag}</span>
                        <p className="text-sm font-medium text-slate-800">{res.text}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
       )}
    </div>
  );
}