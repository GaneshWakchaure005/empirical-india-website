"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  UploadCloud,
  Loader2,
  AlertCircle,
  MapPin,
  ExternalLink,
  Star,
  Clock,
} from "lucide-react";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface NewsEventItem {
  _id: string;
  title: string;
  slug: string;
  type: "news" | "event";
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    publicId: string;
    alt?: string;
  };
  category: {
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
    registrationUrl?: string;
  };
  publishedAt?: string;
  createdAt: string;
}

export default function NewsEventsManager() {
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsEventItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<"news" | "event">("news");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventRegistrationUrl, setEventRegistrationUrl] = useState("");
  const [altText, setAltText] = useState("");

  // Image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrlPreview, setImageUrlPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success && data.data) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  // Fetch News & Events
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (search.trim()) params.set("search", search.trim());
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/news-events?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load news & events");
      }

      setItems(data.data || []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load news and events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [page, typeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchItems();
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setSlug("");
    setType("news");
    setExcerpt("");
    setContent("");
    setCategoryId(categories[0]?._id || "");
    setTags("");
    setStatus("draft");
    setFeatured(false);
    setEventStartDate("");
    setEventEndDate("");
    setEventLocation("");
    setEventRegistrationUrl("");
    setAltText("");
    setImageFile(null);
    setImageUrlPreview("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsEventItem) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setSlug(item.slug || "");
    setType(item.type || "news");
    setExcerpt(item.excerpt || "");
    setContent(item.content || "");
    setCategoryId(item.category?._id || categories[0]?._id || "");
    setTags(item.tags ? item.tags.join(", ") : "");
    setStatus(item.status || "draft");
    setFeatured(Boolean(item.featured));
    setEventStartDate(
      item.eventDetails?.startDate
        ? new Date(item.eventDetails.startDate).toISOString().slice(0, 16)
        : ""
    );
    setEventEndDate(
      item.eventDetails?.endDate
        ? new Date(item.eventDetails.endDate).toISOString().slice(0, 16)
        : ""
    );
    setEventLocation(item.eventDetails?.location || "");
    setEventRegistrationUrl(item.eventDetails?.registrationUrl || "");
    setAltText(item.featuredImage?.alt || "");
    setImageFile(null);
    setImageUrlPreview(item.featuredImage?.url || "");
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("File size exceeds 5MB limit.");
        return;
      }
      setImageFile(file);
      setImageUrlPreview(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || title.length < 3) {
      setFormError("Title must be at least 3 characters.");
      return;
    }
    if (!excerpt.trim() || excerpt.length < 10) {
      setFormError("Excerpt must be at least 10 characters.");
      return;
    }
    if (!content.trim() || content.length < 10) {
      setFormError("Content must be at least 10 characters.");
      return;
    }
    if (!categoryId) {
      setFormError("Please select a category.");
      return;
    }
    if (!editingItem && !imageFile && !imageUrlPreview) {
      setFormError("Featured image is required.");
      return;
    }

    if (type === "event" && eventStartDate) {
      if (isNaN(Date.parse(eventStartDate))) {
        setFormError("Event start date is invalid.");
        return;
      }
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      if (slug.trim()) formData.append("slug", slug.trim());
      formData.append("type", type);
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("category", categoryId);
      formData.append("status", status);
      formData.append("featured", String(featured));
      if (tags.trim()) formData.append("tags", tags.trim());
      if (altText.trim()) formData.append("alt", altText.trim());

      if (type === "event") {
        if (eventStartDate)
          formData.append(
            "eventStartDate",
            new Date(eventStartDate).toISOString()
          );
        if (eventEndDate)
          formData.append(
            "eventEndDate",
            new Date(eventEndDate).toISOString()
          );
        if (eventLocation.trim())
          formData.append("eventLocation", eventLocation.trim());
        if (eventRegistrationUrl.trim())
          formData.append(
            "eventRegistrationUrl",
            eventRegistrationUrl.trim()
          );
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingItem
        ? `/api/admin/news-events/${editingItem._id}`
        : "/api/admin/news-events";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to save news/event item");
      }

      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      setFormError(err.message || "Failed to save item.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/news-events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete item");
      }
      setDeleteConfirmId(null);
      fetchItems();
    } catch (err: any) {
      alert(err.message || "Could not delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            News, Events & Exhibitions
          </h2>
          <p className="text-xs text-slate-400">
            Keep buyers updated on factory milestones, machine dispatches, and trade shows
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-950/50 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New News / Event</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news & events..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
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
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="news">News</option>
            <option value="event">Events</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span className="text-xs">Loading items...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-400 text-xs">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-medium text-slate-300">No news or events found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 uppercase tracking-wider text-[10px] text-slate-400 font-bold">
                <tr>
                  <th className="py-3 px-4">Item Details</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Event Info</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-850/50 transition-colors"
                  >
                    {/* Details */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
                          {item.featuredImage?.url ? (
                            <Image
                              src={item.featuredImage.url}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                              <Calendar className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white truncate max-w-xs text-xs">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.type === "event"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    {/* Event Info */}
                    <td className="py-3.5 px-4 text-[11px] text-slate-400">
                      {item.type === "event" && item.eventDetails ? (
                        <div className="space-y-0.5">
                          {item.eventDetails.startDate && (
                            <div className="flex items-center gap-1 text-slate-300">
                              <Clock className="w-3 h-3 text-purple-400" />
                              <span>
                                {new Date(
                                  item.eventDetails.startDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {item.eventDetails.location && (
                            <div className="flex items-center gap-1 text-slate-400 truncate max-w-[140px]">
                              <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                              <span>{item.eventDetails.location}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "published"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-700/40 text-slate-400 border border-slate-600/50"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-sm w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Delete Item?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteItem(deleteConfirmId)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? "Edit News / Event" : "Create News or Event"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
              {/* Type Switcher */}
              <div>
                <label className="block font-semibold text-slate-300 mb-2">
                  Entry Type *
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setType("news")}
                    className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                      type === "news"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-950/50"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-850"
                    }`}
                  >
                    News Announcement
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("event")}
                    className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                      type === "event"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-850"
                    }`}
                  >
                    Event / Trade Expo
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. International Tube & Pipe Machinery Expo 2026"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* If Event: Event Fields */}
              {type === "event" && (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-3">
                  <div className="font-semibold text-purple-300 text-xs">
                    Event Schedule & Venue
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={eventStartDate}
                        onChange={(e) => setEventStartDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">
                        End Date & Time (optional)
                      </label>
                      <input
                        type="datetime-local"
                        value={eventEndDate}
                        onChange={(e) => setEventEndDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">
                        Venue / Location
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Bombay Exhibition Centre, Mumbai"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">
                        Registration URL (optional)
                      </label>
                      <input
                        type="url"
                        value={eventRegistrationUrl}
                        onChange={(e) => setEventRegistrationUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "draft" | "published")
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Summary / Excerpt (10-600 characters) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short overview..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Article Content *
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Details..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono text-[11px]"
                />
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Featured Image * (Max 5MB)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 font-semibold flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4 text-purple-400" />
                    <span>Choose Image</span>
                  </button>

                  {imageUrlPreview && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700">
                      <Image
                        src={imageUrlPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-lg shadow-purple-950/60"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{editingItem ? "Save Changes" : "Create Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
