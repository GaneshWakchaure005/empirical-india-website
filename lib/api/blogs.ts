import { ApiPaginationResponse, ApiResponse } from "@/types/api";
import { BlogPublic, BlogQueryParams } from "@/types/blog";
import { CategoryPublic } from "@/types/category";

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
 * Fetch published blogs with pagination, filtering and search
 * per the documented GET /api/blogs endpoint in api.md.
 */
export async function fetchBlogs(
  params?: BlogQueryParams
): Promise<ApiPaginationResponse<BlogPublic>> {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", params.page.toString());
  if (params?.limit) query.set("limit", params.limit.toString());
  if (params?.category) query.set("category", params.category);
  if (params?.tag) query.set("tag", params.tag);
  if (params?.featured !== undefined) query.set("featured", String(params.featured));
  if (params?.search) query.set("search", params.search);

  const qs = query.toString();
  const url = `${getBaseUrl()}/api/blogs${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(
      errorJson.message || `Failed to fetch blogs (HTTP ${res.status})`
    );
  }

  const json: ApiPaginationResponse<BlogPublic> = await res.json();
  if (!json.success) {
    throw new Error(json.message || "Failed to load blogs data");
  }

  return json;
}

/**
 * Fetch a single published blog by its slug
 * per the documented GET /api/blogs/:slug endpoint in api.md.
 */
export async function fetchBlogBySlug(
  slug: string
): Promise<BlogPublic | null> {
  if (!slug) return null;

  const url = `${getBaseUrl()}/api/blogs/${encodeURIComponent(slug)}`;

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
      errorJson.message || `Failed to fetch blog post (HTTP ${res.status})`
    );
  }

  const json: ApiResponse<BlogPublic> = await res.json();
  if (!json.success || !json.data) {
    return null;
  }

  return json.data;
}

/**
 * Fetch active blog categories from GET /api/categories?type=blog
 * per the documented GET /api/categories endpoint in api.md.
 */
export async function fetchBlogCategories(): Promise<CategoryPublic[]> {
  const url = `${getBaseUrl()}/api/categories?type=blog`;

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
