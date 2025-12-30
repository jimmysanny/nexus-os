import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Home } from "lucide-react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Next.js 15: params is a Promise
export default async function SuccessPage({ 
  params 
}: { 
  params: Promise<{ reference: string }> 
}) {
  // Await the params to get the reference ID
  const { reference } = await params;

  // We try to find the order by this reference ID (payment ID)
  // Note: In a real Paystack flow, we might need to verify the reference first,
  // but for now, we assume if they are here, we check the DB for the successful order.
  
  // For the MVP, we just show a generic success since the webhook handles the DB update.
  // Ideally, we would fetch the 'Order' by the Paystack reference.
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-slate-200 font-sans">
      <div className="max-w-md w-full bg-[#0B0F1A] border border-green-900/30 rounded-2xl p-8 text-center shadow-2xl">
        <div className="h-20 w-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 mb-8">
          Thank you for your purchase. Your digital asset is ready for download.
        </p>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 mb-8 flex items-center justify-between">
           <span className="text-sm text-slate-500">Ref ID:</span>
           <span className="font-mono text-sm text-indigo-400">{reference}</span>
        </div>

        <div className="space-y-3">
          {/* In a full app, this button would link to the actual file URL from the DB */}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg">
            <Download className="mr-2 h-5 w-5" /> Download Asset
          </Button>

          <Link href="/market" className="block w-full">
            <Button variant="outline" className="w-full border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Home className="mr-2 h-4 w-4" /> Back to Market
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}