import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> v1.0 Live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
          Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Digital Empire</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Nexus OS is the complete platform for African creators and consultants. Build funnels, collect payments, and host courses in minutes.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
            <Link href="/signup" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-4 rounded-full transition flex items-center gap-2">
                Start Free Trial <ArrowRight size={20}/>
            </Link>
            <Link href="/demo" className="border border-gray-700 hover:bg-gray-900 text-white font-bold text-lg px-8 py-4 rounded-full transition">
                View Live Demo
            </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <Globe className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Custom Website</h3>
            <p className="text-gray-400">Get your own professional link (e.g., jane.nexus-os.com) instantly.</p>
        </div>
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <ShieldCheck className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-400">Accept M-Pesa and Cards globally via our integrated Paystack gateway.</p>
        </div>
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <CheckCircle2 className="text-purple-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Course Portal</h3>
            <p className="text-gray-400">Upload your masterclass and let the system handle access automatically.</p>
        </div>
      </div>
    </div>
  );
}