import { siteSEO } from "@/data/seo";
import { pageMetadata } from "@/lib/seo";
import ProductsAndSolutions from "@/data/03-products-and-solutions";
import ProductsPageHero from "@/components/products/ProductsPageHero";
import { Suspense } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import DynamicBusinessLines from "@/components/products/DynamicBusinessLines";
import ProductsManufacturingFocus from "@/components/products/ProductsManufacturingFocus";
import RFQRequirementsGuide from "@/components/products/RFQRequirementsGuide";
import ProductsWorkflowSection from "@/components/products/ProductsWorkflowSection";
import ProductsFAQSection from "@/components/products/ProductsFAQSection";
import ProductsCTA from "@/components/products/ProductsCTA";

export const metadata = pageMetadata(siteSEO.pages.products);

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section — Centered with SEO-focused Heading & Scope */}
      <ProductsPageHero
        eyebrow={ProductsAndSolutions.hero.eyebrow}
        heading={ProductsAndSolutions.hero.heading}
        description={ProductsAndSolutions.hero.description}
        trustMetrics={ProductsAndSolutions.hero.trust_metrics}
        pills={ProductsAndSolutions.hero.pills}
      />

      {/* 2. Manufacturing Focus Overview — Roll Forming Machines, Products, Rollers, Pallets, Tubes */}
      <ProductsManufacturingFocus
        eyebrow={ProductsAndSolutions.manufacturing_focus.eyebrow}
        heading={ProductsAndSolutions.manufacturing_focus.heading}
        description={ProductsAndSolutions.manufacturing_focus.description}
        items={ProductsAndSolutions.manufacturing_focus.items}
      />

      {/* 3. Four Core Product Line Cards (Dynamic from Database or fallback) */}
      <Suspense fallback={<ContentLoader kind="products" />}>
        <DynamicBusinessLines centeredHeader={true} />
      </Suspense>

      {/* 4. RFQ Specification Guidelines — What to Submit with Your RFQ */}
      <RFQRequirementsGuide
        eyebrow={ProductsAndSolutions.rfq_guidelines.eyebrow}
        heading={ProductsAndSolutions.rfq_guidelines.heading}
        description={ProductsAndSolutions.rfq_guidelines.description}
        categories={ProductsAndSolutions.rfq_guidelines.categories}
      />

      {/* 5. 6-Step Engineering & Delivery Workflow — From Drawing to Dispatch */}
      <ProductsWorkflowSection
        eyebrow={ProductsAndSolutions.workflow.eyebrow}
        heading={ProductsAndSolutions.workflow.heading}
        description={ProductsAndSolutions.workflow.description}
        steps={ProductsAndSolutions.workflow.steps}
      />

      {/* 6. Technical FAQs — Non-fabricated Engineering Answers */}
      <ProductsFAQSection faqs={ProductsAndSolutions.faqs} />

      {/* 7. Final Quote Request & Drawing Submission CTA */}
      <ProductsCTA
        eyebrow={ProductsAndSolutions.cta_section.eyebrow}
        heading={ProductsAndSolutions.cta_section.heading}
        description={ProductsAndSolutions.cta_section.description}
        primaryCta={ProductsAndSolutions.cta_section.primary_cta}
        secondaryCta={ProductsAndSolutions.cta_section.secondary_cta}
      />
    </div>
  );
}
