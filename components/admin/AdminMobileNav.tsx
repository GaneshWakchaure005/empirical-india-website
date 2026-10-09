"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  PlusCircle,
  Calendar,
} from "lucide-react";

interface AdminMobileNavProps {
  unreadEnquiriesCount?: number;
}

export default function AdminMobileNav({ unreadEnquiriesCount = 0 }: AdminMobileNavProps) {
  const pathname = usePathname();

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
    <nav
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 safe-bottom"
      aria-label="Admin mobile navigation"
    >
      <div className="grid grid-cols-6 items-center px-1 py-1.5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all duration-150 ${
                item.isActive
                  ? "text-cyan-400 font-bold bg-cyan-950/40"
                  : "text-slate-400 hover:text-slate-200 active:scale-95"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    item.isActive ? "scale-110 text-cyan-400" : "text-slate-400"
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 flex items-center justify-center text-[9px] font-black rounded-full bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight truncate max-w-full leading-none">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
