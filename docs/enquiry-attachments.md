# Enquiry attachments

The contact/RFQ form submits multipart form data to `POST /api/enquiries`, including one optional `attachment` file. JSON requests without attachments remain supported. Uploaded URLs and Cloudinary public IDs supplied by callers are rejected; the server creates this metadata after a successful upload.

New enquiries use short sequential references such as `EI-RFQ-000001`. A persistent MongoDB counter atomically allocates numbers across concurrent requests and server restarts. Existing references are preserved. Failed saves can leave gaps; allocated numbers are never reused. `npm run test:enquiry-references` checks 30 concurrent allocations with an isolated test counter.

The admin detail modal uses a three-column desktop grid for contact/status, requirement/notes, and attachment, with a viewport-bounded shell and persistent header/footer. Browser checks at 1024×768, 1366×768 and 1440×900 confirmed no content scrolling for the reported enquiry. Tablet/mobile layouts reflow and retain scrolling for content that cannot fit; long requirements remain fully accessible.

Supported files: PNG, JPG/JPEG, WebP, PDF, DWG, DXF and STEP/STP, up to 15MB. Both browser and server validate the size/extension; the server also checks the file signature. Empty files, unsupported formats and oversized request bodies are rejected before storage. Multipart parsing has a bounded request size even without Content-Length. This is format validation, not antivirus scanning.

Files are uploaded using the existing Cloudinary credentials as authenticated **raw** assets under `empirical-india/enquiries/`. Raw storage preserves original image/document bytes. MongoDB stores the filename, unsigned HTTPS URL, Cloudinary public ID, resource type, content type, format and file size. A direct unsigned URL cannot access the private asset.

The existing notification service reads the saved enquiry, retrieves the file using a short-lived server-signed Cloudinary URL and attaches its bytes to the email. Nodemailer still cannot read arbitrary URLs or local paths. The email also includes a signed download link valid for seven days. Its subject remains `New website enquiry`, with no reference ID in the message. The normal Hostinger SMTP settings and recipient are unchanged.

HTML and plain-text versions are both sent. The HTML version has a named **View / download attachment** link so long signed URLs remain clickable in Hostinger webmail. Buyer-supplied content is HTML-escaped.

A Next development reload can retain Mongoose's old compiled model. The model now adds missing schema fields and recompiles its document accessors, preventing strict mode from silently dropping new upload metadata. Existing URL-only records are resolved from this account's authenticated Cloudinary enquiry folder; arbitrary hosts, accounts and folders are not fetched. The reported screenshot record was repaired from its stored URL after verifying the original file, and one corrected notification was accepted by the configured SMTP server.

In the admin enquiry detail, images show a preview and all supported files have a download link. `GET /api/admin/enquiries/[id]/attachment` requires an active admin/editor session, fetches the original from Cloudinary and returns it with no-store, nosniff and a safe Content-Disposition. Add `?download=true` to download images instead of displaying them. Non-image files always download. No private signing keys are sent to the browser.

On a database failure after upload, the orphaned Cloudinary asset is removed. On an email failure, the enquiry and file remain stored and the existing notification retry sends the same attachment. Deleting the enquiry also attempts to delete its Cloudinary file; storage cleanup failures are logged. Older enquiries that contain only a filename cannot recover the original file and are labelled accordingly.

Validation:

- `npm run test:enquiry-attachments`: actual route handlers and MongoDB, stubbed Cloudinary and mail delivery. Checks multipart submissions, stored metadata, byte-for-byte email attachments, authenticated preview/download, rejected files, injected URLs, upload/database failures, cleanup and notification retries. No real emails sent.
- `npm run test:enquiry-attachments -- --cloudinary`: real disposable private PNG/PDF/STEP uploads, unsigned URL access rejection, byte-for-byte downloads, and cleanup. No real emails sent.
- `npm run test:enquiry-mail`, `npm run test:enquiry-notifications`, `npm run test:admin-api`, TypeScript and production build.
- `npm run test:enquiry-model-reload`: reproduces a stale compiled schema and verifies that all new metadata fields survive strict mode and have document accessors.

Verified 106 attachment integration checks, 122 admin API checks, cached-model recovery, and real private Cloudinary PNG/PDF/STEP uploads and downloads, including URL-only records. Disposable Playwright checks passed at 1440px and 390px for both the original upload flow and the actual repaired screenshot's preview/download. Automated regression mail delivery is serialized locally; a single corrected notification for the reported enquiry was also accepted by the real SMTP server, and its signed link returned the original 141,480-byte PNG. Temporary test files/accounts/records were removed.

The installed Next.js version also emits an existing security advisory during builds; upgrading it is separate from this attachment change.

Deploy the updated app for the new form/API to take effect. Any hosting reverse proxy must allow multipart request bodies slightly larger than 15MB and enough execution time for Cloudinary and SMTP. Cloudinary account quotas still apply. Existing filename-only enquiries are not migrated into files.
