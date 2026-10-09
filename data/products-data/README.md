# Empirical India product category data

## Files
- `types.ts` — shared TypeScript types for category and child-product content.
- `roll-forming-lines.ts` — Roll Forming Lines and its 5 child products.
- `modular-pallets.ts` — Modular Pallets and its 3 child products.
- `tubes-for-trolley-bags.ts` — Tubes for Trolley Bags and its 2 child products.
- `solar-structure.ts` — Solar Structure and its 2 child products.
- `index.ts` — convenient named exports.

## Image placeholders
All image fields intentionally use the string `"null"`. Replace them with image URLs when ready. In the UI, treat this placeholder as missing:
```ts
const imageUrl = product.image !== "null" ? product.image : "/images/product-placeholder.webp";
```

## Suggested page structure
Use `category` fields for category landing pages and `category.children` for child-product detail pages. `pageSections` suggests the category page structure. Each child includes overview copy, highlights, features, technical specifications, applications, customization options, enquiry CTA copy, and SEO metadata.

## Important
Specification values such as load capacity, material grade, thickness, dimensions, line speed, and engineering requirements are intentionally marked `To be confirmed`, `As per drawing`, or similar wherever no verified values were provided. Confirm technical details with the manufacturer before publishing them as guaranteed specifications.
