import DashboardNav from "@/components/DashboardNav";
export default function CopywritingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <DashboardNav title="AI Copywriting Studio" subtitle="Generate high-converting sales copy instantly." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Sidebar */}
           <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-4">Select Tool</h3>
                 <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm"> Headline Generator</button>
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors"> Email Sequence</button>
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium text-sm transition-colors"> Ad Copy</button>
                 </div>
              </div>
           </div>

           {/* Main Work Area */}
           <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/50 min-h-[500px] flex flex-col justify-center items-center text-center">
                 <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-xl shadow-indigo-200 mb-6">
                    
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">Ready to Write</h3>
                 <p className="text-slate-500 max-w-md mx-auto mb-8">Select a tool from the left to generate psychological triggers for your products.</p>
                 <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Start Generating</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}