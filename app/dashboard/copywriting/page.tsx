"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

// --- CONFIGURATION ---
const TONES = [
  { id: "viral", label: " Viral", desc: "Short, punchy, high-energy hooks." },
  { id: "professional", label: " Professional", desc: "Trustworthy, clear, B2B focused." },
  { id: "urgent", label: " Urgent", desc: "Scarcity-driven, sales-heavy." },
  { id: "story", label: " Storyteller", desc: "Engaging, narrative, emotional." },
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

  // --- THE BUSINESS LOGIC ENGINE ---
  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    setTimeout(() => {
      const product = input.trim();
      const who = audience.trim() || "you"; // Default to "you" if empty
      let outputs: string[] = [];

      // HELPER: Capitalize for headlines
      const titleCase = (str: string) => str.replace(/\b\w/g, s => s.toUpperCase());

      // --- 1. HEADLINE ALGORITHMS ---
      if (tool === "headline") {
        if (tone === "urgent") {
          outputs = [
            ` FINAL CALL: Get ${titleCase(product)} Before The Price Increases`,
            `Stop Wasting Time: The ${titleCase(product)} Shortcut You Need NOW`,
            `Why ${who} Are Rushing to Buy ${titleCase(product)} (Limited Access)`,
            `Do Not Buy Another Asset Until You Read This Guide on ${titleCase(product)}`,
            `URGENT: 3 Reasons You Are Failing at Your Goals (And How ${titleCase(product)} Fixes It)`
          ];
        } else if (tone === "professional") {
          outputs = [
            `The Strategic Guide to ${titleCase(product)} for Serious Professionals`,
            `Optimize Your Workflow: Introducing ${titleCase(product)}`,
            `How ${titleCase(product)} Is Redefining Standards for ${titleCase(who)}`,
            `A Comprehensive Analysis: Why ${titleCase(product)} Drives ROI`,
            `Mastering ${titleCase(product)}: The Executive Handbook`
          ];
        } else { // Viral/Story
          outputs = [
            `I Tried ${titleCase(product)} for 30 Days... Here is What Happened`,
            `The "Lazy" Way to Master ${titleCase(product)} (That Actually Works)`,
            `Why 99% of ${titleCase(who)} Fail (And How ${titleCase(product)} Saves Them)`,
            `How to Get Elite Results with ${titleCase(product)} Without the Stress`,
            `The ${titleCase(product)} Secret That Industry Gurus Are Hiding`
          ];
        }
      }

      // --- 2. EMAIL SEQUENCES (AIDA & PAS Frameworks) ---
      else if (tool === "email") {
        if (tone === "story") {
           outputs = [
             `Subject: I have a confession to make...\n\nHi there,\n\nIdeally, I wouldn't admit this.\n\nBut a few months ago, I was completely stuck. I tried everything to solve my problem, but nothing worked.\n\nThen I discovered ${product}.\n\nIt wasn't an overnight miracle, but it changed everything for me. I realized that the old way of doing things was broken.\n\nI documented exactly how I used it to get results in this new guide.\n\n[Link: Get the full story here]`,
             
             `Subject: The day everything changed for ${who}\n\nHey,\n\nImagine waking up tomorrow and realized your biggest headache was gone.\n\nFor most ${who}, that sounds like a fantasy.\n\nBut with ${product}, it is becoming a reality. We stripped away the complexity and focused on what actually works.\n\nAre you ready to write a new chapter?\n\n[Link: Start your journey]`
           ];
        } else if (tone === "urgent") {
           outputs = [
             `Subject:  24 Hours Left (Don't miss out)\n\nHi,\n\nI don't want to be the bearer of bad news, but time is running out.\n\nWe are closing access to the special offer for ${product} very soon.\n\nIf you want to transform your results and finally stop struggling, you need to act now.\n\nClick the link below to secure your copy before the price goes up.\n\n[Link: Secure Your Access Now]`,
             
             `Subject: LAST CHANCE: Is this goodbye?\n\nHi,\n\nThis is your final reminder.\n\nThe opportunity to get ${product} at this level is disappearing.\n\nDon't let this chance slip through your fingers. Join the hundreds of ${who} who are already winning.\n\n[Link: Get Instant Access]`
           ];
        } else { // Professional
           outputs = [
             `Subject: A more efficient way to handle your workflow\n\nHello,\n\nAs a professional, you know that time is your most valuable asset.\n\nThat is why we developed ${product}. It is designed specifically to help ${who} streamline operations and maximize output.\n\nNo fluff. No wasted steps. Just a proven system.\n\nExplore the details here:\n[Link: View Product Specification]`,
             
             `Subject: Invitation: Upgrade your toolkit\n\nHi,\n\nWe have identified a key bottleneck for most ${who}: efficiency.\n\n${titleCase(product)} solves this by automating the heavy lifting, allowing you to focus on strategy.\n\nIt is time to work smarter, not harder.\n\n[Link: See how it works]`
           ];
        }
      }

      // --- 3. AD COPY (Hooks & Value Props) ---
      else {
         // Defaulting to Ad/Description logic
         if (tone === "viral") {
            outputs = [
              ` STOP SCROLLING!\n\nIf you are a ${who} who wants to win, you need to see this.\n\n${product} is the unfair advantage you have been looking for. \n\n Save Time\n Save Money\n Get Results\n\nClick below to steal our secret strategy! `,
              
              `They laughed when I said I used ${product}...\n\nBut when they saw my results? Silence.\n\nDon't let the competition beat you. Grab ${product} and start dominating today.\n\n Link in bio!`
            ];
         } else {
            outputs = [
              `ATTENTION ${who.toUpperCase()}:\n\nAre you tired of the old way of doing things? It is time for an upgrade.\n\nIntroducing ${product}the premium solution for serious results.\n\nJoin thousands of happy customers who have switched. 100% Satisfaction Guaranteed.`,
              
              `Unlock your full potential with ${product}.\n\nDesigned for ${who}, built for speed, and proven to convert.\n\nStop guessing and start winning.\n\nShop now  [Link]`
            ];
         }
      }

      setResults(outputs);
      setHistory(prev => [product, ...prev].slice(0, 5));
      setLoading(false);
    }, 1000);
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
          
          {/* --- LEFT SIDEBAR: CONTROLS --- */}
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
   
          {/* --- RIGHT AREA: WORKSPACE --- */}
          <div className="lg:col-span-9 flex flex-col gap-6 h-full">
             
             {/* INPUT SECTION */}
             <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product / Topic</label>
                   <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="e.g. A Masterclass on Photography..." 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-bold focus:bg-white transition-all"
                     onKeyDown={(e) => e.key === "Enter" && generate()}
                   />
                </div>
                <div className="flex-1 w-full space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Audience</label>
                   <input 
                     value={audience}
                     onChange={(e) => setAudience(e.target.value)}
                     placeholder="e.g. Beginners, Small Business Owners..." 
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium focus:bg-white transition-all"
                   />
                </div>
                <button 
                  onClick={generate}
                  disabled={!input || loading}
                  className="h-[46px] bg-blue-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 whitespace-nowrap flex items-center gap-2"
                >
                  {loading ? (
                    <>
                       <span className="animate-spin text-lg"></span> Processing...
                    </>
                  ) : (
                    <>
                       <span></span> Generate
                    </>
                  )}
                </button>
             </div>

             {/* OUTPUT SECTION */}
             <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                {results.length === 0 && !loading && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4"></div>
                      <h3 className="text-lg font-bold text-slate-900">Ready to Write</h3>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Enter your product details above and let our engine draft your copy.</p>
                   </div>
                )}

                {loading && (
                   <div className="space-y-6 animate-pulse">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-24 bg-slate-50 rounded-2xl border border-slate-100"></div>
                      ))}
                   </div>
                )}

                {results.length > 0 && !loading && (
                   <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                         <h3 className="font-bold text-slate-900 flex items-center gap-2">
                           <span></span> Generated Options
                         </h3>
                         <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                           {TONES.find(t => t.id === tone)?.label}
                         </span>
                      </div>
                      <div className="grid gap-4">
                        {results.map((res, i) => (
                           <div key={i} className="group relative p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50/50 transition-all duration-300">
                              <pre className="text-slate-800 font-medium whitespace-pre-wrap leading-relaxed font-sans">{res}</pre>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                   onClick={() => handleCopy(res, i)}
                                   className={`text-xs font-bold px-4 py-2 rounded-full shadow-sm border transition-all flex items-center gap-2 ${
                                     copiedIndex === i 
                                     ? "bg-green-500 text-white border-green-500" 
                                     : "bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:border-blue-500"
                                   }`}
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