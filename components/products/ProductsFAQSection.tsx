"use client";

import Link from "next/link";
import { HelpCircle, Mail, PhoneCall, ArrowRight } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Heading & Contact Card */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <HelpCircle size={13} className="text-navy-700" />
              <span>Technical Clarifications</span>
            </span>

            <h2
              id="products-faq-heading"
              className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight"
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-sm text-steel-600 leading-relaxed">
              Find answers regarding custom profile roll-pass design, tooling integration, raw material compatibility, and factory trial verification.
            </p>

            {/* Direct Support Card */}
            <div className="mt-8 rounded-2xl border border-steel-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-steel-900 mb-2">
                Need a specific technical review?
              </h3>
              <p className="text-xs text-steel-500 leading-relaxed mb-4">
                Our application engineering team is available to review drawing tolerances, profile dimensions, or custom load cases.
              </p>

              <div className="space-y-2.5">
                <Link
                  href="/contact"
                  className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors"
                >
                  <span>Submit Technical Enquiry</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href="mailto:contact@empiricalindia.com"
                  className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl border border-steel-200 hover:bg-slate-50 text-steel-700 text-xs font-semibold transition-colors"
                >
                  <Mail size={14} className="text-navy-700" />
                  <span>Email Engineering Team</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}
