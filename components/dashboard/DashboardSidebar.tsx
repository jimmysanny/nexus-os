"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
  ShieldCheck,
  User,
  Menu,
  X,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  userName: string;
  userEmail: string;
  isAdmin: boolean;
}

export default function DashboardSidebar({
  userName,
  userEmail,
  isAdmin,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabel = isAdmin ? "ADMIN" : "CLIENT";

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-card transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              NEXUS
            </span>
            <span className="text-xl font-bold text-primary">.</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-6 pt-4">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-bold",
              isAdmin
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-secondary text-muted-foreground"
            )}
          >
            {isAdmin ? <ShieldCheck size={10} /> : <User size={10} />}
            {roleLabel}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 px-2">
            <UserButton afterSignOutUrl="/" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {userName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
