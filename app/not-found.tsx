import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center p-6">
      <div className="text-9xl font-black text-slate-800 mb-4 select-none">404</div>
      <h2 className="text-4xl font-black text-white mb-6">Lost in the Void?</h2>
      <p className="text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
        The digital asset you are looking for has been moved, deleted, or never existed.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500">
          Back to Dashboard
        </Link>
        <Link href="/market" className="px-6 py-3 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700">
          Browse Store
        </Link>
      </div>
    </div>
  );
}