"use client";

import Link from "next/link";
import { ArrowRight, FileCheck, Mail, MapPin, UploadCloud, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface ProductsCTAProps {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export default function ProductsCTA({
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
}: ProductsCTAProps) {
  return (
    <section
      className="relative overflow-hidden bg-steel-950 py-16 sm:py-20 lg:py-24"
      aria-labelledby="products-cta-heading"
    >
      {/* Background glow and subtle geometry */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl border border-steel-800 bg-gradient-to-br from-steel-900/90 via-steel-900/60 to-steel-950/90 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-300 uppercase mb-4">
              <UploadCloud size={14} />
              <span>{eyebrow}</span>
            </span>

            <h2
              id="products-cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight"
            >
              {heading}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-steel-300 leading-relaxed font-normal">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-navy-950 hover:bg-slate-100 font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-98"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-steel-700 bg-steel-800/60 hover:bg-steel-800 text-white font-semibold text-sm transition-all active:scale-98"
              >
                <span>{secondaryCta.label}</span>
              </Link>
            </div>

            {/* Trust Badges Footer */}
            <div className="mt-10 pt-8 border-t border-steel-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-steel-400">
              <div className="flex items-center gap-2">
                <FileCheck size={15} className="text-cyan-400" />
                <span>NDA &amp; Confidential Drawing Review</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-cyan-400" />
                <span>Factory Trial Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-cyan-400" />
                <span>Nashik Manufacturing Plant</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
