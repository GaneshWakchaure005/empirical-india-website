"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function ChromeContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // For all /admin routes, do NOT render the public website navbar or footer
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

export default function ConditionalSiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex-1">{children}</div>}>
      <ChromeContent>{children}</ChromeContent>
    </Suspense>
  );
}

