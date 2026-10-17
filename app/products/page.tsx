import type { Metadata } from "next";
import ProductsAndSolutions from "@/data/03-products-and-solutions";
import ProductsPageHero from "@/components/products/ProductsPageHero";
import BusinessLinesSection from "@/components/home/BusinessLinesSection";
import RFQRequirementsGuide from "@/components/products/RFQRequirementsGuide";
import ProductsWorkflowSection from "@/components/products/ProductsWorkflowSection";
import ProductsFAQSection from "@/components/products/ProductsFAQSection";
import ProductsCTA from "@/components/products/ProductsCTA";

export const metadata: Metadata = {
  title: ProductsAndSolutions.seo.title,
  description: ProductsAndSolutions.seo.description,
  keywords: ProductsAndSolutions.seo.keywords as unknown as string[],
  alternates: {
    canonical: ProductsAndSolutions.seo.canonical,
  },
  openGraph: {
    title: ProductsAndSolutions.seo.title,
    description: ProductsAndSolutions.seo.description,
    url: ProductsAndSolutions.seo.canonical,
    siteName: "Empirical India",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section — Engineering-Led Manufacturing Verticals */}
      <ProductsPageHero
        eyebrow={ProductsAndSolutions.hero.eyebrow}
        heading={ProductsAndSolutions.hero.heading}
        description={ProductsAndSolutions.hero.description}
        trustMetrics={ProductsAndSolutions.hero.trust_metrics}
        pills={ProductsAndSolutions.hero.pills}
      />

      {/* 2. Four Core Product Line Cards (matching Home page) */}
      <BusinessLinesSection />

      {/* 3. RFQ Specification Guidelines — What to Submit with Your RFQ */}
      <RFQRequirementsGuide
        eyebrow={ProductsAndSolutions.rfq_guidelines.eyebrow}
        heading={ProductsAndSolutions.rfq_guidelines.heading}
        description={ProductsAndSolutions.rfq_guidelines.description}
        categories={ProductsAndSolutions.rfq_guidelines.categories}
      />

      {/* 4. 6-Step Engineering & Delivery Workflow — From Drawing to Dispatch */}
      <ProductsWorkflowSection
        eyebrow={ProductsAndSolutions.workflow.eyebrow}
        heading={ProductsAndSolutions.workflow.heading}
        description={ProductsAndSolutions.workflow.description}
        steps={ProductsAndSolutions.workflow.steps}
      />

      {/* 5. Technical FAQs — Non-fabricated Engineering Answers */}
      <ProductsFAQSection faqs={ProductsAndSolutions.faqs} />

      {/* 6. Final Quote Request & Drawing Submission CTA */}
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
