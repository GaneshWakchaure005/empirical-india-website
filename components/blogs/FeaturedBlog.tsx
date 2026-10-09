"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Calendar, ArrowRight, Sparkles, BookOpen, Clock, Tag } from "lucide-react";
import { BlogPublic } from "@/types/blog";
import { formatDate, estimateReadingTime } from "@/lib/format";

interface FeaturedBlogProps {
  item: BlogPublic;
}

export default function FeaturedBlog({ item }: FeaturedBlogProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = item.featuredImage?.url;
  const hasValidImage = imageUrl && !imageError;

  return (
    <section className="mb-8 sm:mb-10" aria-label="Featured Engineering Article">
      <div className="relative rounded-2xl bg-white border border-steel-200/90 shadow-xs overflow-hidden hover:border-blue-400/60 hover:shadow-[0_20px_40px_-12px_rgba(30,75,186,0.22),0_8px_20px_-6px_rgba(220,38,38,0.14)] hover:-translate-y-1 transition-all duration-300 group">
        {/* 4-Color Signature Brand Gradient Top Stripe */}
        <div className="h-[10px] w-full bg-gradient-to-r from-[#0f2044] via-[#1e4bba] via-[#7c3aed] to-[#dc2626] transition-all duration-300 group-hover:h-[12px] group-hover:shadow-[0_4px_16px_rgba(30,75,186,0.5)] shrink-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="relative lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[350px] overflow-hidden bg-steel-100">
            {hasValidImage ? (
              <>
                <Image
                  src={imageUrl}
                  alt={item.featuredImage?.alt || item.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-steel-200 via-steel-100 to-steel-50 text-steel-400 p-8 text-center select-none">
                <div className="w-14 h-14 rounded-2xl bg-white/90 border border-steel-200 flex items-center justify-center mb-2 shadow-xs text-navy-800">
                  <BookOpen size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-steel-600">
                  Empirical India Feature
                </span>
              </div>
            )}

            {/* Floating Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-[#0f2044] via-[#2563eb] to-[#7c3aed] text-white shadow-xs backdrop-blur-md">
                <Sparkles size={11} className="text-amber-300" />
                Featured Article
              </span>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Reading Time */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {item.category?.name && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-navy-100 text-navy-900 border border-navy-200">
                    {item.category.name}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs text-steel-500 font-medium ml-auto">
                  <Clock size={12} className="text-steel-400" />
                  {estimateReadingTime(item.content)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-steel-900 tracking-tight leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-4 line-clamp-3">
                {item.excerpt}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-steel-50 text-steel-700 border border-steel-200"
                    >
                      <Tag size={9} className="text-steel-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-steel-100 flex items-center justify-between gap-4 mt-auto">
              <div className="text-xs text-steel-500 font-medium">
                {item.publishedAt ? (
                  <time
                    dateTime={new Date(item.publishedAt).toISOString()}
                    className="flex items-center gap-1 text-steel-600 font-semibold"
                  >
                    <Calendar size={12} className="text-steel-400" />
                    {formatDate(item.publishedAt)}
                  </time>
                ) : (
                  <span>Published Article</span>
                )}
              </div>

              <Link
                href={`/blogs/${item.slug}`}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0f2044] via-[#1e4bba] to-[#2563eb] hover:from-[#152d6e] hover:via-[#2563eb] hover:to-[#dc2626] shadow-xs hover:shadow-md transition-all duration-300 group/btn"
              >
                <span>Read Full Article</span>
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
