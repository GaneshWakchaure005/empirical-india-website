"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[40vh] text-slate-400 text-sm">
      <span>Redirecting to dashboard...</span>
    </div>
  );
}

