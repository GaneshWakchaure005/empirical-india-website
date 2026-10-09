"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  PlusCircle,
  Calendar,
  ExternalLink,
  Shield,
  User,
} from "lucide-react";

interface AdminSidebarProps {
  unreadEnquiriesCount?: number;
}

export default function AdminSidebar({ unreadEnquiriesCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState<{ name?: string; role?: string; email?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: pathname === "/admin" || pathname === "/admin/dashboard",
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Mail,
      badge: unreadEnquiriesCount > 0 ? unreadEnquiriesCount : undefined,
      isActive: pathname.startsWith("/admin/enquiries"),
    },
    {
      name: "All Blogs",
      href: "/admin/blogs",
      icon: FileText,
      isActive: pathname === "/admin/blogs" || (pathname.startsWith("/admin/blogs/") && pathname !== "/admin/blogs/create"),
    },
    {
      name: "Create Blog",
      href: "/admin/blogs/create",
      icon: PlusCircle,
      isActive: pathname === "/admin/blogs/create",
    },
    {
      name: "All News",
      href: "/admin/news",
      icon: Calendar,
      isActive: pathname === "/admin/news" || (pathname.startsWith("/admin/news/") && pathname !== "/admin/news/create"),
    },
    {
      name: "Create News",
      href: "/admin/news/create",
      icon: PlusCircle,
      isActive: pathname === "/admin/news/create",
    },
  ];

  return (
    
<aside className="hidden lg:flex fixed left-0 top-16 bottom-0 z-40 w-64 flex-col overflow-y-auto overscroll-contain border-r border-slate-800/80 bg-slate-900/95 p-4 select-none">
  {/* Portal Tag */}
  <div className="mb-4 flex shrink-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2.5">
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-800/50 bg-cyan-950/80 text-cyan-400">
      <Shield className="h-4 w-4" />
    </div>

    <div className="min-w-0 flex-1">
      <div className="text-xs font-bold uppercase tracking-wide text-white">
        Admin Portal
      </div>
      <div className="truncate text-[10px] text-slate-400">
        Empirical India Control
      </div>
    </div>
  </div>

  {/* Navigation Links */}
  <nav
    className="flex-1 space-y-1.5"
    aria-label="Admin desktop navigation"
  >
    {navItems.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
            item.isActive
              ? "border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-sm shadow-cyan-950/40"
              : "border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
          }`}
        >
          <span className="flex min-w-0 items-center gap-3">
            <Icon
              className={`h-4 w-4 shrink-0 ${
                item.isActive ? "text-cyan-400" : "text-slate-400"
              }`}
            />
            <span className="truncate">{item.name}</span>
          </span>

          {item.badge !== undefined && (
            <span className="shrink-0 animate-pulse rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
              {item.badge}
            </span>
          )}
        </Link>
      );
    })}
  </nav>

  {/* Bottom Info & Public Site Link */}
  <div className="mt-4 shrink-0 space-y-3 border-t border-slate-800/80 pt-4">
    <Link
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
    >
      <span>View Live Website</span>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-500" />
    </Link>

    {adminUser && (
      <div className="flex items-center gap-2.5 rounded-xl border border-slate-800/60 bg-slate-950/50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300">
          <User className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium text-slate-200">
            {adminUser.name || "Administrator"}
          </div>
          <div className="text-[10px] font-semibold uppercase text-cyan-400">
            {adminUser.role || "Admin"}
          </div>
        </div>
      </div>
    )}
  </div>
</aside>

  );
}
