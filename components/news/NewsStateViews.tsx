"use client";

import { AlertCircle, RotateCcw, SearchX } from "lucide-react";

import ContentLoader from "@/components/ui/ContentLoader";

export function NewsSkeleton() {
  return <ContentLoader kind="news" />;
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
