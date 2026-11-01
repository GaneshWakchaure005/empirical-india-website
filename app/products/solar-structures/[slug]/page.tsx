import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { ManagedProductPage, managedProductMetadata } from "@/components/products/ManagedProductPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return managedProductMetadata("solar-structures", (await params).slug);
}

async function Content({ params }: Props) {
  return <ManagedProductPage categorySlug="solar-structures" slug={(await params).slug} />;
}

export default function ProductPage(props: Props) {
  return <Suspense fallback={<ContentLoader kind="products" fullPage detail />}><Content {...props} /></Suspense>;
}
