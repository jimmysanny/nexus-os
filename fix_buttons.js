const fs = require('fs');

console.log("🚀 Wiring up Landing Page Buttons...");

const content = `"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, CreditCard, Layout } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-800 p-6 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
            <span className="font-bold text-xl tracking-tight">Nexus OS</span>
        </div>
        <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition">Log In</Link>
            <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">Get Started</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-medium text-blue-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                v1.0 Live
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Launch your <span className="text-blue-500">Digital Empire</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                Nexus OS is the complete platform for African creators and consultants. Build funnels, collect payments, and host courses in minutes.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition flex items-center gap-2">
                    Start Free Trial <ArrowRight size={20} />
                </Link>
                
                {/* THIS IS THE FIXED LINK LINKING TO /f/1 */}
                <Link href="/f/1" className="px-8 py-4 bg-gray-900 text-white border border-gray-800 font-bold text-lg rounded-full hover:bg-gray-800 transition">
                    View Live Demo
                </Link>
            </div>
        </div>
      </header>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-gray-950 border border-gray-900 rounded-2xl hover:border-blue-500/50 transition group">
                <Globe className="text-blue-500 mb-6 group-hover:scale-110 transition" size={40} />
                <h3 className="text-xl font-bold mb-3">Custom Website</h3>
                <p className="text-gray-500">Get your own professional link (e.g., nexus-os.vercel.app) instantly.</p>
            </div>
            <div className="p-8 bg-gray-950 border border-gray-900 rounded-2xl hover:border-green-500/50 transition group">
                <CreditCard className="text-green-500 mb-6 group-hover:scale-110 transition" size={40} />
                <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                <p className="text-gray-500">Accept M-Pesa and Cards globally via our integrated Paystack gateway.</p>
            </div>
            <div className="p-8 bg-gray-950 border border-gray-900 rounded-2xl hover:border-purple-500/50 transition group">
                <Layout className="text-purple-500 mb-6 group-hover:scale-110 transition" size={40} />
                <h3 className="text-xl font-bold mb-3">Course Portal</h3>
                <p className="text-gray-500">Upload your videos and let Nexus handle the hosting and access.</p>
            </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>&copy; 2025 Nexus OS. Built for Africa.</p>
      </footer>
    </div>
  );
}`;

fs.writeFileSync('app/page.tsx', content);
console.log("✅ Buttons Fixed! 'View Live Demo' now points to /f/1");