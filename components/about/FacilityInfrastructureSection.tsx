"use client";

import { motion } from "framer-motion";
import { Building2, Layers, Wrench, Shield, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Bay {
  title: string;
  description: string;
}

interface FacilityProps {
  location: string;
  cluster: string;
  bays: readonly Bay[];
}

const BAY_ICONS = [Layers, Building2, Wrench, Shield];

export default function FacilityInfrastructureSection({
  location,
  cluster,
  bays,
}: FacilityProps) {
  return (
    <section className="relative bg-white py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold text-navy-700 uppercase tracking-widest block mb-2">
              Plant Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
              Our manufacturing facility & production bays
            </h2>
            <p className="mt-3 text-base text-steel-600 leading-relaxed font-normal">
              Located in {location} ({cluster}), Empirical India operates dedicated engineering bays configured for machine assembly, metal pallet fabrication, and precision tubular processing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 text-xs font-semibold hover:bg-navy-100 transition-colors"
            >
              <span>Schedule Plant Visit or Technical Discussion</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* 4 Production Bays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bays.map((bay, idx) => {
            const Icon = BAY_ICONS[idx % BAY_ICONS.length] || Layers;

            return (
              <motion.div
                key={bay.title}
                className="rounded-2xl border border-steel-200/80 bg-[#f8fafc] p-6 hover:bg-white hover:border-steel-300 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-steel-200 text-navy-700 flex items-center justify-center mb-5 group-hover:bg-navy-900 group-hover:text-white transition-colors shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono text-steel-400 font-semibold block mb-1">
                    Bay 0{idx + 1}
                  </span>

                  <h3 className="text-base font-bold text-steel-900 tracking-tight mb-2">
                    {bay.title}
                  </h3>

                  <p className="text-xs text-steel-600 leading-relaxed font-normal">
                    {bay.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-steel-200/60 flex items-center justify-between text-[11px] text-steel-400">
                  <span>Nashik Plant</span>
                  <span className="font-mono text-navy-700 font-semibold">Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nashik Industrial Location Note */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-navy-900 to-steel-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold tracking-tight">
              Strategic Industrial Connectivity in Maharashtra
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-steel-300 max-w-2xl leading-relaxed">
              Situated in Maharashtra&apos;s established industrial corridor, our Nashik facility is positioned for rapid transit to Mumbai ports, domestic automotive hubs, and logistics warehouses across India.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-steel-100 text-navy-900 text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            <span>Contact Plant Team</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
