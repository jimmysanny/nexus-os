import PageHeader from "@/components/PageHeader";

export default function HelpPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader title="Help & Support" subtitle="Documentation and assistance for your store." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* FAQ Card */}
         <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Quick Guide</h3>
            <div className="space-y-4">
               <details className="group">
                  <summary className="font-bold text-sm text-slate-700 cursor-pointer list-none flex justify-between">
                     How do I get paid? <span>+</span>
                  </summary>
                  <p className="text-sm text-slate-500 mt-2 pl-2 border-l-2 border-blue-100">
                     Connect your Paystack account in the Wallet tab. Payouts are processed automatically every Monday.
                  </p>
               </details>
               <details className="group">
                  <summary className="font-bold text-sm text-slate-700 cursor-pointer list-none flex justify-between">
                     Can I customize my store? <span>+</span>
                  </summary>
                  <p className="text-sm text-slate-500 mt-2 pl-2 border-l-2 border-blue-100">
                     Yes! Go to "Brand Studio" to upload your logo and banner. Use the "Theme Picker" inside a product to change colors.
                  </p>
               </details>
            </div>
         </div>

         {/* Support Contact */}
         <div className="bg-blue-600 text-white p-8 rounded-[32px] shadow-xl shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Need Priority Support?</h3>
            <p className="text-blue-100 text-sm mb-6">Our team is available 24/7 for Pro merchants.</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm w-full hover:bg-blue-50 transition-colors">
               Contact Support
            </button>
         </div>
      </div>
    </div>
  );
}