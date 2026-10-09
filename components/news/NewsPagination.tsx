"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 1;
    const range: (number | "...")[] = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="mt-14 pt-8 border-t border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-4"
      aria-label="News pagination"
    >
      <div className="text-xs text-steel-500 font-medium order-2 sm:order-1">
        Page <span className="font-bold text-steel-800">{currentPage}</span> of{" "}
        <span className="font-bold text-steel-800">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className={cn(
            "inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
            currentPage <= 1
              ? "border-steel-100 text-steel-300 cursor-not-allowed bg-steel-50/50"
              : "border-steel-200 text-steel-700 bg-white hover:bg-steel-50 hover:border-steel-300"
          )}
        >
          <ChevronLeft size={14} />
          <span className="hidden xs:inline">Prev</span>
        </button>

        {/* Numeric Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-steel-400 text-xs font-bold"
                >
                  &hellip;
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                onClick={() => onPageChange(p as number)}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  isCurrent
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-white text-steel-700 border border-steel-200 hover:border-steel-300 hover:bg-steel-50"
                )}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className={cn(
            "inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
            currentPage >= totalPages
              ? "border-steel-100 text-steel-300 cursor-not-allowed bg-steel-50/50"
              : "border-steel-200 text-steel-700 bg-white hover:bg-steel-50 hover:border-steel-300"
          )}
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </nav>
  );
}
