"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
} from "lucide-react";

interface VideoConfig {
  title?: string;
  subtitle?: string;
  video_url: string;
  caption: string;
  note?: string;
}

interface ApproachSectionProps {
  intro: string;
  approach: string;
  videoConfig?: VideoConfig;
}

const DEFAULT_VIDEO_URL =
  "https://www.youtube.com/embed/i4ylvVyuIj4?autoplay=0&controls=1&rel=0";
const DEFAULT_CAPTION =
  "Real-time production sequence of roll forming line at Empirical India.";

export default function ApproachSection({
  intro,
  approach,
  videoConfig,
}: ApproachSectionProps) {
  const videoUrl = DEFAULT_VIDEO_URL;
  const caption = DEFAULT_CAPTION;

  return (
    <section
      className="relative bg-white py-20 sm:py-28 overflow-hidden select-text border-b border-steel-200/60"
      aria-labelledby="approach-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Narrative & Manufacturing Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Header badges: About heading, location, est. year */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-7">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-navy-50/90 border border-navy-300 text-navy-950 text-sm sm:text-base font-extrabold tracking-wide uppercase shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-navy-700 animate-pulse" />
                <span>About Empirical India</span>
              </span>

              <span className="inline-flex items-center gap-2 px-4.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-steel-100/90 border border-steel-300/80 text-steel-800 text-sm sm:text-base font-semibold shadow-2xs">
                <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-navy-700 shrink-0" />
                <span>Nashik Plant, Maharashtra</span>
              </span>

              <span className="inline-flex items-center gap-2 px-4.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-steel-100/90 border border-steel-300/80 text-steel-800 text-sm sm:text-base font-semibold shadow-2xs">
                <Calendar className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-navy-700 shrink-0" />
                <span>Est. 2016</span>
              </span>
            </div>

            <h2
              id="approach-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-steel-900 tracking-tight mb-6 leading-tight"
            >
              Engineering clarity from the first conversation.
            </h2>

            <p className="text-base text-steel-600 leading-relaxed mb-4">
              {intro}
            </p>

            <p className="text-base text-steel-500 leading-relaxed mb-8">
              {approach}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm transition-all shadow-sm active:scale-98 group"
              >
                <span>Learn about Empirical India</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </motion.div>

          {/* Right: Cloudinary Video Box (Same as About page) */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="w-full max-w-sm sm:max-w-md rounded-3xl border border-steel-200/90 bg-steel-950 p-2 sm:p-2.5 shadow-[0_16px_45px_rgba(15,23,42,0.12)] relative overflow-hidden">
              {/* Video wrapper frame */}
              <div
                className="relative w-full aspect-[9/16] max-h-[500px] sm:max-h-[540px] rounded-2xl overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
              >
                <iframe
                  src={videoUrl}
                  title={caption}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Caption */}
              <div className="p-2.5 sm:p-3 text-center">
                <p className="text-[11px] sm:text-sm text-gray-600 font-semibold leading-relaxed line-clamp-2">
                  {caption}
                </p>
                <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Empirical India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
