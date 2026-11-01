# Enquiry mailbox notifications

New submissions to `POST /api/enquiries` are validated and stored in MongoDB first, then sent through the configured SMTP server. The SMTP account is the sender; the buyer's validated email is set as Reply-To. Emails contain the RFQ reference, business line, buyer/company/contact details, and the requirement.

## Environment

```dotenv
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-mailbox@example.com
SMTP_PASS=your-mailbox-password
ENQUIRY_EMAIL_TO=
```

`ENQUIRY_EMAIL_TO` is optional and defaults to `SMTP_USER`. Use the actual email mailbox password. Environment files follow normal Next.js precedence, so `.env.local` overrides `.env`. Restart/redeploy the app after changing environment variables.

Port 465 uses implicit TLS. For port 587, set `SMTP_SECURE=false`; the transport requires STARTTLS. Certificate verification remains enabled. Credentials are server-only and are not included in responses or failure logs.

## Delivery and retries

Each enquiry records its notification status (`pending`, `sending`, `sent`, `failed`), attempt count, last attempt, SMTP message ID and sent time. A failed notification does not fail the saved enquiry or encourage the buyer to submit a duplicate. Admin enquiry details show the mailbox status and offer **Send notification** for pending/failed attempts.

`POST /api/admin/enquiries/[id]/notify` uses existing admin/editor authentication. Atomic claims prevent concurrent sends and skip already-sent records. A send interrupted for more than five minutes can be retried. Failed notifications are not retried automatically; an administrator must use this action after resolving SMTP problems. SMTP acceptance does not prove inbox placement; check the mailbox/spam folder.

The current RFQ form submits a selected filename, not file bytes. The email explicitly identifies this limitation instead of claiming a file is attached. Uploaded document support remains a separate task. Supplied document URLs are included as text only; the mailer never fetches arbitrary files/URLs.

## Checks

```sh
rtk npm run test:enquiry-mail
rtk npm run test:enquiry-notifications
rtk npm run test:smtp
```

The first test checks config, message serialization, recipients, safe error codes and schema without sending email. The notification test creates and removes temporary records in the configured database, using a fake sender to verify success, failure, concurrency and retries. Use a test database when repeating database checks.

The SMTP check verifies connection/TLS/authentication without sending a message. To send one labelled test notification to the configured recipient:

```sh
rtk npm run test:smtp -- --send-test
```

At implementation time the configured server rejected authentication (`SMTP_AUTH_FAILED`), including after `.env.local` was renamed to `.env`. Live mailbox delivery remains unverified until credentials are corrected and the check succeeds.
