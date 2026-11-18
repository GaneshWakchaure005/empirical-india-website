"use client";

import { AlertCircle, RotateCcw, SearchX } from "lucide-react";

export function NewsSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse select-none" aria-busy="true" aria-label="Loading news and events">
      {/* ── Filter Bar Skeleton ── */}
      <div className="bg-steel-50/80 border border-steel-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tab pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-9 w-24 rounded-xl bg-navy-800/20" />
          <div className="h-9 w-32 rounded-xl bg-steel-200" />
          <div className="h-9 w-28 rounded-xl bg-steel-200" />
          <div className="h-9 w-24 rounded-xl bg-steel-200" />
        </div>
        {/* Search input + category dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="h-10 w-full md:w-64 rounded-xl bg-steel-200" />
          <div className="h-10 w-36 rounded-xl bg-steel-200 hidden sm:block" />
        </div>
      </div>

      {/* ── Featured Spotlight Card Skeleton ── */}
      <div className="rounded-2xl border border-steel-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] rounded-xl bg-steel-200" />
          <div className="lg:col-span-5 space-y-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 rounded-full bg-steel-200" />
              <div className="h-6 w-20 rounded-full bg-steel-100" />
            </div>
            <div className="space-y-2">
              <div className="h-7 w-full rounded-lg bg-steel-200" />
              <div className="h-7 w-3/4 rounded-lg bg-steel-200" />
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-4 w-full rounded bg-steel-100" />
              <div className="h-4 w-5/6 rounded bg-steel-100" />
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-steel-100">
              <div className="h-4 w-28 rounded bg-steel-200" />
              <div className="h-9 w-28 rounded-xl bg-steel-200" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 6-Card Grid Skeleton ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="rounded-2xl border border-steel-200 bg-white overflow-hidden shadow-xs flex flex-col">
            <div className="aspect-[16/10] bg-steel-200 w-full" />
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded-full bg-steel-200" />
                  <div className="h-4 w-16 rounded bg-steel-100" />
                </div>
                <div className="h-5 w-5/6 rounded bg-steel-200" />
                <div className="h-5 w-3/5 rounded bg-steel-200" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-3.5 w-full rounded bg-steel-100" />
                  <div className="h-3.5 w-4/5 rounded bg-steel-100" />
                </div>
              </div>
              <div className="pt-4 border-t border-steel-100 flex items-center justify-between">
                <div className="h-3.5 w-24 rounded bg-steel-100" />
                <div className="h-3.5 w-16 rounded bg-steel-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination Bar Skeleton ── */}
      <div className="pt-4 flex items-center justify-center gap-2">
        <div className="h-10 w-24 rounded-xl bg-steel-200" />
        <div className="h-10 w-10 rounded-xl bg-steel-200" />
        <div className="h-10 w-10 rounded-xl bg-steel-100" />
        <div className="h-10 w-24 rounded-xl bg-steel-200" />
      </div>
    </div>
  );
}

interface NewsEmptyStateProps {
  onResetFilters?: () => void;
  message?: string;
}

export function NewsEmptyState({
  onResetFilters,
  message = "No announcements or events match your current criteria.",
}: NewsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-steel-300 bg-steel-50/60 p-10 sm:p-14 text-center my-6">
      <div className="w-14 h-14 rounded-2xl bg-white border border-steel-200 flex items-center justify-center mx-auto mb-4 shadow-xs text-steel-400">
        <SearchX size={26} />
      </div>

      <h3 className="text-lg font-bold text-steel-900 mb-2">No Matching Updates</h3>
      <p className="text-xs sm:text-sm text-steel-600 max-w-md mx-auto leading-relaxed mb-6">
        {message} Try modifying your search keywords or switching categories to explore other manufacturing announcements.
      </p>

      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}

interface NewsErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function NewsErrorState({ message, onRetry }: NewsErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50/50 p-8 sm:p-10 text-center my-6"
    >
      <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-3.5">
        <AlertCircle size={24} />
      </div>

      <h3 className="text-base font-bold text-red-950 mb-1.5">
        Unable to Load News &amp; Events
      </h3>
      <p className="text-xs sm:text-sm text-red-800 max-w-md mx-auto leading-relaxed mb-5">
        {message || "We encountered an issue retrieving updates. Please try again or reach out to our team."}
      </p>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-navy-800 hover:bg-navy-900 shadow-sm transition-all cursor-pointer"
      >
        <RotateCcw size={13} />
        <span>Retry Connection</span>
      </button>
    </div>
  );
}
