"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowRight, ExternalLink } from "lucide-react";

const footerProducts = [
  { label: "Roll-Forming Lines", href: "/products/roll-forming-lines" },
  { label: "Modular Metal Pallets", href: "/products/modular-metal-pallets" },
  { label: "Trolley-Bag Tubes", href: "/products/trolley-bag-tubes" },
];

const footerCompany = [
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Quality & Manufacturing", href: "/quality-manufacturing" },
  { label: "News & Events", href: "/news" },
  { label: "Careers", href: "/careers" },
];

const footerLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-steel-900 text-steel-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Empirical India Home" className="inline-block mb-5">
              <div className="relative w-[160px] h-[40px]">
                <Image
                  src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp"
                  alt="Empirical India"
                  fill
                  sizes="160px"
                  className="object-contain object-center"
                  loading="eager"
                />
              </div>
            </Link>
            <p className="text-sm text-steel-400 leading-relaxed mb-6">
              Nashik-based manufacturer of custom roll-forming lines, modular metal pallets, and tubes for trolley-bag manufacturing.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@empiricalindia.com"
                className="flex items-center gap-2.5 text-sm text-steel-400 hover:text-white transition-colors group"
              >
                <Mail size={14} className="text-steel-500 shrink-0 group-hover:text-steel-300 transition-colors" />
                <span>sales@empiricalindia.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-steel-400">
                <MapPin size={14} className="text-steel-500 shrink-0 mt-0.5" />
                <span>Nashik, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-500 mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {footerProducts.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-500 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-steel-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-steel-500 mb-5">
              Start a Discussion
            </h3>
            <p className="text-sm text-steel-400 leading-relaxed mb-5">
              Share a drawing, sample, or application requirement to begin a technical conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-navy-700 hover:bg-navy-600 transition-all duration-200 group"
            >
              Request a Quote
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Google Maps Location Box in Footer Bottom */}
      <div className="border-t border-white/[0.08] bg-steel-950/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1">
                <MapPin size={14} className="text-navy-400" />
                <span>Manufacturing Plant Location</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Empirical India — Roll Forming Machine Manufacturer
              </h3>
              <p className="text-xs text-steel-400 mt-0.5">
                Nashik, Maharashtra, India • Industrial Machinery & Engineering Facility
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Empirical+India+Roll+Forming+Machine+Manufacturer+Nashik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-steel-800/90 hover:bg-steel-700 text-steel-200 text-xs font-medium transition-colors border border-steel-700/80 shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-steel-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.3262335011021!2d73.72461784299102!3d19.965087499705678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdded1969be5401%3A0xef43b713a1b067b6!2sEmpirical%20India%2CRoll%20Forming%20Machine%20Manufacturer!5e1!3m2!1sen!2sin!4v1791480573816!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Empirical India Manufacturing Plant Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-steel-600">
            &copy; {currentYear} Empirical India. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {footerLegal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-steel-600 hover:text-steel-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
