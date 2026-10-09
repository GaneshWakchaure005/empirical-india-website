"use client";

import { useState, useEffect, useTransition } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { BlogPublic, BlogQueryParams } from "@/types/blog";
import { CategoryPublic } from "@/types/category";
import { fetchBlogs, fetchBlogCategories } from "@/lib/api/blogs";
import BlogsHero from "./BlogsHero";
import BlogFilters from "./BlogFilters";
import BlogCard from "./BlogCard";
import FeaturedBlog from "./FeaturedBlog";
import BlogPagination from "./BlogPagination";
import { BlogSkeleton, BlogEmptyState, BlogErrorState } from "./BlogStateViews";
import BlogEnquiryCTA from "./BlogEnquiryCTA";

const PAGE_SIZE = 9;

export default function BlogsListingClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL query params on mount
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const initialFeatured = searchParams.get("featured") === "true";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(initialSearch);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(initialFeatured);
  const [page, setPage] = useState<number>(initialPage);

  const [items, setItems] = useState<BlogPublic[]>([]);
  const [featuredItem, setFeaturedItem] = useState<BlogPublic | null>(null);
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

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load active blog categories on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const cats = await fetchBlogCategories();
        if (isMounted) {
          setCategories(cats);
        }
      } catch (err) {
        console.warn("Failed to load blog categories:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch blogs when page, category, search, or featured filter changes
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    const queryParams: BlogQueryParams = {
      page,
      limit: PAGE_SIZE,
    };

    if (selectedCategory) {
      queryParams.category = selectedCategory;
    }

    if (debouncedSearch.trim()) {
      queryParams.search = debouncedSearch.trim();
    }

    if (featuredOnly) {
      queryParams.featured = true;
    }

    fetchBlogs(queryParams)
      .then((res) => {
        if (ignore) return;
        setItems(res.data);
        setPagination(res.pagination);

        // On first page without specific filters, check for a spotlight item
        if (page === 1 && !debouncedSearch.trim() && !selectedCategory) {
          const featuredInList = res.data.find((item) => item.featured);
          if (featuredInList) {
            setFeaturedItem(featuredInList);
          } else if (res.data.length > 0) {
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
            "Failed to load engineering articles. Please check your connection."
        );
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page, selectedCategory, debouncedSearch, featuredOnly, retryCount]);

  // Synchronize state with URL search parameters
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    if (featuredOnly) {
      params.set("featured", "true");
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      window.history.replaceState(null, "", newUrl);
    });
  }, [selectedCategory, debouncedSearch, featuredOnly, page, pathname]);

  // Handlers
  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFeaturedToggle = () => {
    setFeaturedOnly((prev) => !prev);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setDebouncedSearch("");
    setFeaturedOnly(false);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const listingEl = document.getElementById("blogs-listing-section");
    if (listingEl) {
      listingEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // If spotlight item is displayed in hero spotlight on page 1, don't duplicate it in the immediate grid
  const displayItems =
    featuredItem && page === 1 && !debouncedSearch.trim() && !selectedCategory && !featuredOnly
      ? items.filter((item) => item.id !== featuredItem.id)
      : items;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Visually Impressive Light-Themed Hero Section ── */}
      <BlogsHero />

      {/* ── Main Blogs Content & Filter Section ── */}
      <div
        id="blogs-listing-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {/* Search, Categories, and Result Counter */}
        <BlogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          featuredOnly={featuredOnly}
          onFeaturedToggle={handleFeaturedToggle}
          onResetFilters={handleResetFilters}
          totalCount={pagination.total}
          filteredCount={items.length}
        />

        {/* Content States: Loading, Error, Empty, or Card Grid */}
        {loading ? (
          <BlogSkeleton />
        ) : error ? (
          <BlogErrorState message={error} onRetry={handleRetry} />
        ) : items.length === 0 ? (
          <BlogEmptyState
            onResetFilters={handleResetFilters}
            message={
              debouncedSearch
                ? `No published articles matched "${debouncedSearch}".`
                : selectedCategory
                ? "No published articles found in this category."
                : undefined
            }
          />
        ) : (
          <div>
            {/* Featured Article Spotlight (shown on Page 1 default view) */}
            {featuredItem &&
              page === 1 &&
              !debouncedSearch &&
              !selectedCategory &&
              !featuredOnly && <FeaturedBlog item={featuredItem} />}

            {/* Responsive Card Grid (3-columns on desktop, 2-columns on tablet, 1 on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {displayItems.map((item, index) => (
                <BlogCard key={item.id} item={item} priority={index < 3} />
              ))}
            </div>

            {/* Pagination Controls */}
            <BlogPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Commercial Technical RFQ & Drawing Discussion CTA */}
        <BlogEnquiryCTA />
      </div>
    </div>
  );
}
