import ContactRFQ from "@/data/12-contact-rfq";
import { getPublishedProducts } from "@/lib/products";
import ContactRFQForm from "@/components/contact/ContactRFQForm";

export default async function DynamicProductRFQForm() {
  const categories = await getPublishedProducts();
  const businessLines = categories.map((category, index) => {
    const existing = ContactRFQ.business_lines.find((line) => line.id === category.slug);
    return {
      id: category.slug, name: category.name, badge: String(index + 1).padStart(2, "0"),
      tagline: category.tagline,
      questions: existing?.questions || category.keyBenefits,
      placeholder_requirement: existing?.placeholder_requirement || category.enquiryDescription,
    };
  });
  const general = ContactRFQ.business_lines.find((line) => line.id === "general-engineering");
  return <ContactRFQForm businessLines={general ? [...businessLines, general] : businessLines}
    uploadGuidance={ContactRFQ.upload_guidance} consentNote={ContactRFQ.consent_note} />;
}
