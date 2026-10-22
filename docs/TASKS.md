# Implementation Roadmap

## Completed: TASK-001 — Foundation

- Root Next.js application scaffold.
- Strict TypeScript, ESLint, Tailwind CSS, `src/`, and `@/*` alias.
- Dark Premium Tech tokens and Geist typography foundation.
- Product and engineering documentation.

## TASK-002 — Design System & Responsive Shell

- Establish central Dark Premium Tech tokens and responsive typography.
- Add reusable header, footer, layout, navigation, link, heading, and card foundations.
- Add accessible mobile navigation, route placeholders, and pull-request validation CI.

## Completed: TASK-003 — Homepage

- Build the responsive homepage with hero, demonstration-project previews, services, verified stack, process, about teaser, and contact CTA.
- Keep all positioning and experience claims factual; project visuals are explicitly concept previews, not application screenshots.
- The owner has not supplied an authentic portrait yet. The homepage uses an abstract placeholder; when supplied, add the portrait at `public/images/profile-portrait.webp` and replace the placeholder without generating or substituting a face.

## Completed: TASK-004 — Projects Listing & Verified Case Studies

- Add a central typed source for the four demonstration projects, used by the listing and dynamic case-study routes.
- Document verified project workflows, features, technical approaches, and quality evidence; unknown or unsupported claims are omitted.
- Use source repositories for all four projects and include the available hosted demos for NexaService, Copper Spoon, Aurelia Studio, and Maison Vale.
- Keep fictional-data, simulated-payment, and other project-specific limitations visible wherever relevant.
- Use genuine, privacy-reviewed project screenshots from each source repository; preserve original PNGs in `public/projects/`.
- Keep all projects clearly labeled as portfolio demonstrations; no commercial outcomes or paid client commissions are implied.

## Completed: TASK-005 — Services, About & Contact

- Add responsive service, about, and contact pages using the shared site shell and design primitives.
- Describe a proposed engagement process and link service areas to the relevant verified portfolio demonstrations.
- Reuse the abstract profile placeholder on the about page. The owner has not supplied an authentic portrait; retain the replacement path `public/images/profile-portrait.webp` for a future update.
- At the time TASK-005 was completed, the email action required a valid `NEXT_PUBLIC_CONTACT_EMAIL`; no form or message delivery was implied.
- Automated browser viewport inspection was unavailable; production route and fallback smoke checks were run locally.

## Completed: TASK-005.1 — Portfolio Identity & Contact Completion

