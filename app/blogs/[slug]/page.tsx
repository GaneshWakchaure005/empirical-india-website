import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublishedBlog } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BlogDetailClient from "@/components/blogs/BlogDetailClient";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedBlog(slug);
  if (!item) notFound();
  return pageMetadata({ title: item.seo.metaTitle || item.title, description: item.seo.metaDescription || item.excerpt,
    path: `/blogs/${slug}`, keywords: item.seo.keywords.length ? item.seo.keywords : item.tags, image: item.featuredImage.url,
    article: { publishedTime: item.publishedAt, modifiedTime: item.updatedAt } });
}
async function Article({ params }: Props) {
  const { slug } = await params;
  const item = await getPublishedBlog(slug);
  if (!item) notFound();
  return <><ArticleSchema item={item} section="blogs" /><BlogDetailClient key={slug} slug={slug} initialItem={item} /></>;
}
export default function DetailPage(props: Props) {
  return <Suspense fallback={<div className="min-h-96 pt-28" aria-busy="true" />}><Article {...props} /></Suspense>;
}
