"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Shield, Cog, Handshake } from "lucide-react";

interface AboutValue {
  value: string;
  meaning_in_practice: string;
}

interface ApproachSectionProps {
  intro: string;
  approach: string;
  values: readonly AboutValue[];
}

const valueIcons = [ClipboardList, Cog, Shield, Handshake];

export default function ApproachSection({ intro, approach, values }: ApproachSectionProps) {
  return (
    <section
      className="relative bg-white py-20 sm:py-28 overflow-hidden"
      aria-labelledby="approach-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-4">
              About Empirical India
            </span>
            <h2
              id="approach-heading"
              className="text-3xl sm:text-4xl font-bold text-steel-900 tracking-tight mb-6 leading-tight"
            >
              Engineering clarity from the first conversation.
            </h2>
            <p className="text-base text-steel-600 leading-relaxed mb-5">
              {intro}
            </p>
            <p className="text-base text-steel-500 leading-relaxed mb-8">
              {approach}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-800 transition-colors group"
            >
              Learn about Empirical India
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Values Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {values.map((val, index) => {
              const Icon = valueIcons[index] ?? ArrowRight;
              return (
                <motion.div
                  key={val.value}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                  }}
                  className="p-5 rounded-xl border border-steel-200 bg-[#f8fafc] hover:border-steel-300 hover:bg-white hover:shadow-md card-lift transition-all duration-200"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-700/8 border border-navy-700/15 mb-3"
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-navy-700" />
                  </div>
                  <h3 className="text-sm font-bold text-steel-800 mb-1.5">
                    {val.value}
                  </h3>
                  <p className="text-xs text-steel-500 leading-relaxed">
                    {val.meaning_in_practice}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
