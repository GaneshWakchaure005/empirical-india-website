"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Package,
  Cylinder,
  Sun,
  CheckCircle2,
} from "lucide-react";

export default function EnquiryChecklistSection() {
  const checklists = [
  {
    title: "Roll-Forming Lines",
    icon: Layers,
    number: "01",
    imgurl: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
    gradient: "from-[#08b7a5] via-[#079b91] to-[#087d79]",
    items: [
      "2D profile cross-section drawing with critical dimensions & bend radii",
      "Raw material grade (CRCA, Galvanised Steel, HR, SS, Aluminium)",
      "Material thickness (gauge) range and coil width",
      "Inline operations needed: punching, embossing, flying cut-off",
      "Target production speed (m/min) or monthly linear metres",
    ],
  },
  {
    title: "Modular Metal Pallets",
    icon: Package,
    number: "02",
    imgurl: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
    gradient: "from-[#5b2ca3] via-[#4c2691] to-[#351d73]",
    items: [
      "Overall length, width, and overall height (mm)",
      "Uniform Distributed Load (UDL) in kg (Static & Dynamic)",
      "Racking storage requirements (beam rack or drive-in)",
      "Handling equipment: 2-way vs 4-way forklift entry",
      "Operating environment: indoor warehouse, cleanroom, cold chain",
    ],
  },
  {
    title: "Trolley-Bag Tubes",
    icon: Cylinder,
    number: "03",
    imgurl: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
    gradient: "from-[#f58b31] via-[#ed6517] to-[#db3f08]",
    items: [
      "Outer cross-section geometry: round, oval, D-shape, custom",
      "Specific wall thickness and permissible thickness variation",
      "Exact cut lengths and straightness tolerance limits",
      "End fabrication: pierced slot holes, deburred ends, crimps",
      "Surface finish: natural mill, anodized, or powder-coated",
    ],
  },
  {
    title: "Solar Structures",
    icon: Sun,
    number: "04",
    imgurl: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
    gradient: "from-[#1769aa] via-[#155a94] to-[#103e6b]",
    items: [
      "Solar panel dimensions, layout, orientation and mounting configuration",
      "Rooftop, ground-mounted, carport, or other installation type",
      "Required structure dimensions, tilt angle and mounting height",
      "Site conditions including wind load, terrain and installation environment",
      "Material, coating and corrosion-resistance requirements",
    ],
  },
];

  /*
   * Stacking configuration
   *
   * Card 1 → 70px
   * Card 2 → 88px
   * Card 3 → 106px
   * Card 4 → 124px
   *
   * This creates the visible layered effect while scrolling.
   */
  const TOP_OFFSET = 70;
  const STACK_OFFSET = 18;

  return (
    <section className="relative bg-[#f8fafc] py-16 sm:py-24 border-b border-steel-200/60 overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] sm:text-xs font-bold text-navy-700 uppercase tracking-[0.2em] block mb-2">
            RFQ Checklist
          </span>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-steel-900 tracking-tight">
            What helps us prepare an accurate proposal
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-steel-600 leading-relaxed font-normal max-w-xl mx-auto">
            The more technical detail provided with your initial enquiry, the
            faster our engineering team can evaluate tooling geometry, cycle
            time, and manufacturing feasibility.
          </p>
        </motion.div>


        {/* =====================================================
            STACKING CARDS

            IMPORTANT:
            The sticky cards are direct children of this container.
        ===================================================== */}

        <div className="relative">
          {checklists.map((card, idx) => {
            const Icon = card.icon;
            const stickyTop = TOP_OFFSET + idx * STACK_OFFSET;

            return (
              <div
                key={card.title}
                className="sticky"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: idx + 1,
                  marginBottom: "24px",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`
              group relative overflow-hidden
              rounded-[24px] sm:rounded-[28px]
              bg-gradient-to-br ${card.gradient}
              p-5 sm:p-7 lg:p-8
              shadow-[0_20px_55px_rgba(15,32,68,0.18)]
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_28px_70px_rgba(15,32,68,0.23)]
            `}
                  >
                    {/* Decorative Background */}
                    <div
                      className="
                pointer-events-none absolute -top-28 -right-28
                w-72 h-72 rounded-full bg-white/10 blur-3xl
                transition-transform duration-700 group-hover:scale-125
              "
                    />

                    <div
                      className="
                pointer-events-none absolute -bottom-24 -left-16
                w-48 h-48 rounded-full border border-white/10
              "
                    />

                    <div
                      className="
                pointer-events-none absolute -bottom-14 -left-6
                w-28 h-28 rounded-full border border-white/10
              "
                    />

                    {/* Responsive Layout */}
                    <div className="relative z-10 flex flex-col md:flex-row md:items-stretch gap-5 md:gap-8">
                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        {/* Top Row */}
                        <div className="flex items-start justify-between gap-4">
                          {/* Icon */}
                          <div
                            className="
                      flex items-center justify-center
                      w-10 h-10 sm:w-12 sm:h-12
                      rounded-xl sm:rounded-2xl
                      bg-white/15 border border-white/25
                      backdrop-blur-md shadow-sm shrink-0
                    "
                          >
                            <Icon
                              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                              strokeWidth={1.8}
                            />
                          </div>

                          {/* Number */}
                          <span
                            className="
                      font-mono text-[10px] sm:text-xs font-bold
                      tracking-[0.18em] text-white/50
                    "
                          >
                            0{card.number}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="mt-5 sm:mt-6">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="
                        text-[9px] sm:text-[10px] font-bold
                        uppercase tracking-[0.18em] text-white/55
                      "
                            >
                              What to provide
                            </span>

                            <span className="w-5 h-px bg-white/25" />
                          </div>

                          <h4
                            className="
                      text-xl sm:text-2xl lg:text-3xl
                      font-extrabold text-white tracking-tight leading-tight
                    "
                          >
                            {card.title}
                          </h4>
                        </div>

                        {/* Checklist */}
                        <div
                          className="
                    mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2
                    gap-x-8 gap-y-3
                  "
                        >
                          {card.items.map((item) => (
                            <div
                              key={item}
                              className="
                        flex items-start gap-2.5
                        text-[11px] sm:text-xs lg:text-[13px]
                        text-white/90 leading-relaxed
                      "
                            >
                              <CheckCircle2
                                className="
                          w-3.5 h-3.5 sm:w-4 sm:h-4
                          shrink-0 mt-0.5 text-white
                        "
                                strokeWidth={2}
                              />

                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div
                          className="
                    mt-5 sm:mt-6 pt-3 sm:pt-4
                    border-t border-white/15
                    flex items-center justify-between gap-3
                  "
                        >
                          <span
                            className="
                      text-[9px] sm:text-[10px] text-white/50
                      font-mono uppercase tracking-[0.12em]
                    "
                          >
                            Stage 01: Intake & Feasibility
                          </span>

                          <span
                            className="
                      text-[9px] sm:text-[10px] font-semibold
                      uppercase tracking-wider text-white/60
                    "
                          >
                            Technical RFQ
                          </span>
                        </div>
                      </div>

                      {/* Image: top on mobile, right on desktop */}
                      {card.imgurl && (
                        <div
                          className="
                    order-first md:order-none
                    relative w-full h-48 sm:h-56
                    md:w-[35%] md:min-h-[320px] md:h-auto
                    shrink-0 overflow-hidden rounded-2xl
                    border border-white/15
                  "
                        >
                          <img
                            src={card.imgurl}
                            alt={card.title}
                            loading="eager"
                            className="
                      absolute inset-0 w-full h-full
                      object-cover transition-transform duration-700
                      group-hover:scale-105
                    "
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}