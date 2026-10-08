# AGENTS.md — Empirical India Website

## 1. Project Overview

Empirical India is an industrial B2B manufacturing website being redesigned and rebuilt from the company's old WordPress website.

The new website must present Empirical India as an engineering-led manufacturer with three primary business lines:

1. Custom roll-forming lines
2. Modular metal pallets
3. Tubes for trolley-bag manufacturing

The website is not a direct visual/content copy of the old WordPress site. The old website is a source for existing company information, projects, applications, and assets that must be reviewed and selectively reused.

The client-provided Website Content Brief is the primary source of truth for the new information architecture and draft website copy.

## 2. Core Project Goal

Build a credible, modern, industrial, export-ready B2B website that:

- Clearly communicates the three business lines immediately.
- Explains each product/business line with dedicated pages.
- Uses projects and applications as proof, not as a replacement for product structure.
- Generates qualified technical enquiries.
- Makes it easy for buyers to submit drawings, samples, specifications, and RFQ documents.
- Uses real company photography and verified technical information.
- Keeps all editable website content centralized in JavaScript data files.

Do not treat this project as an e-commerce storefront unless the client explicitly requests that later.

## 3. Source of Truth

### Primary source

The client-provided:

`Empirical_India_Website_Content_Brief.pdf`

The brief contains page structure, draft copy, technical information prompts, implementation requirements, content requirements, photography requirements, and launch checks.

### Centralized content source

All website copy and structured content must live in the project's centralized data files.

Recommended structure:

```text
src/
  data/
    00-site-overview.js
    01-home.js
    02-about.js
    03-products-and-solutions.js
    04-product-roll-forming-lines.js
    05-product-modular-metal-pallets.js
    06-product-trolley-bag-tubes.js
    07-quality-manufacturing.js
    08-industries.js
    09-projects.js
    10-news-and-events.js
    11-careers.js
    12-contact-rfq.js
    13-design-engineering-handoff.js
    14-content-and-launch-checklist.js
    15-references.js
    00-raw-pdf-pages.js
    index.js
```

If the repository uses another `data/` location, preserve the same concept and update imports consistently.

### Content rule

Pages/components should consume centralized data rather than duplicating copy.

Prefer:

```js
import homeData from "@/data/01-home";
```

over:

```js
const headline = "Engineered roll-forming lines...";
```

inside a page/component.

When content changes, the developer should be able to modify the relevant data file without editing the presentation component.

## 4. Do Not Invent Company Information

This is a critical project rule.

Never invent or assume:

- Machine specifications
- Machine speeds
- Production capacities
- Tolerances
- Load ratings
- Tube materials
- Tube dimensions
- Product grades
- Certifications
- Export countries
- Employee counts
- Installed-machine counts
- Project results
- Customer relationships
- Customer names
- Customer logos
- Leadership details
- Company milestones
- Service/support capabilities

If required content is missing, use an explicit placeholder in the data layer such as:

```js
{
  value: null,
  status: "pending-client-confirmation"
}
```

Do not fabricate a value merely to make the UI look complete.

## 5. Critical Unresolved Business Decision

The existing website contains solar-related products such as structural profiles, clamps, hardware, and other solar-oriented content.

The client brief does NOT definitively decide whether these should be:

- A fourth product/business range, or
- Applications/products under the roll-forming business.

Until the client confirms this, do not create solar as a permanent top-level product business.

The architecture should be easy to extend later.

## 6. Site Architecture

Recommended primary navigation:

```text
Home
About Us
Products & Solutions
Industries
Projects
Quality & Manufacturing
News & Events
Careers
Resources
Contact / Request a Quote
```

### Products & Solutions

```text
Products & Solutions
├── Custom Roll-Forming Lines
├── Modular Metal Pallets
└── Trolley-Bag Tubes
```

### Recommended routes

```text
/
/about
/products
/products/roll-forming-lines
/products/modular-metal-pallets
/products/trolley-bag-tubes
/industries
/industries/[slug]
/projects
/projects/[slug]
/quality-manufacturing
/news
/news/[slug]
/careers
/resources
/contact
/privacy
/cookies
```

Service/support should only be added if the company confirms that installation, commissioning, training, spares, or after-sales support is genuinely offered.

## 7. Product Architecture

The three product/business pages are core commercial pages.

### Custom Roll-Forming Lines

Suggested route:

`/products/roll-forming-lines`

The page should cover:

- Customer-defined profiles
- Product/profile definition
- Material
- Operations
- Production target
- Line arrangement
- Possible equipment modules
- Enquiry requirements

Possible modules must be presented as configuration-dependent, not guaranteed standard inclusions.

CTA:

`Share a profile drawing or sample`

