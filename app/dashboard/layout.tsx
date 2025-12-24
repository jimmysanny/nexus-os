'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Settings, Menu, X, Receipt } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      <div className="md:hidden fixed top-0 w-full z-40 bg-white border-b px-4 h-16 flex items-center justify-between shadow-sm">
        <span className="font-bold text-xl text-blue-700">Nexus OS</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={ixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out shadow-2xl md:relative md:translate-x-0 md:z-0  mt-16 md:mt-0}>
        <div className="h-full flex flex-col justify-between p-4 bg-white">
          <div>
            <div className="hidden md:flex items-center gap-2 mb-8 px-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
              <span className="text-xl font-bold text-gray-800">Nexus OS</span>
            </div>
            <nav className="space-y-2">
              <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" href="/dashboard" />
              <SidebarItem icon={<Users size={20} />} label="Clients" href="/dashboard/clients" />
              <SidebarItem icon={<FileText size={20} />} label="Projects" href="/dashboard/projects" />
              <SidebarItem icon={<Receipt size={20} />} label="Invoices" href="/dashboard/invoices" />
              <SidebarItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" />
            </nav>
          </div>
          <div className="border-t pt-4">
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <UserButton afterSignOutUrl="/" />
                <div className="text-sm"><p className="font-medium text-gray-700">My Account</p></div>
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-full w-full pt-16 md:pt-0 z-0 relative">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

function SidebarItem({ icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
      {icon} <span className="font-medium">{label}</span>
    </Link>
  );
}
