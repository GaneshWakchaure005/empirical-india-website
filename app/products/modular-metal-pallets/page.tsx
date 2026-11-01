import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedCategoryPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

export async function generateMetadata() {
  return managedProductMetadata("modular-metal-pallets");
}

export default function CategoryPage() {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><ManagedCategoryPage slug="modular-metal-pallets" /></Suspense>;
}
