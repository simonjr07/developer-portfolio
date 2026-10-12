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

Shared presentation primitives live under `src/components/` when a pattern repeats or needs isolated behavior. Project content should stay data-driven, with a typed portfolio model under `src/data/` or `src/lib/` beginning in TASK-004. The responsive shell is established in TASK-002; route placeholders are intentionally lightweight until their content tasks begin.

## Runtime boundaries

V1 is static and content-led. No database, authentication, server actions, API routes, or secrets are required for the current shell or planned content tasks. Interactive behavior should be introduced only where it improves navigation or accessibility.
