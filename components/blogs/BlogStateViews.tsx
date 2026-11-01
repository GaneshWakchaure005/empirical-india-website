"use client";

import { AlertCircle, RotateCcw, SearchX } from "lucide-react";
import { BlogsContent } from "@/data/10-blogs";

import ContentLoader from "@/components/ui/ContentLoader";

export function BlogSkeleton() {
  return <ContentLoader kind="blogs" />;
}

interface BlogEmptyStateProps {
  onResetFilters?: () => void;
  message?: string;
}

export function BlogEmptyState({
  onResetFilters,
  message,
}: BlogEmptyStateProps) {
  const { listing } = BlogsContent;

  return (
    <div className="rounded-2xl border border-dashed border-steel-300 bg-steel-50/70 p-10 sm:p-14 text-center my-6">
      <div className="w-14 h-14 rounded-2xl bg-white border border-steel-200 flex items-center justify-center mx-auto mb-4 shadow-xs text-steel-400">
        <SearchX size={26} />
      </div>

      <h3 className="text-lg font-bold text-steel-900 mb-2">
        {listing.emptyTitle}
      </h3>
      <p className="text-xs sm:text-sm text-steel-600 max-w-md mx-auto leading-relaxed mb-6">
        {message || listing.emptyDescription}
      </p>

      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-navy-700 hover:bg-navy-800 transition-all shadow-xs cursor-pointer hover:-translate-y-0.5"
        >
          <RotateCcw size={13} />
          <span>{listing.resetFiltersText}</span>
        </button>
      )}
    </div>
  );
}

interface BlogErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function BlogErrorState({ message, onRetry }: BlogErrorStateProps) {
  const { listing } = BlogsContent;

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50/50 p-8 sm:p-10 text-center my-6"
    >
      <div className="w-12 h-12 rounded-xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-3.5">
        <AlertCircle size={24} />
      </div>

      <h3 className="text-base font-bold text-red-950 mb-1.5">
        {listing.errorTitle}
      </h3>
      <p className="text-xs sm:text-sm text-red-800 max-w-md mx-auto leading-relaxed mb-5">
        {message || listing.errorDescription}
      </p>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-navy-800 hover:bg-navy-900 shadow-sm transition-all cursor-pointer hover:-translate-y-0.5"
      >
        <RotateCcw size={13} />
        <span>{listing.retryButtonText}</span>
      </button>
    </div>
  );
}
