# Architecture

## Application

- Next.js 16 App Router with React Server Components by default.
- TypeScript strict mode for compile-time correctness.
- `src/` layout with `src/app` as the route and shared-style boundary.
- Tailwind CSS 4 through the PostCSS plugin; no UI component framework.
- `@/*` resolves to `src/*`.

## Planned route structure

```text
src/app/
├── layout.tsx
├── page.tsx
├── globals.css
├── projects/page.tsx
├── projects/[slug]/page.tsx
├── services/page.tsx
├── about/page.tsx
└── contact/page.tsx
```

Shared presentation primitives live under `src/components/` when a pattern repeats or needs isolated behavior. The project listing and `/projects/[slug]` case studies derive from the typed, static source at `src/data/projects.ts`; screenshots are stored locally under `public/projects/`. The services, about, and contact routes use the shared design primitives. The profile placeholder is shared between the homepage and about page; the future authentic image path is `public/images/profile-portrait.webp`.

## Runtime boundaries

V1 is static and content-led. No database, authentication, server actions, API routes, or secret values are required. Contact may optionally use the explicitly public `NEXT_PUBLIC_CONTACT_EMAIL` build-time value to render a `mailto:` link; without a valid value the page shows a non-actionable fallback. This public address must be intentionally supplied and is not a secret. Interactive behavior should be introduced only where it improves navigation or accessibility.
