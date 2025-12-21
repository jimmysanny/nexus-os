"use client";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";

const TONES = [
  { id: "viral", label: " Viral", desc: "Aggressive hooks." },
  { id: "professional", label: " Professional", desc: "Corporate & Clean." },
  { id: "urgent", label: " Urgent", desc: "Scarcity focused." },
  { id: "story", label: " Storyteller", desc: "Emotional narrative." },
];

const TOOLS = [
  { id: "headline", label: "Viral Headlines", icon: "", hint: "Generates bold, punchy hooks." },
  { id: "email", label: "Email Sequences", icon: "", hint: "Writes subject lines and body copy." },
  { id: "ad", label: "Ad Creatives", icon: "", hint: "Creates social media hooks & captions." },
];

interface ResultItem {
  id: string;
  type: "headline" | "email" | "ad";
  content: { head?: string; subject?: string; body?: string; };
  tag: string;
  timestamp: number;
}

export default function CopywritingPage() {
  const [activeTab, setActiveTab] = useState("generator");
  const [tool, setTool] = useState("headline"); 
  const [tone, setTone] = useState("viral");
  
  // State
  const [input, setInput] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [saved, setSaved] = useState<ResultItem[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- 1. LOAD EVERYTHING ON MOUNT ---
  useEffect(() => {
    // Load Library
    const localSaved = localStorage.getItem("nexus_saved_copy");
    if (localSaved) setSaved(JSON.parse(localSaved));

    // Load Session (Inputs & Results)
    const sessionInput = localStorage.getItem("nexus_session_input");
    const sessionAudience = localStorage.getItem("nexus_session_audience");
    const sessionResults = localStorage.getItem("nexus_session_results");
    
    if (sessionInput) setInput(sessionInput);
    if (sessionAudience) setAudience(sessionAudience);
    if (sessionResults) setResults(JSON.parse(sessionResults));
    
    setIsLoaded(true);
  }, []);

  // --- 2. AUTO-SAVE INPUTS & RESULTS ---
  useEffect(() => {
    if (!isLoaded) return; // Don't save empty state on initial load
    localStorage.setItem("nexus_session_input", input);
  }, [input, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nexus_session_audience", audience);
  }, [audience, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nexus_session_results", JSON.stringify(results));
  }, [results, isLoaded]);


  // --- LOGIC ENGINE ---
  const sanitizeInput = (text: string) => {
     let clean = text;
     const corrections = [
        { pattern: /lead[a-z]*ship/gi, fix: "Leadership" },
        { pattern: /mast[a-z]*class/gi, fix: "Masterclass" },
        { pattern: /manag[a-z]*ment/gi, fix: "Management" },
        { pattern: /entr[a-z]*pr[a-z]*/gi, fix: "Entrepreneur" },
        { pattern: /busin[a-z]*/gi, fix: "Business" },
        { pattern: /mark[a-z]*ting/gi, fix: "Marketing" }
     ];
     corrections.forEach(c => { clean = clean.replace(c.pattern, c.fix); });
     return clean;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      if (["a", "an", "the", "for", "and", "but", "or", "in", "on", "at", "to", "of", "is"].includes(txt.toLowerCase()) && txt !== str.split(" ")[0]) return txt.toLowerCase();
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const getGrammarRules = (noun: string) => {
     const lower = noun.toLowerCase();
     const isPlural = lower.endsWith("s") && !lower.endsWith("ss"); 
     return { verb_work: isPlural ? "Work" : "Works", verb_is: isPlural ? "Are" : "Is", verb_fix: isPlural ? "Fix" : "Fixes" };
  };

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setLoadingText("Fixing Typos & Grammar...");

    setTimeout(() => {
      const cleanRaw = sanitizeInput(input.trim());
      const product = toTitleCase(cleanRaw);
      const who = toTitleCase(audience.trim() || "Everyone");
      const grammar = getGrammarRules(cleanRaw);
      const t = cleanRaw.toLowerCase();
      
      let outputs: ResultItem[] = [];
      const create = (type: any, content: any, tag: string) => ({ id: Math.random().toString(36).substr(2, 9), type, content, tag, timestamp: Date.now() });

      if (tool === "headline") {
         if (t.match(/lead|exec|biz/)) {
            outputs.push(create("headline", { head: `Stop Learning, Start Becoming: The ${product} Protocol.` }, "Identity Shift"));
            outputs.push(create("headline", { head: `I Deconstructed Fortune 500 CEOs. Here is the System They Use.` }, "Insider Secret"));
            outputs.push(create("headline", { head: `Why Businesses Are Rejecting Traditional Education for ${product}.` }, "Market Shift"));
         } else if (t.match(/fit|weight|health/)) {
            outputs.push(create("headline", { head: `Your Trainer is Lying to You: Why ${product} ${grammar.verb_work} Better.` }, "Contrarian"));
            outputs.push(create("headline", { head: `How to Sculpt Your Dream Physique Without Giving Up Carbs.` }, "Benefit"));
         } else {
            outputs.push(create("headline", { head: `The Strategic Framework for Excellence: Why ${product} ${grammar.verb_work}.` }, "Logic"));
            outputs.push(create("headline", { head: `How to Get Elite Results Without The Usual Stress (Using ${product}).` }, "Simplicity"));
            outputs.push(create("headline", { head: `Why 99% of ${who} Fail (And How ${product} ${grammar.verb_fix} It).` }, "Statistic"));
         }
      } 
      else if (tool === "email") {
         outputs.push(create("email", { 
            subject: `The truth about your results...`,
            body: `Hi,\n\nMost ${who} think if they just work harder, they will succeed.\n\nBut the system is rigged. That is why I built ${product}.\n\n${grammar.verb_is} it a magic pill? No. But it is a weapon designed to destroy stagnation.\n\nSee the proof here: [Link]`
         }, "Hard Truth"));
         
         outputs.push(create("email", { 
            subject: `You are overcomplicating it.`,
            body: `Hi,\n\nReal power comes from simplicity.\n\nI built ${product} to cut through the noise.\n\nIt is the exact framework needed to win.\n\nStop guessing. Start winning.\n\n[Link: Get Access]`
         }, "Simplicity Hook"));
      } 
      else {
         outputs.push(create("ad", { 
            head: ` STOP SCROLLING.`,
            body: `You are chasing success the wrong way.\n\nThe new way? ${product}.\n\nIt is the shortcut used by the top 1% of ${who}.\n\n Click to steal their strategy!`
         }, "Pattern Interrupt"));
      }

      setResults(outputs); // This will auto-save via useEffect
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

  const RenderCard = ({ item }: { item: ResultItem }) => {
    const isSaved = saved.some(s => s.id === item.id);
    const fullText = item.type === "email" ? `Subject: ${item.content.subject}\n\n${item.content.body}` : `${item.content.head}\n${item.content.body || ""}`;

    return (
      <div className="group bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 relative mb-4">
        <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
           <span className="px-2 py-1 bg-slate-100 rounded-md text-[9px] font-black uppercase tracking-wider text-slate-500">{item.tag}</span>
           <div className="flex gap-2">
              <button onClick={() => toggleSave(item)} className={`text-lg transition-transform active:scale-90 ${isSaved ? "grayscale-0" : "grayscale opacity-30 hover:opacity-100"}`}></button>
              <button onClick={() => handleCopy(fullText, item.id)} className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${copiedIndex === item.id ? "bg-green-100 text-green-700 border-green-200" : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"}`}>
                 {copiedIndex === item.id ? "Copied" : "Copy"}
              </button>
           </div>
        </div>
        {item.type === "headline" && <div contentEditable suppressContentEditableWarning className="text-2xl font-black text-slate-900 leading-tight outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 rounded p-1">{item.content.head}</div>}
        {item.type === "email" && <div className="space-y-3"><div className="flex gap-2 items-center"><span className="text-xs font-bold text-slate-400 w-12">Subject:</span><div contentEditable suppressContentEditableWarning className="flex-1 font-bold text-slate-900 outline-none border-b border-transparent focus:border-blue-200">{item.content.subject}</div></div><div contentEditable suppressContentEditableWarning className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed outline-none focus:bg-white p-2 rounded focus:ring-2 focus:ring-blue-100">{item.content.body}</div></div>}
        {item.type === "ad" && <div className="space-y-2"><div contentEditable suppressContentEditableWarning className="font-bold text-slate-900 bg-yellow-50 p-2 rounded-lg text-sm inline-block">{item.content.head}</div><div contentEditable suppressContentEditableWarning className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed px-1">{item.content.body}</div></div>}
      </div>
    );
  };

  const currentTool = TOOLS.find(t => t.id === tool);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <PageHeader title="AI Studio" subtitle="Format-specific copywriting engine." />
          <div className="bg-slate-100 p-1 rounded-xl flex shadow-inner">
             <button onClick={() => setActiveTab("generator")} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "generator" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Generator</button>
             <button onClick={() => setActiveTab("library")} className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "library" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Library ({saved.length})</button>
          </div>
       </div>
       
       {activeTab === "generator" ? (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 pb-4">
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
            
            <div className="lg:col-span-9 flex flex-col gap-6 h-full">
               <div className="bg-white p-1 rounded-[24px] border border-slate-200 shadow-sm flex flex-col md:flex-row">
                  <div className="flex-1 p-3">
                     <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1 block">Product Name</label>
                     <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. Leadership Masterclass" className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                  </div>
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
               
               <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto relative">
                  {results.length === 0 && !loading && (
                     <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm">{currentTool?.icon}</div>
                        <h3 className="text-lg font-black text-slate-900">Ready to Write {currentTool?.label}</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 mb-6 font-medium">{currentTool?.hint}</p>
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
                        <div className="grid gap-2">
                          {results.map((res) => <RenderCard key={res.id} item={res} />)}
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
       ) : (
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex-1 overflow-y-auto">
            {saved.length === 0 ? <div className="flex flex-col items-center justify-center h-full opacity-50"><span className="text-4xl mb-2"></span><p className="font-bold text-slate-400">Library Empty</p></div> : <div className="grid grid-cols-1 gap-4">{saved.map(res => <RenderCard key={res.id} item={res} />)}</div>}
         </div>
       )}
    </div>
  );
}