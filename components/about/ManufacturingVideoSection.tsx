"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Factory, ShieldCheck, Sparkles, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoHighlightProps {
  videoConfig: {
    title: string;
    subtitle: string;
    video_url: string;
    caption: string;
    note?: string;
  };
}

export default function ManufacturingVideoSection({ videoConfig }: VideoHighlightProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Handle playback permissions
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
              {/* Video wrapper frame */}
              <div
                onClick={handleTogglePlay}
                className="relative w-full aspect-[9/16] max-h-[580px] sm:max-h-[620px] rounded-2xl overflow-hidden bg-black flex items-center justify-center cursor-pointer group"
              >
                <video
                  ref={videoRef}
                  src={videoConfig.video_url}
                  className="w-full h-full object-contain bg-black"
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Interactive Play Overlay when video is paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-steel-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-all group-hover:bg-steel-950/30">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay();
                      }}
                      className="w-20 h-20 rounded-full bg-navy-600/95 hover:bg-navy-600 text-white flex items-center justify-center transition-all shadow-[0_8px_30px_rgba(26,58,143,0.5)] hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-md mb-4 cursor-pointer"
                      aria-label="Play manufacturing video"
                    >
                      <Play className="w-8 h-8 translate-x-0.5" />
                    </button>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white text-xs font-medium mb-1">
                      <span>Click to watch machine trial</span>
                    </div>
                    <p className="text-[11px] text-steel-300 font-normal">
                      High-definition footage from our Nashik facility
                    </p>
                  </div>
                )}

                {/* Floating Quick Controls when playing */}
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
              <div className="p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                  {videoConfig.caption}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Empirical India</span>
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

            {/* Note on video configuration */}
            <div className="rounded-xl p-3.5 bg-steel-50 border border-steel-200/70 text-[11px] text-steel-500">
              <span className="font-semibold text-steel-700">Video Source:</span> Hosted on Cloudinary and configured in{" "}
              <code className="text-navy-800 bg-white px-1.5 py-0.5 rounded border border-steel-200 font-mono text-[10px]">
                data/02-about.ts → video_highlight.video_url
              </code>
              . Update the link anytime.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
