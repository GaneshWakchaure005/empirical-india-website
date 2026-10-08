import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import NewsEvent from "@/models/NewsEvent";
import Category from "@/models/Category";
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
    const type = searchParams.get("type")?.trim();
    const categoryParam = searchParams.get("category")?.trim();
    const tag = searchParams.get("tag")?.trim();
    const featured = searchParams.get("featured");
    const upcoming = searchParams.get("upcoming") === "true";
    const past = searchParams.get("past") === "true";
    const search = searchParams.get("search")?.trim();

    // STRICT: Only published content
    const query: any = { status: "published" };

    if (type === "news" || type === "event") {
      query.type = type;
    }

    if (categoryParam) {
      if (mongoose.isValidObjectId(categoryParam)) {
        query.category = new mongoose.Types.ObjectId(categoryParam);
      } else {
        const cat = await Category.findOne({ slug: categoryParam, isActive: true }).select("_id");
        if (cat) {
          query.category = cat._id;
        } else {
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
        .select("-__v")
        .populate("category", "name slug")
        .populate("author", "name")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NewsEvent.countDocuments(query),
    ]);

    const formatted = items.map((item: any) => ({
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
