import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublishedNews } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";
import ArticleSchema from "@/components/seo/ArticleSchema";
import NewsDetailClient from "@/components/news/NewsDetailClient";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedNews(slug);
  if (!item) notFound();
  return pageMetadata({ title: item.seo.metaTitle || item.title, description: item.seo.metaDescription || item.excerpt,
    path: `/news/${slug}`, keywords: item.seo.keywords.length ? item.seo.keywords : item.tags, image: item.featuredImage.url,
    article: { publishedTime: item.publishedAt, modifiedTime: item.updatedAt } });
}
async function Article({ params }: Props) {
  const { slug } = await params;
  const item = await getPublishedNews(slug);
  if (!item) notFound();
  return <><ArticleSchema item={item} section="news" /><NewsDetailClient key={slug} slug={slug} initialItem={item} /></>;
}
export default function DetailPage(props: Props) {
  return <Suspense fallback={<div className="min-h-96 pt-28" aria-busy="true" />}><Article {...props} /></Suspense>;
}
