"use client";

import { motion } from "framer-motion";
import { Compass, Sliders, ShieldCheck, Handshake, CheckCircle2 } from "lucide-react";

interface ValueItem {
  value: string;
  meaning_in_practice: string;
}

interface EngineeringPhilosophyProps {
  approach: string;
  values: readonly ValueItem[];
}

const VALUE_ICONS = [Compass, Sliders, ShieldCheck, Handshake];

export default function EngineeringPhilosophySection({
  approach,
  values,
}: EngineeringPhilosophyProps) {
  return (
    <section className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold text-navy-700 uppercase tracking-widest block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            How we approach design, tooling, and manufacturing
          </h2>
          <p className="mt-4 text-base text-steel-600 leading-relaxed font-normal">
            {approach}
          </p>
        </motion.div>

        {/* 4 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = VALUE_ICONS[idx % VALUE_ICONS.length] || Compass;

            return (
              <motion.div
                key={val.value}
                className="relative rounded-2xl border border-steel-200/80 bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center mb-5 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-steel-400 block mb-1">
                    0{idx + 1}
                  </span>

                  <h3 className="text-lg font-bold text-steel-900 tracking-tight mb-2">
                    {val.value}
                  </h3>

                  <p className="text-xs sm:text-sm text-steel-600 leading-relaxed">
                    {val.meaning_in_practice}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-steel-100 flex items-center gap-1.5 text-[11px] text-navy-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified In Practice</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Static Engineering Commitments (Directly derived from AGENTS.md rules) */}
        <div className="mt-12 rounded-2xl bg-white border border-steel-200/80 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <span className="text-xs font-bold text-navy-800 uppercase tracking-wider block mb-1">
                Rule of Accuracy
              </span>
              <p className="text-xs text-steel-500 leading-relaxed">
                We never assume machine speeds, pallet load capacities, or tube specifications without engineering review of the client drawing and application context.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-navy-800 uppercase tracking-wider block mb-1">
                Configuration Flexibility
              </span>
              <p className="text-xs text-steel-500 leading-relaxed">
                Roll-forming lines and modular pallets are configured around product weight, handling equipment, and factory footprint rather than rigid one-size-fits-all models.
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-navy-800 uppercase tracking-wider block mb-1">
                Collaborative Approval
              </span>
              <p className="text-xs text-steel-500 leading-relaxed">
                Critical dimensions, cut lengths, hole piercings, and surface requirements are locked in documentation before material procurement and metal fabrication begin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
