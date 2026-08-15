# Backend API Reference — Yousafzai Eggs Traders (Main Site + Egg Traders)

This document defines the REST API contract that the backend developer must implement.
Both frontends — the **main site** (`yousafzai-latest-website.vercel.app`) and the
**Egg Traders sub-site** (`.../egg-traders`) — talk to **one shared backend**.

---

## 1. Base URL & Configuration

- **Default base URL (frontend):** `https://shayan-ali832-yafbackend.vercel.app`
- The frontend reads the base URL from the Vite env var `VITE_API_BASE` and falls back to the default above.
- All endpoints below are relative to this base URL.
- The backend **must**:
  - Enable CORS for the frontend origins (see §7).
  - Respond with `application/json`.
  - Return `204 No Content` for successful operations with no response body (PUT that does not return a payload).

**Request/Response conventions**

- Request bodies are JSON (`Content-Type: application/json`).
- Auth-protected endpoints require header: `Authorization: Bearer <token>`.
- Success response bodies are JSON objects.
- Failure response body (with correct HTTP status code):

```json
{ "error": "Human readable error message", "message": "Shorter message (optional)" }
```

The frontend reads `error` first, then `message`, and shows it to the user / console.

---

## 2. Authentication

### 2.1 `POST /api/auth/login`
Authenticate an admin/user and return a token + profile.

**Request body**
```json
{
  "email": "admin@yousafzaiagrifoods.com",
  "password": "secret"
}
```

**Success `200 OK`**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "1", "email": "admin@yousafzaiagrifoods.com", "name": "Admin", "role": "admin" }
  }
}
```

> The frontend wraps the response with `res.data || res`, so returning either shape is fine.

**Errors:** `401` invalid credentials, `400` missing fields.

### 2.2 `POST /api/auth/logout`
Logs out the current session (revoke token). **Auth required.**

**Success:** `200 OK` or `204 No Content`. The frontend ignores the body.

---

## 3. CMS Content API (admin editing + public content)

The CMS is a flat, sectioned JSON document. Sections are stored/fetched by **key**.
The frontend seeds a `defaultContent` object and `PUT`s individual sections on save,
and loads everything at startup via `GET /api/cms/all`.

### 3.1 `GET /api/cms/all`
Fetch **all** CMS sections in one object. No auth required (used by public pages). 

**Success `200 OK`**
```json
{
  "hero": { ... },
  "about": { ... },
  "overview": { ... },
  "products": { ... },
  "solutions": { ... },
  "supply-chain": { ... },
  "distribution": { ... },
  "why-us": { ... },
  "stats-band": { ... },
  "industries": [ ... ],
  "process": [ ... ],
  "quality": { ... },
  "contact": { ... },
  "company": { ... },
  "testimonials": [ ... ],
  "faq": [ ... ],
  "our-companies": { ... },
  "footer": { ... },
  "banners": { ... },
  "cta": { ... },
  "about-scenes": { ... },
  "egg-traders": { ... }
}
```

### 3.2 `GET /api/cms/:section`
Fetch a single section. **Auth required** (used by the admin panel).

**`200 OK`** → the raw section value (object or array, e.g. `GET /api/cms/process` returns an array).

### 3.3 `PUT /api/cms/:section`
Replace an entire section. **Auth required.**

**Body:** the full new section value (match the schema in §3.6).

**Success:** `204 No Content` or the updated section.

### 3.4 `PUT /api/cms/all`
Replace every section in one request. **Auth required.**

**Body:** an object keyed by section key (same shape as `GET /api/cms/all`).

**Success:** `204 No Content` or the full updated document.

### 3.5 Section key ↔ endpoint mapping (source of truth)

| Frontend store key | Endpoint `:section` |
|---|---|
| `hero` | `hero` |
| `about` | `about` |
| `overview` | `overview` |
| `products` | `products` |
| `solutions` | `solutions` |
| `supplyChain` | `supply-chain` |
| `distribution` | `distribution` |
| `whyUs` | `why-us` |
| `statsBand` | `stats-band` |
| `industries` | `industries` |
| `process` | `process` |
| `quality` | `quality` |
| `contact` | `contact` |
| `company` | `company` |
| `testimonials` | `testimonials` |
| `faq` | `faq` |
| `ourCompanies` | `our-companies` |
| `footer` | `footer` |
| `banners` | `banners` |
| `cta` | `cta` |
| `aboutScenes` | `about-scenes` |
| `eggTraders` | `egg-traders` |

### 3.6 Recommended data shapes (store as JSON verbatim)

If in doubt, store the **exact JSON** sent by the frontend. The frontend merges server data over its own defaults, so extra fields are tolerated but a full/complete object is preferred.

**`hero`**
```json
{
  "eyebrow": "String",
  "backgroundImage": "",
  "h1Line1": "String",
  "h1Highlight": "String",
  "h1Line2": "String",
  "body": "String",
  "primaryCta": { "label": "String", "action": "/contact" },
  "secondaryCta": { "label": "String", "action": "/" },
  "trustItems": [ { "icon": "ShieldCheck", "text": "String" } ],
  "cards": [ { "value": "60+", "label": "String" } ],
  "stats": [ { "value": "60", "suffix": "+", "label": "String" } ]
}
```

**`about`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "quote": "String",
  "quoteFooter": "String",
  "values": [ { "icon": "Box", "title": "String", "body": "String" } ],
  "paragraphs": ["String"],
  "team": [],
  "leadership": [ { "name": "String", "role": "String", "bio": "String", "image": "URL" } ]
}
```

