"use client";

import Link from "next/link";
import { ArrowRight, Settings, Package, Cylinder } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BusinessLineCard {
  capability: string;
  copy: string;
}

interface BusinessLinesSectionProps {
  cards: readonly BusinessLineCard[];
}

const cardMeta = [
  {
    icon: Settings,
    href: "/products/roll-forming-lines",
    cta: "Explore roll-forming",
    iconBg: "bg-navy-700/8 border-navy-700/15",
    iconColor: "text-navy-700",
    accentBar: "bg-navy-700",
  },
  {
    icon: Package,
    href: "/products/modular-metal-pallets",
    cta: "Explore metal pallets",
    iconBg: "bg-red-brand/8 border-red-brand/15",
    iconColor: "text-red-brand",
    accentBar: "bg-red-brand",
  },
  {
    icon: Cylinder,
    href: "/products/trolley-bag-tubes",
    cta: "Explore tube products",
    iconBg: "bg-steel-700/8 border-steel-200",
    iconColor: "text-steel-600",
    accentBar: "bg-steel-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BusinessLinesSection({ cards }: BusinessLinesSectionProps) {
  return (
    <section
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="business-lines-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-4">
            Three Manufacturing Capabilities
          </span>
          <h2
            id="business-lines-heading"
            className="text-3xl sm:text-4xl font-bold text-steel-900 tracking-tight max-w-2xl mx-auto"
          >
            What Empirical India makes
          </h2>
          <p className="mt-4 text-steel-500 text-base max-w-xl mx-auto leading-relaxed">
            Three distinct product and machinery businesses, each configured around specific customer requirements.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {cards.map((card, index) => {
            const meta = cardMeta[index];
            const Icon = meta.icon;
            return (
              <motion.div key={card.capability} variants={cardVariants}>
                <Link
                  href={meta.href}
                  className="group flex flex-col h-full p-7 rounded-2xl border border-steel-200 bg-white hover:border-steel-300 hover:shadow-lg hover:shadow-steel-200/50 card-lift transition-all duration-300"
                  aria-label={`Learn more about ${card.capability}`}
                >
                  {/* Accent top bar */}
                  <div className={cn("w-10 h-[3px] rounded-full mb-5", meta.accentBar)} aria-hidden="true" />

                  {/* Icon */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 transition-transform duration-300 group-hover:scale-105",
                      meta.iconBg
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={20} className={meta.iconColor} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-steel-900 mb-3 leading-snug">
                    {card.capability}
                  </h3>

                  {/* Body */}
                  <p className="text-sm text-steel-500 leading-relaxed flex-1">
                    {card.copy}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-navy-700 group-hover:text-navy-600 transition-colors">
                    <span>{meta.cta}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-steel-500 hover:text-navy-700 transition-colors group"
          >
            View all capabilities
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
