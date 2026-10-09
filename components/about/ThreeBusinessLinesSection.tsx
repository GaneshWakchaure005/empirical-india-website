"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Settings,
  Package,
  Cylinder,
  Sun,
  CheckCircle2,
} from "lucide-react";
import ProductsAndSolutions from "@/data/03-products-and-solutions";

const productMeta: Record<
  string,
  {
    icon: typeof Settings;
    highlights: string[];
    buyerInput: string;
    gradient: string;
    cta: string;
    number: string;
  }
> = {
  "roll-forming-lines": {
    icon: Settings,
    cta: "Share a profile drawing or sample",
    highlights: [
      "Customer-defined open or closed profiles",
      "Forming stands, drive train & flying cut-off integration",
      "Configured for repeatable dimensional tolerances",
    ],
    buyerInput:
      "Profile cross-section drawing, material thickness & target production output.",
    gradient: "from-[#08b7a5] via-[#079b91] to-[#087d79]",
    number: "01",
  },
  "modular-metal-pallets": {
    icon: Package,
    cta: "Request a custom pallet review",
    highlights: [
      "Cold roll-formed C-channel load members",
      "Engineered for 2-way or 4-way forklift handling",
      "Hygienic, durable alternative to timber pallets",
    ],
    buyerInput:
      "Pallet dimensions, uniform distributed load (UDL), and handling environment.",
    gradient: "from-[#5b2ca3] via-[#4c2691] to-[#351d73]",
    number: "02",
  },
  "trolley-bag-tubes": {
    icon: Cylinder,
    cta: "Send a tube drawing or sample",
    highlights: [
      "Strict cut length & straightness limits",
      "Custom end finishes, holes & piercing features",
      "Consistent batch-to-batch outer dimensions",
    ],
    buyerInput:
      "Tube drawing or physical sample with required length, finish, and wall thickness.",
    gradient: "from-[#f58b31] via-[#ed6517] to-[#db3f08]",
    number: "03",
  },
  "solar-structures": {
    icon: Sun,
    cta: "Discuss your solar structure requirement",
    highlights: [
      "Custom structures for rooftop & ground-mounted systems",
      "Accurate dimensions, hole patterns & assembly fit",
      "Durable fabrication for long-term outdoor performance",
    ],
    buyerInput:
      "Solar panel layout or structural drawing with required dimensions, mounting type, and panel specifications.",
    gradient: "from-[#1769aa] via-[#155a94] to-[#103e6b]",
    number: "04",
  },
};

