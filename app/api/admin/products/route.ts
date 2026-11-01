import { NextRequest } from "next/server";
import { requireEditorOrAdmin } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { productCategorySchema } from "@/lib/product-validation";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    await connectDB();
    return successResponse(await ProductCategory.find().select("name slug status order image children.id children.name children.slug children.image").sort({ order: 1, name: 1 }).lean());
  } catch (error) { return handleApiError(error); }
}

export async function POST(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    const data = productCategorySchema.parse(await request.json());
    await connectDB();
    return successResponse(await ProductCategory.create(data), 201);
  } catch (error) { return handleApiError(error); }
}
