import type { Metadata } from "next";
import { siteSEO } from "@/data/seo";

export function siteOrigin() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || siteSEO.defaultOrigin);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("Invalid NEXT_PUBLIC_SITE_URL");
  return url.origin;
}
export function absoluteUrl(path: string) { return new URL(path, `${siteOrigin()}/`).href; }
export function cleanTitle(title: string) { return title.replace(/\s*\|\s*Empirical India\s*$/i, "").trim(); }

export function pageMetadata({ title, description, path, keywords = [], image = "/opengraph-image", article }: {
  title: string; description: string; path: string; keywords?: readonly string[]; image?: string;
  article?: { publishedTime?: string; modifiedTime?: string };
}): Metadata {
  const heading = cleanTitle(title);
  return {
    title: heading, description, keywords: [...new Set([...keywords, ...siteSEO.keywords])],
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: process.env.SITE_INDEXABLE !== "false", follow: true },
    openGraph: { title: `${heading} | ${siteSEO.name}`, description, url: absoluteUrl(path), siteName: siteSEO.name,
      locale: siteSEO.locale, type: article ? "article" : "website", ...article, images: [{ url: absoluteUrl(image), alt: title }] },
    twitter: { card: "summary_large_image", title: `${heading} | ${siteSEO.name}`, description, images: [absoluteUrl(image)] },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({
    "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path),
  })) };
}
export function organizationSchema() {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": ["Organization", "LocalBusiness"], "@id": absoluteUrl("/#organization"), name: siteSEO.name, url: siteOrigin(), logo: siteSEO.logo,
      address: { "@type": "PostalAddress", ...siteSEO.address }, location: { "@type": "Place", name: siteSEO.location } },
    { "@type": "WebSite", "@id": absoluteUrl("/#website"), url: siteOrigin(), name: siteSEO.name,
      inLanguage: "en-IN", publisher: { "@id": absoluteUrl("/#organization") } },
  ] };
}
