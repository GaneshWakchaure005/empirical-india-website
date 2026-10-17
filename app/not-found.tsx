import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Layers3,
  ArrowRight,
  HelpCircle,
  FileQuestion,
  Package,
  Box,
  Sun,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist or has been moved. Explore Empirical India's custom roll-forming lines, metal pallets, and tubes or return to the homepage.",
};

const quickCategories = [
  {
    name: "Roll-Forming Lines",
    description: "Custom automated roll-forming machinery and inline punching units.",
    href: "/products/roll-forming-lines",
    icon: Layers3,
  },
  {
    name: "Modular Metal Pallets",
    description: "Heavy-duty steel pallets built from roll-formed C-channels.",
    href: "/products/modular-metal-pallets",
    icon: Package,
  },
  {
    name: "Trolley-Bag Tubes",
    description: "Precision-engineered oval and ribbed square tube sections.",
    href: "/products/trolley-bag-tubes",
    icon: Box,
  },
  {
    name: "Solar Structures",
    description: "Rooftop solar mounting systems and roll-formed structural channels.",
    href: "/products/solar-structures",
    icon: Sun,
  },
];

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100dvh-180px)] flex flex-col items-center justify-center bg-slate-50 overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background ambient gradient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-blue-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Top Status Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-steel-200/80 shadow-2xs text-navy-800 text-xs font-bold uppercase tracking-wider mb-6">
          <FileQuestion size={14} className="text-navy-700" />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        {/* Large Decorative 404 */}
        <div className="relative mb-4">
          <span className="text-7xl sm:text-8xl md:text-9xl font-black text-slate-200/90 font-mono tracking-tighter select-none block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-steel-900 tracking-tight">
              Lost in Production?
            </span>
          </div>
        </div>

        {/* Explanation Copy */}
        <p className="mt-2 text-sm sm:text-base text-steel-600 max-w-xl mx-auto leading-relaxed">
          The page or engineering resource you requested does not exist or may have been moved.
          Use the quick links below to return home or explore our manufacturing solutions.
        </p>

        {/* Two Required Primary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-98"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-navy-900 font-bold text-sm border border-steel-300 shadow-2xs hover:shadow-sm transition-all active:scale-98"
          >
            <Layers3 size={16} className="text-navy-700" />
            <span>Explore Products</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Quick Navigation Cards to Product Categories */}
        <div className="mt-12 pt-10 border-t border-steel-200/70 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-steel-400 text-center mb-5">
            Or Jump Directly to a Manufacturing Vertical
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group flex items-start gap-3.5 p-4 rounded-xl border border-steel-200 bg-white hover:border-navy-300 hover:shadow-md transition-all"
                >
                  <div className="p-2 rounded-lg bg-slate-50 text-navy-700 group-hover:bg-navy-900 group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-bold text-steel-900 group-hover:text-navy-700 transition-colors truncate">
                        {cat.name}
                      </span>
                      <ArrowRight
                        size={12}
                        className="text-steel-400 group-hover:text-navy-700 group-hover:translate-x-0.5 transition-all shrink-0"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-steel-500 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Support Help Line */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-steel-500">
          <HelpCircle size={14} className="text-navy-700" />
          <span>Need a specific drawing or quotation?</span>
          <Link
            href="/contact"
            className="font-semibold text-navy-700 hover:text-navy-900 underline underline-offset-2"
          >
            Contact our engineering team
          </Link>
        </div>
      </div>
    </div>
  );
}