**`overview`**
```json
{ "rows": [ { "label": "String", "value": "String" } ] }
```

**`products`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "items": [
    {
      "badge": "Grade A",
      "icon": "Feather",
      "gradient": "from-navy to-navy-2",
      "name": "String",
      "description": "String",
      "tags": ["String"],
      "image": "URL or empty string"
    }
  ],
  "specs": [
    { "name": "String", "grade": "String", "sizes": "String", "moq": "String", "lead": "String", "status": "String", "statusClass": "stock" }
  ]
}
```

**`solutions`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "tiers": [
    { "badge": "String", "name": "String", "desc": "String", "featured": false, "features": ["String"] }
  ]
}
```

**`supply-chain`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "steps": [ { "icon": "Feather", "title": "String", "desc": "String" } ],
  "features": [ { "icon": "Sun", "title": "String", "body": "String" } ]
}
```

**`distribution`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "features": [ { "icon": "Truck", "title": "String", "body": "String" } ]
}
```

**`why-us`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "reasons": [
    { "num": "01", "icon": "Warehouse", "title": "String", "body": "String", "kpi": "String", "status": "String" }
  ]
}
```

**`stats-band`**
```json
{ "stats": [ { "value": "280", "suffix": "+", "label": "String" } ] }
```

**`industries`** (array)
```json
[ { "icon": "Building2", "name": "String" } ]
```

**`process`** (array)
```json
[ { "num": "01", "icon": "Feather", "title": "String", "body": "String" } ]
```

**`quality`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "batch": {
    "id": "String",
    "title": "String",
    "subtitle": "String",
    "steps": [ { "title": "String", "time": "String" } ]
  },
  "certs": [ { "icon": "ClipboardList", "name": "String", "body": "String", "status": "Active" } ]
}
```

**`contact`** (main site)
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "info": [ { "icon": "Phone", "label": "String", "value": "String" } ]
}
```

**`company`**
```json
{ "name": "String", "sub": "String", "tagline": "String" }
```

**`our-companies`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "subtitle": "String",
  "companies": [
    { "id": "egg-traders", "name": "String", "tagline": "String", "description": "String", "color": "#0D6B3D", "url": "/egg-traders", "logo": null }
  ]
}
```

**`footer`**
```json
{
  "copyright": "String",
  "locations": "String",
  "quickLinks": [ { "label": "String", "href": "/about" } ],
  "solutionsLinks": [ { "label": "String", "href": "/products" } ],
  "resourcesLinks": [ { "label": "String", "href": "/process" } ]
}
```

**`banners`**
```json
{
  "main": { "contact": { "title": "String", "subtitle": "String", "images": [] }, "process": { ... }, "products": { ... }, "quality": { ... }, "solutions": { ... } },
  "eggTraders": { "about": { "title": "String", "subtitle": "String" }, "contact": { ... }, "products": { ... }, "quality": { ... }, "solutions": { ... }, "process": { ... } }
}
```

