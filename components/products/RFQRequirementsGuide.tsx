"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  FileCheck2,
  Layers3,
  Package,
  Box,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RFQInputCategory } from "@/data/03-products-and-solutions";

interface RFQRequirementsGuideProps {
  eyebrow: string;
  heading: string;
  description: string;
  categories: readonly RFQInputCategory[];
}

const categoryIcons: Record<string, LucideIcon> = {
  "roll-forming-lines": Layers3,
  "modular-metal-pallets": Package,
  "trolley-bag-tubes": Box,
  "solar-structures": Sun,
};

export default function RFQRequirementsGuide({
  eyebrow,
  heading,
  description,
  categories,
}: RFQRequirementsGuideProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "roll-forming-lines");

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const CurrentIcon = categoryIcons[currentCategory.id] || Layers3;

  return (
    <section
      id="rfq-guide"
      className="relative bg-slate-50 py-16 sm:py-20 lg:py-24 border-b border-steel-200"
      aria-labelledby="rfq-guide-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <FileSpreadsheet size={13} className="text-navy-700" />
            <span>{eyebrow}</span>
          </span>

          <h2
            id="rfq-guide-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight"
          >
            {heading}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-steel-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Vertical Selector Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-steel-200 shadow-2xs max-w-full overflow-x-auto no-scrollbar gap-1">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Layers3;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-navy-900 text-white shadow-sm"
                      : "text-steel-600 hover:text-navy-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-cyan-300" : "text-steel-400"} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-steel-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-steel-900/4"
          >
            {/* Category Sub-header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-steel-100 mb-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                  <CurrentIcon size={22} />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-steel-900">
                    {currentCategory.title} Specification Checklist
                  </h3>
                  <p className="text-xs sm:text-sm text-steel-500">
                    Key engineering parameters required for feasibility and tooling calculation
                  </p>
                </div>
              </div>

              <Link
                href={currentCategory.rfq_link}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-700 hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <span>{currentCategory.cta}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 4 Technical Input Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentCategory.inputs.map((input, idx) => (
                <div
                  key={input.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 flex flex-col justify-between hover:border-slate-200 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-navy-700">
                        STEP 0{idx + 1}
                      </span>
                      <FileCheck2 size={16} className="text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-bold text-steel-900 mb-2">
                      {input.label}
                    </h4>
                    <p className="text-xs leading-relaxed text-steel-600">
                      {input.details}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                    <CheckCircle2 size={13} />
                    <span>Essential Parameter</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom File Preparation Note */}
            <div className="mt-8 rounded-2xl bg-navy-50/60 border border-navy-100/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-lg bg-navy-100 text-navy-800 shrink-0 mt-0.5 sm:mt-0">
                  <UploadCloud size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950">
                    Accepted File Formats &amp; Engineering Documents
                  </h4>
                  <p className="text-xs text-steel-600 mt-0.5">
                    We accept 2D/3D CAD files (.dwg, .dxf, .step, .igs, .pdf), profile sketches, load schedules, or photos of benchmark samples.
                  </p>
                </div>
              </div>

              <Link
                href={currentCategory.rfq_link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-navy-950 underline underline-offset-4 shrink-0"
              >
                <span>Upload Drawings via RFQ Form</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
