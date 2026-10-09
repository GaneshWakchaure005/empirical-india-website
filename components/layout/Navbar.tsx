"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Layers3,
  Package,
  Box,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  rollFormingLines,
  modularPallets,
  tubesForTrolleyBags,
  solarStructure,
} from "@/data/products-data";

interface ProductCategoryNav {
  id: string;
  name: string;
  href: string;
  tagline: string;
  badge: string;
  icon: LucideIcon;
  items: {
    name: string;
    href: string;
  }[];
}

// Derived dynamically from centralized data source of truth
const productCategories: ProductCategoryNav[] = [
  {
    id: "roll-forming-lines",
    name: rollFormingLines.name,
    href: "/products/roll-forming-lines",
    tagline: rollFormingLines.tagline,
    badge: `${rollFormingLines.children.length} Products`,
    icon: Layers3,
    items: rollFormingLines.children.map((child) => ({
      name: child.name,
      href: `/products/roll-forming-lines/${child.slug}`,
    })),
  },
  {
    id: "modular-metal-pallets",
    name: "Modular Metal Pallets",
    href: "/products/modular-metal-pallets",
    tagline: modularPallets.tagline,
    badge: `${modularPallets.children.length} Products`,
    icon: Package,
    items: modularPallets.children.map((child) => ({
      name: child.name,
      href: `/products/modular-metal-pallets/${child.slug}`,
    })),
  },
  {
    id: "trolley-bag-tubes",
    name: tubesForTrolleyBags.name,
    href: "/products/trolley-bag-tubes",
    tagline: tubesForTrolleyBags.tagline,
    badge: `${tubesForTrolleyBags.children.length} Products`,
    icon: Box,
    items: tubesForTrolleyBags.children.map((child) => ({
      name: child.name,
      href: `/products/trolley-bag-tubes/${child.slug}`,
    })),
  },
  {
    id: "solar-structures",
    name: "Solar Structures",
    href: "/products/solar-structures",
    tagline: solarStructure.tagline,
    badge: `${solarStructure.children.length} Products`,
    icon: Sun,
    items: solarStructure.children.map((child) => ({
      name: child.name,
      href: `/products/solar-structures/${child.slug}`,
    })),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.15 },
  },
};

const standardNavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "News", href: "/news" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMegaMenuOpen, setDesktopMegaMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isProductsActive = pathname?.startsWith("/products");

  // Track scroll position
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

  // Close menus on route change
  useEffect(() => {
    setDesktopMegaMenuOpen(false);
    setMobileOpen(false);
    setMobileExpandedCategory(null);
  }, [pathname]);

  // Click outside listener for desktop mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDesktopMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDesktopMegaMenuOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopMegaMenuOpen(false);
    }, 150);
  };

  return (
    <header
      ref={headerRef}
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
          <Link
            href="/"
            className="flex items-center shrink-0 h-full"
            aria-label="Empirical India Home"
            onClick={() => {
              setDesktopMegaMenuOpen(false);
              setMobileOpen(false);
            }}
          >
            <div className="relative w-[210px] sm:w-[250px] md:w-[270px] lg:w-[280px] xl:w-[310px] h-[64px] sm:h-[62px] md:h-[68px] lg:h-[72px] xl:h-[76px]">
              <Image
                src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp"
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
          <nav
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 2xl:gap-3 flex-1 px-2 xl:px-4"
            aria-label="Main navigation"
          >
            {/* 1. Home */}
            <Link
              href="/"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname === "/" ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                Home
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>

            {/* 2. About */}
            <Link
              href="/about"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname === "/about" ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                About
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>

            {/* 3. Products Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterProducts}
              onMouseLeave={handleMouseLeaveProducts}
            >
              <button
                type="button"
                onClick={() => setDesktopMegaMenuOpen((prev) => !prev)}
                className={cn(
                  "group flex items-center gap-1 px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap",
                  isProductsActive || desktopMegaMenuOpen ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
                )}
                aria-expanded={desktopMegaMenuOpen}
                aria-haspopup="true"
                aria-label="Products menu"
              >
                <span className="relative inline-block">
                  Products
                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                      isProductsActive || desktopMegaMenuOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </span>

                <ChevronDown
                  size={13}
                  className={cn(
                    "transition-transform duration-200",
                    isProductsActive || desktopMegaMenuOpen ? "text-navy-900" : "text-steel-400 group-hover:text-navy-900",
                    desktopMegaMenuOpen ? "rotate-180" : ""
                  )}
                />
              </button>
            </div>

            {/* 4. Industries */}
            <Link
              href="/industries"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname?.startsWith("/industries") ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                Industries
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname?.startsWith("/industries") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>

            {/* 5. News */}
            <Link
              href="/news"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname?.startsWith("/news") ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                News
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname?.startsWith("/news") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>

            {/* 6. Blogs */}
            <Link
              href="/blogs"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname?.startsWith("/blogs") ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                Blogs
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname?.startsWith("/blogs") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>

            {/* 7. Contact */}
            <Link
              href="/contact"
              className={cn(
                "group flex items-center px-1.5 xl:px-2 py-1.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-semibold transition-colors duration-200 whitespace-nowrap",
                pathname === "/contact" ? "text-navy-900" : "text-steel-700 hover:text-navy-900"
              )}
            >
              <span className="relative inline-block">
                Contact
                <span
                  className={cn(
                    "absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-gradient-to-r from-navy-800 to-blue-600 transition-transform duration-300 ease-out",
                    pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </span>
            </Link>
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
            type="button"
            className="lg:hidden p-2 text-steel-600 hover:text-steel-900 hover:bg-steel-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          DESKTOP FULL-WIDTH MEGA MENU (4 EQUAL COLUMNS)
      ────────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {desktopMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseEnter={handleMouseEnterProducts}
            onMouseLeave={handleMouseLeaveProducts}
            className="hidden lg:block absolute top-full left-0 right-0 w-full bg-white border-b border-steel-200/90 shadow-[0_20px_45px_rgba(15,23,42,0.12)] z-50 overflow-hidden"
          >
            {/* Top gradient highlight border */}
            <div className="h-[2px] w-full bg-gradient-to-r from-navy-800 via-blue-600 to-cyan-500" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 xl:py-8">
              <div className="grid grid-cols-4 gap-6 xl:gap-8">
                {productCategories.map((category) => {
                  const Icon = category.icon;
                  const isCatActive = pathname?.startsWith(category.href);

                  return (
                    <div
                      key={category.id}
                      className="flex flex-col h-full rounded-2xl p-3.5 -m-3.5 transition-colors hover:bg-slate-50/70"
                    >
                      {/* Category Header Link */}
                      <Link
                        href={category.href}
                        onClick={() => setDesktopMegaMenuOpen(false)}
                        className="group/cat flex flex-col pb-3.5 border-b border-steel-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 rounded-lg p-1 -m-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2.5 text-sm xl:text-[15px] font-bold text-steel-900 group-hover/cat:text-navy-700 transition-colors">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover/cat:bg-navy-700 group-hover/cat:text-white transition-colors shrink-0">
                              <Icon size={15} />
                            </span>
                            <span className="line-clamp-1">{category.name}</span>
                          </span>
                          <ArrowRight
                            size={14}
                            className="text-steel-400 group-hover/cat:text-navy-700 group-hover/cat:translate-x-0.5 transition-all shrink-0"
                          />
                        </div>
                        <span className="mt-1.5 text-[11px] text-steel-500 line-clamp-1 pl-9">
                          {category.tagline}
                        </span>
                      </Link>

                      {/* Child Products List */}
                      <ul className="mt-3.5 space-y-1 flex-1">
                        {category.items.map((item) => {
                          const isItemActive = pathname === item.href;
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setDesktopMegaMenuOpen(false)}
                                className={cn(
                                  "group/item flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-medium transition-all",
                                  isItemActive
                                    ? "bg-navy-50 text-navy-800 font-semibold"
                                    : "text-steel-600 hover:text-navy-900 hover:bg-slate-100/80"
                                )}
                              >
                                <span className="line-clamp-1">{item.name}</span>
                                <ChevronRight
                                  size={12}
                                  className="text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:text-navy-700 transition-all shrink-0"
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      {/* Bottom Category Overview Link */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <Link
                          href={category.href}
                          onClick={() => setDesktopMegaMenuOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy-700 hover:text-blue-700 transition-colors"
                        >
                          <span>Explore Category</span>
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────────────
          MOBILE / TABLET FULL-SCREEN MENU WITH PRODUCT ACCORDION
      ────────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 h-[100dvh] w-screen bg-white/98 backdrop-blur-2xl flex flex-col justify-between overflow-hidden lg:hidden"
          >
            {/* Mobile Header Bar */}
            <div className="w-full px-4 sm:px-6 flex items-center justify-between h-[54px] sm:h-[62px] md:h-[68px] border-b border-steel-100 shrink-0">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center shrink-0 h-full"
                aria-label="Empirical India Home"
              >
                <div className="relative w-[210px] sm:w-[250px] h-[54px] sm:h-[62px]">
                  <Image
                    src="https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp"
                    alt="Empirical India - Roll Forming Experts"
                    fill
                    sizes="210px"
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>

              <button
                type="button"
                className="p-2 text-steel-700 hover:text-navy-900 hover:bg-steel-100 rounded-lg transition-colors cursor-pointer"
                onClick={() => setMobileOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Scrollable Mobile Navigation Container (prevents overflow, smooth vertical scrolling) */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-6 max-w-lg mx-auto">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col space-y-4 w-full"
                aria-label="Mobile Navigation"
              >
                {/* 1. Home */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname === "/" ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    Home
                  </Link>
                </motion.div>

                {/* 2. About */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname === "/about" ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    About Us
                  </Link>
                </motion.div>

                {/* 3. Products Section — Full-Width Stacked Accordion */}
                <motion.div variants={itemVariants} className="w-full border-y border-steel-200/80 py-3 my-1">
                  {/* Master Products Accordion Header */}
                  <div className="flex items-center justify-between pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="flex items-center justify-between w-full text-left cursor-pointer group"
                      aria-expanded={mobileProductsOpen}
                      aria-label="Toggle Products menu"
                    >
                      <span className={cn(
                        "text-lg sm:text-xl font-bold transition-colors",
                        isProductsActive || mobileProductsOpen ? "text-navy-900" : "text-steel-800 group-hover:text-navy-900"
                      )}>
                        Products & Solutions
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-steel-600">
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            mobileProductsOpen ? "rotate-180" : ""
                          )}
                        />
                      </span>
                    </button>
                  </div>

                  {/* 4 Categories Accordion List */}
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden pt-2 space-y-2 w-full"
                      >
                        {productCategories.map((category) => {
                          const Icon = category.icon;
                          const isExpanded = mobileExpandedCategory === category.id;
                          const isCatActive = pathname?.startsWith(category.href);

                          return (
                            <div
                              key={category.id}
                              className="w-full rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                            >
                              {/* Category Header Row: Clickable Link on Left + Separate Chevron Control on Right */}
                              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50/70 border-b border-transparent">
                                {/* Clickable Category Heading */}
                                <Link
                                  href={category.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2.5 flex-1 min-w-0 pr-2 text-left"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-800">
                                    <Icon size={14} />
                                  </span>
                                  <div className="min-w-0">
                                    <span className="block text-sm sm:text-base font-bold text-steel-900 truncate">
                                      {category.name}
                                    </span>
                                  </div>
                                </Link>

                                {/* Separate Chevron Toggle Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Tapping a category expands it. Keep ONLY one category expanded at a time.
                                    setMobileExpandedCategory(isExpanded ? null : category.id);
                                  }}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-steel-600 hover:text-navy-900 transition-colors cursor-pointer"
                                  aria-label={`Toggle ${category.name} product list`}
                                  aria-expanded={isExpanded}
                                >
                                  <ChevronDown
                                    size={15}
                                    className={cn(
                                      "transition-transform duration-200",
                                      isExpanded ? "rotate-180" : ""
                                    )}
                                  />
                                </button>
                              </div>

                              {/* Expanded Product Types (Full-width, touch-friendly links) */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="overflow-hidden border-t border-slate-100 bg-white"
                                  >
                                    <div className="py-1 px-1.5 space-y-0.5">
                                      {category.items.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-xs sm:text-[13px] font-medium text-steel-700 hover:bg-slate-50 hover:text-navy-900 active:bg-slate-100 transition-colors"
                                        >
                                          <span className="truncate pr-2">{item.name}</span>
                                          <ChevronRight size={13} className="text-slate-400 shrink-0" />
                                        </Link>
                                      ))}

                                      {/* Category Overview Page Link */}
                                      <div className="pt-2 pb-1 border-t border-slate-100 px-3">
                                        <Link
                                          href={category.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="text-xs font-bold text-navy-700 hover:text-blue-700 flex items-center gap-1.5 py-1"
                                        >
                                          <span>View all {category.name}</span>
                                          <ArrowRight size={12} />
                                        </Link>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 4. Industries */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/industries"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname?.startsWith("/industries") ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    Industries
                  </Link>
                </motion.div>

                {/* 5. News */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/news"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname?.startsWith("/news") ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    News
                  </Link>
                </motion.div>

                {/* 6. Blogs */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/blogs"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname?.startsWith("/blogs") ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    Blogs
                  </Link>
                </motion.div>

                {/* 7. Contact */}
                <motion.div variants={itemVariants} className="w-full">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-lg sm:text-xl font-bold py-1 transition-colors",
                      pathname === "/contact" ? "text-navy-900" : "text-steel-800 hover:text-navy-900"
                    )}
                  >
                    Contact
                  </Link>
                </motion.div>

                {/* Mobile Final CTA */}
                <motion.div variants={itemVariants} className="pt-4 sm:pt-6 w-full">
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
