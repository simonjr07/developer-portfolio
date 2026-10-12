# Architecture Decisions

## 2026-10-10 — Use Next.js App Router

The App Router is selected for the required Next.js architecture, server-component defaults, route colocation, and metadata support.

## 2026-10-10 — Use stable package versions

Next.js `16.4.0`, React `19.3.0`, Tailwind CSS `4.3.3`, TypeScript `5.9.3`, ESLint `9.39.5`, and the matching `eslint-config-next` are pinned or constrained to a stable, mutually compatible line. TypeScript stays on the 5.9 line because the current Next ESLint integration does not yet support the TypeScript 7.0 compiler API; ESLint stays on 9 because the current Next ESLint plugins declare peer support through 9. Prerelease packages are excluded.

## 2026-10-10 — Keep V1 content-led and dependency-light

No database, PostgreSQL, Prisma, Stripe, Auth.js, or general-purpose UI kit is introduced. The portfolio can establish credibility with authored content and local presentation primitives before adding infrastructure.

## 2026-10-10 — Preserve factual boundaries

The project list is treated as demonstration work. Unknown URLs, results, testimonials, client relationships, and capabilities will not be invented.

## 2026-10-10 — Establish the shell before content

The shared design system, responsive navigation, and route placeholders are implemented before the full homepage, portrait, case studies, or contact content. This keeps TASK-002 focused on reusable infrastructure and reserves authored claims for their planned tasks.

## 2026-10-10 — Preserve repository history

The existing `.git` directory and initial commit are retained. Feature branches and pull requests are used for implementation; deployment remains outside TASK-002.
