# Technical SEO implementation

Canonical domain confirmed by the client: **https://www.empiricalindia.com**.

Public SEO copy and location details live in `data/seo.ts`; metadata, absolute URLs and schema helpers live in `lib/seo.ts`. The Nashik address comes from the site's existing published facility address. No certifications, ratings, prices, capacities, export countries or customer claims were added.

Implemented:

- Unique titles and descriptions, canonical URLs, Open Graph and Twitter cards for all live public routes. Brand suffixes are normalized to avoid duplicate company names in titles.
- A single stable, descriptive homepage H1 in place of four carousel H1s. About, contact and primary product headings now describe the actual manufacturing offering and Nashik location. Product-specific headings remain specific to each product.
- Primary commercial pages target roll-forming machinery, modular metal pallets and trolley-bag tubes in Nashik/India. Existing solar URLs remain intact; no additional primary business or location doorway pages were created.
- Published blog/news lists and article content render on the server instead of requiring a browser API fetch to obtain the primary text. Metadata and article content use the same request-cached, publication-filtered database source. No self-HTTP calls are needed for article SEO.
- A publication-filtered XML sitemap at `/sitemap.xml`, including database-managed category/product pages and published articles. Actual database update timestamps are used for dynamic `lastmod`; static pages do not get fabricated dates. Admin/API/draft/filter URLs are excluded.
- `/robots.txt`, noindex metadata and HTTP headers for admin/API pages, and noindex for filtered search/listing variants. Pagination uses real crawlable links and self-canonical page URLs.
- Organization/LocalBusiness and WebSite JSON-LD, product/article breadcrumbs, product entities, and BlogPosting/NewsArticle metadata. No fabricated offers, review scores or event attendance details. Product entities without commercial offers are not a promise of Product rich-result eligibility.
- A generated 1200×630 social preview image, safe JSON-LD serialization, existing responsive image optimization, and a permanent apex-domain redirect to `www`.
- Removed the public layout fallback that rendered the page twice in source HTML. Missing/unpublished article/product URLs are checked before response streaming so they return real 404 responses. Database availability failures return 503 rather than presenting missing content as a valid indexed page.

Verification:

`npm run build` and `npm run test:seo -- http://127.0.0.1:3108` against the production server. The HTTP crawl checks every sitemap URL for one H1, unique metadata, canonical/social tags, parseable JSON-LD, and internal-link response statuses. It also checks crawler rules, filter noindex, sharing-image delivery and real missing-page 404s. At implementation time there were 23 published pages and 23 linked internal routes. `npm run test:seo-rendering` additionally verifies initial article text/H1 rendering, JSON-LD escaping, unique static titles, canonical URLs and staging noindex without publishing test articles.

A disposable browser check passed at 1440px and 390px for home, about, products, industries, contact, blogs, news and the roll-forming category: one settled H1, visible headings, no horizontal overflow and no browser errors. The temporary script was removed. Real Search Console indexing and rich-result presentation cannot be verified without deployment and account access.

The installed Next.js version emits an existing security advisory. Upgrade that version separately before launch.

Launch work requiring domain/account access:

1. Deploy the updated app and confirm HTTPS/DNS and the `www` redirect on the actual host. Set `NEXT_PUBLIC_SITE_URL=https://www.empiricalindia.com`; do not use localhost as the production canonical origin.
2. Verify the domain in Google Search Console, optionally using `GOOGLE_SITE_VERIFICATION`. Submit `https://www.empiricalindia.com/sitemap.xml`, inspect the homepage and three primary product pages, and monitor indexing, canonical selection and Core Web Vitals. This implementation does not claim Search Console verification or submission has occurred.
3. Confirm control of the old `.in` domain and map valuable old URLs to relevant replacements before changing its DNS/redirects. Only the `.com` apex-to-www redirect is configured here.
4. Claim/verify Google Business Profile for the actual Nashik facility and confirm the same public company name, address, phone and website across the profile and site. Do not invent branch locations or reviews.
5. Review existing business claims, legacy customer logos, application descriptions and product specifications with the technical owner before publication. SEO changes do not validate all pre-existing company claims.
6. Publish approved, useful application and project content with genuine photos over time. Search performance also depends on competition, content quality, links, local profile signals and indexing; top rankings are not guaranteed. Google does not use meta-keywords as a ranking signal; keywords were also used naturally in meaningful visible headings and descriptions.

For staging, set `SITE_INDEXABLE=false` before building. Robots rules are crawler guidance, not access control; private admin and attachments still require authentication.

References: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Google's developer SEO guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers).
