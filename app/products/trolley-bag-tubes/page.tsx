import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Box,
  CheckCircle2,
  FileText,
  Sliders,
  Send,
  UploadCloud,
  Layers3,
  ShieldCheck,
  Building2,
  Package,
  Wrench,
  Check,
  HelpCircle,
  Sparkles,
  ShoppingBag,
  Ruler,
  Scissors,
} from "lucide-react";
import tubesForTrolleyBags from "@/data/products-data/tubes-for-trolley-bags";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import FAQAccordion, { type FAQItem } from "@/components/products/FAQAccordion";

export const metadata: Metadata = {
  title: tubesForTrolleyBags.seo.title,
  description: tubesForTrolleyBags.seo.description,
  keywords: tubesForTrolleyBags.seo.keywords,
  alternates: {
    canonical: "/products/trolley-bag-tubes",
  },
  openGraph: {
    title: tubesForTrolleyBags.seo.title,
    description: tubesForTrolleyBags.seo.description,
    url: "/products/trolley-bag-tubes",
    siteName: "Empirical India",
    type: "website",
  },
};

// Verified FAQs strictly adhering to AGENTS.md rule 4 & rule 7
const faqs: readonly FAQItem[] = [
  {
    question: "What tube materials and grades are supplied for trolley bag applications?",
    answer:
      "Per our engineering standards, we do not assume a generic material. Tube material and grade (such as steel, aluminium, or other approved alloys) are specified and confirmed against the customer's technical drawing and frame design requirements.",
  },
  {
    question: "What tube profile geometries can be manufactured?",
    answer:
      "We supply oval tube sections and square tube sections with integrated ribs. Custom profile cross-sections can also be reviewed and engineered from a supplied drawing or physical sample.",
  },
  {
    question: "How are cut length, straightness, and end conditions controlled?",
    answer:
      "Tubes are cut to specified lengths with controlled straightness tolerances. End conditions—including deburring, squaring, and chamfering—can be tailored to ensure smooth sliding in telescopic assemblies and snag-free fitment.",
  },
  {
    question: "Can holes, slots, or secondary end features be integrated?",
    answer:
      "Yes. If your trolley frame requires fixing holes, locking pin slots, or end notches, secondary punching and cutting operations can be reviewed and quoted as part of the supply scope.",
  },
  {
    question: "What surface finish and scratch protection options are available?",
    answer:
      "Depending on the approved material, tubes can be supplied in mill finish, powder coated, anodized, or plated. Protective sleeving and scratch-resistant packaging are arranged for safe transit and handling.",
  },
  {
    question: "What is the sample approval workflow before volume production?",
    answer:
      "We follow a drawing-led and sample-verified approach. Pre-production prototype samples are provided for fitment, dimensional verification, and customer approval prior to volume batch manufacture.",
  },
];

// Related categories data
const relatedCategories = [
  {
    name: "Roll-Forming Lines",
    slug: "roll-forming-lines",
    href: "/products/roll-forming-lines",
    headline: "Precision-engineered profile forming systems",
    badge: "5 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
  },
  {
    name: "Modular Metal Pallets",
    slug: "modular-metal-pallets",
    href: "/products/modular-metal-pallets",
    headline: "Heavy-duty pallets built around your load",
    badge: "3 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
  },
  {
    name: "Solar Structures",
    slug: "solar-structures",
    href: "/products/solar-structures",
    headline: "Reliable structural systems for solar installations",
    badge: "2 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
  },
];

const benefitIcons = [ShieldCheck, Sliders, Ruler, Scissors, Box];
const industryIcons = [ShoppingBag, Building2, Package, Wrench];

