"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Mail, Phone } from "lucide-react";

export default function AboutCTASection() {
  return (
    <section className="relative bg-[#f8fafc] py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold text-navy-700 uppercase tracking-widest block mb-2">
              Start An Engineering Discussion
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
              Ready to review your machine, pallet, or tube requirement?
            </h2>

            <p className="mt-4 text-base text-steel-600 leading-relaxed font-normal">
              Share your drawing, sample, material specification, or pallet load case. Our engineering team in Nashik will review the parameters and schedule a technical discussion.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-all shadow-md active:scale-98"
              >
                <span>Request a Technical Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-semibold text-sm transition-all"
              >
                <span>Browse Products & Solutions</span>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-steel-200/80 flex flex-wrap items-center justify-center gap-8 text-xs text-steel-500 font-medium">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-navy-700" />
                <span>Upload 2D/3D Drawings & Specs</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-navy-700" />
                <span>Direct Technical Sales Communication</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-navy-700" />
                <span>Nashik, Maharashtra Production Plant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
