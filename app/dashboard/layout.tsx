import Link from "next/link";
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
}