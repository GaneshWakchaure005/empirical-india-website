import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import "@/models/Admin";
import { paginatedResponse, handleApiError } from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const categoryParam = searchParams.get("category")?.trim();
    const tag = searchParams.get("tag")?.trim();
    const featured = searchParams.get("featured");
    const search = searchParams.get("search")?.trim();

    // STRICT: Only published content
    const query: any = { status: "published" };

    if (categoryParam) {
      if (mongoose.isValidObjectId(categoryParam)) {
        query.category = new mongoose.Types.ObjectId(categoryParam);
      } else {
        const cat = await Category.findOne({ slug: categoryParam, isActive: true }).select("_id");
        if (cat) {
          query.category = cat._id;
        } else {
          // If category slug doesn't exist, return empty result
          return paginatedResponse([], {
            page,
            limit,
            total: 0,
            totalPages: 1,
          });
        }
      }
    }

    if (tag) {
      query.tags = { $in: [tag] };
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
        .select("-__v")
        .populate("category", "name slug")
        .populate("author", "name") // only public author name
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    const formatted = blogs.map((blog: any) => ({
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
    }));

    const totalPages = Math.ceil(total / limit) || 1;

    return paginatedResponse(formatted, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
