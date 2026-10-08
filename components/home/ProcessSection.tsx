"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Search,
  Target,
  Cpu,
  Factory,
  CheckCircle2,
  Truck,
  ChevronRight,
  ChevronLeft,
  ArrowDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStage {
  stage: string;
  description: string;
}

interface ProcessSectionProps {
  stages: readonly ProcessStage[];
  sectionTitle: string;
  sectionContent: string;
}

// Map stage indices to specialized technical icons and badges
const STAGE_CONFIG = [
  {
    icon: Search,
    subtitle: "Requirement Analysis",
    deliverable: "Application & drawing review",
  },
  {
    icon: Target,
    subtitle: "Technical Scope",
    deliverable: "Tolerances & acceptance criteria",
  },
  {
    icon: Cpu,
    subtitle: "Tooling & Design",
    deliverable: "Machine & tooling specifications",
  },
  {
    icon: Factory,
    subtitle: "Production & Assembly",
    deliverable: "Fabrication to documented specs",
  },
  {
    icon: CheckCircle2,
    subtitle: "Verification & QA",
    deliverable: "Dimensional & functional checks",
  },
  {
    icon: Truck,
    subtitle: "Logistics & Dispatch",
    deliverable: "Secure packaging & traceability",
  },
];

export default function ProcessSection({
  stages,
  sectionTitle,
  sectionContent,
}: ProcessSectionProps) {
  // Desktop active hovered/selected step
  const [activeDesktopStep, setActiveDesktopStep] = useState<number>(0);

  // Mobile scroll-driven step index
  const [activeMobileStep, setActiveMobileStep] = useState<number>(0);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll tracking for the mobile step sequence
  const { scrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (stages.length === 0) return;
    // Map scroll progress (0.0 to 1.0) across the stages
    const stepCount = stages.length;
    const computedIndex = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor(latest * stepCount))
    );
    setActiveMobileStep(computedIndex);
  });

  // Allow touch swipe navigation on mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50 && activeMobileStep < stages.length - 1) {
      // Swiped left -> next
      setActiveMobileStep((prev) => prev + 1);
    } else if (diff < -50 && activeMobileStep > 0) {
      // Swiped right -> prev
      setActiveMobileStep((prev) => prev - 1);
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden select-text"
      aria-labelledby="process-heading"
    >
      {/* Subtle blueprint grid watermark background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-700 text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>Industrial Workflow</span>
          </div>

          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-steel-900 tracking-tight"
          >
            {sectionTitle}
          </h2>

          <p className="mt-4 text-steel-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {sectionContent}
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            1. DESKTOP / LAPTOP VIEW (Horizontal Steps Strip)
            ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          {/* Master rounded enclosure — NO generic cards */}
          <div className="relative rounded-3xl border border-steel-200/90 bg-white/70 backdrop-blur-xl p-6 lg:p-8 shadow-[0_4px_30px_rgba(15,23,42,0.03)]">
            {/* Top Pipeline Conduit Line */}
            <div className="relative mb-6">
              {/* Background conduit track */}
              <div
                className="absolute top-5 left-10 right-10 h-0.5 bg-steel-200"
                aria-hidden="true"
              />

              {/* Progress active gradient fill */}
              <motion.div
                className="absolute top-5 left-10 h-0.5 bg-gradient-to-r from-navy-700 via-navy-600 to-steel-400"
                aria-hidden="true"
                initial={{ width: "0%" }}
                whileInView={{
                  width: `${((activeDesktopStep + 1) / stages.length) * 100}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Step indicator nodes */}
              <div className="grid grid-cols-6 relative z-10">
                {stages.map((stage, idx) => {
                  const parts = stage.stage.split(" ");
                  const stageNum = parts[0];
                  const isActive = activeDesktopStep === idx;
                  const isPast = activeDesktopStep > idx;
                  const config = STAGE_CONFIG[idx] || STAGE_CONFIG[0];
                  const Icon = config.icon;

                  return (
                    <div
                      key={`node-${stage.stage}`}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => setActiveDesktopStep(idx)}
                      onMouseEnter={() => setActiveDesktopStep(idx)}
                    >
                      <button
                        type="button"
                        aria-label={`Select stage ${stage.stage}`}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border-2 outline-none",
                          isActive
                            ? "bg-navy-900 border-navy-900 text-white shadow-md scale-110 ring-4 ring-navy-100"
                            : isPast
                            ? "bg-navy-700 border-navy-700 text-white"
                            : "bg-white border-steel-300 text-steel-500 group-hover:border-navy-600 group-hover:text-navy-700"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continuous Horizontal Steps Strip */}
            <div className="grid grid-cols-6 gap-3 pt-2">
              {stages.map((stage, idx) => {
                const parts = stage.stage.split(" ");
                const stageNum = parts[0];
                const stageName = parts.slice(1).join(" ");
                const isActive = activeDesktopStep === idx;
                const config = STAGE_CONFIG[idx] || STAGE_CONFIG[0];

                return (
                  <div
                    key={stage.stage}
                    onClick={() => setActiveDesktopStep(idx)}
                    onMouseEnter={() => setActiveDesktopStep(idx)}
                    className={cn(
                      "group relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border",
                      isActive
                        ? "bg-white border-navy-300/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] ring-1 ring-navy-700/10"
                        : "bg-steel-50/50 hover:bg-white border-steel-200/50 hover:border-steel-300/80 hover:shadow-2xs"
                    )}
                  >
                    {/* Semi-visible bolder step number embedded in rounded box */}
                    <span
                      className={cn(
                        "absolute top-2 right-2.5 font-mono font-black text-6xl leading-none select-none pointer-events-none tracking-tighter transition-all duration-300",
                        isActive
                          ? "text-navy-900/[0.12] scale-105"
                          : "text-steel-900/[0.04] group-hover:text-navy-900/[0.08]"
                      )}
                      aria-hidden="true"
                    >
                      {stageNum}
                    </span>

                    {/* Step Content */}
                    <div className="relative z-10">
                      {/* Subtitle tag */}
                      <span className="block text-[11px] font-semibold text-navy-700 uppercase tracking-wider mb-1">
                        {config.subtitle}
                      </span>

                      {/* Stage Name */}
                      <h3 className="text-base font-bold text-steel-900 tracking-tight flex items-center justify-between">
                        <span>{stageName}</span>
                        {idx < stages.length - 1 && (
                          <ChevronRight
                            className={cn(
                              "w-3.5 h-3.5 transition-colors",
                              isActive
                                ? "text-navy-600 translate-x-0.5"
                                : "text-steel-300 group-hover:text-steel-400"
                            )}
                          />
                        )}
                      </h3>

                      {/* Technical Description */}
                      <p className="mt-2.5 text-xs text-steel-500 leading-relaxed font-normal">
                        {stage.description}
                      </p>
                    </div>

                    {/* Deliverable micro-chip */}
                    <div className="mt-5 pt-3 border-t border-steel-100 flex items-center gap-1.5 text-[10px] text-steel-400 font-medium">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-colors",
                          isActive ? "bg-navy-600" : "bg-steel-300"
                        )}
                      />
                      <span className="truncate">{config.deliverable}</span>
                    </div>

                    {/* Active highlight indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="active-horizontal-indicator"
                        className="absolute bottom-0 inset-x-0 h-1 bg-navy-700 rounded-b-2xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Strip Summary Bar */}
            <div className="mt-6 pt-5 border-t border-steel-200/70 flex items-center justify-between text-xs text-steel-500">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-steel-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-navy-700" />
                  Engineering Milestone:
                </span>
                <span className="text-navy-900 font-medium">
                  Stage {stages[activeDesktopStep]?.stage} —{" "}
                  {STAGE_CONFIG[activeDesktopStep]?.deliverable}
                </span>
              </div>
              <div className="text-steel-400 text-[11px] font-mono">
                Step {activeDesktopStep + 1} of {stages.length}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. MOBILE VIEW (Scroll-driven: One Step at a Time with Animation)
            ───────────────────────────────────────────────────────────── */}
        <div className="block lg:hidden">
          {/* Scroll track container: provides vertical travel for the scroll-driven step sequence */}
          <div
            ref={mobileContainerRef}
            className="relative"
            style={{ minHeight: `${stages.length * 52}vh` }}
          >
            {/* Sticky viewport: holds the rounded box in view as the user scrolls up in vertical */}
            <div className="sticky top-20 sm:top-24 z-20 pt-2 pb-6">
              {/* Master Rounded Box Container (NO cards) */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative rounded-3xl border border-steel-200/90 bg-white/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.08)] overflow-hidden transition-shadow"
              >
                {/* Huge semi-visible bolder step number embedded inside the rounded box */}
                <div
                  className="absolute -top-1 right-2 select-none pointer-events-none font-mono font-black text-8xl sm:text-9xl tracking-tighter text-navy-900/[0.08] leading-none z-0"
                  aria-hidden="true"
                >
                  {stages[activeMobileStep]?.stage.split(" ")[0] || "01"}
                </div>

                {/* Animated Step Content (One step at a time with smooth vertical animation) */}
                <AnimatePresence mode="wait">
                  {(() => {
                    const currentStage = stages[activeMobileStep];
                    if (!currentStage) return null;

                    const parts = currentStage.stage.split(" ");
                    const stageNum = parts[0];
                    const stageName = parts.slice(1).join(" ");
                    const config =
                      STAGE_CONFIG[activeMobileStep] || STAGE_CONFIG[0];
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={`mobile-step-${stageNum}`}
                        initial={{ opacity: 0, y: 26, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -22, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative z-10 flex flex-col justify-between min-h-[290px]"
                      >
                        {/* Top Meta row */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            {/* Phase pill */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-200/70 text-navy-800 text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
                              <span>
                                PHASE {stageNum} OF 0{stages.length}
                              </span>
                            </div>

                          </div>

                          {/* Stage Name */}
                          <span className="text-xs font-bold text-navy-700 tracking-wider uppercase block">
                            {config.subtitle}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight mt-1">
                            {stageName}
                          </h3>

                          {/* Stage Description */}
                          <p className="mt-3.5 text-sm sm:text-base text-steel-600 leading-relaxed font-normal">
                            {currentStage.description}
                          </p>

                          {/* Deliverable / Focus item */}
                          <div className="mt-4 p-3 rounded-xl bg-steel-50/80 border border-steel-200/60 flex items-center gap-2.5 text-xs text-steel-700">
                            <span className="w-2 h-2 rounded-full bg-navy-600 shrink-0" />
                            <span className="font-medium">
                              Focus: {config.deliverable}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Controls & Progress Bar inside the rounded box */}
                        <div className="mt-6 pt-4 border-t border-steel-100">
                          {/* Segmented Progress Tracker */}
                          <div className="grid grid-cols-6 gap-1.5 mb-4">
                            {stages.map((_, i) => (
                              <button
                                key={`seg-${i}`}
                                type="button"
                                onClick={() => setActiveMobileStep(i)}
                                aria-label={`Jump to stage ${i + 1}`}
                                className={cn(
                                  "h-1.5 rounded-full transition-all duration-300",
                                  i === activeMobileStep
                                    ? "bg-navy-800 shadow-2xs"
                                    : i < activeMobileStep
                                    ? "bg-navy-600/70"
                                    : "bg-steel-200"
                                )}
                              />
                            ))}
                          </div>

                          {/* Navigation Buttons + Step Counter */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveMobileStep((prev) =>
                                    Math.max(0, prev - 1)
                                  )
                                }
                                disabled={activeMobileStep === 0}
                                aria-label="Previous stage"
                                className="w-8 h-8 rounded-lg border border-steel-200 flex items-center justify-center text-steel-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-steel-50 active:scale-95 transition-all"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setActiveMobileStep((prev) =>
                                    Math.min(stages.length - 1, prev + 1)
                                  )
                                }
                                disabled={activeMobileStep === stages.length - 1}
                                aria-label="Next stage"
                                className="w-8 h-8 rounded-lg border border-steel-200 flex items-center justify-center text-steel-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-steel-50 active:scale-95 transition-all"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Process Footnote — Preserving verified client content rule */}
        <motion.p
          className="mt-12 text-center text-xs text-steel-400 italic max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The exact workflow is validated against Empirical India&apos;s actual process before being described as standard.
        </motion.p>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
