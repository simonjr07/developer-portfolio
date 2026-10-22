export type ProjectDoc = {
  title: string;
  url: string;
  description: string;
};

export type ProjectTechnologyGroup = {
  label: "Frontend" | "Backend & Data" | "Validation & Testing";
  technologies: readonly string[];
};

export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  roleScope: string;
  screenshot: { src: string; alt: string; caption: string; width: number; height: number };
  operationsScreenshot?: { src: string; alt: string; caption: string; width: number; height: number };
  scenario: string;
  workflow: string;
  features: readonly string[];
  technologyGroups: readonly ProjectTechnologyGroup[];
  featuredTechnologies: readonly string[];
  engineering: readonly { title: string; detail: string }[];
  quality: string;
  boundaries: readonly string[];
  repository: string;
  documentation?: readonly ProjectDoc[];
  liveDemo?: { url: string; note: string };
};

export const projects = [
  {
    slug: "nexaservice",
    name: "NexaService",
    category: "Business website · Lead management dashboard",
    summary: "A workplace and facility-services website paired with a private staff workspace for reviewing, qualifying, and assigning enquiries.",
    roleScope: "Self-initiated portfolio project by Simon Chikaobi. Designed and built the public service site and private staff workspace, including the lead workflow, role-based access, and server-side data model.",
    screenshot: {
      src: "/projects/nexaservice.png",
      width: 1895,
      height: 874,
      alt: "NexaService public website section explaining its fictional workplace-service approach and three-part process.",
      caption: "Public-facing service explanation captured from the local demonstration app.",
    },
    operationsScreenshot: {
      src: "/projects/nexaservice-operations.png",
      width: 1895,
      height: 872,
      alt: "NexaService staff workspace showing enquiry overview dashboard metrics and navigation.",
      caption: "Staff lead overview dashboard captured from the verified source repository.",
    },
    scenario: "A visitor needs to understand a service offering and send an enquiry. A staff team needs a controlled way to review, qualify, and assign the resulting lead.",
    workflow: "Visitors browse published pages and can submit an explicitly fictional enquiry without an account. Staff review leads, update their status, and add private notes; administrators can also assign leads and manage published content and staff accounts.",
    features: [
      "Public home, about, service catalogue, service details, and demo enquiry form.",
      "Private staff lead inbox with search, filters, notes, and status workflow.",
      "Administrator controls for assignment, services, testimonials, settings, and staff accounts.",
      "Operational dashboard counts that describe enquiry activity, not revenue or confirmed sales.",
    ],
      technologyGroups: [
      { label: "Frontend", technologies: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend & Data", technologies: ["PostgreSQL", "Prisma", "Auth.js"] },
      { label: "Validation & Testing", technologies: ["Zod", "Vitest"] },
    ],
    featuredTechnologies: ["Next.js App Router", "TypeScript", "PostgreSQL", "Auth.js"],
    engineering: [
      { title: "One application, clear boundaries", detail: "The public site and private workspace share one Next.js application; server actions and server-only data access keep sensitive decisions on the server." },
      { title: "Server-enforced roles", detail: "Protected requests recheck the active user, and administrator-only operations enforce authorization on the server rather than relying on hidden controls." },
      { title: "Preserved lead history", detail: "Relational constraints and non-destructive publication/account states retain historical lead links and note authorship." },
    ],
    quality: "The source project documents Vitest domain and PostgreSQL integration coverage, plus CI checks for migrations, generated Prisma Client, lint, types, tests, and build. Browser end-to-end tests are planned, not installed.",
    boundaries: ["This is a fictional demonstration, not an operating business.", "The repository documents local development and CI; the hosted demonstration is provided separately through the live-demo link.", "The enquiry form is for fictional demonstration data and must not be used for genuine customer enquiries."],
    repository: "https://github.com/simonjr07/nexaservice",
    documentation: [
      { title: "Architecture", url: "https://github.com/simonjr07/nexaservice/blob/main/docs/ARCHITECTURE.md", description: "System design, boundaries, server actions, and security model." },
      { title: "Database", url: "https://github.com/simonjr07/nexaservice/blob/main/docs/DATABASE.md", description: "PostgreSQL schema, Prisma models, constraints, and audit trails." },
      { title: "Testing", url: "https://github.com/simonjr07/nexaservice/blob/main/docs/TESTING.md", description: "Vitest unit, integration coverage, and CI pipeline checks." },
      { title: "API", url: "https://github.com/simonjr07/nexaservice/blob/main/docs/API.md", description: "Operation authorization, input validation, and error conventions." },
    ],
    liveDemo: { url: "https://nexaservice-flax.vercel.app/", note: "Fictional demonstration; do not submit real customer information." },
  },
  {
    slug: "copper-spoon",
    name: "Copper Spoon",
    category: "Restaurant ordering · Staff operations",
    summary: "A single-location restaurant ordering experience that pairs a customer menu with a protected staff workspace for managing the order queue.",
    roleScope: "Self-initiated portfolio project by Simon Chikaobi. Designed and built the customer menu and ordering flow, protected staff order queue, menu administration, and transactional checkout rules.",
    screenshot: {
      src: "/projects/copper-spoon.png",
      width: 1896,
      height: 867,
      alt: "Copper Spoon fictional restaurant ordering homepage with its menu hero, browse-menu action, and food photography.",
      caption: "Public menu screenshot from the hosted fictional restaurant demonstration.",
    },
    operationsScreenshot: {
      src: "/projects/copper-spoon-operations.png",
      width: 1893,
      height: 668,
      alt: "Copper Spoon restaurant operations overview showing daily order metrics and queue status distribution.",
      caption: "Restaurant staff operational view captured from the verified source repository.",
    },
    scenario: "Restaurant guests need to discover menu items, make choices, and place an order. Staff need a dependable queue that reflects the order that was actually submitted.",
    workflow: "Guests browse and configure menu items, keep a cart, then submit pickup or delivery details without creating an account. Staff review and progress orders; administrators manage menu content and staff access.",
    features: [
      "Published menu browsing and search, with required and optional item choices.",
      "Browser-persisted cart and guest pickup or delivery order submission.",
      "Non-sequential public order code with an order status and event timeline.",
      "Role-protected order queue, controlled status changes, menu administration, and staff management.",
    ],
    technologyGroups: [
      { label: "Frontend", technologies: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend & Data", technologies: ["PostgreSQL", "Prisma", "Auth.js"] },
      { label: "Validation & Testing", technologies: ["Zod", "Vitest"] },
    ],
    featuredTechnologies: ["Next.js App Router", "PostgreSQL", "Prisma", "Auth.js"],
    engineering: [
      { title: "Server-authoritative checkout", detail: "The server rechecks availability and recalculates prices instead of trusting the browser cart." },
      { title: "Historically accurate orders", detail: "Order item and option snapshots preserve what was submitted when the menu later changes." },
      { title: "Atomic workflow changes", detail: "Idempotency, serializable transactions, optimistic concurrency, and transactional status events protect order creation and operations." },
    ],
    quality: "The source project documents Vitest coverage for pricing, validation, checkout idempotency, snapshots, transitions, concurrency, authorization, and data minimization. GitHub Actions applies migrations against PostgreSQL 17 and runs lint, typecheck, tests, and build. Hosted QA is documented; a browser end-to-end suite is not configured.",
    boundaries: ["Copper Spoon is a fictional restaurant demonstration, not a real restaurant.", "Payment choices are simulated; the app does not collect card data or process real payments.", "The demo does not include customer accounts, driver management, or multi-restaurant support."],
    repository: "https://github.com/simonjr07/copper-spoon",
    documentation: [
      { title: "Architecture", url: "https://github.com/simonjr07/copper-spoon/blob/main/docs/ARCHITECTURE.md", description: "Domain model, transactional boundaries, and state management." },
      { title: "Database", url: "https://github.com/simonjr07/copper-spoon/blob/main/docs/DATABASE.md", description: "Relational data design, snapshots, and optimistic locking." },
      { title: "Testing", url: "https://github.com/simonjr07/copper-spoon/blob/main/docs/TESTING.md", description: "Automated Vitest test suites, pricing validation, and concurrency checks." },
      { title: "Decisions", url: "https://github.com/simonjr07/copper-spoon/blob/main/docs/DECISIONS.md", description: "Architecture decision records for checkout, orders, and operations." },
    ],
    liveDemo: { url: "https://copper-spoon-seven.vercel.app", note: "Fictional demo; payment choices are simulated." },
  },
  {
    slug: "aurelia-studio",
    name: "Aurelia Studio",
    category: "Appointment booking · Business operations",
    summary: "A beauty and wellness booking experience that covers customer appointments, staff scheduling, and administrator operations.",
    roleScope: "Self-initiated portfolio project by Simon Chikaobi. Designed and built the customer booking experience, availability engine, staff scheduling, and administrator operations.",
    screenshot: {
      src: "/projects/aurelia-studio.png",
      width: 1893,
      height: 872,
      alt: "Aurelia Studio fictional beauty and wellness homepage introducing services and booking-management actions.",
      caption: "Curated public homepage screenshot; the source project records a privacy review for its screenshot set.",
    },
    operationsScreenshot: {
      src: "/projects/aurelia-studio-operations.png",
      width: 1894,
      height: 872,
      alt: "Aurelia Studio operational workspace overview showing daily schedule overview and appointment metrics.",
      caption: "Business operations and schedule overview captured from the verified source repository.",
    },
    scenario: "A service business needs customers to discover services, check availability, and manage appointments, while staff and administrators coordinate schedules and operations.",
    workflow: "Customers choose a service and professional, view availability, book, and manage eligible appointments. Staff work with scoped appointments and schedules; administrators control services, assignments, availability, blocked time, and reporting.",
    features: [
      "Service discovery, professional selection, computed availability, booking, and confirmation.",
      "Booking lookup and eligible customer cancellation or rescheduling without an account.",
      "Staff appointment workflows and scoped schedule management.",
      "Administrator tools for services, staff, assignments, schedules, blocked time, and aggregate analytics.",
    ],
    technologyGroups: [
      { label: "Frontend", technologies: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend & Data", technologies: ["PostgreSQL", "Prisma", "Auth.js"] },
      { label: "Validation & Testing", technologies: ["Zod", "Vitest"] },
    ],
    featuredTechnologies: ["Next.js App Router", "TypeScript", "PostgreSQL", "Prisma"],
    engineering: [
      { title: "Time-aware availability", detail: "Availability considers service duration, staff assignments, recurring windows, blocked time, existing bookings, booking policies, and the studio time zone." },
      { title: "Concurrency-safe bookings", detail: "Create and reschedule operations recheck state in a transaction; half-open intervals and a PostgreSQL exclusion constraint guard against overlapping active bookings." },
      { title: "Stable booking history", detail: "Service details are snapshotted onto bookings, while UTC instants and studio-local date boundaries serve distinct timekeeping needs." },
    ],
    quality: "The source case study reports 151 passing tests across 32 files with PostgreSQL integration enabled, including time-zone, DST, availability, authorization, and concurrent-write coverage. It also records lint, typecheck, production-build, hosted workflow, responsive, and focus checks. These are source-project reported results, not re-run for this portfolio page.",
    boundaries: ["Aurelia Studio represents a fictional service business, not a real studio.", "The source project does not claim real customers, revenue, performance benchmarks, penetration testing, or accessibility certification."],
    repository: "https://github.com/simonjr07/aurelia-studio",
    documentation: [
      { title: "Architecture", url: "https://github.com/simonjr07/aurelia-studio/blob/main/docs/ARCHITECTURE.md", description: "Availability calculation engine, time-zone handling, and role isolation." },
      { title: "Database", url: "https://github.com/simonjr07/aurelia-studio/blob/main/docs/DATABASE.md", description: "PostgreSQL exclusion constraints, scheduling models, and historical snapshots." },
      { title: "Testing", url: "https://github.com/simonjr07/aurelia-studio/blob/main/docs/TESTING.md", description: "151 automated tests covering DST, timezones, concurrency, and validation." },
    ],
    liveDemo: { url: "https://aurelia-studio-orcin.vercel.app", note: "Fictional appointment-booking demonstration with fictional data." },
  },
  {
    slug: "maison-vale",
    name: "Maison Vale",
    category: "Premium e-commerce · Inventory operations",
    summary: "A premium fashion and lifestyle storefront built around trustworthy pricing, inventory, payment state, and guest order access.",
    roleScope: "Self-initiated portfolio project by Simon Chikaobi. Designed and built the storefront, guest checkout, Stripe webhook handling, inventory administration, and order operations.",
    screenshot: {
      src: "/projects/maison-vale.png",
      width: 1920,
      height: 1080,
      alt: "Maison Vale fictional apparel storefront with its autumn collection, product photography, and catalogue navigation.",
      caption: "Privacy-reviewed desktop capture from the Stripe sandbox portfolio deployment.",
    },
    operationsScreenshot: {
      src: "/projects/maison-vale-operations.png",
      width: 1920,
      height: 1080,
      alt: "Maison Vale operations analytics dashboard showing verified gross sales, refunds, and order metrics.",
      caption: "Operations analytics and sales overview captured from the verified source repository.",
    },
    scenario: "A calm storefront still needs conservative commerce rules: browser cart data can go stale, stock may change during checkout, payment notifications can repeat, and order details must not be exposed through a public reference alone.",
    workflow: "Guests browse products and variants, use a cart that stores only variant IDs and quantities, and check out through Stripe-hosted test mode. A signed webhook—not the browser redirect—establishes payment state. Guests can look up a masked order using its reference and matching checkout email; staff and administrators manage catalogue, inventory, orders, and reporting.",
    features: [
      "Editorial storefront with eight fictional products across four collections and variant-aware product details.",
      "Server-resolved pricing, visibility, stock, shipping, and totals, with a versioned guest cart.",
      "U.S.-only guest checkout through Stripe-hosted Checkout in test mode.",
      "Privacy-aware guest order lookup, product and inventory administration, fulfillment workflows, and read-only analytics.",
    ],
      technologyGroups: [
      { label: "Frontend", technologies: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend & Data", technologies: ["PostgreSQL", "Prisma", "Auth.js", "Stripe test mode"] },
      { label: "Validation & Testing", technologies: ["Vitest"] },
    ],
    featuredTechnologies: ["Next.js App Router", "TypeScript", "PostgreSQL", "Stripe test mode"],
    engineering: [
      { title: "Payment truth from signed webhooks", detail: "Raw-body signature verification and idempotent event handling prevent a browser return or repeated webhook from acting as payment proof twice." },
      { title: "Transactional inventory", detail: "Payment finalization, variant decrements, immutable movements, and order advancement are committed together; inventory conflicts leave a truthful review state." },
      { title: "Limited guest access", detail: "Order lookup requires a reference and matching checkout email, then creates a short-lived, one-order session with masked public details." },
    ],
    quality: "The source project documents unit and PostgreSQL integration coverage for authorization, inventory races, checkout totals, payment idempotency, rollback, guest-order isolation, and admin workflows. Its recorded verification includes lint, typecheck, migrations, tests, production build, image validation, whitespace checks, and a separate hosted QA record.",
    boundaries: ["Maison Vale is a fictional demonstration; no commercial, customer, revenue, or conversion outcomes are claimed.", "Stripe is in sandbox/test mode only; the storefront cannot accept real payments.", "The demo uses USD, U.S.-only checkout, and zero recorded tax; it does not provide live tax calculation, automated refunds, or carrier tracking."],
    repository: "https://github.com/simonjr07/maison-vale",
    documentation: [
      { title: "Architecture", url: "https://github.com/simonjr07/maison-vale/blob/main/docs/ARCHITECTURE.md", description: "Stripe webhook verification, idempotent order processing, and guest session security." },
      { title: "Database", url: "https://github.com/simonjr07/maison-vale/blob/main/docs/DATABASE.md", description: "Immutable inventory movements, order lifecycle schemas, and relational constraints." },
      { title: "Testing", url: "https://github.com/simonjr07/maison-vale/blob/main/docs/TESTING.md", description: "Integration test suites for checkout races, payment idempotency, and fulfillment." },
      { title: "Security", url: "https://github.com/simonjr07/maison-vale/blob/main/docs/SECURITY.md", description: "Security boundaries for checkout, guest access, administration, and deployment." },
    ],
    liveDemo: { url: "https://maison-vale-six.vercel.app", note: "Stripe sandbox only; not for real purchases or sensitive customer data." },
  },
] satisfies readonly PortfolioProject[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
