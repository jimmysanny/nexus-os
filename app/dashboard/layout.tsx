import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, ShoppingBag, Settings, Users } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col hidden md:flex">
        <div className="mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">N</div>
            <span className="text-xl font-bold tracking-tight">Nexus OS</span>
        </div>
        
        <nav className="space-y-2 flex-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition">
                <LayoutDashboard size={20} /> Overview
            </Link>
            <Link href="/dashboard/funnels" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition">
                <ShoppingBag size={20} /> My Funnels
            </Link>
            <Link href="/dashboard/customers" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition">
                <Users size={20} /> Customers
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition">
                <Settings size={20} /> Settings
            </Link>
        </nav>

        <div className="pt-6 border-t border-gray-800">
            <div className="flex items-center gap-3 px-2">
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm text-gray-500">My Account</span>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
