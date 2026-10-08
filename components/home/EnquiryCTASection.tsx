"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Package, Cylinder, Settings } from "lucide-react";

const enquiryPaths = [
  {
    id: "roll-forming",
    label: "Roll-Forming Line",
    description: "Share a profile drawing or sample to begin a technical discussion.",
    cta: "Share a profile drawing or sample",
    href: "/contact?product=roll-forming-lines",
    icon: Settings,
    iconBg: "bg-navy-700/8 border-navy-700/15",
    iconColor: "text-navy-700",
    accentBar: "bg-navy-700",
  },
  {
    id: "metal-pallets",
    label: "Metal Pallets",
    description: "Send product dimensions, handling method, and load case details.",
    cta: "Request a custom pallet review",
    href: "/contact?product=modular-metal-pallets",
    icon: Package,
    iconBg: "bg-red-brand/8 border-red-brand/15",
    iconColor: "text-red-brand",
    accentBar: "bg-red-brand",
  },
  {
    id: "trolley-tubes",
    label: "Trolley-Bag Tubes",
    description: "Send a tube drawing or sample to confirm material, section, and dimensions.",
    cta: "Send a tube drawing or sample",
    href: "/contact?product=trolley-bag-tubes",
    icon: Cylinder,
    iconBg: "bg-steel-100 border-steel-200",
    iconColor: "text-steel-600",
    accentBar: "bg-steel-400",
  },
];

export default function EnquiryCTASection() {
  return (
    <section
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="enquiry-cta-heading"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-navy-700 mb-4">
            Start a Conversation
          </span>
          <h2
            id="enquiry-cta-heading"
            className="text-3xl sm:text-4xl font-bold text-steel-900 tracking-tight max-w-2xl mx-auto"
          >
            Ready to discuss your requirement?
          </h2>
          <p className="mt-4 text-steel-500 text-base max-w-xl mx-auto leading-relaxed">
            Select the relevant capability and share your drawing, sample, or application details.
            Our team will review and respond with a technical discussion.
          </p>
        </motion.div>

        {/* Enquiry paths */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {enquiryPaths.map((path) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
              >
                <Link
                  href={path.href}
                  id={`enquiry-${path.id}`}
                  className="group flex flex-col h-full p-6 rounded-2xl border border-steel-200 bg-[#f8fafc] hover:bg-white hover:border-steel-300 hover:shadow-lg hover:shadow-steel-200/60 card-lift transition-all duration-300"
                  aria-label={`Enquire about ${path.label}`}
                >
                  {/* Accent bar */}
                  <div className={`w-8 h-[3px] rounded-full mb-4 ${path.accentBar}`} aria-hidden="true" />

                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${path.iconBg} transition-transform duration-300 group-hover:scale-105`}
                    aria-hidden="true"
                  >
                    <Icon size={20} className={path.iconColor} />
                  </div>

                  <h3 className="text-base font-bold text-steel-900 mb-2">{path.label}</h3>
                  <p className="text-sm text-steel-500 leading-relaxed flex-1 mb-4">{path.description}</p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-700 group-hover:text-navy-600 transition-colors">
                    <FileText size={12} />
                    <span>{path.cta}</span>
                    <ArrowRight size={11} className="ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* General CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-steel-400 mb-5">
            Not sure which capability applies? Share your requirement and our team will advise.
          </p>
          <Link
            href="/contact"
            id="general-enquiry-cta"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <FileText size={16} />
            Discuss a requirement
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
