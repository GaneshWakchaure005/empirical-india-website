import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductCategory } from "@/lib/products";
import { productUI as ui } from "@/data/product-ui";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { siteSEO } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";

function Visual({ image, alt, priority = false }: { image: string; alt: string; priority?: boolean }) {
  if (!image || image === "null") return null;
  return <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100"><Image src={image} alt={alt} fill priority={priority} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{title}</h2><ul className="grid gap-3 sm:grid-cols-2">{items.map((item, index) => <li key={index} className="rounded-xl border border-slate-200 bg-white p-4">{item}</li>)}</ul></section>;
}

export async function managedProductMetadata(categorySlug: string, productSlug?: string): Promise<Metadata> {
  const category = await getProductCategory(categorySlug);
  const record = productSlug ? category?.children.find((child) => child.slug === productSlug) : category;
  if (!record) return { title: "Product not found", robots: { index: false } };
  const canonical = `/products/${categorySlug}${productSlug ? `/${productSlug}` : ""}`;
  const businessSEO = !productSlug ? siteSEO.productPages[categorySlug] : undefined;
  return pageMetadata({ title: businessSEO?.title || record.seo.title || `${record.name} in Nashik, India`,
    description: businessSEO?.description || record.seo.description || record.shortDescription,
    keywords: record.seo.keywords, path: canonical,
    image: record.image && record.image !== "null" ? record.image : undefined });
}

export async function ManagedCategoryPage({ slug }: { slug: string }) {
  const category = await getProductCategory(slug);
  if (!category) notFound();
  return <article className="mx-auto max-w-7xl space-y-12 px-4 pb-20 pt-28 sm:px-8">
    <JsonLd data={breadcrumbSchema([{ name: siteSEO.breadcrumbs.home, path: "/" }, { name: ui.products, path: "/products" }, { name: category.name, path: `/products/${slug}` }])} />
    <Link href="/products" className="text-sm text-navy-700">{ui.products}</Link>
    <header className="grid items-center gap-8 lg:grid-cols-2"><div className="space-y-5"><h1 className="text-4xl font-bold text-navy-900 sm:text-5xl">{siteSEO.productHeadings[slug] || category.name}</h1><p className="text-xl text-navy-700">{category.tagline}</p><p className="whitespace-pre-line leading-7">{category.description}</p><p className="text-sm text-slate-600">{siteSEO.productLocation}</p><Link className="inline-block rounded-xl bg-navy-900 px-6 py-3 text-white" href={`/contact?product=${slug}`}>{category.enquiryTitle || ui.enquiry}</Link></div><Visual image={category.heroImage || category.image} alt={category.imageAlt || category.name} priority /></header>
    {category.overview && <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.overview}</h2><p className="whitespace-pre-line leading-7">{category.overview}</p></section>}
    {category.children.length > 0 && <section className="space-y-6"><h2 className="text-2xl font-bold text-navy-900">{ui.range}</h2><ProductRangeGrid products={category.children} categorySlug={slug} /></section>}
    <List title={ui.benefits} items={category.keyBenefits} /><List title={ui.capabilities} items={category.manufacturingCapabilities} /><List title={ui.industries} items={category.industries} />
    {category.faqs.length > 0 && <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.faq}</h2>{category.faqs.map((faq, index) => <details key={index} className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 whitespace-pre-line">{faq.answer}</p></details>)}</section>}
    <Gallery images={category.gallery} name={category.name} />
    <section className="space-y-4 rounded-2xl bg-slate-100 p-8"><h2 className="text-2xl font-bold">{category.enquiryTitle || ui.enquiry}</h2><p>{category.enquiryDescription}</p><Link className="inline-block rounded-xl bg-navy-900 px-6 py-3 text-white" href={`/contact?product=${slug}`}>{ui.enquiry}</Link></section>
  </article>;
}

function Gallery({ images, name }: { images: string[]; name: string }) {
  if (!images.some((image) => image && image !== "null")) return null;
  return <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.gallery}</h2><div className="grid gap-4 sm:grid-cols-2">{images.map((image, index) => <Visual key={index} image={image} alt={`${name} — ${index + 1}`} />)}</div></section>;
}

export async function ManagedProductPage({ categorySlug, slug }: { categorySlug: string; slug: string }) {
  const category = await getProductCategory(categorySlug);
  const product = category?.children.find((child) => child.slug === slug);
  if (!category || !product) notFound();
  return <article className="mx-auto max-w-7xl space-y-12 px-4 pb-20 pt-28 sm:px-8">
    <JsonLd data={breadcrumbSchema([{ name: siteSEO.breadcrumbs.home, path: "/" }, { name: ui.products, path: "/products" }, { name: category.name, path: `/products/${categorySlug}` }, { name: product.name, path: `/products/${categorySlug}/${slug}` }])} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.shortDescription || product.description,
      url: absoluteUrl(`/products/${categorySlug}/${slug}`), ...(product.image && product.image !== "null" ? { image: product.image } : {}), manufacturer: { "@id": absoluteUrl("/#organization") } }} />
    <Link href={`/products/${categorySlug}`} className="text-sm text-navy-700">{ui.back}: {category.name}</Link>
    <header className="grid items-center gap-8 lg:grid-cols-2"><div className="space-y-5"><h1 className="text-4xl font-bold text-navy-900 sm:text-5xl">{product.name}</h1><p className="whitespace-pre-line leading-7">{product.description}</p><p className="text-sm text-slate-600">{siteSEO.productLocation}</p><Link className="inline-block rounded-xl bg-navy-900 px-6 py-3 text-white" href={`/contact?product=${categorySlug}&module=${slug}`}>{product.enquiryTitle || ui.enquiry}</Link></div><Visual image={product.image} alt={product.imageAlt || product.name} priority /></header>
    <List title={ui.highlights} items={product.highlights} />
    {product.features.length > 0 && <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.features}</h2>{product.features.map((feature, index) => <div key={index}><h3 className="font-bold">{feature.title}</h3><p>{feature.description}</p></div>)}</section>}
    {product.specifications.length > 0 && <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.specifications}</h2><dl className="divide-y rounded-xl border p-4">{product.specifications.map((specification, index) => <div key={index} className="grid gap-2 py-3 sm:grid-cols-2"><dt className="font-semibold">{specification.label}</dt><dd>{specification.value}</dd></div>)}</dl></section>}
    {product.applications.length > 0 && <section className="space-y-4"><h2 className="text-2xl font-bold text-navy-900">{ui.applications}</h2>{product.applications.map((application, index) => <div key={index}><h3 className="font-bold">{application.title}</h3><p>{application.description}</p></div>)}</section>}
    <List title={ui.customization} items={product.customizationOptions} /><Gallery images={product.gallery} name={product.name} />
  </article>;
}
