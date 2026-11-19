"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, Wrench, ShieldCheck, Box, Package, Sun } from "lucide-react";
import { motion } from "framer-motion";
import type { ManufacturingFocusItem } from "@/data/03-products-and-solutions";

interface ProductsManufacturingFocusProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: readonly ManufacturingFocusItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  "roll-forming-machines": <Factory className="w-5 h-5 text-navy-700" />,
  "roll-formed-products": <ShieldCheck className="w-5 h-5 text-navy-700" />,
  "rollers-tooling": <Wrench className="w-5 h-5 text-navy-700" />,
  "modular-metal-pallets": <Package className="w-5 h-5 text-navy-700" />,
  "trolley-bag-tubes": <Box className="w-5 h-5 text-navy-700" />,
  "solar-structures": <Sun className="w-5 h-5 text-navy-700" />,
};

export default function ProductsManufacturingFocus({
  eyebrow,
  heading,
  description,
  items,
}: ProductsManufacturingFocusProps) {
  return (
    <section
      className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-steel-200"
      aria-labelledby="manufacturing-focus-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Factory size={13} className="text-navy-700" />
            <span>{eyebrow}</span>
          </span>

          <h2
            id="manufacturing-focus-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight leading-tight"
          >
            {heading}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Manufacturing Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group relative rounded-2xl border border-steel-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-navy-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row: Badge & Icon */}
                <div className="flex items-center justify-between pb-4 border-b border-steel-100 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-navy-50 transition-colors">
                    {iconMap[item.id] || <Factory className="w-5 h-5 text-navy-700" />}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-steel-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg font-bold text-steel-900 group-hover:text-navy-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-navy-700 mb-3">
                  {item.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-steel-600 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Highlights List */}
                <ul className="space-y-2 mb-6">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs text-steel-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-navy-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-steel-100 flex items-center justify-between gap-3 text-xs">
                <Link
                  href={item.href}
                  className="font-semibold text-steel-700 hover:text-navy-900 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Details</span>
                  <ArrowRight size={13} className="text-navy-700" />
                </Link>

                <Link
                  href={item.rfqHref}
                  className="font-semibold text-navy-800 hover:text-navy-950 underline underline-offset-4 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
