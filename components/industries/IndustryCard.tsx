"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  SunMedium,
  Warehouse,
  HardHat,
  Tractor,
  Factory,
} from "lucide-react";
import type { IndustryItem } from "@/data/08-industries";

const iconMap: Record<string, React.ElementType> = {
  "solar-energy": SunMedium,
  "peb": Warehouse,
  "infrastructure": HardHat,
  "agriculture": Tractor,
  "industrial-manufacturing": Factory,
};

interface IndustryCardProps {
  industry: IndustryItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  isTapped: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggle: () => void;
  priority?: boolean;
}

export default function IndustryCard({
  industry,
  isHovered,
  isAnyHovered,
  isTapped,
  onHover,
  onLeave,
  onToggle,
  priority = false,
}: IndustryCardProps) {
  const Icon = iconMap[industry.id] || Factory;

  // On desktop, expansion is driven by hover
  // On mobile (< lg), expansion is driven by tap
  const isDesktopExpanded = isHovered;
  const isMobileExpanded = isTapped;

  return (
    <article
      id={`industry-${industry.id}`}
      onMouseEnter={onHover}
      onMouseOver={onHover}
      onMouseLeave={onLeave}
      onClick={onToggle}
      style={{
        // Desktop Flex-grow: Equal 1 1 0% by default; when hovered, expands to 3.2 1 0% while others become 0.75 1 0%
        flex: isAnyHovered
          ? isDesktopExpanded
            ? "3.2 1 0%"
            : "0.75 1 0%"
          : "1 1 0%",
      }}
      className={`group relative rounded-2xl overflow-hidden border transition-[flex,flex-grow,flex-basis,transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none min-w-0 ${
        isDesktopExpanded
          ? "border-amber-500/80 shadow-[0_0_35px_rgba(245,158,11,0.14)]"
          : "border-slate-800/80 hover:border-slate-700/80 shadow-md"
      } ${
        // Mobile layout: Collapsed vs expanded height
        isMobileExpanded ? "min-h-[460px] lg:min-h-0" : "h-[96px] sm:h-[108px] lg:h-auto"
      }`}
    >
      {/* ─── Background Image Layer ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={industry.image}
          alt={industry.image_alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={`object-cover object-center transition-transform duration-700 ease-out ${
            isDesktopExpanded || isMobileExpanded ? "scale-105" : "scale-100"
          }`}
        />

        {/* Dark image overlay: Deep industrial dark on inactive/default, clearer cinematic gradient on active */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isDesktopExpanded || isMobileExpanded
              ? "bg-gradient-to-t from-[#050912]/98 via-[#050912]/72 to-[#050912]/20"
              : "bg-[#070c18]/85 group-hover:bg-[#070c18]/78"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* ─── Desktop Compact State (Visible on desktop when NOT hovered) ─── */}
      <div
        className={`hidden lg:flex absolute inset-0 z-10 flex-col items-center justify-center text-center p-4 transition-all duration-300 ${
          isDesktopExpanded
            ? "opacity-0 pointer-events-none scale-95"
            : "opacity-100 pointer-events-auto scale-100"
        }`}
        aria-hidden={isDesktopExpanded}
      >
        <Icon className="w-8 h-8 text-amber-500 shrink-0 transition-transform duration-300 group-hover:scale-110" />

        <h3 className="text-xs xl:text-sm font-bold text-white uppercase tracking-wider px-2 line-clamp-2 mt-4 text-center">
          {industry.short_title || industry.title}
        </h3>

        <div className="w-6 h-[2px] bg-amber-500/40 mt-3 rounded-full transition-all duration-300 group-hover:w-10 group-hover:bg-amber-500" />
      </div>

      {/* ─── Mobile Collapsed Header (Visible on < lg when NOT tapped) ─── */}
      <div
        className={`lg:hidden relative z-10 h-full flex items-center justify-between px-5 transition-opacity duration-300 ${
          isMobileExpanded ? "hidden" : "flex"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <Icon className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              {industry.title}
            </h3>
            <p className="text-[11px] font-medium text-amber-400/90 line-clamp-1 mt-0.5">
              {industry.tagline}
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-900/60 border border-slate-700/80 flex items-center justify-center text-slate-300 shrink-0">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* ─── Expanded State (Desktop when hovered / Mobile when tapped) ─── */}
      <div
        className={`relative z-20 h-full w-full flex flex-col justify-between p-6 sm:p-7 lg:p-8 transition-all duration-400 ${
          // Desktop expanded visibility
          isDesktopExpanded
            ? "lg:opacity-100 lg:pointer-events-auto lg:translate-y-0"
            : "lg:opacity-0 lg:pointer-events-none lg:translate-y-2 lg:absolute lg:inset-0"
        } ${
          // Mobile expanded visibility
          isMobileExpanded
            ? "flex opacity-100 pointer-events-auto"
            : "hidden lg:flex"
        }`}
      >
        {/* Top Header & Details */}
        <div className="w-full">
          {/* Icon & Underline Accent (Matching Reference) */}
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <Icon className="w-8 h-8 text-amber-500" />
              <div className="w-8 h-[2px] bg-amber-500 mt-2 rounded-full" />
            </div>

            {/* Close toggle for mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
              aria-label="Collapse card"
            >
              <ChevronDown className="w-5 h-5 rotate-180" />
            </button>
          </div>

          {/* Full Title & Tagline */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase leading-tight">
            {industry.title}
          </h3>
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-1.5">
            {industry.tagline}
          </p>

          {/* Full Description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-200/95 leading-relaxed max-w-xl">
            {industry.description}
          </p>

          {/* Key Components */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Key Engineered Components
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {industry.key_applications.map((app, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 border border-slate-800/80 rounded-lg px-2.5 py-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="line-clamp-1 font-medium">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Solution Link & Enquiry CTA */}
        <div className="mt-auto pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px]">Primary Capability:</span>
            <Link
              href={industry.product_href}
              onClick={(e) => e.stopPropagation()}
              className="text-amber-400 hover:text-amber-300 font-semibold text-xs inline-flex items-center gap-0.5 hover:underline"
            >
              <span>{industry.relevant_product_line}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Link
            href={industry.enquiry_href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 w-full sm:w-auto text-center"
          >
            <span>Enquire for Sector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
