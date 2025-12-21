export default function CopywritingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[80vh]">
       {/* Sidebar Tools */}
       <div className="lg:col-span-1 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Generators</p>
          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm"> Viral Headlines</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors"> Email Sequence</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors"> Product Description</button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors"> Ad Captions</button>
       </div>

       {/* Editor Area */}
       <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Headline Generator</h2>
          <p className="text-slate-500 mb-8">Create punchy, high-converting headlines for your funnels.</p>
          
          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
             <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl mb-4"></div>
             <h3 className="font-bold text-slate-900 mb-2">AI Agent Ready</h3>
             <p className="text-sm text-slate-500 max-w-sm mb-6">Describe your product below and our fine-tuned model will generate 5 variations.</p>
             <div className="flex gap-2 w-full max-w-md">
                <input placeholder="e.g., A fitness guide for busy dads..." className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-500" />
                <button className="bg-slate-900 text-white px-6 rounded-xl font-bold text-sm">Generate</button>
             </div>
          </div>
       </div>
    </div>
  );
}