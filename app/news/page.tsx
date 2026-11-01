import { Suspense } from "react";
import { siteSEO } from "@/data/seo";
import { pageMetadata } from "@/lib/seo";
import { getNewsListing } from "@/lib/public-content";
import NewsListingClient from "@/components/news/NewsListingClient";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function pageNumber(value: string | string[] | undefined) { return typeof value === "string" && /^\d+$/.test(value) ? Math.min(10000, Math.max(1, Number(value))) : 1; }
function filtered(query: Record<string, unknown>) { return ["search", "category", "featured", "type", "upcoming", "tag"].some((key) => Boolean(query[key])); }
export async function generateMetadata({ searchParams }: Props) {
  const query = await searchParams;
  const page = pageNumber(query.page);
  const metadata = pageMetadata({ ...siteSEO.pages.news, title: siteSEO.pages.news.title + (page > 1 ? ` — Page ${page}` : ""),
    path: `/news${page > 1 ? `?page=${page}` : ""}` });
  return filtered(query) ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}
async function Content({ searchParams }: Props) {
  const query = await searchParams;
  const initialData = filtered(query) ? undefined : await getNewsListing(pageNumber(query.page));
  return <NewsListingClient initialData={initialData} />;
}
export default function Page(props: Props) { return <Suspense fallback={<div className="min-h-96 pt-28" aria-busy="true" />}><Content {...props} /></Suspense>; }
