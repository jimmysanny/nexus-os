import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe, Lock, Rocket, Zap, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020817]">
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-[#020817]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20"><span className="text-white font-bold">N</span></div>
          <span className="text-xl font-bold text-white tracking-tight">Nexus OS</span>
        </div>
        <div className="flex items-center gap-6">
          {/* NEW: Marketplace Link */}
          <Link href="/marketplace" className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
            <ShoppingBag className="h-4 w-4" /> Marketplace
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in"><Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 font-medium">Log in</Button></Link>
            <Link href="/sign-up"><Button className="bg-white text-black hover:bg-slate-200 font-bold shadow-lg transition-all hover:scale-105">Start for Free</Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">
               <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>
               Accepting Early Access Creators
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">The Operating System for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">African Digital Creators.</span></h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">Build high-converting funnels, sell digital products, and accept local payments instantly. <span className="text-slate-300 font-medium">No coding. No headaches. Just sales.</span></p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
              <Link href="/sign-up"><Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full sm:w-auto shadow-xl shadow-indigo-500/20">Build Your Store <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
              <Link href="/preview/demo"><Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto">View Demo Store</Button></Link>
            </div>
          </div>
          <div className="w-full max-w-5xl mx-auto border-t border-slate-800/50 pt-10">
            <p className="text-sm text-slate-500 mb-6 uppercase tracking-widest font-semibold">Seamless local payments via</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
               <div className="flex items-center gap-2"><Smartphone className="h-5 w-5" /><span className="text-xl font-bold text-slate-300">M-PESA</span></div>
               <div className="flex items-center gap-2"><Smartphone className="h-5 w-5" /><span className="text-xl font-bold text-slate-300">MTN MoMo</span></div>
               <div className="flex items-center gap-2"><Globe className="h-5 w-5" /><span className="text-xl font-bold text-slate-300">Card</span></div>
               <div className="flex items-center gap-2 border-l border-slate-700 pl-8"><Lock className="h-4 w-4" /><span className="text-sm font-medium">Secured by Paystack</span></div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-gradient-to-b from-[#020817] to-[#0B0F1A]">
           <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">You create content. <br /><span className="text-indigo-400">We handle the tech.</span></h2>
                   <p className="text-lg text-slate-400 mb-8 leading-relaxed">Forget about stitching together 5 different tools. Nexus OS gives you a unified dashboard to manage your products, customers, and revenue.</p>
                   <div className="space-y-6">
                      <div className="flex items-start gap-4"><div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mt-1"><Rocket className="h-5 w-5 text-indigo-400" /></div><div><h3 className="text-lg font-semibold text-white">Upload Once, Sell Everywhere</h3><p className="text-slate-400 text-sm">Your digital products are hosted securely and delivered instantly.</p></div></div>
                      <div className="flex items-start gap-4"><div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mt-1"><Zap className="h-5 w-5 text-green-400" /></div><div><h3 className="text-lg font-semibold text-white">Instant Local Settlement</h3><p className="text-slate-400 text-sm">We settle funds directly to your local bank or mobile money account.</p></div></div>
                   </div>
                </div>
                <div className="relative">
                   <div className="rounded-xl bg-[#0F172A] border border-slate-800 p-6 shadow-2xl rotate-1 transition-all duration-500 hover:rotate-0">
                      <div className="flex items-center justify-between mb-8"><div className="space-y-1"><div className="h-2 w-20 bg-slate-700 rounded"></div><div className="h-4 w-32 bg-white/20 rounded"></div></div><div className="h-8 w-8 rounded-full bg-indigo-600"></div></div>
                      <div className="space-y-3">
                         {[1,2,3].map((i) => (<div key={i} className="h-12 w-full bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center px-4 justify-between"><div className="h-2 w-24 bg-slate-600 rounded"></div><div className="h-4 w-12 bg-green-400/20 rounded"></div></div>))}
                      </div>
                   </div>
                </div>
             </div>
           </div>
        </section>
      </main>
      <footer className="py-8 border-t border-slate-800 bg-[#020817] text-center text-slate-500 text-sm"><p>&copy; {new Date().getFullYear()} Nexus OS. The Creator Operating System.</p></footer>
    </div>
  );
}