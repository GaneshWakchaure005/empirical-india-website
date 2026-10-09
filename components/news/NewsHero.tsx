"use client";

import Image from "next/image";
import { NewsAndEvents } from "@/data/10-news-and-events";
import { Factory, Calendar, Wrench } from "lucide-react";

export default function NewsHero() {
  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden select-none border-b border-steel-200 bg-white">
      {/* ── Background Photograph ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791535656/news-page-bg-compressed.webp"
          alt="Empirical India News and Events"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Foreground Content (Dark Typography) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-steel-200 text-navy-900 text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Manufacturing &amp; Engineering Bulletin</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-navy-900 tracking-tight leading-[1.14] mb-4">
          News &amp; Events
        </h1>

        {/* Subtitle from centralized content brief */}
        <p className="text-base sm:text-lg text-steel-800 font-medium max-w-2xl mx-auto leading-relaxed mb-7">
          {NewsAndEvents.draft_news_teaser}
        </p>

        {/* Facility & Topic Indicator Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto text-xs">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-steel-200 text-steel-800 font-medium backdrop-blur-md shadow-sm">
            <Factory size={13} className="text-navy-700 shrink-0" />
            <span>Nashik Facility Updates</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-steel-200 text-steel-800 font-medium backdrop-blur-md shadow-sm">
            <Wrench size={13} className="text-navy-700 shrink-0" />
            <span>Machine Commissioning</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/90 border border-steel-200 text-steel-800 font-medium backdrop-blur-md shadow-sm">
            <Calendar size={13} className="text-amber-600 shrink-0" />
            <span>Expos &amp; Buyer Meets</span>
          </div>
        </div>
      </div>
    </section>
  );
}
