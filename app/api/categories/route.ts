import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { successResponse, handleApiError } from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const query: any = { isActive: true };
    if (type && ["blog", "news", "event", "general"].includes(type)) {
      query.type = type;
    }

    const categories = await Category.find(query)
      .select("name slug type description")
      .sort({ name: 1, createdAt: -1 })
      .lean();

    const seen = new Set<string>();
    const formatted = [];
    for (const c of categories as any[]) {
      const norm = (c.name || "").trim().toLowerCase();
      if (norm && !seen.has(norm)) {
        seen.add(norm);
        formatted.push({
          id: c._id.toString(),
          name: c.name,
          slug: c.slug,
          type: c.type,
          description: c.description || "",
        });
      }
    }

    return successResponse(formatted);
  } catch (error) {
    return handleApiError(error);
  }
}
