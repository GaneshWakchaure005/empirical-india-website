"use client";

import { motion } from "framer-motion";

interface CustomerLogosSectionProps {
  customerNames: readonly string[];
  verificationNote: string;
}

export default function CustomersSection({
  customerNames,
  verificationNote,
}: CustomerLogosSectionProps) {
  return (
    <section
      className="relative bg-[#f4f6f9] py-16 sm:py-20"
      aria-labelledby="customers-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
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
            Customer names are shown as text only. Logos require written approval before display.
          </p>
        </motion.div>

        {/* Customer name pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {customerNames.map((name) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
              }}
              className="px-5 py-2.5 rounded-full border border-steel-200 bg-white text-sm font-medium text-steel-600 hover:border-navy-700/30 hover:text-navy-700 hover:shadow-sm transition-all duration-200 cursor-default shadow-sm"
            >
              {name}
            </motion.div>
          ))}
        </motion.div>

        {/* Pending note */}
        <motion.p
          className="mt-8 text-center text-xs text-steel-400 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          ⚠️ Pending client approval: {verificationNote}
        </motion.p>
      </div>

      <div className="section-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
