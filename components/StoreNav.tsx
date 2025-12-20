import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function StoreNav() {
  const user = await currentUser(); // Check if the viewer is the Admin

  return (
    <nav className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-4 mb-8">
      <Link href="/market" className="text-xl font-black italic tracking-tighter text-slate-900 flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">N</span>
        NEXUS STORE
      </Link>

      <div className="flex items-center gap-4">
        {/* Only show "Back to Dashboard" if logged in */}
        {user ? (
          <Link href="/dashboard" className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">
             Back to HQ
          </Link>
        ) : (
          <Link href="/sign-in" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">
            Merchant Login
          </Link>
        )}
      </div>
    </nav>
  );
}