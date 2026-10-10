"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Mail, MapPin, ExternalLink } from "lucide-react";

const footerProducts = [
  { label: "Roll-Forming Lines", href: "/products/roll-forming-lines" },
  { label: "Modular Metal Pallets", href: "/products/modular-metal-pallets" },
  { label: "Trolley-Bag Tubes", href: "/products/trolley-bag-tubes" },
  { label: "Solar Structures", href: "/products/solar-structures" },
];

const footerCompany = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products and solutions", href: "/products/roll-forming-lines" },
  { label: "Industries", href: "/industries" },
  { label: "News & Events", href: "/news" },
  { label: "Blogs & Insights", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

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

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
<footer className="bg-steel-900 text-steel-300">
  {/* Main Footer */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
    <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-6 lg:gap-6">

      {/* Brand */}
      <div className="col-span-2 sm:col-span-1 lg:col-span-4">
        <Link href="/" aria-label="Empirical India Home" className="inline-block mb-2">
          <div className="relative w-[130px] sm:w-[145px] h-[32px]">
            <Image
              src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp"
              alt="Empirical India"
              fill
              sizes="145px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        <p className="text-[11px] sm:text-xs text-steel-400 leading-relaxed max-w-sm">
          Engineering-led manufacturer of custom roll-forming lines, modular metal pallets, tubes for trolley bags, and solar structures.
        </p>
      </div>

      {/* Products */}
      <div className="lg:col-span-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-steel-400 mb-2">
          Products
        </h3>
        <ul className="space-y-1.5">
          {footerProducts.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-0.5 text-[11px] sm:text-xs text-steel-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div className="lg:col-span-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-steel-400 mb-2">
          Company
        </h3>
        <ul className="space-y-1.5">
          {footerCompany.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block py-0.5 text-[11px] sm:text-xs text-steel-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect */}
      <div className="col-span-2 sm:col-span-1 lg:col-span-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-steel-400 mb-2">
          Connect With Us
        </h3>

        <div className="space-y-1.5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/918669003517"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-steel-950/50 border border-white/[0.05] hover:border-emerald-600/40 transition-colors group"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white">
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-steel-300">
                +91 86690 03517
              </span>
              <span className="block text-[10px] text-steel-500">WhatsApp</span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/empirical_india_solar?xtok=MTFtdHU5bm41bWV1Yw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Empirical India on Instagram"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-steel-950/50 border border-white/[0.05] hover:border-pink-500/40 transition-colors group"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-pink-500/10 text-pink-400">
              <InstagramIcon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-steel-300">
                @empirical_india_solar
              </span>
              <span className="block text-[10px] text-steel-500">Instagram</span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:sales@empiricalindia.com"
            aria-label="Send email to sales"
            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-steel-950/50 border border-white/[0.05] hover:border-blue-500/40 transition-colors group"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-500/10 text-blue-400">
              <Mail size={14} />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-steel-300">
                sales@empiricalindia.com
              </span>
              <span className="block text-[10px] text-steel-500">Email Inquiry</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Manufacturing Location */}
  <div className="border-t border-white/[0.06] bg-steel-950/60 py-4 sm:py-5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <MapPin size={12} />
            <span>Manufacturing Plant Location</span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-white">
            Empirical India — Roll Forming Machine Manufacturer
          </h4>

          <p className="text-[11px] text-steel-400 mt-1 leading-relaxed">
            XLO Point, Chunchale Gaon, MIDC Ambad, Nashik, Maharashtra 422010
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=Empirical+India+Roll+Forming+Machine+Manufacturer+Nashik"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex self-start sm:self-center items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-steel-800 hover:bg-steel-700 text-steel-200 text-[10px] sm:text-xs border border-steel-700/80 shrink-0"
        >
          Open in Google Maps
          <ExternalLink size={11} />
        </a>
      </div>

      <div className="w-full h-[140px] sm:h-[180px] lg:h-[200px] rounded-lg overflow-hidden border border-white/10 relative bg-steel-900">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.3262335011021!2d73.72461784299102!3d19.965087499705678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdded1969be5401%3A0xef43b713a1b067b6!2sEmpirical%20India%2CRoll%20Forming%20Machine%20Manufacturer!5e1!3m2!1sen!2sin!4v1791480573816!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Empirical India Manufacturing Plant Location"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="border-t border-white/[0.06] bg-steel-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
      <p className="text-[10px] sm:text-xs text-steel-500 text-center sm:text-left">
        &copy; {currentYear} Empirical India. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
}
