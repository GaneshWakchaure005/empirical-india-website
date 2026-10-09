// Centralized website content for Contact & Request a Quote (RFQ)
// Follows AGENTS.md Section 8 and Section 9

export const ContactRFQ = {
  page: "Contact / Request a Quote",
  route: "/contact",
  source_pages: [12],

  seo: {
    title: "Contact & Request a Quote | Empirical India",
    description:
      "Submit drawing, sample, or specifications for custom roll-forming lines, modular metal pallets, or trolley-bag tubes. Our engineering team in Nashik will review and respond.",
  },

  page_introduction:
    "Every technical enquiry begins by understanding your part, production requirements, and operating conditions. Share your profile drawing, pallet load case, or tube sample to begin a technical discussion with our engineering team in Nashik.",

  company_info: {
    name: "Empirical India",
    facility: "Roll Forming Machine Manufacturer & Metal Fabricator",
    location: "Nashik, Maharashtra, India",
    email: "info@empiricalindia.com",
    plant_hours: "Monday – Saturday: 9:00 AM – 6:30 PM IST",
    sunday: "Closed",
    google_maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.3262335011021!2d73.72461784299102!3d19.965087499705678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdded1969be5401%3A0xef43b713a1b067b6!2sEmpirical%20India%2CRoll%20Forming%20Machine%20Manufacturer!5e1!3m2!1sen!2sin!4v1791480573816!5m2!1sen!2sin",
  },

  business_lines: [
    {
      id: "roll-forming-lines",
      name: "Custom Roll-Forming Lines",
      badge: "Machinery",
      tagline: "Automated lines for customer-defined profiles",
      questions: [
        "What is the profile shape or drawing cross-section?",
        "What is the strip material, thickness (gauge), and coil width?",
        "What are required operations (punching, flying cut-off, embossing)?",
        "What is your target line speed or production volume?",
      ],
      placeholder_requirement:
        "e.g., We require an automated roll-forming line for a C-channel section, 1.5mm galvanised steel, flying hydraulic cut-off, target speed 15 m/min.",
    },
    {
      id: "modular-metal-pallets",
      name: "Modular Metal Pallets",
      badge: "Storage & Handling",
      tagline: "Heavy-duty cold roll-formed metal pallets",
      questions: [
        "What are the outer pallet dimensions (L x W x H in mm)?",
        "What is the required Uniform Distributed Load (UDL in kg)?",
        "What is the handling method (2-way / 4-way forklift / pallet truck)?",
        "What is the storage mode (floor stacking / drive-in / beam racking)?",
      ],
      placeholder_requirement:
        "e.g., Seeking heavy-duty metal pallets, 1200 x 1000 mm, 1500 kg racking load, 4-way fork entry, cold roll-formed C-channel deck.",
    },
    {
      id: "trolley-bag-tubes",
      name: "Tubes for Trolley Bags",
      badge: "Precision Tubular",
      tagline: "Custom section, length & finish for bag makers",
      questions: [
        "What is the tube cross-section (round, oval, D-shape, rectangular)?",
        "What is the cut length and tolerance required?",
        "What are required end conditions (pierced holes, swaged ends)?",
        "What is the required surface finish or coating?",
      ],
      placeholder_requirement:
        "e.g., Require aluminium/steel tubes for luggage frame, cut length 480mm (+/-0.5mm), pierced slot at both ends, smooth anodized/powder-coated finish.",
    },
    {
      id: "general-engineering",
      name: "General Engineering Enquiry",
      badge: "Technical Consultation",
      tagline: "Consult our engineering team on feasibility",
      questions: [
        "What is the component or application you are developing?",
        "Do you have a preliminary drawing or physical sample?",
        "What are your target batch sizes or delivery timelines?",
      ],
      placeholder_requirement:
        "e.g., We have a custom cold-formed metal part and would like to review tooling feasibility and production scope with your team.",
    },
  ],

  upload_guidance: {
    title: "Technical File Attachments",
    formats: "Accepted formats: PDF, DWG, DXF, STEP, STP, PNG, JPG (Max 15MB)",
    description:
      "Attaching a 2D cross-section drawing with tolerances or a 3D CAD model helps our engineering team evaluate feasibility and respond faster.",
  },

  consent_note:
    "By submitting this enquiry, you agree to allow Empirical India to review the provided technical requirements to prepare a response. Confidential drawings and proprietary data will be handled securely.",
} as const;

export default ContactRFQ;
