"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ArrowRight, Layers3 } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductChild } from "@/data/products-data/types";
import TechnicalPlaceholder from "./TechnicalPlaceholder";

interface ProductRangeGridProps {
  products: readonly ProductChild[];
  categorySlug?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export default function ProductRangeGrid({
  products,
  categorySlug = "roll-forming-lines",
}: ProductRangeGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {products.map((product, index) => {
        const productHref = `/products/${categorySlug}/${product.slug}`;
        const enquiryHref = `/contact?product=${categorySlug}&module=${product.slug}`;

        return (
          <motion.article
            key={product.slug}
            variants={cardVariants}
            className="group relative flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.11)] overflow-hidden"
          >
            {/* Visual Header / Blueprint Image */}
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
              <TechnicalPlaceholder
                image={product.image}
                alt={product.name}
                category="Roll Forming Module"
                className="h-full w-full"
              />

              {/* Module Badge */}
              <div className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-md">
                <Layers3 size={12} className="text-cyan-400" aria-hidden="true" />
                <span>MODULE {String(index + 1).padStart(2, "0")}</span>
              </div>

              {/* Top-Right Quick Link Icon */}
              <Link
                href={productHref}
                aria-label={`View full details for ${product.name}`}
                className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-navy-900"
              >
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              {/* Product Title */}
              <h3 className="text-xl font-bold leading-snug tracking-tight text-steel-900 transition-colors duration-300 group-hover:text-navy-700">
                <Link href={productHref} className="focus-visible:outline-none focus-visible:underline">
                  {product.name}
                </Link>
              </h3>

              {/* Short Description */}
              <p className="mt-2.5 text-sm leading-relaxed text-steel-600 line-clamp-2">
                {product.shortDescription}
              </p>

              {/* Highlights List */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 block mb-2.5">
                  Engineering Highlights
                </span>
                <ul className="space-y-2">
                  {product.highlights.slice(0, 3).map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs leading-5 text-slate-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Preview */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100/80">
                  {product.specifications.slice(0, 2).map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200/90 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                    >
                      <span className="text-slate-400 font-semibold">{spec.label}:</span>
                      <span className="text-slate-700">{spec.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Actions Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-5">
                <Link
                  href={productHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-700 transition-all duration-300 hover:text-navy-900 group-hover:translate-x-0.5"
                >
                  <span>View Product</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>

                <Link
                  href={enquiryHref}
                  className="text-xs font-semibold text-steel-500 transition-colors hover:text-navy-700 underline underline-offset-4"
                >
                  Request Specs
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
