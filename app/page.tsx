import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Zap } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const { userId } = auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="font-bold text-xl tracking-tight">Nexus OS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-bold text-slate-600 hover:text-slate-900">Sign In</Link>
            <Link href="/sign-up" className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 animate-fade-in-up">
            <span></span> <span>The Operating System for African Creators</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Turn your knowledge <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">into income.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Sell courses, templates, and digital tools in minutes. Accept payments from Nigeria, Kenya, Ghana, and South Africa instantly.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/sign-up" className="h-14 px-8 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-200 w-full md:w-auto justify-center">
              <span>Start Selling Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/sign-in" className="h-14 px-8 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg flex items-center gap-2 hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
              View Demo
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-slate-400 grayscale opacity-60">
             <span className="font-bold text-xs flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> Secured by Paystack</span>
             <span className="font-bold text-xs flex items-center gap-1"><Globe className="w-4 h-4"/> Global Payouts</span>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Copy Studio</h3>
              <p className="text-slate-500 leading-relaxed">Writer's block is dead. Generate high-converting sales pages, emails, and ads that sound exactly like you.</p>
            </div>
            {/* CARD 2 */}
            <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Wallet</h3>
              <p className="text-slate-500 leading-relaxed">Accept M-PESA, Card, and Bank Transfers. Withdraw your earnings directly to your local bank account.</p>
            </div>
            {/* CARD 3 */}
            <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Funnels</h3>
              <p className="text-slate-500 leading-relaxed">Host your products on beautiful, high-speed pages. No coding required. Just upload and sell.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium"> 2025 Nexus OS. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}