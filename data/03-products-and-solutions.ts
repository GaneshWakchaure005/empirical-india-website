// Centralized data file for Empirical India Products & Solutions Page
// Strictly adheres to AGENTS.md guidelines and client content rules.

export interface ProductLineOverview {
  name: string;
  slug: string;
  headline: string;
  short_description: string;
  image: string;
  href: string;
  internal_href: string;
  rfq_href: string;
  badge: string;
  category_number: string;
  types: readonly string[];
  key_specs: readonly string[];
  buyer_input_summary: string;
}

export interface CatalogProductItem {
  id: string;
  name: string;
  slug: string;
  categorySlug: "roll-forming-lines" | "modular-metal-pallets" | "trolley-bag-tubes" | "solar-structures";
  categoryName: string;
  shortDescription: string;
  image: string;
  badge: string;
  href: string;
  rfqHref: string;
  highlights: readonly string[];
  primarySpec: { label: string; value: string };
}

export interface RFQInputCategory {
  id: string;
  title: string;
  cta: string;
  rfq_link: string;
  inputs: readonly {
    label: string;
    details: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const ProductsAndSolutions = {
  page: "Products and Solutions",
  route: "/products",
  source_pages: [5],

  seo: {
    title: "Custom Roll-Forming Lines, Modular Metal Pallets & Tubes | Products | Empirical India",
    description:
      "Explore Empirical India's engineering-led manufacturing solutions: custom roll-forming lines, heavy-duty modular metal pallets, precision trolley-bag tubes, and solar mounting structures. Built to customer drawings and verified specifications.",
    canonical: "/products",
    keywords: [
      "roll forming lines",
      "custom roll forming machine",
      "modular metal pallets",
      "trolley bag tubes",
      "solar mounting structures",
      "cold roll forming lines",
      "punching and shearing tools",
      "industrial manufacturing Nashik",
      "Empirical India products"
    ],
  },

  hero: {
    eyebrow: "ENGINEERING-LED MANUFACTURING",
    heading: "Precision Machinery & Made-to-Requirement Metal Products",
    description:
      "Empirical India designs custom automated roll-forming lines and manufactures modular metal pallets and precision tubes tailored directly to your approved profile drawings, load cases, material grades, and production throughput targets.",
    trust_metrics: [
      {
        label: "Tooling Heritage",
        value: "30+ Years",
        detail: "Precision roll-pass & die design expertise",
      },
      {
        label: "Line Architecture",
        value: "100% Custom",
        detail: "Engineered around approved profile geometry",
      },
      {
        label: "Verification Standard",
        value: "Factory Trials",
        detail: "Trial runs & dimensional checks prior to dispatch",
      },
      {
        label: "Manufacturing Scope",
        value: "4 Verticals",
        detail: "Forming lines, metal pallets, luggage tubes & solar",
      },
    ] as const,
    pills: [
      "Custom Roll-Forming Lines",
      "Modular Metal Pallets",
      "Trolley-Bag Tubes",
      "Solar Structures",
    ] as const,
  },

  // Primary 4 business lines for backwards compatibility with FourBusinesslines.tsx and high-level overviews
  products: [
    {
      name: "Roll-forming lines",
      slug: "roll-forming-lines",
      headline: "Precision-engineered profile forming systems",
      short_description:
        "Custom automated lines for forming customer-defined metal profiles. Configuration depends on material, section geometry, required operations, output, and factory conditions.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      href: "/products/roll-forming-lines",
      internal_href: "/products/roll-forming-lines",
      rfq_href: "/contact?product=roll-forming-lines",
      badge: "5 Product Types",
      category_number: "01",
      types: [
        "Customized Profile Roll-forming Machine",
        "Special Purpose Roll-forming Machine",
        "Fully Automatic Online Punching Unit",
        "Automatic Decoiler",
        "Punching Tools and Shearing Tools",
      ],
      key_specs: [
        "Material: CRCA, GI, HR, SS, Aluminium",
        "Custom profile cross-sections",
        "Integrated punching, slotting & flying shear cut-off",
      ],
      buyer_input_summary:
        "Profile cross-section drawing with tolerances, material grade/thickness, and target production volume.",
    },
    {
      name: "Modular metal pallets",
      slug: "modular-metal-pallets",
      headline: "Heavy-duty pallets built around your load case",
      short_description:
        "Custom pallets built from cold roll-formed C-channel or modular profiles to support the customer's product, load case, fork handling, and storage method.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
      href: "/products/modular-metal-pallets",
      internal_href: "/products/modular-metal-pallets",
      rfq_href: "/contact?product=modular-metal-pallets",
      badge: "3 Product Types",
      category_number: "02",
      types: [
        "Powder-Coated Metal Pallets",
        "Galvanized Metal Pallets",
        "Modular Metal Pallets",
      ],
      key_specs: [
        "Custom static, dynamic & racking load ratings",
        "2-way or 4-way fork-handling compatibility",
        "Made-to-order dimensions and surface finish",
      ],
      buyer_input_summary:
        "Product dimensions, product weight, fork handling method, racking/stacking conditions, and environment.",
    },
    {
      name: "Trolley-bag tubes",
      slug: "trolley-bag-tubes",
      headline: "Precisely formed tubes for trolley bags",
      short_description:
        "Tubes for trolley-bag manufacturing, supplied to the approved material, section, length, tolerance, and finish requirements.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
      href: "/products/trolley-bag-tubes",
      internal_href: "/products/trolley-bag-tubes",
      rfq_href: "/contact?product=trolley-bag-tubes",
      badge: "2 Product Types",
      category_number: "03",
      types: [
        "Oval Tube Section",
        "Square Tube Section with Rib",
      ],
      key_specs: [
        "Oval and ribbed square tube geometries",
        "Specified material grade and wall thickness",
        "Tight cut-length tolerances and deburred ends",
      ],
      buyer_input_summary:
        "Approved tube drawing or sample, outer dimensions, wall thickness, cut length, end features, and quantity.",
    },
    {
      name: "Solar Structures",
      slug: "solar-structures",
      headline: "Reliable structural systems for solar installations",
      short_description:
        "High-strength, durable structural profiles, clamps, and hardware designed specifically for solar panel mounting and installation.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
      href: "/products/solar-structures",
      internal_href: "/products/solar-structures",
      rfq_href: "/contact?product=solar-structures",
      badge: "2 Product Types",
      category_number: "04",
      types: [
        "Prefabricated Rooftop Solar Structure",
        "Roll-Formed Structural Sections",
      ],
      key_specs: [
        "Rooftop solar mounting structures",
        "Roll-formed structural C and strut sections",
        "Precision clamps and mounting hardware",
      ],
      buyer_input_summary:
        "Structural engineering drawings, panel dimensions, mounting layout, and site wind/corrosion conditions.",
    },
  ] as const,

  // All 12 individual precision products across the 4 lines
  catalog_products: [
    {
      id: "customized-profile-roll-forming-machine",
      name: "Customized Profile Roll-forming Machine",
      slug: "customized-profile-roll-forming-machine",
      categorySlug: "roll-forming-lines",
      categoryName: "Roll-Forming Lines",
      shortDescription:
        "Purpose-built roll-forming line configured specifically to form customer-defined open or closed metal profiles.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      badge: "Machine Line",
      href: "/products/roll-forming-lines/customized-profile-roll-forming-machine",
      rfqHref: "/contact?product=roll-forming-lines&module=customized-profile-roll-forming-machine",
      highlights: [
        "Matched progressive roll tooling stations",
        "Engineered for CRCA, GI, HR, SS, Aluminium",
        "Custom drive train and flying shear cutoff",
      ],
      primarySpec: { label: "Material Capability", value: "CRCA, GI, HR, SS, Aluminium" },
    },
    {
      id: "special-purpose-roll-forming-machine",
      name: "Special Purpose Roll-forming Machine",
      slug: "special-purpose-roll-forming-machine",
      categorySlug: "roll-forming-lines",
      categoryName: "Roll-Forming Lines",
      shortDescription:
        "Configured forming equipment for applications requiring non-standard profiles, complex geometries, or combined operations.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      badge: "Special Purpose",
      href: "/products/roll-forming-lines/special-purpose-roll-forming-machine",
      rfqHref: "/contact?product=roll-forming-lines&module=special-purpose-roll-forming-machine",
      highlights: [
        "Non-standard profile geometry capability",
        "Secondary forming and piercing options",
        "Application-specific drive configurations",
      ],
      primarySpec: { label: "Configuration", value: "Application Specific" },
    },
    {
      id: "fully-automatic-online-punching-unit",
      name: "Fully Automatic Online Punching Unit",
      slug: "fully-automatic-online-punching-unit",
      categorySlug: "roll-forming-lines",
      categoryName: "Roll-Forming Lines",
      shortDescription:
        "Online hydraulic or pneumatic punching unit for pre-piercing holes, slots, and notches in strip before or during forming.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      badge: "Inline Automation",
      href: "/products/roll-forming-lines/fully-automatic-online-punching-unit",
      rfqHref: "/contact?product=roll-forming-lines&module=fully-automatic-online-punching-unit",
      highlights: [
        "Synchronized line punching operation",
        "Modular die cassettes for pattern changes",
        "Continuous in-line feeding and indexing",
      ],
      primarySpec: { label: "Operation Type", value: "Synchronized Inline Punching" },
    },
    {
      id: "automatic-decoiler",
      name: "Automatic Decoiler",
      slug: "automatic-decoiler",
      categorySlug: "roll-forming-lines",
      categoryName: "Roll-Forming Lines",
      shortDescription:
        "Motorized or brake-controlled decoiling system providing continuous, tension-controlled coil feed into the roll-former.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      badge: "Coil Handling",
      href: "/products/roll-forming-lines/automatic-decoiler",
      rfqHref: "/contact?product=roll-forming-lines&module=automatic-decoiler",
      highlights: [
        "Controlled coil uncoiling and loop control",
        "Adjustable mandrel expansion",
        "Safety guarding and brake mechanisms",
      ],
      primarySpec: { label: "Function", value: "Controlled Coil Uncoiling" },
    },
    {
      id: "punching-tools-and-shearing-tools",
      name: "Punching Tools and Shearing Tools",
      slug: "punching-tools-and-shearing-tools",
      categorySlug: "roll-forming-lines",
      categoryName: "Roll-Forming Lines",
      shortDescription:
        "Precision dies, punch pins, shear blades, and replacement tooling manufactured from tool steels for long operational life.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
      badge: "Tooling & Dies",
      href: "/products/roll-forming-lines/punching-tools-and-shearing-tools",
      rfqHref: "/contact?product=roll-forming-lines&module=punching-tools-and-shearing-tools",
      highlights: [
        "Manufactured from high-grade tool steels",
        "Precision heat treatment and grinding",
        "Custom profile shear blades and punch sets",
      ],
      primarySpec: { label: "Tooling Material", value: "Hardened Tool Steels" },
    },
    {
      id: "powder-coated-metal-pallets",
      name: "Powder-Coated Metal Pallets",
      slug: "powder-coated-metal-pallets",
      categorySlug: "modular-metal-pallets",
      categoryName: "Modular Metal Pallets",
      shortDescription:
        "Durable steel pallets finished with high-adhesion powder coating for warehouse storage and indoor material movement.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
      badge: "Finished Pallet",
      href: "/products/modular-metal-pallets/powder-coated-metal-pallets",
      rfqHref: "/contact?product=modular-metal-pallets&module=powder-coated-metal-pallets",
      highlights: [
        "Smooth, cleanable powder-coated finish",
        "Engineered deck layouts for specific loads",
        "2-way or 4-way fork handling access",
      ],
      primarySpec: { label: "Surface Finish", value: "Industrial Powder Coating" },
    },
    {
      id: "galvanized-metal-pallets",
      name: "Galvanized Metal Pallets",
      slug: "galvanized-metal-pallets",
      categorySlug: "modular-metal-pallets",
      categoryName: "Modular Metal Pallets",
      shortDescription:
        "Corrosion-resistant galvanized metal pallets engineered for harsh environments, outdoor yards, and moist storage facilities.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
      badge: "Corrosion Resistant",
      href: "/products/modular-metal-pallets/galvanized-metal-pallets",
      rfqHref: "/contact?product=modular-metal-pallets&module=galvanized-metal-pallets",
      highlights: [
        "Hot-dip or pre-galvanized corrosion barrier",
        "Cold roll-formed high-strength C-channels",
        "Suitable for outdoor and damp operating conditions",
      ],
      primarySpec: { label: "Corrosion Protection", value: "Galvanized Coating" },
    },
    {
      id: "modular-metal-pallets-product",
      name: "Modular Metal Pallets",
      slug: "modular-metal-pallets",
      categorySlug: "modular-metal-pallets",
      categoryName: "Modular Metal Pallets",
      shortDescription:
        "Fully configurable pallet system built from roll-formed modular members to match custom footprint and racking requirements.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
      badge: "Configurable System",
      href: "/products/modular-metal-pallets/modular-metal-pallets",
      rfqHref: "/contact?product=modular-metal-pallets&module=modular-metal-pallets",
      highlights: [
        "Configured to customer product dimensions",
        "Validated static and dynamic load ratings",
        "Designed for stacking, nesting, or racking",
      ],
      primarySpec: { label: "Design System", value: "Modular C-Channel" },
    },
    {
      id: "oval-tube-section",
      name: "Oval Tube Section",
      slug: "oval-tube-section",
      categorySlug: "trolley-bag-tubes",
      categoryName: "Trolley-Bag Tubes",
      shortDescription:
        "Precision-formed oval metal tube sections engineered for telescopic luggage trolley handles and luggage frame assemblies.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
      badge: "Luggage Component",
      href: "/products/trolley-bag-tubes/oval-tube-section",
      rfqHref: "/contact?product=trolley-bag-tubes&module=oval-tube-section",
      highlights: [
        "Consistent outer dimensional tolerances",
        "Specified wall thickness and corner radii",
        "Deburred cut ends ready for assembly",
      ],
      primarySpec: { label: "Profile Shape", value: "Oval Cross-Section" },
    },
    {
      id: "square-tube-section-with-rib",
      name: "Square Tube Section with Rib",
      slug: "square-tube-section-with-rib",
      categorySlug: "trolley-bag-tubes",
      categoryName: "Trolley-Bag Tubes",
      shortDescription:
        "Specialized square tube profile with longitudinal reinforcing rib designed for high bending resistance in trolley handles.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
      badge: "Reinforced Profile",
      href: "/products/trolley-bag-tubes/square-tube-section-with-rib",
      rfqHref: "/contact?product=trolley-bag-tubes&module=square-tube-section-with-rib",
      highlights: [
        "Integral longitudinal rib for stiffness",
        "Tight dimensional tolerances for sliding fits",
        "Protective scratch-free bundle packaging",
      ],
      primarySpec: { label: "Feature", value: "Longitudinal Reinforcing Rib" },
    },
    {
      id: "prefabricated-rooftop-solar-structure",
      name: "Prefabricated Rooftop Solar Structure",
      slug: "prefabricated-rooftop-solar-structure",
      categorySlug: "solar-structures",
      categoryName: "Solar Structures",
      shortDescription:
        "Pre-engineered structural mounting systems designed for rapid, secure installation on industrial and commercial rooftops.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
      badge: "Mounting System",
      href: "/products/solar-structures/prefabricated-rooftop-solar-structure",
      rfqHref: "/contact?product=solar-structures&module=prefabricated-rooftop-solar-structure",
      highlights: [
        "Fast on-site bolt-together assembly",
        "Corrosion-resistant structural profiles",
        "Designed to suit diverse roof pitches and sheeting",
      ],
      primarySpec: { label: "Application", value: "Rooftop Solar Mounting" },
    },
    {
      id: "roll-formed-structural-sections",
      name: "Roll-Formed Structural Sections",
      slug: "roll-formed-structural-sections",
      categorySlug: "solar-structures",
      categoryName: "Solar Structures",
      shortDescription:
        "High-strength C-channels, strut rails, and mounting profiles roll-formed to custom lengths for solar framing and racking.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
      badge: "Structural Profiles",
      href: "/products/solar-structures/roll-formed-structural-sections",
      rfqHref: "/contact?product=solar-structures&module=roll-formed-structural-sections",
      highlights: [
        "High tensile yield strength profiles",
        "Pre-punched slot and mounting hole arrays",
        "Consistent batch-to-batch straightness and dimensions",
      ],
      primarySpec: { label: "Profile Types", value: "C-Channels & Strut Rails" },
    },
  ] as const,

  // Engineering & Delivery Workflow (from QualityManufacturing / Brief)
  workflow: {
    eyebrow: "VERIFIED ENGINEERING WORKFLOW",
    heading: "From Requirement to Factory Dispatch",
    description:
      "Every machine line, metal pallet, and precision tube is developed through a disciplined, verified engineering process to ensure reliable performance on your production floor.",
    steps: [
      {
        step: "01",
        title: "Understand",
        description:
          "Review application, profile drawing or sample, raw material specifications, operating cycle, and target production volume.",
      },
      {
        step: "02",
        title: "Define",
        description:
          "Agree machine or product scope, critical dimensional tolerances, punching/forming operations, and acceptance criteria.",
      },
      {
        step: "03",
        title: "Engineer",
        description:
          "Develop precision tooling, forming stations, drive layout, or pallet CAD models while clarifying all open technical points.",
      },
      {
        step: "04",
        title: "Manufacture",
        description:
          "Fabricate, precision-machine, assemble, and wire in accordance with approved engineering drawings and documented work instructions.",
      },
      {
        step: "05",
        title: "Verify",
        description:
          "Execute dry cycling, trial coil forming, dimensional checks, and pre-dispatch inspection at our Nashik facility.",
      },
      {
        step: "06",
        title: "Dispatch",
        description:
          "Securely pack, tag, and ship with operation manuals, electrical schematics, and foundation layout documentation.",
      },
    ] as const,
  },

  // What to Send with an Enquiry (RFQ Guidelines)
  rfq_guidelines: {
    eyebrow: "TECHNICAL RFQ GUIDELINES",
    heading: "What to Submit for an Accurate Engineering Review",
    description:
      "Submitting clear dimensional drawings, material grades, and operating parameters at the enquiry stage enables our mechanical engineers to evaluate tooling feasibility and provide a qualified technical quotation.",
    categories: [
      {
        id: "roll-forming-lines",
        title: "Roll-Forming Lines",
        cta: "Share a profile drawing or sample",
        rfq_link: "/contact?product=roll-forming-lines",
        inputs: [
          {
            label: "Profile Geometry",
            details: "Cross-section drawing with all dimensions, bend radii, permitted tolerances, or a physical benchmark sample.",
          },
          {
            label: "Material Specification",
            details: "Material grade (CRCA, GI, HR, SS, Aluminium), thickness range, coil width, and surface coating requirements.",
          },
          {
            label: "Secondary Operations",
            details: "Inline punching or slot patterns, hole pitch, embossing, cut-to-length requirements, and cut end conditions.",
          },
          {
            label: "Production Target",
            details: "Target forming speed (m/min), shift pattern, product changeover requirements, and factory floor space constraints.",
          },
        ],
      },
      {
        id: "modular-metal-pallets",
        title: "Modular Metal Pallets",
        cta: "Request a custom pallet review",
        rfq_link: "/contact?product=modular-metal-pallets",
        inputs: [
          {
            label: "Footprint & Dimensions",
            details: "Overall length, width, height, deck surface layout (open slats or closed sheet), and product contact points.",
          },
          {
            label: "Load Ratings (UDL)",
            details: "Static floor load, dynamic handling load, and racking/stacking load cases (stated and evaluated separately).",
          },
          {
            label: "Forklift Handling",
            details: "2-way or 4-way entry, pallet jack compatibility, fork pocket clearances, and automated conveyor interfaces.",
          },
          {
            label: "Service Environment",
            details: "Indoor warehousing, outdoor yard storage, moisture/chemical exposure, and preferred coating (powder coat or galvanizing).",
          },
        ],
      },
      {
        id: "trolley-bag-tubes",
        title: "Trolley-Bag Tubes",
        cta: "Send a tube drawing or sample",
        rfq_link: "/contact?product=trolley-bag-tubes",
        inputs: [
          {
            label: "Section Geometry",
            details: "Oval, square with rib, or custom profile with outer dimensions, wall thickness, and acceptable dimensional variations.",
          },
          {
            label: "Material & Temper",
            details: "Approved metal grade and hardness/temper specification (do not assume steel or aluminium without confirmed drawing).",
          },
          {
            label: "Cut Length & Ends",
            details: "Cut-to-length requirements, straightness tolerances, end deburring, pierced holes, slots, or swaged end features.",
          },
          {
            label: "Finish & Packaging",
            details: "Required surface finish or coating, appearance standard, scratch protection, and bundle packaging requirements.",
          },
        ],
      },
      {
        id: "solar-structures",
        title: "Solar Structures",
        cta: "Discuss your solar structure requirement",
        rfq_link: "/contact?product=solar-structures",
        inputs: [
          {
            label: "Installation Type",
            details: "Rooftop mounting structure, ground-mounted framing sections, or custom industrial carport structures.",
          },
          {
            label: "Profile Sections",
            details: "C-channels, strut profiles, mounting rails, panel clamps, brackets, and required hardware interfaces.",
          },
          {
            label: "Material & Corrosion",
            details: "High-tensile structural steel, pre-galvanized or hot-dip galvanized coating thickness for outdoor longevity.",
          },
          {
            label: "Array Layout & Volume",
            details: "Module layout drawings, wind load design parameters, project delivery schedule, and estimated tonnage/quantities.",
          },
        ],
      },
    ] as const,
  },

  // Verified Technical FAQs strictly adhering to AGENTS.md non-fabrication rule
  faqs: [
    {
      question: "How does Empirical India configure a roll-forming line for a custom profile?",
      answer:
        "Every machine line is custom-engineered around the buyer's approved profile drawing or physical sample. Our tool designers evaluate profile geometry, raw material grade, and thickness to determine the number of forming stations, roll-pass progression, drive layout, and flying cutoff method required for repeatable dimensional tolerances.",
    },
    {
      question: "What raw materials can be processed on your roll-forming equipment?",
      answer:
        "Our lines can be engineered to process Cold Rolled Close Annealed (CRCA), Galvanized Iron (GI), Hot Rolled (HR), Stainless Steel, and Aluminium coil stock. Strip thickness ranges, coil widths, and drive horsepower are configured specifically for the quoted project.",
    },
    {
      question: "Can inline punching, slotting, and shearing be integrated into one line?",
      answer:
        "Yes. We design and integrate fully automatic online punching units and flying shear cutoff systems synchronized with line forming speed. This allows continuous strip piercing, hole patterns, and cut-to-length parts without secondary off-line operations.",
    },
    {
      question: "How are load ratings determined for custom modular metal pallets?",
      answer:
        "Pallet load capacity must be agreed upon and validated for the actual design and stated operating conditions. We distinguish between static floor load, dynamic handling load, and racking/stacking load, engineering the roll-formed C-channel structure to suit the specific material movement workflow.",
    },
    {
      question: "What specifications are required for trolley-bag tube manufacturing?",
      answer:
        "We manufacture trolley-bag tubes to customer-approved drawings or benchmark samples. Required inputs include section geometry (oval, ribbed square), confirmed metal grade, outer dimensions, wall thickness, cut length, straightness limits, end deburring, and surface finish.",
    },
    {
      question: "How is equipment tested before dispatch from your Nashik plant?",
      answer:
        "Every line undergoes complete mechanical assembly, drive alignment, dry cycling, and trial forming runs with approved customer coil material at our Nashik plant prior to customer pre-dispatch inspection.",
    },
  ] as const,

  // Conversion-focused RFQ Callout
  cta_section: {
    eyebrow: "START AN ENGINEERING DISCUSSION",
    heading: "Have a Profile Drawing, Pallet Requirement, or Tube Specification?",
    description:
      "Send your technical drawings, 3D CAD files, or physical benchmark samples to our engineering team in Nashik. We will review tooling feasibility, profile roll passes, and provide a comprehensive proposal.",
    primary_cta: {
      label: "Request a Technical Quote",
      href: "/contact",
    },
    secondary_cta: {
      label: "Consult an Engineer",
      href: "/contact?type=consultation",
    },
  },
} as const;

export default ProductsAndSolutions;
