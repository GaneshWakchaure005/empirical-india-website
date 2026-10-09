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
    stepTag: "Vertical 01",
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
    stepTag: "Vertical 02",
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
    stepTag: "Vertical 03",
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
  chipHover: "group-hover:border-steel-300 group-hover:bg-steel-100",
  buttonHover: "hover:bg-navy-800",
  stepTag: "Capability",
};

export default function IndustrySolutionsSection({
  eyebrow,
  heading,
  description,
  solutions,
}: IndustrySolutionsSectionProps) {
  return (
    <section
      className="relative bg-[#f8fafc] py-20 sm:py-28 border-b border-steel-200/60 overflow-hidden"
      aria-labelledby="solutions-section-heading"
    >
      {/* Background Decorative Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h2
            id="solutions-section-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-steel-900 tracking-tight"
          >
            {heading}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* 3 Core Solutions Cards with Border Color Gradients & Hover Effects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {solutions.map((solution, idx) => {
            const Icon = iconMap[solution.icon_name] || Settings;
            const theme = solutionThemes[solution.id] || defaultTheme;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative flex flex-col h-full select-none"
              >
                {/* 1. Ambient Diffused Glow behind the card on hover */}
                <div
                  className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${theme.ambientGlow} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none -z-10`}
                  aria-hidden="true"
                />

                {/* 2. Outer Gradient Border Container (1.5px border effect) */}
                <div className="relative flex flex-col h-full rounded-2xl p-[1.5px] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-steel-900/10">
                  {/* Base border: subtle tinted gradient in rest state */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.subtleBorder} border border-steel-200/90 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  {/* Hover border: blooms into vibrant gradient combination */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradientBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    aria-hidden="true"
                  />

                  {/* 3. Inner Card Surface */}
                  <div className="relative flex flex-col h-full rounded-[14.5px] bg-white p-6 sm:p-7 overflow-hidden z-10">
                    {/* Top Corner Radial Spotlight glow on hover */}
                    <div
                      className={`absolute inset-0 ${theme.spotlight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />

                    {/* Header Row: Icon, Title & Step Badge */}
                    <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-12 h-12 rounded-xl ${theme.iconBaseBg} border flex items-center justify-center ${theme.iconBaseColor} shrink-0 transition-all duration-300 ${theme.iconHoverGradient} group-hover:scale-105 group-hover:rotate-1`}
                        >
                          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-steel-900 group-hover:text-steel-950 transition-colors">
                            {solution.title}
                          </h3>
                          <p className={`text-xs font-semibold ${theme.subtitleColor} mt-0.5`}>
                            {solution.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Vertical Tag Pill */}
                      <span
                        className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${theme.badgePill} border shadow-2xs`}
                      >
                        {theme.stepTag}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-5 relative z-10">
                      {solution.description}
                    </p>

                    {/* Applicable Industries Chips */}
                    <div className="mb-5 relative z-10">
                      <span className="text-[11px] font-bold text-steel-400 uppercase tracking-wider block mb-2">
                        Primary Sector Fit
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {solution.applicable_industries.map((sec) => (
                          <span
                            key={sec}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-steel-100/80 text-steel-700 border border-steel-200/70 transition-all duration-300 ${theme.chipHover}`}
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities list */}
                    <div className="flex-1 mb-6 pt-4 border-t border-steel-100 relative z-10">
                      <span className="text-[11px] font-bold text-steel-400 uppercase tracking-wider block mb-2.5">
                        Engineering Scope
                      </span>
                      <ul className="space-y-2">
                        {solution.capabilities.map((cap, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2 text-xs text-steel-700">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${theme.checkColor} shrink-0 mt-0.5 transition-colors duration-300`}
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-steel-100 flex flex-col gap-2 relative z-10 mt-auto">
                      <Link
                        href={`/contact?product=${solution.id}`}
                        className={`group/btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold transition-all shadow-2xs text-center active:scale-98 ${theme.buttonHover}`}
                      >
                        <span>Request Technical Review</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>

                      <Link
                        href={solution.href}
                        className="group/link inline-flex items-center justify-center gap-1.5 text-xs font-medium text-steel-600 hover:text-navy-900 py-1 transition-colors"
                      >
                        <span>View Product Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
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
