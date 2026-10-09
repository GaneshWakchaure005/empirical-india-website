"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  status: string;
}

interface TimelineSectionProps {
  milestones: readonly Milestone[];
}

export default function TimelineSection({ milestones }: TimelineSectionProps) {
  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-navy-700" />
            <span>Company Progression</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            Our engineering milestones
          </h2>

          <p className="mt-3.5 text-base text-steel-600 leading-relaxed font-normal">
            A track record of progressive technical expansion, established in 2016 and continuously expanding across roll-forming machinery and fabricated metal systems.
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical spine */}
          <div
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-steel-200 -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={milestone.title}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  {/* Central Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-navy-900 shadow-sm z-10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-600" />
                  </div>

                  {/* Content Container */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                      isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                    }`}
                  >
                    <div className="p-6 rounded-2xl border border-steel-200/80 bg-[#f8fafc] hover:bg-white transition-all shadow-2xs hover:shadow-sm">
                      <div
                        className={`inline-flex items-center gap-2 mb-2 ${
                          isEven ? "sm:justify-end" : ""
                        }`}
                      >
                        <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-white font-mono font-bold text-xs">
                          {milestone.year}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy-700">
                          <CheckCircle2 className="w-3 h-3 text-navy-600" />
                          <span>Documented Milestone</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-steel-900 tracking-tight mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-steel-600 leading-relaxed font-normal">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Milestone Verification Notice per AGENTS.md */}
        <p className="mt-14 text-center text-xs text-steel-400 italic max-w-lg mx-auto">
          Historical dates and milestones reflect verified company records. No unverified machine delivery counts or speculative statistics are published.
        </p>
      </div>
    </section>
  );
}
