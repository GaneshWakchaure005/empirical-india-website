# Empirical India — Admin & Content Management API Documentation

This document describes the complete backend REST API layer for managing **Blogs**, **News & Events**, **Categories**, and **Media Uploads** in the Empirical India Next.js application.

The entire backend is built using **Next.js App Router Route Handlers (`app/api`)**, **Mongoose / MongoDB Atlas**, **Cloudinary**, and **JWT HTTP-only cookie authentication**.

---

## 1. Authentication & Security Architecture

### Authentication Mechanism
- **Cookie-Based**: Upon successful login, the server sets a secure, HTTP-only cookie named `admin_token`.
- **Bearer Token**: The API also accepts the token via the `Authorization: Bearer <token>` header for headless clients or automation scripts.
- **Cookie Security Attributes**:
  - `httpOnly: true` (prevents JavaScript access / XSS token exfiltration)
  - `secure: true` (enforced automatically in production HTTPS)
  - `sameSite: "lax"` (mitigates CSRF)
  - `maxAge: 7 days`

### Roles
- `admin`: Full access to all endpoints, including deleting categories and managing admins.
- `editor`: Create, read, and update blogs, news, events, and categories.

### Middleware Protection
Next.js middleware (`middleware.ts`) automatically intercepts and protects:
- All `/api/admin/*` routes (except `/api/admin/auth/login`).
- Unauthenticated requests to `/api/admin/*` receive `401 Unauthorized`.
- Unauthenticated requests to admin UI routes `/admin/*` are redirected to `/admin/login`.

---

## 2. Standard Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Paginated Response
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

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Validation Error Response (HTTP 422)
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

## 3. Environment Variables

Configure the following variables in `.env` or Vercel Environment Variables:

```env
# MongoDB Connection (use Atlas URI in production)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/empiricalindia?retryWrites=true&w=majority
# Legacy fallback (optional)
MONGO_URI=mongodb+srv://...

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (minimum 32 characters)
AUTH_SECRET=empirical_india_super_secure_jwt_secret_key_2026_change_in_production

# Initial Admin Credentials (used for seed script or auto-bootstrap)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@empiricalindia.com
ADMIN_PASSWORD=Admin@123456
```

---

## 4. Admin Authentication Endpoints

### 4.1 Login
- **URL**: `/api/admin/auth/login`
- **Method**: `POST`
- **Authentication**: None (Public)
- **Request Format**: `application/json`

#### Request Body
```json
{
  "email": "admin@empiricalindia.com",
  "password": "Admin@123456"
}
```

#### Success Response (`200 OK`)
Sets `admin_token` HTTP-only cookie and returns:
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

#### Errors
- `401 Unauthorized`: Invalid email or password.
- `403 Forbidden`: Account is inactive.
- `422 Unprocessable Entity`: Invalid email format or password under 6 characters.

---

### 4.2 Logout
- **URL**: `/api/admin/auth/logout`
- **Method**: `POST`
- **Authentication**: None / Optional
- **Response**: Clears `admin_token` cookie and returns:
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

### 4.3 Get Current Admin Profile
- **URL**: `/api/admin/auth/me`
- **Method**: `GET`
- **Authentication**: Admin or Editor session
- **Success Response (`200 OK`)**:
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

---

## 5. Standalone Image Upload API

### 5.1 Upload Image
- **URL**: `/api/admin/upload`
- **Method**: `POST`
- **Authentication**: Admin or Editor
- **Request Format**: `multipart/form-data`

#### Form Data Parameters
| Field | Type | Description |
|---|---|---|
| `image` | `File` (Binary) | Required. Allowed MIME: `image/jpeg`, `image/png`, `image/webp`. Max size: 5MB. |
| `folder` | `string` | Optional: `"blogs"`, `"news-events"`, or `"general"` (default). |

#### Example curl:
```bash
curl -X POST https://yourdomain.com/api/admin/upload \
  -b "admin_token=YOUR_JWT_COOKIE" \
  -F "image=@/path/to/factory-line.webp" \
  -F "folder=blogs"
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "url": "http://res.cloudinary.com/dq88z0sjo/image/upload/v12345/empirical-india/blogs/xyz.webp",
    "secureUrl": "https://res.cloudinary.com/dq88z0sjo/image/upload/v12345/empirical-india/blogs/xyz.webp",
    "publicId": "empirical-india/blogs/xyz"
  }
}
```

