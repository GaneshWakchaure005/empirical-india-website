// Public SEO copy and verified location details.
// Do not imply ratings, capacity, certifications, prices, or capabilities
// that have not been verified by the company.

export const siteSEO = {
  name: "Empirical India",
  defaultOrigin: "https://www.empiricalindia.com",
  locale: "en_IN",
  logo: "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791531151/company-logo.webp",

  location: "Nashik, Maharashtra, India",

  address: {
    streetAddress: "Gat No. 40, Behind NMC Hospital, Chunchale, Near XLO Point, Ambad MIDC",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422010",
    addressCountry: "IN",
  },

  // Target keywords for content planning.
  // Google does not use meta keywords for web ranking.
  keywords: [
    "Empirical India",
    "Empirical India Nashik",
    "roll forming nashik",
    "roll forming machine manufacturer India",
    "roll forming machine manufacturer Nashik",
    "custom roll forming machine",
    "special purpose roll forming machine",
    "roll forming machines",
    "industrial roll forming machinery",
    "modular metal pallet manufacturer",
    "industrial metal pallets",
    "trolley bag tube manufacturer India",
    "metal tubes for luggage manufacturing",
    "solar structure manufacturer India",
    "solar mounting structure nashik",
    "cold formed steel profiles",
    "industrial manufacturing Nashik",
    "metal fabrication Maharashtra",
    "rolling machine parts in nashik",
  ],

  pages: {
    home: {
      path: "/",
      title:
        "Roll Forming Machine Manufacturer in India | Empirical India",
      description:
        "Empirical India manufactures custom roll-forming machines and production lines in Nashik, India. Share your profile drawing and production requirements for a technical enquiry.",
      h1:
        "Custom Roll-Forming Lines, solar structures and metal pallets manufacturer",
    },

    about: {
      path: "/about",
      title:
        "About Empirical India | Engineering & Manufacturing in Nashik",
      description:
        "Learn about Empirical India, a Nashik-based engineering and manufacturing company serving industrial buyers with custom roll-forming lines and metal products.",
      h1:
        "Engineering & Manufacturing at Empirical India",
    },

    products: {
      path: "/products",
      title:
        "Roll Forming Machines, Roll Formed Products & Pallets | Empirical India",
      description:
        "Explore products and solutions of Empirical India. We manufacture custom roll forming machines, roll formed products, rollers for roll forming, and modular metal pallets in Nashik, India.",
      h1:
        "Explore Products and Solutions of Empirical India",
    },

    industries: {
      path: "/industries",
      title:
        "Industrial Applications for Roll Forming & Metal Products",
      description:
        "Explore industrial applications for custom roll-forming machinery, metal pallets, trolley-bag tubes and solar structure components from Empirical India.",
      h1:
        "Industrial Applications & Manufacturing Solutions",
    },

    contact: {
      path: "/contact",
      title:
        "Contact Empirical India | Roll forming machines in Nashik",
      description:
        "Contact Empirical India in Nashik, Maharashtra for roll-forming machinery and industrial metal products. Submit drawings, specifications or an RFQ.",
      h1:
        "Request a Technical Quote from Empirical India",
    },

    blogs: {
      path: "/blogs",
      title:
        "Roll Forming & Industrial Manufacturing Insights | Empirical India",
      description:
        "Read engineering articles and manufacturing insights covering roll-forming technology, metal profiles, industrial pallets and manufacturing applications.",
      h1:
        "Engineering & Industrial Manufacturing Insights",
    },

    news: {
      path: "/news",
      title:
        "Company News & Manufacturing Updates | Empirical India",
      description:
        "Explore company announcements, manufacturing updates and events from Empirical India, an engineering and industrial products company in Nashik, India.",
      h1:
        "Empirical India News & Events",
    },
  },

  // Use these headings on the corresponding product detail pages.
  productHeadings: {
    "roll-forming-lines":
      "Custom Roll-Forming Machine Manufacturer in India",

    "modular-metal-pallets":
      "Modular Metal Pallet Manufacturer in India",

    "trolley-bag-tubes":
      "Trolley-Bag Tube Manufacturer in India",

    "solar-structures":
      "Solar Structure Components & Steel Profiles",
  } as Record<string, string>,

  productPages: {
    "roll-forming-lines": {
      title:
        "Roll Forming Machine Manufacturer in India | Empirical India",
      description:
        "Explore custom roll-forming machines and production lines from Empirical India in Nashik. Share your profile drawing, material specifications and production requirements for a technical review.",
    },

    "modular-metal-pallets": {
      title:
        "Modular Metal Pallet Manufacturer in India | Empirical India",
      description:
        "Explore modular metal pallets from Empirical India in Nashik. Share your required dimensions, handling methods and load requirements for a custom product enquiry.",
    },

    "trolley-bag-tubes": {
      title:
        "Trolley-Bag Tube Manufacturer in India | Empirical India",
      description:
        "Explore tubes for trolley-bag manufacturing from Empirical India in Nashik. Submit your tube drawing, cross-section, dimensions, finish and quantity for a technical enquiry.",
    },

    "solar-structures": {
      title:
        "Solar Structure Components & Steel Profiles | Empirical India",
      description:
        "Explore solar structure components and steel profiles from Empirical India in Nashik, India. Share your project drawings and specifications for a technical enquiry.",
    },
  } as Record<string, { title: string; description: string }>,

  productLocation:
    "Manufacturing location: Nashik, Maharashtra, India. Share your drawing, sample or application requirements for a technical review.",

  breadcrumbs: {
    home: "Home",
    about: "About Us",
    products: "Products & Solutions",
    industries: "Industries",
    contact: "Contact",
    blogs: "Blogs",
    news: "News & Events",
  },
} as const;