import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Globe, ShieldCheck, Zap, CreditCard, Layout, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020817]">
      {/* NAVBAR */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-[#020817]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Nexus OS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
              Log in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
              Start Selling
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="w-full py-20 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <Badge variant="outline" className="mb-6 border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-4 py-1 text-sm uppercase tracking-wide">
            The Future of African Creator Money
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mb-6 leading-[1.1]">
            Stop losing money to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              stupid borders & bad payments.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            You drop that fire course, then spend weeks fighting PayPal restrictions. Not anymore. 
            Build funnels, sell to the whole continent, and get paid via <span className="text-white font-semibold">Mobile Money</span> instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-slate-200 font-bold w-full sm:w-auto">
                Start Selling Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/preview/demo">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-sm text-slate-500 flex items-center gap-6">
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> No Credit Card Required</span>
            <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Instant Setup</span>
          </div>
        </section>

        {/* PAYMENTS SECTION */}
        <section className="py-24 bg-[#0B0F1A] border-y border-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Payments That Actually Work <br />
                  <span className="text-indigo-400">Right Here.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <Zap className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Mobile Money First</h3>
                      <p className="text-slate-400 mt-2">Your customer in Lagos pays with MTN MoMo? Done. Nairobi uses M-Pesa? Instant. We cover the continent.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Direct Local Settlement</h3>
                      <p className="text-slate-400 mt-2">Zero excuses. Money hits your own local bank account. No weird holding periods or crazy conversion fees.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* VISUAL MAP REPRESENTATION */}
              <div className="relative h-[400px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://utfs.io/f/9e17300c-6625-4c03-b0c6-30d876d75c6d-1d.svg')] opacity-20 bg-center bg-no-repeat bg-contain"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                   <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl">
                      <p className="text-xs text-slate-500 uppercase">Received from Kenya</p>
                      <p className="text-lg font-mono text-green-400 font-bold">+ KES 4,500</p>
                   </div>
                   <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl translate-y-8">
                      <p className="text-xs text-slate-500 uppercase">Received from Nigeria</p>
                      <p className="text-lg font-mono text-green-400 font-bold">+ NGN 25,000</p>
                   </div>
                   <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl">
                      <p className="text-xs text-slate-500 uppercase">Received from Ghana</p>
                      <p className="text-lg font-mono text-green-400 font-bold">+ GHS 340</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Monetize Without Borders</h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">It's not just a website builder. It's the automated sales team you've been praying for.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B0F1A] border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group">
              <Layout className="h-10 w-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Instant Funnels</h3>
              <p className="text-slate-400">In minutesno code, no headachebuild your funnel. We host it, we secure it, you just sell.</p>
            </div>
            
            <div className="bg-[#0B0F1A] border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group">
              <Users className="h-10 w-10 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Get Discovered</h3>
              <p className="text-slate-400">Stop begging for traffic. List in the Nexus Marketplace and let thousands of African buyers find YOU.</p>
            </div>

            <div className="bg-[#0B0F1A] border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/50 transition-colors group">
              <ShieldCheck className="h-10 w-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">Upload Once, Cash Forever</h3>
              <p className="text-slate-400">No manual sending. No 'where is my file' DMs. We deliver your digital products securely and automatically.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-slate-800">
           <div className="max-w-4xl mx-auto px-6 text-center">
             <h2 className="text-4xl font-bold text-white mb-8">Ready to claim your piece of the digital economy?</h2>
             <Link href="/sign-up">
              <Button size="lg" className="h-16 px-10 text-xl bg-white text-black hover:bg-slate-200 font-bold shadow-2xl shadow-white/10">
                Join the Early Access
              </Button>
            </Link>
           </div>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-800 bg-[#020817] text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Nexus OS. Built for African Creators.</p>
      </footer>
    </div>
  );
}