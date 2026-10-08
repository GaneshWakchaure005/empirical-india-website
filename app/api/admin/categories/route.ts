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
    if (type) query.type = type;
    if (activeOnly) query.isActive = true;

    const categories = await Category.find(query).sort({ name: 1 }).lean();

    return successResponse(categories);
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

    const slug = await generateUniqueSlug(
      Category,
      validated.slug || validated.name
    );

    const category = await Category.create({
      ...validated,
      slug,
    });

    return successResponse(category, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
