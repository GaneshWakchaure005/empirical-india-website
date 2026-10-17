"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Factory,
  Layers3,
  ShieldCheck,
  Cpu,
  FileSpreadsheet,
} from "lucide-react";

interface TrustMetric {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

interface ProductsPageHeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  trustMetrics: readonly TrustMetric[];
  pills: readonly string[];
}

export default function ProductsPageHero({
  eyebrow,
  heading,
  description,
  trustMetrics,
  pills,
}: ProductsPageHeroProps) {
  return (
    <section className="relative bg-[#f8fafc] pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden border-b border-steel-200">
      {/* Background Hero Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/about-page-bg.png"
          alt="Empirical India engineering facility background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none opacity-40"
        />
        {/* Soft bottom fade to ensure clean separation */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-medium text-steel-500 mb-6"
        >
          <Link
            href="/"
            className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Home
          </Link>
          <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
          <span className="text-navy-900 font-semibold" aria-current="page">
            Products &amp; Solutions
          </span>
        </nav>

        {/* Top Badges & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <Factory className="w-3.5 h-3.5 text-navy-700" />
            <span>Nashik Manufacturing Plant</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-navy-700" />
            <span>Drawing &amp; Specification Verified</span>
          </div>
        </motion.div>

        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          <motion.div
            className="lg:col-span-7 xl:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.15]">
              {heading}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-steel-600 leading-relaxed font-normal max-w-2xl">
              {description}
            </p>

            {/* Quick Core Verticals Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-steel-400 uppercase tracking-wider mr-1">
                Scope:
              </span>
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white border border-steel-200 text-steel-700 shadow-2xs"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA Group & Quick Anchors */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm transition-all shadow-sm active:scale-98"
              >
                <span>Request a Technical Quote</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="#business-lines-heading"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-steel-50 text-steel-700 font-medium text-sm border border-steel-200 transition-all shadow-2xs active:scale-98"
              >
                <Layers3 size={16} className="text-navy-700" />
                <span>Explore Manufacturing Lines</span>
              </a>

              <a
                href="#rfq-guide"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-steel-600 hover:text-navy-900 text-sm font-semibold transition-colors"
              >
                <FileSpreadsheet size={15} className="text-navy-700" />
                <span>RFQ Drawing Guidelines</span>
              </a>
            </div>
          </motion.div>

          {/* Right Trust Stats Grid — Fully responsive with min-w-0 and break-words */}
          <motion.div
            className="lg:col-span-5 xl:col-span-5 w-full min-w-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-steel-200/90 bg-white/95 p-5 sm:p-6 lg:p-6 xl:p-7 shadow-lg shadow-steel-900/5 backdrop-blur-md overflow-hidden min-w-0">
              <div className="flex items-center justify-between pb-3.5 border-b border-steel-100 mb-4 sm:mb-5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-navy-800">
                  Manufacturing Standards
                </span>
                <Cpu size={17} className="text-navy-700 shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {trustMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100/90 flex flex-col justify-between min-w-0 overflow-hidden"
                  >
                    <span className="text-lg sm:text-xl xl:text-2xl font-black text-navy-900 font-mono tracking-tight break-words leading-tight">
                      {metric.value}
                    </span>
                    <div className="mt-2 min-w-0">
                      <p className="text-xs font-bold text-steel-800 leading-snug break-words">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[11px] text-steel-500 leading-snug break-words">
                        {metric.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-steel-100 flex items-center justify-between text-xs text-steel-500 gap-2">
                <span className="truncate">Nashik Plant, India</span>
                <span className="font-semibold text-navy-700 whitespace-nowrap shrink-0">
                  Drawing-Led Solutions
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
