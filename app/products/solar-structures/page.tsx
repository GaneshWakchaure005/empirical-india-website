import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Sun,
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
  Wind,
  Compass,
  Zap,
} from "lucide-react";
import solarStructure from "@/data/products-data/solar-structure";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import FAQAccordion, { type FAQItem } from "@/components/products/FAQAccordion";

export const metadata: Metadata = {
  title: solarStructure.seo.title,
  description: solarStructure.seo.description,
  keywords: solarStructure.seo.keywords,
  alternates: {
    canonical: "/products/solar-structures",
  },
  openGraph: {
    title: solarStructure.seo.title,
    description: solarStructure.seo.description,
    url: "/products/solar-structures",
    siteName: "Empirical India",
    type: "website",
  },
};

// Verified FAQs strictly adhering to AGENTS.md rule 4 & rule 5
const faqs: readonly FAQItem[] = [
  {
    question: "How are wind loads and structural capacities evaluated for solar mountings?",
    answer:
      "Per our engineering standards, structural capacity is never assumed from generic charts. Design wind loads, uplift forces, and member sizing depend on site geographical location, building height, terrain category, and module tilt angle. All final structural suitability must be confirmed by a qualified project engineer.",
  },
  {
    question: "What roof interfaces can the mounting structures accommodate?",
    answer:
      "Our solutions can be coordinated for industrial trapezoidal sheet roofs (using mini-rails or short rails), standing seam roofs (using non-penetrating seam clamps), and RCC flat roofs (using ballast blocks or chemical anchors).",
  },
  {
    question: "What corrosion protection specifications are available?",
    answer:
      "Depending on the atmospheric corrosivity category (C1 to C4/C5), components can be supplied in pre-galvanized steel (high GSM zinc coating), hot-dip galvanized steel, or aluminium alloy matching project BoQ specifications.",
  },
  {
    question: "Can custom roll-formed strut channels and purlins be supplied in bulk for solar EPCs?",
    answer:
      "Yes. We manufacture customized C-channels, strut profiles, and mounting purlins with pre-punched hole patterns and cut lengths suited for high-volume solar plant and rooftop installations.",
  },
  {
    question: "How are components packaged for site installation?",
    answer:
      "Members are bundle-packed and tagged according to bill of materials (BoQ) mark numbers to streamline unloading, sorting, and erection across commercial and industrial project sites.",
  },
  {
    question: "What information should be submitted when requesting a solar structure quote?",
    answer:
      "Please share the project location (wind zone), roof type and condition, PV module datasheet (dimensions and wattage), proposed layout / tilt angle, and preferred coating specification.",
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
    name: "Trolley-Bag Tubes",
    slug: "trolley-bag-tubes",
    href: "/products/trolley-bag-tubes",
    headline: "Precisely formed tubes for trolley bags",
    badge: "2 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
  },
];

const benefitIcons = [ShieldCheck, Sliders, Wind, Compass, Zap];
const industryIcons = [Building2, Building2, Zap, Wrench, Sun];

