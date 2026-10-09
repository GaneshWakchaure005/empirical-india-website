"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: readonly FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-navy-200 bg-white shadow-md shadow-slate-900/5 ring-1 ring-navy-100"
                : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <button
              type="button"
              id={`faq-btn-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 rounded-2xl"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isOpen
                      ? "bg-navy-700 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span
                  className={`text-base font-bold leading-snug tracking-tight transition-colors sm:text-lg ${
                    isOpen ? "text-navy-900" : "text-steel-800"
                  }`}
                >
                  {faq.question}
                </span>
              </div>

              <span
                className={`ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                  isOpen
                    ? "rotate-180 bg-navy-50 text-navy-700"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
                aria-hidden="true"
              >
                <ChevronDown size={18} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100 px-5 pb-6 pt-3 sm:px-6 sm:pb-6 text-sm sm:text-base leading-7 text-steel-600 pl-[48px] sm:pl-[56px]">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
