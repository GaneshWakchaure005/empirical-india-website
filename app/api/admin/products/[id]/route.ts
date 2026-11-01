import { NextRequest } from "next/server";
import { requireEditorOrAdmin } from "@/lib/auth";
import { objectIdSchema } from "@/lib/validation";
import { productCategorySchema } from "@/lib/product-validation";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  try {
    await requireEditorOrAdmin(request);
    const id = objectIdSchema.parse((await params).id);
    await connectDB();
    const record = await ProductCategory.findById(id).lean();
    return record ? successResponse(record) : errorResponse("Product category not found", 404);
  } catch (error) { return handleApiError(error); }
}

export async function PUT(request: NextRequest, { params }: Context) {
  try {
    await requireEditorOrAdmin(request);
    const id = objectIdSchema.parse((await params).id);
    const data = productCategorySchema.parse(await request.json());
    await connectDB();
    const existing = await ProductCategory.findById(id);
    if (!existing) return errorResponse("Product category not found", 404);
    if (existing.slug !== data.slug || existing.id !== data.id) return errorResponse("Category ID and URL slug cannot change. Create a new category and configure a redirect instead.", 409);
    for (const child of existing.children) {
      const replacement = data.children.find((product) => product.id === child.id);
      if (replacement && replacement.slug !== child.slug) return errorResponse("Existing product URL slugs cannot change. Create a new product and configure a redirect instead.", 409);
    }
    return successResponse(await ProductCategory.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true }));
  } catch (error) { return handleApiError(error); }
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    await requireEditorOrAdmin(request);
    const id = objectIdSchema.parse((await params).id);
    await connectDB();
    const record = await ProductCategory.findByIdAndDelete(id);
    return record ? successResponse({ deleted: true }) : errorResponse("Product category not found", 404);
  } catch (error) { return handleApiError(error); }
}
