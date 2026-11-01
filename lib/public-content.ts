import { cache } from "react";
import { connection } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import NewsEvent from "@/models/NewsEvent";
import type { BlogPublic, IFeaturedImage, IBlogSEO } from "@/types/blog";
import type { NewsEventPublic } from "@/types/news-event";
import type { CategoryPublic } from "@/types/category";
import "@/models/Category";

type Source = { _id: { toString(): string }; title: string; slug: string; excerpt: string; content: string;
  featuredImage: IFeaturedImage; tags: string[]; featured: boolean; seo: IBlogSEO;
  publishedAt?: Date; createdAt: Date; updatedAt: Date; category?: unknown };
const fields = "title slug excerpt content featuredImage category tags featured seo publishedAt createdAt updatedAt type eventDetails";
function publicFields(record: Source) {
  const category = record.category as (Omit<CategoryPublic, "id"> & { _id: { toString(): string } }) | null;
  return { id: record._id.toString(), title: record.title, slug: record.slug, excerpt: record.excerpt, content: record.content,
    featuredImage: { url: record.featuredImage.url, alt: record.featuredImage.alt, publicId: record.featuredImage.publicId },
    tags: [...record.tags], featured: record.featured, seo: { metaTitle: record.seo.metaTitle, metaDescription: record.seo.metaDescription, keywords: [...record.seo.keywords] },
    category: category ? { id: category._id.toString(), name: category.name, slug: category.slug, type: category.type, isActive: category.isActive } : null,
    publishedAt: record.publishedAt?.toISOString(), createdAt: record.createdAt.toISOString(), updatedAt: record.updatedAt.toISOString() } satisfies BlogPublic & { updatedAt: string };
}
async function ready() { await connection(); await connectDB(); }
export const getPublishedBlog = cache(async (slug: string) => {
  await ready();
  const record = await Blog.findOne({ slug, status: "published" }).select(fields).populate("category", "name slug type isActive").lean();
  return record ? publicFields(record) : null;
});
export const getPublishedNews = cache(async (slug: string) => {
  await ready();
  const record = await NewsEvent.findOne({ slug, status: "published" }).select(fields).populate("category", "name slug type isActive").lean();
  return record ? { ...publicFields(record), type: record.type,
    eventDetails: record.eventDetails ? { ...record.eventDetails, startDate: record.eventDetails.startDate?.toISOString(), endDate: record.eventDetails.endDate?.toISOString() } : undefined } satisfies NewsEventPublic : null;
});
export async function getBlogListing(page = 1) {
  await ready();
  const [records, total] = await Promise.all([Blog.find({ status: "published" }).select(fields).populate("category", "name slug type isActive").sort({ publishedAt: -1, createdAt: -1 }).skip((page - 1) * 9).limit(9).lean(), Blog.countDocuments({ status: "published" })]);
  return { data: records.map(publicFields), pagination: { page, limit: 9, total, totalPages: Math.ceil(total / 9) || 1 } };
}
export async function getNewsListing(page = 1) {
  await ready();
  const [records, total] = await Promise.all([NewsEvent.find({ status: "published" }).select(fields).populate("category", "name slug type isActive").sort({ publishedAt: -1, createdAt: -1 }).skip((page - 1) * 9).limit(9).lean(), NewsEvent.countDocuments({ status: "published" })]);
  return { data: records.map((record) => ({ ...publicFields(record), type: record.type,
    eventDetails: record.eventDetails ? { ...record.eventDetails, startDate: record.eventDetails.startDate?.toISOString(), endDate: record.eventDetails.endDate?.toISOString() } : undefined })),
    pagination: { page, limit: 9, total, totalPages: Math.ceil(total / 9) || 1 } };
}
