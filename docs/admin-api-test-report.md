# Admin API verification

Run `npm run test:admin-api` with the project environment configured. The suite imports the actual Next.js route handlers and uses MongoDB with temporary records. It checks all 17 route modules and cleans up its account and content records. It does not publish any real company content.

122 checks cover unauthenticated access to every protected method, invalid JWTs through the proxy, login/password failures, cookie flags, logout, authenticated lists and detail lookups, missing/invalid IDs, invalid create payloads, CRUD for categories/blogs/news/products/enquiries, referenced category deletion, stable product URLs, live role changes and disabled accounts. See [enquiry attachments](enquiry-attachments.md) for the file upload, email and admin retrieval tests.

Fixed issues:

- Invalid pagination previously produced NaN database limits/offsets. Admin list routes now return validation errors for invalid values.
- Search and category duplicate checks interpreted input as regular expressions. Input now matches literal text.
- Malformed JSON returned HTTP 500. It now returns HTTP 400.
- Authentication used a public fallback signing secret. Both proxy and handlers now require AUTH_SECRET with at least 32 characters and validate JWT claims and algorithm.
- Existing tokens retained access after account deletion, deactivation or role changes. Each protected handler now checks the current account.
- Event creation accepted missing start dates and malformed end dates. These now fail validation.
- Upload requests with the wrong content type returned server errors. These now return HTTP 400.
- Product updates used a deprecated Mongoose option. They now use returnDocument.

Additional verification: 27 backend unit checks, product validation/schema tests, enquiry email tests, notification delivery-state database tests, TypeScript compilation and diff whitespace checks.

Repository-wide lint remains failing due to existing lint issues across UI, API, models and types (including explicit any and React component rules); it is not a passing launch check.

Limits: this is a handler-level integration suite, not a complete HTTP/browser test. Cloudinary deletion is stubbed; no media is uploaded and no real email is sent. SMTP and notification delivery are checked with test senders in separate suites. Real provider delivery and deployed cookie/proxy behavior still need a staging smoke test. The separate HTTP product suite now creates an actual temporary admin account to comply with live account verification.
