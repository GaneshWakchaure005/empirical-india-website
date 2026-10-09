"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Compass, Factory, MapPin } from "lucide-react";

interface IndustriesHeroProps {
  eyebrow: string;
  heading: string;
  description: string;
  pills: readonly string[];
}

export default function IndustriesHero({
  eyebrow,
  heading,
  description,
  pills,
}: IndustriesHeroProps) {
  return (
    <section className="relative bg-[#f8fafc] pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-36 lg:pb-36 overflow-hidden border-b border-steel-200">
      {/* Background Hero Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/about-page-bg.png"
          alt="Empirical India engineering facility background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
        {/* Soft bottom fade to ensure clean separation */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/85 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Meta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-navy-700" />
            <span>Nashik Plant, India</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
            <Factory className="w-3.5 h-3.5 text-navy-700" />
            <span>Drawing-Led Manufacturing</span>
          </div>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.15]">
              {heading}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-steel-600 leading-relaxed font-normal max-w-2xl">
              {description}
            </p>

            {/* Quick Core Verticals Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-steel-400 uppercase tracking-wider mr-1">
                Core Verticals:
              </span>
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white border border-steel-200 text-steel-700 shadow-2xs"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA Group */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#industry-catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-medium text-sm transition-all shadow-sm active:scale-98"
              >
                <span>Explore 5 Key Sectors</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-medium text-sm transition-all"
              >
                <span>Discuss Your Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Highlights Panel — Application Framework Card */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-steel-200/90 bg-white/90 backdrop-blur-md p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-2 text-navy-800 font-bold text-xs uppercase tracking-wider mb-4">
                <Compass className="w-4 h-4 text-navy-700" />
                <span>Sector Integration</span>
              </div>

              <div className="space-y-3.5">
                <div className="p-3 rounded-xl bg-[#f8fafc] border border-steel-100">
                  <div className="text-xs font-bold text-steel-800">
                    Profile Cross-Sections
                  </div>
                  <p className="text-[11px] text-steel-500 mt-0.5 leading-relaxed">
                    Custom roll flower designs, inline hydraulic punching, and continuous cut-to-length lines.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#f8fafc] border border-steel-100">
                  <div className="text-xs font-bold text-steel-800">
                    Industrial Load Cases
                  </div>
                  <p className="text-[11px] text-steel-500 mt-0.5 leading-relaxed">
                    Cold-formed modular metal pallets configured for static, dynamic, and racking requirements.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#f8fafc] border border-steel-100">
                  <div className="text-xs font-bold text-steel-800">
                    Strict Cut Tolerances
                  </div>
                  <p className="text-[11px] text-steel-500 mt-0.5 leading-relaxed">
                    Precision trolley-bag tubes fabricated to verified dimensions and surface finishes.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-steel-100 flex items-center justify-between text-[11px] text-steel-500">
                <span className="font-mono text-navy-700 font-medium">B2B Engineering</span>
                <span>Nashik, MH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
