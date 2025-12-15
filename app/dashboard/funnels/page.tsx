"use client";
import Link from "next/link";
import { Plus, Globe, MoreVertical } from "lucide-react";

export default function FunnelsList() {
  const funnels = [
    { id: "1", name: "Webinar Waitlist", visits: 120, revenue: "KES 0" },
    { id: "2", name: "Masterclass Sales", visits: 850, revenue: "KES 45,000" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Funnels</h1>
          <p className="text-gray-400">Manage your landing pages and sales flows.</p>
        </div>
        <Link href="/dashboard/funnels/new" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2">
            <Plus size={20} /> Create Funnel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funnels.map(funnel => (
            <div key={funnel.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition relative group">
                <div className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-white"><MoreVertical size={20}/></div>
                <div className="w-12 h-12 bg-blue-900/20 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">{funnel.name}</h3>
                <div className="flex gap-4 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-800">
                    <span>👀 {funnel.visits} Visits</span>
                    <span className="text-green-500">💰 {funnel.revenue}</span>
                </div>
                <Link href={`/dashboard/funnels/${funnel.id}`} className="mt-4 block text-center bg-gray-800 hover:bg-gray-700 py-2 rounded font-medium transition">
                    Edit Design
                </Link>
            </div>
        ))}
      </div>
    </div>
  );
}