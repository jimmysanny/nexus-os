"use client";

import { use } from "react"; 
import { ArrowUpRight, DollarSign, Users, MousePointer2 } from "lucide-react";

// Update the component to accept params as a Promise
export default function FunnelDashboard({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Unwrap the params using 'use' (This fixes the Next.js 15 error)
  const { id } = use(params);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-1">Good afternoon, Jimmy</h1>
            {/* You can now use the 'id' here if you want, e.g., Funnel #{id} */}
            <p className="text-gray-400">Here is what is happening with Funnel #{id} today.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition">
            + New Funnel
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                    <DollarSign size={24} />
                </div>
                <span className="flex items-center text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">
                    +12.5% <ArrowUpRight size={14} className="ml-1"/>
                </span>
            </div>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white">KES 45,200</h3>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                    <Users size={24} />
                </div>
                <span className="flex items-center text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">
                    +4.2% <ArrowUpRight size={14} className="ml-1"/>
                </span>
            </div>
            <p className="text-gray-400 text-sm">Active Leads</p>
            <h3 className="text-3xl font-bold text-white">1,240</h3>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                    <MousePointer2 size={24} />
                </div>
                <span className="text-gray-500 text-sm px-2 py-1">
                    Last 30 days
                </span>
            </div>
            <p className="text-gray-400 text-sm">Page Views</p>
            <h3 className="text-3xl font-bold text-white">8,903</h3>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
        </div>
        <table className="w-full text-left">
            <thead className="bg-black/20 text-gray-400 text-sm">
                <tr>
                    <th className="p-4 pl-6">Customer</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-800">
                <tr>
                    <td className="p-4 pl-6 font-medium">Sarah Wanjiku</td>
                    <td className="text-gray-400">Digital Marketing Masterclass</td>
                    <td>KES 5,000</td>
                    <td><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                </tr>
                <tr>
                    <td className="p-4 pl-6 font-medium">David Otieno</td>
                    <td className="text-gray-400">1-on-1 Consultation</td>
                    <td>KES 15,000</td>
                    <td><span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">Pending</span></td>
                </tr>
                <tr>
                    <td className="p-4 pl-6 font-medium">Anita Nderu</td>
                    <td className="text-gray-400">Brand Strategy PDF</td>
                    <td>KES 1,500</td>
                    <td><span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold">Paid</span></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}