import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import NewsEvent from "@/models/NewsEvent";
import { requireEditorOrAdmin } from "@/lib/auth";
import { successResponse, handleApiError } from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    await connectDB();

    const now = new Date();

    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalNews,
      totalEvents,
      publishedNews,
      upcomingEvents,
      featuredBlogs,
      featuredNewsEvents,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      NewsEvent.countDocuments({ type: "news" }),
      NewsEvent.countDocuments({ type: "event" }),
      NewsEvent.countDocuments({ type: "news", status: "published" }),
      NewsEvent.countDocuments({
        type: "event",
        status: "published",
        "eventDetails.startDate": { $gte: now },
      }),
      Blog.countDocuments({ featured: true }),
      NewsEvent.countDocuments({ featured: true }),
    ]);

    const stats = {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalNews,
      totalEvents,
      publishedNews,
      upcomingEvents,
      featuredPosts: featuredBlogs + featuredNewsEvents,
    };

    return successResponse(stats);
  } catch (error) {
    return handleApiError(error);
  }
}
