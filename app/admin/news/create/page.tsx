"use client";

import { useEffect, useState } from "react";
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
  Sparkles,
  PlusCircle,
} from "lucide-react";
import slugify from "slugify";
import ImageUploader from "@/components/admin/ImageUploader";
import CategoryModal from "@/components/admin/CategoryModal";
import { useToast } from "@/components/admin/AdminToast";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
  type?: string;
}

export default function CreateNewsEventPage() {
  const router = useRouter();
  const { toast } = useToast();

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
  const [featured, setFeatured] = useState(false);
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  // Fetch Categories
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
        if (unique.length > 0 && !categoryId) {
          setCategoryId(unique[0]._id);
        }
      }
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      slugify(val, {
        lower: true,
        strict: true,
        trim: true,
      })
    );
  };

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

  const handleSubmit = async (submitStatus: "draft" | "published") => {
    setFormError(null);

    // Validation
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
    if (!categoryId) {
      setFormError("Please select a category.");
      return;
    }
    if (type === "event" && eventStartDate && isNaN(Date.parse(eventStartDate))) {
      setFormError("Please specify a valid start date for the event.");
      return;
    }
    if (!imageFile) {
      setFormError("A cover image is required. Please upload an image banner.");
      return;
    }


    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("title", title.trim());
      formData.append("slug", slug.trim() || slugify(title, { lower: true, strict: true }));
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("category", categoryId);
      formData.append("status", submitStatus);
      formData.append("featured", String(featured));
      formData.append("tags", tagsInput);
      formData.append("alt", altText.trim());

      if (type === "event") {
        if (eventStartDate) formData.append("eventStartDate", new Date(eventStartDate).toISOString());
        if (eventEndDate) formData.append("eventEndDate", new Date(eventEndDate).toISOString());
        if (eventLocation.trim()) formData.append("eventLocation", eventLocation.trim());
        if (eventRegistrationUrl.trim()) formData.append("eventRegistrationUrl", eventRegistrationUrl.trim());
      }

      if (metaTitle.trim()) formData.append("metaTitle", metaTitle.trim());
      if (metaDescription.trim()) formData.append("metaDescription", metaDescription.trim());
      if (keywordsInput.trim()) formData.append("keywords", keywordsInput.trim());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/admin/news-events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to create entry");
      }

      toast.success(
        submitStatus === "published"
          ? `${type === "event" ? "Event" : "News"} published successfully!`
          : "Draft saved successfully!"
      );
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "Could not save entry");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span>Create News or Event</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Publish factory dispatches, company milestones, or industrial trade show exhibits.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/50 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish Item</span>
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

      {/* Type Selector Tabs */}
      <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => setType("news")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            type === "news"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/50"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Company News Announcement</span>
        </button>
        <button
          type="button"
          onClick={() => setType("event")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            type === "event"
              ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Trade Show / Industry Event</span>
        </button>
      </div>

      {/* Core Fields Card */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {type === "event" ? "Event Title *" : "News Title *"}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder={
                type === "event"
                  ? "e.g. Empirical India at IMTEX 2026 Machine Tool Exhibition"
                  : "e.g. Commissioning of 35-Stand High-Speed Roll-Forming Line"
              }
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
                placeholder="entry-slug"
                className="flex-1 px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category & Featured */}
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
                Featured Flag
              </label>
              <label className="flex items-center gap-3 px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
                <span className="text-xs font-medium text-slate-300">
                  Feature in top announcements
                </span>
              </label>
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
                      placeholder="BIEC, Bengaluru, India (Hall 4, Stall B12)"
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
                      placeholder="https://event.imtex.in/register"
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
              placeholder="Concise overview for listings and announcements..."
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="text-right text-[10px] text-slate-500 mt-1">
              {excerpt.length} / 600 characters
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Content Body *
            </label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full details of the announcement or event description..."
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
                placeholder="Exhibition, Commissioning, Roll Forming"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Featured Image Uploader Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
          <ImageUploader
            altText={altText}
            onImageSelect={setImageFile}
            onAltTextChange={setAltText}
            label="Cover Image / Banner"
            helperText="Event poster or announcement photo (PNG, JPG, WebP up to 5MB)."
          />
        </div>
      </div>

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
