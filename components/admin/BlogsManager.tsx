"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  UploadCloud,
  Loader2,
  AlertCircle,
  Star,
  PlusCircle,
  Sparkles,
} from "lucide-react";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
  type?: string;
}

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
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
  publishedAt?: string;
  createdAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [savingStatus, setSavingStatus] = useState<"draft" | "published" | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Inline Category Creation State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [altText, setAltText] = useState("");

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrlPreview, setImageUrlPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Categories (Fetch all categories across types so blogs have full access)
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        let cats: CategoryOption[] = data.data;

        // Auto-bootstrap default industrial categories if none exist in DB yet
        if (cats.length === 0) {
          const defaults = [
            { name: "Roll-Forming Technology", type: "blog" },
            { name: "Modular Metal Pallets", type: "blog" },
            { name: "Trolley-Bag Tubes", type: "blog" },
            { name: "Engineering Insights", type: "blog" },
          ];

          for (const d of defaults) {
            try {
              const createRes = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(d),
              });
              const createData = await createRes.json();
              if (createData.success && createData.data) {
                cats.push(createData.data);
              }
            } catch (err) {
              console.error("Auto-bootstrap category failed:", err);
            }
          }
        }

        setCategories(cats);
        if (cats.length > 0 && !categoryId) {
          setCategoryId(cats[0]._id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // 2. Fetch Blogs List
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (categoryFilter !== "all") params.set("category", categoryFilter);

      const res = await fetch(`/api/admin/blogs?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load blogs");
      }

      setBlogs(data.data || []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [page, statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategoryId(categories[0]?._id || "");
    setTags("");
    setFeatured(false);
    setMetaTitle("");
    setMetaDescription("");
    setKeywords("");
    setAltText("");
    setImageFile(null);
    setImageUrlPreview("");
    setFormError(null);
    setShowAddCategory(false);
    setNewCategoryName("");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setCategoryId(blog.category?._id || categories[0]?._id || "");
    setTags(blog.tags ? blog.tags.join(", ") : "");
    setFeatured(Boolean(blog.featured));
    setMetaTitle(blog.seo?.metaTitle || "");
    setMetaDescription(blog.seo?.metaDescription || "");
    setKeywords(blog.seo?.keywords ? blog.seo.keywords.join(", ") : "");
    setAltText(blog.featuredImage?.alt || "");
    setImageFile(null);
    setImageUrlPreview(blog.featuredImage?.url || "");
    setFormError(null);
    setShowAddCategory(false);
    setNewCategoryName("");
    setIsModalOpen(true);
  };

  const handleQuickAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          type: "blog",
          description: "Created from blog editor",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add category");
      }

      const newCat = data.data;
      setCategories((prev) => [...prev, newCat]);
      setCategoryId(newCat._id);
      setNewCategoryName("");
      setShowAddCategory(false);
    } catch (err: any) {
      alert(err.message || "Could not create category");
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("Selected file exceeds 5MB limit.");
        return;
      }
      setImageFile(file);
      setImageUrlPreview(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  // Submit Handler accepting target status directly ("draft" or "published")
  const handleSaveWithStatus = async (targetStatus: "draft" | "published") => {
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
    if (!editingBlog && !imageFile && !imageUrlPreview) {
      setFormError("Featured image is required.");
      return;
    }

    setSavingStatus(targetStatus);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      if (slug.trim()) formData.append("slug", slug.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("category", categoryId);
      formData.append("status", targetStatus);
      formData.append("featured", String(featured));
      if (tags.trim()) formData.append("tags", tags.trim());
      if (altText.trim()) formData.append("alt", altText.trim());
      if (metaTitle.trim()) formData.append("metaTitle", metaTitle.trim());
      if (metaDescription.trim())
        formData.append("metaDescription", metaDescription.trim());
      if (keywords.trim()) formData.append("keywords", keywords.trim());

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog._id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message ||
            (data?.errors ? JSON.stringify(data.errors) : "Failed to save blog")
        );
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (err: any) {
      setFormError(err.message || "Failed to save blog post.");
    } finally {
      setSavingStatus(null);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete blog");
      }
      setDeleteConfirmId(null);
      fetchBlogs();
    } catch (err: any) {
      alert(err.message || "Could not delete blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Blogs & Technical Articles
          </h2>
          <p className="text-xs text-slate-400">
            Publish technical capabilities, machine setups, and manufacturing insights
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/50 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Blog Post</span>
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
            placeholder="Search by title or excerpt..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 max-w-[170px]"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Items Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            <span className="text-xs">Loading articles...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-400 text-xs">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-medium text-slate-300">No blog posts found</p>
            <p className="text-xs text-slate-500 mt-1">
              Create your first article or try relaxing filter conditions.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 uppercase tracking-wider text-[10px] text-slate-400 font-bold">
                <tr>
                  <th className="py-3 px-4">Post Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-slate-850/50 transition-colors"
                  >
                    {/* Post Details */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
                          {blog.featuredImage?.url ? (
                            <Image
                              src={blog.featuredImage.url}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                              <FileText className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white truncate max-w-xs text-xs">
                            {blog.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px]">
                        {blog.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          blog.status === "published"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-700/40 text-slate-400 border border-slate-600/50"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4">
                      {blog.featured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">No</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Post"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(blog._id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                          title="Delete Post"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-sm w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Delete Article?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete this blog post and its associated Cloudinary image? This action cannot be undone.
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
                onClick={() => handleDeleteBlog(deleteConfirmId)}
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
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</span>
                {editingBlog && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      editingBlog.status === "published"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    Current: {editingBlog.status}
                  </span>
                )}
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

            <div className="space-y-4 text-xs">
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
                  placeholder="e.g. Precision Roll-Forming for Heavy Racking"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Slug (Optional) */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Custom Slug (optional - auto-generated if left blank)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. precision-roll-forming"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* Category Selector with Inline Category Creator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-300">
                    Category *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{showAddCategory ? "Close" : "+ New Category"}</span>
                  </button>
                </div>

                {/* Inline Quick Add Category Input */}
                {showAddCategory && (
                  <div className="mb-2 p-3 rounded-xl bg-slate-950 border border-cyan-800/40 flex items-center gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name (e.g. Metal Pallets)"
                      className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={handleQuickAddCategory}
                      disabled={isCreatingCategory || !newCategoryName.trim()}
                      className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-xs disabled:opacity-50 flex items-center gap-1"
                    >
                      {isCreatingCategory ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                      <span>Add</span>
                    </button>
                  </div>
                )}

                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {categories.length === 0 ? (
                    <option value="">No categories found (use + New Category above)</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name} {cat.type ? `(${cat.type})` : ""}
                      </option>
                    ))
                  )}
                </select>
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
                  placeholder="Brief summary displayed on cards..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Article Content (Markdown or HTML) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detailed engineering content..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Featured Image * (Max 5MB - JPG, PNG, WEBP)
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
                    <UploadCloud className="w-4 h-4 text-cyan-400" />
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

              {/* Tags & Featured Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="roll-forming, tooling, export"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-0"
                    />
                    <span className="font-semibold text-slate-300">
                      Highlight as Featured Post
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons: Cancel, Save as Draft, Publish Blog */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={savingStatus !== null}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5">
                  {/* Save as Draft Button */}
                  <button
                    type="button"
                    onClick={() => handleSaveWithStatus("draft")}
                    disabled={savingStatus !== null}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    {savingStatus === "draft" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        <span>Saving Draft...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>Save as Draft</span>
                      </>
                    )}
                  </button>

                  {/* Publish Blog Button */}
                  <button
                    type="button"
                    onClick={() => handleSaveWithStatus("published")}
                    disabled={savingStatus !== null}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all disabled:opacity-50"
                  >
                    {savingStatus === "published" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingBlog ? "Update & Publish" : "Publish Blog"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