- Applied the owner's confirmed name to the brand and root metadata, with concise inherited route titles.
- Published the approved work email (`simonchikaobi.work@gmail.com`) as a mailto action, using `NEXT_PUBLIC_CONTACT_EMAIL` when configured and falling back to the approved address locally.
- Added the exact confirmed LinkedIn and GitHub profile links to the contact page and footer; existing project repository links remain unchanged.
- Updated README, deployment instructions, and decisions. No environment files, Vercel settings, or deployment were changed.
- Verification: `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed. The contact page rendered in the local browser at a narrow mobile viewport; the generated email, LinkedIn, and GitHub destinations and accessible link names were inspected, and keyboard focus was visibly present. No dedicated automated test script is configured. Tablet/desktop viewport overrides were unavailable for this check.
- Before deploying, set `NEXT_PUBLIC_CONTACT_EMAIL=simonchikaobi.work@gmail.com` in the intended Vercel build environments and redeploy so the build-time public value is current. This manual configuration was not performed by this task.

## TASK-006 — SEO, Performance & Analytics

- [x] Add descriptive root metadata, conditional canonical URL, Open Graph/Twitter metadata, and large-image social sharing.
- [x] Add a generated 1200×630 Open Graph image plus generated site and Apple touch icons.
- [x] Add a sitemap for the known public routes and case studies; do not emit guessed origins.
- [x] Add robots rules and a custom root 404 page.
- [x] Document the production origin requirement in `docs/DEPLOYMENT.md`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the approved production origin and verify canonical metadata, `/sitemap.xml`, `/robots.txt`, and social previews after deployment.
- [ ] Review performance budgets and semantic/accessibility checks as part of the launch audit.
- [ ] Decide whether analytics are necessary; add only privacy-conscious, explicitly approved analytics configuration.

## Completed: TASK-006.5 — Portfolio UI/UX Refinement

- Standardised spacing and rhythm without a redesign or palette change: one card-grid gap scale, explicit card padding (no default padding baked into `Card`, so caller padding no longer competes with it), aligned subpage top padding, and a single heading scale per level via `SectionHeading` (page `h1`: `text-4xl → sm:text-5xl`; section `h2`: `text-3xl → sm:text-4xl`).
- Added shared `Eyebrow` and `TechnologyBadge` primitives so eyebrow labels and technology pills are identical everywhere (homepage, cards, case studies, services, contact, 404); case-study stack is now shown as badges, and the contact email action reuses the shared `buttonLinkClassName` helper instead of copied classes.
- Homepage selected-work now reuses the verified `src/data/projects.ts` source and the shared `ProjectCard` (as `h3` under the section heading) instead of a duplicated local list with non-interactive schematic previews.
- Project cards navigate as one clear whole-card target (stretched link on the title, single keyboard stop, visible card-level focus/hover states, restrained arrow motion that respects reduced-motion); the live-demo link remains a separate target above it.
- Project screenshots are rendered at their intrinsic aspect ratio (dimensions recorded in `src/data/projects.ts`) instead of a forced 16/9 `object-cover` frame that side-cropped three of the four captures; no screenshot content is cropped on cards or case studies.
- Case studies aligned: numbered section eyebrows `01–05` (scope/evidence is now `05`), consistent section padding, card padding, gaps, and shared secondary buttons for live-demo/repository links.
- Header is sticky with an active-page indication (`aria-current="page"` plus a visual marker, including section matching so case studies mark Projects active and the same indication in the mobile menu); the mobile menu closes on route change. Added a skip-to-content link, balanced heading wraps, and a footer built on the shared `Container` with full-height link targets.
- The portrait placeholder was intentionally left unchanged in this task (see the blocking TASK-008 launch-audit item below). No SEO metadata, robots, sitemap, canonical, analytics, tracking, or social-sharing work was done here; TASK-006 remains a separate task.
- Combined best-of follow-up: ported the earlier refinement's sticky case-study section headings (`CaseSection` rail, `md:sticky`), About calls to action (intro actions, data-driven approach/demonstration cards, closing CTA panel), and contact profile rows ("View profile →", full-width email action, "What to share / A few details help me reply well") onto the TASK-006.5 foundations above. The earlier version's whole-file reformatting and its "full-stack" → "fullstack" wording changes were deliberately not adopted, and no verified content, routes, or links changed.

## TASK-007 — Testing, CI/CD & Deployment

- [x] Add a Playwright browser suite for all public routes, project case studies, and the custom 404 response.
- [x] Add responsive checks at 320px, 390px, 768px, 1024px, and 1440px, including overflow, navigation, primary-action, mobile-menu, and keyboard-focus checks.
- [x] Verify the approved contact destinations and core navigation and project-card links without contacting external services.
- [x] Run the browser suite against a production build and extend the pull-request workflow with browser installation and test execution.
- [x] Document the local commands, coverage, CI behavior, and limitations in `docs/TESTING.md`.
- [ ] Deployment, hosting-provider setup, domain configuration, and production release remain pending explicit approval.

## TASK-008 — Final Launch Audit

- Review content accuracy, accessibility, responsive states, security boundaries, and release readiness.
- Confirm no secrets, fabricated claims, dead links, or unfinished functionality are presented as complete.

Launch-audit checklist:

- [x] **Resolve the portrait placeholder before launch.** Removed the placeholder from the homepage and About page and replaced the two-column portrait layout with a typography-led presentation. No photo was generated or substituted.
- [ ] Confirm the remaining TASK-006 launch items are complete, including the approved production origin and live SEO checks.