### Modular Metal Pallets

Suggested route:

`/products/modular-metal-pallets`

The page should cover:

- Made-to-requirement pallet design
- Product dimensions
- Product weight
- Fork handling
- Storage
- Stacking/nesting/racking
- Material/profile
- Environment
- Load-case considerations
- RFQ inputs

Never publish a pallet load rating unless it has been validated for the actual design and stated use conditions.

CTA:

`Request a custom pallet review`

### Trolley-Bag Tubes

Suggested route:

`/products/trolley-bag-tubes`

The page should cover:

- Material and grade
- Tube section
- Dimensions
- Wall thickness
- Permitted variation
- Cut length
- Straightness
- End condition
- Holes/slots/end features
- Finish/coating
- Packaging
- Quantity
- Inspection/sample approval

Do not assume the material is steel, aluminium, or another material until the product owner approves it.

CTA:

`Send a tube drawing or sample`

## 8. Product Enquiry Flow

Every product page must have a visible enquiry CTA.

The selected product/business line should be passed into the enquiry flow.

Example:

```text
/products/roll-forming-lines
        ↓
Request Quote
        ↓
/contact?product=roll-forming-lines
```

The contact page should preselect the corresponding business line.

Use product-specific enquiry questions where appropriate.

Do not force every product through one generic set of technical questions.

## 9. Contact / RFQ Requirements

The enquiry form should support:

- Name
- Company
- Work email
- Phone
- Country/location
- Business line
- Requirement
- File attachment

Useful uploads include:

- Profile drawings
- Photos
- Material specifications
- Part dimensions
- Pallet dimensions
- RFQ documents

Implement:

- Client-side validation
- Server-side validation
- Consent/privacy link
- Spam protection
- File type validation
- File size limits
- File safety controls
- Success state
- Failure state
- Tested recipient mailbox

Do not promise response times unless the client approves a response SLA.

## 10. Projects vs Products vs Industries

These are three different concepts.

### Products

"What Empirical makes."

Examples:

- Roll-forming lines
- Modular metal pallets
- Trolley-bag tubes

### Industries / Applications

"Where the solutions are used."

Potential application areas from the brief include:

- Solar structures
- Prefabricated buildings
- Storage/racking
- Automotive components
- Pharma/cleanroom structures

These must be confirmed before publication.

### Projects

"What Empirical has actually delivered."

Use approved case studies with:

- Project title
- Requirement
- Scope
- Engineering details
- Outcome
- Evidence/photos
- Customer identity only when approved

Do not turn the Projects page into another generic product catalogue.

## 11. Project Data Model

Project data should be structured so it can connect a project to a product line and industry.

Example:

```js
{
  slug: "example-project",
  title: "Example Project",
  productLine: "roll-forming-lines",
  industry: "solar-structures",
  customer: {
    name: null,
    approved: false
  },
  requirement: "...",
  scopeSupplied: "...",
  engineeringDetails: "...",
  outcome: null,
  images: [],
  approvalStatus: "pending"
}
```

Do not expose unapproved customer names, logos, photographs, technical information, or results.

## 12. Homepage Structure

The homepage must quickly communicate:

1. What Empirical makes
2. The three business lines
3. What customization means
4. How a buyer starts a conversation

Recommended order:

```text
Hero
↓
Three Business Lines
↓
From Requirement to Production
↓
Approved Customer Logos
↓
Featured Project/Product Story
↓
Verified Company Proof
↓
Final Enquiry CTA
```

Do not put unverified statistics into the proof section.

If no verified number is available, omit the metric.

## 13. About Page

The About page should cover:

- Company introduction
- Engineering approach
- Values
- Leadership
- Company timeline
- Facility
- Verified milestones

Use authentic company/factory/team photography.

Do not use stock portraits for company leadership.

Leadership names and titles must be confirmed before publication.

## 14. Quality & Manufacturing Page

Recommended process:

```text
01 Understand
02 Define
03 Engineer
04 Manufacture
05 Verify
06 Dispatch
```

The displayed process must match the company's actual workflow.

Potential evidence:

- Inspection equipment
- Genuine quality checks
- Inspection records with confidential information removed
- Test/acceptance methods
- Approved certifications

Never use unsupported claims such as:

- "Zero defect"
- "Best in class"
- "Internationally certified"

unless the exact claim is substantiated and approved.

## 15. Industries Page

Use an application-led approach.

For each confirmed application:

- Explain the component/application.
- Identify the relevant Empirical product/business line.
- Use approved real imagery, drawings, or installation photos.
- Link to the appropriate enquiry flow.

Avoid vague industry cards with no actual application context.

## 16. News & Events

If implemented, every post should have:

