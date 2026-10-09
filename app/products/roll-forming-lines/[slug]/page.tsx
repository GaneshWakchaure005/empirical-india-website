import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  Layers3,
  Sliders,
  Send,
  UploadCloud,
  Check,
} from "lucide-react";
import rollFormingLines from "@/data/products-data/roll-forming-lines";
import TechnicalPlaceholder from "@/components/products/TechnicalPlaceholder";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return rollFormingLines.children.map((child) => ({
    slug: child.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = rollFormingLines.children.find((c) => c.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Empirical India",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `/products/roll-forming-lines/${product.slug}`,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `/products/roll-forming-lines/${product.slug}`,
      type: "website",
    },
  };
}

async function ProductContent({ params }: PageProps) {
  const { slug } = await params;
  const product = rollFormingLines.children.find((c) => c.slug === slug);

  if (!product) {
    notFound();
  }

  const enquiryHref = `/contact?product=roll-forming-lines&module=${product.slug}`;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-24 sm:pt-28">
      {/* 1. Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-steel-500">
          <Link href="/" className="transition-colors hover:text-navy-700">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/products/roll-forming-lines" className="transition-colors hover:text-navy-700">
            Roll Forming Lines
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="font-semibold text-navy-900 line-clamp-1">{product.name}</span>
        </nav>

        {/* Back Link */}
        <Link
          href="/products/roll-forming-lines"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-navy-900"
        >
          <ArrowLeft size={14} />
          <span>Back to All Roll Forming Lines</span>
        </Link>
      </div>

      {/* 2. Product Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left info */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <span className="mb-3.5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-700">
              <Layers3 size={13} />
              Machine Module Specification
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-steel-600 sm:text-lg">
              {product.description}
            </p>

            {/* Highlights */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Engineering Highlights
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={enquiryHref}
                className="inline-flex items-center gap-2.5 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                <Send size={16} />
                <span>{product.enquiryTitle || "Discuss Technical Requirement"}</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-steel-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
              >
                <UploadCloud size={16} className="text-navy-700" />
                <span>Submit Profile Drawing</span>
              </Link>
            </div>
          </div>

          {/* Right image/CAD preview */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
              <TechnicalPlaceholder
                image={product.image}
                alt={product.name}
                category="Roll Forming Machine"
                className="h-full w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Features */}
      {product.features && product.features.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-steel-900">Module Architecture & Design Features</h2>
            <p className="mt-2 text-sm text-steel-500">
              Configured specifically to match your profile geometry, steel coil properties, and floor space constraints.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-100 text-navy-800 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="mt-3.5 text-base font-bold text-navy-900">{feat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Specifications & Customization Requirements */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Specifications Table */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="text-navy-700" size={20} />
              <h2 className="text-xl font-bold text-steel-900">Technical Specifications</h2>
            </div>
            <p className="mt-1 text-xs text-steel-500">
              *Parameters are tailored per customer drawing and project confirmation.
            </p>

            <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
              {product.specifications.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center justify-between p-3.5 text-sm bg-white even:bg-slate-50/50">
                  <span className="font-semibold text-steel-700">{spec.label}</span>
                  <span className="font-mono text-xs font-medium text-navy-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Sliders className="text-navy-700" size={20} />
              <h2 className="text-xl font-bold text-steel-900">Customization Parameters</h2>
            </div>
            <p className="mt-1 text-xs text-steel-500">
              Specify these factors when requesting an engineering proposal.
            </p>

            <ul className="mt-6 space-y-3">
              {product.customizationOptions.map((opt, oIdx) => (
                <li key={oIdx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
                    <Check size={12} />
                  </div>
                  <span>{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Applications */}
      {product.applications && product.applications.length > 0 && (
        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-steel-900">Target Applications</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {product.applications.map((app, aIdx) => (
                <div key={aIdx} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold text-navy-900 text-sm">{app.title}</h3>
                  <p className="mt-1.5 text-xs text-steel-600 leading-relaxed">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Closing Enquiry Callout */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Direct Engineering Consultation
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold">
              Need a quote for {product.name}?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Share your drawing, material grade, and production target. Empirical India engineers will analyze your section and review machine arrangement options.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={enquiryHref}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-md transition-all hover:bg-cyan-300"
              >
                <span>Request Custom Quote</span>
              </Link>
              <Link
                href="/products/roll-forming-lines"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20"
              >
                <span>View Other Modules</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ChildProductPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50 pb-20 pt-24 sm:pt-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-20 w-full animate-pulse rounded-lg bg-slate-200" />
                <div className="h-40 w-full animate-pulse rounded-2xl bg-slate-200" />
              </div>
              <div className="lg:col-span-5 aspect-[4/3] animate-pulse rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

