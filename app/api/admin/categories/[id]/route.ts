import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Blog from "@/models/Blog";
import NewsEvent from "@/models/NewsEvent";
import { requireEditorOrAdmin, requireAdmin } from "@/lib/auth";
import { categoryUpdateSchema, objectIdSchema } from "@/lib/validation";
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
    const category = await Category.findById(id).lean();

    if (!category) {
      return errorResponse("Category not found", 404);
    }

    return successResponse(category);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    const body = await request.json();
    const validated = categoryUpdateSchema.parse(body);

    await connectDB();
    const category = await Category.findById(id);

    if (!category) {
      return errorResponse("Category not found", 404);
    }

    if (validated.name && !validated.slug && validated.name !== category.name) {
      category.slug = await generateUniqueSlug(
        Category,
        validated.name,
        category._id,
        category.slug
      );
    } else if (validated.slug) {
      category.slug = await generateUniqueSlug(
        Category,
        validated.slug,
        category._id
      );
    }

    if (validated.name !== undefined) category.name = validated.name;
    if (validated.description !== undefined) category.description = validated.description;
    if (validated.type !== undefined) category.type = validated.type;
    if (validated.isActive !== undefined) category.isActive = validated.isActive;

    await category.save();

    return successResponse(category);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Requires admin privileges to delete categories
    await requireAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const categoryId = new mongoose.Types.ObjectId(id);

    // Check if referenced by Blogs
    const blogCount = await Blog.countDocuments({ category: categoryId });
    if (blogCount > 0) {
      return errorResponse(
        "Category cannot be deleted because it is currently being used.",
        409
      );
    }

    // Check if referenced by News or Events
    const newsEventCount = await NewsEvent.countDocuments({
      category: categoryId,
    });
    if (newsEventCount > 0) {
      return errorResponse(
        "Category cannot be deleted because it is currently being used.",
        409
      );
    }

    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) {
      return errorResponse("Category not found", 404);
    }

    return successResponse({
      message: "Category deleted successfully",
      id: deleted._id.toString(),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
