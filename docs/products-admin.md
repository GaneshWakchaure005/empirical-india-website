# Product administration

Open `/admin/products` after signing in with the existing admin/editor login. Products are now read from MongoDB rather than the static catalogue files.

## Editing

- Find products with the search box or category filter. Click a product row to edit that product directly; use **Category settings** for the business-line page, or **New category** for a new range.
- Edit category copy, ordering, images, galleries, benefits, capabilities, industries, FAQs, enquiry copy, and SEO.
- Use **Add product** in a category header to create a product. Names generate new URLs automatically; internal IDs are hidden. Delete a product with the trash button in its editor after confirmation.
- The focused editor has four sections: **Essentials**, **Images**, **Specifications**, and **Search settings**. Only the active section is mounted. Start with a name and description; optional technical/SEO fields are available when needed.
- Each product supports descriptions, images, gallery, highlights, features, specifications, applications, customization options, enquiry title, and SEO.
- Category status controls publication of the category and its products together. New categories default to draft. Publish only approved content.
- Use the sticky **Save product** or **Save category** button. Cancel/back prompts before discarding changes, and browser unload protection covers unsaved edits. Image previews and upload feedback appear inline, and saving waits for active uploads.
- The list API returns summaries instead of full product content (about 2.5 KB for the seeded catalogue). The full editor and validation code load on demand, only the selected category is fetched, search/filter are local, and successful saves update the list without another fetch. Public pages and navigation read the updated catalogue on their next load/navigation.

Images can be uploaded to Cloudinary (JPEG, PNG, WebP, maximum 2 MB), replaced, or removed. Gallery entries support the same upload control. Removing an image clears its website reference; it does not permanently delete Cloudinary assets, which may be shared or retained for recovery. Uploaded images abandoned before saving can also remain in Cloudinary.

Existing category IDs/URL slugs cannot change. Existing child-product slugs cannot change while retaining their ID. Configure redirects before replacing a published product with another URL.

## Initial import

```sh
rtk npm run seed:products
```

The script loads the normal Next.js environment configuration, including `.env.local`. It imports the existing four static categories and 12 products into the `ProductCategory` collection, preserving technical text and product structures. All four categories, including the user-confirmed Solar Structures range, default to published on first import. Existing matching database records retain their content and publication settings, making repeat imports safe for admin edits. A legacy `"null"` category-image pair is filled from the existing homepage card imagery. The old solar category display name `Solar Structure` is normalized to `Solar Structures`.

To import/verify only Solar Structures and explicitly publish an existing draft:

```sh
rtk npm run seed:products -- --category=solar-structures --publish
```

This preserves existing product copy, images and nested products. `--publish` requires a specific `--category` to avoid changing other categories' visibility.

Static `data/products-data/` files remain as import/archive sources. Editing them after migration does not update the live catalogue. Other website editorial content remains in the existing centralized data files.

## API

| Endpoint | Access | Behavior |
| --- | --- | --- |
| `GET /api/products` | Public | Published categories and nested products only |
| `GET /api/admin/products` | Admin/editor | Lightweight category/product summaries, including drafts; fetch the detail endpoint for full editable content |
| `POST /api/admin/products` | Admin/editor | Create a validated category and nested products |
| `GET /api/admin/products/[id]` | Admin/editor | Read one category |
| `PUT /api/admin/products/[id]` | Admin/editor | Replace editable category/product content |
| `DELETE /api/admin/products/[id]` | Admin/editor | Delete category and all nested products |
| `POST /api/admin/upload` | Admin/editor | Upload image with `image` file and `folder=products` |

The shared Zod schema is `lib/product-validation.ts`; persistence is defined in `models/ProductCategory.ts`. IDs and category slugs are unique, child IDs/slugs must be unique within a category, and image URLs are restricted to configured HTTPS image hosts. The public catalogue is the source for product pages, homepage/products cards, navbar, footer, and contact business-line options. Dedicated engineering prompts for the three existing product lines remain in the contact data.

## Verification

```sh
rtk npm run test:products
rtk npm run test:backend
rtk npm run build
rtk npm run dev -- --hostname 127.0.0.1
```

With a local server running in another terminal:

```sh
rtk npm run test:products:integration
```

The integration test uses the configured database, creates a temporary category/product, checks authenticated CRUD and public rendering, and removes its records. It uses signed test credentials rather than changing a real administrator's account. If Cloudinary credentials are configured, it uploads and then deletes a temporary one-pixel test asset. Set `PRODUCT_TEST_URL` to use another local port. Do not point this test at a production site.
