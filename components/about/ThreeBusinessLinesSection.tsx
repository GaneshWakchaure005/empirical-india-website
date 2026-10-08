"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Settings, Package, Cylinder, CheckCircle2 } from "lucide-react";

export default function ThreeBusinessLinesSection() {
  const businessLines = [
    {
      id: "roll-forming-lines",
      title: "Custom Roll-Forming Lines",
      icon: Settings,
      href: "/products/roll-forming-lines",
      cta: "Share a profile drawing or sample",
      summary:
        "Engineered automated roll-forming line configurations tailored around your profile geometry, material grade, and production speed requirements — from coil entry to finished cut-off.",
      highlights: [
        "Customer-defined open or closed profiles",
        "Forming stands, drive train & flying cut-off integration",
        "Configured for repeatable dimensional tolerances",
      ],
      buyerInput: "Profile cross-section drawing, material thickness & target production output.",
    },
    {
      id: "modular-metal-pallets",
      title: "Modular Metal Pallets",
      icon: Package,
      href: "/products/modular-metal-pallets",
      cta: "Request a custom pallet review",
      summary:
        "Heavy-duty, configurable pallets manufactured with cold roll-formed C-channel or modular structural profiles. Designed specifically for your handling method, stacking pattern, and load case.",
      highlights: [
        "Cold roll-formed C-channel load members",
        "Engineered for 2-way or 4-way forklift handling",
        "Hygienic, durable alternative to timber pallets",
      ],
      buyerInput: "Pallet dimensions, uniform distributed load (UDL), and handling environment.",
    },
    {
      id: "trolley-bag-tubes",
      title: "Tubes for Trolley-Bag Manufacturing",
      icon: Cylinder,
      href: "/products/trolley-bag-tubes",
      cta: "Send a tube drawing or sample",
      summary:
        "Precision tubular sections manufactured to the approved cross-section, length, straightness, and surface finish required for trolley-bag frames and luggage hardware assembly.",
      highlights: [
        "Strict cut length & straightness limits",
        "Custom end finishes, holes & piercing features",
        "Consistent batch-to-batch outer dimensions",
      ],
      buyerInput: "Tube drawing or physical sample with required length, finish, and wall thickness.",
    },
  ];

  return (
    <section className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold text-navy-700 uppercase tracking-widest block mb-2">
            Scope Of Manufacture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            Our three core manufacturing business lines
          </h2>
          <p className="mt-4 text-base text-steel-600 leading-relaxed font-normal">
            Empirical India does not offer a generic catalogue. We engineer and manufacture within three distinct industrial verticals to customer specifications.
          </p>
        </motion.div>

        {/* 3 Business Lines Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {businessLines.map((line, idx) => {
            const Icon = line.icon;

            return (
              <motion.div
                key={line.id}
                className="rounded-3xl border border-steel-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 text-navy-800 border border-navy-100 flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-steel-400 block mb-1">
                    Vertical 0{idx + 1}
                  </span>

                  <h3 className="text-xl font-bold text-steel-900 tracking-tight mb-3">
                    {line.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-6">
                    {line.summary}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-bold text-navy-800 uppercase tracking-wider block">
                      Key Engineering Capabilities:
                    </span>
                    {line.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-xs text-steel-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-navy-700 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-3.5 bg-steel-50 border border-steel-200/60 text-xs text-steel-600 mb-6">
                    <strong className="text-steel-800 block mb-0.5 font-semibold text-[11px] uppercase tracking-wide">
                      What we need from you:
                    </strong>
                    <span>{line.buyerInput}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-steel-100">
                  <Link
                    href={line.href}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-navy-800 group-hover:text-navy-950 transition-colors"
                  >
                    <span>{line.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
