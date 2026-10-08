import { Suspense } from "react";
import type { Metadata } from "next";
import ContactRFQ from "@/data/12-contact-rfq";
import ContactHero from "@/components/contact/ContactHero";
import ContactRFQForm from "@/components/contact/ContactRFQForm";
import PlantLocationCard from "@/components/contact/PlantLocationCard";
import EnquiryChecklistSection from "@/components/contact/EnquiryChecklistSection";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: ContactRFQ.seo.title,
  description: ContactRFQ.seo.description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: ContactRFQ.seo.title,
    description: ContactRFQ.seo.description,
    url: "/contact",
    siteName: "Empirical India",
    type: "website",
  },
};

function FormFallback() {
  return (
    <div className="rounded-3xl border border-steel-200/90 bg-white p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
      <Loader2 className="w-8 h-8 animate-spin text-navy-700 mb-3" />
      <p className="text-sm text-steel-500 font-medium">
        Loading Technical Enquiry Form...
      </p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <ContactHero
        introduction={ContactRFQ.page_introduction}
        email={ContactRFQ.company_info.email}
        plantHours={ContactRFQ.company_info.plant_hours}
      />

      {/* 2. Main Enquiry & Location Section */}
      <section className="relative bg-white py-14 sm:py-20 border-b border-steel-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Interactive RFQ Form */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <span className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  Online Technical RFQ
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
                  Submit drawings & specifications
                </h2>
                <p className="text-xs sm:text-sm text-steel-500 mt-1">
                  Fill in your production details below or select a specific capability. All submissions are reviewed directly by our Nashik engineering team.
                </p>
              </div>

              <Suspense fallback={<FormFallback />}>
                <ContactRFQForm
                  businessLines={ContactRFQ.business_lines}
                  uploadGuidance={ContactRFQ.upload_guidance}
                  consentNote={ContactRFQ.consent_note}
                />
              </Suspense>
            </div>

            {/* Right: Plant Location Card & Embedded Google Maps */}
            <div className="lg:col-span-4 sticky top-24">
              <PlantLocationCard companyInfo={ContactRFQ.company_info} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Enquiry Checklist Guidance */}
      <EnquiryChecklistSection />
    </div>
  );
}
