import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedCategoryPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

export async function generateMetadata() {
  return managedProductMetadata("roll-forming-lines");
}

export default function CategoryPage() {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><ManagedCategoryPage slug="roll-forming-lines" /></Suspense>;
}
