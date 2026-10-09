"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IndustryCard from "@/components/industries/IndustryCard";
import type { IndustryItem } from "@/data/08-industries";

interface IndustriesGridSectionProps {
  industries: readonly IndustryItem[];
}

export default function IndustriesGridSection({ industries }: IndustriesGridSectionProps) {
  // Desktop hover state: null by default so all cards have equal width
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mobile/tablet tap state: defaults to first item on mobile so users immediately see capability details
  const [tappedId, setTappedId] = useState<string | null>(industries[0]?.id || null);

  return (
    <section
      id="industry-catalog"
      className="relative bg-gradient-to-b from-[#080d19] via-[#060a14] to-[#04070e] pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28 overflow-hidden select-none"
      aria-labelledby="industries-grid-heading"
    >
      {/* ─── Top Border Divider ─── */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-slate-800"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        aria-hidden="true"
      />

      {/* Top Ambient Glow contained inside the section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[180px] bg-gradient-to-b from-blue-900/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom transition line to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800/80 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Reference — Clean, authoritative, no redundant H1 repetition */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2
            id="industries-grid-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase"
          >
            INDUSTRIES WE SERVE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-normal max-w-xl mx-auto leading-relaxed">
            Hover to explore our engineering capabilities across each industry.
          </p>
        </motion.div>

        {/* ─── Expanding Cards Container ─── */}
        <div
          onMouseLeave={() => setHoveredId(null)}
          className="flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3 lg:gap-3.5 w-full lg:h-[530px] xl:h-[560px]"
        >
          {industries.map((item, idx) => (
            <IndustryCard
              key={item.id}
              industry={item}
              isHovered={hoveredId === item.id}
              isAnyHovered={hoveredId !== null}
              isTapped={tappedId === item.id}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => {
                // Handled at container level for smooth resets
              }}
              onToggle={() => {
                setTappedId((prev) => (prev === item.id ? null : item.id));
              }}
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