- Title
- Publication date
- Owner
- Cover image
- Summary
- Full content
- Contact CTA

Content types can include:

- Product launches
- Machine dispatches
- Commissioning
- Exhibitions
- Facility milestones
- Technical explainers
- Customer-approved project stories

Keep stale event content out of the homepage.

## 17. Careers

Only publish real open roles.

Each role should include:

- Job title
- Location
- Experience
- Responsibilities
- Required skills
- Reporting line
- Application deadline
- Application method

Do not collect unnecessary sensitive information at the initial application stage.

## 18. Resources

Potential content:

- Company brochure
- Product brochures
- RFQ checklists
- Technical FAQs
- Other approved downloadable documents

Do not expose internal/confidential documents.

## 19. Customer Logos and Testimonials

Customer names/logos require approval.

Rules:

- Use approved logo files supplied by the client.
- Do not download unofficial logos.
- Do not redraw or recolor logos.
- Confirm the public-facing customer name.
- Confirm permission for public display.
- If logo permission is unavailable, use text only when the relationship is approved for disclosure.

Treat customer proof as controlled content, not decorative filler.

## 20. Image Rules

Prefer:

- Real factory photography
- Real machinery
- Real pallets
- Real tube production
- Genuine staff/facility photos
- Real inspection activity
- Approved project photographs

Avoid relying on generic stock imagery for important product claims.

Suggested photography:

### Roll-forming
- Wide production-line photo
- Decoiler/forming stand details
- Controls
- Finished profile next to an approved drawing/scale

### Pallets
- Three-quarter product view
- Underside
- Fork-entry detail
- C-channel detail
- Approved handling/storage use

### Tubes
- Straight bundle
- End-section close-up
- Length/dimension check
- Actual production equipment

### Facility
- Genuine team at work
- PPE
- Clean work areas
- Inspection
- Dispatch preparation

Get consent before publishing identifiable portraits.

## 21. Design Direction

Visual character:

- Restrained industrial identity
- Deep navy
- Steel grey
- White
- One controlled accent such as teal or copper
- Readable sans-serif typography
- Generous whitespace
- Clear heading hierarchy
- Short readable text blocks
- Large high-quality product/factory imagery

The design should feel premium and established without making unsupported claims about company size, revenue, capacity, certifications, or global presence.

## 22. UX Principles

Prioritize:

- Clear hierarchy
- Fast understanding of the three business lines
- Strong product CTAs
- Easy RFQ access
- Mobile readability
- Keyboard accessibility
- Good contrast
- Meaningful form errors
- Clear loading/error/success states
- Predictable navigation

Every major product section should answer:

```text
What is it?
↓
Who is it for?
↓
How is it configured?
↓
What information do you need from the buyer?
↓
How do I request a quote?
```

## 23. SEO

Each major page should have controlled metadata.

Support:

- Page title
- Meta description
- Canonical URL
- Open Graph image
- Meaningful page headings
- Descriptive image alt text
- XML sitemap
- robots configuration

Do not duplicate titles/descriptions across unrelated pages.

Use product-specific metadata from the centralized content data where possible.

## 24. Domain / Migration

The client brief identifies a domain discrepancy:

- Supplied domain: `www.empiricalindia.com`
- Indexed site reviewed in the brief: `empiricalindia.in`

Before launch, confirm:

- Primary domain
- HTTPS
- Redirect strategy
- Canonical URLs
- Email links
- Existing important URLs
- Search indexing
- Search Console
- Analytics

Preserve useful SEO equity from the old site where appropriate.

Do not remove old URLs without considering redirects.

## 25. Accessibility

The site must be:

- Keyboard accessible
- Mobile readable
- Semantically structured
- Labelled correctly
- Compatible with screen-reader semantics where applicable

Use:

- Real form labels
- Meaningful button text
- Useful alt text
- Visible focus states
- Proper heading hierarchy
- Accessible error messages

Do not put important copy only inside images.

## 26. Performance

Prioritize:

- Optimized images
- Modern image formats
- Responsive image sizing
- Lazy loading where appropriate
- Minimal client-side JavaScript
- Reusable components
- Avoid unnecessary dependencies
- Avoid oversized hero media

Use framework-native image optimization where available.

Do not sacrifice performance for decorative animation.

## 27. Component Architecture

Create reusable UI components rather than duplicating markup.

Suggested component areas:

```text
components/
├── layout/
├── navigation/
├── hero/
├── product/
├── industry/
├── project/
├── news/
├── forms/
├── cards/
├── sections/
└── ui/
```

Possible reusable components:

