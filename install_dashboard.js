const fs = require('fs');
const path = require('path');

console.log("🚀 Building Nexus OS Dashboard...");

const files = {
  // 1. The Dashboard Shell (Sidebar + Topbar)
  'app/dashboard/layout.tsx': `import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Globe } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-6 flex flex-col">
        <div className="text-2xl font-bold mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Nexus OS
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link href="/dashboard/funnels" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition">
            <Globe size={20} /> My Funnels
          </Link>
          <Link href="/dashboard/store" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition">
            <ShoppingBag size={20} /> Products
          </Link>
          <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition">
            <Users size={20} /> Customers
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900/50 rounded-lg transition">
            <Settings size={20} /> Settings
          </Link>
        </nav>

        <div className="pt-6 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition w-full px-4">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md sticky top-0 z-10">
          <div className="text-gray-400 text-sm"> / dashboard / overview</div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}`,

  // 2. The Main Dashboard View (Stats)
  'app/dashboard/page.tsx': `"use client";
import { ArrowUpRight, DollarSign, Users, MousePointer2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-1">Good afternoon, Jimmy</h1>
            <p className="text-gray-400">Here is what is happening with your business today.</p>
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
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
    console.log("Created folder: " + dirName);
  }
  fs.writeFileSync(filePath, content);
  console.log("Created file: " + filePath);
});

console.log("\n✅ Dashboard Built!");
console.log("👉 If your server is running, just refresh the page.");