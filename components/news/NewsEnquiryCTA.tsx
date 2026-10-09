"use client";

import Link from "next/link";
import { ArrowRight, Mail, Calendar, FileText } from "lucide-react";

export default function NewsEnquiryCTA() {
  return (
    <section className="mt-12 sm:mt-16 mb-8" aria-labelledby="news-cta-heading">
      <div className="relative rounded-2xl bg-gradient-to-br from-steel-50 via-white to-steel-100/60 border border-steel-200/90 hover:border-blue-400/60 hover:shadow-[0_20px_40px_-12px_rgba(30,75,186,0.22),0_8px_20px_-6px_rgba(220,38,38,0.14)] hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-10 text-center shadow-xs overflow-hidden group">
        {/* 4-Color Signature Brand Gradient Top Stripe (Thickened) */}
        <div className="absolute top-0 inset-x-0 h-[9px] sm:h-[10px] bg-gradient-to-r from-[#0f2044] via-[#1e4bba] via-[#7c3aed] to-[#dc2626] transition-all duration-300 group-hover:h-[12px] group-hover:shadow-[0_4px_14px_rgba(30,75,186,0.45)]" />

        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-semibold uppercase tracking-wider mb-3.5 border border-navy-200/60">
            <Calendar size={12} className="text-navy-700" />
            Connect With Our Engineers
          </div>

          <h2
            id="news-cta-heading"
            className="text-xl sm:text-2xl font-bold text-steel-900 tracking-tight mb-2.5"
          >
            Planning a Project or Attending an Upcoming Expo?
          </h2>

          <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-6">
            Whether you would like to discuss custom roll-forming machinery, request a modular metal pallet review, or schedule a technical meeting at an upcoming trade show, our team is ready to assist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact?topic=news-events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0f2044] via-[#1e4bba] to-[#2563eb] hover:from-[#152d6e] hover:via-[#2563eb] hover:to-[#dc2626] shadow-xs hover:shadow-md transition-all duration-300 group/btn"
            >
              <FileText size={15} />
              <span>Request a Technical Quote</span>
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform duration-300"
              />
            </Link>

            <a
              href="mailto:info@empiricalindia.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-steel-700 bg-white border border-steel-200 hover:bg-steel-50 hover:border-steel-300 transition-all shadow-xs"
            >
              <Mail size={15} className="text-steel-500" />
              <span>Email info@empiricalindia.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
