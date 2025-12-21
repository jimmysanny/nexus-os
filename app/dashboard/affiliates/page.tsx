export default function AffiliatesPage() {
  return (
    <div className="space-y-8">
       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[32px] p-10 text-white shadow-xl shadow-purple-200">
          <h1 className="text-3xl font-black mb-2">Affiliate Network</h1>
          <p className="text-purple-100 max-w-xl">Empower others to sell your digital products for a commission. Track performance and payouts automatically.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4">Invite Promoters</h3>
             <p className="text-sm text-slate-500 mb-6">Share this link to let users sign up as affiliates for your store.</p>
             <div className="flex gap-2">
                <input disabled value="https://nexus.os/affiliate/join/YOUR_ID" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-500" />
                <button className="bg-slate-900 text-white px-6 rounded-xl font-bold text-sm">Copy</button>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm opacity-50">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Top Performers</h3>
                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold">COMING SOON</span>
             </div>
             <div className="space-y-4">
                {[1,2,3].map((i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                      <div className="h-2 w-24 bg-slate-100 rounded"></div>
                      <div className="ml-auto h-2 w-12 bg-slate-100 rounded"></div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}