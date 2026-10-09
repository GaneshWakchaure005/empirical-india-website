"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Plus,
  Save,
  Loader2,
  AlertCircle,
  Sparkles,
  Tag,
  Globe,
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

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      const res = await fetch("/api/admin/categories?type=blog,general");
      const data = await res.json().catch(() => ({}));
      if (data?.success && Array.isArray(data.data)) {
        // Fallback to all categories if empty
        let rawList = data.data;
        if (rawList.length === 0) {
          const fallbackRes = await fetch("/api/admin/categories");
          const fallbackData = await fallbackRes.json().catch(() => ({}));
          if (fallbackData?.success && Array.isArray(fallbackData.data)) {
            rawList = fallbackData.data;
          }
        }


        // Deduplicate by normalized name
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

  // Handle Title change & auto-generate slug
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

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("slug", slug.trim() || slugify(title, { lower: true, strict: true }));
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("category", categoryId);
      formData.append("status", submitStatus);
      formData.append("featured", String(featured));
      formData.append("tags", tagsInput);
      formData.append("alt", altText.trim());

      if (metaTitle.trim()) formData.append("metaTitle", metaTitle.trim());
      if (metaDescription.trim()) formData.append("metaDescription", metaDescription.trim());
      if (keywordsInput.trim()) formData.append("keywords", keywordsInput.trim());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to create blog article");
      }

      toast.success(
        submitStatus === "published"
          ? "Article published successfully!"
          : "Draft saved successfully!"
      );
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred while saving.");
      toast.error(err.message || "Could not save blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

 
return (
  <div className="mx-auto max-w-7xl space-y-4 animate-in fade-in duration-200">
    {/* Header */}
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          href="/admin/blogs"
          className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to All Blogs
        </Link>

        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
          <FileText className="h-5 w-5 text-cyan-400" />
          Create New Blog Article
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Create and publish technical articles, product guides, and engineering content.
        </p>
      </div>
    </div>

    {/* Error */}
    {formError && (
      <div className="flex items-start gap-3 rounded-xl border border-rose-800 bg-rose-950/80 p-3 text-sm text-rose-200">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
        <div className="flex-1">{formError}</div>
      </div>
    )}

    {/* Responsive Form Layout */}
    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
      {/* Main Content */}
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5">
        <h2 className="text-sm font-bold text-white">Article Details</h2>

        {/* Title */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            Article Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter article title"
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            URL Slug *
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-slate-500">/news/</span>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="article-url-slug"
              className="min-w-0 flex-1 rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Category and Featured */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-300">
                Category *
              </label>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:underline"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                New
              </button>
            </div>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {loadingCategories ? (
                <option value="">Loading categories...</option>
              ) : (
                <>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Featured Article
            </label>
            <label className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-slate-700">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-cyan-500"
              />
              <span className="text-xs text-slate-300">
                Highlight on website
              </span>
            </label>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            Summary / Excerpt *
          </label>
          <textarea
            rows={3}
            required
            maxLength={600}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Write a concise article summary..."
            className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <p className="mt-1 text-right text-[10px] text-slate-500">
            {excerpt.length}/600 characters
          </p>
        </div>

        {/* Article Body */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            Article Content *
          </label>
          <textarea
            rows={14}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article using Markdown or HTML..."
            className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2.5 font-mono text-xs leading-relaxed text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            Tags
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Engineering, Manufacturing, Steel"
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* Sidebar: Media and SEO */}
      <div className="space-y-4">
        {/* Featured Image */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold text-white">Featured Image</h2>
          <ImageUploader
            altText={altText}
            onImageSelect={setImageFile}
            onAltTextChange={setAltText}
            label="Cover Image"
            helperText="PNG, JPG, or WebP up to 5MB."
          />
        </section>

        {/* SEO */}
        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-white">
            <Globe className="h-4 w-4 text-cyan-400" />
            Search Engine Optimization
          </h2>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">
              Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Custom page title"}
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={excerpt || "Search engine summary"}
              className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">
              Keywords
            </label>
            <input
              type="text"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="Manufacturing, engineering, industry"
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </section>
      </div>
    </div>

    {/* Sticky Actions */}
    <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-2 rounded-xl border border-slate-800 bg-slate-950/95 p-3 backdrop-blur sm:flex-row sm:justify-end">
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => handleSubmit("draft")}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
      >
        Save as Draft
      </button>

      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => handleSubmit("published")}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Publish Article
          </>
        )}
      </button>
    </div>

    {/* Category Modal */}
    <CategoryModal
      isOpen={isCategoryModalOpen}
      onClose={() => setIsCategoryModalOpen(false)}
      onCategoryCreated={handleCategoryCreated}
      defaultType="blog"
    />
  </div>
);

}
