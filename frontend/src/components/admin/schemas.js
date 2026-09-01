const iconField = {
  key: 'icon',
  label: 'Icon',
  type: 'text',
  hint: 'Lucide icon name e.g. Feather, Truck, ShieldCheck',
};

export const MAIN_SITE_SCHEMAS = {
  hero: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'backgroundImage', label: 'Hero Background Image', type: 'image', hint: 'Optional upload - overrides the hero background slideshow' },
    { key: 'h1Line1', label: 'Headline Line 1', type: 'text' },
    { key: 'h1Highlight', label: 'Headline Highlight Word', type: 'text' },
    { key: 'h1Line2', label: 'Headline Line 2', type: 'text' },
    { key: 'body', label: 'Body Paragraph', type: 'textarea', rows: 5 },
    {
      key: 'primaryCta', label: 'Primary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'secondaryCta', label: 'Secondary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'trustItems', label: 'Trust Indicators', type: 'array', itemLabel: 'Badge',
      itemDefaults: { icon: 'ShieldCheck', text: '' },
      fields: [iconField, { key: 'text', label: 'Text', type: 'text' }],
    },
    {
      key: 'cards', label: 'Hero Cards', type: 'array', itemLabel: 'Card',
      itemDefaults: { value: '', label: '' },
      fields: [
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ],
    },
    {
      key: 'stats', label: 'Statistics', type: 'array', itemLabel: 'Stat',
      itemDefaults: { value: '', suffix: '+', label: '' },
      fields: [
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'suffix', label: 'Suffix', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ],
    },
  ],
  about: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
    { key: 'quoteFooter', label: 'Quote Footer', type: 'text' },
    {
      key: 'values', label: 'Core Values', type: 'array', itemLabel: 'Value',
      itemDefaults: { icon: 'Box', title: '', body: '' },
      fields: [
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
    {
      key: 'paragraphs', label: 'Story Paragraphs', type: 'array', itemLabel: 'Paragraph',
      itemDefaults: '', hint: 'Plain text paragraphs',
      fields: [],
    },
    {
      key: 'team', label: 'Operations Team', type: 'array', itemLabel: 'Member',
      itemDefaults: { initials: '', name: '', role: '', bio: '' },
      fields: [
        { key: 'initials', label: 'Initials', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea', rows: 2 },
      ],
    },
    {
      key: 'leadership', label: 'Leadership', type: 'array', itemLabel: 'Leader',
      itemDefaults: { name: '', role: '', bio: '', image: '', experience: '', expertise: '', linkedin: '', email: '' },
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea', rows: 3 },
        { key: 'image', label: 'Photo', type: 'image' },
        { key: 'experience', label: 'Experience Line', type: 'text' },
        { key: 'expertise', label: 'Expertise Line', type: 'text' },
        { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        { key: 'email', label: 'Email', type: 'text' },
      ],
    },
  ],
  overview: [
    {
      key: 'rows', label: 'Company Overview Rows', type: 'array', itemLabel: 'Row',
      itemDefaults: { label: '', value: '' },
      fields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'textarea', rows: 2 },
      ],
    },
  ],
  products: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'items', label: 'Product Items', type: 'array', itemLabel: 'Product',
      itemDefaults: { badge: 'New', icon: 'Feather', gradient: 'from-navy to-navy-2', name: '', grade: '', format: '', packaging: '', suitableFor: '', description: '', tags: ['', ''], image: '' },
      fields: [
        { key: 'badge', label: 'Badge', type: 'text' },
        iconField,
        { key: 'gradient', label: 'Visual Style', type: 'text', hidden: true },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'grade', label: 'Grade / Category', type: 'text' },
        { key: 'format', label: 'Format', type: 'text' },
        { key: 'packaging', label: 'Packaging', type: 'text' },
        { key: 'suitableFor', label: 'Typical Use / Buyer', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'tags', label: 'Tags', type: 'array', itemLabel: 'Tag', itemDefaults: '', fields: [] },
        { key: 'image', label: 'Image', type: 'image' },
      ],
    },
    {
      key: 'specs', label: 'Specifications Table', type: 'array', itemLabel: 'Spec Row',
      itemDefaults: { name: '', grade: '', sizes: '', moq: '', lead: '', status: 'In Stock', statusClass: 'stock' },
      fields: [
        { key: 'name', label: 'Product', type: 'text' },
        { key: 'grade', label: 'Grade', type: 'text' },
        { key: 'sizes', label: 'Sizes', type: 'text' },
        { key: 'moq', label: 'Min. Order', type: 'text' },
        { key: 'lead', label: 'Lead Time', type: 'text' },
        {
          key: 'statusClass', label: 'Status', type: 'select',
          options: [{ value: 'stock', label: 'In Stock' }, { value: 'limited', label: 'Limited' }],
        },
      ],
    },
  ],
  solutions: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    {
      key: 'tiers', label: 'Partner Tiers', type: 'array', itemLabel: 'Tier',
      itemDefaults: { badge: '', name: '', desc: '', featured: false, features: [] },
      fields: [
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'name', label: 'Tier Name', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
        {
          key: 'featured', label: 'Featured (Highlighted)', type: 'select',
          options: [{ value: true, label: 'Yes - Featured' }, { value: false, label: 'No' }],
        },
        {
          key: 'features', label: 'Features', type: 'array', itemLabel: 'Feature',
          itemDefaults: '', fields: [],
        },
      ],
    },
  ],
  supplyChain: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'steps', label: 'Chain Steps', type: 'array', itemLabel: 'Step',
      itemDefaults: { icon: 'Feather', title: '', desc: '' },
      fields: [
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
      ],
    },
    {
      key: 'features', label: 'Chain Features', type: 'array', itemLabel: 'Feature',
      itemDefaults: { icon: 'Sun', title: '', body: '' },
      fields: [
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
  ],
  distribution: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'features', label: 'Distribution Features', type: 'array', itemLabel: 'Feature',
      itemDefaults: { icon: 'Truck', title: '', body: '' },
      fields: [
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
  ],
  whyUs: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    {
      key: 'reasons', label: 'Supply Chain Stages', type: 'array', itemLabel: 'Stage',
      itemDefaults: { num: '01', icon: 'Warehouse', title: '', body: '', kpi: '', status: '' },
      fields: [
        { key: 'num', label: 'Number', type: 'text' },
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 2 },
        { key: 'kpi', label: 'Metric', type: 'text' },
        { key: 'status', label: 'Status', type: 'text' },
      ],
    },
  ],
  statsBand: [
    {
      key: 'stats', label: 'Statistics Band', type: 'array', itemLabel: 'Stat',
      itemDefaults: { value: '', suffix: '+', label: '' },
      fields: [
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'suffix', label: 'Suffix', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ],
    },
  ],
  industries: [
    {
      key: '__items', label: 'Industries Served', type: 'array', itemLabel: 'Industry',
      itemDefaults: { icon: 'Building2', name: '' },
      fields: [iconField, { key: 'name', label: 'Name', type: 'text' }],
    },
  ],
  process: [
    {
      key: '__items', label: 'Process Steps', type: 'array', itemLabel: 'Step',
      itemDefaults: { num: '01', icon: 'Feather', title: '', body: '' },
      fields: [
        { key: 'num', label: 'Number', type: 'text' },
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
  ],
  quality: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    {
      key: 'batch', label: 'Sample Batch Trace', type: 'object', fields: [
        { key: 'id', label: 'Batch Number', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        {
          key: 'steps', label: 'Trace Steps', type: 'array', itemLabel: 'Step',
          itemDefaults: { title: '', time: '' },
          fields: [
            { key: 'title', label: 'Step Title', type: 'text' },
            { key: 'time', label: 'Time', type: 'text' },
          ],
        },
      ],
    },
    {
      key: 'certs', label: 'Certifications', type: 'array', itemLabel: 'Certification',
      itemDefaults: { icon: 'ShieldCheck', name: '', body: '', status: 'Active' },
      fields: [
        iconField,
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 2 },
        { key: 'status', label: 'Status', type: 'text' },
      ],
    },
  ],
  testimonials: [
    {
      key: '__items', label: 'Testimonials', type: 'array', itemLabel: 'Testimonial',
      itemDefaults: { initials: '', name: '', role: '', text: '' },
      fields: [
        { key: 'initials', label: 'Initials', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'text', label: 'Quote Text', type: 'textarea', rows: 3 },
      ],
    },
  ],
  faq: [
    {
      key: '__items', label: 'FAQ Items', type: 'array', itemLabel: 'Question',
      itemDefaults: { q: '', a: '' },
      fields: [
        { key: 'q', label: 'Question', type: 'text' },
        { key: 'a', label: 'Answer', type: 'textarea', rows: 3 },
      ],
    },
  ],
  contact: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'info', label: 'Contact Info Items', type: 'array', itemLabel: 'Item',
      itemDefaults: { icon: 'Phone', label: '', value: '' },
      fields: [
        iconField,
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'textarea', rows: 2 },
      ],
    },
  ],
  company: [
    { key: 'name', label: 'Company Name', type: 'text' },
    { key: 'sub', label: 'Sub Label', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
  ],
  ourCompanies: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'companies', label: 'Group Companies', type: 'array', itemLabel: 'Company',
      itemDefaults: { id: '', name: '', tagline: '', description: '', color: '#B8860B', url: '', logo: null },
      fields: [
        { key: 'id', label: 'Short Name', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'tagline', label: 'Tagline', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'color', label: 'Accent Color', type: 'color' },
        { key: 'url', label: 'Website Link', type: 'text' },
        { key: 'logo', label: 'Logo', type: 'image' },
      ],
    },
  ],
  footer: [
    { key: 'copyright', label: 'Copyright Line', type: 'textarea', rows: 2 },
    { key: 'locations', label: 'Locations', type: 'text' },
    {
      key: 'quickLinks', label: 'Company Links', type: 'array', itemLabel: 'Link',
      itemDefaults: { label: '', href: '' },
      fields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'solutionsLinks', label: 'Products & Solutions Links', type: 'array', itemLabel: 'Link',
      itemDefaults: { label: '', href: '' },
      fields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'resourcesLinks', label: 'Resources Links', type: 'array', itemLabel: 'Link',
      itemDefaults: { label: '', href: '' },
      fields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Link Destination', type: 'text' },
      ],
    },
  ],
  banners: [
    {
      key: 'main', label: 'Main Website Page Banners', type: 'object', fields: [
        {
          key: 'contact', label: 'Contact Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [], hint: 'Optional background image links' },
          ],
        },
        {
          key: 'process', label: 'Process Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [] },
          ],
        },
        {
          key: 'products', label: 'Products Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [] },
          ],
        },
        {
          key: 'quality', label: 'Quality Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [] },
          ],
        },
        {
          key: 'solutions', label: 'Solutions Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [] },
          ],
        },
        {
          key: 'team', label: 'Team Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
            { key: 'images', label: 'Slideshow Images', type: 'array', itemLabel: 'Image', itemDefaults: '', fields: [] },
          ],
        },
      ],
    },
    {
      key: 'eggTraders', label: 'Egg Traders Page Banners', type: 'object', fields: [
        {
          key: 'about', label: 'About Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
        {
          key: 'contact', label: 'Contact Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
        {
          key: 'products', label: 'Products Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
        {
          key: 'quality', label: 'Quality Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
        {
          key: 'solutions', label: 'Solutions Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
        {
          key: 'process', label: 'Process Page Banner', type: 'object', fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
          ],
        },
      ],
    },
  ],
  cta: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'textarea', rows: 2 },
    { key: 'sub', label: 'Subtext', type: 'textarea', rows: 3 },
    {
      key: 'primaryCta', label: 'Primary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'secondaryCta', label: 'Secondary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
  ],
  aboutScenes: [
    {
      key: 'hero', label: 'About Hero Scene', type: 'object', fields: [
        { key: 'coordinates', label: 'Coordinates Label', type: 'text' },
        { key: 'eyebrow', label: 'Section Label', type: 'text' },
        { key: 'h1Line1', label: 'Headline Line 1', type: 'text' },
        { key: 'h1Highlight', label: 'Headline Highlight', type: 'text' },
        { key: 'paragraph', label: 'Paragraph', type: 'textarea', rows: 5 },
        { key: 'ctaLabel', label: 'Button Label', type: 'text' },
        { key: 'stamp', label: 'Stamp Text', type: 'text' },
        {
          key: 'stats', label: 'Stats Row', type: 'array', itemLabel: 'Stat',
          itemDefaults: { value: '', label: '' },
          fields: [
            { key: 'value', label: 'Value', type: 'text' },
            { key: 'label', label: 'Label', type: 'text' },
          ],
        },
        {
          key: 'slides', label: 'Background Slideshow Images', type: 'array', itemLabel: 'Image',
          itemDefaults: '', fields: [], hint: 'Background slideshow - one image link per item',
        },
      ],
    },
    {
      key: 'chairman', label: "Chairman's Message Scene", type: 'object', fields: [
        { key: 'eyebrow', label: 'Section Label', type: 'text' },
        { key: 'quote', label: 'Quote', type: 'textarea', rows: 5 },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'image', label: 'Portrait Image', type: 'image' },
        { key: 'seal', label: 'Seal Text', type: 'text' },
      ],
    },
    {
      key: 'ourStory', label: 'Our Story Timeline Scene', type: 'object', fields: [
        { key: 'eyebrow', label: 'Section Label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtext', label: 'Subtext', type: 'textarea', rows: 2 },
        {
          key: 'milestones', label: 'Timeline Milestones', type: 'array', itemLabel: 'Milestone',
          itemDefaults: { id: '', year: '', title: '', desc: '', img: '', stats: '', metric: '', metricLabel: '' },
          fields: [
            { key: 'id', label: 'Short Name', type: 'text' },
            { key: 'year', label: 'Year', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
            { key: 'img', label: 'Image', type: 'image' },
            { key: 'stats', label: 'Badge Text', type: 'text' },
            { key: 'metric', label: 'Metric Value', type: 'text' },
            { key: 'metricLabel', label: 'Metric Label', type: 'text' },
          ],
        },
      ],
    },
    {
      key: 'visionMission', label: 'Vision & Mission Scene', type: 'object', fields: [
        { key: 'bgImage', label: 'Background Image', type: 'image' },
        { key: 'eyebrow', label: 'Section Label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        {
          key: 'vision', label: 'Vision Card', type: 'object', fields: [
            { key: 'eyebrow', label: 'Section Label', type: 'text' },
            { key: 'marker', label: 'Marker', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'desc', label: 'Description', type: 'textarea', rows: 4 },
          ],
        },
        {
          key: 'mission', label: 'Mission Card', type: 'object', fields: [
            { key: 'eyebrow', label: 'Section Label', type: 'text' },
            { key: 'marker', label: 'Marker', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            {
              key: 'items', label: 'Mission List', type: 'array', itemLabel: 'Item',
              itemDefaults: '', fields: [],
            },
          ],
        },
      ],
    },
  ],
};

export const EGG_TRADERS_SCHEMAS = {
  company: [
    { key: 'name', label: 'Company Name', type: 'text' },
    { key: 'sub', label: 'Sub Label', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 2 },
  ],
  hero: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'backgroundImage', label: 'Hero Background Image', type: 'image', hint: 'Optional upload - replaces the default hero background' },
    { key: 'h1Line1', label: 'Headline Line 1', type: 'text' },
    { key: 'h1Highlight', label: 'Headline Highlight', type: 'text' },
    { key: 'h1Line2', label: 'Headline Line 2', type: 'text' },
    { key: 'body', label: 'Body Paragraph', type: 'textarea', rows: 4 },
    {
      key: 'primaryCta', label: 'Primary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'secondaryCta', label: 'Secondary Button', type: 'object', fields: [
        { key: 'label', label: 'Button Label', type: 'text' },
        { key: 'action', label: 'Link Destination', type: 'text' },
      ],
    },
    {
      key: 'trustItems', label: 'Trust Indicators', type: 'array', itemLabel: 'Badge',
      itemDefaults: { icon: 'ShieldCheck', text: '' },
      fields: [iconField, { key: 'text', label: 'Text', type: 'text' }],
    },
    {
      key: 'stats', label: 'Statistics', type: 'array', itemLabel: 'Stat',
      itemDefaults: { value: '', suffix: '+', label: '' },
      fields: [
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'suffix', label: 'Suffix', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ],
    },
  ],
  about: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    { key: 'quote', label: 'Quote', type: 'textarea', rows: 3 },
    { key: 'quoteFooter', label: 'Quote Footer', type: 'text' },
    {
      key: 'paragraphs', label: 'Story Paragraphs', type: 'array', itemLabel: 'Paragraph',
      itemDefaults: '', fields: [],
    },
    {
      key: 'features', label: 'Website Features', type: 'array', itemLabel: 'Feature',
      itemDefaults: { icon: 'Feather', title: '', body: '' },
      fields: [
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
    {
      key: 'team', label: 'Team', type: 'array', itemLabel: 'Member',
      itemDefaults: { initials: '', name: '', role: '', bio: '' },
      fields: [
        { key: 'initials', label: 'Initials', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'bio', label: 'Bio', type: 'textarea', rows: 2 },
      ],
    },
  ],
  services: [
    {
      key: '__items', label: 'Services', type: 'array', itemLabel: 'Service',
      itemDefaults: { num: '01', title: '', body: '' },
      fields: [
        { key: 'num', label: 'Number', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
  ],
  products: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'items', label: 'Product Items', type: 'array', itemLabel: 'Product',
      itemDefaults: { badge: 'New', grade: 'GRADE', name: '', description: '', specs: [], tags: ['', ''], image: '' },
      fields: [
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'grade', label: 'Grade', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'specs', label: 'Specs (one per line)', type: 'array', itemLabel: 'Spec', itemDefaults: '', fields: [] },
      ],
    },
    {
      key: 'specs', label: 'Specifications Table', type: 'array', itemLabel: 'Spec Row',
      itemDefaults: { name: '', grade: '', sizes: '', moq: '', lead: '', status: 'Available', statusClass: 'stock' },
      fields: [
        { key: 'name', label: 'Product', type: 'text' },
        { key: 'grade', label: 'Grade', type: 'text' },
        { key: 'sizes', label: 'Sizes', type: 'text' },
        { key: 'moq', label: 'Min. Order', type: 'text' },
        { key: 'lead', label: 'Lead Time', type: 'text' },
        {
          key: 'statusClass', label: 'Status', type: 'select',
          options: [{ value: 'stock', label: 'Available' }, { value: 'limited', label: 'Limited' }],
        },
      ],
    },
  ],
  solutions: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    {
      key: 'tiers', label: 'Plans / Tiers', type: 'array', itemLabel: 'Tier',
      itemDefaults: { badge: '', name: '', desc: '', featured: false, features: [] },
      fields: [
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'name', label: 'Tier Name', type: 'text' },
        { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
        {
          key: 'featured', label: 'Featured', type: 'select',
          options: [{ value: true, label: 'Yes - Featured' }, { value: false, label: 'No' }],
        },
        {
          key: 'features', label: 'Features', type: 'array', itemLabel: 'Feature',
          itemDefaults: '', fields: [],
        },
      ],
    },
  ],
  process: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'steps', label: 'Process Steps', type: 'array', itemLabel: 'Step',
      itemDefaults: { num: '01', icon: 'Search', title: '', body: '' },
      fields: [
        { key: 'num', label: 'Number', type: 'text' },
        iconField,
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 3 },
      ],
    },
  ],
  quality: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
    {
      key: 'batch', label: 'Sample Batch Trace', type: 'object', fields: [
        { key: 'id', label: 'Batch Number', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        {
          key: 'steps', label: 'Trace Steps', type: 'array', itemLabel: 'Step',
          itemDefaults: { title: '', time: '' },
          fields: [
            { key: 'title', label: 'Step Title', type: 'text' },
            { key: 'time', label: 'Time', type: 'text' },
          ],
        },
      ],
    },
    {
      key: 'certs', label: 'Certifications', type: 'array', itemLabel: 'Certification',
      itemDefaults: { icon: 'ShieldCheck', name: '', body: '', status: 'Active' },
      fields: [
        iconField,
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 2 },
        { key: 'status', label: 'Status', type: 'text' },
      ],
    },
    {
      key: 'testimonials', label: 'Testimonials', type: 'array', itemLabel: 'Testimonial',
      itemDefaults: { initials: '', name: '', role: '', text: '' },
      fields: [
        { key: 'initials', label: 'Initials', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'text', label: 'Quote Text', type: 'textarea', rows: 3 },
      ],
    },
  ],
  contact: [
    { key: 'eyebrow', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2 },
    {
      key: 'info', label: 'Contact Info Items', type: 'array', itemLabel: 'Item',
      itemDefaults: { icon: 'Phone', label: '', value: '' },
      fields: [
        iconField,
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'textarea', rows: 2 },
      ],
    },
  ],
};
