import { connection } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import { productCategorySchema } from "@/lib/product-validation";

export async function getPublishedProducts() {
  await connection();
  await connectDB();
  const records = await ProductCategory.find({ status: "published" }).sort({ order: 1, name: 1 }).lean();
  return records.map((record) => productCategorySchema.parse(record));
}

export async function getProductCategory(slug: string) {
  await connection();
  await connectDB();
  const record = await ProductCategory.findOne({ slug, status: "published" }).lean();
  return record ? productCategorySchema.parse(record) : null;
}
