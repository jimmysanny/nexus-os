"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  // Helper to check active state including sub-paths
  const isActive = (path: string) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path));

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "" },
    { name: "Brand Studio", path: "/dashboard/settings", icon: "" },
    { name: "Wallet", path: "/dashboard/wallet", icon: "" },
    { name: "Affiliates", path: "/dashboard/affiliates", icon: "" },
    { name: "AI Studio", path: "/dashboard/copywriting", icon: "" },
    { name: "Help", path: "/dashboard/help", icon: "" },
  ];

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          href={item.path}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            isActive(item.path) 
              ? "bg-slate-900 text-white shadow-md shadow-slate-300" 
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <span className="text-base">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}