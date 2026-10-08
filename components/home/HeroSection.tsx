"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Home from "@/data/01-home";

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  supporting_copy: string;
  specs?: string;
  productline?: string;
  category?: string;
  image: {
    src: string;
    alt: string;
  };
  primary_button: string;
  secondary_button: string;
}

export interface HeroNavigationItem {
  id: string;
  label: string;
}

export interface HeroData {
  slides: readonly HeroSlide[];
  transition_label?: string;
  navigation?: readonly HeroNavigationItem[];
  autoplay?: boolean;
  autoplay_interval?: number;
}

// Map slide id to canonical product page routes & RFQ query params
const productRouteMap: Record<string, { productHref: string; contactHref: string; tags: string[] }> = {
  "roll-forming": {
    productHref: "/products/roll-forming-lines",
    contactHref: "/contact?product=roll-forming-lines",
    tags: ["Custom Profiles", "Coil-to-Finished Section", "Automated Lines"],
  },
  "metal-pallets": {
    productHref: "/products/modular-metal-pallets",
    contactHref: "/contact?product=modular-metal-pallets",
    tags: ["Cold Roll-Formed C-Channel", "Custom Load Cases", "Modular Dimensions"],
  },
  "trolley-bag-tubes": {
    productHref: "/products/trolley-bag-tubes",
    contactHref: "/contact?product=trolley-bag-tubes",
    tags: ["Approved Section & Finish", "Precision Lengths", "Trolley-Bag Application"],
  },
};

export default function HeroSection({ hero }: { hero?: HeroData }) {
  const activeHero = hero || (Home.hero as unknown as HeroData);
  const slides = activeHero?.slides || [];
  const slideCount = slides.length;
  const autoplayInterval = activeHero?.autoplay_interval || 4000;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reliable 4-second auto-slide interval
  useEffect(() => {
    if (slideCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideCount);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [slideCount, autoplayInterval]);

  if (slideCount === 0) return null;

  const activeSlide = slides[currentIndex];
  const routeMeta = productRouteMap[activeSlide.id] || {
    productHref: "/products",
    contactHref: `/contact?product=${activeSlide.id}`,
    tags: ["Engineering-Led", "Custom Manufactured", "Industrial Export"],
  };

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden text-white"
      style={{ backgroundColor: "#030712" }}
      aria-label="Empirical India Hero Showcase"
    >
      {/* ── Layer 1: Background Carousel Images (z-0) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              aria-hidden={!isActive}
            >
              <div
                className={cn(
                  "relative w-full h-full transition-transform duration-[6000ms] ease-out",
                  isActive ? "scale-105" : "scale-100"
                )}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Layer 2: Dedicated Balanced Dark Overlays (z-[1]) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Balanced dark tint letting machinery and images shine through clearly (~46% opacity) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(4, 9, 20, 0.46)" }}
        />

        {/* Gentle radial vignette adding focal contrast behind text while preserving image details */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(4, 9, 20, 0.2) 0%, rgba(2, 6, 16, 0.5) 70%, rgba(0, 2, 8, 0.75) 100%)",
          }}
        />

        {/* Top gradient for seamless contrast under navbar */}
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{
            background:
              "linear-gradient(180deg, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.25) 70%, transparent 100%)",
          }}
        />

        {/* Subtle engineering precision grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Bottom gradient fade into page flow */}
        <div
          className="absolute inset-x-0 bottom-0 h-36"
          style={{
            background:
              "linear-gradient(0deg, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.2) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Layer 3: Main Dynamic Content (z-10) with Smooth Initial Entrance ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* 1. Eyebrow Badge — Locked Grid Row */}
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center mb-6">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={`eyebrow-${slide.id}`}
                  className={cn(
                    "col-start-1 row-start-1 flex justify-center transition-opacity duration-700 ease-in-out",
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={!isActive}
                >
                  <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-[0.16em] uppercase bg-slate-900/75 border border-white/25 text-white backdrop-blur-md shadow-xl shadow-black/40">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                    <span className="text-white font-bold text-sm sm:text-md lg:text-lg xl:text-xl">{slide.eyebrow}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Gradient Headline — Locked Grid Row (Height locked to tallest headline so lines below NEVER shift) */}
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full mb-6">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <h1
                  key={`headline-${slide.id}`}
                  className={cn(
                    "col-start-1 row-start-1 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-extrabold tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-4xl transition-opacity duration-700 ease-in-out",
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={!isActive}
                >
                  <span className="bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                    {slide.headline}
                  </span>
                </h1>
              );
            })}
          </div>

          {/* 3. Supporting Copy — Locked Grid Row (Bigger on larger screens, height locked to tallest copy) */}
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full mb-8">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <p
                  key={`copy-${slide.id}`}
                  className={cn(
                    "col-start-1 row-start-1 text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-100/95 leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] transition-opacity duration-700 ease-in-out",
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={!isActive}
                >
                  {slide.supporting_copy}
                </p>
              );
            })}
          </div>

          {/* 4. Product Specs — Locked Grid Row (Clean, Technical, Industrial Attributes) */}
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full mb-10">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const specsText = slide.specs;
              if (!specsText) return null;

              return (
                <div
                  key={`specs-${slide.id}`}
                  className={cn(
                    "col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-700 ease-in-out",
                    isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                  )}
                  aria-hidden={!isActive}
                >
                  <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                    {specsText}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={routeMeta.productHref}
              id="hero-primary-cta"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-navy-700 to-blue-700 hover:from-navy-800 hover:to-blue-800 border border-blue-400/30 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              <span>{activeSlide.primary_button}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={routeMeta.contactHref}
              id="hero-secondary-cta"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              <FileText size={15} className="text-slate-300" />
              <span>{activeSlide.secondary_button}</span>
              <span className="text-xs text-emerald-400 font-mono tracking-tight bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                RFQ
              </span>
            </Link>
          </div>

          {/* Minimal Slide Indicator Dots */}
          <div className="mt-14 flex items-center justify-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none",
                  idx === currentIndex
                    ? "w-8 bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
