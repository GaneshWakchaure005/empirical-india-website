// Auto-generated from Empirical India Website Content Brief
// Edit this file to update centralized website content.

export const Home = {
  page: "Home",
  source_pages: [3],

  purpose:
    "The home page should immediately communicate Empirical India's three core business lines, engineering capability, customization approach, and provide a clear path for buyers to start a technical conversation.",

  hero: {
    slides: [
      {
        id: "roll-forming",
        eyebrow: "ROLL FORMING SOLUTIONS",
        headline: "Engineered to transform with precision.",
        supporting_copy:
          "Custom automated roll-forming lines engineered around your profile, material, production speed, and process requirements — from coil entry to finished section.",
        specs: "Custom Profiles • Automated Lines • High Repeatability",
        productline: "Custom Roll Forming",
        image: {
          src: "/images/bg2.png",
          alt: "Empirical India custom automated roll-forming machine line",
        },

        primary_button: "Explore Products",
        secondary_button: "Get in Touch",
      },

      {
        id: "metal-pallets",
        eyebrow: "HEAVY-DUTY LOGISTICS",
        headline: "Built for demanding loads with modular strength.",
        supporting_copy:
          "Heavy-duty modular metal pallets engineered around your product, load case, handling method, and storage requirements — combining strength, repeatability, and practical design.",
        specs: "High Load Capacity • Modular Design • C-Channel Strength",
        productline: "Modular Metal Pallets",
        image: {
          src: "/images/bg3.png",
          alt: "Empirical India modular metal pallets for industrial material handling",
        },

        primary_button: "Explore Products",
        secondary_button: "Get in Touch",
      },

      {
        id: "trolley-bag-tubes",
        eyebrow: "TUBE MANUFACTURING",
        headline: "Precision tubes for products that move with you.",
        supporting_copy:
          "Manufactured to your approved section, material, length, finish, and dimensional requirements for trolley-bag applications.",
        specs: "Lightweight • Strong • Precise",
        productline: "Trolley Bag Tubes",
        image: {
          src: "/images/bg4.png",
          alt: "Precision metal tubes manufactured for trolley-bag applications",
        },

        primary_button: "Explore Products",
        secondary_button: "Get in Touch",
      },
    ],

    // Optional shared label shown above the changing hero content
    transition_label: "Empirical India",

    // Hero navigation labels
    navigation: [
      {
        id: "roll-forming",
        label: "Roll Forming",
      },
      {
        id: "metal-pallets",
        label: "Metal Pallets",
      },
      {
        id: "trolley-bag-tubes",
        label: "Trolley Bag Tubes",
      },
    ],

    // Suggested behavior for the frontend
    autoplay: true,
    autoplay_interval: 4000,
  },

  three_business_line_cards: [
    {
      capability: "Custom roll-forming lines",
      copy:
        "Automated production lines configured around the profile, material, operations, and output required. From coil handling and forming to optional punching, cut-off, and outfeed equipment, the line scope is defined for each project.",
    },
    {
      capability: "Modular metal pallets",
      copy:
        "Heavy-duty, configurable pallets made with cold roll-formed C-channel or other approved modular profiles. Designed around the product, handling method, storage pattern, and load case.",
    },
    {
      capability: "Tubes for trolley bags",
      copy:
        "Tubes made to the approved section, material, length, finish, and dimensional requirements of trolley-bag manufacturers.",
    },
  ],

  sections: [
    {
      title: "From requirement to production",
      content:
        "Application review, technical definition, engineering and manufacture, inspection, dispatch.",
      implementation_note:
        "Validate the exact internal process before describing it as a standard workflow.",
    },

    {
      title: "Selected customer names",
      implementation_note:
        "Show as a restrained logo strip only after the relationship, name spelling, and logo use are approved.",
    },

    {
      title: "Featured project or product story",
      implementation_note:
        "Use one real application photo and a concise, approved outcome.",
    },

    {
      title: "Company proof row",
      implementation_note:
        "Use verified facts such as years in operation, installed lines, product ranges, or markets served. Leave it out until the numbers are confirmed and documented.",
    },

    {
      title: "Final enquiry prompt",
      implementation_note:
        "Provide a short path to Contact / Request a Quote.",
    },
  ],

  seo: {
    page_title:
      "Empirical India | Roll Forming Lines, Metal Pallets & Tubes",

    meta_description:
      "Empirical India designs custom automated roll-forming lines and manufactures modular metal pallets and precision tubes to customer requirements. Share a drawing, sample, or application to start a technical discussion.",
  },
} as const;

export default Home;