import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

// Professional SVG Icons (Now includes 'Partner')
const Icons = {
  Home: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  Users: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>,
  Box: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  Chart: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  Store: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>,
  Partner: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "Home", href: "/dashboard", icon: <Icons.Home /> },
    { name: "Products", href: "/dashboard/funnels", icon: <Icons.Box /> },
    { name: "Customers", href: "/dashboard/customers", icon: <Icons.Users /> },
    { name: "Affiliates", href: "/dashboard/affiliates", icon: <Icons.Partner /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <Icons.Chart /> },
    { name: "Online Store", href: "/market", icon: <Icons.Store /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed h-full z-50">
        <div className="p-8 mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">NEXUS</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-2.5 font-menu text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all group">
              <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
           <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">Admin</span>
                <span className="text-[10px] text-slate-400">Account</span>
              </div>
           </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10 bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}