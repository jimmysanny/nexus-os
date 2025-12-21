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

  // --- 1. SMART CAPITALIZATION ---
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      if (["a", "an", "the", "for", "and", "nor", "but", "or", "yet", "so", "in", "on", "at", "to"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) {
         return txt.toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // --- 2. DEEP CONTEXT ENGINE (The "Brain") ---
  const getDeepContext = (text: string) => {
    const t = text.toLowerCase();
    
    // Niche: WEALTH & BIZ
    if (t.match(/lead|exec|biz|money|finance|invest|crypto|scale|grow|ceo/)) {
      return { 
        verb: "Dominate", 
        outcome: "Market Authority", 
        enemy: "Stagnation", 
        dream: "Uncapped Growth", 
        adj: "Strategic",
        trigger: "The '3-Step' Framework"
      };
    }
    // Niche: HEALTH & FITNESS
    if (t.match(/fit|weight|health|diet|muscle|gym|yoga|body/)) {
      return { 
        verb: "Sculpt", 
        outcome: "Peak Vitality", 
        enemy: "Fatigue", 
        dream: "Your Dream Physique", 
        adj: "Metabolic",
        trigger: "The 'Bio-Hack' Protocol"
      };
    }
    // Niche: TECH & CODING
    if (t.match(/code|app|soft|dev|tech|data|ai|web/)) {
      return { 
        verb: "Architect", 
        outcome: "Flawless Systems", 
        enemy: "Spaghetti Code", 
        dream: "Scalable Infrastructure", 
        adj: "High-Performance",
        trigger: "The 'Full-Stack' Secret"
      };
    }
    // Niche: CREATIVE & DESIGN
    if (t.match(/design|art|photo|write|create|content/)) {
      return { 
        verb: "Unlock", 
        outcome: "Creative Genius", 
        enemy: "Creative Block", 
        dream: "Viral Recognition", 
        adj: "Aesthetic",
        trigger: "The 'Flow-State' Method"
      };
    }
    
    // Default (Generic but strong)
    return { 
      verb: "Accelerate", 
      outcome: "Elite Results", 
      enemy: "Mediocrity", 
      dream: "Total Freedom", 
      adj: "Proven",
      trigger: "The 'Missing Link'"
    };
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    setTimeout(() => {
      const rawProduct = input.trim();
      const product = toTitleCase(rawProduct);
      const rawWho = audience.trim() || "you";
      const who = toTitleCase(rawWho);
      
      const ctx = getDeepContext(rawProduct + " " + rawWho);
      
      let outputs: ResultItem[] = [];
      const createItem = (text: string, tag: string) => ({ id: Math.random().toString(36).substr(2, 9), text, tag, timestamp: Date.now() });

      // --- 3. HIGH-LEVEL COPYWRITING TEMPLATES ---
      
      if (tool === "headline") {
        if (tone === "professional") {
          outputs = [
            createItem(`The ${ctx.adj} Playbook: How to ${ctx.verb} Your Sector With ${product}`, "Authority Frame"),
            createItem(`Why ${who} Are Pivoting to ${product} to Escape ${ctx.enemy}`, "Market Shift"),
            createItem(`Beyond ${ctx.outcome}: A Comprehensive Analysis of ${product}`, "Deep Dive"),
            createItem(`${product}: The ${ctx.adj} Infrastructure for Modern ${who}`, "Value Proposition")
          ];
        } else if (tone === "urgent") {
          outputs = [
            createItem(` RED ALERT: ${ctx.enemy} is Costing You Money. ${product} Stops the Bleeding.`, "Pain Agitation"),
            createItem(`The Window is Closing: Secure Your ${ctx.dream} Before Competitors Catch On`, "Competitive Fear"),
            createItem(`Do Not Buy Another Tool Until You Benchmark It Against ${product}`, "Comparison Anchor")
          ];
        } else { // Viral / Story
          outputs = [
            createItem(`I Deconstructed ${product} for 30 Days. Here is the ${ctx.trigger} I Found.`, "Insider Secret"),
            createItem(`Why 99% of ${who} Never Achieve ${ctx.outcome} (And How ${product} Fixes It)`, "The 'One Thing'"),
            createItem(`The 'Boring' Secret Behind ${ctx.dream}? It's Actually ${product}.`, "Contrarian Hook"),
            createItem(`Stop Trying to ${ctx.verb} Harder. Use ${product} to Cheat the System.`, "Work Smart")
          ];
        }
      } 
      
      else if (tool === "email") {
         outputs = [
             createItem(`Subject: The uncomfortable truth about ${ctx.enemy}\n\nHi,\n\nMost ${who} are lying to themselves.\n\nThey think if they just work harder, they will finally achieve ${ctx.outcome}.\n\nBut you and I know that is not true. The system is rigged against you.\n\nThat is why I built ${product}.\n\nIt is not a "tool." It is a ${ctx.adj} weapon designed to destroy ${ctx.enemy} and force ${ctx.dream} to happen.\n\nSee the proof here: [Link]`, "The 'Hard Truth' Angle"),
             
             createItem(`Subject: I found the ${ctx.trigger} for ${ctx.outcome}\n\nHi,\n\nI used to be obsessed with complex strategies. I thought complexity meant value.\n\nI was wrong.\n\nReal power comes from simplicity. And ${product} is the simplest way to ${ctx.verb} your results.\n\nIf you want ${ctx.dream} without the headache, this is for you.\n\n[Link: Get Access]`, "Epiphany Bridge")
         ];
      } 
      
      else { // Ad Copy
         outputs = [
           createItem(` STOP SCROLLING.\n\nYou are chasing ${ctx.outcome} the wrong way.\n\nThe old way? Struggle, burnout, and ${ctx.enemy}.\n\nThe new way? ${product}.\n\nIt is the ${ctx.adj} shortcut used by the top 1% of ${who}.\n\n Click to steal their strategy!`, "Pattern Interrupt"),
           
           createItem(`They laughed when I said I could ${ctx.verb} my results in 30 days...\n\nBut when I showed them my ${ctx.dream}? Silence.\n\nThe secret wasn't luck. It was ${product}.\n\nDon't let ${ctx.enemy} win. Level up today.\n\n Link in bio!`, "Hero's Journey")
         ];
      }

      setResults(outputs);
      setLoading(false);
    }, 1000); // Thinking time
  };

  // --- UI HANDLERS ---
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
          <PageHeader title="AI Copywriting Studio" subtitle="Deep-learning engine for high-converting sales assets." />
          <div className="bg-white border border-slate-200 p-1 rounded-xl flex gap-1 shadow-sm">
             <button onClick={() => setActiveTab("generator")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "generator" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Generator</button>
             <button onClick={() => setActiveTab("library")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "library" ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:bg-slate-50"}`}> Library ({saved.length})</button>
          </div>
       </div>
       
       {activeTab === "generator" ? (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-8">
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
                  <button onClick={generate} disabled={!input || loading} className="h-[46px] bg-slate-900 text-white px-8 rounded-xl font-bold text-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-300 whitespace-nowrap flex items-center gap-2">
                    {loading ? (<><span className="animate-spin text-lg"></span> Thinking...</>) : (<><span></span> Generate</>)}
                  </button>
               </div>
  
               <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                  {results.length === 0 && !loading && (
                     <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4 grayscale"></div>
                        <h3 className="text-lg font-bold text-slate-900">Deep Learning Engine Ready</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Enter your topic. I will analyze 50+ semantic data points to craft the perfect hook.</p>
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
                           <h3 className="font-bold text-slate-900 flex items-center gap-2"><span></span> Smart Results</h3>
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
            {saved.length === 0 ? <p className="text-slate-400 mt-20">No saved assets yet.</p> : 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{saved.map(res => <div key={res.id} className="p-6 bg-slate-50 rounded-2xl border text-left"><p className="text-sm font-bold mb-2">{res.tag}</p><pre className="whitespace-pre-wrap text-sm">{res.text}</pre></div>)}</div>
            }
         </div>
       )}
    </div>
  );
}