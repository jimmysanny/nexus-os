import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full bg-[#0B0F1A] border border-green-500/20 rounded-2xl p-8 text-center space-y-6">
        <div className="mx-auto h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-slate-400">
            Thank you for your purchase. We have sent the download link directly to your email.
          </p>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300">
          <p> Check your inbox (and spam folder) for the PDF.</p>
        </div>

        <div className="pt-4">
          <Link href="/market">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Browse More Funnels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}