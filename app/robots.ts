import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: process.env.SITE_INDEXABLE === "false" ? [{ userAgent: "*", disallow: "/" }] : [
    { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
  ], sitemap: absoluteUrl("/sitemap.xml") };
}
