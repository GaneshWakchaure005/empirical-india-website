# Empirical India — Project Progress

Last reviewed: 2026-11-01

## Admin image upload limit — 2026-11-01

- Enforced a shared **2 MB per image** limit for product/category/gallery uploads, blog covers and news/event images, including shared drag-and-drop uploads and legacy manager forms.
- Files larger than the limit trigger an immediate visible warning before upload. Server-side Cloudinary validation enforces the same limit for every admin image endpoint; JPG, PNG and WebP remain supported.
- Updated helper text and API documentation. Existing images are unaffected. Backend tests pass: **27 passed**, including exactly 2 MB accepted and one byte over rejected with a clear warning.

## Solar Structures category confirmed — 2026-11-01

- Reviewed solar references throughout the centralized data: homepage, About milestone, Products & Solutions, Industries, Projects/customer names, launch checklist, product catalogue exports/cards, roll-forming applications and the dedicated solar category file.
- Database inspection found Solar Structure already stored under `solar-structures` with two products, but marked draft; the published-only catalogue therefore hid it.
- User confirmed Solar Structures as the fourth product category. Standardized its source name to `Solar Structures` and source ID/slug to `solar-structures`; retained both existing child-product URLs and all technical content.
- Added targeted seeding with `--category=solar-structures --publish`. Existing admin content is preserved; only the explicitly selected category is published. Newly imported categories default to published following confirmation of all four ranges.
- Ran the targeted seed successfully and verified the configured database: all four canonical categories are published (5 roll-forming products, 3 pallet products, 2 tube products, 2 solar products). Solar's category image and both existing child URLs are present. Product schema tests and whitespace checks pass.
- Earlier notes describing solar as awaiting category approval are superseded by this confirmation. Individual technical/business claims still require their normal approval workflow.

## Enquiry email and database loading UI — 2026-11-01

- Added Hostinger SMTP notifications after successful enquiry persistence, using the configured SMTP mailbox as sender and default recipient, with the buyer's validated email as Reply-To. `ENQUIRY_EMAIL_TO` can override the recipient.
- Added TLS/config validation, bounded SMTP timeouts, plain-text RFQ details, safe error codes and protection against remote file/URL reads by the mailer. Selected filenames are not misrepresented as uploaded attachments.
- Added persistent notification states, attempts, sent time/message ID, atomic send claims, duplicate-send prevention, and an authenticated admin retry action with visible delivery status. SMTP failures preserve the original saved enquiry and the buyer's success response.
- Added configuration/mail-schema tests and database notification tests using a fake sender. Success, failure, concurrent calls, sent-record suppression and retry recovery pass; temporary test records were removed. Existing backend tests: 24 passed.
- Live SMTP connection reaches the server but authentication is rejected (`SMTP_AUTH_FAILED`), including after the environment file was renamed to `.env`. Its password loads as written. No live test email has been sent; mailbox receipt remains blocked on valid SMTP credentials. Restart/redeploy after configuration changes, then run `rtk npm run test:smtp -- --send-test`.
- Added shared responsive spinner/card skeleton UI for product catalogue/category/detail loading and blog/news database requests, plus route-level loading boundaries. Loading text is centralized; status announcements and reduced-motion preferences are supported. Existing content/empty/error states replace the loader when requests settle.
- Headless Edge checks passed for blog/news loaders under delayed success and error responses, and the product server-streaming fallback. No browser exceptions or horizontal overflow were detected in the tested mobile/desktop layouts.
- TypeScript and scoped ESLint pass. See `docs/enquiry-email.md` for SMTP setup, notification behavior, retry controls and test commands.

## Product CMS implementation — 2026-11-01

### Admin editor usability update

- Replaced the recursive database-style form with a searchable catalogue and category filter. Product rows open that product directly; category settings and Add product are separate actions.
- Added a focused editor with Essentials, Images, Specifications, and Search settings sections. Only the active section renders; other products are not mounted in the form.
- Added inline image previews/upload feedback, gallery controls, simple specification rows, one-item-per-line lists, automatic new URLs, hidden internal IDs, and protected existing URLs.
- Added sticky save/cancel actions, publication guidance, saved/unsaved states, discard confirmation and browser unload protection, accessible keyboard-operated tabs, and responsive two-column mobile section navigation.
- List requests now return only summaries: approximately **2.5 KB** for the existing 4 categories / 12 products. Editor/validation JavaScript loads on demand; search/filter are local, and saves update the list without refetching it.
- Verified with a real headless Edge browser: search/filter, direct editing, tabbed fields, specifications, save persistence, stable URLs, discard confirmation, category SEO, adding a product with an automatic URL, and mobile viewport overflow. Temporary browser-test records were removed; the seeded catalogue remains 4 categories / 12 products.
- TypeScript, scoped ESLint, and product schema tests pass for the simplified editor. This update does not change existing public content or seed data.

