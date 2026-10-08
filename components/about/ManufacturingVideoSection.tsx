"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Factory, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoHighlightProps {
  videoConfig: {
    title: string;
    subtitle: string;
    video_url: string;
    embed_id: string;
    caption: string;
    note?: string;
  };
}

/**
 * Extracts YouTube video ID from various formats:
 * - https://youtube.com/shorts/nWcMKPUfsuk?si=...
 * - https://www.youtube.com/watch?v=...
 * - https://youtu.be/...
 */
function extractYouTubeId(url: string, defaultId: string): string {
  if (!url) return defaultId;
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) return youtuBeMatch[1];

  return defaultId;
}

export default function ManufacturingVideoSection({ videoConfig }: VideoHighlightProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const videoId = extractYouTubeId(videoConfig.video_url, videoConfig.embed_id || "nWcMKPUfsuk");
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`;

  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Factory className="w-3.5 h-3.5 text-navy-700" />
            <span>Manufacturing In Action</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            {videoConfig.title}
          </h2>

          <p className="mt-3.5 text-base text-steel-600 leading-relaxed">
            {videoConfig.subtitle}
          </p>
        </motion.div>

        {/* Video & Engineering Walkthrough Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Video Player Box */}
          <motion.div
            className="lg:col-span-7 flex justify-center"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-full rounded-3xl border border-steel-200/90 bg-steel-950 p-2 sm:p-3 shadow-[0_16px_50px_rgba(15,23,42,0.12)] relative overflow-hidden">
              {/* Aspect ratio frame (supports 9:16 Shorts or 16:9 responsive embed) */}
              <div className="relative w-full aspect-[9/16] max-h-[580px] sm:max-h-[620px] rounded-2xl overflow-hidden bg-steel-900">
                {isPlaying ? (
                  <iframe
                    src={embedUrl}
                    title="Empirical India Manufacturing & Machinery Demonstration"
                    className="w-full h-full border-0 rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-steel-900 to-navy-950 text-white p-6 text-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-navy-600 hover:bg-navy-500 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105 mb-4 group"
                      aria-label="Play manufacturing video"
                    >
                      <Play className="w-7 h-7 translate-x-0.5 group-hover:scale-110 transition-transform" />
                    </button>
                    <p className="text-sm font-medium text-steel-200">
                      Click to watch live machinery in action
                    </p>
                  </div>
                )}
              </div>

              {/* Caption & Source Note */}
              <div className="p-3 sm:p-4 text-center">
                <p className="text-xs text-steel-300 font-normal leading-relaxed">
                  {videoConfig.caption}
                </p>
                <div className="mt-2.5 flex items-center justify-center gap-3">
                  <a
                    href={videoConfig.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-navy-300 hover:text-white transition-colors"
                  >
                    <span>Open directly on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Technical Observations & Capabilities */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div>
              <span className="text-xs font-bold text-navy-700 tracking-wider uppercase block mb-1">
                Plant Floor Focus
              </span>
              <h3 className="text-2xl font-bold text-steel-900 tracking-tight">
                What this demonstration illustrates
              </h3>
              <p className="mt-2.5 text-sm text-steel-600 leading-relaxed">
                Roll-forming machinery requires precision alignment across every progressive forming station to eliminate profile twisting, bow, and uneven stress marks.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-steel-200/80 bg-[#f8fafc] hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-steel-900">
                      Progressive Stand Synchronization
                    </h4>
                    <p className="text-xs text-steel-500 mt-1 leading-relaxed">
                      Gradual angle bending calibrated through custom roll tooling sets to form complex structural profiles without cracking or surface galling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-steel-200/80 bg-[#f8fafc] hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-steel-900">
                      Heavy-Duty Structural Bases
                    </h4>
                    <p className="text-xs text-steel-500 mt-1 leading-relaxed">
                      Solid ground base plates, heavy shafts, and rigid stands engineered to maintain repeatable tolerances over long production runs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-steel-200/80 bg-[#f8fafc] hover:bg-white transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-steel-900">
                      In-House Tooling Trials & Acceptance
                    </h4>
                    <p className="text-xs text-steel-500 mt-1 leading-relaxed">
                      Every line undergoes testing and profile sample verification against customer-approved drawings prior to packaging and dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on how to update video URL */}
            <div className="rounded-xl p-3.5 bg-steel-50 border border-steel-200/70 text-[11px] text-steel-500">
              <span className="font-semibold text-steel-700">Video Source:</span> Centralized in{" "}
              <code className="text-navy-800 bg-white px-1.5 py-0.5 rounded border border-steel-200 font-mono text-[10px]">
                data/02-about.ts → video_highlight
              </code>
              . Update the link anytime to showcase updated machinery.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
