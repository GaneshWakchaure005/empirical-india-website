"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  Package,
  Box,
  Sun,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ProductLineOverview } from "@/data/03-products-and-solutions";

interface ManufacturingLinesOverviewProps {
  lines: readonly ProductLineOverview[];
}

const verticalIcons: Record<string, LucideIcon> = {
  "roll-forming-lines": Layers3,
  "modular-metal-pallets": Package,
  "trolley-bag-tubes": Box,
  "solar-structures": Sun,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ManufacturingLinesOverview({
  lines,
}: ManufacturingLinesOverviewProps) {
  return (
    <section
      id="manufacturing-verticals"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 border-b border-steel-200"
      aria-labelledby="manufacturing-lines-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="mb-12 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-navy-100 bg-navy-50/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-800">
              <Layers3 size={13} aria-hidden="true" />
              Primary Business Verticals
            </span>

            <h2
              id="manufacturing-lines-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-steel-900"
            >
              Four Core <span className="text-navy-700">Manufacturing Lines</span>
            </h2>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-steel-600">
              Each vertical operates as a dedicated engineering unit at our Nashik plant,
              providing custom tooling design, structural simulation, precision forming, and factory trial verification.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-all shadow-xs"
            >
              <span>Submit General RFQ</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {lines.map((line, index) => {
            const Icon = verticalIcons[line.slug] || Layers3;

            return (
              <motion.article
                key={line.slug}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group relative flex flex-col h-full rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-navy-200 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header / Cloudinary Image */}
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Badge */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-800 shadow-xs backdrop-blur-sm">
                    <Icon size={12} className="text-navy-700" aria-hidden="true" />
                    {line.badge}
                  </span>

                  <span className="absolute bottom-2.5 left-3 text-[11px] font-mono font-semibold tracking-wider text-white/90">
                    VERTICAL {line.category_number || String(index + 1).padStart(2, "0")}
                  </span>

                  <Link
                    href={line.internal_href}
                    aria-label={`Explore ${line.name}`}
                    className="absolute bottom-2.5 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-navy-700 shadow-xs"
                  >
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-steel-900 group-hover:text-navy-700 transition-colors">
                    <Link href={line.internal_href} className="focus-visible:outline-none focus-visible:underline">
                      {line.name}
                    </Link>
                  </h3>

                  <p className="mt-1.5 text-xs font-semibold leading-5 text-navy-700">
                    {line.headline}
                  </p>

                  <p className="mt-2.5 text-xs leading-relaxed text-steel-600 line-clamp-3">
                    {line.short_description}
                  </p>

                  {/* Key Varieties List */}
                  <div className="mt-4 border-t border-slate-100 pt-3.5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        Available Products ({line.types.length})
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {line.types.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-4 text-slate-700 line-clamp-1"
                        >
                          <CheckCircle2
                            size={13}
                            className="mt-0.5 shrink-0 text-emerald-600"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {line.types.length > 3 && (
                      <p className="mt-1.5 text-[11px] font-semibold text-navy-700 pl-5">
                        +{line.types.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Technical Specs Tags */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {line.key_specs.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium leading-4 text-slate-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Dual Action Footers */}
                  <div className="mt-auto border-t border-slate-100 pt-4 mt-5 flex items-center justify-between gap-2">
                    <Link
                      href={line.internal_href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:text-blue-700 transition-colors"
                    >
                      <span>Explore Line</span>
                      <ArrowRight size={13} />
                    </Link>

                    <Link
                      href={line.rfq_href}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-steel-700 bg-slate-100 hover:bg-navy-50 hover:text-navy-800 transition-colors"
                    >
                      <FileText size={12} />
                      <span>Request Quote</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
