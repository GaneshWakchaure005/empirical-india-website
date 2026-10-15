"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Projects from "@/data/09-projects";

export interface CustomerLogo {
  readonly name: string;
  readonly logoUrl: string;
}

interface CustomerLogosSectionProps {
  logos?: readonly CustomerLogo[];
  customerNames?: readonly string[];
  verificationNote?: string;
}

export default function CustomersSection({
  logos,
}: CustomerLogosSectionProps) {
  const logoList =
    logos && logos.length > 0
      ? logos
      : Projects.customer_names_and_logo_handling.approved_customer_logos;

  // Duplicate items within a set to ensure continuous seamless coverage on all screen sizes
  const displayLogos = [...logoList, ...logoList];

  return (
    <section
      className="relative bg-[#f4f6f9] py-16 sm:py-20 overflow-hidden"
      aria-labelledby="customers-heading"
    >
      {/* Self-contained keyframes guarantee uninterrupted automatic sliding */}
      <style>{`
        @keyframes marqueeAutoScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-auto-track {
          display: flex;
          width: max-content;
          animation: marqueeAutoScroll 28s linear infinite !important;
          will-change: transform;
        }
      `}</style>

      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-3">
            Customers
          </span>
          <h2
            id="customers-heading"
            className="text-2xl sm:text-3xl font-bold text-steel-900 tracking-tight"
          >
            Companies we have worked with
          </h2>
          <p className="mt-3 text-sm text-steel-500 max-w-lg mx-auto leading-relaxed">
            Trusted by industry leaders in infrastructure, heavy manufacturing, and commercial enterprise.
          </p>
        </motion.div>
      </div>

      {/* Automatic Continuous Marquee Slider with Edge Fade Gradients */}
      <div className="relative w-full overflow-hidden py-3 select-none">
        {/* Left & Right Fade Masks for smooth edge transition */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#f4f6f9] via-[#f4f6f9]/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#f4f6f9] via-[#f4f6f9]/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Automatic Continuous Sliding Track (Right to Left) */}
        <div className="marquee-auto-track flex items-center">
          {/* Set 1 */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
            {displayLogos.map((logo, idx) => (
              <div
                key={`set1-${logo.name}-${idx}`}
                className="relative flex shrink-0 items-center justify-center h-22 sm:h-24 md:h-26 w-44 sm:w-52 md:w-56 px-5 py-3.5 rounded-xl bg-white border border-steel-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] cursor-default select-none"
              >
                <Image
                  src={logo.logoUrl}
                  alt={`${logo.name} logo`}
                  width={180}
                  height={64}
                  className="max-h-10 sm:max-h-12 w-auto max-w-[82%] object-contain"
                />
              </div>
            ))}
          </div>

          {/* Set 2 (Duplicate for infinite seamless loop) */}
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8"
            aria-hidden="true"
          >
            {displayLogos.map((logo, idx) => (
              <div
                key={`set2-${logo.name}-${idx}`}
                className="relative flex shrink-0 items-center justify-center h-22 sm:h-24 md:h-26 w-44 sm:w-52 md:w-56 px-5 py-3.5 rounded-xl bg-white border border-steel-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] cursor-default select-none"
              >
                <Image
                  src={logo.logoUrl}
                  alt=""
                  tabIndex={-1}
                  width={180}
                  height={64}
                  className="max-h-10 sm:max-h-12 w-auto max-w-[82%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
