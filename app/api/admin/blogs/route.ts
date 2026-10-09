import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import "@/models/Admin";
import { requireEditorOrAdmin } from "@/lib/auth";
import { blogCreateSchema } from "@/lib/validation";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
  validateImageFile,
} from "@/lib/cloudinary";
import { generateUniqueSlug } from "@/lib/slug";
import {
  successResponse,
  paginatedResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();
    const category = searchParams.get("category")?.trim();
    const featured = searchParams.get("featured");

    const query: any = {};

    if (status && (status === "draft" || status === "published")) {
      query.status = status;
    }

    if (category && mongoose.isValidObjectId(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    if (featured !== null && featured !== undefined && featured !== "") {
      query.featured = featured === "true";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate("category", "name slug")
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return paginatedResponse(blogs, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  let uploadedPublicId: string | null = null;

  try {
    const admin = await requireEditorOrAdmin(request);
    const contentType = request.headers.get("content-type") || "";

    let rawData: Record<string, any> = {};
    let imageFile: File | null = null;
    let existingImage: any = null;

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
      existingImage = rawData.featuredImage || rawData.image;
    }

    // Convert string booleans if from formData
    if (typeof rawData.featured === "string") {
      rawData.featured = rawData.featured === "true";
    }

    const validated = blogCreateSchema.parse(rawData);

    await connectDB();

    // Verify category exists
    const categoryExists = await Category.findById(validated.category);
    if (!categoryExists) {
      return errorResponse("Selected category does not exist", 400);
    }

    // Handle Image Upload
    let featuredImage: { url: string; publicId: string; alt: string };

    if (imageFile) {
      const validation = validateImageFile(imageFile);
      if (!validation.valid) {
        return errorResponse(validation.error || "Invalid image file", 400);
      }

      const uploadResult = await uploadImageToCloudinary(
        imageFile,
        "empirical-india/blogs"
      );
      uploadedPublicId = uploadResult.publicId;

      featuredImage = {
        url: uploadResult.secureUrl,
        publicId: uploadResult.publicId,
        alt: validated.alt || validated.title,
      };
    } else if (existingImage && existingImage.url && existingImage.publicId) {
      featuredImage = {
        url: existingImage.url,
        publicId: existingImage.publicId,
        alt: existingImage.alt || validated.alt || validated.title,
      };
    } else {
      return errorResponse("Featured image is required", 400);
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(
      Blog,
      validated.slug || validated.title
    );

    const publishedAt =
      validated.status === "published" ? new Date() : undefined;

    const blog = await Blog.create({
      title: validated.title,
      slug,
      excerpt: validated.excerpt,
      content: validated.content,
      featuredImage,
      category: validated.category,
      tags: validated.tags,
      author: admin.id,
      status: validated.status,
      featured: validated.featured,
      seo: {
        metaTitle: validated.metaTitle || validated.title,
        metaDescription: validated.metaDescription || validated.excerpt,
        keywords: validated.keywords,
      },
      publishedAt,
    });

    const populatedBlog = await Blog.findById(blog._id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    return successResponse(populatedBlog, 201);
  } catch (error) {
    // If DB fails after uploading to Cloudinary, clean up the orphan image
    if (uploadedPublicId) {
      await deleteImageFromCloudinary(uploadedPublicId).catch((delErr) =>
        console.error("Failed to cleanup Cloudinary image after error:", delErr)
      );
    }
    return handleApiError(error);
  }
}
