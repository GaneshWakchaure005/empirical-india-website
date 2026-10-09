import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { requireEditorOrAdmin } from "@/lib/auth";
import { categoryCreateSchema } from "@/lib/validation";
import { generateUniqueSlug } from "@/lib/slug";
import { successResponse, handleApiError } from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const activeOnly = searchParams.get("active") === "true";

    const query: any = {};
    if (type) {
      const types = type.split(",").map((t) => t.trim()).filter(Boolean);
      if (types.length === 1) {
        query.type = types[0];
      } else if (types.length > 1) {
        query.type = { $in: types };
      }
    }
    if (activeOnly) query.isActive = true;

    const categories = await Category.find(query).sort({ name: 1, createdAt: -1 }).lean();

    // Deduplicate by normalized name (case-insensitive)
    const seen = new Set<string>();
    const uniqueCategories = [];
    for (const cat of categories) {
      const norm = (cat.name || "").trim().toLowerCase();
      if (norm && !seen.has(norm)) {
        seen.add(norm);
        uniqueCategories.push(cat);
      }
    }

    return successResponse(uniqueCategories);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    const body = await request.json();
    const validated = categoryCreateSchema.parse(body);

    await connectDB();

    // Check if category with this name already exists (case-insensitive)
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${validated.name.trim()}$`, "i") },
    });
    if (existing) {
      return successResponse(existing, 200);
    }

    const slug = await generateUniqueSlug(
      Category,
      validated.slug || validated.name
    );

    const category = await Category.create({
      ...validated,
      name: validated.name.trim(),
      slug,
    });

    return successResponse(category, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
