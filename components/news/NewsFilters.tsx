"use client";

import {
  Search,
  X,
  Filter,
  Calendar,
  Newspaper,
  Clock,
  Sparkles,
  LucideIcon,
} from "lucide-react";
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
    currentTab !== "all" ||
    selectedCategory !== "" ||
    searchQuery.trim() !== "";

  const tabs: { id: FilterTab; label: string; icon: LucideIcon }[] = [
    { id: "all", label: "All Updates", icon: Sparkles },
    { id: "news", label: "Company News", icon: Newspaper },
    { id: "event", label: "Expos & Events", icon: Calendar },
    { id: "upcoming", label: "Upcoming", icon: Clock },
  ];

  const tabBase =
    "relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1";

  const categoryBase =
    "inline-flex shrink-0 items-center justify-center rounded-md border border-transparent px-2.5 py-1 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1";

  return (
    <div className="mb-8 space-y-3.5">
      {/* Type Tabs & Search */}
      <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
        {/* Type Tabs */}
        <div
          role="tablist"
          aria-label="Filter updates by type"
          className="flex min-w-0 max-w-full items-center gap-0.5 overflow-x-auto rounded-xl border border-steel-200/80 bg-steel-100/90 p-1 no-scrollbar"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`news-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  tabBase,
                  isActive
                    ? "bg-white text-navy-900 shadow-sm ring-1 ring-inset ring-steel-200/70"
                    : "text-steel-600 hover:bg-white/60 hover:text-navy-900"
                )}
              >
                <Icon
                  size={14}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0",
                    isActive ? "text-navy-700" : "text-steel-400"
                  )}
                />

                <span>{tab.label}</span>

                {tab.id === "upcoming" && (
                  <span
                    aria-label="Upcoming updates"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full min-w-0 md:max-w-xs md:flex-1 lg:max-w-sm">
          <label htmlFor="news-search" className="sr-only">
            Search news and events
          </label>

          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel-400"
          />

          <input
            id="news-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search updates, machinery, expos..."
            className="w-full rounded-xl border border-steel-200 bg-white py-2 pl-9 pr-9 text-xs text-steel-900 shadow-xs placeholder:text-steel-400 transition-colors duration-150 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20 sm:text-sm"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-0 top-0 flex h-full items-center px-2.5 text-steel-400 transition-colors hover:text-steel-700"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-3 border-t border-steel-100 pt-3">
        {/* Category Chips */}
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-steel-400">
            <Filter size={11} aria-hidden="true" />
            Category:
          </span>

          <button
            type="button"
            aria-pressed={selectedCategory === ""}
            onClick={() => onCategoryChange("")}
            className={cn(
              categoryBase,
              selectedCategory === ""
                ? "bg-navy-900 font-semibold text-white shadow-sm ring-1 ring-inset ring-navy-900"
                : "bg-steel-50 text-steel-600 hover:bg-steel-100 hover:text-navy-900"
            )}
          >
            All
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  categoryBase,
                  isActive
                    ? "bg-navy-900 font-semibold text-white shadow-sm ring-1 ring-inset ring-navy-900"
                    : "bg-steel-50 text-steel-600 hover:bg-steel-100 hover:text-navy-900"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Result Count & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-steel-500">
          <p>
            Showing{" "}
            <strong className="font-semibold text-steel-800">
              {filteredCount}
            </strong>{" "}
            of{" "}
            <strong className="font-semibold text-steel-800">
              {totalCount}
            </strong>
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex shrink-0 items-center gap-1 font-semibold text-red-brand transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
            >
              <X size={12} aria-hidden="true" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}