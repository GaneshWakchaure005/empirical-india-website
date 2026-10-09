// Centralized content file for Empirical India Blogs
// Adheres to AGENTS.md content-layer conventions

export const BlogsContent = {
  page: "Engineering Blogs & Technical Insights",
  route: "/blogs",
  hero: {
    badge: "Engineering Insights & Articles",
    title: "Engineering Insights & Technical Articles",
    subtitle:
      "Deep dives into custom roll-forming technology, modular metal pallet design, precision tube forming, and modern B2B manufacturing best practices from Empirical India.",
    backgroundImage:
      "https://res.cloudinary.com/f4j2yhrc/image/upload/v1791548158/Pastel_Waves_of_Ideas_and_Insights.webp",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blogs" },
    ],
    chips: [
      { label: "Roll-Forming Technology", href: "/products/roll-forming-lines" },
      { label: "Modular Metal Pallets", href: "/products/modular-metal-pallets" },
      { label: "Trolley-Bag Tubes", href: "/products/trolley-bag-tubes" },
    ],
  },
  listing: {
    searchPlaceholder: "Search engineering articles, tooling, materials...",
    allCategoryLabel: "All Topics",
    showingText: "Showing",
    ofText: "of",
    articlesText: "articles",
    emptyTitle: "No Matching Articles Found",
    emptyDescription:
      "We couldn't find any published technical articles matching your current filter criteria. Try searching with different keywords or exploring all categories.",
    errorTitle: "Unable to Load Blog Articles",
    errorDescription:
      "We encountered a connection issue while fetching published blogs. Please check your network and retry.",
    retryButtonText: "Retry Connection",
    resetFiltersText: "Reset All Filters",
  },
  cta: {
    badge: "Direct Engineering Discussion",
    title: "Have a Custom Drawing or Manufacturing Requirement?",
    subtitle:
      "Share your profile drawing, load cases, or sample dimensions with our Nashik engineering team for a feasibility review and technical quote.",
    primaryButtonText: "Request a Technical Quote",
    primaryButtonHref: "/contact?topic=blogs",
    emailText: "sales@empiricalindia.com",
    emailHref: "mailto:sales@empiricalindia.com",
  },
} as const;

export default BlogsContent;
