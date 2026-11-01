import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  FileText,
  UploadCloud,
  Factory,
  Cpu,
  Layers3,
  Package,
  Box,
  Sun,
  Settings,
  Sliders,
  Building2,
  MapPin,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { getProductCategory } from "@/lib/products";
import { productUI as ui } from "@/data/product-ui";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import TechnicalPlaceholder from "@/components/products/TechnicalPlaceholder";
import FAQAccordion from "@/components/products/FAQAccordion";
import { absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { siteSEO } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";

// Helper to pick category icon
function getCategoryIcon(slug: string): LucideIcon {
  if (slug.includes("roll-forming")) return Cpu;
  if (slug.includes("pallet")) return Package;
  if (slug.includes("tube")) return Box;
  if (slug.includes("solar")) return Sun;
  return Layers3;
}

// Visual Media Showcase with blueprint styling & corner brackets
function VisualShowcase({
  image,
  alt,
  categorySlug,
  badge,
  priority = false,
}: {
  image?: string | null;
  alt: string;
  categorySlug: string;
  badge?: string;
  priority?: boolean;
}) {
  const Icon = getCategoryIcon(categorySlug);
  const hasImage = typeof image === "string" && image.trim() !== "" && image !== "null";

  return (
    <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl group">
      {hasImage ? (
        <>
          <Image
            src={image!}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        <TechnicalPlaceholder
          image={image}
          alt={alt}
          category={badge || "Manufacturing System"}
          className="h-full w-full"
          priority={priority}
        />
      )}

      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Technical corner brackets */}
      <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" aria-hidden="true" />
      <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60" aria-hidden="true" />

      {/* Bottom overlay badge */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md font-semibold tracking-wide text-cyan-300">
          <Icon size={13} />
          <span>{badge || "Verified Engineering Spec"}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-slate-800">
          Drawing-Verified
        </span>
      </div>
    </div>
  );
}

// Elevated Rich List Component with Icons & Responsive Cards
function RichList({
  title,
  items,
  type = "default",
}: {
  title: string;
  items: string[];
  type?: "benefits" | "capabilities" | "industries" | "customization" | "highlights" | "default";
}) {
  if (!items || items.length === 0) return null;

  const iconConfig = {
    benefits: { icon: CheckCircle2, iconClass: "text-emerald-600", bgClass: "bg-emerald-50 border-emerald-100", label: "KEY ADVANTAGES" },
    capabilities: { icon: Settings, iconClass: "text-navy-700", bgClass: "bg-navy-50 border-navy-100", label: "PLANT INFRASTRUCTURE" },
    industries: { icon: Building2, iconClass: "text-navy-700", bgClass: "bg-navy-50 border-navy-100", label: "SECTOR DEPLOYMENTS" },
    customization: { icon: Sliders, iconClass: "text-blue-600", bgClass: "bg-blue-50 border-blue-100", label: "BESPOKE ENGINEERING" },
    highlights: { icon: CheckCircle2, iconClass: "text-emerald-600", bgClass: "bg-emerald-50 border-emerald-100", label: "SPECIFICATION HIGHLIGHTS" },
    default: { icon: CheckCircle2, iconClass: "text-navy-700", bgClass: "bg-slate-50 border-slate-200", label: "VERIFIED DETAILS" },
  }[type];

  const Icon = iconConfig.icon;

  return (
    <section className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Icon size={12} className={iconConfig.iconClass} />
            <span>{iconConfig.label}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
            {title}
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-500 tabular-nums">
          {items.length} items verified
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-navy-300 transition-all duration-200"
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border ${iconConfig.bgClass}`}
              aria-hidden="true"
            >
              <Icon size={15} className={iconConfig.iconClass} />
            </span>
            <span className="text-sm font-medium leading-relaxed text-steel-700">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Technical Specifications Table Component
function TechnicalSpecificationsTable({
  specifications,
  categorySlug,
  slug,
}: {
  specifications: { label: string; value: string }[];
  categorySlug: string;
  slug: string;
}) {
  if (!specifications || specifications.length === 0) return null;

  return (
    <section id="specifications" className="space-y-6 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileSpreadsheet size={12} className="text-navy-700" />
            <span>ENGINEERING DATA SHEET</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
            {ui.specifications}
          </h2>
          <p className="mt-1 text-sm text-steel-500 max-w-2xl">
            Baseline parameters configured for this equipment module. Tooling dimensions, forming passes, and drives are tailored to approved customer drawing specifications.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:px-6 sm:py-4 transition-colors hover:bg-slate-50/80 odd:bg-white even:bg-slate-50/40"
            >
              <dt className="flex items-center gap-2 text-sm font-bold text-steel-900 sm:w-1/2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-600 shrink-0" />
                <span>{spec.label}</span>
              </dt>
              <dd className="sm:w-1/2 sm:text-right">
                <span className="inline-block rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-mono font-semibold text-navy-800 shadow-2xs">
                  {spec.value}
                </span>
              </dd>
            </div>
          ))}
        </div>

        {/* Feasibility CTA note at bottom of table */}
        <div className="border-t border-slate-200 bg-slate-50/90 p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-steel-600">
            <strong>Require custom tolerances or non-standard dimensions?</strong> Share your 2D/3D drawing for a rapid engineering review.
          </p>
          <Link
            href={`/contact?product=${categorySlug}&module=${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 hover:text-navy-900 whitespace-nowrap"
          >
            <span>Submit Drawing for Review</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection({
  features,
}: {
  features: { title: string; description: string }[];
}) {
  if (!features || features.length === 0) return null;

  return (
    <section className="space-y-6 pt-4">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Cpu size={12} className="text-navy-700" />
          <span>MECHANICAL ATTRIBUTES</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
          {ui.features}
        </h2>
        <p className="mt-1 text-sm text-steel-500 max-w-2xl">
          Engineered for continuous production uptime, precise roll alignment, and rapid tooling changeovers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:shadow-md hover:border-navy-300 transition-all duration-200 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy-50 border border-navy-100 text-navy-700 text-xs font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-steel-900">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-steel-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Applications Section Component
function ApplicationsSection({
  applications,
}: {
  applications: { title: string; description: string }[];
}) {
  if (!applications || applications.length === 0) return null;

  return (
    <section className="space-y-6 pt-4">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Factory size={12} className="text-navy-700" />
          <span>DEPLOYMENT USE CASES</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
          {ui.applications}
        </h2>
        <p className="mt-1 text-sm text-steel-500 max-w-2xl">
          Verified production use cases where this equipment module and formed profiles operate reliably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {applications.map((app, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs hover:shadow-md hover:border-navy-300 transition-all duration-200 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-navy-700 text-xs">
                <Building2 size={16} />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-steel-900">
                {app.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-steel-600">
              {app.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Visual Gallery Section Component
function GallerySection({ images, name }: { images: string[]; name: string }) {
  const validImages = images.filter((img) => img && img !== "null" && img.trim() !== "");
  if (validImages.length === 0) return null;

  return (
    <section className="space-y-6 pt-4">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers size={12} className="text-navy-700" />
          <span>VISUAL DOCUMENTATION</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
          {ui.gallery}
        </h2>
        <p className="mt-1 text-sm text-steel-500 max-w-2xl">
          Photographic and engineering documentation from our Nashik manufacturing bays and trial runs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {validImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 border border-slate-200 shadow-sm"
          >
            <Image
              src={image}
              alt={`${name} — Engineering visual ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium truncate">
              {name} — Visual {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Clean, compact RFQ Card
function ProductEnquiryCTA({
  title,
  description,
  enquiryHref,
  productName,
}: {
  title?: string;
  description?: string;
  enquiryHref: string;
  productName: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-hidden relative">
      {/* Subtle navy left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-navy-700 rounded-l-2xl" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: text content */}
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <UploadCloud size={11} />
            <span>Request a Quote</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-steel-900 leading-snug">
            {title || `Discuss your ${productName} requirement`}
          </h2>
          <p className="mt-1.5 text-sm text-steel-600 leading-relaxed max-w-xl">
            {description || "Share your drawings, dimensions, or specifications. Our Nashik engineering team will review and respond."}
          </p>

          {/* Trust row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-steel-500">
            <span className="inline-flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-600" />NDA Protected</span>
            <span className="inline-flex items-center gap-1"><FileSpreadsheet size={12} className="text-navy-700" />DWG, STEP, PDF accepted</span>
            <span className="inline-flex items-center gap-1"><MapPin size={12} className="text-navy-700" />Nashik facility</span>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex flex-col gap-2.5 shrink-0 sm:min-w-[180px]">
          <Link
            href={enquiryHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-all shadow-sm active:scale-98"
          >
            <span>Submit RFQ</span>
            <ArrowRight size={15} />
          </Link>
          <a
            href="mailto:sales@empiricalindia.com"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-steel-200 hover:border-navy-300 hover:bg-slate-50 text-steel-700 font-semibold text-sm transition-all"
          >
            <Mail size={14} className="text-navy-700" />
            <span>sales@empiricalindia.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Metadata Generator
export async function managedProductMetadata(categorySlug: string, productSlug?: string): Promise<Metadata> {
  const category = await getProductCategory(categorySlug);
  const record = productSlug ? category?.children.find((child) => child.slug === productSlug) : category;
  if (!record) return { title: "Product not found", robots: { index: false } };
  const canonical = `/products/${categorySlug}${productSlug ? `/${productSlug}` : ""}`;
  const businessSEO = !productSlug ? siteSEO.productPages[categorySlug] : undefined;
  return pageMetadata({
    title: businessSEO?.title || record.seo.title || `${record.name} in Nashik, India`,
    description: businessSEO?.description || record.seo.description || record.shortDescription,
    keywords: record.seo.keywords,
    path: canonical,
    image: record.image && record.image !== "null" ? record.image : undefined,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MANAGED CATEGORY PAGE (e.g. /products/roll-forming-lines)
// ─────────────────────────────────────────────────────────────────────────────
export async function ManagedCategoryPage({ slug }: { slug: string }) {
  const category = await getProductCategory(slug);
  if (!category) notFound();

  const CategoryIcon = getCategoryIcon(slug);
  const enquiryHref = `/contact?product=${slug}`;

  return (
    <article className="flex flex-col w-full">
      {/* Schema.org Structured Data */}
      <JsonLd
        data={breadcrumbSchema([
          { name: siteSEO.breadcrumbs.home, path: "/" },
          { name: ui.products, path: "/products" },
          { name: category.name, path: `/products/${slug}` },
        ])}
      />

      {/* ── 1. Category Hero Banner ────────────────────────────────────────── */}
      <header className="relative bg-[#f8fafc] pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-steel-200/80 overflow-hidden">
        {/* Background blueprint grid watermark */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-steel-500 mb-6"
          >
            <Link
              href="/"
              className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
            <Link
              href="/products"
              className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {ui.products}
            </Link>
            <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
            <span className="text-navy-900 font-bold" aria-current="page">
              {category.name}
            </span>
          </nav>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
              <CategoryIcon size={13} />
              <span>MANUFACTURING VERTICAL</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
              <Factory className="w-3.5 h-3.5 text-navy-700 shrink-0" />
              <span>Nashik Plant Manufacturing</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-navy-700 shrink-0" />
              <span>CAD &amp; Drawing Verified</span>
            </div>
          </div>

          {/* Grid: 7 cols Info, 5 cols Visual Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.12]">
                {siteSEO.productHeadings[slug] || category.name}
              </h1>

              {category.tagline && (
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-navy-700 leading-snug">
                  {category.tagline}
                </p>
              )}

              <p className="whitespace-pre-line text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Location Tag */}
              <div className="flex items-center gap-1.5 text-xs text-steel-500 font-medium pt-1">
                <MapPin size={14} className="text-navy-700 shrink-0" />
                <span>{siteSEO.productLocation}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={enquiryHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-all shadow-md active:scale-98"
                >
                  <span>{category.enquiryTitle || ui.enquiry}</span>
                  <ArrowRight size={16} />
                </Link>

                {category.children.length > 0 && (
                  <a
                    href="#category-range"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-steel-50 text-steel-800 font-semibold text-sm border border-steel-200 transition-all shadow-2xs"
                  >
                    <Layers3 size={16} className="text-navy-700" />
                    <span>Explore {category.children.length} Line Modules</span>
                  </a>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-steel-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Profile Feasibility Guaranteed</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Factory Acceptance Trials</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Direct Tooling Support</span>
                </span>
              </div>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-5 w-full">
              <VisualShowcase
                image={category.heroImage || category.image}
                alt={category.imageAlt || category.name}
                categorySlug={slug}
                badge={category.name}
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Main Page Content ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Executive Overview */}
        {category.overview && (
          <section className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 sm:p-8 lg:p-10 shadow-2xs">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-navy-700" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Cpu size={12} className="text-navy-700" />
                <span>{ui.overview}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-steel-900 tracking-tight mb-4">
                Engineering Mandate &amp; Operational Architecture
              </h2>
              <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-steel-700 max-w-4xl">
                {category.overview}
              </p>
            </div>
          </section>
        )}

        {/* Configurable Range of Modules / Products */}
        {category.children.length > 0 && (
          <section id="category-range" className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Layers3 size={12} className="text-navy-700" />
                  <span>MANUFACTURING SCOPE</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
                  {ui.range} ({category.children.length} Equipment Modules)
                </h2>
                <p className="mt-1 text-sm text-steel-500 max-w-2xl">
                  Configurable equipment units engineered to integrate seamlessly into complete production lines or stand-alone forming operations.
                </p>
              </div>
            </div>

            <ProductRangeGrid products={category.children} categorySlug={slug} />
          </section>
        )}

        {/* Key Benefits */}
        <RichList title={ui.benefits} items={category.keyBenefits} type="benefits" />

        {/* Manufacturing Capabilities */}
        <RichList title={ui.capabilities} items={category.manufacturingCapabilities} type="capabilities" />

        {/* Applications & Industries */}
        <RichList title={ui.industries} items={category.industries} type="industries" />

        {/* Technical FAQs with interactive accordion */}
        {category.faqs.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <HelpCircle size={12} className="text-navy-700" />
                  <span>TECHNICAL CLARIFICATIONS</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
                  {ui.faq}
                </h2>
                <p className="mt-2 text-sm text-steel-600 leading-relaxed">
                  Clear engineering answers regarding roll-pass design, raw material compatibility, and factory trial verification.
                </p>

                <div className="mt-6 rounded-2xl border border-steel-200 bg-white p-5 shadow-2xs">
                  <p className="text-xs font-bold text-steel-900 mb-1">
                    Have a non-standard project question?
                  </p>
                  <p className="text-xs text-steel-500 mb-3">
                    Our Nashik application engineers are available for drawing reviews.
                  </p>
                  <Link
                    href={`/contact?product=${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-700 hover:text-navy-900"
                  >
                    <span>Contact Engineering Desk</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8">
                <FAQAccordion faqs={category.faqs} />
              </div>
            </div>
          </section>
        )}

        {/* Visual Gallery */}
        <GallerySection images={category.gallery} name={category.name} />

        {/* Final Conversion RFQ Banner */}
        <ProductEnquiryCTA
          title={category.enquiryTitle || `Discuss Your ${category.name} Project`}
          description={category.enquiryDescription}
          enquiryHref={enquiryHref}
          productName={category.name}
        />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MANAGED PRODUCT DETAIL PAGE (e.g. /products/roll-forming-lines/[slug])
// ─────────────────────────────────────────────────────────────────────────────
export async function ManagedProductPage({ categorySlug, slug }: { categorySlug: string; slug: string }) {
  const category = await getProductCategory(categorySlug);
  const product = category?.children.find((child) => child.slug === slug);
  if (!category || !product) notFound();

  const CategoryIcon = getCategoryIcon(categorySlug);
  const enquiryHref = `/contact?product=${categorySlug}&module=${slug}`;

  return (
    <article className="flex flex-col w-full">
      {/* Schema.org Structured Data */}
      <JsonLd
        data={breadcrumbSchema([
          { name: siteSEO.breadcrumbs.home, path: "/" },
          { name: ui.products, path: "/products" },
          { name: category.name, path: `/products/${categorySlug}` },
          { name: product.name, path: `/products/${categorySlug}/${slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription || product.description,
          url: absoluteUrl(`/products/${categorySlug}/${slug}`),
          ...(product.image && product.image !== "null" ? { image: product.image } : {}),
          manufacturer: { "@id": absoluteUrl("/#organization") },
        }}
      />

      {/* ── 1. Product Detail Hero Banner ─────────────────────────────────── */}
      <header className="relative bg-[#f8fafc] pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-steel-200/80 overflow-hidden">
        {/* Blueprint radial watermark */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--navy-900) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation with Back Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs font-medium text-steel-500"
            >
              <Link
                href="/"
                className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Home
              </Link>
              <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
              <Link
                href="/products"
                className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
              >
                {ui.products}
              </Link>
              <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
              <Link
                href={`/products/${categorySlug}`}
                className="hover:text-navy-700 transition-colors focus-visible:outline-none focus-visible:underline"
              >
                {category.name}
              </Link>
              <ChevronRight size={13} className="text-steel-400" aria-hidden="true" />
              <span className="text-navy-900 font-bold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {product.name}
              </span>
            </nav>

            <Link
              href={`/products/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-navy-900 transition-colors"
            >
              <ChevronLeft size={14} />
              <span>{ui.back}: {category.name}</span>
            </Link>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 border border-navy-100/90 text-navy-800 text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-600 animate-pulse" />
              <CategoryIcon size={13} />
              <span>{category.name}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
              <Factory className="w-3.5 h-3.5 text-navy-700 shrink-0" />
              <span>Nashik Plant Manufacturing</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-steel-100/80 border border-steel-200/80 text-steel-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-navy-700 shrink-0" />
              <span>Custom Drawing-Verified</span>
            </div>
          </div>

          {/* Grid: 7 cols Info, 5 cols Visual Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.12]">
                {product.name}
              </h1>

              <p className="whitespace-pre-line text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl">
                {product.shortDescription || product.description}
              </p>

              {/* Quick Spec Pills Preview */}
              {product.specifications.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.specifications.slice(0, 3).map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs"
                    >
                      <span className="text-slate-400 font-semibold">{spec.label}:</span>
                      <span className="font-bold text-navy-900">{spec.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Location Tag */}
              <div className="flex items-center gap-1.5 text-xs text-steel-500 font-medium pt-1">
                <MapPin size={14} className="text-navy-700 shrink-0" />
                <span>{siteSEO.productLocation}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={enquiryHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-all shadow-md active:scale-98"
                >
                  <span>{product.enquiryTitle || ui.enquiry}</span>
                  <ArrowRight size={16} />
                </Link>

                {product.specifications.length > 0 && (
                  <a
                    href="#specifications"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-steel-50 text-steel-800 font-semibold text-sm border border-steel-200 transition-all shadow-2xs"
                  >
                    <FileSpreadsheet size={16} className="text-navy-700" />
                    <span>View Technical Specifications</span>
                  </a>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-steel-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>CAD / 2D Drawing Ready</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Custom Machined Tooling</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Trial Verification in Nashik</span>
                </span>
              </div>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-5 w-full">
              <VisualShowcase
                image={product.image}
                alt={product.imageAlt || product.name}
                categorySlug={categorySlug}
                badge={product.name}
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Product Detail Main Body ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Full Description if distinct from short description */}
        {product.description && product.description !== product.shortDescription && (
          <section className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-navy-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Cpu size={12} className="text-navy-700" />
              <span>DETAILED PROFILE</span>
            </span>
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xs">
              <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-steel-700 max-w-4xl">
                {product.description}
              </p>
            </div>
          </section>
        )}

        {/* Engineering Highlights */}
        <RichList title={ui.highlights} items={product.highlights} type="highlights" />

        {/* Mechanical Features */}
        <FeaturesSection features={product.features} />

        {/* Engineering Specifications Sheet */}
        <TechnicalSpecificationsTable
          specifications={product.specifications}
          categorySlug={categorySlug}
          slug={slug}
        />

        {/* Applications */}
        <ApplicationsSection applications={product.applications} />

        {/* Customization Options */}
        <RichList title={ui.customization} items={product.customizationOptions} type="customization" />

        {/* Product Visual Gallery */}
        <GallerySection images={product.gallery} name={product.name} />

        {/* Final Conversion RFQ Banner */}
        <ProductEnquiryCTA
          title={product.enquiryTitle || `Request Specifications for ${product.name}`}
          enquiryHref={enquiryHref}
          productName={product.name}
        />
      </div>
    </article>
  );
}
