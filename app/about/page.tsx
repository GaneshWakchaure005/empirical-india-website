import type { Metadata } from "next";
import About from "@/data/02-about";
import AboutHero from "@/components/about/AboutHero";
import ManufacturingVideoSection from "@/components/about/ManufacturingVideoSection";
import ThreeBusinessLinesSection from "@/components/about/ThreeBusinessLinesSection";
import CompanyOverviewSection from "@/components/about/CompanyOverviewSection";
import FacilityInfrastructureSection from "@/components/about/FacilityInfrastructureSection";
import TimelineSection from "@/components/about/TimelineSection";
import LeadershipSection from "@/components/about/LeadershipSection";
import AboutCTASection from "@/components/about/AboutCTASection";

export const metadata: Metadata = {
  title: About.seo.title,
  description: About.seo.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: About.seo.title,
    description: About.seo.description,
    url: "/about",
    siteName: "Empirical India",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero — Authentic Company Introduction & Core Mandate */}
      <AboutHero introduction={About.page_introduction} />

      {/* 2. Manufacturing Video Showcase — Real Machinery & Plant in Action */}
      <ManufacturingVideoSection videoConfig={About.video_highlight} />

      {/* 3. The Three Distinct Manufacturing Verticals */}
      <ThreeBusinessLinesSection />

      {/* 4. Engineering Approach & Core Methodology */}
      <CompanyOverviewSection
        approach={About.our_approach}
        stats={About.company_stats}
      />

      {/* 5. Nashik Facility Layout & Production Bays */}
      <FacilityInfrastructureSection
        location={About.facility_overview.location}
        cluster={About.facility_overview.cluster}
        bays={About.facility_overview.bays}
      />

      {/* 6. Verified Company Milestones Timeline */}
      <TimelineSection milestones={About.timeline_milestones} />

      {/* 7. Leadership & Governance (strictly following AGENTS.md guidelines) */}
      <LeadershipSection
        sectionTitle={About.leadership.section_title}
        disclaimer={About.leadership.disclaimer}
        members={About.leadership.members}
      />

      {/* 8. Final Engineering Enquiry CTA */}
      <AboutCTASection />
    </div>
  );
}