export default function SolarStructuresPage() {
  // Safe hero image fallback
  const heroImageSrc =
    solarStructure.heroImage &&
    solarStructure.heroImage !== "null" &&
    !solarStructure.heroImage.includes("null")
      ? solarStructure.heroImage
      : "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp";

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
                <Link href="/products/solar-structures" className="transition-colors hover:text-navy-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400" />
              </li>
              <li className="font-semibold text-navy-900" aria-current="page">
                Solar Structures
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
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Heading, Value Prop & CTAs */}
            <div className="lg:col-span-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-amber-900 shadow-sm">
                <Sun size={14} className="text-amber-600" aria-hidden="true" />
                Renewable Energy Mounting Systems
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                Solar Structures &{" "}
                <span className="text-navy-700">Roll-Formed Profiles</span>
              </h1>

              <p className="mt-3 text-base font-semibold text-navy-800 sm:text-lg">
                {solarStructure.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600 max-w-2xl">
                {solarStructure.description}
              </p>

              {/* Key Quick Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-steel-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Rooftop Mounting & Strut Channels
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Coordinated to Site Wind Loads
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  High-GSM Galvanized Protection
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?product=solar-structures"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <Send size={16} />
                  <span>Discuss a Solar Mounting Project</span>
                </Link>

                <a
                  href="#product-range"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-steel-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <ArrowDown size={15} className="text-navy-700" />
                  <span>Explore 2 Solar Systems</span>
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
                      alt="Solar mounting structures and profiles by Empirical India"
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
                        <p className="text-xs font-mono font-medium tracking-wide text-amber-300 uppercase">
                          SOLAR EPC SOURCING // NASHIK
                        </p>
                        <p className="text-sm font-bold tracking-tight">
                          Mounting Profiles & Rooftop Struts
                        </p>
                      </div>

                      <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                        2 Systems
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-steel-900">Site-Specific Coordination</p>
                    <p className="text-[11px] text-steel-500">Subject to Engineer Review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. CATEGORY INTRODUCTION & SITE ENGINEERING CONSIDERATIONS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">
              Project Engineering & Load Considerations
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl lg:text-4xl">
              Engineered for Photovoltaic Load Transfer & Roof Integrity
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {solarStructure.overview}
            </p>
          </div>

          {/* 4 Project Engineering Considerations */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Site Wind Loads",
                desc: "Uplift and downforce verification tailored to building height, terrain roughness, and regional wind speed zones.",
                badge: "Wind Resistance",
              },
              {
                title: "Roof Interface & Fixings",
                desc: "Non-penetrating seam clamps for standing seam roofs or engineered chemical anchors for RCC slabs to safeguard waterproofing.",
                badge: "Leak Protection",
              },
              {
                title: "Module Array Layout",
                desc: "Strut span and rail spacing configured to match PV module manufacturer clamping zones and tilt angles.",
                badge: "Optimum Layout",
              },
              {
                title: "Corrosion Protection",
                desc: "High-GSM galvanized coatings or marine-grade anodized profiles matching environmental humidity and chemical exposure.",
                badge: "Corrosion Guard",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-900">
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
                Solar Product Catalogue
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Solar Mounting Structures & Roll-Formed Sections
              </h2>
              <p className="mt-3 text-base text-steel-600">
                Explore prefabricated rooftop mounting solutions and continuous roll-formed strut profiles manufactured to project BoQ specifications.
              </p>
            </div>

            <Link
              href="/contact?product=solar-structures"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-navy-900 whitespace-nowrap"
            >
              <span>Submit Project BoQ</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 2 Product Range Cards */}
          <ProductRangeGrid
            products={solarStructure.children}
            categorySlug="solar-structures"
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
              EPC & Installation Advantages
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Why Choose Empirical for Solar Mounting?
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Precision roll-formed channels, rapid site assembly, and engineering coordination aligned with project guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solarStructure.keyBenefits.map((benefit, index) => {
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
                    Coordinated with module layouts, clamp tolerances, and corrosion protection for long-term outdoor service.
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
                Roll Forming & Fabrication Scope
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Our Solar Manufacturing Capabilities
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-600">
                Operating dedicated roll forming lines and piercing tooling in Nashik, Empirical India produces consistent strut channels, purlins, brackets, and prefabricated rooftop mounting structures.
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
                {solarStructure.manufacturingCapabilities.map((capability, idx) => (
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
                        Manufactured and pierced to project drawings.
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
          7. INDUSTRIES & PROJECT SECTORS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
              Sectors & Installation Types
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Solar Installations & Project Sectors
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Where Empirical solar structures and roll-formed sections deliver dependable mechanical support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {solarStructure.industries.map((ind, idx) => {
              const IconComp = industryIcons[idx % industryIcons.length];
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                    <IconComp size={20} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-steel-900">{ind}</h3>
                  <p className="mt-1.5 text-xs text-steel-500">
                    Custom mounting rails, clamps, and strut profiles.
                  </p>
                </div>
              );
            })}
          </div>

          {/* Featured Installation Scenarios */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-900">
              Typical Project Installation Scenarios:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-steel-700">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Industrial Metal Shed Roofs</span>
                Mini-rail and continuous rail systems engineered for trapezoidal profile sheet corrugations.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Commercial RCC Flat Roofs</span>
                Elevated or ballasted mounting frames providing optimum tilt and wind deflection geometry.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Solar EPC Component Supply</span>
                High-volume roll-formed strut channels supplied directly to engineering contractors.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. CUSTOMIZATION & PROJECT RFQ CHECKLIST
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-white p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Sizing Guidance */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                  <Sliders size={13} />
                  Project Coordination
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-steel-900">
                  Project Information Needed For Review
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600">
                  Solar mounting structures require project-specific coordination. Share the site layout, module details, and structural specifications to review component feasible layout and pricing:
                </p>

                <div className="mt-6 space-y-3.5">
                  {[
                    "Project Location & Wind Zone: Required to calculate local uplift forces and anchor requirements.",
                    "Roof Construction: Trapezoidal metal sheet, standing seam, or flat concrete slab details.",
                    "PV Module Datasheet: Length, width, frame thickness, and clamping point constraints.",
                    "Tilt Angle & Array Layout: Portrait or landscape orientation and row spacing clearances.",
                    "Material & Finish: Pre-galvanized (GSM spec), hot-dip galvanized, or anodized aluminium.",
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
                    <h3 className="text-lg font-bold">Solar Project RFQ Checklist</h3>
                  </div>
                  <p className="mt-1 text-xs text-steel-500">
                    Information to provide when requesting engineering review and pricing:
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Roof drawings or layout plan (PDF / DWG)",
                      "Project geographical location and design wind speed",
                      "Module dimensions (L x W x H mm) and total capacity (kWp / MWp)",
                      "Roof sheet profile drawing or seam geometry (if metal sheet)",
                      "Desired tilt angle and orientation (South / East-West)",
                      "Preferred material grade and corrosion protection specification",
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
                      Have solar drawings or BoQ ready?
                    </p>
                    <Link
                      href="/contact?product=solar-structures"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-900"
                    >
                      <UploadCloud size={14} />
                      <span>Submit Solar BoQ</span>
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
              Transparent answers regarding rooftop solar structures, wind load design, and roll-formed profiles.
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <Send size={12} />
                  Solar Project Consultation
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {solarStructure.enquiryTitle}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {solarStructure.enquiryDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    Project BoQ Coordination
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    High-GSM Protective Finishes
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-400" />
                    Nashik Manufacturing Bay
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact?product=solar-structures"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-bold text-navy-950 shadow-lg transition-all hover:bg-amber-300 hover:shadow-amber-400/20"
                  >
                    <span>Request Solar Structure Quote</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                  >
                    <UploadCloud size={14} />
                    <span>Upload BoQ / Layout</span>
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
              href="/products/solar-structures"
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
