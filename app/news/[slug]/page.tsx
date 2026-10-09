import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchNewsEventBySlug } from "@/lib/api/news-events";
import NewsDetailClient from "@/components/news/NewsDetailClient";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const item = await fetchNewsEventBySlug(slug);

    if (!item) {
      return {
        title: "News & Events | Empirical India",
        description:
          "Official manufacturing news, machinery dispatches, and exhibition events from Empirical India.",
      };
    }

    const title = item.seo?.metaTitle || item.title;
    const description = item.seo?.metaDescription || item.excerpt;
    const imageUrl = item.featuredImage?.url;

    return {
      title: `${title} | Empirical India`,
      description,
      keywords: item.seo?.keywords?.length ? item.seo.keywords : item.tags,
      alternates: {
        canonical: `/news/${slug}`,
      },
      openGraph: {
        title: `${title} | Empirical India`,
        description,
        url: `/news/${slug}`,
        type: "article",
        publishedTime: item.publishedAt
          ? new Date(item.publishedAt).toISOString()
          : undefined,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                alt: item.featuredImage?.alt || title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Empirical India`,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: "News & Events | Empirical India",
      description:
        "Official manufacturing news, machinery dispatches, and exhibition events from Empirical India.",
    };
  }
}

async function NewsDetailContent({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  return <NewsDetailClient slug={slug} />;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 animate-pulse">
          <div className="h-6 w-32 bg-steel-200 rounded mb-6" />
          <div className="h-10 w-3/4 bg-steel-200 rounded mb-4" />
          <div className="aspect-[21/9] bg-steel-200 rounded-3xl w-full" />
        </div>
      }
    >
      <NewsDetailContent params={params} />
    </Suspense>
  );
}
