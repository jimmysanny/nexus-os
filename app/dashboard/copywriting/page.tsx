"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

// Modern Tones Configuration
const TONES = [
  { id: "viral", label: " Viral", desc: "Short, punchy, high-energy" },
  { id: "professional", label: " Professional", desc: "Clean, corporate, trustworthy" },
  { id: "urgent", label: " Urgent", desc: "FOMO-inducing, sales-heavy" },
  { id: "empathetic", label: " Empathetic", desc: "Understanding, problem-focused" },
];

export default function CopywritingPage() {
  const [tool, setTool] = useState("headline"); 
  const [tone, setTone] = useState("viral");
  const [input, setInput] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    // SMART ENGINE: Adapts output based on Tone & Audience
    setTimeout(() => {
      let outputs: string[] = [];
      const product = input.trim();
      const who = audience.trim() || "you";

      // 1. HEADLINE LOGIC
      if (tool === "headline") {
        if (tone === "urgent") {
          outputs = [
            ` WARNING: ${product} Is Selling Out Fast!`,
            `Last Chance To Get ${product} Before The Price Doubles`,
            `Stop What You Are Doing and Check Out ${product} NOW`,
            `The Clock Is Ticking on The Ultimate ${product} Offer`,
            `Do Not Miss This: ${product} Ends Tonight`
          ];
        } else if (tone === "professional") {
           outputs = [
            `The Premier Solution for ${product} Management`,
            `Optimize Your Workflow with ${product}: A Case Study`,
            `Why Industry Leaders Are Switching to ${product}`,
            `Mastering ${product}: The Complete Professional Guide`,
            `Maximize ROI with our New ${product} Framework`
           ];
        } else { // Viral/Default
           outputs = [
            `How to Get ${product} Without Even Trying`,
            `The ${product} Secret That Experts Don't Want You To Know`,
            `I Tried ${product} For 7 Days and Here is What Happened`,
            `10 Ways ${product} Will Change Your Life Forever`,
            `Why Everyone is Talking About ${product}`
           ];
        }
      } 
      
      // 2. EMAIL LOGIC
      else if (tool === "email") {
        if (tone === "empathetic") {
           outputs = [
             `Subject: I know how hard it is...\n\nHi there,\n\nI know struggling with this problem feels overwhelming. I've been there too.\n\nThat is exactly why I built ${product}to help people like us find a way out.\n\nRead my story here...`,
             `Subject: You deserve better results\n\nIt is not your fault that things haven't worked out yet. The system is broken.\n\nBut ${product} is different. It was designed with ${who} in mind.`
           ];
        } else {
           outputs = [
             `Subject: You need to see this...\n\nHi,\n\nI just found the ultimate solution for ${who}: ${product}.\n\nIt is unlike anything else on the market. Check it out here...`,
             `Subject: Quick question for ${who}\n\nAre you still struggling with your goals? I created ${product} specifically for you.\n\nClick here to get instant access.`
           ];
        }
      } 
      
      // 3. AD LOGIC
      else {
         outputs = [
           ` ATTENTION ${who.toUpperCase()}! \n\nIf you want to master your niche, you need ${product}. It is the fast-track to success.\n\n Get it now!`,
           `They said it was impossible... until I built ${product}. Now ${who} can get the same results in half the time. Link in bio! `,
           `Stop scrolling. Start earning with ${product}. The #1 tool for ${who}.`
         ];
      }

      setResults(outputs);
      // Add to history (top 3 most recent)
      setHistory(prev => [product, ...prev].slice(0, 5));
      setLoading(false);
    }, 1200); // Slightly longer for "realistic" feel
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 h-[calc(100vh-140px)] flex flex-col">
       <PageHeader title="AI Copywriting Studio" subtitle="Generate high-converting sales copy instantly." />
       
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          
          {/* LEFT: SETTINGS (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-y-auto">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">1. Choose Asset</p>
             <div className="space-y-2 mb-8">
                {[
                  { id: "headline", label: " Headlines" },
                  { id: "email", label: " Emails" },
                  { id: "ad", label: " Ad Copy" },
                  { id: "product", label: " Descriptions" }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => { setTool(t.id); setResults([]); }} 
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === t.id ? "bg-slate-900 text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    {t.label}
                  </button>
                ))}
             </div>

             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">2. Select Tone</p>
             <div className="space-y-2 mb-8">
                {TONES.map((t) => (
                  <button 
                    key={t.id} 
                    onClick={() => setTone(t.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${tone === t.id ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-transparent hover:bg-slate-50 text-slate-500"}`}
                  >
                    <span className="block font-bold text-sm">{t.label}</span>
                    <span className="block text-[10px] opacity-70 font-medium">{t.desc}</span>
                  </button>
                ))}
             </div>

             {history.length > 0 && (
               <>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent</p>
                 <div className="space-y-2">
                    {history.map((h, i) => (
                      <div key={i} className="text-xs text-slate-500 truncate px-2 py-1 bg-slate-50 rounded-lg">
                          {h}
                      </div>
                    ))}
                 </div>
               </>
             )}
          </div>
   
          {/* CENTER: INPUT & RESULTS (9 Cols) */}
          <div className="lg:col-span-9 flex flex-col gap-6 h-full">
             
             {/* Input Bar */}
             <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What are you selling?</label>
                   <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="e.g. A course on urban gardening..." 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-bold"
                     onKeyDown={(e) => e.key === "Enter" && generate()}
                   />
                </div>
                <div className="flex-1 space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Audience (Optional)</label>
                   <input 
                     value={audience}
                     onChange={(e) => setAudience(e.target.value)}
                     placeholder="e.g. Busy Moms, CEOs..." 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium"
                   />
                </div>
                <div className="flex items-end">
                   <button 
                     onClick={generate}
                     disabled={!input || loading}
                     className="h-[46px] bg-blue-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 whitespace-nowrap"
                   >
                     {loading ? "Thinking..." : "Generate Copy"}
                   </button>
                </div>
             </div>

             {/* Output Area */}
             <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto relative">
                {loading ? (
                   <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                      <div className="h-24 bg-slate-100 rounded-2xl w-full"></div>
                      <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                   </div>
                ) : results.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                      <div className="text-8xl mb-4 grayscale"></div>
                      <h3 className="text-xl font-bold text-slate-900">AI Agent Ready</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mt-2">I have analyzed 10,000+ viral sales pages. Give me a product and I will write the copy.</p>
                   </div>
                ) : (
                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <h3 className="font-bold text-slate-900">Generated Results</h3>
                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                           {TONES.find(t => t.id === tone)?.label} Mode
                         </span>
                      </div>
                      <div className="grid gap-4">
                        {results.map((res, i) => (
                           <div key={i} className="group relative p-6 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                              <p className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">{res}</p>
                              <button 
                                 onClick={() => handleCopy(res, i)}
                                 className={`absolute top-4 right-4 text-xs font-bold px-4 py-2 rounded-full shadow-sm border transition-all ${
                                   copiedIndex === i 
                                   ? "bg-green-500 text-white border-green-500" 
                                   : "bg-white text-slate-500 border-slate-200 opacity-0 group-hover:opacity-100 hover:text-blue-600 hover:border-blue-200"
                                 }`}
                              >
                                 {copiedIndex === i ? "Copied!" : "Copy"}
                              </button>
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