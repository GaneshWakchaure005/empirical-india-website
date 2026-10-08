"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.18 },
  },
};

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
  { label: "News", href: "/news" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
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

  // Lock background scroll when mobile fullscreen menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass",
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_#e2e8f0,0_4px_16px_rgba(15,23,42,0.07)]"
          : "bg-white shadow-[0_1px_0_#e2e8f0]"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full h-[54px] sm:h-[62px] md:h-[68px] lg:h-[72px] xl:h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 h-full" aria-label="Empirical India Home">
            <div className="relative w-[210px] sm:w-[250px] md:w-[270px] lg:w-[280px] xl:w-[310px] h-[64px] sm:h-[62px] md:h-[68px] lg:h-[72px] xl:h-[76px]">
              <Image
                src="/images/company logo.webp"
                alt="Empirical India - Roll Forming Experts"
                fill
                sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 310px"
                className="object-contain object-left"
                priority
                loading="eager"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 2xl:gap-3 flex-1 px-2 xl:px-4" aria-label="Main navigation">
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
                      "group flex items-center gap-1 px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap",
                      isActive ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
                    )}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    <span className="relative inline-block">
                      {link.label}

                      {/* Underline matches text width */}
                      <span
                        className={cn(
                          "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </span>

                    <ChevronDown
                      size={13}
                      className={cn(
                        "transition-transform duration-200",
                        isActive
                          ? "text-navy-900"
                          : "text-steel-400 group-hover:text-navy-900",
                        activeDropdown === link.label ? "rotate-180" : ""
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
                    "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                    isActive ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
                  )}
                >
                  <span className="relative inline-block">
                    {link.label}

                    {/* Underline exactly matches text width */}
                    <span
                      className={cn(
                        "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center px-3.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-all duration-200 shadow-sm hover:shadow-md shrink-0 whitespace-nowrap"
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

      {/* Full-Screen Mobile Menu Overlay with Staggered Center Navlinks */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 h-[100dvh] w-screen bg-white/98 backdrop-blur-2xl flex flex-col justify-between overflow-hidden lg:hidden"
          >
            {/* Mobile Header Bar (Matches logo & provides close button) */}
            <div className="w-full px-4 sm:px-6 flex items-center justify-between h-[54px] sm:h-[62px] md:h-[68px] border-b border-steel-100 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center shrink-0 h-full"
                aria-label="Empirical India Home"
              >
                <div className="relative w-[210px] sm:w-[250px] h-[54px] sm:h-[62px]">
                  <Image
                    src="/images/company logo.webp"
                    alt="Empirical India - Roll Forming Experts"
                    fill
                    sizes="210px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>

              <button
                className="p-2 text-steel-700 hover:text-navy-900 hover:bg-steel-100 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Vertically & Horizontally Centered Animated Navlinks */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto py-8 sm:py-10">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center justify-center space-y-5 sm:space-y-6 md:space-y-7 w-full"
                aria-label="Mobile Navigation"
              >
                {navLinks.map((link) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);

                  return (
                    <motion.div key={link.label} variants={itemVariants} className="w-full text-center">
                      {link.children ? (
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                            className={cn(
                              "group flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight transition-colors py-1 cursor-pointer",
                              isActive ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                            )}
                          >
                            <span className="relative inline-block">
                              {link.label}
                              <span
                                className={cn(
                                  "absolute left-0 -bottom-1 h-[2.5px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )}
                              />
                            </span>
                            <ChevronDown
                              size={18}
                              className={cn(
                                "transition-transform duration-200",
                                activeDropdown === link.label ? "rotate-180" : ""
                              )}
                            />
                          </button>

                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2.5 flex flex-col items-center space-y-2 py-1"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-base font-semibold text-steel-600 hover:text-navy-900 transition-colors py-1"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "group inline-block text-xl sm:text-2xl font-bold tracking-tight transition-colors py-1",
                            isActive ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                          )}
                        >
                          <span className="relative inline-block">
                            {link.label}
                            <span
                              className={cn(
                                "absolute left-0 -bottom-1 h-[2.5px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                              )}
                            />
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* Staggered Final CTA Button */}
                <motion.div variants={itemVariants} className="pt-6 sm:pt-8 w-full max-w-xs mx-auto">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center py-3.5 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-navy-700 to-blue-700 hover:from-navy-800 hover:to-blue-800 shadow-lg shadow-navy-900/20 active:scale-95 transition-all"
                  >
                    Request a Quote
                  </Link>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
