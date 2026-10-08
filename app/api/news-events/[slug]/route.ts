import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import NewsEvent from "@/models/NewsEvent";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";


interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      return errorResponse("Slug is required", 400);
    }

    await connectDB();

    // STRICT: Only published news/event
    const item: any = await NewsEvent.findOne({ slug, status: "published" })
      .populate("category", "name slug")
      .populate("author", "name")
      .lean();

    if (!item) {
      return errorResponse("News or Event item not found", 404);
    }

    const formatted = {
      id: item._id.toString(),
      title: item.title,
      slug: item.slug,
      type: item.type,
      excerpt: item.excerpt,
      content: item.content,
      featuredImage: item.featuredImage,
      category: item.category
        ? {
            id: item.category._id?.toString(),
            name: item.category.name,
            slug: item.category.slug,
          }
        : null,
      tags: item.tags || [],
      author: item.author ? { name: item.author.name } : undefined,
      featured: item.featured,
      eventDetails: item.eventDetails,
      seo: item.seo,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
    };

    return successResponse(formatted);
  } catch (error) {
    return handleApiError(error);
  }
}
