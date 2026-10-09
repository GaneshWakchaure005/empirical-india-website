import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Layers3,
  CheckCircle2,
  FileText,
  Sliders,
  Send,
  UploadCloud,
  Cpu,
  Gauge,
  ShieldCheck,
  Building2,
  Car,
  Warehouse,
  Sun,
  Wrench,
  Cog,
  Check,
  Disc,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import rollFormingLines from "@/data/products-data/roll-forming-lines";
import ProductRangeGrid from "@/components/products/ProductRangeGrid";
import FAQAccordion, { type FAQItem } from "@/components/products/FAQAccordion";

export const metadata: Metadata = {
  title: rollFormingLines.seo.title,
  description: rollFormingLines.seo.description,
  keywords: rollFormingLines.seo.keywords,
  alternates: {
    canonical: "/products/roll-forming-lines",
  },
  openGraph: {
    title: rollFormingLines.seo.title,
    description: rollFormingLines.seo.description,
    url: "/products/roll-forming-lines",
    siteName: "Empirical India",
    type: "website",
  },
};

// Verified FAQs strictly adhering to AGENTS.md non-fabrication rule
const faqs: readonly FAQItem[] = [
  {
    question: "How is a roll forming line configured for a new profile?",
    answer:
      "Every machine is custom-engineered around the client's approved profile drawing or physical sample. Our tool designers evaluate the profile geometry, material grade, and thickness to determine the number of forming stations, roll pass sequence, drive layout, and cutoff method required for repeatable tolerances.",
  },
  {
    question: "What materials can be processed on Empirical roll forming lines?",
    answer:
      "Our equipment can be configured to process Cold Rolled (CRCA), Galvanized Iron (GI), Hot Rolled (HR), Stainless Steel, and Aluminium coil materials. Exact strip thickness ranges and coil widths are engineered and confirmed for each project.",
  },
  {
    question: "Can punching, slotting, and cutting be integrated directly into the line?",
    answer:
      "Yes. We offer fully automatic online punching units and flying shear cutoff systems that synchronize with the forming speed. This enables continuous forming with in-line hole patterns and precise cut-to-length parts without separate secondary processing.",
  },
  {
    question: "Do you supply tooling and dies for existing machinery?",
    answer:
      "Yes. We design and manufacture precision punching tools, shearing blades, and replacement roll tooling based on customer part drawings and reviewed machine mounting interfaces.",
  },
  {
    question: "What information should we provide when submitting an enquiry?",
    answer:
      "Please provide your profile drawing with dimensional tolerances, raw material specification (grade, thickness range, coil width), hole or slot locations, required cut lengths, and target production volume.",
  },
  {
    question: "How is equipment verified before factory dispatch?",
    answer:
      "Each line undergoes full factory assembly, alignment checks, dry cycling, and trial runs with approved coil stock at our Nashik facility prior to customer pre-dispatch inspection.",
  },
];

// Related categories data
const relatedCategories = [
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
  {
    name: "Solar Structures",
    slug: "solar-structures",
    href: "/products/solar-structures",
    headline: "Reliable structural systems for solar installations",
    badge: "2 Product Types",
    image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
  },
];

// Icon mapping helper for key benefits
const benefitIcons = [ShieldCheck, Sliders, Cpu, Gauge, Cog];

// Icon mapping helper for industries
const industryIcons = [Building2, Car, Warehouse, Sun, Wrench];

