import Link from "next/link";
import { ArrowRight, CheckCircle, CreditCard, BarChart3, Globe, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="border-b border-white/10 backdrop-blur-md fixed top-0 w-full z-50 bg-black/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            Nexus OS
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm text-gray-400 hover:text-white transition">
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-800">
          The Future of Digital Commerce
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Build your digital empire <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
            in minutes, not months.
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nexus OS empowers you to build high-converting sales funnels, accept 
          <span className="text-white font-medium"> Visa, Mastercard, M-Pesa, & Mobile Money</span>, 
          and manage customers all in one unified platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link 
            href="/dashboard/funnels" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:scale-105 transform duration-200"
          >
            Start Building Free <ArrowRight size={20} />
          </Link>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ShieldCheck size={16} className="text-green-500"/>
            <span>No credit card required</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURES GRID */}
      <section className="py-24 bg-gray-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-blue-500/50 transition group hover:bg-gray-900/50">
              <div className="w-14 h-14 bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Drag & Drop Builder</h3>
              <p className="text-gray-400 leading-relaxed">Create stunning landing pages without writing code. Use our pre-built templates to launch professional sites in seconds.</p>
            </div>

            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-green-500/50 transition group hover:bg-gray-900/50">
              <div className="w-14 h-14 bg-green-900/20 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Universal Payments</h3>
              <p className="text-gray-400 leading-relaxed">Accept payments globally. Whether your customers use Visa, Mastercard, M-Pesa, or local Mobile Money wallets, we handle it all.</p>
            </div>

            <div className="p-8 rounded-3xl bg-black border border-white/10 hover:border-purple-500/50 transition group hover:bg-gray-900/50">
              <div className="w-14 h-14 bg-purple-900/20 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Real-time Analytics</h3>
              <p className="text-gray-400 leading-relaxed">Track every click and sale. Understand your traffic sources and optimize your conversion rates with built-in data tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2025 Nexus Frontier. Empowering African Commerce.</p>
      </footer>
    </div>
  );
}
