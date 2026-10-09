"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, PhoneCall } from "lucide-react";

interface CTASectionData {
  eyebrow: string;
  heading: string;
  description: string;
  primary_button: {
    label: string;
    href: string;
  };
  secondary_button: {
    label: string;
    href: string;
  };
  guarantees: readonly string[];
}

interface IndustryCTASectionProps {
  cta: CTASectionData;
}

export default function IndustryCTASection({ cta }: IndustryCTASectionProps) {
  return (
    <section
      className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden"
      aria-labelledby="industry-cta-heading"
    >
      {/* Blueprint grid subtle background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-3">
            {cta.eyebrow}
          </span>

          {/* Heading */}
          <h2
            id="industry-cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight max-w-2xl mx-auto"
          >
            {cta.heading}
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {cta.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href={cta.primary_button.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>{cta.primary_button.label}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href={cta.secondary_button.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-semibold text-sm transition-all shadow-2xs"
            >
              <span>{cta.secondary_button.label}</span>
              <ArrowRight className="w-4 h-4 text-steel-500" />
            </Link>
          </div>

          {/* Guarantees / Reassurances */}
          <div className="mt-10 pt-8 border-t border-steel-200/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-steel-600">
            {cta.guarantees.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-navy-700 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