---

## 6. Category Management APIs

### 6.1 List Categories
- **URL**: `/api/admin/categories`
- **Method**: `GET`
- **Query Parameters**:
  - `type`: Optional (`blog`, `news`, `event`, `general`)
  - `active`: Optional boolean (`true` / `false`)
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "675841029384756201928301",
      "name": "Roll-Forming Technology",
      "slug": "roll-forming-technology",
      "type": "blog",
      "description": "Insights on precision roll-forming lines",
      "isActive": true,
      "createdAt": "2026-03-01T10:00:00.000Z"
    }
  ]
}
```

### 6.2 Create Category
- **URL**: `/api/admin/categories`
- **Method**: `POST`
- **Request Body**:
```json
{
  "name": "Modular Pallets",
  "type": "blog",
  "description": "Industrial metal pallet innovations"
}
```
*Note: Unique slug is automatically generated if not supplied.*

### 6.3 Update Category
- **URL**: `/api/admin/categories/:id`
- **Method**: `PUT`
- **Request Body**: Partial category object (`name`, `description`, `type`, `isActive`).

### 6.4 Delete Category
- **URL**: `/api/admin/categories/:id`
- **Method**: `DELETE`
- **Protection**: If the category is currently used by any Blog or News/Event post, deletion is rejected with `409 Conflict`:
```json
{
  "success": false,
  "message": "Category cannot be deleted because it is currently being used."
}
```

---

## 7. Blog Management APIs

### 7.1 List Blogs (Admin)
- **URL**: `/api/admin/blogs`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`, max: `100`)
  - `search`: Keyword search matching `title` or `excerpt`
  - `status`: `"draft"` or `"published"`
  - `category`: Category ObjectId
  - `featured`: `"true"` or `"false"`

### 7.2 Create Blog
- **URL**: `/api/admin/blogs`
- **Method**: `POST`
- **Request Format**: `multipart/form-data` (or `application/json` if image was pre-uploaded)

#### Multipart Form Data Fields
| Field | Type | Description |
|---|---|---|
| `title` | `string` | Required. Min 3, max 200 chars. |
| `excerpt` | `string` | Required. Min 10, max 600 chars. |
| `content` | `string` | Required. Full markdown or HTML content. |
| `category` | `string` | Required. 24-character Category ObjectId. |
| `image` | `File` | Required. Image file (<5MB, JPEG/PNG/WEBP). |
| `alt` | `string` | Optional. Image alt text. |
| `tags` | `string` | Optional. Comma-separated (e.g. `"roll-forming, tooling, export"`). |
| `status` | `string` | Optional. `"draft"` (default) or `"published"`. |
| `featured` | `string` | Optional. `"true"` or `"false"`. |
| `metaTitle` | `string` | Optional. SEO title. |
| `metaDescription`| `string` | Optional. SEO description. |
| `keywords` | `string` | Optional. Comma-separated keywords. |

#### Example curl:
```bash
curl -X POST https://yourdomain.com/api/admin/blogs \
  -b "admin_token=YOUR_JWT_COOKIE" \
  -F "title=Precision Roll-Forming for Heavy-Duty Racking" \
  -F "excerpt=A detailed analysis of high-tensile steel roll forming..." \
  -F "content=Full engineering details on roll forming setups..." \
  -F "category=675841029384756201928301" \
  -F "status=published" \
  -F "featured=true" \
  -F "tags=roll-forming, tooling, manufacturing" \
  -F "image=@/path/to/line-setup.jpg"
```

#### Automatic Behavior
1. Uploads the image to Cloudinary under `empirical-india/blogs`.
2. Generates a collision-free slug (e.g. `precision-roll-forming-for-heavy-duty-racking`).
3. If `status === "published"`, sets `publishedAt = new Date()`.
4. Associates the post author with the authenticated admin ID.
5. **Rollback**: If MongoDB insert fails, automatically destroys the uploaded Cloudinary image so orphans are prevented.

### 7.3 Get Single Blog (Admin)
- **URL**: `/api/admin/blogs/:id`
- **Method**: `GET`
- Populates Category and Author details.