- Added `/admin/products` to desktop/mobile administration, using the existing admin/editor authentication.
- Added MongoDB `ProductCategory` persistence, nested product schemas, shared Zod validation, protected CRUD endpoints, and a public published-only catalogue endpoint.
- Admins can create/edit/delete categories and their products, change descriptions and all structured catalogue text, manage galleries/images, update specifications/features/applications, edit FAQs/enquiry copy/SEO, control display order, and publish/unpublish categories.
- Images support Cloudinary upload, replacement, removal from website content, and alt text. Uploads use the existing authenticated image endpoint with a dedicated products folder and 2 MB JPEG/PNG/WebP validation. Saving waits for active uploads. Shared Cloudinary assets are retained when references are removed.
- Public category/detail pages now read database content and generate metadata from it. Existing routes remain available; generic category/product routes support newly created entries. Existing category URLs and retained product slugs are protected against accidental changes.
- Homepage/products catalogue cards, navbar, footer, and contact business-line options use the published database catalogue. Contact retains the existing product-specific technical prompts for the three main lines. General editorial homepage hero/landing-page copy remains in centralized data files.
- Seeded the actual configured MongoDB database successfully: **4 categories / 12 products** — roll-forming lines (5), modular pallets (3), trolley-bag tubes (2), solar structures (2). The three primary lines are published; solar is a draft pending client approval.
- Import preserves static product text/structures and existing category-card photography. Repeat seeding retains existing admin-managed records; a legacy pair of `"null"` category images is filled from the existing static card images. No new technical claims were invented.
- Added `docs/products-admin.md` covering editing, schema/API structure, migration, and repeatable tests.

### Verification for this implementation

- Product Zod/Mongoose schema tests: passed, including all four original static categories, nested content, image URLs, publication defaults, invalid inputs, and duplicate child IDs/slugs.
- Existing backend tests: **24 passed, 0 failed**.
- Authenticated HTTP integration tests: passed for CRUD, invalid/anonymous submissions, duplicate rejection, draft visibility, publication, category/detail rendering, stable category URLs, nested product/image updates, removal, and deletion.
- Real Cloudinary upload: passed with a temporary test image; temporary category/product records and uploaded image were removed afterward.
- TypeScript (`tsc --noEmit`): passed after the RFQ integration fix.
- ESLint on new product CMS code/routes/scripts: passed. Whole-repository lint was not run.
- `git diff --check`: passed.
- Production build compiled, type-checked, and generated the pages, but **exited with an existing Next.js security-vulnerability gate**. Upgrade the installed Next.js version before treating the release build as passing; dependencies were not upgraded in this task.
- No visual browser, mobile-layout, or keyboard/screen-reader acceptance pass was performed. HTTP rendering checks do not establish those results.

The original review below describes the pre-CMS baseline. The implementation and validation notes above supersede its product-related and test-status observations.

## Review scope

Initial quick source-code review of routes, components, content data, enquiry handling, authentication, configuration, and existing test scripts. Runtime checks for the subsequent product CMS work are recorded above. Implementation does not establish client approval of existing claims.

## Current state

The project has a substantial public website and an admin/backend implementation. It is still pending content alignment, completion of the RFQ attachment flow, missing pages, and launch validation. A reliable completion percentage cannot be established from source inspection alone.

## Implemented in source

| Area | Evidence / progress |
| --- | --- |
| Framework | Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and reusable components. |
| Shared layout | Navbar, footer, conditional admin/public site chrome, global styles, and not-found page. |
| Public pages | Home, About, Products & Solutions, Industries, Contact/RFQ, News, and Blogs. |
| Product pages | Roll-forming lines, modular metal pallets, trolley-bag tubes, and dynamic product-detail routes. Solar category and detail routes also exist; see approval issue below. |
| Content layer | Centralized TypeScript modules in `data/`, plus structured product catalogues in `data/products-data/`. |
| Enquiry UI | Contact fields, product query-parameter preselection, business-specific guidance, client validation, loading state, success/reference display, and local file selection. |
| Enquiry backend | `POST /api/enquiries` validates JSON with Zod and persists enquiries in MongoDB through Mongoose. |
| Admin | Login, dashboard, news/blog management, categories, enquiry inbox, and image uploader components/routes. |
| Authentication | Password hashing, signed JWTs, HTTP-only cookie settings, admin route proxy, and role-check helpers. |
| Integrations | MongoDB and Cloudinary helpers; environment-variable template and admin/news seed scripts. Actual service connectivity is unverified. |
| SEO foundation | Site metadata, Open Graph defaults, and canonical metadata on inspected public pages. |
| Developer checks | ESLint configuration and `scripts/test-backend.ts`; `lint`, `build`, and `test:backend` package scripts. API documentation is present. |

