# Postman API Testing Guide — Empirical India

> **Project:** Empirical India B2B Platform  
> **Server Engine:** Next.js App Router Route Handlers (Edge/Node Serverless Support)  
> **Base URL:** `http://localhost:3000`  
> **Production Base URL:** `https://yourdomain.com`  

---

## Table of Contents

1. [Postman Setup & Quick Start](#1-postman-setup--quick-start)
2. [Postman Environment Variables](#2-postman-environment-variables)
3. [Authentication in Postman](#3-authentication-in-postman)
4. [Recommended Test Execution Flow](#4-recommended-test-execution-flow)
5. [Complete API Endpoints & Payloads](#5-complete-api-endpoints--payloads)
   - [Auth APIs](#a-auth-apis)
   - [Categories APIs (Admin)](#b-categories-apis-admin)
   - [Upload APIs (Admin)](#c-upload-apis-admin)
   - [Blogs APIs (Admin)](#d-blogs-apis-admin)
   - [News & Events APIs (Admin)](#e-news--events-apis-admin)
   - [Dashboard APIs (Admin)](#f-dashboard-apis-admin)
   - [Public APIs (No Auth)](#g-public-apis-no-auth)
   - [Enquiries & RFQ APIs](#h-enquiries--rfq-apis)
6. [Negative & Edge Case Testing Guide](#6-negative--edge-case-testing-guide)
7. [Automated Postman Test Scripts](#7-automated-postman-test-scripts)

---

## 1. Postman Setup & Quick Start

1. Start your Next.js local server:
   ```bash
   npm run dev
   ```
2. Verify your MongoDB connection string in `.env.local` / `.env`:
   ```env
   MONGODB_URI=mongodb+srv://...
   AUTH_SECRET=empirical_india_super_secure_jwt_secret_key_2026_change_in_production
   ADMIN_EMAIL=admin@empiricalindia.com
   ADMIN_PASSWORD=Admin@123456
   ADMIN_NAME=Admin
   ```
3. Open Postman and configure the environment variables as shown below.

---

## 2. Postman Environment Variables

Create a new Environment named **Empirical India Local** in Postman:

| Variable Name | Initial Value | Current Value | Notes |
|---|---|---|---|
| `baseUrl` | `http://localhost:3000` | `http://localhost:3000` | Base server address |
| `token` | *(empty)* | *(auto-set on login)* | JWT Bearer Token |
| `adminEmail` | `admin@empiricalindia.com` | `admin@empiricalindia.com` | Default admin email |
| `adminPassword` | `Admin@123456` | `Admin@123456` | Default admin password |
| `categoryId` | *(empty)* | *(auto-set after create)* | MongoDB 24-hex ObjectId |
| `categorySlug` | *(empty)* | *(auto-set after create)* | Category URL slug |
| `blogId` | *(empty)* | *(auto-set after create)* | Blog ObjectId |
| `blogSlug` | *(empty)* | *(auto-set after create)* | Blog URL slug |
| `newsEventId` | *(empty)* | *(auto-set after create)* | News/Event ObjectId |
| `newsEventSlug` | *(empty)* | *(auto-set after create)* | News/Event URL slug |
| `enquiryId` | *(empty)* | *(auto-set on submit)* | Customer Enquiry ObjectId |
| `uploadedImageUrl` | *(empty)* | *(auto-set on upload)* | Cloudinary secure URL |
| `uploadedPublicId` | *(empty)* | *(auto-set on upload)* | Cloudinary public ID |

---

## 3. Authentication in Postman

You have **two seamless options** to authenticate protected admin requests in Postman:

### Option 1: Bearer Token (Recommended for Postman)
Set the request header:
```http
Authorization: Bearer {{token}}
```
*(Or in Postman request settings under **Authorization** tab: Type = `Bearer Token`, Token = `{{token}}`)*

### Option 2: Cookie Authentication
Postman automatically retains cookies returned in `Set-Cookie` (`admin_token`). Once `POST /api/admin/auth/login` succeeds, Postman will automatically send `admin_token` on subsequent requests to the same domain.

---

## 4. Recommended Test Execution Flow

Follow this sequence for an end-to-end integration test:

```
1. POST /api/admin/auth/login          --> Saves {{token}}
2. GET  /api/admin/auth/me             --> Verifies session
3. POST /api/admin/categories          --> Saves {{categoryId}}, {{categorySlug}}
4. GET  /api/admin/categories          --> Confirms category created
5. POST /api/admin/upload              --> Uploads test image, saves {{uploadedImageUrl}}, {{uploadedPublicId}}
6. POST /api/admin/blogs               --> Creates Blog, saves {{blogId}}, {{blogSlug}}
7. GET  /api/admin/blogs/:id           --> Verifies Blog details
8. POST /api/admin/news-events         --> Creates News/Event, saves {{newsEventId}}, {{newsEventSlug}}
9. POST /api/enquiries                 --> Submits customer RFQ enquiry
10. GET /api/admin/enquiries           --> Lists enquiries in admin inbox
11. GET /api/admin/dashboard           --> Checks updated dashboard metrics (blogs, events, enquiries)
12. GET /api/blogs                     --> Verifies public blog listing (if status=published)
13. GET /api/blogs/:slug               --> Verifies public single blog
14. GET /api/news-events/:slug         --> Verifies public single news/event
15. PUT  /api/admin/blogs/:id          --> Updates blog title/content/image
16. PATCH /api/admin/enquiries/:id     --> Updates enquiry status & notes
17. DELETE /api/admin/blogs/:id        --> Cleans up blog
18. DELETE /api/admin/news-events/:id  --> Cleans up news/event
19. DELETE /api/admin/categories/:id   --> Cleans up category (now unused)
20. POST /api/admin/auth/logout        --> Clears session
```

---

## 5. Complete API Endpoints & Payloads

---

### A. Auth APIs

#### 1. Admin Login
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "{{adminEmail}}",
    "password": "{{adminPassword}}"
  }
  ```
- **Expected Status:** `200 OK`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOi...",
      "admin": {
        "id": "675841029384756201928374",
        "name": "Admin",
        "email": "admin@empiricalindia.com",
        "role": "admin"
      }
    }
  }
  ```
- **Postman Tests Script:**
  ```javascript
  pm.test("Status code is 200", () => pm.response.to.have.status(200));
  const res = pm.response.json();
  if (res.data && res.data.token) {
    pm.environment.set("token", res.data.token);
  }
  ```

---

#### 2. Get Current User (`me`)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/auth/me`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`
- **Response Structure:**
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

#### 3. Admin Logout
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/auth/logout`
- **Headers:** None required (safe without auth)
- **Expected Status:** `200 OK`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "message": "Logged out successfully"
    }
  }
  ```

---

### B. Categories APIs (Admin)

#### 4. Create Category
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/categories`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Roll-Forming Technology",
    "type": "blog",
    "description": "Technical insights and machine configurations for roll-forming lines",
    "isActive": true
  }
  ```
- **Expected Status:** `201 Created`
- **Postman Tests Script:**
  ```javascript
  pm.test("Status code is 201", () => pm.response.to.have.status(201));
  const res = pm.response.json();
  if (res.data && res.data._id) {
    pm.environment.set("categoryId", res.data._id);
    pm.environment.set("categorySlug", res.data.slug);
  }
  ```

---

#### 5. List Categories (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/categories?type=blog&active=true`
- **Query Params:**
  - `type` *(optional)*: `blog` | `news` | `event` | `general`
  - `active` *(optional)*: `true` (returns only active)
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 6. Get Category by ID
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/categories/{{categoryId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 7. Update Category
- **Method:** `PUT`
- **URL:** `{{baseUrl}}/api/admin/categories/{{categoryId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Custom Roll-Forming Lines",
    "description": "Updated engineering overview and tooling specs",
    "isActive": true
  }
  ```
- **Expected Status:** `200 OK`

---

#### 8. Delete Category
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/admin/categories/{{categoryId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:**
  - `200 OK` if category is unused.
  - `409 Conflict` if category is referenced by blogs or news/events.
- **Expected Response (Success):**
  ```json
  {
    "success": true,
    "data": {
      "message": "Category deleted successfully",
      "id": "{{categoryId}}"
    }
  }
  ```

---

### C. Upload APIs (Admin)

#### 9. Standalone Image Upload
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/upload`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Body:** `form-data`
  - Key `image` (Type: **File**): Choose a valid `.jpg`, `.png`, or `.webp` file (Max 5MB)
  - Key `folder` (Type: **Text**, optional): `blogs` (or `news-events`, `general`)
- **Expected Status:** `201 Created`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "url": "http://res.cloudinary.com/.../empirical-india/blogs/sample.jpg",
      "secureUrl": "https://res.cloudinary.com/.../empirical-india/blogs/sample.jpg",
      "publicId": "empirical-india/blogs/sample"
    }
  }
  ```
- **Postman Tests Script:**
  ```javascript
  pm.test("Status code is 201", () => pm.response.to.have.status(201));
  const res = pm.response.json();
  if (res.data) {
    pm.environment.set("uploadedImageUrl", res.data.secureUrl);
    pm.environment.set("uploadedPublicId", res.data.publicId);
  }
  ```

---

### D. Blogs APIs (Admin)

#### 10. Create Blog (Option A: JSON with pre-uploaded image)
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/blogs`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "title": "Precision Roll-Forming for Heavy Racking Systems",
    "excerpt": "An in-depth analysis of high-tensile steel profile manufacturing and inline punching tolerance control.",
    "content": "Empirical India designs bespoke roll-forming lines tailored to stringent industrial standards. Each line integrates high-precision decoilers, cassette roll stations, and flying cut-off hydraulics...",
    "category": "{{categoryId}}",
    "tags": ["roll-forming", "racking", "steel-profiles"],
    "status": "published",
    "featured": true,
    "alt": "Industrial roll-forming station",
    "metaTitle": "Precision Roll-Forming for Heavy Racking | Empirical India",
    "metaDescription": "Explore heavy-duty roll-forming engineering capabilities with custom tooling and high-precision tolerances.",
    "keywords": ["roll-forming line", "metal pallets", "industrial tooling"],
    "featuredImage": {
      "url": "{{uploadedImageUrl}}",
      "publicId": "{{uploadedPublicId}}",
      "alt": "Precision roll-forming line"
    }
  }
  ```
- **Expected Status:** `201 Created`
- **Postman Tests Script:**
  ```javascript
  pm.test("Status code is 201", () => pm.response.to.have.status(201));
  const res = pm.response.json();
  if (res.data && res.data._id) {
    pm.environment.set("blogId", res.data._id);
    pm.environment.set("blogSlug", res.data.slug);
  }
  ```

#### 10b. Create Blog (Option B: Multipart/form-data with file)
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/blogs`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Body:** `form-data`
  - `title` (Text): `Precision Roll-Forming for Heavy Racking`
  - `excerpt` (Text): `An in-depth analysis of high-tensile steel profile manufacturing...`
  - `content` (Text): `Detailed breakdown of machine components and tooling design...`
  - `category` (Text): `{{categoryId}}`
  - `image` (File): *Select image file (JPG/PNG/WEBP < 5MB)*
  - `alt` (Text): `Roll-forming production machinery`
  - `tags` (Text): `roll-forming, tooling, export`
  - `status` (Text): `published`
  - `featured` (Text): `true`
  - `metaTitle` (Text): `Precision Roll-Forming Machinery`
  - `metaDescription` (Text): `High accuracy roll-forming equipment.`
  - `keywords` (Text): `roll-forming, machinery`

---

#### 11. List Blogs (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/blogs?page=1&limit=10&status=published&featured=true`
- **Query Params:**
  - `page` *(default 1)*
  - `limit` *(default 10, max 100)*
  - `search` *(searches title & excerpt)*
  - `status` *(draft | published)*
  - `category` *(24-hex ObjectId)*
  - `featured` *(true | false)*
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 12. Get Blog by ID (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/blogs/{{blogId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 13. Update Blog
- **Method:** `PUT`
- **URL:** `{{baseUrl}}/api/admin/blogs/{{blogId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "title": "Precision Roll-Forming for Heavy Racking Systems (Updated)",
    "excerpt": "Updated technical analysis on roll-forming engineering and inline quality checks.",
    "featured": true,
    "tags": ["roll-forming", "racking", "advanced-engineering"]
  }
  ```
- **Expected Status:** `200 OK`

---

#### 14. Delete Blog
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/admin/blogs/{{blogId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "message": "Blog deleted successfully",
      "id": "{{blogId}}"
    }
  }
  ```

---

### E. News & Events APIs (Admin)

#### 15. Create News & Event (Event Example)
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/news-events`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "title": "International Tube & Pipe Machinery Expo 2026",
    "type": "event",
    "excerpt": "Empirical India showcases specialized trolley-bag tube profiling and custom roll-forming lines at booth B-42.",
    "content": "Join our engineering team at the upcoming international manufacturing symposium. We will demonstrate precision tube tolerances, modular pallet load simulations, and custom roll-tooling innovations.",
    "category": "{{categoryId}}",
    "tags": ["expo", "tube-machinery", "engineering"],
    "status": "published",
    "featured": true,
    "eventStartDate": "2026-11-20T10:00:00.000Z",
    "eventEndDate": "2026-11-23T18:00:00.000Z",
    "eventLocation": "Bombay Exhibition Centre, Mumbai, India",
    "eventRegistrationUrl": "https://example.com/expo-registration",
    "featuredImage": {
      "url": "{{uploadedImageUrl}}",
      "publicId": "{{uploadedPublicId}}",
      "alt": "Trade expo banner"
    }
  }
  ```
- **Expected Status:** `201 Created`
- **Postman Tests Script:**
  ```javascript
  pm.test("Status code is 201", () => pm.response.to.have.status(201));
  const res = pm.response.json();
  if (res.data && res.data._id) {
    pm.environment.set("newsEventId", res.data._id);
    pm.environment.set("newsEventSlug", res.data.slug);
  }
  ```

#### 15b. Create News (News Example)
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/admin/news-events`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "title": "Commissioning of High-Speed Trolley-Bag Tube Line",
    "type": "news",
    "excerpt": "Empirical India completes delivery of automated tube profiling line for export client.",
    "content": "The line guarantees tight dimensional tolerances and automated cut-to-length processing designed for luggage trolley tube specifications.",
    "category": "{{categoryId}}",
    "tags": ["luggage-tubes", "dispatch", "commissioning"],
    "status": "published",
    "featured": false,
    "featuredImage": {
      "url": "{{uploadedImageUrl}}",
      "publicId": "{{uploadedPublicId}}",
      "alt": "Factory commissioning floor"
    }
  }
  ```
- **Expected Status:** `201 Created`

---

#### 16. List News & Events (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/news-events?page=1&limit=10&type=event&upcoming=true`
- **Query Params:**
  - `page` *(default 1)*
  - `limit` *(default 10)*
  - `type` (`news` | `event`)
  - `status` (`draft` | `published`)
  - `category` *(ObjectId)*
  - `featured` (`true` | `false`)
  - `upcoming` (`true` — filters events with startDate >= now)
  - `past` (`true` — filters events with startDate < now)
  - `search` *(keyword search)*
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 17. Get News & Event by ID (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/news-events/{{newsEventId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

#### 18. Update News & Event
- **Method:** `PUT`
- **URL:** `{{baseUrl}}/api/admin/news-events/{{newsEventId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "eventLocation": "Hall 5, Bombay Exhibition Centre, Mumbai",
    "featured": true
  }
  ```
- **Expected Status:** `200 OK`

---

#### 19. Delete News & Event
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/admin/news-events/{{newsEventId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

### F. Dashboard APIs (Admin)

#### 20. Dashboard Stats
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/dashboard`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "totalBlogs": 1,
      "publishedBlogs": 1,
      "draftBlogs": 0,
      "totalNews": 0,
      "totalEvents": 1,
      "publishedNews": 0,
      "upcomingEvents": 1,
      "featuredPosts": 2,
      "totalEnquiries": 1,
      "newEnquiries": 1
    }
  }
  ```

---

### G. Public APIs (No Auth)

All public routes return **only published** content (`status: "published"`). Draft items are never returned.

#### 21. List Published Blogs
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/blogs?page=1&limit=10&featured=true`
- **Query Params:**
  - `page` *(default 1)*
  - `limit` *(default 10, max 50)*
  - `category` *(category slug e.g. `roll-forming-technology` OR ObjectId)*
  - `tag` *(exact tag string)*
  - `featured` (`true` | `false`)
  - `search` *(case-insensitive text search)*
- **Headers:** None
- **Expected Status:** `200 OK`

---

#### 22. Get Published Blog by Slug
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/blogs/{{blogSlug}}`
- **Headers:** None
- **Expected Status:** `200 OK`
- **Expected Status (if draft or not found):** `404 Not Found`

---

#### 23. List Published News & Events
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/news-events?type=event&upcoming=true`
- **Query Params:**
  - `page` *(default 1)*
  - `limit` *(default 10, max 50)*
  - `type` (`news` | `event`)
  - `category` *(category slug or ObjectId)*
  - `tag` *(exact tag match)*
  - `featured` (`true` | `false`)
  - `upcoming` (`true` — events with startDate >= now)
  - `past` (`true` — events with startDate < now)
  - `search` *(text search)*
- **Headers:** None
- **Expected Status:** `200 OK`

---

#### 24. Get Published News & Event by Slug
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/news-events/{{newsEventSlug}}`
- **Headers:** None
- **Expected Status:** `200 OK`
- **Expected Status (if draft or not found):** `404 Not Found`

---

#### 25. List Active Categories
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/categories?type=blog`
- **Query Params:**
  - `type` *(optional: `blog`, `news`, `event`, `general`)*
- **Headers:** None
- **Expected Status:** `200 OK`

---

### H. Enquiries & RFQ APIs

#### 26. Submit Public Enquiry / RFQ
- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/enquiries`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "businessLine": "roll-forming-lines",
    "fullName": "Rajesh Sharma",
    "companyName": "Apex Infrastructure Ltd",
    "workEmail": "rajesh@apexinfra.com",
    "phone": "+91 98220 12345",
    "location": "Pune, Maharashtra, India",
    "requirement": "Require a high-precision custom roll-forming line for solar C-channel structural profiles with thickness 2.0mm to 3.5mm."
  }
  ```
- **Expected Status:** `201 Created`
- **Response Structure:**
  ```json
  {
    "success": true,
    "data": {
      "referenceId": "EI-RFQ-582914",
      "id": "675841029384756201928601",
      "message": "Enquiry submitted successfully"
    }
  }
  ```

#### 27. List Enquiries (Admin)
- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/admin/enquiries?page=1&limit=15&status=new`
- **Query Params:**
  - `page` *(default 1)*
  - `limit` *(default 15)*
  - `status` (`new` | `in-review` | `responded` | `archived`)
  - `businessLine` (`roll-forming-lines` | `modular-metal-pallets` | `trolley-bag-tubes` | `general`)
  - `search` *(keyword search across name, company, email, ref ID)*
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

#### 28. Update Enquiry Status & Notes (Admin)
- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/api/admin/enquiries/{{enquiryId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "status": "in-review",
    "notes": "Reviewed with Nashik engineering team; technical feasibility confirmed."
  }
  ```
- **Expected Status:** `200 OK`

#### 29. Delete Enquiry (Admin)
- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/admin/enquiries/{{enquiryId}}`
- **Headers:**
  - `Authorization: Bearer {{token}}`
- **Expected Status:** `200 OK`

---

## 6. Negative & Edge Case Testing Guide

Test these negative scenarios to confirm the backend's resilience and correct HTTP status codes:

| Test Case | Method & Route | Payload / Condition | Expected Status | Expected Error Shape |
|---|---|---|---|---|
| **Invalid Login Credentials** | `POST /api/admin/auth/login` | Bad password or unknown email | `401 Unauthorized` | `{"success": false, "message": "Invalid email or password"}` |
| **Protected Route Without Token** | `GET /api/admin/blogs` | No `Authorization` header, no cookies | `401 Unauthorized` | `{"success": false, "message": "Unauthorized: Please provide a valid authentication token."}` |
| **Invalid Token** | `GET /api/admin/auth/me` | `Authorization: Bearer invalid_jwt_token` | `401 Unauthorized` | `{"success": false, "message": "Unauthorized..."}` |
| **Malformed ObjectId** | `GET /api/admin/blogs/invalid-123` | Path `:id` not 24 hex chars | `422 Unprocessable` / `400 Bad Request` | `{"success": false, "message": "Validation failed", "errors": {"id": [...]}}` |
| **Non-Existent Resource** | `GET /api/admin/blogs/675841029384756201928000` | Valid hex, but does not exist | `404 Not Found` | `{"success": false, "message": "Blog not found"}` |
| **Zod Validation Failure** | `POST /api/admin/blogs` | Title under 3 chars (`"ab"`) | `422 Unprocessable` | `{"success": false, "errors": {"title": ["Title must be at least 3 characters"]}}` |
| **Missing Image on Create** | `POST /api/admin/blogs` | No file and no `featuredImage` object | `400 Bad Request` | `{"success": false, "message": "Featured image is required"}` |
| **Invalid Image MIME Type** | `POST /api/admin/upload` | Upload `.pdf` or `.txt` | `400 Bad Request` | `{"success": false, "message": "Invalid file type..."}` |
| **Image Size Exceeded** | `POST /api/admin/upload` | Upload file > 5 MB | `400 Bad Request` | `{"success": false, "message": "File size exceeds the 5MB limit..."}` |
| **Category In Use Deletion** | `DELETE /api/admin/categories/:id` | Delete category that has associated blogs | `409 Conflict` | `{"success": false, "message": "Category cannot be deleted because it is currently being used."}` |
| **Draft Blog on Public Route** | `GET /api/blogs/:slug` | Slug of blog with `status: "draft"` | `404 Not Found` | `{"success": false, "message": "Blog not found"}` |

---

## 7. Automated Postman Test Scripts

Paste these test assertions in the **Tests** tab of Postman requests to automate verification:

### Common Status & Success Assertion
```javascript
pm.test("Status is 200 or 201", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response body has success: true", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});
```

### Auto-Capture Login Token
```javascript
if (pm.response.code === 200) {
    const res = pm.response.json();
    if (res.data && res.data.token) {
        pm.environment.set("token", res.data.token);
        console.log("Token successfully stored in environment:", res.data.token);
    }
}
```

### Pagination Validator
```javascript
pm.test("Response has valid pagination structure", function () {
    const res = pm.response.json();
    pm.expect(res).to.have.property("pagination");
    pm.expect(res.pagination).to.have.property("page");
    pm.expect(res.pagination).to.have.property("limit");
    pm.expect(res.pagination).to.have.property("total");
    pm.expect(res.pagination).to.have.property("totalPages");
});
```
