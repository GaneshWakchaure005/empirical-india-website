import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchBlogBySlug } from "@/lib/api/blogs";
import BlogDetailClient from "@/components/blogs/BlogDetailClient";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const item = await fetchBlogBySlug(slug);

    if (!item) {
      return {
        title: "Blog Article | Empirical India",
        description:
          "Engineering insights, roll-forming machine design principles, and custom manufacturing articles from Empirical India.",
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
        canonical: `/blogs/${slug}`,
      },
      openGraph: {
        title: `${title} | Empirical India`,
        description,
        url: `/blogs/${slug}`,
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
      title: "Blog Article | Empirical India",
      description:
        "Engineering insights, roll-forming machine design principles, and custom manufacturing articles from Empirical India.",
    };
  }
}

async function BlogDetailContent({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
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
      <BlogDetailContent params={params} />
    </Suspense>
  );
}
