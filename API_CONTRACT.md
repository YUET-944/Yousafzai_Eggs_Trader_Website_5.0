# API Contract — Yousafzai EGRO CMS

Base URL: `https://api.yousafzaigroup.com/v1` (or similar)

All endpoints return JSON. Auth endpoints use JWT. CMS endpoints require `Authorization: Bearer <token>`.

---

## 1. Authentication

### POST /api/auth/login

**Request:**
```json
{
  "email": "admin@yousafzaigroup.com",
  "password": "Admin@2025"
}
```

**Response (200):**
```json
{
  "token": "jwt...",
  "user": {
    "email": "admin@yousafzaigroup.com",
    "name": "Admin"
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

### POST /api/auth/logout
Invalidates token. No body required.

---

## 2. CMS Content — Full CRUD

Each section is a resource. The frontend expects these exact shapes:

### GET/PUT /api/cms/hero
```json
{
  "eyebrow": "International B2B Egg Trading & Supply",
  "h1Line1": "Trusted Egg Traders",
  "h1Highlight": "Global Standards",
  "h1Line2": "Built for",
  "body": "Yousafzai EGRO is Pakistan's compliance-first egg trading and supply house...",
  "primaryCta": { "label": "Request a B2B Quote", "action": "/contact" },
  "secondaryCta": { "label": "Explore Our Supply Chain", "action": "/" },
  "trustItems": [
    { "icon": "ShieldCheck", "text": "ISO 22000:2018 Certified" },
    { "icon": "CheckCircle2", "text": "PSQCA & Halal Assured" },
    { "icon": "Home", "text": "28 Cities Across Pakistan" }
  ],
  "cards": [
    { "value": "520K+", "label": "Eggs traded weekly" },
    { "value": "100%", "label": "Batch traceability" },
    { "value": "99.2%", "label": "On-time delivery" }
  ],
  "stats": [
    { "value": "280", "suffix": "+", "label": "Active B2B partners & clients" },
    { "value": "42", "suffix": "+", "label": "Vetted partner farms" },
    { "value": "8", "suffix": "+", "label": "Active certifications" },
    { "value": "99", "suffix": ".2%", "label": "On-time, in-spec delivery" }
  ]
}
```

### GET/PUT /api/cms/about
```json
{
  "eyebrow": "About Yousafzai EGRO",
  "title": "Connecting Farms to Businesses, With Compliance at the Core",
  "subtitle": "Yousafzai EGRO unites specialist egg trading with compliance-first B2B supply...",
  "quote": "\"To make egg supply predictable, sustainable, and profitable...\"",
  "quoteFooter": "Our Mission Statement",
  "values": [
    { "icon": "Box", "title": "Transparency", "body": "Every batch, every test result, every audit..." },
    { "icon": "ShieldCheck", "title": "Compliance First", "body": "..." },
    { "icon": "Clock", "title": "Reliability", "body": "..." }
  ],
  "paragraphs": ["string", "string", "string"],
  "team": [
    { "initials": "TY", "name": "Tariq Yousafzai", "role": "Managing Director", "bio": "..." },
    { "initials": "NR", "name": "Nadia Rehman", "role": "Head of Partnerships", "bio": "..." },
    { "initials": "BH", "name": "Bilal Hussain", "role": "Logistics Director", "bio": "..." }
  ]
}
```

### GET/PUT /api/cms/overview
```json
{
  "rows": [
    { "label": "Company Name", "value": "Yousafzai EGRO (Pvt.) Ltd. — Egg Traders" },
    { "label": "Established", "value": "2010, Peshawar, Khyber Pakhtunkhwa" },
    { "label": "Business Type", "value": "B2B Egg Trading, Supply & Distribution" },
    { "label": "Trading Volume", "value": "500,000+ eggs / week" },
    { "label": "Active Partners & Clients", "value": "280+ businesses" },
    { "label": "Farm Network", "value": "40+ vetted supplier farms" },
    { "label": "Cold-Chain Fleet", "value": "35 refrigerated vehicles" },
    { "label": "ESG Rating", "value": "92/100 (Third-party audited)" }
  ]
}
```

### GET/PUT /api/cms/products
```json
{
  "eyebrow": "Products",
  "title": "Full-Range Egg Trading & Supply Portfolio",
  "subtitle": "One reliable partner for every egg procurement need...",
  "items": [
    {
      "badge": "Grade A",
      "icon": "Feather",
      "gradient": "from-navy to-navy-2",
      "name": "Commercial Grade A White",
      "description": "Consistent Grade A white shell eggs...",
      "tags": ["Daily Supply", "S-XL"],
      "image": "https://images.unsplash.com/photo-xxx"
    }
  ],
  "specs": [
    {
      "name": "White Shell Eggs",
      "grade": "Grade A",
      "sizes": "S, M, L, XL",
      "moq": "500 trays/week",
      "lead": "24 hrs",
      "status": "In Stock",
      "statusClass": "stock"
    }
  ]
}
```

### GET/PUT /api/cms/solutions
```json
{
  "eyebrow": "Trading Solutions",
  "title": "Grow With Us — Three Tiers, One Mission",
  "subtitle": "...",
  "tiers": [
    {
      "badge": "Silver Partner",
      "name": "Silver",
      "desc": "100–499 trays per week",
      "featured": false,
      "features": ["5% volume discount", "Email account support", "..."]
    }
  ]
}
```

### GET/PUT /api/cms/supply-chain
```json
{
  "eyebrow": "Supply Chain",
  "title": "A Fully Integrated, Cold-Chain-Managed Flow",
  "subtitle": "...",
  "steps": [
    { "icon": "Feather", "title": "Farm Sourcing", "desc": "Vetted partner farms..." }
  ],
  "features": [
    { "icon": "Sun", "title": "Cold Chain Management", "body": "Continuous 2–5°C..." }
  ]
}
```

### GET/PUT /api/cms/distribution
```json
{
  "eyebrow": "Export & Distribution",
  "title": "A Distribution Network Built for Scale",
  "subtitle": "...",
  "features": [
    { "icon": "Truck", "title": "35-Vehicle Cold-Chain Fleet", "body": "..." },
    { "icon": "Globe2", "title": "25+ Cities Covered", "body": "..." },
    { "icon": "CheckCircle2", "title": "4-Hour B2B Quoting", "body": "..." }
  ]
}
```

### GET/PUT /api/cms/why-us
```json
{
  "eyebrow": "Why Choose Us",
  "title": "A Single, Dependable Source for Egg Trading & Supply",
  "reasons": [
    { "num": "01", "title": "Managed Supply Chain", "body": "End-to-end logistics..." }
  ]
}
```

### GET/PUT /api/cms/stats-band
```json
{
  "stats": [
    { "value": "280", "suffix": "+", "label": "Active partners & B2B clients" },
    { "value": "500", "suffix": "K", "label": "Eggs traded & supplied weekly" },
    { "value": "92", "suffix": "/100", "label": "ESG sustainability score" },
    { "value": "100", "suffix": "%", "label": "Batches fully traceable" }
  ]
}
```

### GET/PUT /api/cms/industries
Array of:
```json
[
  { "icon": "Building2", "name": "Hotels & Restaurants" },
  { "icon": "ChefHat", "name": "Bakery & Confectionery" },
  { "icon": "Store", "name": "Retail & Supermarkets" },
  { "icon": "Factory", "name": "Food Manufacturers" },
  { "icon": "Hospital", "name": "Hospitals & Institutions" }
]
```

### GET/PUT /api/cms/process
Array of:
```json
[
  {
    "num": "01",
    "icon": "Feather",
    "title": "Collection",
    "body": "Eggs collected from certified farms..."
  }
]
```

### GET/PUT /api/cms/quality
```json
{
  "eyebrow": "Quality Assurance",
  "title": "Certified. Audited. Fully Traceable.",
  "subtitle": "...",
  "batch": {
    "id": "BATCH-2025-06-22-A47",
    "title": "Sample Batch Trace",
    "subtitle": "Live example — batch delivered 22 June 2025",
    "steps": [
      { "title": "Farm Collected", "time": "06:15 AM" }
    ]
  },
  "certs": [
    { "icon": "ClipboardList", "name": "ISO 22000:2018", "body": "Food Safety Management System", "status": "Active" }
  ]
}
```

### GET/PUT /api/cms/contact
```json
{
  "eyebrow": "Contact Us",
  "title": "B2B Egg Supply — Custom Pricing in 4 Hours",
  "subtitle": "...",
  "info": [
    { "icon": "Phone", "label": "Phone", "value": "+92 91 234 5678" },
    { "icon": "Mail", "label": "Email", "value": "b2b@yousafzaiegro.com" },
    { "icon": "MapPin", "label": "Headquarters", "value": "Peshawar, Khyber Pakhtunkhwa, Pakistan" },
    { "icon": "Clock", "label": "Response Time", "value": "Formal quotation within 4 business hours" }
  ]
}
```

### GET/PUT /api/cms/company
```json
{
  "name": "YOUSAFZAI EGRO",
  "sub": "Egg Traders",
  "tagline": "International B2B egg trading and supply..."
}
```

### GET/PUT /api/cms/testimonials
Array of:
```json
[
  {
    "initials": "HM",
    "name": "Procurement Manager",
    "role": "Hotel Chain, Lahore",
    "text": "Their batch documentation has made our audits effortless..."
  }
]
```

### GET/PUT /api/cms/faq
Array of:
```json
[
  {
    "q": "How quickly can I receive a formal B2B quote?",
    "a": "Submit a quote request and our commercial team responds..."
  }
]
```

### GET/PUT /api/cms/footer
```json
{
  "copyright": "© 2026 Yousafzai EGRO (Pvt.) Ltd. — Egg Traders. All rights reserved.",
  "locations": "Peshawar · Lahore · Karachi",
  "quickLinks": [
    { "label": "About Us", "href": "/about" }
  ],
  "solutionsLinks": [
    { "label": "Products", "href": "/products" }
  ],
  "resourcesLinks": [
    { "label": "Our Process", "href": "/process" }
  ]
}
```

### GET/PUT /api/cms/our-companies
```json
{
  "eyebrow": "Our Group",
  "title": "Our Companies",
  "subtitle": "Explore the specialized brands under the Yousafzai EGRO group...",
  "companies": [
    {
      "id": "yousafzai-egro",
      "name": "Yousafzai EGRO",
      "tagline": "International B2B Egg Trading & Supply",
      "description": "Our flagship brand...",
      "color": "#0B2545",
      "url": "/",
      "logo": null
    }
  ]
}
```

### GET/PUT /api/cms/egg-traders
```json
{
  "company": {
    "name": "Egg Traders",
    "sub": "Poultry Marketplace",
    "tagline": "A Yousafzai EGRO company..."
  },
  "hero": {
    "eyebrow": "Egg Traders",
    "h1Line1": "Your Trusted",
    "h1Highlight": "Egg Marketplace",
    "h1Line2": "Platform",
    "body": "Egg Traders is a specialized poultry and egg marketplace...",
    "primaryCta": { "label": "Start Trading", "action": "/egg-traders/contact" },
    "secondaryCta": { "label": "How It Works", "action": "/egg-traders/about" },
    "trustItems": [
      { "icon": "ShieldCheck", "text": "Verified Farms" }
    ],
    "stats": [
      { "value": "200", "suffix": "+", "label": "Verified poultry farms on-platform" }
    ]
  },
  "about": {
    "eyebrow": "About Egg Traders",
    "title": "The Smarter Way to Trade Eggs",
    "subtitle": "Egg Traders eliminates middlemen...",
    "quote": "Our platform simplifies egg procurement...",
    "quoteFooter": "Our Mission",
    "paragraphs": ["string", "string", "string"],
    "features": [
      { "icon": "Feather", "title": "Verified Farms Only", "body": "Every seller is vetted..." }
    ],
    "team": [
      { "initials": "TY", "name": "Tariq Yousafzai", "role": "Founder", "bio": "..." }
    ]
  },
  "services": [
    { "num": "01", "title": "Farm Discovery", "body": "Browse and connect..." }
  ],
  "products": {
    "eyebrow": "Products",
    "title": "Marketplace Egg Categories",
    "subtitle": "Browse verified egg products...",
    "items": [
      {
        "badge": "Premium",
        "name": "Farm-Fresh White Eggs",
        "description": "Grade A white shell eggs...",
        "tags": ["Daily Supply", "S-XL"],
        "image": "https://images.unsplash.com/photo-xxx"
      }
    ],
    "specs": [
      { "name": "White Shell Eggs", "grade": "Grade A", "sizes": "S, M, L, XL", "moq": "100 trays", "lead": "24 hrs", "status": "Available", "statusClass": "stock" }
    ]
  },
  "solutions": {
    "eyebrow": "Plans",
    "title": "Choose Your Marketplace Plan",
    "subtitle": "...",
    "tiers": [
      { "badge": "Basic Buyer", "name": "Basic", "desc": "Up to 50 trays/week", "featured": false, "features": ["Access to verified farms", "..."] }
    ]
  },
  "process": {
    "eyebrow": "How It Works",
    "title": "From Farm to Business in Four Steps",
    "subtitle": "...",
    "steps": [
      { "num": "01", "icon": "Search", "title": "Browse & Select", "body": "Browse verified farms..." }
    ]
  },
  "quality": {
    "eyebrow": "Quality Assurance",
    "title": "Quality You Can Verify, Every Time",
    "subtitle": "...",
    "batch": {
      "id": "ET-BATCH-2026-07-14-A01",
      "title": "Sample Batch Trace",
      "subtitle": "Live example from a recent transaction",
      "steps": [
        { "title": "Order Placed", "time": "08:00 AM" }
      ]
    },
    "certs": [
      { "icon": "ShieldCheck", "name": "Farm Verified", "body": "Every farm is audited before listing", "status": "Active" }
    ],
    "testimonials": [
      { "initials": "RM", "name": "Restaurant Owner", "role": "Lahore", "text": "Egg Traders has completely changed..." }
    ]
  },
  "contact": {
    "eyebrow": "Contact Us",
    "title": "Start Trading on Egg Traders",
    "subtitle": "...",
    "info": [
      { "icon": "Phone", "label": "Phone", "value": "+92 91 234 5679" },
      { "icon": "Mail", "label": "Email", "value": "traders@yousafzaiegro.com" },
      { "icon": "MapPin", "label": "Office", "value": "Peshawar, Khyber Pakhtunkhwa, Pakistan" },
      { "icon": "Clock", "label": "Response Time", "value": "Within 2 business hours" }
    ]
  }
}
```

---

## 3. Quote / Contact Form

### POST /api/quotes

**Request (main site):**
```json
{
  "companyName": "string",
  "industry": "Hotel / Restaurant / Café | Bakery / Confectionery | Retail / Supermarket | Food Manufacturer | Hospital / Institution | Other",
  "contactName": "string",
  "jobTitle": "string",
  "email": "string",
  "phone": "string",
  "productType": "Commercial Grade A White | Free-Range Brown | Certified Organic | Processing Grade | Mixed / Multiple",
  "weeklyVolume": "Under 50 | 50–199 | 200–499 | 500–1,999 | 2,000+",
  "deliveryLocation": "string",
  "notes": "string (optional)"
}
```

**Request (egg-traders marketplace):**
```json
{
  "companyName": "string",
  "contactName": "string",
  "email": "string",
  "phone": "string",
  "productType": "Farm-Fresh White Eggs | Free-Range Brown Eggs | Certified Organic Eggs | Liquid Whole Egg | Mixed / Multiple",
  "weeklyVolume": "Under 50 | 50–199 | 200–499 | 500–1,999 | 2,000+",
  "deliveryLocation": "string",
  "notes": "string (optional)",
  "source": "egg-traders"
}
```

**Response (201):**
```json
{
  "id": "quote-xxx",
  "message": "Quote request received. You'll receive a formal quotation within 4 business hours."
}
```

---

## 4. Image Upload

### POST /api/upload
Multipart form-data with field `file`.

**Response (201):**
```json
{
  "url": "https://cdn.yousafzaigroup.com/uploads/filename.jpg"
}
```

Accepted formats: jpg, jpeg, png, webp. Max 5MB.

---

## 5. Bulk Content Sync

### GET /api/cms/all
Returns all sections in one response (used for initial page load).

```json
{
  "hero": { ... },
  "about": { ... },
  "overview": { ... },
  "products": { ... },
  "solutions": { ... },
  "supplyChain": { ... },
  "distribution": { ... },
  "whyUs": { ... },
  "statsBand": { ... },
  "industries": [ ... ],
  "process": [ ... ],
  "quality": { ... },
  "contact": { ... },
  "company": { ... },
  "testimonials": [ ... ],
  "faq": [ ... ],
  "footer": { ... },
  "ourCompanies": { ... },
  "eggTraders": { ... }
}
```

### PUT /api/cms/all
Bulk update everything at once. Body same shape as above (for admin "publish all" workflow).

---

## Error Response Format (all endpoints)
```json
{
  "error": "Human-readable message",
  "code": "ERROR_CODE",
  "details": {} (optional)
}
```

Standard codes: `VALIDATION_ERROR`, `NOT_FOUND`, `UNAUTHORIZED`, `FORBIDDEN`, `INTERNAL_ERROR`.