export default function TrolleyBagTubesPage() {
  // Safe hero image fallback
  const heroImageSrc =
    tubesForTrolleyBags.heroImage &&
    tubesForTrolleyBags.heroImage !== "null" &&
    !tubesForTrolleyBags.heroImage.includes("null")
      ? tubesForTrolleyBags.heroImage
      : "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp";

  return (
    <div className="flex flex-col w-full bg-white text-steel-900">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. BREADCRUMBS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-slate-50/70 pt-24 sm:pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs text-steel-500">
              <li>
                <Link href="/" className="transition-colors hover:text-navy-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400" />
              </li>
              <li>
                <Link href="/products/trolley-bag-tubes" className="transition-colors hover:text-navy-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400" />
              </li>
              <li className="font-semibold text-navy-900" aria-current="page">
                Trolley-Bag Tubes
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. HERO SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white py-12 sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Heading, Value Prop & CTAs */}
            <div className="lg:col-span-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-navy-800 shadow-sm">
                <Box size={14} className="text-navy-700" aria-hidden="true" />
                Specialized Tube Profiles
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                Tubes for Trolley-Bag &{" "}
                <span className="text-navy-700">Luggage Manufacturing</span>
              </h1>

              <p className="mt-3 text-base font-semibold text-navy-800 sm:text-lg">
                {tubesForTrolleyBags.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600 max-w-2xl">
                {tubesForTrolleyBags.description}
              </p>

              {/* Key Quick Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-steel-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Oval & Ribbed Square Sections
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Made to Drawing or Physical Sample
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Precision Cut Lengths & Deburring
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?product=trolley-bag-tubes"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <Send size={16} />
                  <span>Send a Tube Drawing or Sample</span>
                </Link>

                <a
                  href="#product-range"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-steel-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <ArrowDown size={15} className="text-navy-700" />
                  <span>Explore Tube Sections</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2.5 shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900">
                    <Image
                      src={heroImageSrc}
                      alt="Tubes for trolley bag manufacturing by Empirical India"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs font-mono font-medium tracking-wide text-cyan-300 uppercase">
                          PRECISION PROFILES // OEM SOURCING
                        </p>
                        <p className="text-sm font-bold tracking-tight">
                          Trolley Frame Components
                        </p>
                      </div>

                      <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                        2 Profiles
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-steel-900">Sample-Verified OEM Supply</p>
                    <p className="text-[11px] text-steel-500">Dimensions to Drawing Spec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. CATEGORY INTRODUCTION & ENGINEERING APPROACH
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">
              Manufacturing & Dimensional Quality
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl lg:text-4xl">
              Tube Sections Engineered for Telescopic Fit & Frame Assembly
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {tubesForTrolleyBags.overview}
            </p>
          </div>

          {/* 4 Technical Quality Pillars */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Dimensional Variation",
                desc: "Controlled wall thickness and cross-section geometry ensuring consistent sliding clearances in telescopic handles.",
                badge: "Clearance Fit",
              },
              {
                title: "Straightness & Flatness",
                desc: "Controlled deflection across full cut length to prevent binding during telescoping movement.",
                badge: "Smooth Travel",
              },
              {
                title: "End Condition & Deburring",
                desc: "Clean, burr-free end cuts allowing smooth insertion into molded plastic corner joints and handle brackets.",
                badge: "Clean Edges",
              },
              {
                title: "Surface Finish & Protection",
                desc: "Smooth external finish with scratch-resistant packaging designed for high-aesthetic consumer products.",
                badge: "Finish Quality",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-navy-50 px-2.5 py-1 text-[10px] font-bold text-navy-800">
                  {item.badge}
                </span>
                <h3 className="mt-3.5 text-base font-bold text-steel-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-steel-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          4. PRODUCT RANGE (ALL 2 CHILD PRODUCTS)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="product-range" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                <Layers3 size={13} />
                Profile Catalogue
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Trolley Bag Tube Profile Options
              </h2>
              <p className="mt-3 text-base text-steel-600">
                Explore our oval and ribbed square tube sections manufactured to your required material grade, wall thickness, and length specifications.
              </p>
            </div>

            <Link
              href="/contact?product=trolley-bag-tubes"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-navy-900 whitespace-nowrap"
            >
              <span>Submit Profile Drawing</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 2 Product Range Cards */}
          <ProductRangeGrid
            products={tubesForTrolleyBags.children}
            categorySlug="trolley-bag-tubes"
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5. KEY BENEFITS (ICON-BASED GRID)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
              OEM Sourcing Advantages
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Why Partner with Empirical for Trolley Tubes?
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Reliable profile consistency, dependable tolerances, and technical alignment directly from the manufacturer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tubesForTrolleyBags.keyBenefits.map((benefit, index) => {
              const IconComp = benefitIcons[index % benefitIcons.length];
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-navy-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <IconComp size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-steel-900">
                    {benefit}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-500">
                    Precision forming tooling matched to OEM drawings with verified pre-dispatch inspection reports.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          6. MANUFACTURING CAPABILITIES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
                Tooling & Processing Scope
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Our Tube Manufacturing Capabilities
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-600">
                From precision roll forming of custom oval and ribbed geometry to high-speed burr-free cutoff and secondary hole punching, we supply ready-to-assemble tube components.
              </p>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <span>Learn About Our Plant</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tubesForTrolleyBags.manufacturingCapabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-steel-900">{capability}</h3>
                      <p className="mt-1 text-xs text-steel-500">
                        Tailored to approved customer drawing or reference sample.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          7. INDUSTRIES & CONSUMER APPLICATIONS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
              Applications & Sectors
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Industries & Trolley Assembly Use Cases
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Where Empirical formed tube sections provide structural strength and clean product integration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tubesForTrolleyBags.industries.map((ind, idx) => {
              const IconComp = industryIcons[idx % industryIcons.length];
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-navy-700">
                    <IconComp size={20} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-steel-900">{ind}</h3>
                  <p className="mt-1.5 text-xs text-steel-500">
                    Oval and ribbed square profile tubes to specification.
                  </p>
                </div>
              );
            })}
          </div>

          {/* Featured Assembly Scenarios */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-900">
              Typical Assembly Applications:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-steel-700">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Telescopic Handle Extension Tubes</span>
                Oval tubes sliding with minimal friction within outer sleeves for smooth extension and retraction.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Internal Luggage Corner Frames</span>
                Ribbed square sections providing torsional rigidity along trolley bag perimeter skeletons.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Consumer Rolling Gear Bracing</span>
                Profiled tubes for utility rolling cases, medical transport cases, and presentation luggage.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. CUSTOMIZATION & BUYER'S TECHNICAL CHECKLIST
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-white p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Sizing Guidance */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                  <Sliders size={13} />
                  Specification Guidance
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-steel-900">
                  Tubes Made to Your Exact Product Requirements
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600">
                  The cross-section, material grade, dimensions, cut length, surface finish, and secondary features are defined against your approved drawing or physical sample before manufacturing.
                </p>

                <div className="mt-6 space-y-3.5">
                  {[
                    "Material & Grade: Defined per order; do not assume steel, aluminium, or another alloy without project approval.",
                    "Outside Dimensions: Oval major/minor diameters or square width and rib profile geometry.",
                    "Wall Thickness: Selected to achieve required mechanical strength without unnecessary tare weight.",
                    "Length & Straightness: Precise cut-to-length tolerance and strict straightness control.",
                    "Finish & Protection: Mill finish, powder coating, or anodizing with protective transit packaging.",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-steel-700">
                      <div className="mt-1 h-2 w-2 rounded-full bg-navy-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Buyer's RFQ Checklist */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8 shadow-sm ring-1 ring-navy-50">
                  <div className="flex items-center gap-2.5 text-navy-900">
                    <FileText size={20} className="text-navy-700" />
                    <h3 className="text-lg font-bold">Tube RFQ Checklist</h3>
                  </div>
                  <p className="mt-1 text-xs text-steel-500">
                    Information needed to evaluate tube tooling and provide a technical quote:
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Cross-section drawing (2D / 3D CAD or PDF) with critical dimensions",
                      "Physical reference sample (if available for profile replication)",
                      "Approved material specification and required wall thickness",
                      "Cut length requirements and acceptable linear tolerance",
                      "Holes, slots, or end notches required for assembly integration",
                      "Surface finish expectations and annual / batch order volume",
                    ].map((checkItem, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span>{checkItem}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-steel-500">
                      Have a drawing or sample ready?
                    </p>
                    <Link
                      href="/contact?product=trolley-bag-tubes"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-900"
                    >
                      <UploadCloud size={14} />
                      <span>Submit Tube RFQ</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          9. FAQ SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-700">
              <HelpCircle size={14} />
              Technical FAQs
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-steel-600">
              Clear guidance on tube profile customization, material approval, and OEM supply.
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          10. ENQUIRY CTA SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16 lg:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <Send size={12} />
                  OEM Sourcing Consultation
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {tubesForTrolleyBags.enquiryTitle}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {tubesForTrolleyBags.enquiryDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Drawing or Sample Verification
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Pre-Production Prototype Approval
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Nashik Manufacturing Bay
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact?product=trolley-bag-tubes"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-navy-950 shadow-lg transition-all hover:bg-cyan-300 hover:shadow-cyan-400/20"
                  >
                    <span>Request Tube Proposal</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                  >
                    <UploadCloud size={14} />
                    <span>Upload Profile Drawing</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          11. RELATED PRODUCT CATEGORIES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
                Explore Other Categories
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-steel-900">
                Complementary Manufacturing Verticals
              </h2>
            </div>
            <Link
              href="/products/trolley-bag-tubes"
              className="text-xs font-bold text-navy-700 hover:text-navy-900"
            >
              All Product Lines
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur-sm">
                    {cat.badge}
                  </span>
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-base font-bold text-steel-900 transition-colors group-hover:text-navy-700">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-steel-500 line-clamp-2">
                    {cat.headline}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-navy-700">
                    <span>Explore Products</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
