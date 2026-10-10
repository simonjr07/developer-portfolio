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

Shared presentation primitives may be added under `src/components/` when repeated patterns appear. Project content should stay data-driven, with a typed portfolio model under `src/data/` or `src/lib/` once the case-study task begins.

## Runtime boundaries

V1 is static and content-led. No database, authentication, server actions, API routes, or secrets are required for TASK-001. Interactive behavior should be introduced only where it improves navigation or accessibility.
