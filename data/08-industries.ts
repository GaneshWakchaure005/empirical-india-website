// Centralized data file for Empirical India Industries Page
// Strictly adheres to AGENTS.md guidelines and client content rules.

export interface IndustryItem {
  readonly id: string;
  readonly title: string;
  readonly short_title?: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
  readonly image_alt: string;
  readonly key_applications: readonly string[];
  readonly relevant_product_line: string;
  readonly product_href: string;
  readonly enquiry_href: string;
}

export interface RelevantSolution {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly applicable_industries: readonly string[];
  readonly capabilities: readonly string[];
  readonly href: string;
  readonly icon_name: "roll-forming" | "metal-pallets" | "tubes";
}

export const Industries = {
  page: "Industries",
  route: "/industries",
  source_pages: [12],
  purpose: "Use an application-led page to help industrial buyers recognize their use case and initiate drawing-led discussions.",

  seo: {
    title: "Engineering Solutions for Every Industry | Empirical India",
    description:
      "Explore Empirical India's custom roll-forming lines, heavy-duty modular metal pallets, and precision tubes engineered for Solar Energy, PEB, Infrastructure, Agriculture, and Manufacturing.",
    canonical: "/industries",
  },

  hero: {
    eyebrow: "APPLICATION-LED ENGINEERING",
    heading: "Engineering Solutions for Every Industry",
    description:
      "Empirical India partners with industrial OEMs, infrastructure contractors, and system fabricators to deliver custom automated roll-forming lines, heavy-duty modular metal pallets, and precision metal tubes configured precisely to sector requirements.",
    pills: [
      "Custom Profile Forming",
      "Heavy-Duty Metal Pallets",
      "Precision Luggage Tubes",
    ] as const,
  },

  industries: [
    {
      id: "solar-energy",
      title: "Solar Energy",
      short_title: "Solar",
      tagline: "Rooftop & Ground-Mount Mounting Profiles",
      description:
        "High-precision roll-formed mounting channels, purlins, strut channels, and durable hardware engineered for solar panel mounting arrays, rooftop racking, and utility-scale ground structures.",
      image: "/images/industries/solar-energy.jpg",
      image_alt:
        "Commercial solar energy installation with roll-formed steel mounting channels and ground structures",
      key_applications: [
        "Strut channels & guide rails",
        "Solar purlins & mounting brackets",
        "Corrosion-resistant metal sections",
      ],
      relevant_product_line: "Custom Roll-Forming Lines",
      product_href: "/products/roll-forming-lines",
      enquiry_href: "/contact?industry=solar-energy&product=roll-forming-lines",
    },
    {
      id: "peb",
      title: "Pre-Engineered Buildings (PEB)",
      short_title: "PEB",
      tagline: "Structural Framing & Continuous Purlins",
      description:
        "Automated roll-forming lines for continuous C & Z purlin production, roofing deck profiles, eave struts, and customized cold-formed structural sections with inline punching.",
      image: "/images/industries/peb-buildings.jpg",
      image_alt:
        "Modern pre-engineered steel building construction showing galvanized purlins and industrial framework",
      key_applications: [
        "C & Z structural purlins",
        "Inline punched framing channels",
        "Roofing deck & cladding profiles",
      ],
      relevant_product_line: "Custom Roll-Forming Lines",
      product_href: "/products/roll-forming-lines",
      enquiry_href: "/contact?industry=peb&product=roll-forming-lines",
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      short_title: "Infrastructure",
      tagline: "Crash Barriers, Cable Trays & Heavy Sections",
      description:
        "Heavy-gauge roll-forming machinery and structural profiles engineered for highway W-beam crash barriers, industrial cable trays, bridge ducting channels, and transit utilities.",
      image: "/images/industries/infrastructure.jpg",
      image_alt:
        "Civil infrastructure project with galvanized steel cable tray channels and barrier profiles",
      key_applications: [
        "Highway W-beam crash barriers",
        "Cable trays & transit ducting",
        "Heavy structural channels",
      ],
      relevant_product_line: "Custom Roll-Forming Lines",
      product_href: "/products/roll-forming-lines",
      enquiry_href: "/contact?industry=infrastructure&product=roll-forming-lines",
    },
    {
      id: "agriculture",
      title: "Agriculture",
      short_title: "Agriculture",
      tagline: "Silo Components, Greenhouse Frames & Handling",
      description:
        "Cold-formed curved wall channels for grain storage silos, greenhouse arch framing sections, and robust modular metal pallets engineered for agricultural produce storage and yard handling.",
      image: "/images/industries/agriculture.jpg",
      image_alt:
        "Commercial agricultural greenhouse galvanized steel framing arches and grain storage silo logistics",
      key_applications: [
        "Greenhouse framing channels",
        "Curved silo wall panels & stiffeners",
        "Heavy-duty farm produce pallets",
      ],
      relevant_product_line: "Modular Metal Pallets & Roll Forming",
      product_href: "/products/modular-metal-pallets",
      enquiry_href: "/contact?industry=agriculture&product=modular-metal-pallets",
    },
    {
      id: "industrial-manufacturing",
      title: "Industrial Manufacturing",
      short_title: "Manufacturing",
      tagline: "Custom Machinery, Pallets & Precision Tubes",
      description:
        "Turnkey custom roll-forming equipment lines, robust modular steel pallets for factory logistics and AS/RS racking, and precision cut-to-length tubes for luggage trolley and consumer hardware manufacturing.",
      image: "/images/industries/industrial-manufacturing.jpg",
      image_alt:
        "Clean manufacturing plant floor with automated roll-forming line, steel coils, and modular metal pallets",
      key_applications: [
        "Custom automated roll-forming lines",
        "AS/RS compatible metal pallets",
        "Precision luggage trolley tubes",
      ],
      relevant_product_line: "All Three Core Business Lines",
      product_href: "/products",
      enquiry_href: "/contact?industry=industrial-manufacturing",
    },
  ] as const,

  solutions_section: {
    eyebrow: "CORE MANUFACTURING CAPABILITIES",
    heading: "How Our Solutions Map to Your Industry",
    description:
      "Every project at Empirical India is built around customer-defined drawings, material specifications, and verified production targets across our three core manufacturing verticals.",
    solutions: [
      {
        id: "roll-forming-lines",
        title: "Custom Roll-Forming Lines",
        subtitle: "Continuous Cold Roll-Formed Profiles",
        description:
          "Engineered around customer-defined profiles, material thickness, inline hydraulic punching, and targeted cycle times. Delivers repeatable cross-sections from coil to finished length.",
        applicable_industries: [
          "Solar Energy",
          "Pre-Engineered Buildings (PEB)",
          "Infrastructure",
          "Industrial Manufacturing",
        ],
        capabilities: [
          "Decoiling, Leveling & Feeding",
          "Multi-station Forming Stands",
          "Inline Hydraulic Punching & Flying Cutoff",
          "Automated PLC Control Panel",
        ],
        href: "/products/roll-forming-lines",
        icon_name: "roll-forming",
      },
      {
        id: "modular-metal-pallets",
        title: "Modular Metal Pallets",
        subtitle: "Engineered Heavy-Duty Industrial Handling",
        description:
          "Custom-configured cold-formed steel pallets designed for specific product dimensions, fork handling methods, static/dynamic load cases, and automated high-bay warehouse racking.",
        applicable_industries: [
          "Industrial Manufacturing",
          "Agriculture",
          "Heavy Logistics & Warehousing",
        ],
        capabilities: [
          "C-Channel & Custom Modular Profiles",
          "2-Way or 4-Way Forklift Entry",
          "Stacking, Nesting & High-Bay Racking",
          "Durable Corrosion-Resistant Finish",
        ],
        href: "/products/modular-metal-pallets",
        icon_name: "metal-pallets",
      },
      {
        id: "trolley-bag-tubes",
        title: "Trolley-Bag Tubes",
        subtitle: "Precision Section & Cut-Length Tubing",
        description:
          "High-volume, tight-tolerance metal tubes supplied to approved sectional dimensions, wall thicknesses, straightness criteria, and deburred end-conditions for luggage manufacturing.",
        applicable_industries: [
          "Industrial Manufacturing",
          "Travel Goods & Consumer Hardware",
        ],
        capabilities: [
          "Approved Cross-Sectional Geometry",
          "Consistent Wall Thickness & Straightness",
          "Burr-Free Cut-to-Length Precision",
          "Custom Punching & End Profiling",
        ],
        href: "/products/trolley-bag-tubes",
        icon_name: "tubes",
      },
    ] as const,
  },

  engineering_workflow: {
    eyebrow: "OUR ENGINEERING METHODOLOGY",
    heading: "From Drawing to Verified Production",
    description:
      "A disciplined, drawing-led engineering workflow ensuring clarity, repeatable tolerances, and pre-dispatch verification for every sector.",
    steps: [
      {
        step: "01",
        title: "Requirement & Drawing Review",
        description:
          "We examine your 2D/3D drawings, section geometry, material specifications, and operating conditions.",
      },
      {
        step: "02",
        title: "Engineering & Tooling Design",
        description:
          "Forming passes, roll flower diagrams, structural load cases, or tube tolerances are engineered specifically for your application.",
      },
      {
        step: "03",
        title: "Precision Manufacturing",
        description:
          "Fabrication, machining, and assembly at our Nashik facility under controlled production protocols.",
      },
      {
        step: "04",
        title: "Pre-Dispatch Verification",
        description:
          "Documented dimensional checks, trial operation, and acceptance verification before shipping.",
      },
    ] as const,
  },

  cta_section: {
    eyebrow: "START A DISCUSSION",
    heading: "Discuss Your Industry Requirement",
    description:
      "Whether you need a dedicated roll-forming line, load-rated modular metal pallets, or precision metal tubes, our engineering team in Nashik is ready to review your drawing and application requirements.",
    primary_button: {
      label: "Contact Our Engineering Team",
      href: "/contact",
    },
    secondary_button: {
      label: "Share Drawing / Request RFQ",
      href: "/contact?rfq=true",
    },
    guarantees: [
      "Drawing-Led Technical Evaluation",
      "No Fabricated Specs or Assumptions",
      "Nashik, Maharashtra Manufacturing Facility",
    ] as const,
  },
} as const;

export default Industries;
