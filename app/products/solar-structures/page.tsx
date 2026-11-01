import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedCategoryPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

export async function generateMetadata() {
  return managedProductMetadata("solar-structures");
}

export default function CategoryPage() {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><ManagedCategoryPage slug="solar-structures" /></Suspense>;
}
