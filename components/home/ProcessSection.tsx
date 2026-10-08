"use client";

import { motion } from "framer-motion";
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

export default function ProcessSection({ stages, sectionTitle, sectionContent }: ProcessSectionProps) {
  return (
    <section
      className="relative bg-[#f4f6f9] py-20 sm:py-28 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-4">
            How We Work
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl font-bold text-steel-900 tracking-tight"
          >
            {sectionTitle}
          </h2>
          <p className="mt-4 text-steel-500 text-base max-w-xl mx-auto leading-relaxed">
            {sectionContent}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-7 left-[calc(8.33%)] right-[calc(8.33%)] h-px bg-steel-200 hidden lg:block"
            aria-hidden="true"
          />

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {stages.map((stage, index) => {
              const parts = stage.stage.split(" ");
              const stageNum = parts[0];
              const stageName = parts.slice(1).join(" ");

              const isFirst = index === 0;
              const isLast = index === stages.length - 1;

              return (
                <motion.div
                  key={stage.stage}
                  className="flex flex-col items-center text-center group"
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  }}
                >
                  {/* Step circle */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-14 h-14 rounded-full border-2 font-bold text-sm mb-4 z-10 bg-white transition-all duration-300 group-hover:scale-105",
                      isFirst || isLast
                        ? "border-navy-700 text-navy-700 group-hover:bg-navy-700 group-hover:text-white shadow-sm"
                        : index < 3
                        ? "border-steel-300 text-steel-600 group-hover:border-navy-700 group-hover:text-navy-700"
                        : "border-steel-200 text-steel-500 group-hover:border-navy-700 group-hover:text-navy-700"
                    )}
                    aria-label={`Step ${index + 1}: ${stageName}`}
                  >
                    {stageNum}
                  </div>

                  {/* Stage name */}
                  <h3 className="text-sm font-semibold text-steel-800 mb-1.5 leading-snug">
                    {stageName}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-steel-500 leading-relaxed">
                    {stage.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          className="mt-12 text-center text-xs text-steel-400 italic max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          The exact workflow is validated against Empirical India&apos;s actual process before being described as standard.
        </motion.p>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
