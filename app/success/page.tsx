import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full bg-[#0B0F1A] border border-green-500/20 rounded-2xl p-8 text-center space-y-6 shadow-2xl shadow-green-900/10">
        <div className="mx-auto h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
          <p className="text-slate-400">
            You're all set. We've sent the secure download link directly to your email inbox.
          </p>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 border border-slate-800">
          <p className="flex items-center justify-center gap-2">
            <span></span> Check your email (including spam)
          </p>
        </div>

        <div className="pt-4">
          <Link href="/market">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-12">
              Browse More Funnels <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}