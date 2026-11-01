import type { ManagedProductCategory } from "@/lib/product-validation";

export type ProductRecord = ManagedProductCategory & { _id: string };
export type CategorySummary = Pick<ProductRecord, "_id" | "name" | "slug" | "status" | "order" | "image"> & {
  children: Pick<ProductRecord["children"][number], "id" | "name" | "slug" | "image">[];
};
export type EditorTarget = { categoryId: string | null; productId?: string; addProduct?: boolean };

export function categorySummary(record: ProductRecord): CategorySummary {
  return { _id: record._id, name: record.name, slug: record.slug, status: record.status, order: record.order,
    image: record.image, children: record.children.map(({ id, name, slug, image }) => ({ id, name, slug, image })) };
}
