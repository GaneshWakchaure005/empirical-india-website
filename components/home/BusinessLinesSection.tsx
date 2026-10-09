
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers3,
} from "lucide-react";
import { motion } from "framer-motion";
import productsData, {
  type ProductCategory,
} from "@/data/products-data/products-lines";

interface BusinessLinesSectionProps {
  products?: readonly ProductCategory[];
}

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

export default function BusinessLinesSection({
  products = productsData,
}: BusinessLinesSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-gray-200 py-16 sm:py-20 lg:py-24"
      aria-labelledby="business-lines-heading"
    >
      <div
        className="section-divider absolute inset-x-0 top-0"
        aria-hidden="true"
      />

      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-blue-50/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-2xl ">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-700 sm:text-[11px]">
              <Layers3 size={14} aria-hidden="true" />
              Manufacturing Verticals
            </span>

            <h2
              id="business-lines-heading"
              className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-steel-900 sm:text-4xl lg:text-[46px]"
            >
              Our Products{" "}
              <span className="text-navy-700">And Solutions</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-steel-500 sm:text-base">
              Precision-engineered machinery and metal products designed
              around your manufacturing processes, application requirements,
              and production goals.
            </p>
          </div>

        
        </motion.div>

        {/* Product cards */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product, index) => (
            <motion.article
              key={product.slug}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative h-full"
            >
              {/* Multi-color ambient glow behind card */}
              <div
                className="pointer-events-none absolute -inset-1 rounded-3xl bg-[linear-gradient(135deg,#ec4899,#38bdf8,#facc15,#a855f7)] opacity-20 blur-xl transition-all duration-500 ease-out group-hover:opacity-70 group-hover:blur-2xl"
                aria-hidden="true"
              />

              {/* Gradient border wrapper (pink, sky blue, yellow, purple) */}
              <div className="relative flex h-full flex-col rounded-2xl p-[2px] bg-[linear-gradient(135deg,#ec4899_0%,#38bdf8_35%,#facc15_70%,#a855f7_100%)] bg-[length:220%_220%] bg-[position:0%_0%] shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-700 ease-out group-hover:bg-[position:100%_100%] group-hover:shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)]">
                <Link
                  href={product.href}
                  aria-label={`Explore ${product.name} and its product varieties`}
                  className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  {/* Sheen sweep animation on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                    aria-hidden="true"
                  />

                  {/* Image */}
                  <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 25vw, 300px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Image overlays */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/5 to-slate-950/10"
                      aria-hidden="true"
                    />

                    <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-wide text-slate-800 shadow-sm backdrop-blur-sm sm:text-[11px]">
                      <Layers3
                        size={12}
                        className="text-navy-700"
                        aria-hidden="true"
                      />
                      {product.badge}
                    </span>

                    <span className="absolute bottom-3.5 left-4 text-xs font-semibold tracking-[0.15em] text-white/90">
                      PRODUCT LINE {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-navy-700 shadow-sm">
                      <ArrowUpRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-steel-900 transition-colors duration-300 group-hover:text-navy-700">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-navy-700">
                      {product.headline}
                    </p>

                    <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-steel-500">
                      {product.short_description}
                    </p>

                    {/* Product varieties */}
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          Product varieties
                        </span>

                        <span className="text-xs font-semibold tabular-nums text-slate-400">
                          {String(product.types.length).padStart(2, "0")}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {product.types.slice(0, 3).map((type) => (
                          <li
                            key={type}
                            className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-700"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-emerald-600"
                              aria-hidden="true"
                            />
                            <span>{type}</span>
                          </li>
                        ))}
                      </ul>

                      {product.types.length > 3 && (
                        <p className="mt-2.5 pl-[25px] text-xs font-semibold text-navy-700">
                          +{product.types.length - 3} more varieties
                        </p>
                      )}
                    </div>

                    {/* Technical highlights */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.key_specs.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-1.5 text-[10px] font-medium leading-4 text-slate-600"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-5">
                      <span className="text-sm font-bold text-navy-700 transition-colors duration-300 group-hover:text-blue-700">
                        Explore Products
                      </span>

                      <ArrowRight
                        size={17}
                        className="text-navy-700 transition-transform duration-300 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div
        className="section-divider absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </section>
  );
}
