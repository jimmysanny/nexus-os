import Link from "next/link";
import { Plus, Layout } from "lucide-react";

export default function FunnelsList() {
  return (
    <div className="p-8 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Funnels</h1>
        <Link href="/dashboard/funnels/new" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Plus size={18} /> Create New Funnel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* DEMO CARD */}
        <Link href="/dashboard/funnels/test-1" className="block group">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
                <div className="w-12 h-12 bg-blue-900/20 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400">Test Product</h3>
                <p className="text-gray-400 text-sm">test.nexus-os.com</p>
            </div>
        </Link>
      </div>
    </div>
  );
}