export default function RollFormingLinesPage() {
  // Safe hero image fallback
  const heroImageSrc =
    rollFormingLines.heroImage &&
    rollFormingLines.heroImage !== "null" &&
    !rollFormingLines.heroImage.includes("null")
      ? rollFormingLines.heroImage
      : "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp";

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
                <Link href="/products/roll-forming-lines" className="transition-colors hover:text-navy-700">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} className="text-slate-400" />
              </li>
              <li className="font-semibold text-navy-900" aria-current="page">
                {rollFormingLines.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. HERO SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white py-12 sm:py-16 lg:py-20">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Heading, Value Prop & CTAs */}
            <div className="lg:col-span-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-navy-800 shadow-sm">
                <Layers3 size={14} className="text-navy-700" aria-hidden="true" />
                Precision Profile Forming Technology
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl lg:text-[46px] lg:leading-[1.15]">
                {rollFormingLines.name} &{" "}
                <span className="text-navy-700">Tooling Systems</span>
              </h1>

              <p className="mt-3 text-base font-semibold text-navy-800 sm:text-lg">
                {rollFormingLines.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600 max-w-2xl">
                {rollFormingLines.description}
              </p>

              {/* Key Quick Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-steel-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  Custom Profile Tooling
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  CRCA, GI, HR, SS, Aluminium
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <Check size={14} className="text-emerald-600" />
                  In-Line Punching & Cutoff
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?product=roll-forming-lines"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-navy-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <Send size={16} />
                  <span>Enquire Now / Share Drawing</span>
                </Link>

                <a
                  href="#product-range"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-steel-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <ArrowDown size={15} className="text-navy-700" />
                  <span>Explore 5 Machine Types</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Machine Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Border Glow Wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2.5 shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900">
                    <Image
                      src={heroImageSrc}
                      alt="Industrial Roll Forming Line Machinery by Empirical India"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs font-mono font-medium tracking-wide text-cyan-300 uppercase">
                          MANUFACTURING BAY // NASHIK
                        </p>
                        <p className="text-sm font-bold tracking-tight">
                          Custom Metal Forming Machinery
                        </p>
                      </div>

                      <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
                        5 Configurations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-steel-900">100% Drawing-Led Tooling</p>
                    <p className="text-[11px] text-steel-500">Configured to Component Spec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. CATEGORY INTRODUCTION & TECHNOLOGY PROCESS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-700">
              Technology & Process Overview
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-steel-900 sm:text-3xl lg:text-4xl">
              How Roll Forming Delivers High-Volume Precision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-steel-600">
              {rollFormingLines.overview}
            </p>
          </div>

          {/* 5-Step Process Sequence */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Decoiling",
                desc: "Controlled strip payoff matched to line feed velocity and coil weights.",
              },
              {
                step: "02",
                title: "In-Line Punching",
                desc: "Integrated hydraulic or servo tooling for holes, slots, and notches.",
              },
              {
                step: "03",
                title: "Roll Forming",
                desc: "Progressive matched stations bending strip gradually into cross-section.",
              },
              {
                step: "04",
                title: "Flying Cutoff",
                desc: "Accurate part cut-to-length without stopping continuous line production.",
              },
              {
                step: "05",
                title: "Run-Out & Inspection",
                desc: "Automated exit table for dimensional verification and bundle stacking.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-navy-700">
                    {item.step}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-navy-600" />
                </div>
                <h3 className="mt-4 text-base font-bold text-steel-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-steel-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          4. PRODUCT RANGE (ALL 5 CHILD PRODUCTS)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="product-range" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                <Layers3 size={13} />
                Equipment & Tooling Catalogue
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Roll Forming Machine Range & Modules
              </h2>
              <p className="mt-3 text-base text-steel-600">
                Explore our five distinct roll forming machinery lines, automated punching units, and custom tooling manufactured around your profile specifications.
              </p>
            </div>

            <Link
              href="/contact?product=roll-forming-lines"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 hover:text-navy-900 whitespace-nowrap"
            >
              <span>Consult an Engineer</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 5 Product Range Cards */}
          <ProductRangeGrid products={rollFormingLines.children} categorySlug={rollFormingLines.slug} />
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
              Why Choose Empirical Roll Forming Systems?
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Engineered for continuous duty, consistent part geometry, and reduced lifecycle maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rollFormingLines.keyBenefits.map((benefit, index) => {
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
                    Configured with matched drive gearboxes, ground roll tooling, and precision alignment for repeatable industrial manufacturing.
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
                Factory & Engineering Infrastructure
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900 sm:text-4xl">
                Our Engineering & Manufacturing Capabilities
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-600">
                From initial profile pass design simulations to CNC turning, roll hardening, assembly, and trial testing—Empirical India delivers complete turnkey roll forming machinery in-house.
              </p>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <span>Explore Our Facility</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {rollFormingLines.manufacturingCapabilities.map((capability, idx) => (
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
                        Evaluated, manufactured, and tested to approved part criteria.
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
          7. INDUSTRIES & PROFILE APPLICATIONS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-700">
              Sectors We Serve
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-steel-900">
              Industries & Roll-Formed Component Applications
            </h2>
            <p className="mt-3 text-base text-steel-600">
              Where Empirical roll-forming lines and custom profiles create high-volume manufacturing value.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {rollFormingLines.industries.map((ind, idx) => {
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
                    Custom profiles, channels, angles, and brackets.
                  </p>
                </div>
              );
            })}
          </div>

          {/* Child Product Applications Callout */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-900">
              Featured Application Areas:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-steel-700">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Building & Construction</span>
                Purlins, roof decking, wall tracks, studs, and decorative cladding sections.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Industrial Storage & Racking</span>
                Heavy-duty uprights, beams, pallet rack crossbars, and shelf panels.
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-bold text-steel-900 block mb-1">Solar & Clean Energy</span>
                C/Z strut channels, tracker arms, purlins, and ground mounting rails.
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
              {/* Left Column: Customization Approach */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-800">
                  <Sliders size={13} />
                  Tailored Engineering
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-steel-900">
                  How Every Machine Line is Configured
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-steel-600">
                  Because profile requirements vary across industries, Empirical India avoids one-size-fits-all machinery. Each line layout, station count, motor power, and cutoff system is calculated specifically for:
                </p>

                <div className="mt-6 space-y-3.5">
                  {[
                    "Profile Geometry: Section dimensions, bend radiuses, and required dimensional tolerances.",
                    "Raw Material: Steel grade, yield strength, strip thickness, and coating condition.",
                    "Operations: Pre-punching, post-punching, embossing, or flying shearing integration.",
                    "Production Target: Target linear speed, hourly throughput, and shift schedules.",
                    "Line Arrangement: Available floor footprint, coil payoff orientation, and exit stacking.",
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
                    <h3 className="text-lg font-bold">Buyer's RFQ Checklist</h3>
                  </div>
                  <p className="mt-1 text-xs text-steel-500">
                    Information needed to evaluate tooling feasible layout and provide a quotation:
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Component drawing (PDF, DXF, DWG, or STEP) with critical tolerances",
                      "Material grade (CRCA, GI, HR, SS, Aluminium) and yield strength",
                      "Strip thickness range and coil width requirements",
                      "Hole, slot, or notch pattern locations and tolerances",
                      "Target cut lengths and finished part handling preferences",
                      "Expected output volume (meters/month or shifts/day)",
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
                      Have a drawing ready? Upload it directly:
                    </p>
                    <Link
                      href="/contact?product=roll-forming-lines"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-navy-800 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-900"
                    >
                      <UploadCloud size={14} />
                      <span>Upload Drawing</span>
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
              Clear, transparent answers about machine configuration, tooling lead times, and enquiries.
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
            {/* Ambient pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <Send size={12} />
                  Technical Consultation
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {rollFormingLines.enquiryTitle}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {rollFormingLines.enquiryDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Confidential Drawing Review
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Direct Technical Assessment
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-cyan-400" />
                    Ambad MIDC, Nashik
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact?product=roll-forming-lines"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-4 text-sm font-bold text-navy-950 shadow-lg transition-all hover:bg-cyan-300 hover:shadow-cyan-400/20"
                  >
                    <span>Request Custom Line Quote</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                  >
                    <UploadCloud size={14} />
                    <span>Upload 2D/3D Files</span>
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
              href="/products/roll-forming-lines"
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
