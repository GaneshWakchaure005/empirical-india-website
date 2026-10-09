import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Package,
  CheckCircle2,
  FileText,
  Sliders,
  Send,
  UploadCloud,
  Layers3,
  ShieldCheck,
  Building2,
  Car,
  Warehouse,
  Wrench,
  Check,
  Boxes,
  HelpCircle,
  Sparkles,
  Forklift,
  Layers,
  Scale,
} from "lucide-react";
import modularPallets from "@/data/products-data/modular-pallets";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import FAQAccordion, { type FAQItem } from "@/components/products/FAQAccordion";

export const metadata: Metadata = {
  title: modularPallets.seo.title,
  description: modularPallets.seo.description,
  keywords: modularPallets.seo.keywords,
  alternates: {
    canonical: "/products/modular-metal-pallets",
  },
  openGraph: {
    title: modularPallets.seo.title,
    description: modularPallets.seo.description,
    url: "/products/modular-metal-pallets",
    siteName: "Empirical India",
    type: "website",
  },
};

// Verified FAQs strictly adhering to AGENTS.md rule 4 & rule 7
const faqs: readonly FAQItem[] = [
  {
    question: "How are pallet load ratings determined for an order?",
    answer:
      "Per our engineering standards, pallet load ratings are never assumed from generic charts. Safe working capacity is calculated and validated for the actual pallet geometry, beam sections, deck thickness, and the specific load case (static floor load, dynamic forklift load, and high-bay rack load).",
  },
  {
    question: "When should we choose powder coating versus hot-dip galvanizing?",
    answer:
      "Powder coating is ideal for indoor warehousing, dry factory assembly lines, and colour-coded logistics management. Hot-dip galvanizing provides sacrificial zinc protection suited for outdoor storage, high-humidity environments, or exposure to moisture and harsh industrial conditions.",
  },
  {
    question: "Can metal pallets be designed for both forklift and hand pallet truck access?",
    answer:
      "Yes. We engineer 2-way and 4-way entry designs with designated fork pocket clearances, chamfered entry guides, and bottom runner layouts compatible with standard forklifts, reach trucks, and hydraulic hand pallet jacks.",
  },
  {
    question: "Can pallets be built with custom product locating brackets or cradles?",
    answer:
      "Yes. Because we manufacture custom modular metal pallets, we can integrate custom locating pins, perimeter retaining lips, rubber buffer strips, or tailored cradles matching your specific component geometry.",
  },
  {
    question: "Are these pallets suitable for warehouse pallet racking systems?",
    answer:
      "Yes. When specified for drive-in or selective pallet racking, the bottom runner profile, deflection limits, and safety factors are engineered specifically to ensure secure, non-deflecting placement across rack beams.",
  },
  {
    question: "What information should be shared when requesting a custom pallet review?",
    answer:
      "Please share the goods to be carried (part drawings or packaged dimensions), total weight, handling method, stacking or racking arrangement, and whether indoor or outdoor corrosion protection is needed.",
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
    name: "Trolley-Bag Tubes",
    slug: "trolley-bag-tubes",
    href: "/products/trolley-bag-tubes",
    headline: "Precisely formed tubes for trolley bags",
    badge: "2 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
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

const benefitIcons = [ShieldCheck, Sliders, Boxes, Scale, Package];
const industryIcons = [Building2, Warehouse, Car, Wrench, Package];

export default function ModularMetalPalletsPage() {
  // Safe hero image fallback
  const heroImageSrc =
    modularPallets.heroImage &&
    modularPallets.heroImage !== "null" &&
    !modularPallets.heroImage.includes("null")
      ? modularPallets.heroImage
      : "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp";

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
                <Link href="/products/modular-metal-pallets" className="transition-colors hover:text-navy-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400" />
              </li>
              <li className="font-semibold text-navy-900" aria-current="page">
                Modular Metal Pallets
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
                <Package size={14} className="text-navy-700" aria-hidden="true" />
                Heavy-Duty Material Handling
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                Modular Metal Pallets &{" "}
                <span className="text-navy-700">Storage Platforms</span>
              </h1>

              <p className="mt-3 text-base font-semibold text-navy-800 sm:text-lg">
                {modularPallets.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600 max-w-2xl">
                {modularPallets.description}
              </p>

              {/* Key Quick Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-steel-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Cold Roll-Formed C-Channel Profiles
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Powder-Coated & Galvanized Finishes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Engineered to Specified Load Cases
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?product=modular-metal-pallets"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <Send size={16} />
                  <span>Request a Custom Pallet Review</span>
                </Link>

                <a
                  href="#product-range"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-steel-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <ArrowDown size={15} className="text-navy-700" />
                  <span>Explore 3 Pallet Types</span>
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
                      alt="Modular Metal Pallets for industrial material handling by Empirical India"
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
                          HEAVY-DUTY LOGISTICS // FABRICATION
                        </p>
                        <p className="text-sm font-bold tracking-tight">
                          Custom Metal Pallets & Staging
                        </p>
                      </div>

                      <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                        3 Variants
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-steel-900">Validated Load Engineering</p>
                    <p className="text-[11px] text-steel-500">Static, Dynamic & Rack Rated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. CATEGORY INTRODUCTION & LOAD-CASE METHODOLOGY
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">
              Engineering & Design Principles
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl lg:text-4xl">
              Pallets Engineered Around Your Handling Flow & Load Cases
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {modularPallets.overview}
            </p>
          </div>

          {/* 4 Distinct Load Cases Breakdown */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Static Floor Load",
                desc: "Maximum uniformly distributed weight supported when the pallet rests stationary on flat concrete flooring.",
                badge: "Floor Storing",
              },
              {
                title: "Dynamic Handling Load",
                desc: "Safe working load during forklift, stacker, or automated conveyor transport with dynamic acceleration.",
                badge: "In-Transit",
              },
              {
                title: "Rack Load Capacity",
                desc: "Load supported when placed across structural pallet rack beams with acceptable centre-deflection limits.",
                badge: "Beam Racking",
              },
              {
                title: "Stacking & Nesting",
                desc: "Multi-tier vertical compressive loads when loaded pallets are stacked two-high or three-high safely.",
                badge: "Vertical Stacking",
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
          4. PRODUCT RANGE (ALL 3 CHILD PRODUCTS)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="product-range" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                <Layers3 size={13} />
                Pallet Formats & Coatings
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Modular Metal Pallet Configurations
              </h2>
              <p className="mt-3 text-base text-steel-600">
                Choose from powder-coated, galvanized, or configurable modular metal pallets designed around your product footprint and operating environment.
              </p>
            </div>

            <Link
              href="/contact?product=modular-metal-pallets"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-navy-900 whitespace-nowrap"
            >
              <span>Consult on Pallet Sizing</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3 Product Range Cards */}
          <ProductRangeGrid
            products={modularPallets.children}
            categorySlug="modular-metal-pallets"
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
              Operational Advantages
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Why Choose Engineered Metal Pallets?
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Built for high durability, zero splintering risk, easy sanitation, and reliable returnable closed-loop operations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modularPallets.keyBenefits.map((benefit, index) => {
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
                    Engineered with cold roll-formed C-channels and reinforced corners to withstand repeated forklift impact and heavy loads.
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
                Fabrication & Surface Treatment
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Our Pallet Manufacturing Capabilities
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-600">
                Empirical India leverages roll-formed structural steel profiles, precision MIG welding jigs, automated surface preparation, and quality coating lines in Nashik to fabricate dependable industrial pallets.
              </p>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <span>About Our Facility</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {modularPallets.manufacturingCapabilities.map((capability, idx) => (
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
                        Engineered to customer load case and handling environment.
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
          7. INDUSTRIES & MATERIAL FLOW APPLICATIONS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
              Sectors We Serve
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Industries & Handling Applications
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Where Empirical metal pallets provide structured, damage-free parts movement and organized high-bay storage.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {modularPallets.industries.map((ind, idx) => {
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
                    Custom footprint, deck type, and fork access.
                  </p>
                </div>
              );
            })}
          </div>

          {/* Child Product Applications Callout */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-900">
              Typical Pallet Usage Scenarios:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-steel-700">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Heavy Engine & Casting Handling</span>
                Rigid decks preventing sagging under concentrated heavy casting point loads.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">High-Bay Rack Warehousing</span>
                Reliable skid profiles matching beam spans with zero risk of rack beam slippage.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Returnable Closed-Loop Logistics</span>
                Durable steel pallets designed for repeated multi-year factory-to-vendor turnaround.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. CUSTOMIZATION & RFQ CHECKLIST
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-white p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Sizing Guidance */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                  <Sliders size={13} />
                  Design Sizing Guidance
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-steel-900">
                  Help Us Size The Pallet Correctly
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600">
                  Pallet dimensions, runner orientation, and gauge thickness are tailored to your material flow. We work from the item being carried, how it is moved, and how it is stored to define the pallet specifications.
                </p>

                <div className="mt-6 space-y-3.5">
                  {[
                    "Overall Footprint: Length, width, deck height, and specific product contact points.",
                    "Fork Entry: 2-way or 4-way entry, required tines clearance, and hand pallet truck compatibility.",
                    "Load Ratings: Static floor load, dynamic forklift load, and high-bay racking load specified separately.",
                    "Surface Finish: Powder coating (RAL colour of choice) or hot-dip galvanizing for corrosion resistance.",
                    "Stacking & Storing: Loaded vertical stacking height, nesting when empty, or drive-in rack fitment.",
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
                    <h3 className="text-lg font-bold">Pallet RFQ Checklist</h3>
                  </div>
                  <p className="mt-1 text-xs text-steel-500">
                    Share these parameters to receive an accurate structural review and quote:
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Component or product dimensions (L x W x H) and weight",
                      "Required pallet footprint (standard 1200x1000, 1200x800, or custom mm)",
                      "Target load capacity: Static load (kg) and Dynamic load (kg)",
                      "Racking requirements: High-bay beam rack load capacity (kg)",
                      "Fork handling method: 2-way or 4-way, pallet truck access needed?",
                      "Service environment: Indoor dry, washdown, or outdoor atmospheric exposure",
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
                      Have parts dimensions ready? Submit your RFQ:
                    </p>
                    <Link
                      href="/contact?product=modular-metal-pallets"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-900"
                    >
                      <UploadCloud size={14} />
                      <span>Request Pallet Review</span>
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
              Clear, factual answers regarding metal pallet load validation, coatings, and customization.
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
                  Custom Engineering RFQ
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {modularPallets.enquiryTitle}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {modularPallets.enquiryDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Validated Load Ratings
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Custom Footprint Sizing
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
                    href="/contact?product=modular-metal-pallets"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-navy-950 shadow-lg transition-all hover:bg-cyan-300 hover:shadow-cyan-400/20"
                  >
                    <span>Request Pallet Proposal</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                  >
                    <UploadCloud size={14} />
                    <span>Upload Part Dimensions</span>
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
              href="/products/modular-metal-pallets"
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
