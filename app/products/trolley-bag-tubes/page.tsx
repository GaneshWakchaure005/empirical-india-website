import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedCategoryPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

export async function generateMetadata() {
  return managedProductMetadata("trolley-bag-tubes");
}

export default function CategoryPage() {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><ManagedCategoryPage slug="trolley-bag-tubes" /></Suspense>;
}
