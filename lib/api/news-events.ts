import { ApiPaginationResponse, ApiResponse } from "@/types/api";
import { NewsEventPublic, NewsEventsQueryParams } from "@/types/news-event";
import { CategoryPublic, CategoryType } from "@/types/category";

/**
 * Returns the base URL for API requests.
 * Uses empty string in browser context (relative URLs), or configured site URL for SSR.
 */
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Fetch published news and events with pagination, filtering and search
 * per the documented GET /api/news-events endpoint in api.md.
 */
export async function fetchNewsEvents(
  params?: NewsEventsQueryParams
): Promise<ApiPaginationResponse<NewsEventPublic>> {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", params.page.toString());
  if (params?.limit) query.set("limit", params.limit.toString());
  if (params?.type) query.set("type", params.type);
  if (params?.category) query.set("category", params.category);
  if (params?.tag) query.set("tag", params.tag);
  if (params?.featured !== undefined) query.set("featured", String(params.featured));
  if (params?.upcoming) query.set("upcoming", "true");
  if (params?.past) query.set("past", "true");
  if (params?.search) query.set("search", params.search);

  const qs = query.toString();
  const url = `${getBaseUrl()}/api/news-events${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Ensure fresh public data while allowing revalidation
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(
      errorJson.message || `Failed to fetch news & events (HTTP ${res.status})`
    );
  }

  const json: ApiPaginationResponse<NewsEventPublic> = await res.json();
  if (!json.success) {
    throw new Error(json.message || "Failed to load news & events data");
  }

  return json;
}

/**
 * Fetch single published news or event item by slug
 * per the documented GET /api/news-events/:slug endpoint in api.md.
 */
export async function fetchNewsEventBySlug(
  slug: string
): Promise<NewsEventPublic | null> {
  if (!slug) return null;

  const url = `${getBaseUrl()}/api/news-events/${encodeURIComponent(slug)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(
      errorJson.message || `Failed to fetch news article (HTTP ${res.status})`
    );
  }

  const json: ApiResponse<NewsEventPublic> = await res.json();
  if (!json.success || !json.data) {
    return null;
  }

  return json.data;
}

/**
 * Fetch active categories from GET /api/categories
 * Filterable by type: "news" | "event" | "blog" | "general".
 */
export async function fetchActiveCategories(
  type?: CategoryType
): Promise<CategoryPublic[]> {
  const query = type ? `?type=${encodeURIComponent(type)}` : "";
  const url = `${getBaseUrl()}/api/categories${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    return [];
  }

  const json: ApiResponse<CategoryPublic[]> = await res.json().catch(() => ({
    success: false,
    data: [],
  }));

  return json.data || [];
}
