# Empirical India — Centralized TypeScript Content

This package contains the website content as TypeScript modules for direct use in Next.js.

## Usage

```ts
import homeData from "@/data/01-home";
import productsData from "@/data/03-products-and-solutions";
import rollFormingData from "@/data/04-product-roll-forming-lines";
```

Or import everything through the barrel:

```ts
import {
  home,
  productsAndSolutions,
  productRollFormingLines,
} from "@/data";
```

Each data module uses `as const`, so TypeScript infers the literal structure and values without requiring manually maintained interfaces.

## Suggested project location

```text
src/
  data/
    00-site-overview.ts
    01-home.ts
    02-about.ts
    03-products-and-solutions.ts
    04-product-roll-forming-lines.ts
    05-product-modular-metal-pallets.ts
    06-product-trolley-bag-tubes.ts
    07-quality-manufacturing.ts
    08-industries.ts
    09-projects.ts
    10-news-and-events.ts
    11-careers.ts
    12-contact-rfq.ts
    13-design-engineering-handoff.ts
    14-content-and-launch-checklist.ts
    15-references.ts
    00-raw-pdf-pages.ts
    index.ts
```

The content is derived from the client-provided Empirical India Website Content Brief. Keep the verification notes and do not publish unapproved technical specifications, customer identities, certifications, capacities, or claims.
