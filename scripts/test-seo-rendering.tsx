import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import BlogDetailClient from "../components/blogs/BlogDetailClient";
import NewsDetailClient from "../components/news/NewsDetailClient";
import JsonLd from "../components/seo/JsonLd";
import { pageMetadata, absoluteUrl } from "../lib/seo";
import { siteSEO } from "../data/seo";

const item = { id: "seo-render-test", slug: "seo-render-test", title: "Technical article rendering test", excerpt: "Server-rendered article excerpt for validation.",
  content: "This article body must be present in the initial HTML response.", featuredImage: { url: "/favicon.ico", publicId: "sample", alt: "Rendering test image" },
  category: null, tags: [], featured: false, seo: { metaTitle: "", metaDescription: "", keywords: [] },
  publishedAt: "2026-01-01T00:00:00.000Z", createdAt: "2026-01-01T00:00:00.000Z" };

for (const component of [<BlogDetailClient key="blog" slug={item.slug} initialItem={item} />, <NewsDetailClient key="news" slug={item.slug} initialItem={{ ...item, type: "news" }} />]) {
  const html = renderToStaticMarkup(component);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(html.includes(item.title));
  assert.ok(html.includes(item.content));
  assert.ok(!html.includes("animate-pulse"));
}
const schema = renderToStaticMarkup(<JsonLd data={{ name: "</script><script>alert(1)</script>" }} />);
assert.ok(!schema.includes("</script><script>"));
assert.ok(schema.includes("\\u003c"));
const titles = Object.values(siteSEO.pages).map((page) => pageMetadata(page).title);
assert.equal(titles.length, new Set(titles).size);
assert.equal(absoluteUrl("/contact?product=roll-forming-lines"), "https://www.empiricalindia.com/contact?product=roll-forming-lines");
const oldIndexable = process.env.SITE_INDEXABLE;
process.env.SITE_INDEXABLE = "false";
assert.deepEqual(pageMetadata(siteSEO.pages.home).robots, { index: false, follow: true });
if (oldIndexable === undefined) delete process.env.SITE_INDEXABLE; else process.env.SITE_INDEXABLE = oldIndexable;
console.log("SEO rendering passed: blog/news primary text and single H1 in server HTML, safe JSON-LD, unique static titles, canonical URLs and staging noindex.");
