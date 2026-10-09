"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

const COMPANY_LOGO_URL =
  "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp";

export default function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      }
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Empirical India Logo */}
          <Link
            href="/admin"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            title="Empirical India Admin Dashboard"
          >
            <div className="relative w-36 sm:w-44 h-10 flex items-center">
              <Image
                src={COMPANY_LOGO_URL}
                alt="Empirical India"
                width={176}
                height={40}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Functional Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 hover:border-rose-700/60 transition-all disabled:opacity-50"
            title="Logout from administrative session"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
            ) : (
              <LogOut className="w-4 h-4 text-rose-400" />
            )}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
