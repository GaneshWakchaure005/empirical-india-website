"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, CheckCircle2, Shield } from "lucide-react";

interface AboutHeroProps {
  introduction: string;
}

export default function AboutHero({ introduction }: AboutHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f6f9] pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-steel-200/60">
      {/* Background blueprint grid watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>Industrial Engineering & Manufacturing</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-navy-700" />
            <span>Nashik, Maharashtra, India</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-navy-700" />
            <span>Est. 2016</span>
          </div>
        </motion.div>

        {/* Headline & Intro Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.15]">
              Engineering clarity from requirement to finished production.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-steel-600 leading-relaxed font-normal">
              {introduction}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm transition-all shadow-sm active:scale-98"
              >
                <span>Request Technical Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-medium text-sm transition-all"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Highlights Box — Static Industrial Profile Panel */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <div className="rounded-3xl border border-steel-200/90 bg-white/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <h2 className="text-xs font-bold text-navy-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-navy-700" />
                <span>Manufacturing Mandate</span>
              </h2>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-steel-800 block">
                      Drawing-Led Engineering
                    </strong>
                    <span className="text-xs text-steel-500 leading-normal">
                      Every project starts by reviewing technical drawings, material properties, and dimensional tolerances with the customer.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-steel-800 block">
                      Three Focused Business Lines
                    </strong>
                    <span className="text-xs text-steel-500 leading-normal">
                      Specialized in custom automated roll-forming lines, cold-formed modular metal pallets, and luggage trolley-bag tubes.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm font-semibold text-steel-800 block">
                      Pre-Dispatch Verification
                    </strong>
                    <span className="text-xs text-steel-500 leading-normal">
                      Documented checks for dimensional conformance, visual finish, and trial operation before shipment dispatch.
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-steel-100 flex items-center justify-between text-xs text-steel-500">
                <span className="font-mono">Export-Ready Manufacturing</span>
                <span className="text-navy-700 font-semibold">Maharashtra Cluster</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
