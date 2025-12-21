"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

export default function CopywritingPage() {
  const [tool, setTool] = useState("headline"); // headline, email, ad, product
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // THE LOCAL "BRAIN" (High-Converting Formulas)
  const generate = () => {
    if (!input) return;
    setLoading(true);
    setResults([]);

    // Simulate AI thinking time
    setTimeout(() => {
      let outputs: string[] = [];
      const product = input.trim();

      if (tool === "headline") {
        outputs = [
          `How to Get ${product} Without Even Trying`,
          `The ${product} Secret That Experts Don't Want You To Know`,
          `Stop Wasting Time: Here is the Ultimate ${product} Solution`,
          `10 Ways ${product} Will Change Your Life Forever`,
          `WARNING: Do Not Buy Another Asset Until You Try ${product}`
        ];
      } else if (tool === "email") {
        outputs = [
          `Subject: You need to see this...\n\nHi there,\n\nI just found the ultimate solution for your problems: ${product}.\n\nIt is unlike anything else on the market. Check it out here...`,
          `Subject: Quick question\n\nAre you still struggling with your goals? I created ${product} specifically for people like you.\n\nClick here to get instant access.`
        ];
      } else if (tool === "ad") {
        outputs = [
          ` STOP SCROLLING! \n\nIf you want to master your niche, you need ${product}. It is the fast-track to success.\n\n Get it now before the price goes up!`,
          `They said it was impossible... until I built ${product}. Now you can get the same results in half the time. Link in bio! 🚀`
        ];
      } else {
        outputs = [
          `${product} is the premier solution for forward-thinking creators. Designed to save you time and maximize revenue, this asset is your key to the next level.`,
          `Unlock your full potential with ${product}. Comprehensive, easy-to-use, and built for results.`
        ];
      }

      setResults(outputs);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 h-[calc(100vh-100px)]">
       <PageHeader title="AI Copywriting" subtitle="Generate high-converting sales copy instantly" />
       
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full pb-8">
          {/* Sidebar Tools */}
          <div className="lg:col-span-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-2 h-fit">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Select Tool</p>
             <button onClick={() => { setTool("headline"); setResults([]); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === "headline" ? "bg-slate-900 text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"}`}> Viral Headlines</button>
             <button onClick={() => { setTool("email"); setResults([]); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === "email" ? "bg-slate-900 text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"}`}> Email Sequence</button>
             <button onClick={() => { setTool("ad"); setResults([]); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === "ad" ? "bg-slate-900 text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"}`}> Ad Captions</button>
             <button onClick={() => { setTool("product"); setResults([]); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${tool === "product" ? "bg-slate-900 text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"}`}> Descriptions</button>
          </div>
   
          {/* Main Work Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
             {/* Input Section */}
             <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">What are you selling?</label>
                <div className="flex gap-2">
                   <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="e.g., A fitness guide for busy dads..." 
                     className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 font-medium" 
                     onKeyDown={(e) => e.key === "Enter" && generate()}
                   />
                   <button 
                     onClick={generate}
                     disabled={!input || loading}
                     className="bg-blue-600 text-white px-8 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
                   >
                     {loading ? "Thinking..." : "Generate"}
                   </button>
                </div>
             </div>

             {/* Results Area */}
             <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 overflow-y-auto">
                {results.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <div className="text-6xl mb-4"></div>
                      <p className="font-bold">AI Agent Standby</p>
                      <p className="text-sm">Select a tool and enter a topic to start.</p>
                   </div>
                ) : (
                   <div className="space-y-4">
                      <h3 className="font-bold text-slate-900 mb-4">Generated Results:</h3>
                      {results.map((res, i) => (
                         <div key={i} className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <p className="text-slate-700 font-medium whitespace-pre-wrap">{res}</p>
                            <button 
                               onClick={() => navigator.clipboard.writeText(res)}
                               className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-white text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-slate-200 hover:text-blue-600"
                            >
                               Copy
                            </button>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}