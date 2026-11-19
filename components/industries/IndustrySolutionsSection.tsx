"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cylinder, Package, Settings } from "lucide-react";
import type { RelevantSolution } from "@/data/08-industries";

interface IndustrySolutionsSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  solutions: readonly RelevantSolution[];
}

const iconMap: Record<string, React.ElementType> = {
  "roll-forming": Settings,
  "metal-pallets": Package,
  tubes: Cylinder,
};

interface SolutionTheme {
  gradientBorder: string;
  ambientGlow: string;
  subtleBorder: string;
  spotlight: string;
  badgePill: string;
  iconBaseBg: string;
  iconHoverGradient: string;
  iconBaseColor: string;
  subtitleColor: string;
  checkColor: string;
  chipHover: string;
  buttonHover: string;
  stepTag: string;
}

const solutionThemes: Record<string, SolutionTheme> = {
  "roll-forming-lines": {
    gradientBorder: "from-blue-600 via-indigo-500 to-cyan-400",
    ambientGlow: "from-blue-600/30 via-indigo-500/20 to-cyan-400/25",
    subtleBorder: "from-blue-500/20 via-indigo-500/15 to-cyan-500/20",
    spotlight: "bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_65%)]",
    badgePill: "bg-blue-50 border-blue-200/80 text-blue-800",
    iconBaseBg: "bg-blue-50/90 border-blue-100",
    iconHoverGradient:
      "group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]",
    iconBaseColor: "text-blue-700",
    subtitleColor: "text-blue-700",
    checkColor: "text-blue-600",
    chipHover: "group-hover:border-blue-200/90 group-hover:bg-blue-50/60 group-hover:text-blue-900",
    buttonHover:
      "hover:bg-gradient-to-r hover:from-navy-900 hover:to-blue-900 hover:shadow-md hover:shadow-blue-950/20",
    stepTag: "01",
  },
  "modular-metal-pallets": {
    gradientBorder: "from-amber-500 via-orange-500 to-yellow-400",
    ambientGlow: "from-amber-500/30 via-orange-500/20 to-yellow-400/25",
    subtleBorder: "from-amber-500/20 via-orange-500/15 to-yellow-500/20",
    spotlight: "bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08),transparent_65%)]",
    badgePill: "bg-amber-50 border-amber-200/80 text-amber-800",
    iconBaseBg: "bg-amber-50/90 border-amber-100",
    iconHoverGradient:
      "group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_16px_rgba(245,158,11,0.35)]",
    iconBaseColor: "text-amber-700",
    subtitleColor: "text-amber-700",
    checkColor: "text-amber-600",
    chipHover: "group-hover:border-amber-200/90 group-hover:bg-amber-50/60 group-hover:text-amber-900",
    buttonHover:
      "hover:bg-gradient-to-r hover:from-navy-900 hover:to-amber-950 hover:shadow-md hover:shadow-amber-950/20",
    stepTag: "02",
  },
  "solar-structures": {
    gradientBorder: "from-sky-500 via-blue-500 to-indigo-400",
    ambientGlow: "from-sky-500/30 via-blue-500/20 to-indigo-400/25",
    subtleBorder: "from-sky-500/20 via-blue-500/15 to-indigo-500/20",
    spotlight: "bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.08),transparent_65%)]",
    badgePill: "bg-sky-50 border-sky-200/80 text-sky-800",
    iconBaseBg: "bg-sky-50/90 border-sky-100",
    iconHoverGradient:
      "group-hover:bg-gradient-to-br group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)]",
    iconBaseColor: "text-sky-700",
    subtitleColor: "text-sky-700",
    checkColor: "text-sky-600",
    chipHover: "group-hover:border-sky-200/90 group-hover:bg-sky-50/60 group-hover:text-sky-900",
    buttonHover:
      "hover:bg-gradient-to-r hover:from-navy-900 hover:to-sky-950 hover:shadow-md hover:shadow-sky-950/20",
    stepTag: "03",
  },
  "trolley-bag-tubes": {
    gradientBorder: "from-teal-500 via-emerald-500 to-cyan-400",
    ambientGlow: "from-teal-500/30 via-emerald-500/20 to-cyan-400/25",
    subtleBorder: "from-teal-500/20 via-emerald-500/15 to-cyan-500/20",
    spotlight: "bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.08),transparent_65%)]",
    badgePill: "bg-teal-50 border-teal-200/80 text-teal-800",
    iconBaseBg: "bg-teal-50/90 border-teal-100",
    iconHoverGradient:
      "group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-emerald-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_16px_rgba(20,184,166,0.35)]",
    iconBaseColor: "text-teal-700",
    subtitleColor: "text-teal-700",
    checkColor: "text-teal-600",
    chipHover: "group-hover:border-teal-200/90 group-hover:bg-teal-50/60 group-hover:text-teal-900",
    buttonHover:
      "hover:bg-gradient-to-r hover:from-navy-900 hover:to-teal-950 hover:shadow-md hover:shadow-teal-950/20",
    stepTag: "04",
  },
};

