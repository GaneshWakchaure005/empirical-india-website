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
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-3">
            Manufacturing Verticals
          </span>
          <h2
            id="business-lines-heading"
            className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight max-w-2xl mx-auto"
          >
            Our Products And Solutions
          </h2>
          <p className="mt-3.5 text-steel-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Engineering-led machinery and metal products, each configured around customer-defined profiles, load cases, and production requirements.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
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
                className="group relative flex flex-col h-full rounded-2xl p-[2.5px] sm:p-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2
                  bg-[linear-gradient(135deg,#dc2626,#f59e0b,#38bdf8,#1a3a8f)]
                  sm:bg-[linear-gradient(135deg,#cbd5e1,#e2e8f0)]
                  sm:hover:bg-[linear-gradient(135deg,#dc2626,#f59e0b,#38bdf8,#1a3a8f)]"
                aria-label={`Learn more about ${product.name}`}
              >
                <div className="relative flex flex-col h-full rounded-[14px] bg-white overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-44 w-full overflow-hidden shrink-0 border-b border-steel-100 bg-steel-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-950/20 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-10" />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-steel-900 leading-snug group-hover:text-navy-700 transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Body Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-left text-steel-500 leading-relaxed group-hover:text-steel-600 transition-colors duration-300 line-clamp-4">
                        {product.short_description}
                      </p>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-5 pt-4 border-t border-steel-100 flex items-center text-xs font-semibold text-navy-700 group-hover:text-red-600 transition-colors duration-300">
                      <span className="inline-flex items-center gap-1.5">
                        <span>View Products</span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform duration-300"
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
