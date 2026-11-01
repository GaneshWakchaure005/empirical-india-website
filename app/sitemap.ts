import type { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import Blog from "@/models/Blog";
import NewsEvent from "@/models/NewsEvent";
import { absoluteUrl } from "@/lib/seo";
import { siteSEO } from "@/data/seo";
import { connection } from "next/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  await connectDB();
  const [products, blogs, news] = await Promise.all([
    ProductCategory.find({ status: "published" }).select("slug children.slug updatedAt").lean<{ slug: string; children: { slug: string }[]; updatedAt: Date }[]>(),
    Blog.find({ status: "published" }).select("slug updatedAt").lean(),
    NewsEvent.find({ status: "published" }).select("slug updatedAt").lean(),
  ]);
  return [
    ...Object.values(siteSEO.pages).map((page) => ({ url: absoluteUrl(page.path) })),
    ...products.flatMap((category) => [{ url: absoluteUrl(`/products/${category.slug}`), lastModified: category.updatedAt },
      ...category.children.map((product) => ({ url: absoluteUrl(`/products/${category.slug}/${product.slug}`), lastModified: category.updatedAt }))]),
    ...blogs.map((item) => ({ url: absoluteUrl(`/blogs/${item.slug}`), lastModified: item.updatedAt })),
    ...news.map((item) => ({ url: absoluteUrl(`/news/${item.slug}`), lastModified: item.updatedAt })),
  ];
}