- ProductCard
- ProductHero
- ProductCTA
- ProductEnquiryForm
- IndustryCard
- ProjectCard
- ProjectCaseStudy
- CustomerLogoGrid
- ProcessTimeline
- TechnicalRequirementTable
- PageHero
- SectionHeading
- ContactCTA
- FileUploadField

Components should handle presentation. Data files should handle content.

## 28. Data Architecture

Do not scatter business copy throughout components.

Prefer:

```js
import productData from "@/data/04-product-roll-forming-lines";
```

Then:

```jsx
<h1>{productData.headline}</h1>
<p>{productData.body_copy}</p>
```

For repeated lists:

```jsx
{productData.how_a_line_is_configured.map((item) => (
  ...
))}
```

Keep technical data as structured objects/arrays where practical.

Do not turn structured data into hardcoded HTML just because it is currently short.

## 29. Naming Conventions

Use descriptive slugs and stable identifiers.

Good:

```text
roll-forming-lines
modular-metal-pallets
trolley-bag-tubes
```

Avoid:

```text
product1
machine-final
new-product
test-page
```

Keep URL slugs stable after launch.

If a slug must change, implement a redirect.

## 30. Do Not Over-Generalize

Reusable components are encouraged, but do not force all three product pages into identical content structures.

The three product lines have different technical questions.

Shared:

- Hero
- Intro
- Benefits/approach
- CTA
- Enquiry mechanism
- Related projects
- Related industries

Product-specific:

- Technical requirements
- Configuration details
- RFQ fields
- Validation warnings
- Specification content

Reuse structure where useful; do not flatten real differences.

## 31. Dependency Rules

Before adding a new dependency:

1. Check whether the framework or existing project already supports the feature.
2. Prefer existing utilities/components.
3. Add a dependency only when it provides meaningful value.
4. Do not introduce a UI library just for one component.
5. Avoid libraries that significantly increase bundle size for trivial functionality.

Do not rewrite the project's core stack unless explicitly requested.

## 32. Client Approval Workflow

Before publishing technical/business content, distinguish:

```text
Draft
↓
Client review
↓
Technical owner approval
↓
Public / approved
```

Items especially requiring confirmation:

- Product specifications
- Machine configuration claims
- Capacities
- Tolerances
- Pallet load ratings
- Tube material/section
- Certifications
- Customer names/logos
- Project results
- Leadership details
- Company milestones

## 33. Development Workflow

When implementing a new page:

1. Check the relevant centralized content file.
2. Check whether the content is marked as pending verification.
3. Build/reuse the appropriate layout component.
4. Keep copy out of the JSX when it belongs in the data layer.
5. Add responsive behavior.
6. Add accessibility.
7. Add metadata.
8. Check all links/CTAs.
9. Check mobile and desktop.
10. Do not invent missing business content.

## 34. What Not To Do

Do not:

- Copy the old WordPress page structure blindly.
- Recreate the old generic product catalogue without client approval.
- Invent specifications.
- Invent project outcomes.
- Invent customer relationships.
- Add unsupported certifications.
- Add fake statistics.
- Add "Buy Now" flows unless requested.
- Use generic stock imagery as evidence of Empirical's capabilities.
- Hardcode large blocks of copy inside components.
- Duplicate the same text across multiple pages unnecessarily.
- Add fake news or fake careers.
- Expose internal documents or confidential customer information.
- Add solar as a fourth primary business before client confirmation.
- Claim a feature exists if the client has not confirmed it.

## 35. Definition of Done

A page is not considered complete until:

- Correct centralized data is used.
- No unapproved business claims are present.
- Responsive layout works.
- Main CTA works.
- Product enquiry routing works where applicable.
- Images are optimized.
- Alt text is meaningful.
- Metadata is implemented.
- No broken links exist.
- No placeholder copy remains unless intentionally marked as pending client content.
- Loading/error/success states work where applicable.
- The page has been checked on mobile and desktop.

## 36. Priority Order

When trade-offs are required, prioritize in this order:

1. Correct business information
2. Product clarity
3. Qualified enquiry generation
4. Technical credibility
5. Accessibility
6. Performance
7. SEO
8. Visual polish
9. Decorative animation

Never sacrifice factual accuracy for visual completeness.

## 37. Final Principle

The website should make Empirical India's business easier to understand, not merely make the old website look better.

The core mental model is:

```text
WHAT WE MAKE
     ↓
PRODUCTS
     ↓
WHERE IT IS USED
     ↓
INDUSTRIES / APPLICATIONS
     ↓
WHAT WE HAVE DELIVERED
     ↓
PROJECTS / PROOF
     ↓
HOW WE WORK
     ↓
QUALITY & MANUFACTURING
     ↓
REQUEST A QUOTE
```

When uncertain, preserve the client's approved structure and ask for clarification rather than inventing content.
