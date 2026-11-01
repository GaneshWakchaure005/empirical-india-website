
"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
import { AdminToastProvider } from "@/components/admin/AdminToast";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unreadEnquiries, setUnreadEnquiries] = useState<number>(0);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    const fetchBadge = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");

        if (res.ok) {
          const data = await res.json().catch(() => ({}));

          if (data?.success && data.data?.newEnquiries !== undefined) {
            setUnreadEnquiries(data.data.newEnquiries);
          }
        }
      } catch {
        // Ignore background errors
      }
    };

    fetchBadge();
  }, [isLoginPage, pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
        <AdminHeader />

        <div className="flex-1 flex w-full lg:pl-64">
          <AdminSidebar unreadEnquiriesCount={unreadEnquiries} />

          <main className="flex-1 min-w-0 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 pb-28 lg:pb-12">
            {children}
          </main>
        </div>

        <AdminMobileNav unreadEnquiriesCount={unreadEnquiries} />
      </div>
    </AdminToastProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
