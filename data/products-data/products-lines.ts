
export interface ProductCategory {
  name: string;
  slug: string;
  headline: string;
  short_description: string;
  image: string;
  href: string;
  badge: string;
  overview: string;
  types: string[];
  key_specs: string[];
}

const products: ProductCategory[] = [
  {
    name: "Roll-forming lines",
    slug: "roll-forming-lines",
    headline: "Precision-engineered profile forming systems",
    short_description:
      "From custom profile roll-forming machines to fully automatic punching lines, explore solutions engineered for precise, consistent metal forming.",
    image:
      "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/roll-forming.webp",
    href: "/products/roll-forming-lines",
    badge: "5 Product Types",
    overview:
      "Complete roll-forming solutions designed around your profile geometry, material specifications, production volume, and required operations.",
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
      "Integrated punching and cutting",
    ],
  },

  {
    name: "Modular metal pallets",
    slug: "modular-metal-pallets",
    headline: "Heavy-duty pallets built around your load",
    short_description:
      "Explore powder-coated, galvanized, and modular metal pallets engineered for industrial handling, efficient storage, and application-specific load requirements.",
    image:
      "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530981/metal-pallet.webp",
    href: "/products/modular-metal-pallets",
    badge: "3 Product Types",
    overview:
      "Configurable metal pallet systems made with cold roll-formed C-channels or modular profiles to suit your products, handling equipment, and storage environment.",
    types: [
      "Powder-Coated Metal Pallets",
      "Galvanized Metal Pallets",
      "Modular Metal Pallets",
    ],
    key_specs: [
      "Custom load requirements",
      "Fork-handling compatibility",
      "Finish and dimensions to order",
    ],
  },

  {
    name: "Trolley-bag tubes",
    slug: "trolley-bag-tubes",
    headline: "Precisely formed tubes for trolley bags",
    short_description:
      "Discover oval and ribbed square tube sections manufactured for trolley-bag applications, with material, dimensions, tolerances, and finishes tailored to approved requirements.",
    image:
      "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/tubes.webp",
    href: "/products/trolley-bag-tubes",
    badge: "2 Product Types",
    overview:
      "Metal tube sections for trolley-bag manufacturing, supplied to the specified section geometry, length, material grade, dimensional tolerances, and surface finish.",
    types: [
      "Oval Tube Section",
      "Square Tube Section with Rib",
    ],
    key_specs: [
      "Oval and ribbed square sections",
      "Specified material and wall thickness",
      "Custom lengths and tolerances",
    ],
  },

  {
    name: "Solar Structures",
    slug: "solar-structures",
    headline: "Reliable structural systems for solar installations",
    short_description:
      "Explore rooftop solar mounting structures and roll-formed structural sections engineered to support practical installation requirements and dependable panel mounting.",
    image:
      "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791530982/solar-structure.webp",
    href: "/products/solar-structures",
    badge: "2 Product Types",
    overview:
      "Solar mounting solutions incorporating structural profiles, clamps, and hardware, designed according to project requirements and installation conditions.",
    types: [
      "Prefabricated Rooftop Solar Structure",
      "Roll-Formed Structural Sections",
    ],
    key_specs: [
      "Rooftop solar mounting systems",
      "Roll-formed structural sections",
      "Clamps and mounting hardware",
    ],
  },
];

export default products;