**`cta`**
```json
{
  "eyebrow": "String",
  "title": "String",
  "sub": "String",
  "primaryCta": { "label": "String", "action": "/contact" },
  "secondaryCta": { "label": "String", "action": "/contact" }
}
```

**`about-scenes`** (large; store verbatim)
```json
{
  "hero": { "coordinates": "String", "eyebrow": "String", "h1Line1": "String", "h1Highlight": "String", "paragraph": "String", "ctaLabel": "String", "stamp": "String", "stats": [ { "value": "String", "label": "String" } ], "slides": ["URL"] },
  "chairman": { "eyebrow": "String", "quote": "String", "name": "String", "role": "String", "image": "URL", "seal": "String" },
  "ourStory": { "eyebrow": "String", "title": "String", "subtext": "String", "milestones": [ { "id": "1960", "year": "String", "title": "String", "desc": "String", "img": "URL", "stats": "String", "metric": "String", "metricLabel": "String" } ] },
  "visionMission": { "bgImage": "URL", "eyebrow": "String", "title": "String", "vision": { "eyebrow": "String", "marker": "String", "title": "String", "desc": "String" }, "mission": { "eyebrow": "String", "marker": "String", "title": "String", "items": ["String"] } }
}
```

**`egg-traders`** (the whole sub-site; store verbatim as a single section)
```json
{
  "company":  { "name": "Egg Traders", "sub": "String", "tagline": "String" },
  "hero":     { "eyebrow": "String", "backgroundImage": "", "h1Line1": "String", "h1Highlight": "String", "h1Line2": "String", "body": "String", "primaryCta": { ... }, "secondaryCta": { ... }, "trustItems": [ ... ], "stats": [ { "value": "String", "suffix": "String", "label": "String" } ] },
  "about":    { "eyebrow": "String", "title": "String", "subtitle": "String", "quote": "String", "quoteFooter": "String", "paragraphs": ["String"], "features": [ { "icon": "Feather", "title": "String", "body": "String" } ], "team": [ { "initials": "String", "name": "String", "role": "String", "bio": "String" } ] },
  "services": [ { "num": "01", "title": "String", "body": "String" } ],
  "products": { "eyebrow": "String", "title": "String", "subtitle": "String", "items": [ { "badge": "String", "grade": "String", "name": "String", "description": "String", "specs": ["String"], "tags": ["String"], "image": "URL" } ], "specs": [ { "name": "String", "grade": "String", "sizes": "String", "moq": "String", "lead": "String", "status": "String", "statusClass": "String" } ] },
  "solutions": { "eyebrow": "String", "title": "String", "subtitle": "String", "tiers": [ { "badge": "String", "name": "String", "desc": "String", "featured": false, "features": ["String"] } ] },
  "process":  { "eyebrow": "String", "title": "String", "subtitle": "String", "steps": [ { "num": "01", "icon": "String", "title": "String", "body": "String" } ] },
  "quality":  { "eyebrow": "String", "title": "String", "subtitle": "String", "batch": { "id": "String", "title": "String", "subtitle": "String", "steps": [ { "title": "String", "time": "String" } ] }, "certs": [ { "icon": "String", "name": "String", "body": "String", "status": "String" } ], "testimonials": [ { "initials": "String", "name": "String", "role": "String", "text": "String" } ] },
  "contact":  { "eyebrow": "String", "title": "String", "subtitle": "String", "info": [ { "icon": "Phone", "label": "String", "value": "String" } ] }
}
```

> **Recommendation for the database:** store each section in its own collection/table row keyed
> by the section slug, OR store the whole CMS as one document with top-level keys equal to the
> section slugs. The frontend only ever reads the merged JSON.

---

## 4. Quote / Contact Form Submissions

Both forms POST to the **same** endpoint, differentiated by a `source` field.

### 4.1 `POST /api/quotes`
Save a B2B quote / lead. **No auth required.**

**Main site form** (from `ContactSection.jsx`)
```json
{
  "companyName": "String",
  "industry": "Hotel / Restaurant / Café",
  "contactName": "String",
  "jobTitle": "String",
  "email": "String",
  "phone": "String",
  "productType": "Commercial Grade A White",
  "weeklyVolume": "Under 50",
  "deliveryLocation": "String",
  "notes": "String"
}
```
*No `source` field is sent by the main site form.*

