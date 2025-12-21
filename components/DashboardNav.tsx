"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: "" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "" },
    { name: "Wallet", path: "/dashboard/wallet", icon: "" },
    { name: "Affiliates", path: "/dashboard/affiliates", icon: "" },
    { name: "AI Copy", path: "/dashboard/copywriting", icon: "" },
  ];

  return (
    <nav className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200/50">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          href={item.path}
          className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
            isActive(item.path) 
              ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <span>{item.icon}</span>
          <span className="hidden md:inline">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}