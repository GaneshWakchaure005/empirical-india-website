import type { Metadata } from "next";
import { Suspense } from "react";
import BlogsContent from "@/data/10-blogs";
import BlogsListingClient from "@/components/blogs/BlogsListingClient";
import { BlogSkeleton } from "@/components/blogs/BlogStateViews";

export const metadata: Metadata = {
  title: `${BlogsContent.page} | Empirical India`,
  description:
    "Engineering insights, roll-forming machine design principles, modular metal pallet engineering, and precision tube manufacturing articles from Empirical India in Nashik.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `${BlogsContent.page} | Empirical India`,
    description:
      "Explore engineering-led manufacturing articles, roll-forming machinery guides, modular metal pallet case studies, and luggage tube specifications.",
    url: "/blogs",
    type: "website",
    images: [
      {
        url: BlogsContent.hero.backgroundImage,
        width: 1200,
        height: 630,
        alt: "Empirical India Engineering Blogs and Technical Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BlogsContent.page} | Empirical India`,
    description:
      "Explore engineering-led manufacturing articles, roll-forming machinery guides, modular metal pallet case studies, and luggage tube specifications.",
    images: [BlogsContent.hero.backgroundImage],
  },
};

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <BlogSkeleton />
        </div>
      }
    >
      <BlogsListingClient />
    </Suspense>
  );
}
