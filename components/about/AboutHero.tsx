"use client";
import { siteSEO } from "@/data/seo";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

interface AboutHeroProps {
  introduction: string;
}

export default function AboutHero({ introduction }: AboutHeroProps) {
  return (
    <section className="relative bg-[#f8fafc] pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-steel-200/60">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791535648/about-page-bg-compressed.webp"
          alt="Empirical India manufacturing facility and global engineering reach"
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
      </div>

      {/* Blueprint grid watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badges - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>Industrial Engineering &amp; Manufacturing</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-[11px] sm:text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-navy-700 shrink-0" />
            <span>Nashik, Maharashtra, India</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-[11px] sm:text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-navy-700 shrink-0" />
            <span>Est. 2016</span>
          </div>
        </motion.div>

        {/* Headline & Intro Text - Centered */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
            {siteSEO.pages.about.h1}
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-steel-600 leading-relaxed font-normal">
            {introduction}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm transition-all shadow-sm active:scale-98 text-center"
            >
              <span>Request Technical Discussion</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-medium text-sm transition-all text-center"
            >
              <span>Explore Capabilities</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
