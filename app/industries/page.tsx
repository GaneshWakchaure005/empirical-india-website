import { siteSEO } from "@/data/seo";
import { pageMetadata } from "@/lib/seo";
import Industries from "@/data/08-industries";
import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustriesGridSection from "@/components/industries/IndustriesGridSection";
import IndustrySolutionsSection from "@/components/industries/IndustrySolutionsSection";
import IndustryWorkflowSection from "@/components/industries/IndustryWorkflowSection";
import IndustryCTASection from "@/components/industries/IndustryCTASection";

export const metadata = pageMetadata(siteSEO.pages.industries);

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section — "Engineered Solutions for Diverse Industries" */}
      <IndustriesHero
        eyebrow={Industries.hero.eyebrow}
        heading={Industries.hero.heading}
        description={Industries.hero.description}
        subDescription={Industries.hero.sub_description}
        pills={Industries.hero.pills}
        primaryCta={Industries.hero.primary_cta}
        secondaryCta={Industries.hero.secondary_cta}
      />

      {/* 2. Sector Cards Grid — "Supporting Industry Through Engineering Excellence" */}
      <IndustriesGridSection
        eyebrow={Industries.grid_section.eyebrow}
        heading={Industries.grid_section.heading}
        description={Industries.grid_section.description}
        industries={Industries.industries}
      />

      {/* 3. Relevant Solutions Section — 4 Core Industry Solutions */}
      <IndustrySolutionsSection
        eyebrow={Industries.solutions_section.eyebrow}
        heading={Industries.solutions_section.heading}
        description={Industries.solutions_section.description}
        solutions={Industries.solutions_section.solutions}
      />

      {/* 4. Engineering Workflow — "Built Around Your Application" */}
      <IndustryWorkflowSection
        eyebrow={Industries.engineering_workflow.eyebrow}
        heading={Industries.engineering_workflow.heading}
        description={Industries.engineering_workflow.description}
        steps={Industries.engineering_workflow.steps}
      />

      {/* 5. Clear Contact Us / RFQ CTA Section — "Let's Discuss Your Requirements" */}
      <IndustryCTASection cta={Industries.cta_section} />
    </div>
  );
}