export default function ThreeBusinessLinesSection() {
  const businessLines = ProductsAndSolutions.products.map((p, index) => {
    const meta = productMeta[p.slug] || {
      icon: Settings,
      cta: "Explore specifications & request a quote",
      highlights: [
        "Custom engineered to client drawings",
        "High dimensional accuracy & repeatability",
        "Factory-tested prior to dispatch",
      ],
      buyerInput: "Component drawing, sample, and target production volume.",
      gradient: "from-[#0f172a] via-[#1e293b] to-[#334155]",
      number: `0${index + 1}`,
    };

    return {
      id: p.slug,
      title: p.name,
      href: p.href,
      summary: p.short_description,
      image: p.image,
      ...meta,
    };
  });

  /*
   * Distance between the cards when stacked.
   *
   * 80px  = first card sticks here
   * 104px = second card sticks here
   * 128px = third card sticks here
   * 152px = fourth card sticks here
   */
  const STACK_OFFSET = 24;
  const TOP_OFFSET = 80;

  return (
    <section className="relative bg-[#f7f9fc] py-20 sm:py-28 border-b border-steel-200/60">
      <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs font-bold text-navy-700 uppercase tracking-[0.2em]">
            Scope of Manufacture
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-steel-900 tracking-tight">
            Four manufacturing business lines
          </h2>

          <p className="mt-4 text-sm sm:text-base text-steel-600 leading-relaxed max-w-2xl mx-auto">
            Empirical India engineers and manufactures across distinct
            industrial verticals, with every solution configured around
            customer requirements.
          </p>
        </motion.div>

        {/* =====================================================
            STACK CONTAINER
            All sticky cards are direct children of this container.
            ===================================================== */}
        <div className="relative">
          {businessLines.map((line, index) => {
            const Icon = line.icon;
            const stickyTop = TOP_OFFSET + index * STACK_OFFSET;

            return (
              <div
                key={line.id}
                className="sticky"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 1,
                  marginBottom: "32px",
                }}
              >
                {/* ================= CARD ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={line.href}
                    className={`
      group
      relative
      block
      overflow-hidden
      rounded-[24px]
      sm:rounded-[32px]
      bg-gradient-to-br
      ${line.gradient}
      p-4
      sm:p-8
      lg:p-10
      shadow-[0_20px_60px_rgba(15,32,68,0.18)]
      transition-all
      duration-500
      hover:-translate-y-1
      hover:shadow-[0_30px_80px_rgba(15,32,68,0.25)]
    `}
                  >
                    {/* ================= DECORATIVE BACKGROUND ================= */}

                    <div className="absolute -top-28 -right-28 w-72 h-72 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125 pointer-events-none" />

                    <div className="absolute -bottom-32 -left-20 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

                    <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full border border-white/10 pointer-events-none" />


                    {/* ================= MAIN GRID ================= */}

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">

                      {/* ============================================================
          IMAGE
          Mobile: smaller
          Desktop: unchanged
          ============================================================ */}

                      <div className="order-1 lg:order-2 lg:col-span-5 w-full">
                        <div
                          className="
            relative
            w-full
            h-[170px]
            sm:h-[220px]
            lg:h-[380px]
            rounded-xl
            sm:rounded-3xl
            overflow-hidden
            bg-black/25
            border
            border-white/20
            shadow-[0_12px_30px_rgba(0,0,0,0.25)]
            backdrop-blur-md
            group-hover:border-white/35
            transition-all
            duration-500
          "
                        >
                          <Image
                            src={line.image}
                            alt={line.title}
                            fill
                            loading="eager"
                            sizes="(max-width: 1024px) 100vw, 460px"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

                          {/* Image Tag */}
                          <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[11px] font-medium shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Empirical Manufacturing Line</span>
                          </div>
                        </div>
                      </div>


                      {/* ============================================================
          CONTENT
          ============================================================ */}

                      <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col">


                        {/* ==========================================================
            TITLE + VERTICAL NUMBER
            ========================================================== */}

                        <div>

                          <div className="flex items-center gap-3 mb-2">

                            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.16em] text-white/55">
                              VERTICAL {line.number}
                            </span>

                            <span className="h-px w-8 bg-white/25" />

                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/45">
                              Manufacturing
                            </span>

                          </div>

                          <h3
                            className="
              text-[22px]
              sm:text-3xl
              lg:text-4xl
              font-extrabold
              text-white
              leading-[1.15]
              tracking-tight
            "
                          >
                            {line.title}
                          </h3>

                          <p
                            className="
              mt-2.5
              sm:mt-3
              text-[12px]
              sm:text-base
              text-white/85
              leading-relaxed
              max-w-2xl
              font-normal
            "
                          >
                            {line.summary}
                          </p>

                        </div>


                        {/* ==========================================================
            CAPABILITIES + BUYER INPUT
            ========================================================== */}

                        <div
                          className="
            mt-4
            sm:mt-6
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-3
            sm:gap-4
          "
                        >

                          {/* ---------------- CAPABILITIES ---------------- */}

                          <div
                            className="
              rounded-xl
              sm:rounded-2xl
              bg-white/10
              border
              border-white/15
              backdrop-blur-md
              p-3
              sm:p-4
            "
                          >

                            <span
                              className="
                text-[9px]
                sm:text-[11px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/65
                block
                mb-2
              "
                            >
                              Key Capabilities
                            </span>

                            <div className="space-y-1.5 sm:space-y-2">

                              {line.highlights.map((highlight) => (
                                <div
                                  key={highlight}
                                  className="
                    flex
                    items-start
                    gap-1.5
                    sm:gap-2
                    text-[10px]
                    sm:text-[13px]
                    text-white/90
                  "
                                >
                                  <CheckCircle2
                                    className="
                      w-3
                      h-3
                      sm:w-3.5
                      sm:h-3.5
                      shrink-0
                      mt-0.5
                      text-white
                    "
                                    strokeWidth={2.2}
                                  />

                                  <span className="leading-snug">
                                    {highlight}
                                  </span>
                                </div>
                              ))}

                            </div>

                          </div>


                          {/* ---------------- BUYER INPUT ---------------- */}

                          <div
                            className="
              rounded-xl
              sm:rounded-2xl
              bg-black/15
              border
              border-white/15
              backdrop-blur-md
              p-3
              sm:p-4
            "
                          >

                            <span
                              className="
                text-[9px]
                sm:text-[11px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-white/65
                block
                mb-2
              "
                            >
                              What We Need From You
                            </span>

                            <p
                              className="
                text-[10px]
                sm:text-[13px]
                text-white/85
                leading-relaxed
              "
                            >
                              {line.buyerInput}
                            </p>

                          </div>

                        </div>


                        {/* ==========================================================
            CTA
            ========================================================== */}

                        <div
                          className="
            mt-4
            sm:mt-7
            pt-3
            sm:pt-5
            border-t
            border-white/20
            flex
            items-center
            justify-between
          "
                        >

                          <div
                            className="
              inline-flex
              items-center
              gap-2
              px-3
              sm:px-5
              py-2
              sm:py-3
              rounded-xl
              sm:rounded-2xl
              bg-white/20
              hover:bg-white/30
              backdrop-blur-md
              border
              border-white/35
              text-white
              font-bold
              text-[11px]
              sm:text-sm
              shadow-[0_8px_24px_rgba(0,0,0,0.18)]
              transition-all
              duration-300
              group-hover:border-white/50
            "
                          >

                            <span>
                              {line.cta}
                            </span>

                            <ArrowRight
                              className="
                w-3.5
                h-3.5
                sm:w-4
                sm:h-4
                text-white
                group-hover:translate-x-1.5
                transition-transform
                shrink-0
              "
                            />

                          </div>

                        </div>

                      </div>

                    </div>

                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}