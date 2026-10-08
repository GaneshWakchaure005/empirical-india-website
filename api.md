# API Reference — Empirical India

> **Audience:** Frontend developers consuming these APIs.  
> **Base URL (dev):** `http://localhost:3000`  
> **Base URL (prod):** `https://yourdomain.com`  
> All routes are Next.js App Router Route Handlers. No separate server.

---

## Table of Contents

- [Authentication](#authentication)
- [Standard Response Shapes](#standard-response-shapes)
- [HTTP Status Codes Used](#http-status-codes-used)
- [Admin APIs (Protected)](#admin-apis-protected)
  - [Auth — Login](#1-login)
  - [Auth — Logout](#2-logout)
  - [Auth — Current User](#3-get-current-user)
  - [Blogs — List](#4-list-blogs-admin)
  - [Blogs — Create](#5-create-blog)
  - [Blogs — Get One](#6-get-blog-by-id)
  - [Blogs — Update](#7-update-blog)
  - [Blogs — Delete](#8-delete-blog)
  - [News & Events — List](#9-list-news--events-admin)
  - [News & Events — Create](#10-create-news--event)
  - [News & Events — Get One](#11-get-news--event-by-id)
  - [News & Events — Update](#12-update-news--event)
  - [News & Events — Delete](#13-delete-news--event)
  - [Categories — List](#14-list-categories-admin)
  - [Categories — Create](#15-create-category)
  - [Categories — Get One](#16-get-category-by-id)
  - [Categories — Update](#17-update-category)
  - [Categories — Delete](#18-delete-category)
  - [Upload — Image](#19-upload-image)
  - [Dashboard — Stats](#20-dashboard-stats)
- [Public APIs (No Auth)](#public-apis-no-auth)
  - [Blogs — List (public)](#21-list-published-blogs)
  - [Blogs — Get by Slug](#22-get-published-blog-by-slug)
  - [News & Events — List (public)](#23-list-published-news--events)
  - [News & Events — Get by Slug](#24-get-published-news--event-by-slug)
  - [Categories — List (public)](#25-list-active-categories)
- [Image Upload Details](#image-upload-details)
- [Validation Rules Reference](#validation-rules-reference)
- [Common Error Reference](#common-error-reference)

---

## Authentication

All `/api/admin/*` routes (except `/api/admin/auth/login`) require a valid session.

### How to authenticate

**Option A — Cookie (recommended for browser clients)**  
Call `POST /api/admin/auth/login`. The server sets an HTTP-only cookie named `admin_token` automatically. Every subsequent request from the same browser sends it automatically. You do not read or write this cookie from JavaScript — it is `httpOnly`.

**Option B — Bearer Token (for server-to-server or tooling)**  
Include the token returned by login in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Token details

| Property | Value |
|---|---|
| Algorithm | HS256 (HMAC-SHA256) |
| Expiry | 7 days |
| Cookie name | `admin_token` |
| Cookie flags | `httpOnly`, `sameSite=lax`, `secure` in production |

### Roles

| Role | Capabilities |
|---|---|
| `admin` | Full access — CRUD on all resources, category deletion |
| `editor` | Create, read, update blogs / news-events / categories. **Cannot** delete categories |

---

## Standard Response Shapes

### Success — Single item

```json
{
  "success": true,
  "data": { ... }
}
```

### Success — Paginated list

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

### Validation error (HTTP 422)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["Title must be at least 3 characters"],
    "category": ["Must be a valid 24-character hexadecimal ObjectId"]
  }
}
```

---

## HTTP Status Codes Used

| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request (invalid input, missing required field, category not found) |
| `401` | Unauthorized (missing or expired token) |
| `403` | Forbidden (inactive account, insufficient role) |
| `404` | Not Found |
| `409` | Conflict (e.g. deleting a category that is in use) |
| `422` | Unprocessable Entity (Zod validation error — see `errors` field) |
| `500` | Internal Server Error |

---

## Admin APIs (Protected)

All admin routes require an active session (cookie or Bearer token) unless noted.

---

### 1. Login

```
POST /api/admin/auth/login
```

**Authentication:** None — this is the only public admin route.  
**Content-Type:** `application/json`

#### Request body

```json
{
  "email": "admin@empiricalindia.com",
  "password": "Admin@123456"
}
```

| Field | Type | Rules |
|---|---|---|
| `email` | `string` | Required. Valid email format. |
| `password` | `string` | Required. Min 6 characters. |

#### Response `200 OK`

Sets the `admin_token` HTTP-only cookie and returns:

```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "675841029384756201928374",
      "name": "Admin",
      "email": "admin@empiricalindia.com",
      "role": "admin"
    }
  }
}
```

> **Auto-bootstrap:** If no admin exists in the database and the submitted credentials match `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, the first admin account is created automatically.

#### Errors

| Status | Message |
|---|---|
| `401` | `Invalid email or password` |
| `403` | `Account has been deactivated. Please contact support.` |
| `422` | Validation errors in `errors` field |

---

### 2. Logout

```
POST /api/admin/auth/logout
```

**Authentication:** Not required (safe to call even without a session).  
**Content-Type:** None required.

#### Response `200 OK`

Clears the `admin_token` cookie and returns:

```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

### 3. Get Current User

```
GET /api/admin/auth/me
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "675841029384756201928374",
    "name": "Admin",
    "email": "admin@empiricalindia.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2026-03-01T10:00:00.000Z",
    "updatedAt": "2026-03-01T10:00:00.000Z"
  }
}
```

#### Errors

| Status | Message |
|---|---|
| `401` | Unauthorized |
| `403` | `Account is inactive` |
| `404` | `Admin user not found` |

---

### 4. List Blogs (Admin)

```
GET /api/admin/blogs
```

**Authentication:** `admin` or `editor`  
Returns all blogs including drafts, sorted newest first.

#### Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `integer` | `1` | Page number. Min 1. |
| `limit` | `integer` | `10` | Items per page. Min 1, max 100. |
| `search` | `string` | — | Case-insensitive search against `title` and `excerpt`. |
| `status` | `string` | — | Filter by `"draft"` or `"published"`. Omit for all. |
| `category` | `string` | — | Filter by category ObjectId (24-char hex). |
| `featured` | `string` | — | `"true"` or `"false"`. Omit for all. |

#### Example request

```
GET /api/admin/blogs?page=1&limit=10&status=published&featured=true
```

#### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "675841029384756201928401",
      "title": "Precision Roll-Forming for Heavy Racking",
      "slug": "precision-roll-forming-for-heavy-racking",
      "excerpt": "An analysis of high-tensile steel profiles...",
      "content": "Full markdown or HTML content...",
      "featuredImage": {
        "url": "https://res.cloudinary.com/.../blog-image.jpg",
        "publicId": "empirical-india/blogs/blog-image",
        "alt": "Roll-forming production line"
      },
      "category": {
        "_id": "675841029384756201928301",
        "name": "Roll-Forming Technology",
        "slug": "roll-forming-technology"
      },
      "tags": ["roll-forming", "tooling", "steel"],
      "author": {
        "_id": "675841029384756201928374",
        "name": "Admin",
        "email": "admin@empiricalindia.com"
      },
      "status": "published",
      "featured": true,
      "seo": {
        "metaTitle": "Precision Roll-Forming for Heavy Racking",
        "metaDescription": "An analysis of high-tensile steel profiles...",
        "keywords": ["roll-forming", "racking", "steel"]
      },
      "publishedAt": "2026-03-15T08:00:00.000Z",
      "createdAt": "2026-03-14T12:00:00.000Z",
      "updatedAt": "2026-03-15T08:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

---

### 5. Create Blog

```
POST /api/admin/blogs
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `multipart/form-data` (when uploading an image file)  
**Content-Type:** `application/json` (when passing a pre-uploaded `featuredImage` object)

#### Form fields (multipart/form-data)

| Field | Type | Required | Rules |
|---|---|---|---|
| `title` | `string` | ✅ | Min 3, max 200 characters. |
| `excerpt` | `string` | ✅ | Min 10, max 600 characters. |
| `content` | `string` | ✅ | Min 10 characters. |
| `category` | `string` | ✅ | 24-character hex ObjectId of an existing category. |
| `image` or `featuredImage` | `File` | ✅ | JPEG, PNG, or WEBP. Max 5 MB. |
| `alt` | `string` | — | Alt text for the image. Defaults to `title`. |
| `tags` | `string` | — | Comma-separated tags e.g. `"roll-forming, tooling, export"`. |
| `status` | `string` | — | `"draft"` (default) or `"published"`. |
| `featured` | `string` | — | `"true"` or `"false"`. Default `"false"`. |
| `slug` | `string` | — | Custom slug. Auto-generated from `title` if omitted. Duplicate slugs get `-2`, `-3` suffix. |
| `metaTitle` | `string` | — | Max 100 chars. Defaults to `title`. |
| `metaDescription` | `string` | — | Max 300 chars. Defaults to `excerpt`. |
| `keywords` | `string` | — | Comma-separated SEO keywords. |

> **Boolean fields in multipart:** Send `"true"` or `"false"` as strings — the server coerces them.

#### Alternative — JSON body with pre-uploaded image

```json
{
  "title": "Precision Roll-Forming",
  "excerpt": "...",
  "content": "...",
  "category": "675841029384756201928301",
  "status": "published",
  "featuredImage": {
    "url": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "empirical-india/blogs/image",
    "alt": "Roll-forming line"
  }
}
```

#### Response `201 Created`

Returns the fully populated blog document (same shape as Get Single Blog).

#### Errors

| Status | Cause |
|---|---|
| `400` | Image missing, invalid MIME type, file too large, category ObjectId invalid or not found |
| `422` | Zod validation failure — see `errors` field |
| `409` | Duplicate slug (handled automatically — unique suffix added) |

#### Automatic behaviours

- Slug generated as `title → kebab-case`. Collisions get `-2`, `-3` appended.
- If `status = "published"`, `publishedAt` is set to `now`.
- `author` is always set from the authenticated admin's token — never from the request body.
- If Cloudinary upload succeeds but MongoDB fails, the Cloudinary image is deleted automatically.

---

### 6. Get Blog by ID

```
GET /api/admin/blogs/:id
```

**Authentication:** `admin` or `editor`

#### Path parameter

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | 24-character hex MongoDB ObjectId. |

#### Response `200 OK`

```json
{
  "success": true,
  "data": { /* full blog document with populated category and author */ }
}
```

#### Errors

| Status | Message |
|---|---|
| `400` | Invalid ObjectId format |
| `404` | `Blog not found` |

---

### 7. Update Blog

```
PUT /api/admin/blogs/:id
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `multipart/form-data` or `application/json`  
All fields are optional — only supply what you want to change.

#### Updatable fields

| Field | Notes |
|---|---|
| `title` | Min 3, max 200. Does **not** auto-update the slug. |
| `slug` | Explicitly set to change the URL. Uniqueness enforced. |
| `excerpt` | Min 10, max 600. |
| `content` | Min 10. |
| `category` | Must be an existing category ObjectId. |
| `tags` | Comma-separated string or array. Replaces existing tags. |
| `status` | `"draft"` or `"published"`. Setting to `"published"` stamps `publishedAt` if not already set. |
| `featured` | `true` / `false`. |
| `alt` | Updates the image alt text without replacing the image. |
| `image` / `featuredImage` | New image file — see image replacement behaviour below. |
| `metaTitle` | Max 100. |
| `metaDescription` | Max 300. |
| `keywords` | Comma-separated. |

#### Image replacement behaviour

1. New image is uploaded to Cloudinary.
2. MongoDB document is updated with new `url` and `publicId`.
3. **Only after** the database write succeeds, the old Cloudinary image is deleted.
4. If the database write fails, the newly uploaded Cloudinary image is deleted automatically.

#### Response `200 OK`

Returns the updated, fully populated blog document.

#### Errors

| Status | Cause |
|---|---|
| `400` | Invalid ObjectId, category not found, invalid image |
| `404` | `Blog not found` |
| `422` | Validation errors |

---

### 8. Delete Blog

```
DELETE /api/admin/blogs/:id
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Blog deleted successfully",
    "id": "675841029384756201928401"
  }
}
```

Deletes the MongoDB document and the associated Cloudinary image.

#### Errors

| Status | Message |
|---|---|
| `400` | Invalid ObjectId |
| `404` | `Blog not found` |

---

### 9. List News & Events (Admin)

```
GET /api/admin/news-events
```

**Authentication:** `admin` or `editor`  
Returns all news and events including drafts, sorted newest first.

#### Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `integer` | `1` | Page number. |
| `limit` | `integer` | `10` | Per page. Min 1, max 100. |
| `search` | `string` | — | Searches `title` and `excerpt`. |
| `type` | `string` | — | `"news"` or `"event"`. |
| `status` | `string` | — | `"draft"` or `"published"`. |
| `category` | `string` | — | Category ObjectId. |
| `featured` | `string` | — | `"true"` or `"false"`. |
| `upcoming` | `string` | — | `"true"` — forces `type=event`, filters `eventDetails.startDate >= now`. |
| `past` | `string` | — | `"true"` — forces `type=event`, filters `eventDetails.startDate < now`. |

> `upcoming` and `past` override any `type` parameter you provide.

#### Response `200 OK`

Paginated response. Items include full document with populated `category` (name, slug) and `author` (name, email). Events include `eventDetails` object.

---

### 10. Create News & Event

```
POST /api/admin/news-events
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `multipart/form-data` or `application/json`

#### Form fields

| Field | Type | Required | Rules |
|---|---|---|---|
| `title` | `string` | ✅ | Min 3, max 200. |
| `type` | `string` | ✅ | `"news"` or `"event"`. |
| `excerpt` | `string` | ✅ | Min 10, max 600. |
| `content` | `string` | ✅ | Min 10. |
| `category` | `string` | ✅ | 24-char hex ObjectId. |
| `image` or `featuredImage` | `File` | ✅ | JPEG, PNG, WEBP. Max 5 MB. Uploaded to `empirical-india/news-events`. |
| `alt` | `string` | — | Image alt text. |
| `tags` | `string` | — | Comma-separated. |
| `status` | `string` | — | `"draft"` (default) or `"published"`. |
| `featured` | `string` | — | `"true"` or `"false"`. |
| `slug` | `string` | — | Custom slug. Auto-generated if omitted. |
| `eventStartDate` | `string` | — | ISO 8601 date string. Required for `type=event` if providing event dates. |
| `eventEndDate` | `string` | — | ISO 8601 date string. Optional. |
| `eventLocation` | `string` | — | Venue or city name. |
| `eventRegistrationUrl` | `string` | — | Must be a valid URL or empty string. |
| `metaTitle` | `string` | — | Max 100. |
| `metaDescription` | `string` | — | Max 300. |
| `keywords` | `string` | — | Comma-separated. |

> **Event validation:** If `type = "event"` and `eventStartDate` is provided, it must parse as a valid date.  
> **News items:** `eventDetails` fields are accepted but stored only if `type` is `"event"`.

#### Response `201 Created`

Returns populated news/event document.

---

### 11. Get News & Event by ID

```
GET /api/admin/news-events/:id
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

Full document including `eventDetails` for events. Category and author populated.

#### Errors

| Status | Message |
|---|---|
| `400` | Invalid ObjectId |
| `404` | `News or Event item not found` |

---

### 12. Update News & Event

```
PUT /api/admin/news-events/:id
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `multipart/form-data` or `application/json`  
All fields are optional.

Supports all fields from Create. Same image replacement safety semantics as blog update.

Event details are updated only when the item's type is `"event"` or `type` is being changed to `"event"` in this request.

#### Response `200 OK`

Updated, populated document.

---

### 13. Delete News & Event

```
DELETE /api/admin/news-events/:id
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Item deleted successfully",
    "id": "675841029384756201928501"
  }
}
```

---

### 14. List Categories (Admin)

```
GET /api/admin/categories
```

**Authentication:** `admin` or `editor`  
Returns **all** categories (active and inactive), sorted alphabetically by name.

#### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `type` | `string` | Filter by `"blog"`, `"news"`, `"event"`, or `"general"`. |
| `active` | `string` | `"true"` to return only active categories. |

#### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "_id": "675841029384756201928301",
      "name": "Roll-Forming Technology",
      "slug": "roll-forming-technology",
      "type": "blog",
      "description": "Insights on roll-forming lines",
      "isActive": true,
      "createdAt": "2026-03-01T10:00:00.000Z",
      "updatedAt": "2026-03-01T10:00:00.000Z"
    }
  ]
}
```

---

### 15. Create Category

```
POST /api/admin/categories
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `application/json`

#### Request body

```json
{
  "name": "Modular Pallets",
  "type": "blog",
  "description": "Industrial metal pallet topics",
  "isActive": true
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | `string` | ✅ | Min 2, max 100 characters. |
| `type` | `string` | — | `"blog"`, `"news"`, `"event"`, or `"general"`. Default `"general"`. |
| `description` | `string` | — | Max 500 characters. |
| `slug` | `string` | — | Auto-generated from `name` if omitted. |
| `isActive` | `boolean` | — | Default `true`. |

#### Response `201 Created`

Full category document.

---

### 16. Get Category by ID

```
GET /api/admin/categories/:id
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "_id": "675841029384756201928301",
    "name": "Roll-Forming Technology",
    "slug": "roll-forming-technology",
    "type": "blog",
    "description": "...",
    "isActive": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 17. Update Category

```
PUT /api/admin/categories/:id
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `application/json`  
All fields are optional.

#### Request body (partial)

```json
{
  "name": "Updated Category Name",
  "isActive": false
}
```

**Slug update behaviour:** If `name` changes and no explicit `slug` is provided, the slug is regenerated from the new name while preserving uniqueness. To set a specific slug, pass `slug` explicitly.

#### Response `200 OK`

Updated category document.

---

### 18. Delete Category

```
DELETE /api/admin/categories/:id
```

**Authentication:** `admin` only (editors cannot delete categories).

**Protection:** Deletion is blocked if the category is referenced by any blog or news/event. Returns `409` in that case.

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Category deleted successfully",
    "id": "675841029384756201928301"
  }
}
```

#### Errors

| Status | Message |
|---|---|
| `401` | Unauthorized |
| `403` | `Forbidden: Admin privileges required.` (editor trying to delete) |
| `404` | `Category not found` |
| `409` | `Category cannot be deleted because it is currently being used.` |

---

### 19. Upload Image

```
POST /api/admin/upload
```

**Authentication:** `admin` or `editor`  
**Content-Type:** `multipart/form-data`

Standalone image upload endpoint. Use this to pre-upload images before creating a blog or news item via JSON body.

#### Form fields

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | `File` | ✅ | Binary image file. |
| `folder` | `string` | — | Target folder: `"blogs"`, `"news-events"`, or `"general"` (default). Full paths like `"empirical-india/blogs"` also accepted. |

#### Constraints

| Constraint | Value |
|---|---|
| Allowed MIME types | `image/jpeg`, `image/png`, `image/webp` |
| Maximum file size | 5 MB |

#### Response `201 Created`

```json
{
  "success": true,
  "data": {
    "url": "http://res.cloudinary.com/dq88z0sjo/image/upload/v1234567/empirical-india/blogs/abc123.jpg",
    "secureUrl": "https://res.cloudinary.com/dq88z0sjo/image/upload/v1234567/empirical-india/blogs/abc123.jpg",
    "publicId": "empirical-india/blogs/abc123"
  }
}
```

Store `secureUrl` as the display URL and `publicId` for future deletion/replacement.

#### Errors

| Status | Message |
|---|---|
| `400` | `Image file is required` |
| `400` | `Invalid file type: application/pdf. Allowed formats: JPEG, PNG, WEBP.` |
| `400` | `File size exceeds the 5MB limit (6.20 MB).` |

---

### 20. Dashboard Stats

```
GET /api/admin/dashboard
```

**Authentication:** `admin` or `editor`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "totalBlogs": 24,
    "publishedBlogs": 18,
    "draftBlogs": 6,
    "totalNews": 14,
    "totalEvents": 5,
    "publishedNews": 12,
    "upcomingEvents": 3,
    "featuredPosts": 8
  }
}
```

- `upcomingEvents` — published events whose `eventDetails.startDate` is in the future.
- `featuredPosts` — combined count of featured blogs + featured news/events.

---

## Public APIs (No Auth)

These routes require **no authentication**. They **only return published content**. Draft posts are never exposed.

---

### 21. List Published Blogs

```
GET /api/blogs
```

**Authentication:** None

#### Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `integer` | `1` | Page number. |
| `limit` | `integer` | `10` | Per page. Min 1, max 50. |
| `category` | `string` | — | Category **slug** (e.g. `roll-forming-technology`) **or** ObjectId. Slug lookup is case-sensitive. Unknown slugs return empty results (not 404). |
| `tag` | `string` | — | Exact tag string match. |
| `featured` | `string` | — | `"true"` or `"false"`. |
| `search` | `string` | — | Case-insensitive search against `title` and `excerpt`. |

**Sort order:** `publishedAt` descending, then `createdAt` descending.

#### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "675841029384756201928401",
      "title": "Precision Roll-Forming for Heavy Racking",
      "slug": "precision-roll-forming-for-heavy-racking",
      "excerpt": "An analysis of high-tensile steel profiles...",
      "content": "Full markdown or HTML content...",
      "featuredImage": {
        "url": "https://res.cloudinary.com/.../blog-image.jpg",
        "publicId": "empirical-india/blogs/blog-image",
        "alt": "Roll-forming production line"
      },
      "category": {
        "id": "675841029384756201928301",
        "name": "Roll-Forming Technology",
        "slug": "roll-forming-technology"
      },
      "tags": ["roll-forming", "tooling"],
      "author": { "name": "Admin" },
      "featured": true,
      "seo": {
        "metaTitle": "...",
        "metaDescription": "...",
        "keywords": ["roll-forming"]
      },
      "publishedAt": "2026-03-15T08:00:00.000Z",
      "createdAt": "2026-03-14T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 18,
    "totalPages": 2
  }
}
```

> **Privacy:** `author` exposes only `name`. No email, no admin ID. No `publicId` from Cloudinary is needed by the frontend — use `featuredImage.url` directly.

---

### 22. Get Published Blog by Slug

```
GET /api/blogs/:slug
```

**Authentication:** None

#### Path parameter

| Parameter | Type | Description |
|---|---|---|
| `slug` | `string` | URL-safe slug (e.g. `precision-roll-forming-for-heavy-racking`). |

#### Response `200 OK`

Same shape as a single item from the list response above.

#### Errors

| Status | Message |
|---|---|
| `404` | `Blog not found` (also returned if the blog exists but is a draft) |

---

### 23. List Published News & Events

```
GET /api/news-events
```

**Authentication:** None

#### Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `integer` | `1` | Page number. |
| `limit` | `integer` | `10` | Per page. Min 1, max 50. |
| `type` | `string` | — | `"news"` or `"event"`. |
| `category` | `string` | — | Category slug or ObjectId. |
| `tag` | `string` | — | Exact tag match. |
| `featured` | `string` | — | `"true"` or `"false"`. |
| `upcoming` | `string` | — | `"true"` — forces `type=event`, returns events with `startDate >= now`. |
| `past` | `string` | — | `"true"` — forces `type=event`, returns events with `startDate < now`. |
| `search` | `string` | — | Case-insensitive title/excerpt search. |

**Sort order:** `publishedAt` descending, then `createdAt` descending.

#### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "675841029384756201928501",
      "title": "Industrial Expo 2026",
      "slug": "industrial-expo-2026",
      "type": "event",
      "excerpt": "Empirical India at the national trade expo...",
      "content": "Visit our booth...",
      "featuredImage": {
        "url": "https://res.cloudinary.com/.../expo.jpg",
        "publicId": "empirical-india/news-events/expo",
        "alt": "Industrial Expo 2026 banner"
      },
      "category": {
        "id": "675841029384756201928302",
        "name": "Events",
        "slug": "events"
      },
      "tags": ["expo", "manufacturing"],
      "author": { "name": "Admin" },
      "featured": false,
      "eventDetails": {
        "startDate": "2026-11-20T10:00:00.000Z",
        "endDate": "2026-11-22T18:00:00.000Z",
        "location": "Hall 3, Trade Center, Mumbai",
        "registrationUrl": "https://expo2026.com/register"
      },
      "seo": {
        "metaTitle": "Industrial Expo 2026",
        "metaDescription": "...",
        "keywords": ["expo", "manufacturing"]
      },
      "publishedAt": "2026-10-01T08:00:00.000Z",
      "createdAt": "2026-09-30T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1
  }
}
```

> `eventDetails` is `null` or absent for `type: "news"` items.

---

### 24. Get Published News & Event by Slug

```
GET /api/news-events/:slug
```

**Authentication:** None

#### Response `200 OK`

Single item matching the slug, same shape as list items above.

#### Errors

| Status | Message |
|---|---|
| `404` | `News or Event item not found` (also returned if draft) |

---

### 25. List Active Categories

```
GET /api/categories
```

**Authentication:** None  
Returns only **active** categories (`isActive: true`), sorted alphabetically.

#### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `type` | `string` | Filter by `"blog"`, `"news"`, `"event"`, or `"general"`. |

#### Response `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "675841029384756201928301",
      "name": "Roll-Forming Technology",
      "slug": "roll-forming-technology",
      "type": "blog",
      "description": "Insights on roll-forming lines"
    }
  ]
}
```

---

## Image Upload Details

### Cloudinary folders

| Context | Cloudinary folder |
|---|---|
| Blog images | `empirical-india/blogs` |
| News & Event images | `empirical-india/news-events` |
| Standalone upload (general) | `empirical-india/general` |

### Allowed MIME types

- `image/jpeg`
- `image/png`
- `image/webp`

### Maximum file size

**5 MB** per image.

### Stored in MongoDB

The database stores only metadata — never binary data:

```json
"featuredImage": {
  "url": "https://res.cloudinary.com/...",
  "publicId": "empirical-india/blogs/abc123",
  "alt": "Alt text"
}
```

Use `url` for display. Do not expose `publicId` to end users — it is an internal Cloudinary identifier used for deletion.

### Image safety on failure

- **Create:** If the database insert fails after a successful Cloudinary upload, the orphaned image is automatically deleted from Cloudinary.
- **Update:** The old Cloudinary image is deleted **only after** the database update succeeds. If the database update fails, the new Cloudinary image is rolled back.

---

## Validation Rules Reference

### ObjectId

All `:id` path parameters and `category` fields must be a valid 24-character lowercase hex string (MongoDB ObjectId format).

```
✅  675841029384756201928301
❌  abc123
❌  675841029384756201928301XYZ
```

### Blog fields

| Field | Rule |
|---|---|
| `title` | String, min 3, max 200 |
| `excerpt` | String, min 10, max 600 |
| `content` | String, min 10 |
| `category` | Valid 24-char ObjectId |
| `tags` | Comma-separated string or array of strings |
| `status` | `"draft"` or `"published"` |
| `featured` | Boolean (`true` / `false`, or `"true"` / `"false"` in multipart) |
| `metaTitle` | String, max 100 |
| `metaDescription` | String, max 300 |
| `keywords` | Comma-separated string or array |

### News & Event additional fields

| Field | Rule |
|---|---|
| `type` | `"news"` or `"event"` — required on create |
| `eventStartDate` | ISO 8601 string (e.g. `"2026-11-20T10:00:00.000Z"`) |
| `eventEndDate` | ISO 8601 string |
| `eventRegistrationUrl` | Valid URL string or empty string `""` |

### Category fields

| Field | Rule |
|---|---|
| `name` | String, min 2, max 100 |
| `description` | String, max 500 |
| `type` | `"blog"`, `"news"`, `"event"`, or `"general"` |
| `isActive` | Boolean |

---

## Common Error Reference

### Unauthenticated request to protected route

```json
{
  "success": false,
  "message": "Unauthorized: Please provide a valid authentication token."
}
```

HTTP `401`

### Insufficient role (editor trying to delete category)

```json
{
  "success": false,
  "message": "Forbidden: Admin privileges required."
}
```

HTTP `403`

### Invalid ObjectId in path

```json
{
  "success": false,
  "message": "Must be a valid 24-character hexadecimal ObjectId"
}
```

HTTP `400`

### Resource not found

```json
{
  "success": false,
  "message": "Blog not found"
}
```

HTTP `404`

### Zod validation error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": ["Title must be at least 3 characters"],
    "category": ["Must be a valid 24-character hexadecimal ObjectId"]
  }
}
```

HTTP `422`

### Category in use

```json
{
  "success": false,
  "message": "Category cannot be deleted because it is currently being used."
}
```

HTTP `409`

### Invalid image

```json
{
  "success": false,
  "message": "Invalid file type: application/pdf. Allowed formats: JPEG, PNG, WEBP."
}
```

```json
{
  "success": false,
  "message": "File size exceeds the 5MB limit (6.20 MB)."
}
```

HTTP `400`

### Duplicate slug

Slug conflicts are handled automatically — the server appends `-2`, `-3`, etc. You will never receive a `409` for a slug conflict from the create or update endpoints.

---

*Generated from source code — `app/api/**` · `lib/validation.ts` · `lib/auth.ts` · `lib/cloudinary.ts`*
