import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
           <span className="font-bold tracking-tight text-xl">Nexus OS</span>
        </div>
        
        <div className="flex items-center gap-6">
           <Link href="/market" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Browse Marketplace
           </Link>
           {user ? (
             <Link href="/dashboard" className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
                Go to Dashboard
             </Link>
           ) : (
             <div className="flex items-center gap-4">
               <Link href="/sign-in" className="text-sm font-bold text-white">Login</Link>
               <Link href="/sign-up" className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                  Start Selling
               </Link>
             </div>
           )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center pt-32 px-6 pb-20">
        <div className="inline-block px-4 py-1 rounded-full border border-blue-900 bg-blue-900/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8">
           The Future of Digital Commerce
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">digital empire</span><br />
          in minutes.
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Nexus OS empowers you to build high-converting sales funnels, accept 
          <span className="text-white font-bold"> Mobile Money & Cards</span>, and manage customers all in one unified platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">
              Start Building Free 
           </Link>
           <Link href="/market" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all">
               Shop Assets
           </Link>
        </div>
        
        <p className="mt-6 text-xs font-bold text-slate-600 uppercase tracking-widest">
            No credit card required
        </p>
      </div>
    </div>
  );
}