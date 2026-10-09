"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogsContent } from "@/data/10-blogs";
import { ChevronRight, Layers, Cog, Box, Sparkles,SolarPanel } from "lucide-react";

export default function BlogsHero() {
  const { hero } = BlogsContent;

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 lg:pb-20 overflow-hidden border-b border-steel-200 bg-white select-none">
      {/* ── Background Photograph (Pastel Waves of Ideas & Insights) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={hero.backgroundImage}
          alt="Empirical India Technical Blogs and Industrial Insights"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-1000"
        />

      
      </div>

      {/* ── Foreground Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center mb-5 text-xs font-semibold text-steel-600"
        >
          <ol className="inline-flex items-center space-x-1.5 sm:space-x-2">
            <li>
              <Link
                href="/"
                className="text-steel-600 hover:text-navy-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-steel-400">
              <ChevronRight size={13} />
            </li>
            <li aria-current="page">
              <span className="text-navy-900 font-bold">Blogs</span>
            </li>
          </ol>
        </nav>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-steel-200 text-navy-900 text-xs font-semibold tracking-wide backdrop-blur-md shadow-xs mb-4">
          <Sparkles size={12} className="text-blue-600 animate-pulse" />
          <span>{hero.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-navy-900 tracking-tight leading-[1.14] mb-4">
          {hero.title}
        </h1>

        {/* Descriptive Subtitle */}
        <p className="text-base sm:text-lg text-steel-700 font-medium max-w-2xl mx-auto leading-relaxed mb-7">
          {hero.subtitle}
        </p>

        {/* Core Business Lines Indicator Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto text-xs">
          <Link
            href="/products/roll-forming-lines"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-steel-200 text-steel-800 font-medium hover:border-navy-600 hover:text-navy-900 backdrop-blur-md shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Cog size={13} className="text-navy-700 shrink-0" />
            <span>Roll-Forming Lines</span>
          </Link>

          <Link
            href="/products/modular-metal-pallets"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-steel-200 text-steel-800 font-medium hover:border-navy-600 hover:text-navy-900 backdrop-blur-md shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Box size={13} className="text-navy-700 shrink-0" />
            <span>Modular Metal Pallets</span>
          </Link>

          <Link
            href="/products/trolley-bag-tubes"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-steel-200 text-steel-800 font-medium hover:border-navy-600 hover:text-navy-900 backdrop-blur-md shadow-xs transition-all hover:-translate-y-0.5"
          >
            <Layers size={13} className="text-blue-600 shrink-0" />
            <span>Trolley-Bag Tubes</span>
          </Link>

          <Link
            href="/products/solar-structures"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 border border-steel-200 text-steel-800 font-medium hover:border-navy-600 hover:text-navy-900 backdrop-blur-md shadow-xs transition-all hover:-translate-y-0.5"
          >
            <SolarPanel size={13} className="text-blue-600 shrink-0" />
            <span>Solar Structures</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
