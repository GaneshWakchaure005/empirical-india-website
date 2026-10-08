"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, ShieldCheck, FileText } from "lucide-react";

interface ContactHeroProps {
  introduction: string;
  email: string;
  plantHours: string;
}

export default function ContactHero({
  introduction,
  email,
  plantHours,
}: ContactHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f6f9] pt-28 pb-14 sm:pt-36 sm:pb-16 overflow-hidden border-b border-steel-200/60">
      {/* Background blueprint watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2.5 mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
              <span>Technical Enquiries & RFQ</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-steel-100 text-steel-700 text-xs font-medium border border-steel-200">
              <MapPin className="w-3.5 h-3.5 text-navy-700" />
              <span>Nashik Plant, Maharashtra</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.15]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Start a direct technical discussion with our engineering team.
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg text-steel-600 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            {introduction}
          </motion.p>
        </div>

        {/* Quick Contact Bar */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="p-4 rounded-2xl border border-steel-200/80 bg-white/90 backdrop-blur-sm shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 border border-navy-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-steel-400 uppercase tracking-wider block">
                Technical Sales Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-sm font-bold text-steel-900 hover:text-navy-700 transition-colors truncate block"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-steel-200/80 bg-white/90 backdrop-blur-sm shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 border border-navy-100 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-steel-400 uppercase tracking-wider block">
                Plant Hours (Mon – Sat)
              </span>
              <span className="text-sm font-bold text-steel-900 block">
                9:00 AM – 6:30 PM IST
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-steel-200/80 bg-white/90 backdrop-blur-sm shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 border border-navy-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-steel-400 uppercase tracking-wider block">
                Confidentiality
              </span>
              <span className="text-sm font-bold text-steel-900 block">
                NDA & Drawing Security
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