### 7.4 Update Blog
- **URL**: `/api/admin/blogs/:id`
- **Method**: `PUT`
- **Request Format**: `multipart/form-data` or `application/json`.
- **Image Replacement**: If a new `image` file is supplied:
  1. The new image is uploaded to Cloudinary.
  2. MongoDB is updated with new image URL and publicId.
  3. The old image is destroyed on Cloudinary **only after** MongoDB confirms update.

### 7.5 Delete Blog
- **URL**: `/api/admin/blogs/:id`
- **Method**: `DELETE`
- Deletes MongoDB document and destroys Cloudinary image.

---

## 8. News & Events Management APIs

### 8.1 List News & Events (Admin)
- **URL**: `/api/admin/news-events`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `type`: `"news"` or `"event"`
  - `status`: `"draft"` or `"published"`
  - `upcoming`: `"true"` (for events whose `startDate >= now`)
  - `past`: `"true"` (for events whose `startDate < now`)
  - `search`: Keyword search matching title or excerpt
  - `category`: Category ObjectId
  - `featured`: `"true"` or `"false"`

### 8.2 Create News or Event
- **URL**: `/api/admin/news-events`
- **Method**: `POST`
- **Request Format**: `multipart/form-data`

#### Fields
| Field | Type | Description |
|---|---|---|
| `title` | `string` | Required. |
| `type` | `string` | Required: `"news"` or `"event"`. |
| `excerpt` | `string` | Required. |
| `content` | `string` | Required. |
| `category` | `string` | Required Category ObjectId. |
| `image` | `File` | Required. Uploaded to `empirical-india/news-events`. |
| `status` | `string` | `"draft"` or `"published"`. |
| `eventStartDate` | `string` (ISO date) | Validated if `type === "event"`. |
| `eventEndDate` | `string` (ISO date) | Optional event end date. |
| `eventLocation` | `string` | Optional venue/city/hall. |
| `eventRegistrationUrl` | `string` (URL) | Optional ticket/registration URL. |
| `tags` | `string` | Comma-separated tags. |
| `featured` | `string` | `"true"` or `"false"`. |

### 8.3 Get Single News/Event (Admin)
- **URL**: `/api/admin/news-events/:id`
- **Method**: `GET`

### 8.4 Update News/Event
- **URL**: `/api/admin/news-events/:id`
- **Method**: `PUT`

### 8.5 Delete News/Event
- **URL**: `/api/admin/news-events/:id`
- **Method**: `DELETE`

---

## 9. Dashboard API

### 9.1 Get Quick Metrics
- **URL**: `/api/admin/dashboard`
- **Method**: `GET`
- **Authentication**: Admin or Editor
- **Success Response (`200 OK`)**:
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

---

## 10. Public Website APIs (Frontend Ready)

These endpoints **do not require any authentication** and **never leak drafts, private author data, or credentials**.

### 10.1 List Published Blogs
- **URL**: `/api/blogs`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
  - `category`: Category slug (e.g. `roll-forming-technology`) or ObjectId
  - `tag`: Filter by specific tag
  - `featured`: `"true"` for featured articles
  - `search`: Keyword query
- **Response**: List of published blogs with public author name, formatted category, and pagination metadata.

### 10.2 Get Single Published Blog
- **URL**: `/api/blogs/:slug`
- **Method**: `GET`
- Returns published blog matching `:slug`. Returns `404 Not Found` if draft or non-existent.

### 10.3 List Published News & Events
- **URL**: `/api/news-events`
- **Method**: `GET`
- **Query Parameters**:
  - `type`: `"news"` or `"event"`
  - `upcoming`: `"true"` (for upcoming events)
  - `page`, `limit`, `category`, `tag`, `search`
- **Response**: List of published news/events.

### 10.4 Get Single Published News/Event
- **URL**: `/api/news-events/:slug`
- **Method**: `GET`
- Returns published item matching `:slug`.

### 10.5 List Public Categories
- **URL**: `/api/categories`
- **Method**: `GET`
- Returns all active categories with id, name, slug, and type.

---

## 11. Initial Admin Account Setup (Seed Script)

Run the included seed script to create or update the root administrator account:

```bash
# Using environment variables from .env
npm run seed:admin

# Or passing custom CLI flags
npx tsx scripts/create-admin.ts --name="Empirical Admin" --email="admin@empiricalindia.com" --password="YourSecurePassword123"
```