## Priority issues

### 1. Align product architecture with the approved brief

- Solar remains in legacy homepage editorial data and dedicated route files. Its imported database category is now a draft, excluded from live catalogue cards/navigation and published product pages. Confirm its placement before publication and align the remaining editorial references.
- Confirm its placement and then align navigation, homepage, product data, and enquiry options consistently.
- Review company milestones, customer proof, technical claims, leadership information, and imagery against written approvals. For example, `data/02-about.ts` includes a 15 MW solar supply milestone; approval was not established during this review.

### 2. Finish the RFQ flow

- The form currently sends only `attachmentName` in JSON. It does **not** upload the selected file bytes, despite displaying an attachment in the success state.
- Implement file storage and attachment delivery/access, with server-side size/type checks and file safety controls. The existing admin image uploader does not establish support for public RFQ documents.
- The file input has an extension filter and a client-side 15 MB check, but the public enquiry route accepts optional attachment strings without processing files.
- Consent is checked in the browser but is absent from the submitted payload and server schema. Complete privacy linking and server-side consent handling.
- Submission failures populate `errors.form`, but the inspected form does not render that error. Add an accessible failure message and retry path.
- Add spam protection and verify notification delivery to the designated recipient. The inspected endpoint stores enquiries but contains no mailbox notification logic.

### 3. Complete the planned site routes

No corresponding route files were found for:

- `/projects` and `/projects/[slug]`
- `/quality-manufacturing`
- `/careers`
- `/resources`
- `/privacy` and `/cookies`
- `/industries/[slug]`

Some supporting content already exists in `data/07-quality-manufacturing.ts`, `data/09-projects.ts`, and `data/11-careers.ts`. Publish only approved projects, applications, and real vacancies.

### 4. Resolve launch configuration and security

- `lib/auth.ts` and `proxy.ts` fall back to a hardcoded signing secret when `AUTH_SECRET` is missing. Require a configured secret for production and remove the production fallback.
- Confirm the primary domain: metadata currently uses `https://www.empiricalindia.com`, while project instructions flag the `.com` versus `.in` discrepancy.
- No sitemap or robots route/static file was found in the tracked project file scan. Add and validate these alongside canonical URLs and migration redirects.
- Verify deployment environment values, MongoDB, Cloudinary, admin provisioning, and enquiry ownership without exposing credentials.

### 5. Finish content and release checks

- Move remaining business/UI copy out of presentation components where appropriate; the footer and RFQ form contain hardcoded copy.
- Replace the scaffold README with project setup, environment, admin setup, testing, and deployment instructions.
- Review the client-provided content brief directly before final acceptance; its PDF was not found in the scanned project files.
- Check all links and product CTA query parameters, approved imagery, alt text, keyboard interaction, form error announcements, and mobile/desktop layouts.
- Validate image loading, performance, per-page metadata, and publication approval for all company/customer claims.

## Suggested next sequence

1. Confirm solar placement and audit approval-sensitive content.
2. Complete and test RFQ submission, attachments, consent, spam protection, and recipient delivery.
3. Remove the production authentication-secret fallback.
4. Implement missing priority pages and approved supporting content.
5. Confirm domain/migration configuration and add sitemap/robots support.
6. Run `rtk npm run lint`, `rtk npm run test:backend`, and `rtk npm run build`; record actual outcomes.
7. Perform browser and integration acceptance checks before release.

## Validation status

- Source inspection: performed.
- Initial Git working tree: clean.
- Product implementation tests/type checks and scoped lint: see the newer results above; build exits on the existing Next.js vulnerability gate.
- Visual browser, responsive, accessibility, and end-to-end RFQ checks: not performed.
- MongoDB seeding and Cloudinary test upload: verified for the configured local environment. Client approvals, production configuration, and mailbox delivery remain unverified.