**Egg Traders form** (from `EggTradersContact.jsx`) — sent with `source: 'egg-traders'`
```json
{
  "companyName": "String",
  "contactName": "String",
  "email": "String",
  "phone": "String",
  "productType": "Farm-Fresh White Eggs",
  "weeklyVolume": "Under 50",
  "deliveryLocation": "String",
  "notes": "String",
  "source": "egg-traders"
}
```

**Required fields (validated client-side):** `companyName`, `contactName`, `email`, `phone`, `deliveryLocation`.

**Success `200 OK` / `201 Created`**
```json
{ "message": "Quote request submitted successfully! ..." }
```

The frontend shows `res.message` (falls back to its own text if absent).

**Recommended fields to store server-side:** the payload above plus `status` (default
`"new"`), `createdAt` ISO timestamp, and a `source` discriminator.

### 4.2 Recommended (not yet consumed by frontend): `GET /api/quotes`
List all quote submissions (admin dashboard).
**Auth required.** Useful for a future admin quotes inbox.

---

## 5. File Upload

### 5.1 `POST /api/upload`
Upload an image (used for hero backgrounds / banner images in the admin panel).

**Request:** `multipart/form-data` with a field named exactly `file`.

**Success `200 OK`**
```json
{ "url": "https://.../uploads/filename.jpg" }
```

The frontend stores the returned `url` string into the CMS section field
(e.g. `hero.backgroundImage`). The returned URL must be publicly accessible and stable.

**Constraints:** accept images (jpg/png/webp/svg), reasonable size limit (e.g. 5–10 MB),
store publicly reachable (e.g. Vercel Blob, S3 + CDN, or a static `/uploads` directory).

---

## 6. Auth/Role Expectations

- Any admin CMS route (`/api/cms/*` writes, `/api/auth/logout`) must verify the Bearer token.
- Recommend JWT with an expiry (e.g. 7–30 days). The frontend persists the token in
  localStorage under key `yousafzai-auth` and sends it automatically.
- User store shape: `{ id, email, name, role }` where `role: "admin"` currently.

---

## 7. CORS

The backend MUST handle the `OPTIONS` preflight correctly. Any `OPTIONS /api/*` request
must return `204` with the headers below (the live backend currently returns `500` on
`OPTIONS`, which breaks the admin login in the browser).

The deployed frontend origins (all may be needed):

```
https://yousafzai-latest-website.vercel.app
https://www.yousafzai-latest-website.vercel.app   (if set)
http://localhost:5173                              (dev)
```

Respond to `OPTIONS` with:
```
Access-Control-Allow-Origin: *        (or the specific origin)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

Accept methods: `GET, POST, PUT, DELETE, OPTIONS`. Allow header `Authorization`.

> Note: the frontend now proxies `/api/*` through its own Vercel domain via
> `vercel.json` rewrites, so same-origin requests bypass CORS. Keep the backend's
> CORS config correct anyway for any direct calls.

---

## 8. Deployment & Info for the Backend Developer

- Frontend env override: `VITE_API_BASE=https://your-backend.vercel.app`.
- PDF certificates are served statically from `/certificates/*.pdf` by the frontend
  host (Vercel), not through this API.
- Keep response times low for `GET /api/cms/all` (home page and all pages load it on first visit).
- Store timestamps as ISO 8601 (UTC).

---

## 9. Quick Endpoint Summary

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | No | Login, returns `{ data: { token, user } }` |
| POST | `/api/auth/logout` | Yes | Invalidate session |
| GET | `/api/cms/all` | No | Fetch all CMS sections (public pages) |
| GET | `/api/cms/:section` | Yes | Fetch one CMS section (admin) |
| PUT | `/api/cms/:section` | Yes | Replace one CMS section (admin) |
| PUT | `/api/cms/all` | Yes | Replace all CMS sections (admin) |
| POST | `/api/quotes` | No | Submit B2B / Egg Traders quote |
| GET | `/api/quotes` | Yes | List quote submissions (recommended) |
| POST | `/api/upload` | Yes | Image upload, returns `{ url }` |

The frontend API client that implements these calls lives in `src/lib/api.js`.