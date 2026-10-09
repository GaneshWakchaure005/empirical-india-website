"use client";

import { Search, X, Filter, Sparkles } from "lucide-react";
import { CategoryPublic } from "@/types/category";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: CategoryPublic[];
  selectedCategory: string;
  onCategoryChange: (catSlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  featuredOnly: boolean;
  onFeaturedToggle: () => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  featuredOnly,
  onFeaturedToggle,
  onResetFilters,
  totalCount,
  filteredCount,
}: BlogFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== "" || searchQuery.trim() !== "" || featuredOnly;

  return (
    <div className="mb-8 space-y-3.5">
      {/* Top Controls: Search & Featured Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <label htmlFor="blog-search" className="sr-only">
            Search engineering articles
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-steel-400">
            <Search size={15} />
          </div>
          <input
            id="blog-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by topic, roll-forming, tooling, pallets..."
            className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-steel-200 bg-white placeholder:text-steel-400 text-steel-900 focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search input"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-steel-400 hover:text-steel-700 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Featured Filter Toggle Button */}
        <button
          type="button"
          onClick={onFeaturedToggle}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer shrink-0 shadow-xs",
            featuredOnly
              ? "bg-navy-900 text-white border-navy-900"
              : "bg-white text-steel-700 border-steel-200 hover:border-steel-300 hover:bg-steel-50"
          )}
        >
          <Sparkles
            size={14}
            className={featuredOnly ? "text-amber-400" : "text-steel-400"}
          />
          <span>Featured Only</span>
        </button>
      </div>

      {/* Category Filter Chips & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-steel-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-steel-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter size={11} />
            Topic:
          </span>

          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
              selectedCategory === ""
                ? "bg-navy-900 text-white font-semibold shadow-xs"
                : "bg-steel-50 text-steel-700 hover:bg-steel-100 border border-steel-200/80"
            )}
          >
            All Topics
          </button>

          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
                  isCatActive
                    ? "bg-navy-900 text-white font-semibold shadow-xs"
                    : "bg-steel-50 text-steel-700 hover:bg-steel-100 border border-steel-200/80"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Counter & Reset Option */}
        <div className="flex items-center gap-3 text-xs text-steel-500 ml-auto">
          <span>
            Showing <strong className="text-steel-800 font-semibold">{filteredCount}</strong> of{" "}
            <strong className="text-steel-800 font-semibold">{totalCount}</strong> articles
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="font-semibold text-red-brand hover:underline cursor-pointer flex items-center gap-1"
            >
              <X size={12} />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
