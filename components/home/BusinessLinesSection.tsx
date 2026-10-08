"use client";

import Link from "next/link";
import Image from "next/image";
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
    image: "/images/bg1.jpg",
  },
  {
    icon: Package,
    href: "/products/modular-metal-pallets",
    cta: "Explore metal pallets",
    iconBg: "bg-red-brand/8 border-red-brand/15",
    iconColor: "text-red-brand",
    accentBar: "bg-red-brand",
    image: "/images/bg2.png",
  },
  {
    icon: Cylinder,
    href: "/products/trolley-bag-tubes",
    cta: "Explore tube products",
    iconBg: "bg-steel-700/8 border-steel-200",
    iconColor: "text-steel-600",
    accentBar: "bg-steel-400",
    image: "/images/bg3.png",
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

export default function BusinessLinesSection({
  cards,
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
          <h2
            id="business-lines-heading"
            className="text-3xl sm:text-4xl font-bold text-steel-900 tracking-tight max-w-2xl mx-auto"
          >
            Our Products And Solutions
          </h2>
          <p className="mt-4 text-steel-500 text-base max-w-xl mx-auto leading-relaxed">
            Three distinct product and machinery businesses, each configured
            around specific customer requirements.
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
              <motion.div
                key={card.capability}
                variants={cardVariants}
                className="h-full"
              >
                <Link
                  href={meta.href}
                  className="group relative flex flex-col h-full rounded-2xl bg-gradient-to-br from-steel-300 to-steel-200 hover:bg-[linear-gradient(to_bottom_right,#f472b6,#fde047,#38bdf8,#ffffff)] p-[3px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
                  aria-label={`Learn more about ${card.capability}`}
                >
                  <div className="relative flex flex-col h-full rounded-[15px] bg-white overflow-hidden">
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-steel-100">
                      <Image
                        src={meta.image}
                        alt={card.capability}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* Optional subtle overlay for better image contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-900/5 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                    </div>

                    <div className="flex flex-col flex-1 p-7">
                      {/* Accent top bar */}
                      <div
                        className={cn(
                          "w-10 h-[3px] rounded-full mb-5 transition-all duration-500",
                          meta.accentBar,
                        )}
                        aria-hidden="true"
                      />

                      {/* Title */}
                      <h3 className="text-lg font-bold text-steel-900 mb-3 leading-snug group-hover:text-navy-700 transition-colors duration-300">
                        {card.capability}
                      </h3>

                      {/* Body */}
                      <p className="text-sm text-steel-500 leading-relaxed flex-1 group-hover:text-steel-600 transition-colors duration-300">
                        {card.copy}
                      </p>

                      {/* CTA */}
                      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-navy-700 group-hover:text-teal-600 transition-colors duration-300">
                        <span>{meta.cta}</span>
                        <ArrowRight
                          size={12}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </div>
                    </div>
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
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      <div
        className="section-divider absolute inset-x-0 bottom-0"
        aria-hidden="true"
      />
    </section>
  );
}
