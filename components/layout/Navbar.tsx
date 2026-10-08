"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Roll-Forming Lines", href: "/products/roll-forming-lines" },
      { label: "Modular Metal Pallets", href: "/products/modular-metal-pallets" },
      { label: "Trolley-Bag Tubes", href: "/products/trolley-bag-tubes" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Quality", href: "/quality-manufacturing" },
  { label: "News", href: "/news" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass",
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_#e2e8f0,0_4px_16px_rgba(15,23,42,0.07)]"
          : "bg-white shadow-[0_1px_0_#e2e8f0]"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-[56px] sm:h-[66px] md:h-[76px] lg:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 h-full" aria-label="Empirical India Home">
            <div className="relative w-[230px] sm:w-[275px] md:w-[315px] lg:w-[335px] h-[56px] sm:h-[66px] md:h-[76px] lg:h-[80px]">
              <Image
                src="/images/company logo.webp"
                alt="Empirical India - Roll Forming Experts"
                fill
                sizes="(max-width: 640px) 230px, (max-width: 768px) 275px, 335px"
                className="object-contain object-left"
                priority
                loading="eager"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);

              return link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "group relative flex items-center gap-1.5 px-3 py-2 text-[15px] xl:text-[16.5px] font-semibold transition-colors duration-200 cursor-pointer",
                      isActive ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
                    )}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isActive ? "text-navy-900" : "text-steel-400 group-hover:text-navy-900",
                        activeDropdown === link.label ? "rotate-180" : ""
                      )}
                    />
                    {/* Underline expanding from left to right */}
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-0 w-full h-[2.5px] bg-gradient-to-r from-navy-800 to-blue-600 origin-left transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-steel-200 bg-white shadow-xl shadow-steel-200/60 py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-medium text-steel-600 hover:text-navy-900 hover:bg-steel-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative flex items-center px-3 py-2 text-[15px] xl:text-[16.5px] font-semibold transition-colors duration-200",
                    isActive ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
                  )}
                >
                  <span>{link.label}</span>
                  {/* Underline expanding from left to right */}
                  <span
                    className={cn(
                      "absolute bottom-0.5 left-0 w-full h-[2.5px] bg-gradient-to-r from-navy-800 to-blue-600 origin-left transition-transform duration-300 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-steel-600 hover:text-steel-900 hover:bg-steel-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-steel-100 shadow-lg">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-3 py-2.5 text-base font-semibold text-steel-700 hover:text-navy-900 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm font-medium text-steel-600 hover:text-navy-900 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-steel-100">
              <Link
                href="/contact"
                className="block text-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
