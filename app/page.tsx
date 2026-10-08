import type { Metadata } from "next";
import Home from "@/data/01-home";
import About from "@/data/02-about";
import QualityManufacturing from "@/data/07-quality-manufacturing";
import Projects from "@/data/09-projects";
import HeroSection from "@/components/home/HeroSection";
import BusinessLinesSection from "@/components/home/BusinessLinesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ApproachSection from "@/components/home/ApproachSection";
import CustomersSection from "@/components/home/CustomersSection";
import EnquiryCTASection from "@/components/home/EnquiryCTASection";

export const metadata: Metadata = {
  title: Home.seo.page_title,
  description: Home.seo.meta_description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: Home.seo.page_title,
    description: Home.seo.meta_description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — auto-sliding dynamic hero showcasing three business lines */}
      <HeroSection hero={Home.hero} />

      {/* 2. Three Business Lines — the core product/machinery verticals */}
      <BusinessLinesSection cards={Home.three_business_line_cards} />

      {/* 3. From Requirement to Production — quality process overview */}
      <ProcessSection
        stages={QualityManufacturing.suggested_process_graphic}
        sectionTitle={Home.sections[0].title}
        sectionContent={Home.sections[0].content}
      />

      {/* 4. About / Approach — engineering credibility */}
      <ApproachSection
        intro={About.page_introduction}
        approach={About.our_approach}
        values={About.suggested_values}
        videoConfig={About.video_highlight}
      />

      {/* 5. Customer Names — text only, per content governance rules.
              Logo approval required before displaying brand marks. */}
      <CustomersSection
        customerNames={Projects.customer_names_and_logo_handling.supplied_customer_list}
        verificationNote={Projects.customer_names_and_logo_handling.verification_notes[0]}
      />

      {/* 6. Final Enquiry CTA — product-specific paths + general contact */}
      <EnquiryCTASection />
    </>
  );
}
