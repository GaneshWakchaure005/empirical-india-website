"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Shield, ArrowRight, FileCheck } from "lucide-react";

export default function QualityAssuranceCallout() {
  const checks = [
    {
      title: "Drawing & Tolerances Agreement",
      description: "Critical profile dimensions, thickness, and material hardness verified before engineering begins.",
    },
    {
      title: "Trial Run & Section Testing",
      description: "Machine lines undergo profile trials and sample approval checks prior to crating.",
    },
    {
      title: "Pallet Load Case Verification",
      description: "Modular pallets engineered around stated racking, dynamic forklift, and stack load conditions.",
    },
    {
      title: "Traceable Batch Packaging",
      description: "Finished components and tubes packed with proper identification and shipment protections.",
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-steel-900 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800/80 border border-navy-700 text-navy-200 text-xs font-semibold uppercase tracking-wider mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>Verification Protocol</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Quality built on verifiable engineering, not unsupported claims.
              </h2>

              <p className="mt-4 text-steel-300 text-sm sm:text-base leading-relaxed">
                Empirical India aligns every order with defined acceptance criteria. We do not use speculative buzzwords like &ldquo;zero defect&rdquo; — instead, we establish measurable tolerances, physical inspection reports, and documented machine tryouts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/quality-manufacturing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-steel-100 text-navy-950 text-xs font-bold transition-all shadow-sm"
                >
                  <span>Explore Quality & Manufacturing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checks.map((check) => (
                <div
                  key={check.title}
                  className="p-5 rounded-2xl bg-steel-800/80 border border-steel-700/80 backdrop-blur-sm"
                >
                  <FileCheck className="w-5 h-5 text-navy-300 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {check.title}
                  </h3>
                  <p className="text-xs text-steel-300 leading-relaxed font-normal">
                    {check.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
