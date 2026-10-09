"use client";

import { Search, X, Filter, Calendar, Newspaper, Clock, Sparkles, LucideIcon } from "lucide-react";
import { CategoryPublic } from "@/types/category";
import { cn } from "@/lib/utils";

export type FilterTab = "all" | "news" | "event" | "upcoming";

interface NewsFiltersProps {
  currentTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  categories: CategoryPublic[];
  selectedCategory: string;
  onCategoryChange: (catSlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function NewsFilters({
  currentTab,
  onTabChange,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  totalCount,
  filteredCount,
}: NewsFiltersProps) {
  const hasActiveFilters =
    currentTab !== "all" || selectedCategory !== "" || searchQuery.trim() !== "";

  const tabs: { id: FilterTab; label: string; icon: LucideIcon }[] = [
    { id: "all", label: "All Updates", icon: Sparkles },
    { id: "news", label: "Company News", icon: Newspaper },
    { id: "event", label: "Expos & Events", icon: Calendar },
    { id: "upcoming", label: "Upcoming", icon: Clock },
  ];

  return (
    <div className="mb-8 space-y-3.5">
      {/* Top Controls: Type Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Type Tabs */}
        <div
          role="tablist"
          aria-label="Filter updates by type"
          className="inline-flex items-center p-1 bg-steel-100/90 rounded-xl border border-steel-200/80 overflow-x-auto no-scrollbar shrink-0"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-white text-navy-900 shadow-xs border border-steel-200/60 font-bold"
                    : "text-steel-600 hover:text-navy-900 hover:bg-white/50"
                )}
              >
                <Icon
                  size={14}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-navy-700" : "text-steel-400"
                  )}
                />
                <span>{tab.label}</span>
                {tab.id === "upcoming" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 md:max-w-xs lg:max-w-sm">
          <label htmlFor="news-search" className="sr-only">
            Search news and events
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-steel-400">
            <Search size={15} />
          </div>
          <input
            id="news-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search updates, machinery, expos..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-steel-200 bg-white placeholder:text-steel-400 text-steel-900 focus:outline-none focus:ring-2 focus:ring-navy-600/30 focus:border-navy-600 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-steel-400 hover:text-steel-700 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-steel-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-steel-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter size={11} />
            Category:
          </span>

          <button
            onClick={() => onCategoryChange("")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
              selectedCategory === ""
                ? "bg-navy-900 text-white font-semibold shadow-xs"
                : "bg-steel-50 text-steel-600 hover:bg-steel-100 border border-steel-200/80"
            )}
          >
            All
          </button>

          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer",
                  isCatActive
                    ? "bg-navy-900 text-white font-semibold shadow-xs"
                    : "bg-steel-50 text-steel-600 hover:bg-steel-100 border border-steel-200/80"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Counter & Clear Active Filters */}
        <div className="flex items-center gap-3 text-xs text-steel-500 ml-auto">
          <span>
            Showing <strong className="text-steel-800 font-semibold">{filteredCount}</strong> of{" "}
            <strong className="text-steel-800 font-semibold">{totalCount}</strong>
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="font-semibold text-red-brand hover:underline cursor-pointer flex items-center gap-1"
            >
              <X size={12} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
