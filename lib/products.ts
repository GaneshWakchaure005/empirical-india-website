import { connection } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { productCategorySchema } from "@/lib/product-validation";
import { cache } from "react";

export async function getPublishedProducts({ fallbackOnError = false } = {}) {
  // Keep Next.js prerender control flow outside the database-error fallback.
  await connection();
  try {
    await connectDB();
    const records = await ProductCategory.find({ status: "published" }).sort({ order: 1, name: 1 }).lean();
    return records.map((record) => productCategorySchema.parse(record));
  } catch (error) {
    if (!fallbackOnError) throw error;
    console.error("Failed to load published products from database:", error);
    return [];
  }
}

export const getProductCategory = cache(async (slug: string) => {
  await connection();
  await connectDB();
  const record = await ProductCategory.findOne({ slug, status: "published" }).lean();
  return record ? productCategorySchema.parse(record) : null;
});
