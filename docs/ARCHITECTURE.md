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

Shared presentation primitives live under `src/components/` when a pattern repeats or needs isolated behavior. The project listing and `/projects/[slug]` case studies derive from the typed, static source at `src/data/projects.ts`; project screenshots are stored locally under `public/projects/`. Each case study can also present an optional, verified operations screenshot and optional links to repository documentation; the four demonstration projects currently provide both. The services, about, and contact routes use the shared design primitives. The homepage and About page combine typography-led copy with the owner-supplied portrait at `public/images/profile-portrait.webp`, rendered through the shared `ProfilePortrait` component at its intrinsic 3:4 aspect ratio.

## Runtime boundaries

V1 is static and content-led. No database, authentication, server actions, API routes, or secret values are required. The contact page uses the owner-approved public email as its fallback and honors a valid `NEXT_PUBLIC_CONTACT_EMAIL` build-time value when configured; the variable is public and is not a secret. The page also links to the owner's confirmed LinkedIn and GitHub profiles. Interactive behavior should be introduced only where it improves navigation or accessibility.
