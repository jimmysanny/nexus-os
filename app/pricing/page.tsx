import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, HelpCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white font-sans">
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-[#020817]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">N</span></div>
              <span className="text-xl font-bold text-white tracking-tight">Nexus OS</span>
           </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/marketplace" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Marketplace</Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in"><Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 font-medium">Log in</Button></Link>
            <Link href="/sign-up"><Button className="bg-white text-black hover:bg-slate-200 font-bold shadow-lg transition-all hover:scale-105">Start for Free</Button></Link>
          </div>
        </div>
      </header>

      <main className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400">We only make money when you make money.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* FREE TIER */}
          <div className="bg-[#0B0F1A] border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col relative overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h2 className="text-2xl font-bold text-white mb-2">Starter</h2>
            <div className="flex items-end gap-1 mb-6">
               <span className="text-4xl font-bold text-white">KES 0</span>
               <span className="text-slate-500 mb-1">/month</span>
            </div>
            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-8">Perfect for launching your first digital product or course.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span>Unlimited Products</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span>5% Transaction Fee</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span>M-Pesa & Card Payments</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span>Hosted Product Pages</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span>1GB Storage Included</span></li>
            </ul>

            <Link href="/sign-up">
              <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 shadow-lg shadow-indigo-500/20">Start Selling for Free</Button>
            </Link>
          </div>

          {/* PRO TIER */}
          <div className="bg-[#020817] border border-slate-800 rounded-2xl p-8 shadow-lg flex flex-col opacity-75 hover:opacity-100 transition-opacity">
            <h2 className="text-2xl font-bold text-white mb-2">Pro Creator</h2>
            <div className="flex items-end gap-1 mb-6">
               <span className="text-4xl font-bold text-white">KES 2,900</span>
               <span className="text-slate-500 mb-1">/month</span>
            </div>
            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-8">For established creators scaling their empire.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-indigo-500 shrink-0" /> <span>0% Transaction Fees</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-indigo-500 shrink-0" /> <span>Custom Domains</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-indigo-500 shrink-0" /> <span>Priority Support</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-indigo-500 shrink-0" /> <span>100GB Storage</span></li>
              <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="h-5 w-5 text-indigo-500 shrink-0" /> <span>Advanced Analytics</span></li>
            </ul>

            <Button disabled size="lg" variant="outline" className="w-full border-slate-700 text-slate-400 font-bold h-12">Coming Soon</Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20 text-center border-t border-slate-800 pt-12">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2"><HelpCircle className="h-5 w-5 text-slate-400" /> Frequently Asked Questions</h3>
           <div className="text-left space-y-6 mt-8">
              <div className="p-4 rounded-lg bg-[#0B0F1A] border border-slate-800">
                <h4 className="font-semibold text-white">When do I get paid?</h4>
                <p className="text-slate-400 text-sm mt-1">We settle funds to your bank or mobile money account automatically every week. You can track your pending payouts in the dashboard.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0F1A] border border-slate-800">
                <h4 className="font-semibold text-white">Does the 5% fee include payment processing?</h4>
                <p className="text-slate-400 text-sm mt-1">No, standard payment processing fees (Paystack) still apply. The 5% is the platform fee for using Nexus OS to host and deliver your products.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0F1A] border border-slate-800">
                <h4 className="font-semibold text-white">Can I upgrade to Pro later?</h4>
                <p className="text-slate-400 text-sm mt-1">Absolutely. Once the Pro plan launches, you will be able to upgrade your account instantly to enjoy 0% transaction fees.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0F1A] border border-slate-800">
                <h4 className="font-semibold text-white">Is there a contract?</h4>
                <p className="text-slate-400 text-sm mt-1">No. Nexus OS is month-to-month. You can cancel or switch plans at any time.</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}