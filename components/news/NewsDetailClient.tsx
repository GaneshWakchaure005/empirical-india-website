"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  ExternalLink,
  Newspaper,
  ChevronRight,
  Sparkles,
  Mail,
  FileText,
  ArrowRight,
  Link2,
} from "lucide-react";
import { NewsEventPublic } from "@/types/news-event";
import { fetchNewsEventBySlug, fetchNewsEvents } from "@/lib/api/news-events";
import { formatDate, formatDateRange, estimateReadingTime } from "@/lib/format";
import NewsCard from "./NewsCard";
import { NewsErrorState } from "./NewsStateViews";
import NewsEnquiryCTA from "./NewsEnquiryCTA";
import { cn } from "@/lib/utils";

interface NewsDetailClientProps {
  slug: string;
}

export default function NewsDetailClient({ slug }: NewsDetailClientProps) {
  const [item, setItem] = useState<NewsEventPublic | null>(null);
  const [relatedItems, setRelatedItems] = useState<NewsEventPublic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  const loadArticle = useCallback(async () => {
    setLoading(true);
    setError(null);
    setImageError(false);

    try {
      const data = await fetchNewsEventBySlug(slug);
      if (!data) {
        setItem(null);
        return;
      }
      setItem(data);

      // Fetch related announcements/events (excluding current)
      try {
        const relatedRes = await fetchNewsEvents({
          limit: 4,
          type: data.type,
        });
        const filtered = relatedRes.data.filter((r) => r.id !== data.id).slice(0, 3);
        setRelatedItems(filtered);
      } catch (relatedErr) {
        console.warn("Could not load related news:", relatedErr);
      }
    } catch (err: any) {
      setError(
        err.message || "Unable to load the requested news article. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [slug, retryCount]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const isEvent = item?.type === "event";

  if (loading) {
    return <NewsDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <NewsErrorState message={error} onRetry={() => setRetryCount((c) => c + 1)} />
        <Link
          href="/news"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-navy-700 hover:text-navy-900"
        >
          <ArrowLeft size={16} />
          Back to all News &amp; Events
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-steel-100 border border-steel-200 flex items-center justify-center mx-auto mb-6 text-steel-400">
          <Newspaper size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-steel-900 mb-3">
          Article Not Found
        </h1>
        <p className="text-base text-steel-600 mb-8 max-w-md mx-auto">
          The requested news announcement or event does not exist or may have been archived.
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 transition-all shadow-md"
        >
          <ArrowLeft size={16} />
          Back to News &amp; Events
        </Link>
      </div>
    );
  }

  // Parse paragraphs for content if plain text/markdown
  const contentParagraphs = item.content
    ? item.content.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
    : [];

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = encodeURIComponent(item.title);

  return (
    <article className="min-h-screen bg-white">
      {/* Top Breadcrumb & Navigation Bar (Clearing fixed Navbar) */}
      <div className="pt-24 sm:pt-28 pb-3.5 border-b border-steel-200/80 bg-steel-50/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-steel-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-navy-900 transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight size={12} className="shrink-0 text-steel-400" />
            <Link href="/news" className="hover:text-navy-900 transition-colors shrink-0">
              News &amp; Events
            </Link>
            {item.category?.name && (
              <>
                <ChevronRight size={12} className="shrink-0 text-steel-400" />
                <span className="text-steel-600 font-medium shrink-0">
                  {item.category.name}
                </span>
              </>
            )}
            <ChevronRight size={12} className="shrink-0 text-steel-400" />
            <span className="text-steel-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {item.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-steel-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>All News &amp; Events</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-12">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                isEvent
                  ? "bg-amber-100 text-amber-900 border border-amber-200"
                  : "bg-navy-100 text-navy-900 border border-navy-200"
              )}
            >
              {isEvent ? <Calendar size={13} /> : <Newspaper size={13} />}
              {isEvent ? "Event" : "Company News"}
            </span>

            {item.category?.name && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-steel-100 text-steel-700 border border-steel-200">
                {item.category.name}
              </span>
            )}

            {item.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-red-brand text-white shadow-sm">
                <Sparkles size={11} />
                Featured Story
              </span>
            )}

            <span className="inline-flex items-center gap-1 text-xs text-steel-400 font-medium ml-auto">
              <Clock size={12} />
              {estimateReadingTime(item.content)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-steel-900 tracking-tight leading-[1.18] mb-6">
            {item.title}
          </h1>

          {/* Excerpt / Lead */}
          <p className="text-lg sm:text-xl text-steel-600 leading-relaxed font-normal mb-8 border-l-4 border-navy-700 pl-4 sm:pl-6">
            {item.excerpt}
          </p>

          {/* Author, Date, and Social Sharing Bar */}
          <div className="pt-6 border-t border-steel-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs sm:text-sm text-steel-500">
              <div>
                <span className="text-steel-400 font-medium">Published: </span>
                <time
                  dateTime={
                    item.publishedAt
                      ? new Date(item.publishedAt).toISOString()
                      : ""
                  }
                  className="font-bold text-steel-700"
                >
                  {formatDate(item.publishedAt || item.createdAt)}
                </time>
              </div>

              {item.author?.name && (
                <>
                  <span className="text-steel-300">&bull;</span>
                  <div>
                    <span className="text-steel-400 font-medium">By: </span>
                    <span className="font-semibold text-steel-700">
                      {item.author.name}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-steel-400 mr-1 flex items-center gap-1">
                <Share2 size={13} />
                Share:
              </span>

              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                title="Copy article link"
                className="p-2 rounded-lg border border-steel-200 text-steel-600 hover:text-navy-900 hover:bg-steel-50 transition-colors relative cursor-pointer"
              >
                {copied ? (
                  <Check size={15} className="text-emerald-600" />
                ) : (
                  <Link2 size={15} />
                )}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-navy-900 text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-2 rounded-lg border border-steel-200 text-steel-600 hover:text-navy-900 hover:bg-steel-50 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="p-2 rounded-lg border border-steel-200 text-steel-600 hover:text-navy-900 hover:bg-steel-50 transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${shareTitle}&body=Read%20this%20update%20from%20Empirical%20India:%20${encodeURIComponent(
                  currentUrl
                )}`}
                title="Share via Email"
                className="p-2 rounded-lg border border-steel-200 text-steel-600 hover:text-navy-900 hover:bg-steel-50 transition-colors inline-flex items-center justify-center"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-steel-100 border border-steel-200/80 shadow-md">
            {item.featuredImage?.url && !imageError ? (
              <Image
                src={item.featuredImage.url}
                alt={item.featuredImage.alt || item.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-steel-200 via-steel-100 to-steel-50 text-steel-400 p-8 text-center">
                <Newspaper size={56} className="text-steel-400/80 mb-3" />
                <span className="text-sm font-bold uppercase tracking-wider text-steel-600">
                  Empirical India Update
                </span>
              </div>
            )}
          </div>
          {item.featuredImage?.alt && (
            <p className="mt-2 text-xs text-steel-400 text-center italic">
              {item.featuredImage.alt}
            </p>
          )}
        </div>

        {/* If Event: Dedicated Event Info Card */}
        {isEvent && item.eventDetails && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border border-amber-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Calendar size={14} className="text-amber-700" />
              Event Schedule &amp; Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.eventDetails.startDate && (
                <div>
                  <span className="block text-xs font-semibold text-steel-500 uppercase tracking-wider mb-1">
                    Dates &amp; Timing
                  </span>
                  <p className="text-base font-bold text-steel-900">
                    {formatDateRange(
                      item.eventDetails.startDate,
                      item.eventDetails.endDate
                    )}
                  </p>
                </div>
              )}

              {item.eventDetails.location && (
                <div>
                  <span className="block text-xs font-semibold text-steel-500 uppercase tracking-wider mb-1">
                    Location &amp; Venue
                  </span>
                  <div className="flex items-start gap-2 text-base font-bold text-steel-900">
                    <MapPin size={18} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>{item.eventDetails.location}</span>
                  </div>
                </div>
              )}
            </div>

            {item.eventDetails.registrationUrl && (
              <div className="mt-6 pt-5 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-steel-600">
                  Register or book an appointment at our booth in advance:
                </p>
                <a
                  href={item.eventDetails.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
                >
                  <span>Event Registration</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Main Article Content */}
        <div className="prose prose-lg max-w-none text-steel-700 leading-relaxed space-y-6">
          {contentParagraphs.map((para, idx) => (
            <p key={idx} className="text-base sm:text-lg text-steel-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-steel-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-steel-400 uppercase tracking-wider mr-2">
              Tags:
            </span>
            {item.tags.map((tag) => (
              <Link
                key={tag}
                href={`/news?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-steel-100 hover:bg-steel-200 text-steel-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Commercial Engineering CTA Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-navy-50/70 border border-navy-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-navy-950 mb-1">
              Have a specific manufacturing requirement?
            </h3>
            <p className="text-sm text-steel-600">
              Share your profile drawings, tube requirements, or custom pallet load cases for technical review.
            </p>
          </div>
          <Link
            href="/contact?topic=news-article"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 shadow-md transition-all"
          >
            <FileText size={15} />
            <span>Request a Quote</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Related News & Events */}
        {relatedItems.length > 0 && (
          <section className="mt-20 pt-12 border-t border-steel-200" aria-labelledby="related-news-heading">
            <div className="flex items-center justify-between mb-8">
              <h2 id="related-news-heading" className="text-2xl font-bold text-steel-900">
                Related {isEvent ? "Events" : "News & Updates"}
              </h2>
              <Link
                href="/news"
                className="text-xs font-bold text-navy-700 hover:text-navy-900 inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <NewsCard key={rel.id} item={rel} />
              ))}
            </div>
          </section>
        )}

        {/* Final General Enquiry Section */}
        <NewsEnquiryCTA />
      </div>
    </article>
  );
}

function NewsDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-8 animate-pulse" aria-busy="true">
      <div className="h-4 w-48 bg-steel-200 rounded" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-steel-200 rounded-full" />
          <div className="h-6 w-28 bg-steel-200 rounded-full" />
        </div>
        <div className="h-10 w-4/5 bg-steel-200 rounded" />
        <div className="h-5 w-3/4 bg-steel-100 rounded" />
      </div>
      <div className="aspect-[21/9] bg-steel-200 rounded-3xl w-full" />
      <div className="space-y-3 pt-6">
        <div className="h-4 w-full bg-steel-100 rounded" />
        <div className="h-4 w-full bg-steel-100 rounded" />
        <div className="h-4 w-5/6 bg-steel-100 rounded" />
        <div className="h-4 w-4/5 bg-steel-100 rounded" />
      </div>
    </div>
  );
}
