"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Layers3,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  Package,
  Box,
  Sun,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CatalogProductItem } from "@/data/03-products-and-solutions";

interface ProductsDirectoryProps {
  products: readonly CatalogProductItem[];
}

type CategoryFilter = "all" | "roll-forming-lines" | "modular-metal-pallets" | "trolley-bag-tubes" | "solar-structures";

const filterTabs: { id: CategoryFilter; label: string; icon: typeof Layers3 }[] = [
  { id: "all", label: "All Products", icon: Layers3 },
  { id: "roll-forming-lines", label: "Roll-Forming Lines", icon: Cpu },
  { id: "modular-metal-pallets", label: "Modular Pallets", icon: Package },
  { id: "trolley-bag-tubes", label: "Trolley-Bag Tubes", icon: Box },
  { id: "solar-structures", label: "Solar Structures", icon: Sun },
];

export default function ProductsDirectory({ products }: ProductsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category check
      if (selectedCategory !== "all" && item.categorySlug !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        const matchesCategory = item.categoryName.toLowerCase().includes(query);
        const matchesBadge = item.badge.toLowerCase().includes(query);
        const matchesHighlights = item.highlights.some((h) => h.toLowerCase().includes(query));
        const matchesSpec =
          item.primarySpec.label.toLowerCase().includes(query) ||
          item.primarySpec.value.toLowerCase().includes(query);

        return matchesName || matchesDesc || matchesCategory || matchesBadge || matchesHighlights || matchesSpec;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  // Counts per category for the tab badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      all: products.length,
      "roll-forming-lines": 0,
      "modular-metal-pallets": 0,
      "trolley-bag-tubes": 0,
      "solar-structures": 0,
    };
    products.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <section
      id="products-catalog"
      className="relative bg-white py-16 sm:py-20 lg:py-24 border-b border-steel-200"
      aria-labelledby="product-directory-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-steel-100 text-steel-700 text-xs font-bold uppercase tracking-wider mb-3">
              <SlidersHorizontal size={12} className="text-navy-700" />
              <span>Complete Equipment &amp; Product Directory</span>
            </span>
            <h2
              id="product-directory-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight"
            >
              Explore Our <span className="text-navy-700">12 Precision Products</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-steel-600 max-w-2xl leading-relaxed">
              Filter by vertical or search directly by machinery type, profile category, or tooling specification.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <Search
                size={17}
                className="absolute left-3.5 text-steel-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, tooling, specs..."
                aria-label="Search products"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-steel-200 bg-slate-50 text-steel-800 placeholder:text-steel-400 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600 focus:bg-white transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-steel-400 hover:text-steel-600 transition-colors"
                  aria-label="Clear search query"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-steel-100">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            const count = categoryCounts[tab.id];

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-navy-900 text-white shadow-xs"
                    : "bg-slate-100/90 hover:bg-slate-200 text-steel-700"
                }`}
              >
                <Icon size={14} className={isSelected ? "text-cyan-300" : "text-steel-500"} />
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-steel-600 shadow-2xs"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-steel-500 mb-6">
          <span>
            Showing <strong className="text-navy-900 font-bold">{filteredProducts.length}</strong> of {products.length} products
            {selectedCategory !== "all" && (
              <> in <span className="font-semibold text-steel-700">{filterTabs.find((t) => t.id === selectedCategory)?.label}</span></>
            )}
            {searchQuery && (
              <> matching &ldquo;<span className="font-semibold text-navy-800">{searchQuery}</span>&rdquo;</>
            )}
          </span>

          {(selectedCategory !== "all" || searchQuery !== "") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="font-semibold text-navy-700 hover:text-navy-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Reset filters</span>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.article
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-navy-300 transition-all duration-300 overflow-hidden"
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Category & Badge */}
                    <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-900/90 text-cyan-200 backdrop-blur-sm border border-navy-700/60 shadow-xs">
                        {product.categoryName}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-slate-800 shadow-2xs backdrop-blur-sm">
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick Link Arrow */}
                    <Link
                      href={product.href}
                      aria-label={`View details for ${product.name}`}
                      className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-navy-900 shadow-xs"
                    >
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-steel-900 group-hover:text-navy-700 transition-colors">
                      <Link href={product.href} className="focus-visible:outline-none focus-visible:underline">
                        {product.name}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-steel-600 line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Key Technical Highlight Spec */}
                    <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-medium text-steel-500">{product.primarySpec.label}:</span>
                      <span className="font-bold text-navy-800 text-right line-clamp-1 pl-2">
                        {product.primarySpec.value}
                      </span>
                    </div>

                    {/* 3 Highlights List */}
                    <div className="mt-4 border-t border-slate-100 pt-3.5 space-y-2">
                      {product.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2 text-xs text-steel-700 leading-snug">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Dual Action CTA Footer */}
                    <div className="mt-auto border-t border-slate-100 pt-4 mt-5 flex items-center justify-between gap-2">
                      <Link
                        href={product.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:text-blue-700 transition-colors"
                      >
                        <span>Specifications</span>
                        <ArrowRight size={13} />
                      </Link>

                      <Link
                        href={product.rfqHref}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-steel-800 bg-slate-100 hover:bg-navy-700 hover:text-white transition-all"
                      >
                        <FileText size={13} />
                        <span>Enquire</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center rounded-2xl border border-dashed border-steel-300 bg-slate-50 p-8"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-steel-100 flex items-center justify-center text-steel-500 mb-4">
                <Search size={22} />
              </div>
              <h3 className="text-base font-bold text-steel-900">No products found</h3>
              <p className="mt-1 text-xs text-steel-500 max-w-sm mx-auto">
                No matching product found for &ldquo;{searchQuery}&rdquo;. Try another term or reset the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
