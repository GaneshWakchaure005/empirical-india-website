"use client";

import { motion } from "framer-motion";
import { FileCheck, Layers, Package, Cylinder, CheckCircle2 } from "lucide-react";

export default function EnquiryChecklistSection() {
  const checklists = [
    {
      title: "Roll-Forming Lines",
      icon: Layers,
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
      items: [
        "Outer cross-section geometry: round, oval, D-shape, custom",
        "Specific wall thickness and permissible thickness variation",
        "Exact cut lengths and straightness tolerance limits",
        "End fabrication: pierced slot holes, deburred ends, crimps",
        "Surface finish: natural mill, anodized, or powder-coated",
      ],
    },
  ];

  return (
    <section className="relative bg-[#f8fafc] py-16 sm:py-20 border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-navy-700 uppercase tracking-widest block mb-1">
            RFQ Checklist
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
            What helps us prepare an accurate proposal
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-steel-600 leading-relaxed font-normal">
            The more technical detail provided with your initial enquiry, the faster our engineering team can evaluate tooling geometry, cycle time, and manufacturing feasibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {checklists.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-2xl border border-steel-200/80 bg-white p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-navy-50 text-navy-800 border border-navy-100 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-steel-900">
                      {card.title}
                    </h4>
                  </div>

                  <ul className="space-y-2.5">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-steel-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-navy-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-steel-100 text-[11px] text-steel-400 font-mono">
                  Stage 01: Intake & Feasibility
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