const defaultTheme: SolutionTheme = {
  gradientBorder: "from-blue-600 via-indigo-500 to-cyan-400",
  ambientGlow: "from-blue-600/30 via-indigo-500/20 to-cyan-400/25",
  subtleBorder: "from-steel-300 via-steel-200 to-steel-300",
  spotlight: "bg-[radial-gradient(ellipse_at_top_right,rgba(30,41,59,0.05),transparent_65%)]",
  badgePill: "bg-navy-50 border-navy-200/80 text-navy-800",
  iconBaseBg: "bg-navy-50 border-navy-100",
  iconHoverGradient: "group-hover:bg-navy-900 group-hover:text-white",
  iconBaseColor: "text-navy-700",
  subtitleColor: "text-navy-700",
  checkColor: "text-navy-700",
  chipHover: "group-hover:border-navy-200 group-hover:bg-navy-50 group-hover:text-navy-900",
  buttonHover: "hover:bg-navy-800",
  stepTag: "01",
};

export default function IndustrySolutionsSection({
  eyebrow,
  heading,
  description,
  solutions,
}: IndustrySolutionsSectionProps) {
  return (
    <section
      className="relative bg-slate-50/70 py-16 sm:py-20 border-b border-steel-200/80 overflow-hidden"
      aria-labelledby="solutions-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h2
            id="solutions-section-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-steel-900 tracking-tight"
          >
            {heading}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Compact 4-Column Grid */}
        <div
          className={`grid grid-cols-1 ${
            solutions.length === 4
              ? "md:grid-cols-2 lg:grid-cols-4 gap-5"
              : "lg:grid-cols-3 gap-6"
          } items-stretch`}
        >
          {solutions.map((solution, idx) => {
            const Icon = iconMap[solution.icon_name] || Settings;
            const theme = solutionThemes[solution.id] || {
              ...defaultTheme,
              stepTag: String(idx + 1).padStart(2, "0"),
            };

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative flex flex-col h-full select-none"
              >
                {/* 1. Ambient Diffused Glow behind the card on hover */}
                <div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${theme.ambientGlow} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none -z-10`}
                  aria-hidden="true"
                />

                {/* 2. Outer Gradient Border Container (1.5px border effect) */}
                <div className="relative flex flex-col h-full rounded-2xl p-[1.5px] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-steel-900/10">
                  {/* Base border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.subtleBorder} border border-steel-200/90 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  {/* Hover border */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradientBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  {/* 3. Inner Compact Card Surface */}
                  <div className="relative flex flex-col h-full rounded-[14.5px] bg-white p-5 sm:p-5.5 overflow-hidden z-10">
                    {/* Top Corner Radial Spotlight glow on hover */}
                    <div
                      className={`absolute inset-0 ${theme.spotlight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />

                    {/* Top Row: Icon on left, Step number badge on right */}
                    <div className="flex items-center justify-between mb-3.5 relative z-10">
                      <div
                        className={`w-10 h-10 rounded-xl ${theme.iconBaseBg} border flex items-center justify-center ${theme.iconBaseColor} shrink-0 transition-all duration-300 ${theme.iconHoverGradient}`}
                      >
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Number Tag Pill without 'Vertical' prefix */}
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wider ${theme.badgePill} border shadow-2xs`}
                      >
                        {theme.stepTag}
                      </span>
                    </div>

                    {/* Title & Subtitle - Full width to prevent any overlapping */}
                    <div className="mb-3.5 relative z-10">
                      <h3 className="text-base font-bold text-steel-900 group-hover:text-steel-950 transition-colors leading-snug">
                        {solution.title}
                      </h3>
                      <p className={`text-xs font-semibold ${theme.subtitleColor} mt-1 leading-snug`}>
                        {solution.subtitle}
                      </p>
                    </div>

                    {/* Applicable Industries Chips */}
                    <div className="mb-3.5 relative z-10">
                      <span className="text-[10px] font-bold text-steel-400 uppercase tracking-wider block mb-1.5">
                        Primary Sector Fit
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {solution.applicable_industries.map((sec) => (
                          <span
                            key={sec}
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-steel-100/80 text-steel-700 border border-steel-200/70 transition-all duration-300 ${theme.chipHover}`}
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities list */}
                    <div className="flex-1 mb-4 pt-3 border-t border-steel-100 relative z-10">
                      <span className="text-[10px] font-bold text-steel-400 uppercase tracking-wider block mb-2">
                        Engineering Scope
                      </span>
                      <ul className="space-y-1.5">
                        {solution.capabilities.map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5 text-xs text-steel-700">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${theme.checkColor} shrink-0 mt-0.5 transition-colors duration-300`}
                            />
                            <span className="leading-snug">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 border-t border-steel-100 flex flex-col gap-1.5 relative z-10 mt-auto">
                      <Link
                        href={`/contact?product=${solution.id}`}
                        className={`group/btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold transition-all shadow-2xs text-center active:scale-98 ${theme.buttonHover}`}
                      >
                        <span>Request Technical Review</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </Link>

                      <Link
                        href={solution.href}
                        className="group/link inline-flex items-center justify-center gap-1 text-[11px] font-medium text-steel-500 hover:text-navy-900 py-0.5 transition-colors"
                      >
                        <span>View Product Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
