"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  Shield,
  Cog,
  Handshake,
  Play,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
} from "lucide-react";

interface AboutValue {
  value: string;
  meaning_in_practice: string;
}

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
  values: readonly AboutValue[];
  videoConfig?: VideoConfig;
}

const valueIcons = [ClipboardList, Cog, Shield, Handshake];

const DEFAULT_VIDEO_URL =
  "https://res.cloudinary.com/f4j2yhrc/video/upload/v1791530951/roll_forming_video.mp4";
const DEFAULT_CAPTION =
  "Real-time production sequence of roll forming line at Empirical India.";

export default function ApproachSection({
  intro,
  approach,
  values,
  videoConfig,
}: ApproachSectionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = DEFAULT_VIDEO_URL;
  const caption =  DEFAULT_CAPTION;

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Playback interaction handling
        });
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

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
                onClick={handleTogglePlay}
                className="relative w-full aspect-[9/16] max-h-[500px] sm:max-h-[540px] rounded-2xl overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain bg-black"
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Interactive Play Overlay when paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-steel-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-all group-hover:bg-steel-950/30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay();
                      }}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-navy-600/95 hover:bg-navy-600 text-white flex items-center justify-center transition-all shadow-[0_8px_30px_rgba(26,58,143,0.5)] hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-md mb-3 cursor-pointer"
                      aria-label="Play manufacturing video"
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" />
                    </button>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white text-xs font-medium mb-1">
                      <span>Click to watch machine in action</span>
                    </div>
                    <p className="text-[10px] text-steel-300 font-normal">
                      Cold roll-forming trial at our Nashik plant
                    </p>
                  </div>
                )}

                {/* Floating Quick Mute Toggle when playing */}
                {isPlaying && (
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
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

        {/* Bottom: 4 Engineering Values */}
        <div className="mt-16 pt-12 border-t border-steel-200/70">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono font-bold text-navy-700 uppercase tracking-widest">
              Core Principles
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-steel-900 tracking-tight mt-1">
              How Empirical India approaches each engineering enquiry
            </h3>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {values.map((val, index) => {
              const Icon = valueIcons[index] ?? ArrowRight;
              return (
                <motion.div
                  key={val.value}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: "easeOut" },
                    },
                  }}
                  className="p-5 rounded-2xl border border-steel-200/80 bg-[#f8fafc] hover:border-steel-300 hover:bg-white hover:shadow-md card-lift transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-navy-700/8 border border-navy-700/15 mb-3"
                      aria-hidden="true"
                    >
                      <Icon size={18} className="text-navy-700" />
                    </div>
                    <span className="block text-[10px] font-mono font-bold text-steel-400 mb-0.5">
                      0{index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-steel-800 mb-1.5">
                      {val.value}
                    </h4>
                    <p className="text-xs text-steel-500 leading-relaxed font-normal">
                      {val.meaning_in_practice}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
