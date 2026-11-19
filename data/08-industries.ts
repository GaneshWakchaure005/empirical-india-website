import { siteSEO } from "@/data/seo";
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
  readonly relevant_solutions_summary: string;
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
  purpose:
    "Engineered solutions for diverse industries: helping industrial buyers recognize their application requirements and initiate drawing-led discussions.",

  seo: {
    title: siteSEO.pages.industries.title,
    description: siteSEO.pages.industries.description,
    canonical: "/industries",
  },

  hero: {
    eyebrow: "INDUSTRIES WE SERVE",
    heading: siteSEO.pages.industries.h1,
    description:
      "Empirical India delivers precision-engineered products, roll-forming technology and industrial manufacturing solutions for businesses across multiple sectors. We combine practical engineering, application-specific design and manufacturing expertise to help customers meet their production and operational requirements.",
    sub_description:
      "From metal profile production and industrial material handling to solar mounting structures and precision tubing, our solutions are developed around the needs of each application.",
    pills: [
      "Metal Profile Production",
      "Industrial Material Handling",
      "Solar Mounting Structures",
      "Precision Tubing",
    ] as const,
    primary_cta: {
      label: "Explore Our Products",
      href: "/products",
    },
    secondary_cta: {
      label: "Discuss Your Requirements",
      href: "/contact",
    },
  },

  grid_section: {
    eyebrow: "ENGINEERING EXCELLENCE",
    heading: "Supporting Industry Through Engineering Excellence",
    description:
      "Every industry has different requirements for material selection, dimensional accuracy, durability and production efficiency. Our approach begins with understanding the intended application and translating those requirements into a suitable product or manufacturing solution.",
  },

  industries: [
    {
      id: "warehousing-material-handling",
      title: "Warehousing & Material Handling",
      short_title: "Warehousing",
      tagline: "Reliable solutions for industrial storage and logistics.",
      description:
        "Our modular metal pallets are designed for industrial environments where efficient storage, organized material movement and dependable handling are essential. Configurable pallet designs help businesses address their operational, load-bearing and space-utilization requirements.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1794915890/peb-buildings.webp",
      image_alt:
        "Industrial warehouse facility with heavy-duty modular metal pallets and organized storage racking",
      key_applications: [
        "Industrial warehouses",
        "Manufacturing facilities",
        "Distribution centres",
        "Material handling operations",
      ],
      relevant_product_line: "Modular Metal Pallets",
      relevant_solutions_summary:
        "Modular metal pallets and customized pallet configurations.",
      product_href: "/products/modular-metal-pallets",
      enquiry_href:
        "/contact?industry=warehousing-material-handling&product=modular-metal-pallets",
    },
    {
      id: "solar-energy",
      title: "Solar Energy & Renewable Infrastructure",
      short_title: "Solar Energy",
      tagline: "Precision-formed profiles for solar mounting applications.",
      description:
        "Solar mounting systems depend on appropriately designed structural components and consistent manufacturing quality. Our roll-formed profiles, including C-channels and strut rails, support solar structure manufacturing requirements based on specified dimensions, materials and project needs.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1794915891/solar-energy.webp",
      image_alt:
        "Commercial solar energy installation with roll-formed steel mounting channels, purlins and support systems",
      key_applications: [
        "Solar mounting structures",
        "Rooftop solar installations",
        "Solar support systems",
      ],
      relevant_product_line: "Roll-Formed Profiles & Solar Structures",
      relevant_solutions_summary:
        "Roll-formed structural profiles, C-channels and strut rails.",
      product_href: "/products/solar-structures",
      enquiry_href:
        "/contact?industry=solar-energy&product=solar-structures",
    },
    {
      id: "luggage-travel-products",
      title: "Luggage & Travel Products",
      short_title: "Luggage",
      tagline: "Precision tubing for dependable luggage components.",
      description:
        "Telescopic handles and luggage frames require accurately formed metal profiles with suitable dimensional tolerances, strength and fit. Our trolley-bag tube profiles are developed for manufacturers seeking consistency in the production of luggage components.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1794915890/infrastructure.webp",
      image_alt:
        "Precision-engineered metal tube profiles and telescopic handle components for luggage manufacturing",
      key_applications: [
        "Suitcase handles",
        "Telescopic trolley systems",
        "Luggage frame components",
      ],
      relevant_product_line: "Trolley-Bag Tubes",
      relevant_solutions_summary:
        "Oval trolley tubes and ribbed square tube profiles.",
      product_href: "/products/trolley-bag-tubes",
      enquiry_href:
        "/contact?industry=luggage-travel-products&product=trolley-bag-tubes",
    },
    {
      id: "metal-processing-manufacturing",
      title: "Metal Processing & Industrial Manufacturing",
      short_title: "Metal Processing",
      tagline: "Custom roll-forming technology for production requirements.",
      description:
        "Manufacturers need reliable equipment to transform metal strips into consistent, application-specific profiles. Our roll-forming machinery and associated equipment can be configured around defined profile geometries, material specifications and production requirements.",
      image: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1794915890/industrial-manufacturing.webp",
      image_alt:
        "Industrial roll-forming production line with automated decoiler, forming stands and inline punching",
      key_applications: [
        "Metal profile manufacturing",
        "Continuous forming operations",
        "Specialized metal component production",
      ],
      relevant_product_line: "Custom Roll-Forming Lines",
      relevant_solutions_summary:
        "Roll-forming lines, special-purpose machinery, inline punching units, automatic decoilers and tooling.",
      product_href: "/products/roll-forming-lines",
      enquiry_href:
        "/contact?industry=metal-processing-manufacturing&product=roll-forming-lines",
    },
  ] as const,

  solutions_section: {
    eyebrow: "RELEVANT MANUFACTURING SOLUTIONS",
    heading: "Solutions Developed Around Application Needs",
    description:
      "From metal profile production and industrial material handling to solar mounting structures and precision tubing, our solutions are developed around the needs of each application.",
    solutions: [
      {
        id: "modular-metal-pallets",
        title: "Modular Metal Pallets",
        subtitle: "Configured for Industrial Storage & Logistics",
        description:
          "Configurable steel pallet designs engineered for industrial warehouses, distribution centres, and automated handling operations with specific static, dynamic, and racking load requirements.",
        applicable_industries: [
          "Warehousing & Material Handling",
          "Industrial Manufacturing Facilities",
          "Distribution Operations",
        ],
        capabilities: [
          "Configurable modular pallet dimensions",
          "Static, dynamic & high-bay racking compliance",
          "2-Way or 4-Way forklift access",
          "Durable, repairable steel construction",
        ],
        href: "/products/modular-metal-pallets",
        icon_name: "metal-pallets",
      },
      {
        id: "roll-forming-lines",
        title: "Custom Roll-Forming Lines",
        subtitle: "Equipment Built Around Defined Profile Geometry",
        description:
          "Automated roll-forming machinery configured to transform metal strips into consistent, application-specific profiles with integrated punching and flying cut-off units.",
        applicable_industries: [
          "Metal Processing & Component Manufacturing",
          "Continuous Profile Forming",
          "Industrial Equipment Facilities",
        ],
        capabilities: [
          "Automatic decoiling, levelling & feeding",
          "Multi-station CNC roll-pass tooling",
          "Synchronized inline hydraulic punching",
          "Integrated PLC automated line controls",
        ],
        href: "/products/roll-forming-lines",
        icon_name: "roll-forming",
      },
      {
        id: "solar-structures",
        title: "Solar Structural Profiles",
        subtitle: "Precision-Formed C-Channels & Strut Rails",
        description:
          "Roll-formed structural components and continuous purlins manufactured to specified dimensions, materials, and structural load requirements for commercial solar arrays.",
        applicable_industries: [
          "Solar Energy & Renewable Infrastructure",
          "Rooftop Solar Installations",
          "Utility-Scale Solar Support Systems",
        ],
        capabilities: [
          "Strut channels & guide rails",
          "Pre-punched continuous C & Z purlins",
          "Galvanized corrosion-resistant finish",
          "Accurate hole and slot pitch spacing",
        ],
        href: "/products/solar-structures",
        icon_name: "roll-forming",
      },
      {
        id: "trolley-bag-tubes",
        title: "Trolley-Bag Tubes",
        subtitle: "Precision Tubing for Luggage Components",
        description:
          "Accurately formed metal profiles developed for luggage manufacturers seeking tight dimensional tolerances, high structural strength, and smooth sliding fit.",
        applicable_industries: [
          "Luggage & Travel Products",
          "Telescopic Trolley Handle Systems",
          "Luggage Frame Assemblies",
        ],
        capabilities: [
          "Oval trolley tubes & ribbed square sections",
          "Strict dimensional tolerances & straightness",
          "Precision deburred cut lengths",
          "Custom punching for telescopic locks",
        ],
        href: "/products/trolley-bag-tubes",
        icon_name: "tubes",
      },
    ] as const,
  },

  engineering_workflow: {
    eyebrow: "OUR ENGINEERING APPROACH",
    heading: "Built Around Your Application",
    description:
      "We understand that no two manufacturing requirements are exactly alike. Our engineering approach considers material specifications, product geometry, dimensional tolerances, operating conditions and production objectives before a suitable solution is defined. Whether you require a finished industrial product or equipment for your own manufacturing process, we aim to align the solution with your technical and operational requirements.",
    steps: [
      {
        step: "01",
        title: "Application & Requirement Review",
        description:
          "We analyze your intended use case, material selection, dimensional accuracy tolerances, and production objectives.",
      },
      {
        step: "02",
        title: "Design & Engineering Alignment",
        description:
          "Our engineering team translates your operational specifications into suitable tooling geometry, load-bearing profiles, or machinery modules.",
      },
      {
        step: "03",
        title: "Precision Manufacturing",
        description:
          "Fabrication, forming, and assembly at our Nashik manufacturing facility under disciplined process controls.",
      },
      {
        step: "04",
        title: "Pre-Dispatch Verification",
        description:
          "Rigorous dimensional checks, visual inspection, and trial verification ensure the solution meets your stated specifications.",
      },
    ] as const,
  },

  cta_section: {
    eyebrow: "LET'S DISCUSS YOUR REQUIREMENTS",
    heading: "Let's Discuss Your Requirements",
    description:
      "Looking for a manufacturing solution, precision metal profile or industrial product tailored to your application? Share your drawings, specifications or project requirements with our team.",
    primary_button: {
      label: "Enquire About Your Project",
      href: "/contact",
    },
    secondary_button: {
      label: "Contact Our Team",
      href: "/contact?type=contact-team",
    },
    guarantees: [
      "Drawing-Led Technical Evaluation",
      "Application-Specific Design Feasibility",
      "Nashik, Maharashtra Manufacturing Facility",
    ] as const,
  },
} as const;

export default Industries;
