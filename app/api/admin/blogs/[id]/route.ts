import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { requireEditorOrAdmin } from "@/lib/auth";
import { blogUpdateSchema, objectIdSchema } from "@/lib/validation";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
  validateImageFile,
} from "@/lib/cloudinary";
import { generateUniqueSlug } from "@/lib/slug";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";


import "@/models/Admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const blog = await Blog.findById(id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    return successResponse(blog);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  let newUploadedPublicId: string | null = null;

  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const blog = await Blog.findById(id);

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    const contentType = request.headers.get("content-type") || "";
    let rawData: Record<string, any> = {};
    let imageFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (value instanceof File) {
          if (key === "image" || key === "featuredImage") {
            imageFile = value;
          }
        } else {
          rawData[key] = value;
        }
      });
    } else {
      rawData = await request.json();
    }

    if (typeof rawData.featured === "string") {
      rawData.featured = rawData.featured === "true";
    }

    const validated = blogUpdateSchema.parse(rawData);

    // Validate category if provided
    if (validated.category) {
      const catExists = await Category.findById(validated.category);
      if (!catExists) {
        return errorResponse("Category not found", 400);
      }
      blog.category = validated.category as any;
    }

    // Slug update logic
    if (validated.slug) {
      blog.slug = await generateUniqueSlug(Blog, validated.slug, blog._id);
    } else if (validated.title && validated.title !== blog.title) {
      // Keep existing slug unless explicitly forced, or update if user passed slug
      // We keep existing slug to not break URLs unless slug is provided
    }

    if (validated.title !== undefined) blog.title = validated.title;
    if (validated.excerpt !== undefined) blog.excerpt = validated.excerpt;
    if (validated.content !== undefined) blog.content = validated.content;
    if (validated.tags !== undefined) blog.tags = validated.tags;
    if (validated.featured !== undefined) blog.featured = validated.featured;

    // Status & Publishing logic
    if (validated.status !== undefined) {
      if (validated.status === "published" && blog.status !== "published") {
        blog.publishedAt = new Date();
      }
      blog.status = validated.status;
    }

    // SEO updates
    if (!blog.seo) {
      blog.seo = { metaTitle: "", metaDescription: "", keywords: [] };
    }
    if (validated.metaTitle !== undefined) blog.seo.metaTitle = validated.metaTitle;
    if (validated.metaDescription !== undefined) blog.seo.metaDescription = validated.metaDescription;
    if (validated.keywords !== undefined) blog.seo.keywords = validated.keywords;

    // Alt text update
    if (validated.alt !== undefined && blog.featuredImage) {
      blog.featuredImage.alt = validated.alt;
    }

    const oldPublicId = blog.featuredImage?.publicId;
    const existingImage = rawData.featuredImage || rawData.image;

    // If new image file uploaded
    if (imageFile) {
      const validation = validateImageFile(imageFile);
      if (!validation.valid) {
        return errorResponse(validation.error || "Invalid image file", 400);
      }

      const uploadResult = await uploadImageToCloudinary(
        imageFile,
        "empirical-india/blogs"
      );
      newUploadedPublicId = uploadResult.publicId;

      blog.featuredImage = {
        url: uploadResult.secureUrl,
        publicId: uploadResult.publicId,
        alt: validated.alt || blog.featuredImage?.alt || blog.title,
      };
    } else if (existingImage && existingImage.url && existingImage.publicId) {
      blog.featuredImage = {
        url: existingImage.url,
        publicId: existingImage.publicId,
        alt: existingImage.alt || validated.alt || blog.featuredImage?.alt || blog.title,
      };
    }

    await blog.save();

    // After successful database save, delete old image from Cloudinary
    if (newUploadedPublicId && oldPublicId && oldPublicId !== newUploadedPublicId) {
      deleteImageFromCloudinary(oldPublicId).catch((err) =>
        console.error("Failed to delete old Cloudinary image:", err)
      );
    }

    const updatedBlog = await Blog.findById(blog._id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    return successResponse(updatedBlog);
  } catch (error) {
    // If DB fails after uploading new image, cleanup new image
    if (newUploadedPublicId) {
      await deleteImageFromCloudinary(newUploadedPublicId).catch((err) =>
        console.error("Failed to cleanup new image after DB error:", err)
      );
    }
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const blog = await Blog.findById(id);

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    const publicId = blog.featuredImage?.publicId;

    await Blog.findByIdAndDelete(id);

    // Delete associated image from Cloudinary
    if (publicId) {
      await deleteImageFromCloudinary(publicId).catch((err) =>
        console.error("Failed to delete Cloudinary image upon blog deletion:", err)
      );
    }

    return successResponse({
      message: "Blog deleted successfully",
      id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
