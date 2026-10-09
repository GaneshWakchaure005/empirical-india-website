import mongoose from "mongoose";
import Category from "../models/Category";
import NewsEvent from "../models/NewsEvent";
import { Admin } from "../models/Admin";
import { NewsEventType } from "../types/news-event";
import bcrypt from "bcryptjs";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/empiricalindia";

async function seed() {
  console.log("Connecting to MongoDB for news seeding...");
  await mongoose.connect(mongoUri);

  // 1. Ensure admin exists
  let admin = await Admin.findOne({ email: "admin@empiricalindia.com" });
  if (!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin@123456", salt);
    admin = await Admin.create({
      name: "Empirical Engineering Team",
      email: "admin@empiricalindia.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });
    console.log("Created admin user:", admin._id);
  }

  // 2. Clear old news/events and categories to avoid duplicates
  await NewsEvent.deleteMany({});
  await Category.deleteMany({ type: { $in: ["news", "event", "general"] } });

  // 3. Create Categories
  const catRollForming = await Category.create({
    name: "Roll-Forming Technology",
    slug: "roll-forming-technology",
    type: "news",
    description: "Engineering developments and commissioning of automated roll-forming lines.",
    isActive: true,
  });

  const catMetalPallets = await Category.create({
    name: "Modular Metal Pallets",
    slug: "modular-metal-pallets",
    type: "news",
    description: "Custom manufactured metal pallets and heavy storage profile solutions.",
    isActive: true,
  });

  const catMilestones = await Category.create({
    name: "Facility Milestones",
    slug: "facility-milestones",
    type: "news",
    description: "Nashik manufacturing plant developments, quality verification, and tooling upgrades.",
    isActive: true,
  });

  const catExpos = await Category.create({
    name: "Trade Shows & Expos",
    slug: "trade-shows-expos",
    type: "event",
    description: "Industrial exhibitions, technical conferences, and engineering buyer meets.",
    isActive: true,
  });

  console.log("Created 4 categories.");

  // 4. Create News and Event items
  const items: any[] = [
    {
      title: "Automated Custom Roll-Forming Line Commissioned for Industrial Racking Sections",
      slug: "automated-custom-roll-forming-line-commissioned-for-racking-sections",
      type: "news",
      excerpt: "Empirical India completes commissioning of a customized high-tensile profile roll-forming line with integrated punch tooling and automated cut-to-length control.",
      content: `Empirical India has successfully commissioned a custom-engineered roll-forming production line designed specifically for manufacturing heavy-duty warehouse racking uprights and beam profiles.

The newly deployed line integrates synchronized decoiling, continuous precision roll-forming stands with hardened tool steel rollers, multi-axis hydraulic pre-punching stations, and an automated flying shear cutoff unit. 

Engineered for High-Tensile Steel Profiles:
Every roller station was machined and precision-ground to maintain profile geometry tolerances within tight customer specifications across variable coil thicknesses.

Key Engineering Highlights:
- Multi-station continuous forming arrangement engineered to minimize residual stresses.
- Integrated automated hydraulic punch stations ensuring accurate pitch consistency for rack assembly slots.
- PLC-driven control interface with touch panel for profile length indexing and batch configuration.
- Comprehensive trial runs verified profile dimensional conformity with calibrated optical gauging.

Buyers interested in profile feasibility studies or custom tooling line arrangements are invited to share drawings or physical profile samples for technical review.`,
      featuredImage: {
        url: "/images/product_lines/roll-forming.png",
        publicId: "empirical-india/news/roll-forming-1",
        alt: "Custom automated roll-forming line at Empirical India facility",
      },
      category: catRollForming._id,
      tags: ["roll-forming", "racking-profiles", "machinery", "engineering"],
      author: admin._id,
      status: "published",
      featured: true,
      seo: {
        metaTitle: "Automated Roll-Forming Line Commissioned | Empirical India",
        metaDescription: "Empirical India completes commissioning of a custom high-tensile profile roll-forming line with precision automated cut-to-length control.",
        keywords: ["roll forming line", "custom profiles", "racking sections", "industrial machinery"],
      },
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      title: "EngiTech Industrial Expo 2026: Live Showcase of Automated Roll-Forming & Modular Pallets",
      slug: "engitech-industrial-expo-2026-live-showcase",
      type: "event",
      excerpt: "Empirical India will exhibit custom roll-forming capabilities, cold roll-formed C-channel metal pallets, and precision luggage tubes at the upcoming EngiTech Expo.",
      content: `Empirical India is pleased to announce its participation in the EngiTech Industrial Expo 2026, one of the premier B2B manufacturing and engineering technology exhibitions in Western India.

Visit Our Booth to Connect with Engineers:
Our engineering leadership and design teams will be available throughout the four-day event to conduct technical reviews of buyer drawings, sample profiles, and warehousing load cases.

What We Will Showcase:
- Sample cold roll-formed sections demonstrating sharp radii and complex cross-sections.
- Modular metal pallet structural sub-assemblies highlighting welded C-channel strength and 4-way fork entry.
- Precision cut-to-length trolley-bag tubes with custom punched ends and clean surface finishes.
- Interactive discussions on line layout planning, coil width optimization, and modular pallet design.

Event Schedule & Booth Information:
Location: Hall 3, Booth H3-42, Bombay Exhibition Centre, Mumbai
Dates: November 20 – 23, 2026
Hours: 09:30 AM – 06:00 PM IST

Advance Meeting Appointments:
To reserve a dedicated 1-on-1 technical consultation slot with our roll-forming design engineers during the expo, please submit your drawing or requirement in advance through our contact page.`,
      featuredImage: {
        url: "/images/bg2.png",
        publicId: "empirical-india/news/expo-2026",
        alt: "EngiTech Industrial Expo 2026 Exhibition Announcement",
      },
      category: catExpos._id,
      tags: ["exhibition", "trade-show", "engitech", "mumbai"],
      author: admin._id,
      status: "published",
      featured: true,
      eventDetails: {
        startDate: new Date("2026-11-20T09:30:00.000Z"),
        endDate: new Date("2026-11-23T18:00:00.000Z"),
        location: "Hall 3, Booth H3-42, Bombay Exhibition Centre, Mumbai",
        registrationUrl: "/contact?event=engitech2026",
      },
      seo: {
        metaTitle: "EngiTech Industrial Expo 2026 | Empirical India",
        metaDescription: "Meet Empirical India at EngiTech Expo 2026 in Mumbai. Explore custom roll-forming machinery and modular metal pallet solutions.",
        keywords: ["industrial expo", "engitech 2026", "manufacturing expo", "mumbai"],
      },
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      title: "High-Volume Modular Metal Pallet Manufacturing Line Operational in Nashik",
      slug: "modular-metal-pallet-manufacturing-operational-nashik",
      type: "news",
      excerpt: "Dedicated assembly and automated roll-forming for cold-formed C-channel metal pallets is fully operational, catering to heavy-duty industrial storage requirements.",
      content: `To address growing industrial demand for hygienic, durable, and fire-resistant warehouse handling solutions, Empirical India has expanded its dedicated modular metal pallet fabrication capacity at its Nashik facility.

Engineered Around Customer Load Cases:
Unlike standard wooden or plastic pallets, Empirical India's metal pallets are manufactured to specific dimensional requirements, forklift entry profiles, racking arrangements, and validated load capacities.

Key Structural Specifications:
- Decking and support runners roll-formed from premium structural steel coils with C-channel profiles.
- 4-way and 2-way forklift handling provisions engineered with reinforced entry chamfers.
- Precision robotic welding and surface coatings designed for harsh industrial and cleanroom environments.
- Stackable and nestable configurations available based on client warehouse racking clearances.

RFQ & Design Review Process:
Buyers can submit pallet load requirements (static, dynamic, and racking loads), target deck dimensions, handling equipment details, and operational environment conditions to receive an engineering proposal.`,
      featuredImage: {
        url: "/images/product_lines/metal-pallets.png",
        publicId: "empirical-india/news/pallets-production",
        alt: "Modular metal pallets manufactured by Empirical India",
      },
      category: catMetalPallets._id,
      tags: ["metal-pallets", "warehousing", "logistics", "storage"],
      author: admin._id,
      status: "published",
      featured: false,
      seo: {
        metaTitle: "Modular Metal Pallet Manufacturing Operational | Empirical India",
        metaDescription: "Empirical India expands custom modular metal pallet production in Nashik for heavy industrial and racking applications.",
        keywords: ["metal pallets", "steel pallets", "modular pallets", "warehouse storage"],
      },
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    },
    {
      title: "Precision Trolley-Bag Tube Forming Bay Upgraded with In-Line Sizing Controls",
      slug: "precision-trolley-bag-tube-forming-bay-upgraded",
      type: "news",
      excerpt: "Specialized cold-forming and deburring lines enhanced to ensure high-accuracy cut lengths and straightness for luggage manufacturing clients.",
      content: `Empirical India has completed upgrades to its specialized tube forming and finishing cells dedicated to luggage and trolley-bag manufacturing applications.

The production cell supports custom cross-sections, strict wall-thickness tolerances, calibrated cut lengths, and end-slot configurations demanded by modern luggage assembly lines.

Quality Improvements Implemented:
- In-line calibration stands ensuring consistent outer diameter and wall section uniformity.
- Bur-free high-speed rotary cutoff machinery ensuring clean, ready-to-assemble tube ends.
- Batch straightness inspection utilizing precision granite surface plates and dial indicators.
- Customized protective packaging preventing transit scratches and deformation.

Luggage manufacturers requiring verified tube samples or drawing reviews can contact our technical sales team with their exact dimensional and slot drawing criteria.`,
      featuredImage: {
        url: "/images/product_lines/tubes.png",
        publicId: "empirical-india/news/tubes-bay",
        alt: "Precision tubes for trolley-bag manufacturing",
      },
      category: catMilestones._id,
      tags: ["trolley-tubes", "precision-tubes", "luggage", "manufacturing"],
      author: admin._id,
      status: "published",
      featured: false,
      seo: {
        metaTitle: "Trolley-Bag Tube Forming Bay Upgraded | Empirical India",
        metaDescription: "Empirical India upgrades specialized tube forming and deburring line for trolley-bag and luggage manufacturing applications.",
        keywords: ["trolley tubes", "luggage tubes", "tube forming", "precision cutting"],
      },
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
    {
      title: "Warehousing & Logistics Summit 2026: Technical Consultation Sessions Announced",
      slug: "warehousing-and-logistics-summit-2026-technical-sessions",
      type: "event",
      excerpt: "Join Empirical India's senior engineers at Pragati Maidan for technical sessions on cold roll-formed racking profiles and heavy industrial pallet design.",
      content: `Empirical India will be participating in the annual Warehousing & Logistics Summit 2026 in New Delhi, hosting interactive technical roundtables focused on structural efficiency in modern storage systems.

Discussion Topics:
- Structural weight optimization through roll-formed high-strength steel profiles.
- Life-cycle durability comparison: Modular steel pallets vs traditional timber/composite pallets in automated ASRS warehouses.
- Minimizing tooling downtime through modular roll-forming cassette designs.

Meeting Registration:
Delegates and supply chain managers can pre-register for 1-on-1 consultations with our technical team to discuss upcoming warehouse automation or line installation projects.`,
      featuredImage: {
        url: "/images/bg3.png",
        publicId: "empirical-india/news/logistics-summit",
        alt: "Warehousing and Logistics Summit 2026",
      },
      category: catExpos._id,
      tags: ["summit", "logistics", "warehousing", "new-delhi"],
      author: admin._id,
      status: "published",
      featured: false,
      eventDetails: {
        startDate: new Date("2026-12-08T10:00:00.000Z"),
        endDate: new Date("2026-12-10T17:00:00.000Z"),
        location: "Hall 5, Pragati Maidan Exhibition Complex, New Delhi",
        registrationUrl: "/contact?event=logistics-summit-2026",
      },
      seo: {
        metaTitle: "Warehousing & Logistics Summit 2026 | Empirical India",
        metaDescription: "Consult with Empirical India engineers on storage structural profiles and steel pallets at the Warehousing & Logistics Summit 2026.",
        keywords: ["logistics summit", "warehousing expo", "asrs pallets", "new delhi"],
      },
      publishedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
    },
    {
      title: "Quality Engineering Milestone: Digital Optical Profile Verification Bay Commissioned",
      slug: "digital-optical-profile-verification-bay-commissioned",
      type: "news",
      excerpt: "Empirical India institutes high-accuracy optical cross-section inspection to verify roll-formed profile geometry directly against client CAD drawings.",
      content: `As part of our commitment to engineering-led manufacturing, Empirical India has completed the integration of a digital profile measurement system at our Nashik plant.

Our Quality Verification Workflow:
1. Understand: Analyze customer profile tolerances, steel grade, and assembly requirements.
2. Define: Establish allowable angular, web, and flange variations per application standards.
3. Engineer: Fabricate precision tooling with micro-adjustable roll stand clearances.
4. Manufacture: Conduct pilot roll-forming runs under controlled line speeds.
5. Verify: Scan cross-sections using high-resolution optical profile comparators.
6. Dispatch: Securely pack verified sections with dimensional inspection certificates.

This optical verification capability guarantees that roll-formed sections supplied for racking uprights, solar mounting profiles, and pallet runners mate perfectly in the field without on-site reworking.`,
      featuredImage: {
        url: "/images/bg1.jpg",
        publicId: "empirical-india/news/quality-bay",
        alt: "Digital optical profile measurement bay at Empirical India",
      },
      category: catMilestones._id,
      tags: ["quality", "inspection", "engineering", "tolerances"],
      author: admin._id,
      status: "published",
      featured: false,
      seo: {
        metaTitle: "Optical Profile Verification Bay Commissioned | Empirical India",
        metaDescription: "Empirical India introduces high-precision optical profile measurement to verify roll-formed cross-section geometry against CAD drawings.",
        keywords: ["quality inspection", "optical verification", "tolerances", "profile measurement"],
      },
      publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
    },
  ];

  for (const item of items) {
    await NewsEvent.create(item);
  }

  console.log(`Successfully seeded ${items.length} news & events items!`);
  await mongoose.disconnect();
  console.log("Seeding complete. Disconnected.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
