import type { Metadata } from "next";
import Industries from "@/data/08-industries";
import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustriesGridSection from "@/components/industries/IndustriesGridSection";
import IndustrySolutionsSection from "@/components/industries/IndustrySolutionsSection";
import IndustryWorkflowSection from "@/components/industries/IndustryWorkflowSection";
import IndustryCTASection from "@/components/industries/IndustryCTASection";

export const metadata: Metadata = {
  title: Industries.seo.title,
  description: Industries.seo.description,
  alternates: {
    canonical: Industries.seo.canonical,
  },
  openGraph: {
    title: Industries.seo.title,
    description: Industries.seo.description,
    url: Industries.seo.canonical,
    siteName: "Empirical India",
    type: "website",
  },
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section — "Engineering Solutions for Every Industry" */}
      <IndustriesHero
        eyebrow={Industries.hero.eyebrow}
        heading={Industries.hero.heading}
        description={Industries.hero.description}
        pills={Industries.hero.pills}
      />

      {/* 2. Sector Cards Grid — Solar Energy, PEB, Infrastructure, Agriculture, Industrial Manufacturing */}
      <IndustriesGridSection industries={Industries.industries} />

      {/* 3. Relevant Solutions Section — 3 Core Manufacturing Verticals */}
      <IndustrySolutionsSection
        eyebrow={Industries.solutions_section.eyebrow}
        heading={Industries.solutions_section.heading}
        description={Industries.solutions_section.description}
        solutions={Industries.solutions_section.solutions}
      />

      {/* 4. Engineering Workflow — From Drawing to Verified Production */}
      <IndustryWorkflowSection
        eyebrow={Industries.engineering_workflow.eyebrow}
        heading={Industries.engineering_workflow.heading}
        description={Industries.engineering_workflow.description}
        steps={Industries.engineering_workflow.steps}
      />

      {/* 5. Clear Contact Us / RFQ CTA Section */}
      <IndustryCTASection cta={Industries.cta_section} />
    </div>
  );
}
