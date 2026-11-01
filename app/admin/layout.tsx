import type { Metadata } from "next";
import AdminPageLayout from "@/components/admin/AdminPageLayout";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Empirical India Admin" }, robots: { index: false, follow: false, noarchive: true } };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminPageLayout>{children}</AdminPageLayout>;
}
