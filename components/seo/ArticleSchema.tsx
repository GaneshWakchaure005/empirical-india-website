import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { siteSEO } from "@/data/seo";
import JsonLd from "./JsonLd";
import type { BlogPublic } from "@/types/blog";

export default function ArticleSchema({ item, section }: { item: BlogPublic & { updatedAt: string }; section: "blogs" | "news" }) {
  const path = `/${section}/${item.slug}`;
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": section === "blogs" ? "BlogPosting" : "NewsArticle",
      headline: item.title, description: item.excerpt, image: item.featuredImage.url,
      datePublished: item.publishedAt, dateModified: item.updatedAt, inLanguage: "en-IN",
      mainEntityOfPage: absoluteUrl(path), author: { "@type": "Organization", name: siteSEO.name, url: absoluteUrl("/about") },
      publisher: { "@id": absoluteUrl("/#organization") } }} />
    <JsonLd data={breadcrumbSchema([{ name: siteSEO.breadcrumbs.home, path: "/" }, { name: siteSEO.breadcrumbs[section], path: `/${section}` }, { name: item.title, path }])} />
  </>;
}
