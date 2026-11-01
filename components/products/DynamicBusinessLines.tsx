import BusinessLinesSection from "@/components/home/BusinessLinesSection";
import { getPublishedProducts } from "@/lib/products";

export default async function DynamicBusinessLines() {
  const categories = await getPublishedProducts();
  return <BusinessLinesSection products={categories.map((category) => ({
    name: category.name, slug: category.slug, headline: category.tagline,
    short_description: category.shortDescription, image: category.image, href: `/products/${category.slug}`,
    badge: `${category.children.length} Products`, overview: category.overview,
    types: category.children.map((child) => child.name), key_specs: category.keyBenefits,
  }))} />;
}
