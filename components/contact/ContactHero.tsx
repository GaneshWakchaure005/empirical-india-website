"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Clock, ShieldCheck, FileText } from "lucide-react";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.887 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414z" />
    </svg>
  );
}

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
    <section className="relative bg-[#f8fafc] pt-28 pb-14 sm:pt-36 sm:pb-16 overflow-hidden border-b border-steel-200/60">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791535655/contact-page-bg-compressed.webp"
          alt="Empirical India direct technical discussion and RFQ support"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
        {/* Soft translucent gradient overlays for optimal readability & depth */}
        <div className="absolute inset-0 bg-white/40 sm:bg-white/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f4f6f9] to-transparent pointer-events-none" />
      </div>

      {/* Background blueprint watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
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

          <a
            href="https://wa.me/918669003517"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 hover:bg-emerald-100/90 hover:border-emerald-300/80 backdrop-blur-sm shadow-2xs flex items-center gap-3.5 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white border border-emerald-200/80 flex items-center justify-center shrink-0 transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-700/70 uppercase tracking-wider block group-hover:text-emerald-700 transition-colors">
                Chat on WhatsApp
              </span>
              <span className="text-sm font-bold text-emerald-900 block group-hover:text-emerald-950 transition-colors">
                +91 86690 03517
              </span>
            </div>
          </a>

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
