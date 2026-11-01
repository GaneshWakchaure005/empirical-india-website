import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedCategoryPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  return managedProductMetadata((await params).category);
}

async function Content({ params }: Props) {
  return <ManagedCategoryPage slug={(await params).category} />;
}

export default function CategoryPage(props: Props) {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><Content {...props} /></Suspense>;
}
