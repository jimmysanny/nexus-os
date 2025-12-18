"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateFunnelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate creation
    setTimeout(() => {
        router.push("/dashboard/funnels/test-1"); // Redirect to editor
    }, 1000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto text-white">
      <Link href="/dashboard/funnels" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8">
        <ArrowLeft size={18} /> Back to Funnels
      </Link>
      
      <h1 className="text-3xl font-bold mb-2">Create a New Funnel</h1>
      <p className="text-gray-400 mb-8">Launch a new high-converting sales page.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl border border-gray-800">
        <div>
            <label className="block text-sm font-bold mb-2">Funnel Name</label>
            <input type="text" placeholder="e.g. Summer Sale" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" required />
        </div>
        <div>
            <label className="block text-sm font-bold mb-2">Subdomain</label>
            <div className="flex items-center">
                <input type="text" placeholder="summer-sale" className="flex-1 bg-black border border-gray-700 rounded-l-lg p-3 text-white focus:border-blue-500 outline-none" required />
                <span className="bg-gray-800 border border-gray-700 border-l-0 text-gray-400 p-3 rounded-r-lg">.nexus-os.vercel.app</span>
            </div>
        </div>
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">
            {loading ? "Creating..." : "Create Funnel"}
        </button>
      </form>
    </div>
  );
}
