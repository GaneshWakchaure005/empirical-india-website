import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsEvent from "@/models/NewsEvent";
import Category from "@/models/Category";
import { requireEditorOrAdmin } from "@/lib/auth";
import { newsEventUpdateSchema, objectIdSchema } from "@/lib/validation";
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


interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const item = await NewsEvent.findById(id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    if (!item) {
      return errorResponse("News or Event item not found", 404);
    }

    return successResponse(item);
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
    const item = await NewsEvent.findById(id);

    if (!item) {
      return errorResponse("News or Event item not found", 404);
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

    const validated = newsEventUpdateSchema.parse(rawData);

    if (validated.category) {
      const catExists = await Category.findById(validated.category);
      if (!catExists) {
        return errorResponse("Category not found", 400);
      }
      item.category = validated.category as any;
    }

    if (validated.slug) {
      item.slug = await generateUniqueSlug(NewsEvent, validated.slug, item._id);
    }

    if (validated.title !== undefined) item.title = validated.title;
    if (validated.type !== undefined) item.type = validated.type;
    if (validated.excerpt !== undefined) item.excerpt = validated.excerpt;
    if (validated.content !== undefined) item.content = validated.content;
    if (validated.tags !== undefined) item.tags = validated.tags;
    if (validated.featured !== undefined) item.featured = validated.featured;

    // Status & Publishing logic
    if (validated.status !== undefined) {
      if (validated.status === "published" && item.status !== "published") {
        item.publishedAt = new Date();
      }
      item.status = validated.status;
    }

    // Event details
    if (item.type === "event" || validated.type === "event") {
      if (!item.eventDetails) {
        item.eventDetails = {};
      }
      if (validated.eventStartDate !== undefined) {
        item.eventDetails.startDate = validated.eventStartDate
          ? new Date(validated.eventStartDate)
          : undefined;
      }
      if (validated.eventEndDate !== undefined) {
        item.eventDetails.endDate = validated.eventEndDate
          ? new Date(validated.eventEndDate)
          : undefined;
      }
      if (validated.eventLocation !== undefined) {
        item.eventDetails.location = validated.eventLocation;
      }
      if (validated.eventRegistrationUrl !== undefined) {
        item.eventDetails.registrationUrl = validated.eventRegistrationUrl;
      }
    }

    // SEO updates
    if (!item.seo) {
      item.seo = { metaTitle: "", metaDescription: "", keywords: [] };
    }
    if (validated.metaTitle !== undefined) item.seo.metaTitle = validated.metaTitle;
    if (validated.metaDescription !== undefined) item.seo.metaDescription = validated.metaDescription;
    if (validated.keywords !== undefined) item.seo.keywords = validated.keywords;

    if (validated.alt !== undefined && item.featuredImage) {
      item.featuredImage.alt = validated.alt;
    }

    const oldPublicId = item.featuredImage?.publicId;

    if (imageFile) {
      const validation = validateImageFile(imageFile);
      if (!validation.valid) {
        return errorResponse(validation.error || "Invalid image file", 400);
      }

      const uploadResult = await uploadImageToCloudinary(
        imageFile,
        "empirical-india/news-events"
      );
      newUploadedPublicId = uploadResult.publicId;

      item.featuredImage = {
        url: uploadResult.secureUrl,
        publicId: uploadResult.publicId,
        alt: validated.alt || item.featuredImage?.alt || item.title,
      };
    }

    await item.save();

    if (newUploadedPublicId && oldPublicId && oldPublicId !== newUploadedPublicId) {
      deleteImageFromCloudinary(oldPublicId).catch((err) =>
        console.error("Failed to delete old Cloudinary image:", err)
      );
    }

    const updated = await NewsEvent.findById(item._id)
      .populate("category", "name slug")
      .populate("author", "name email")
      .lean();

    return successResponse(updated);
  } catch (error) {
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
    const item = await NewsEvent.findById(id);

    if (!item) {
      return errorResponse("News or Event item not found", 404);
    }

    const publicId = item.featuredImage?.publicId;

    await NewsEvent.findByIdAndDelete(id);

    if (publicId) {
      await deleteImageFromCloudinary(publicId).catch((err) =>
        console.error("Failed to delete Cloudinary image upon item deletion:", err)
      );
    }

    return successResponse({
      message: "Item deleted successfully",
      id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
