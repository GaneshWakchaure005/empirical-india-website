"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductsAndSolutions from "@/data/03-products-and-solutions";

interface ProductItem {
  readonly name: string;
  readonly slug: string;
  readonly short_description: string;
  readonly image: string;
  readonly href: string;
}

interface BusinessLinesSectionProps {
  products?: readonly ProductItem[];
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
  hidden: { opacity: 0, y: 28 },
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
  products = ProductsAndSolutions.products,
}: BusinessLinesSectionProps) {
  return (
    <section
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="business-lines-heading"
    >
      <div
        className="section-divider absolute inset-x-0 top-0"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-700">
            Manufacturing Verticals
          </span>

          <h2
            id="business-lines-heading"
            className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl"
          >
            Our Products And Solutions
          </h2>

          <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-steel-500 sm:text-base">
            Engineering-led machinery and metal products, each configured
            around customer-defined profiles, load cases, and production
            requirements.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                href={product.href}
                aria-label={`Learn more about ${product.name}`}
                className="group relative flex h-full flex-col rounded-2xl p-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2
                  bg-[linear-gradient(135deg,#cbd5e1,#e2e8f0)]
                  hover:bg-[linear-gradient(135deg,#dc2626,#f59e0b,#38bdf8,#1a3a8f)]"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-white">
                  {/* Image */}
                  <div className="relative h-40 w-full shrink-0 overflow-hidden border-b border-steel-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority={product.slug === "roll-forming-lines"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-steel-900/10 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="text-base font-bold leading-snug text-steel-900 transition-colors duration-300 group-hover:text-navy-700 sm:text-lg">
                        {product.name}
                      </h3>

                      <p className="mt-2.5 line-clamp-4 text-left text-xs leading-relaxed text-steel-500 transition-colors duration-300 group-hover:text-steel-600 sm:text-sm">
                        {product.short_description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-5 flex items-center border-t border-steel-100 pt-4 text-xs font-semibold text-navy-700 transition-colors duration-300 group-hover:text-red-600">
                      <span className="inline-flex items-center gap-1.5">
                        <span>View Products</span>
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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