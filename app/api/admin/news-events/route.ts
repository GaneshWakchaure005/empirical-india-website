import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import NewsEvent from "@/models/NewsEvent";
import Category from "@/models/Category";
import { requireEditorOrAdmin } from "@/lib/auth";
import { newsEventCreateSchema } from "@/lib/validation";
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
    const type = searchParams.get("type")?.trim();
    const status = searchParams.get("status")?.trim();
    const category = searchParams.get("category")?.trim();
    const featured = searchParams.get("featured");
    const upcoming = searchParams.get("upcoming") === "true";
    const past = searchParams.get("past") === "true";

    const query: any = {};

    if (type === "news" || type === "event") {
      query.type = type;
    }

    if (status === "draft" || status === "published") {
      query.status = status;
    }

    if (category && mongoose.isValidObjectId(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    if (featured !== null && featured !== undefined && featured !== "") {
      query.featured = featured === "true";
    }

    if (upcoming) {
      query.type = "event";
      query["eventDetails.startDate"] = { $gte: new Date() };
    } else if (past) {
      query.type = "event";
      query["eventDetails.startDate"] = { $lt: new Date() };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      NewsEvent.find(query)
        .populate("category", "name slug")
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NewsEvent.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return paginatedResponse(items, {
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

    if (typeof rawData.featured === "string") {
      rawData.featured = rawData.featured === "true";
    }

    const validated = newsEventCreateSchema.parse(rawData);

    await connectDB();

    const categoryExists = await Category.findById(validated.category);
    if (!categoryExists) {
      return errorResponse("Selected category does not exist", 400);
    }

    // Image handling
    let featuredImage: { url: string; publicId: string; alt: string };

    if (imageFile) {
      const validation = validateImageFile(imageFile);
      if (!validation.valid) {
        return errorResponse(validation.error || "Invalid image file", 400);
      }

      const uploadResult = await uploadImageToCloudinary(
        imageFile,
        "empirical-india/news-events"
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

    // Unique slug
    const slug = await generateUniqueSlug(
      NewsEvent,
      validated.slug || validated.title
    );

    const publishedAt =
      validated.status === "published" ? new Date() : undefined;

    // Event details
    let eventDetails = undefined;
    if (validated.type === "event") {
      eventDetails = {
        startDate: validated.eventStartDate
          ? new Date(validated.eventStartDate)
          : undefined,
        endDate: validated.eventEndDate
          ? new Date(validated.eventEndDate)
          : undefined,
        location: validated.eventLocation || undefined,
        registrationUrl: validated.eventRegistrationUrl || undefined,
      };
    }

    const newsEvent = await NewsEvent.create({
      title: validated.title,
      slug,
      type: validated.type,
      excerpt: validated.excerpt,
      content: validated.content,
      featuredImage,
      category: validated.category,
      tags: validated.tags,
      author: admin.id,
      status: validated.status,
      featured: validated.featured,
      eventDetails,
      seo: {
        metaTitle: validated.metaTitle || validated.title,
        metaDescription: validated.metaDescription || validated.excerpt,
        keywords: validated.keywords,
      },
      publishedAt,
    });

    const populated = await NewsEvent.findById(newsEvent._id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    return successResponse(populated, 201);
  } catch (error) {
    if (uploadedPublicId) {
      await deleteImageFromCloudinary(uploadedPublicId).catch((delErr) =>
        console.error("Failed to cleanup Cloudinary image after error:", delErr)
      );
    }
    return handleApiError(error);
  }
}
