"use client";

import Link from "next/link";
import { HelpCircle, Mail, ArrowRight } from "lucide-react";
import FAQAccordion, { type FAQItem } from "./FAQAccordion";

interface ProductsFAQSectionProps {
  faqs: readonly FAQItem[];
}

export default function ProductsFAQSection({ faqs }: ProductsFAQSectionProps) {
  return (
    <section
      className="relative bg-slate-50 py-16 sm:py-20 lg:py-24 border-b border-steel-200"
      aria-labelledby="products-faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle size={13} className="text-navy-700" />
            <span>Technical Clarifications</span>
          </span>

          <h2
            id="products-faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight"
          >
            Frequently Asked Questions
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            Find engineering answers regarding custom profile roll-pass design, tooling integration, raw material compatibility, and factory trial verification.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-10">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
