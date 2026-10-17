"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sliders,
  Cpu,
  Factory,
  ShieldCheck,
  Truck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface WorkflowStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

interface ProductsWorkflowSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  steps: readonly WorkflowStep[];
}

const stepIcons: LucideIcon[] = [
  FileText,
  Sliders,
  Cpu,
  Factory,
  ShieldCheck,
  Truck,
];

export default function ProductsWorkflowSection({
  eyebrow,
  heading,
  description,
  steps,
}: ProductsWorkflowSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-steel-200 overflow-hidden"
      aria-labelledby="products-workflow-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-3">
            {eyebrow}
          </span>
          <h2
            id="products-workflow-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* 6 Steps Grid */}
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx] || FileText;
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;
            const isOther = isAnyHovered && !isHovered;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`group relative h-full rounded-2xl p-6 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 ease-out ${
                    isHovered
                      ? "bg-white border border-navy-700/80 ring-1 ring-navy-700/20 shadow-xl shadow-navy-950/10 scale-[1.02] -translate-y-1 z-20"
                      : isOther
                      ? "bg-slate-50/80 border border-steel-200/50 scale-[0.99] opacity-60 z-0"
                      : "bg-slate-50 border border-steel-200 hover:border-steel-300 scale-100 opacity-100 z-10"
                  }`}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-2xl font-black font-mono transition-colors duration-200 ${
                          isHovered ? "text-navy-900" : "text-navy-900/30"
                        }`}
                      >
                        {step.step}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          isHovered
                            ? "bg-navy-900 text-white"
                            : "bg-white text-navy-800 shadow-2xs border border-steel-200"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-steel-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-navy-700">
                    <span>Engineering Milestone</span>
                    <ArrowRight
                      size={13}
                      className={`transition-transform duration-200 ${
                        isHovered ? "translate-x-1" : ""
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
