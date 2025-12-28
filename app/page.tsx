import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <nav className="p-6 flex justify-between items-center border-b border-slate-800">
        <div className="text-2xl font-bold tracking-tighter">NEXUS OS</div>
        <div className="gap-4 flex items-center">
            <Link href="/market" className="px-4 py-2 hover:text-blue-400 transition">Marketplace</Link>
            <Link href="/dashboard" className="px-5 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">
                {userId ? "Dashboard" : "Start Selling"}
            </Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-10">
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
           SELL <span className="text-blue-500">DIGITAL</span> ASSETS.
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-lg">The operating system for creators. Host, sell, and scale your digital empire.</p>
        <div className="flex gap-4">
            <Link href="/market" className="px-8 py-4 bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">Browse Market</Link>
            <Link href="/dashboard" className="px-8 py-4 border border-slate-700 rounded-full font-bold text-lg hover:bg-slate-900 transition">Creator Studio</Link>
        </div>
      </main>
    </div>
  );
}
