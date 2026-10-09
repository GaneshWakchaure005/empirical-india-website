"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  MapPin,
  Clock,
  Loader2,
  Filter,
} from "lucide-react";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { useToast } from "@/components/admin/AdminToast";

interface NewsEventItem {
  _id: string;
  title: string;
  slug: string;
  type: "news" | "event";
  excerpt: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  tags: string[];
  status: "draft" | "published";
  featured: boolean;
  eventDetails?: {
    startDate?: string;
    endDate?: string;
    location?: string;
  };
  createdAt: string;
}

export default function AdminNewsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<NewsEventItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories?type=news,event,general");
      const data = await res.json().catch(() => ({}));
      if (data?.success && Array.isArray(data.data)) {
        let rawList = data.data;
        if (rawList.length === 0) {
          const fallbackRes = await fetch("/api/admin/categories");
          const fallbackData = await fallbackRes.json().catch(() => ({}));
          if (fallbackData?.success && Array.isArray(fallbackData.data)) {
            rawList = fallbackData.data;
          }
        }

        const seen = new Set<string>();
        const unique: any[] = [];
        for (const c of rawList) {
          const norm = (c.name || "").trim().toLowerCase();
          if (norm && !seen.has(norm)) {
            seen.add(norm);
            unique.push(c);
          }
        }
        setCategories(unique);
      }
    } catch {
      // ignore
    }
  };


  const fetchNewsEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (search.trim()) params.set("search", search.trim());
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (categoryFilter !== "all") params.set("category", categoryFilter);

      const res = await fetch(`/api/admin/news-events?${params.toString()}`);
      const data = await res.json().catch(() => ({}));

      if (data?.success) {
        setItems(data.data || []);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
          setTotalCount(data.pagination.total || 0);
        }
      } else {
        toast.error(data.message || "Failed to load news and events");
      }
    } catch {
      toast.error("Network error retrieving news & events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNewsEvents();
  }, [page, typeFilter, statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchNewsEvents();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/news-events/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete item");
      }

      toast.success(`${deleteTarget.type === "event" ? "Event" : "News article"} deleted successfully`);
      setDeleteTarget(null);
      fetchNewsEvents();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Company News & Industry Events
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/50">
              {totalCount} Total
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Manage factory announcements, machine dispatches, trade exhibitions, and conferences.
          </p>
        </div>

        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/50 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create News or Event</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, location, or summary..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="news">Company News</option>
            <option value="event">Industry Events</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[150px]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-900/60 border border-slate-800/80 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-slate-800/80 bg-slate-900/30 p-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
            <Calendar className="w-7 h-7 text-indigo-400" />
          </div>
          <h3 className="text-base font-bold text-white">No entries found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            {search || typeFilter !== "all" || statusFilter !== "all"
              ? "No news or events match your filter criteria."
              : "Post company milestones, machine dispatches, or upcoming trade fairs."}
          </p>
          <div className="mt-5">
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create News or Event</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                  {item.featuredImage?.url ? (
                    <Image
                      src={item.featuredImage.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Calendar className="w-6 h-6" />
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute top-1 left-1 p-0.5 rounded-full bg-amber-500 text-slate-950">
                      <Star className="w-3 h-3 fill-slate-950" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.type === "event"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === "published"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                    {item.category && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category.name}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {item.title}
                  </h3>

                  {item.type === "event" && item.eventDetails && (
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-purple-300">
                      {item.eventDetails.startDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(item.eventDetails.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {item.eventDetails.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.eventDetails.location}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                <Link
                  href={`/admin/news/${item._id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 hover:text-white transition-colors"
                  title="Delete news or event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
          >
            Previous
          </button>
          <span className="text-slate-400 font-medium">
            Page <span className="text-white font-bold">{page}</span> of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete News or Event"
        message="Are you sure you want to permanently delete this entry? This action cannot be undone."
        itemName={deleteTarget?.title}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
