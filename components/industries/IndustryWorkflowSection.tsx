"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, PenTool, Factory, ShieldCheck, ArrowRight } from "lucide-react";

interface WorkflowStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

interface IndustryWorkflowSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  steps: readonly WorkflowStep[];
}

const stepIcons = [FileCheck, PenTool, Factory, ShieldCheck];

export default function IndustryWorkflowSection({
  eyebrow,
  heading,
  description,
  steps,
}: IndustryWorkflowSectionProps) {
  // Track hovered card index for focus/blur depth-of-field effect
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      className="relative bg-white py-16 sm:py-24 border-b border-steel-200/60 overflow-hidden"
      aria-labelledby="workflow-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-3">
            {eyebrow}
          </span>
          <h2
            id="workflow-section-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-steel-500 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* 4 Steps Grid Container with Sheryians-style hover focus/blur effect */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx] || FileCheck;
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isOther = isAnyHovered && !isHovered;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`group relative h-full rounded-2xl p-6 flex flex-col justify-between cursor-pointer select-none transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[filter,opacity,transform] ${
                    isHovered
                      ? "bg-white border border-navy-700/70 ring-1 ring-navy-700/20 shadow-xl shadow-navy-950/10 scale-[1.03] -translate-y-1 z-20 blur-none opacity-100"
                      : isOther
                      ? "bg-[#f8fafc]/90 border border-steel-200/50 scale-[0.98] blur-[3.5px] opacity-40 z-0"
                      : "bg-[#f8fafc] border border-steel-200/80 hover:border-steel-300 scale-100 blur-none opacity-100 z-10"
                  }`}
                >
                  <div>
                    {/* Top Row: Phase number and icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-2xl font-black font-mono transition-colors duration-300 ${
                          isHovered ? "text-navy-900" : "text-navy-900/20"
                        }`}
                      >
                        {step.step}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-2xs ${
                          isHovered
                            ? "bg-navy-900 text-white scale-110 shadow-md shadow-navy-950/20"
                            : "bg-white border border-steel-200/80 text-navy-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-bold mb-2 transition-colors duration-300 ${
                        isHovered ? "text-navy-950" : "text-steel-900"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-steel-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Phase Indicator */}
                  <div
                    className={`mt-6 pt-3 border-t flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      isHovered
                        ? "border-navy-100 text-navy-900"
                        : "border-steel-200/60 text-navy-700"
                    }`}
                  >
                    <span>Phase {step.step}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        isHovered
                          ? "opacity-100 translate-x-0.5 text-navy-900"
                          : "opacity-0 -translate-x-1 text-steel-400"
                      }`}
                    />
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
