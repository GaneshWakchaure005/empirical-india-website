"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { NewsEventPublic, NewsEventsQueryParams } from "@/types/news-event";
import { CategoryPublic } from "@/types/category";
import { fetchNewsEvents, fetchActiveCategories } from "@/lib/api/news-events";
import NewsHero from "./NewsHero";
import NewsFilters, { FilterTab } from "./NewsFilters";
import NewsCard from "./NewsCard";
import FeaturedNews from "./FeaturedNews";
import NewsPagination from "./NewsPagination";
import { NewsSkeleton, NewsEmptyState, NewsErrorState } from "./NewsStateViews";
import NewsEnquiryCTA from "./NewsEnquiryCTA";

const PAGE_SIZE = 9;

export default function NewsListingClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state synchronization
  const initialType = searchParams.get("type");
  const initialUpcoming = searchParams.get("upcoming") === "true";
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  let initialTab: FilterTab = "all";
  if (initialUpcoming) initialTab = "upcoming";
  else if (initialType === "news") initialTab = "news";
  else if (initialType === "event") initialTab = "event";

  const [currentTab, setCurrentTab] = useState<FilterTab>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);

  const [items, setItems] = useState<NewsEventPublic[]>([]);
  const [featuredItem, setFeaturedItem] = useState<NewsEventPublic | null>(null);
  const [categories, setCategories] = useState<CategoryPublic[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [, startTransition] = useTransition();

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load categories once
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const [newsCats, eventCats] = await Promise.all([
          fetchActiveCategories("news"),
          fetchActiveCategories("event"),
        ]);
        if (!isMounted) return;

        // Merge unique categories
        const map = new Map<string, CategoryPublic>();
        newsCats.forEach((c) => map.set(c.slug, c));
        eventCats.forEach((c) => map.set(c.slug, c));
        setCategories(Array.from(map.values()));
      } catch (err) {
        console.warn("Failed to load news categories:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch news data
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    const queryParams: NewsEventsQueryParams = {
      page,
      limit: PAGE_SIZE,
    };

    if (currentTab === "news") {
      queryParams.type = "news";
    } else if (currentTab === "event") {
      queryParams.type = "event";
    } else if (currentTab === "upcoming") {
      queryParams.upcoming = true;
    }

    if (selectedCategory) {
      queryParams.category = selectedCategory;
    }

    if (debouncedSearch.trim()) {
      queryParams.search = debouncedSearch.trim();
    }

    fetchNewsEvents(queryParams)
      .then((res) => {
        if (ignore) return;
        setItems(res.data);
        setPagination(res.pagination);

        if (page === 1 && !debouncedSearch.trim() && !selectedCategory) {
          const featuredInList = res.data.find((item) => item.featured);
          if (featuredInList) {
            setFeaturedItem(featuredInList);
          } else if (res.data.length > 0 && currentTab === "all") {
            setFeaturedItem(res.data[0]);
          } else {
            setFeaturedItem(null);
          }
        } else {
          setFeaturedItem(null);
        }
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(
          (err as Error).message ||
            "Failed to load news & events. Please check your connection."
        );
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page, currentTab, selectedCategory, debouncedSearch, retryCount]);

  // Sync state to URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentTab === "upcoming") {
      params.set("upcoming", "true");
    } else if (currentTab === "news" || currentTab === "event") {
      params.set("type", currentTab);
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      window.history.replaceState(null, "", newUrl);
    });
  }, [currentTab, selectedCategory, debouncedSearch, page, pathname]);

  // Handlers
  const handleTabChange = (tab: FilterTab) => {
    setCurrentTab(tab);
    setPage(1);
  };

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleResetFilters = () => {
    setCurrentTab("all");
    setSelectedCategory("");
    setSearchQuery("");
    setDebouncedSearch("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // If spotlight item is displayed separately on page 1, don't duplicate it in the immediate grid
  const displayItems =
    featuredItem && page === 1 && !debouncedSearch.trim() && !selectedCategory
      ? items.filter((item) => item.id !== featuredItem.id)
      : items;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <NewsHero />

      {/* Main Listing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Filter Controls */}
        <NewsFilters
          currentTab={currentTab}
          onTabChange={handleTabChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onResetFilters={handleResetFilters}
          totalCount={pagination.total}
          filteredCount={items.length}
        />

        {/* Content States */}
        {loading ? (
          <NewsSkeleton />
        ) : error ? (
          <NewsErrorState message={error} onRetry={handleRetry} />
        ) : items.length === 0 ? (
          <NewsEmptyState
            onResetFilters={handleResetFilters}
            message={
              debouncedSearch
                ? `No announcements or events matched "${debouncedSearch}".`
                : "No announcements are currently published in this view."
            }
          />
        ) : (
          <div>
            {/* Featured Item Spotlight (Page 1 default view) */}
            {featuredItem && page === 1 && !debouncedSearch && !selectedCategory && (
              <FeaturedNews item={featuredItem} />
            )}

            {/* Grid of News & Event Cards: 3-column -> 2-column -> 1-column */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {displayItems.map((item, index) => (
                <NewsCard key={item.id} item={item} priority={index < 3} />
              ))}
            </div>

            {/* Pagination Controls */}
            <NewsPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Commercial Enquiry CTA Section */}
        <NewsEnquiryCTA />
      </div>
    </div>
  );
}
