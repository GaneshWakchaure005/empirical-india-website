"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Calendar, MapPin, ArrowRight, Sparkles, Newspaper } from "lucide-react";
import { NewsEventPublic } from "@/types/news-event";
import { formatDate, formatDateRange, estimateReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface FeaturedNewsProps {
  item: NewsEventPublic;
}

export default function FeaturedNews({ item }: FeaturedNewsProps) {
  const [imageError, setImageError] = useState(false);
  const isEvent = item.type === "event";

  const imageUrl = item.featuredImage?.url;
  const hasValidImage = imageUrl && !imageError;

  return (
    <section className="mb-8 sm:mb-10" aria-label="Featured Story">
      <div className="relative rounded-2xl bg-white border border-steel-200/90 shadow-sm overflow-hidden hover:border-blue-400/60 hover:shadow-[0_20px_40px_-12px_rgba(30,75,186,0.22),0_8px_20px_-6px_rgba(220,38,38,0.14)] hover:-translate-y-1.5 transition-all duration-300 group">
        {/* 4-Color Signature Brand Gradient Top Stripe (Thickened) */}
        <div className="h-[10px] w-full bg-gradient-to-r from-[#0f2044] via-[#1e4bba] via-[#7c3aed] to-[#dc2626] transition-all duration-300 group-hover:h-[12px] group-hover:shadow-[0_4px_16px_rgba(30,75,186,0.5)] shrink-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="relative lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-steel-100">
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
                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-steel-200 via-steel-100 to-steel-50 text-steel-400 p-8 text-center select-none">
                <div className="w-14 h-14 rounded-2xl bg-white/90 border border-steel-200 flex items-center justify-center mb-2 shadow-xs text-navy-800">
                  <Newspaper size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-steel-600">
                  Empirical India Feature
                </span>
              </div>
            )}

            {/* Subtle Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-gradient-to-r from-[#0f2044] via-[#2563eb] to-[#7c3aed] text-white shadow-xs backdrop-blur-md">
                <Sparkles size={11} className="text-amber-300" />
                Featured Spotlight
              </span>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Reading Time */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
                    isEvent
                      ? "bg-amber-100 text-amber-900 border border-amber-200"
                      : "bg-navy-100 text-navy-900 border border-navy-200"
                  )}
                >
                  {isEvent ? <Calendar size={11} /> : <Newspaper size={11} />}
                  {isEvent ? "Industry Event" : "Company News"}
                </span>

                {item.category?.name && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-steel-100 text-steel-700 border border-steel-200">
                    {item.category.name}
                  </span>
                )}

                <span className="text-xs text-steel-400 font-medium ml-auto">
                  {estimateReadingTime(item.content)}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-steel-900 tracking-tight leading-snug mb-3 group-hover:text-blue-700 transition-colors">
                <Link href={`/news/${item.slug}`}>{item.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-4 line-clamp-3">
                {item.excerpt}
              </p>

              {/* Event Schedule Info if Event */}
              {isEvent && item.eventDetails && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 space-y-1.5 text-xs">
                  {item.eventDetails.startDate && (
                    <div className="flex items-center gap-1.5 text-amber-950 font-semibold">
                      <Calendar size={13} className="text-amber-700 shrink-0" />
                      <span>
                        {formatDateRange(
                          item.eventDetails.startDate,
                          item.eventDetails.endDate
                        )}
                      </span>
                    </div>
                  )}
                  {item.eventDetails.location && (
                    <div className="flex items-center gap-1.5 text-steel-700">
                      <MapPin size={13} className="text-steel-500 shrink-0" />
                      <span>{item.eventDetails.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-steel-100 flex items-center justify-between gap-4 mt-auto">
              <div className="text-xs text-steel-500 font-medium">
                Published:{" "}
                <time
                  dateTime={
                    item.publishedAt
                      ? new Date(item.publishedAt).toISOString()
                      : ""
                  }
                  className="font-semibold text-steel-700"
                >
                  {formatDate(item.publishedAt || item.createdAt)}
                </time>
              </div>

              <Link
                href={`/news/${item.slug}`}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0f2044] via-[#1e4bba] to-[#2563eb] hover:from-[#152d6e] hover:via-[#2563eb] hover:to-[#dc2626] shadow-xs hover:shadow-md transition-all duration-300 group/btn"
              >
                <span>{isEvent ? "Event Details" : "Read Story"}</span>
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
