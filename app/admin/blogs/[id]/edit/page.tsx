"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Save,
  Loader2,
  AlertCircle,
  Tag,
  Globe,
  Trash2,
  Sparkles,
  PlusCircle,
  ExternalLink,
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

export default function EditBlogPage({
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

  // Fetch Categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch("/api/admin/categories?type=blog,general");
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

  // Fetch Blog Data
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success || !data.data) {
        throw new Error(data?.message || "Blog not found");
      }


      const blog = data.data;
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setExcerpt(blog.excerpt || "");
      setContent(blog.content || "");
      setCategoryId(
        typeof blog.category === "object" ? blog.category._id : blog.category || ""
      );
      setStatus(blog.status || "draft");
      setFeatured(Boolean(blog.featured));
      setTagsInput(Array.isArray(blog.tags) ? blog.tags.join(", ") : "");
      setAltText(blog.featuredImage?.alt || "");
      setExistingImageUrl(blog.featuredImage?.url);

      if (blog.seo) {
        setMetaTitle(blog.seo.metaTitle || "");
        setMetaDescription(blog.seo.metaDescription || "");
        setKeywordsInput(
          Array.isArray(blog.seo.keywords) ? blog.seo.keywords.join(", ") : ""
        );
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to load blog data.");
      toast.error(err.message || "Could not retrieve blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBlog();
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
        // Use FormData if new image is selected
        const formData = new FormData();
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

        if (metaTitle.trim()) formData.append("metaTitle", metaTitle.trim());
        if (metaDescription.trim()) formData.append("metaDescription", metaDescription.trim());
        if (keywordsInput.trim()) formData.append("keywords", keywordsInput.trim());

        res = await fetch(`/api/admin/blogs/${id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Use JSON if keeping existing image or text-only updates
        const payload: any = {
          title: title.trim(),
          slug: slug.trim() || slugify(title, { lower: true, strict: true }),
          excerpt: excerpt.trim(),
          content: content.trim(),
          category: categoryId || undefined,
          status: finalStatus,
          featured,
          tags: tagsInput,
          alt: altText.trim(),
          metaTitle: metaTitle.trim() || undefined,
          metaDescription: metaDescription.trim() || undefined,
          keywords: keywordsInput.trim() || undefined,
        };

        res = await fetch(`/api/admin/blogs/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "Error updating blog article.");
      toast.error(err.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete blog");
      }

      toast.success("Blog article deleted successfully");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Could not delete blog");
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <span className="text-sm">Loading blog article data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blogs</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>Edit Blog Article</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Update technical specifications, content, featured image, and SEO metadata.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 hover:text-white transition-colors"
            title="Delete this article"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/50 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Article</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{formError}</div>
        </div>
      )}

      {/* Core Fields Card */}
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. High-Efficiency Automated Roll-Forming Lines"
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                placeholder="article-slug"
                className="flex-1 px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                  className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Category</span>
                </button>
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 bg-slate-900 border-slate-700"
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
              className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <div className="text-right text-[10px] text-slate-500 mt-1">
              {excerpt.length} / 600 characters
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Article Content *
            </label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                placeholder="Roll Forming, Tooling, Automotive"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Image Uploader Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
          <ImageUploader
            currentUrl={existingImageUrl}
            altText={altText}
            onImageSelect={setNewImageFile}
            onAltTextChange={setAltText}
            onRemoveCurrentImage={() => setExistingImageUrl(undefined)}
            label="Featured Cover Image"
            helperText="Upload a new image to replace the current cover photo (PNG, JPG, WebP up to 5MB)."
          />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Blog Article"
        message="Are you sure you want to permanently delete this blog post? This action cannot be undone."
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
        defaultType="blog"
      />
    </div>
  );
}
