import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedProductPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  return managedProductMetadata(category, slug);
}

async function Content({ params }: Props) {
  const { category, slug } = await params;
  return <ManagedProductPage categorySlug={category} slug={slug} />;
}

export default function ProductPage(props: Props) {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><Content {...props} /></Suspense>;
}
