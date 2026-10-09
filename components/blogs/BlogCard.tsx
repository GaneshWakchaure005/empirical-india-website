"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Calendar, ArrowRight, BookOpen, Sparkles, Clock, Tag } from "lucide-react";
import { BlogPublic } from "@/types/blog";
import { formatDate, estimateReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  item: BlogPublic;
  priority?: boolean;
}

export default function BlogCard({ item, priority = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = item.featuredImage?.url;
  const hasValidImage = imageUrl && !imageError;

  return (
    <article className="group flex flex-col h-full rounded-2xl bg-white border border-steel-200/90 hover:border-blue-400/60 hover:shadow-[0_20px_40px_-12px_rgba(30,75,186,0.22),0_8px_20px_-6px_rgba(220,38,38,0.14)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* 4-Color Signature Brand Gradient Top Stripe */}
      <div className="h-[9px] sm:h-[10px] w-full bg-gradient-to-r from-[#0f2044] via-[#1e4bba] via-[#7c3aed] to-[#dc2626] transition-all duration-300 group-hover:h-[12px] group-hover:shadow-[0_4px_14px_rgba(30,75,186,0.5)] shrink-0" />

      {/* Cover Image Container */}
      <Link
        href={`/blogs/${item.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-steel-100 shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        {hasValidImage ? (
          <>
            <Image
              src={imageUrl}
              alt={item.featuredImage?.alt || item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            {/* Subtle dark gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </>
        ) : (
          /* Branded Industrial Fallback Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-steel-100 via-steel-50 to-steel-200/80 text-steel-400 p-6 text-center select-none">
            <div className="w-12 h-12 rounded-xl bg-white/90 border border-steel-200 flex items-center justify-center mb-2 shadow-xs text-navy-800">
              <BookOpen size={22} />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-steel-500">
              Empirical India Engineering
            </span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.category?.name ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-navy-900/95 text-white shadow-xs backdrop-blur-md">
                {item.category.name}
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-steel-800 text-white shadow-xs backdrop-blur-md">
                Article
              </span>
            )}
          </div>

          {item.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-white shadow-xs">
              <Sparkles size={9} />
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-5.5">
        {/* Category & Read Time Sub-meta */}
        <div className="flex items-center justify-between text-xs text-steel-500 mb-2.5">
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-steel-500">
            <Clock size={12} className="text-steel-400" />
            {estimateReadingTime(item.content)}
          </span>

          {item.publishedAt && (
            <time
              dateTime={new Date(item.publishedAt).toISOString()}
              className="flex items-center gap-1 text-[11.5px] font-medium text-steel-500"
            >
              <Calendar size={12} className="text-steel-400" />
              {formatDate(item.publishedAt)}
            </time>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-steel-900 group-hover:text-blue-700 transition-colors leading-snug mb-2 line-clamp-2">
          <Link href={`/blogs/${item.slug}`} className="hover:underline focus:outline-none">
            {item.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-steel-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {item.excerpt}
        </p>

        {/* Tags if present */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-steel-100/90 text-steel-700 border border-steel-200/60"
              >
                <Tag size={9} className="text-steel-400" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer */}
        <div className="pt-3.5 border-t border-steel-100 flex items-center justify-between text-xs text-steel-500 mt-auto">
          <div className="text-[11.5px] font-medium text-steel-500 truncate max-w-[140px]">
            {item.author?.name ? `By ${item.author.name}` : "By Empirical Engineers"}
          </div>

          <Link
            href={`/blogs/${item.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-navy-700 bg-steel-50 hover:bg-gradient-to-r hover:from-[#0f2044] hover:via-[#1e4bba] hover:to-[#dc2626] hover:text-white transition-all duration-300 group/btn shadow-2xs hover:shadow-sm"
            aria-label={`Read ${item.title}`}
          >
            <span>Read More</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
