"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  Mail,
  FileText,
  ArrowRight,
  Link2,
  BookOpen,
  Tag,
} from "lucide-react";
import { BlogPublic } from "@/types/blog";
import { fetchBlogBySlug, fetchBlogs } from "@/lib/api/blogs";
import { formatDate, estimateReadingTime } from "@/lib/format";
import BlogCard from "./BlogCard";
import { BlogErrorState } from "./BlogStateViews";
import BlogEnquiryCTA from "./BlogEnquiryCTA";

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [item, setItem] = useState<BlogPublic | null>(null);
  const [relatedItems, setRelatedItems] = useState<BlogPublic[]>([]);
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
      const data = await fetchBlogBySlug(slug);
      if (!data) {
        setItem(null);
        return;
      }
      setItem(data);

      // Fetch related blogs (excluding current)
      try {
        const relatedRes = await fetchBlogs({
          limit: 4,
          category: data.category?.slug,
        });
        const filtered = relatedRes.data.filter((r) => r.id !== data.id).slice(0, 3);
        setRelatedItems(filtered);
      } catch (relatedErr) {
        console.warn("Could not load related blogs:", relatedErr);
      }
    } catch (err: any) {
      setError(
        err.message || "Unable to load the requested blog article. Please try again."
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

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <BlogErrorState message={error} onRetry={() => setRetryCount((c) => c + 1)} />
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-navy-700 hover:text-navy-900"
        >
          <ArrowLeft size={16} />
          Back to all Blogs &amp; Articles
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-steel-100 border border-steel-200 flex items-center justify-center mx-auto mb-6 text-steel-400">
          <BookOpen size={32} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-steel-900 mb-3">
          Article Not Found
        </h1>
        <p className="text-base text-steel-600 mb-8 max-w-md mx-auto">
          The requested engineering article does not exist or may have been updated.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 transition-all shadow-md"
        >
          <ArrowLeft size={16} />
          Back to Blogs &amp; Articles
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
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-steel-500 overflow-x-auto no-scrollbar"
          >
            <Link href="/" className="hover:text-navy-900 transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight size={12} className="shrink-0 text-steel-400" />
            <Link href="/blogs" className="hover:text-navy-900 transition-colors shrink-0">
              Blogs
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
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-steel-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>All Articles &amp; Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 sm:mb-12">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            {item.category?.name ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-100 text-navy-900 border border-navy-200">
                {item.category.name}
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-steel-100 text-steel-700 border border-steel-200">
                Technical Article
              </span>
            )}

            {item.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-red-brand text-white shadow-xs">
                <Sparkles size={11} />
                Featured Article
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
              {item.publishedAt && (
                <div>
                  <span className="text-steel-400 font-medium">Published: </span>
                  <time
                    dateTime={new Date(item.publishedAt).toISOString()}
                    className="font-bold text-steel-700"
                  >
                    {formatDate(item.publishedAt)}
                  </time>
                </div>
              )}

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
                href={`mailto:?subject=${shareTitle}&body=Read%20this%20article%20from%20Empirical%20India:%20${encodeURIComponent(
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
                <BookOpen size={56} className="text-steel-400/80 mb-3" />
                <span className="text-sm font-bold uppercase tracking-wider text-steel-600">
                  Empirical India Article
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
            <span className="text-xs font-bold text-steel-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Tag size={13} />
              Topics:
            </span>
            {item.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blogs?search=${encodeURIComponent(tag)}`}
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
              Have a profile drawing or pallet load case to review?
            </h3>
            <p className="text-sm text-steel-600">
              Our engineering team in Nashik evaluates custom roll-forming tooling, welded pallet structures, and precision tube tolerances.
            </p>
          </div>
          <Link
            href="/contact?topic=blogs"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-navy-700 hover:bg-navy-800 shadow-md transition-all"
          >
            <FileText size={15} />
            <span>Request a Quote</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Related Articles */}
        {relatedItems.length > 0 && (
          <section className="mt-20 pt-12 border-t border-steel-200" aria-labelledby="related-blogs-heading">
            <div className="flex items-center justify-between mb-8">
              <h2 id="related-blogs-heading" className="text-2xl font-bold text-steel-900">
                Related Technical Articles
              </h2>
              <Link
                href="/blogs"
                className="text-xs font-bold text-navy-700 hover:text-navy-900 inline-flex items-center gap-1"
              >
                <span>View all articles</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((rel) => (
                <BlogCard key={rel.id} item={rel} />
              ))}
            </div>
          </section>
        )}

        {/* Final General Enquiry Section */}
        <BlogEnquiryCTA />
      </div>
    </article>
  );
}

function BlogDetailSkeleton() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 space-y-8 animate-pulse"
      aria-busy="true"
    >
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
