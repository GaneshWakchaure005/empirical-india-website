"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      className="bg-[#070b14] py-14 sm:py-16 border-t border-steel-900"
      aria-labelledby="products-cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-widest uppercase text-steel-400 mb-3">
            {eyebrow}
          </p>
        )}

        <h2
          id="products-cta-heading"
          className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug"
        >
          {heading}
        </h2>

        <p className="mt-3.5 text-sm sm:text-base text-steel-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-navy-950 hover:bg-slate-100 font-semibold text-sm transition-colors shadow-sm"
          >
            <span>{primaryCta.label}</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-steel-700 hover:border-steel-600 bg-steel-900/60 hover:bg-steel-800 text-steel-200 font-medium text-sm transition-colors"
          >
            <span>{secondaryCta.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
