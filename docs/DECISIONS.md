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

## 2026-10-12 — Use honest visual placeholders until owner assets arrive (superseded)

The homepage uses abstract artwork explicitly labeled as a portrait placeholder and schematic project cards labeled as concept previews. No stock, generated, or unverified application imagery is presented as authentic. When supplied by the owner, the homepage portrait belongs at `public/images/profile-portrait.webp`; the placeholder remains until then.

**Superseded by TASK-004 and TASK-008:** the portfolio now uses actual project screenshots, and the portrait placeholder has been removed from the homepage and About page in favour of typography-led presentations. The earlier decision is retained here as historical context.

## 2026-10-12 — Source case studies from project repositories

The four portfolio entries use implementation details documented in the owner's public source repositories and their README/case-study/testing/screenshot records. Claims are limited to those records; source-reported test and hosted-QA results are identified as such. Repository links are included for all four projects. The Copper Spoon, Aurelia Studio, and Maison Vale demo URLs are recorded in their source repositories and returned HTTP 200 during prior verification. The owner supplied the NexaService hosted demo URL (`https://nexaservice-flax.vercel.app/`), which is now included in the portfolio; its fictional-data and enquiry-form limitations remain disclosed.

Authentic project screenshots are copied without recompression into `public/projects/` from the source repositories' curated screenshot sets: NexaService `docs/Images/homepage-why-nexaservice.png`, Copper Spoon `docs/screenshots/desktop-menu-hero.png`, Aurelia Studio `docs/screenshots/home-desktop.png`, and Maison Vale `docs/screenshots/01-homepage-desktop.png`. The captured UI is presented as project evidence, not as portfolio-site imagery; demos, fictional data, simulated payment, and known limitations remain clearly disclosed.

## 2026-10-12 — Keep V1 contact destination owner-configured

At the time of this decision, there was no approved public contact address or form backend. TASK-005.1 supersedes the address-availability portion after owner confirmation; the no-form/no-message-delivery boundary remains. Because `NEXT_PUBLIC_` values are public, they must only contain an address approved for display.

## 2026-10-13 — Use owner-confirmed identity and contact profiles

The owner confirmed Simon Chikaobi as the public portfolio identity, `simonchikaobi.work@gmail.com` as the public work email, LinkedIn at `https://www.linkedin.com/in/simon-chikaobi-286166373/`, and GitHub at `https://github.com/simonjr07`. The contact implementation keeps the existing `NEXT_PUBLIC_CONTACT_EMAIL` build-time configuration and uses the approved address as its fallback. Profiles are linked directly; no employment, qualification, client result, or testimonial claims are added. Deployment configuration remains a manual owner action and requires a new build/redeployment after any public build-time variable change.
