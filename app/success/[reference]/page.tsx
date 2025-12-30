import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage({ params }: { params: { reference: string } }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 mb-8">
          Thank you for your purchase. Your transaction reference is: <br/>
          <span className="font-mono text-indigo-400">{params.reference}</span>
        </p>

        <div className="space-y-3">
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg">
            Download Your Files
          </button>
          <Link href="/dashboard" className="block w-full text-slate-500 hover:text-white text-sm mt-4">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
