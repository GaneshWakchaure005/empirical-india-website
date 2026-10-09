"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Newspaper,
  Save,
  Loader2,
  AlertCircle,
  Tag,
  Globe,
  MapPin,
  Clock,
  ExternalLink,
  Trash2,
  Sparkles,
  PlusCircle,
} from "lucide-react";
import slugify from "slugify";
import ImageUploader from "@/components/admin/ImageUploader";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import CategoryModal from "@/components/admin/CategoryModal";
import { useToast } from "@/components/admin/AdminToast";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

export default function EditNewsEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form State
  const [type, setType] = useState<"news" | "event">("news");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [altText, setAltText] = useState("");

  // Existing image info
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(undefined);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  // Event specific fields
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventRegistrationUrl, setEventRegistrationUrl] = useState("");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to format ISO to datetime-local string
  const formatDatetimeForInput = (iso?: string) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
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
        const unique: CategoryOption[] = [];
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
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchItem = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/news-events/${id}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success || !data.data) {
        throw new Error(data?.message || "Entry not found");
      }


      const item = data.data;
      setType(item.type || "news");
      setTitle(item.title || "");
      setSlug(item.slug || "");
      setExcerpt(item.excerpt || "");
      setContent(item.content || "");
      setCategoryId(
        typeof item.category === "object" ? item.category._id : item.category || ""
      );
      setStatus(item.status || "draft");
      setFeatured(Boolean(item.featured));
      setTagsInput(Array.isArray(item.tags) ? item.tags.join(", ") : "");
      setAltText(item.featuredImage?.alt || "");
      setExistingImageUrl(item.featuredImage?.url);

      if (item.eventDetails) {
        setEventStartDate(formatDatetimeForInput(item.eventDetails.startDate));
        setEventEndDate(formatDatetimeForInput(item.eventDetails.endDate));
        setEventLocation(item.eventDetails.location || "");
        setEventRegistrationUrl(item.eventDetails.registrationUrl || "");
      }

      if (item.seo) {
        setMetaTitle(item.seo.metaTitle || "");
        setMetaDescription(item.seo.metaDescription || "");
        setKeywordsInput(
          Array.isArray(item.seo.keywords) ? item.seo.keywords.join(", ") : ""
        );
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to load entry.");
      toast.error(err.message || "Could not retrieve entry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItem();
  }, [id]);

  const handleCategoryCreated = (newCat: any) => {
    setCategories((prev) => {
      const exists = prev.some(
        (c) => c._id === newCat._id || c.name.trim().toLowerCase() === newCat.name.trim().toLowerCase()
      );
      if (exists) return prev;
      return [...prev, newCat];
    });
    setCategoryId(newCat._id);
  };

  const handleUpdate = async (updateStatus?: "draft" | "published") => {
    setFormError(null);
    const finalStatus = updateStatus || status;

    if (title.trim().length < 3) {
      setFormError("Title must be at least 3 characters.");
      return;
    }
    if (excerpt.trim().length < 10) {
      setFormError("Excerpt must be at least 10 characters.");
      return;
    }
    if (content.trim().length < 10) {
      setFormError("Content must be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      let res: Response;

      if (newImageFile) {
        // Use FormData for new image
        const formData = new FormData();
        formData.append("type", type);
        formData.append("title", title.trim());
        formData.append("slug", slug.trim() || slugify(title, { lower: true, strict: true }));
        formData.append("excerpt", excerpt.trim());
        formData.append("content", content.trim());
        if (categoryId) formData.append("category", categoryId);
        formData.append("status", finalStatus);
        formData.append("featured", String(featured));
        formData.append("tags", tagsInput);
        formData.append("alt", altText.trim());
        formData.append("image", newImageFile);

        if (type === "event") {
          if (eventStartDate) formData.append("eventStartDate", new Date(eventStartDate).toISOString());
          if (eventEndDate) formData.append("eventEndDate", new Date(eventEndDate).toISOString());
          if (eventLocation.trim()) formData.append("eventLocation", eventLocation.trim());
          if (eventRegistrationUrl.trim()) formData.append("eventRegistrationUrl", eventRegistrationUrl.trim());
        }

        if (metaTitle.trim()) formData.append("metaTitle", metaTitle.trim());
        if (metaDescription.trim()) formData.append("metaDescription", metaDescription.trim());
        if (keywordsInput.trim()) formData.append("keywords", keywordsInput.trim());

        res = await fetch(`/api/admin/news-events/${id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Use JSON for text updates
        const payload: any = {
          type,
          title: title.trim(),
          slug: slug.trim() || slugify(title, { lower: true, strict: true }),
          excerpt: excerpt.trim(),
          content: content.trim(),
          category: categoryId || undefined,
          status: finalStatus,
          featured,
          tags: tagsInput,
          alt: altText.trim(),
          eventStartDate: eventStartDate ? new Date(eventStartDate).toISOString() : undefined,
          eventEndDate: eventEndDate ? new Date(eventEndDate).toISOString() : undefined,
          eventLocation: eventLocation.trim() || undefined,
          eventRegistrationUrl: eventRegistrationUrl.trim() || undefined,
          metaTitle: metaTitle.trim() || undefined,
          metaDescription: metaDescription.trim() || undefined,
          keywords: keywordsInput.trim() || undefined,
        };

        res = await fetch(`/api/admin/news-events/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to update entry");
      }

      toast.success(`${type === "event" ? "Event" : "News"} updated successfully!`);
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "Error updating entry.");
      toast.error(err.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/news-events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete entry");
      }

      toast.success("Entry deleted successfully");
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Could not delete entry");
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        <span className="text-sm">Loading entry details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to News & Events</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <span>Edit News or Event</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Update scheduling, event dates, media banners, and announcement details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 hover:text-white transition-colors"
            title="Delete this entry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleUpdate("draft")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleUpdate("published")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/50 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Item</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {formError && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{formError}</div>
        </div>
      )}

      {/* Type Switcher */}
      <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => setType("news")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            type === "news"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Company News</span>
        </button>
        <button
          type="button"
          onClick={() => setType("event")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            type === "event"
              ? "bg-purple-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Industry Event</span>
        </button>
      </div>

      {/* Core Fields Card */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">/news/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Category *
                </label>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-xs text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Category</span>
                </button>
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {loadingCategories ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Featured Flag & Status
              </label>
              <div className="flex items-center gap-4 px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-xs text-slate-300">Featured</span>
                </label>
                <span className="text-slate-700">|</span>
                <span
                  className={`text-xs font-semibold uppercase ${
                    status === "published" ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  Status: {status}
                </span>
              </div>
            </div>
          </div>

          {/* Event Specific Fields */}
          {type === "event" && (
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 space-y-4">
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Event Logistics & Dates</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-purple-900/60 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-purple-900/60 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Venue / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-purple-900/60 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Registration / Booth Link (URL)
                  </label>
                  <div className="relative">
                    <ExternalLink className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="url"
                      value={eventRegistrationUrl}
                      onChange={(e) => setEventRegistrationUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-purple-900/60 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Summary / Excerpt (10–600 chars) *
            </label>
            <textarea
              rows={3}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="text-right text-[10px] text-slate-500 mt-1">
              {excerpt.length} / 600 characters
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Content Body *
            </label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Tags (Comma-separated)
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Exhibition, IMTEX, Roll Forming"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Cover Image Uploader Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
          <ImageUploader
            currentUrl={existingImageUrl}
            altText={altText}
            onImageSelect={setNewImageFile}
            onAltTextChange={setAltText}
            onRemoveCurrentImage={() => setExistingImageUrl(undefined)}
            label="Cover Image / Banner"
            helperText="Upload a new image to replace the current banner (PNG, JPG, WebP up to 5MB)."
          />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete News or Event"
        message="Are you sure you want to permanently delete this entry? This action cannot be reversed."
        itemName={title}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Inline Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
        defaultType={type}
      />
    </div>
  );
}
