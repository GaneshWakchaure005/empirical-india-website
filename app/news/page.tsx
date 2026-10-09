import type { Metadata } from "next";
import { Suspense } from "react";
import NewsAndEvents from "@/data/10-news-and-events";
import NewsListingClient from "@/components/news/NewsListingClient";
import { NewsSkeleton } from "@/components/news/NewsStateViews";

export const metadata: Metadata = {
  title: `${NewsAndEvents.page} | Empirical India`,
  description:
    "Official company updates, manufacturing milestones, machine dispatches, roll-forming product innovations, and industrial trade expo events from Empirical India.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: `${NewsAndEvents.page} | Empirical India`,
    description:
      "Explore company updates, manufacturing milestones, product developments, and trade events from Empirical India.",
    url: "/news",
    type: "website",
    images: [
      {
        url: "/images/company logo.webp",
        width: 1200,
        height: 630,
        alt: "Empirical India News and Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${NewsAndEvents.page} | Empirical India`,
    description:
      "Explore company updates, manufacturing milestones, product developments, and trade events from Empirical India.",
  },
};

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <NewsSkeleton />
        </div>
      }
    >
      <NewsListingClient />
    </Suspense>
  );
}
