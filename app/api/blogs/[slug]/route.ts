import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";


interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      return errorResponse("Blog slug is required", 400);
    }

    await connectDB();

    // STRICT: Only published blog
    const blog: any = await Blog.findOne({ slug, status: "published" })
      .populate("category", "name slug")
      .populate("author", "name")
      .lean();

    if (!blog) {
      return errorResponse("Blog not found", 404);
    }

    const formatted = {
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: blog.category
        ? {
            id: blog.category._id?.toString(),
            name: blog.category.name,
            slug: blog.category.slug,
          }
        : null,
      tags: blog.tags || [],
      author: blog.author ? { name: blog.author.name } : undefined,
      featured: blog.featured,
      seo: blog.seo,
      publishedAt: blog.publishedAt,
      createdAt: blog.createdAt,
    };

    return successResponse(formatted);
  } catch (error) {
    return handleApiError(error);
  }
}
