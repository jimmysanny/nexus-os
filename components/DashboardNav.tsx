"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({ title, subtitle }: { title?: string, subtitle?: string }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: "" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "📈" },
    { name: "Brand Studio", path: "/dashboard/settings", icon: "🎨" }, // Added Settings
    { name: "Wallet", path: "/dashboard/wallet", icon: "💳" },
    { name: "Affiliates", path: "/dashboard/affiliates", icon: "🤝" },
  ];

  return (
    <div className="space-y-6">
       <nav className="flex flex-wrap items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200/60 shadow-sm w-fit">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isActive(item.path) 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <span>{item.icon}</span>
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        ))}
       </nav>
       {(title || subtitle) && (
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
        </div>
       )}
    </div>
  );
}