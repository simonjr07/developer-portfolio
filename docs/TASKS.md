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

> Historical note: the concept-preview and portrait-placeholder statements above describe TASK-003 at completion. They are superseded by TASK-004's verified project screenshots and TASK-008's portrait removal.

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

> Historical note: the abstract-placeholder requirement above was superseded by TASK-008, which removed the portrait treatment from the homepage and About page.

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

> Historical note: the placeholder status above was superseded by TASK-008, which removed the placeholder from the homepage and About page.

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

### TASK-008 audit follow-up register

The read-only TASK-008 audit is complete. Documentation items checked below were resolved by TASK-008A, testing items by TASK-008B, and the 404 metadata/site-origin policy review by TASK-008C; all unchecked items remain open. No production configuration, deployment, external-link verification, measured performance review, or accessibility/cross-browser certification has been performed.

#### Documentation and testing

- [x] Reconcile `docs/ARCHITECTURE.md` and `docs/DECISIONS.md` with the actual portrait-free presentation and real project screenshots.
- [x] Correct the responsive-test documentation so it accurately describes the selectors and elements actually tested.
- [x] Add the missing `npm run test:e2e` step to the README validation instructions or link to the complete testing instructions.
- [x] Add a test for invalid project slugs.
- [x] Add tests for copy-email success and failure behavior.
- [x] Add or extend metadata, robots, and sitemap tests.
- [x] Improve responsive assertions to cover header/footer interactive controls where appropriate.

#### Source-level review and verification

- [x] Review explicit metadata for the root and project-level 404 pages. Added explicit not-found titles, descriptions, social metadata, and noindex/nofollow robots rules without canonical URLs.
- [x] Decide whether the production site-origin helper should require HTTPS. Public origins now require HTTPS; plain HTTP is accepted only for loopback development hosts, and missing or invalid values fail closed.
- [ ] Perform a measured performance review when an appropriate environment is available.
- [ ] Plan a deeper accessibility review and cross-browser checks beyond the existing Chromium smoke suite.
- [ ] Verify external destinations when network checks are appropriate; distinguish source-level correctness from confirmed reachability.

#### Configuration and decisions

- [ ] Obtain approval for the production origin and hosting/domain choices.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the approved production origin in the intended production environment before the production build.
- [ ] Configure `NEXT_PUBLIC_CONTACT_EMAIL=simonchikaobi.work@gmail.com` in the intended Vercel Preview and Production environments before deployment.
- [ ] Verify canonical metadata, sitemap, robots, Open Graph/Twitter metadata, and social previews after deployment.
- [ ] Explicitly decide whether privacy-conscious analytics are needed. Do not install or configure analytics without approval.

## Completed: TASK-008D — Final Technical Verification

- [x] Confirmed the task branch is based on `b1e8f57`, the merge of TASK-008C PR #22.
- [x] Reviewed the public routes, project case studies, 404 behavior, metadata/canonical/robots policy, site-origin validation, sitemap, contact copy behavior, responsive coverage, and CI workflow.
- [x] Ran `npm ci`, `npm run lint`, `npm run typecheck`, and `git diff --check` in an isolated worktree.
- [x] Ran the production build and full Playwright suite in the isolated worktree with `NEXT_PUBLIC_SITE_URL=https://portfolio.test`; 43 tests passed.
- [x] Confirmed missing and invalid public HTTP origins fail closed: robots disallows crawling, the sitemap is empty, and canonical/site social-image metadata is omitted.
- [x] Confirmed the configured test origin is used consistently for canonical URLs, Open Graph/Twitter metadata, robots, and sitemap output.
- [x] Confirmed PR #22's `validate` check passed. The workflow is pull-request-only, so no check is attached to the `main` merge commit.
- Outcome: technical verification passed. No application or test defects were found, and no source/test changes were required. This task updates the roadmap only.
- Limitations: Production deployment, live-domain verification, production environment configuration, measured performance review, deeper accessibility/cross-browser review, external-link reachability, and the analytics decision remain open and were not performed here. TASK-009 and TASK-010 are not complete.

## TASK-009 — Launch Readiness (preparation audit complete; approvals pending)

Preparation, configuration planning, decisions, and release checklist only. This task
does not deploy the site or change hosting settings. The full audit, evidence, and
decision register are in [LAUNCH_READINESS.md](LAUNCH_READINESS.md).

- [x] Complete the TASK-008 documentation follow-ups, including testing/README accuracy, 404 metadata, and the HTTPS site-origin policy.
- [x] Audit hosting/origin, environment/security, analytics, performance, accessibility, browser/device, external-link, and content-readiness areas.
- [x] Verify the public external HTTP destinations that could be checked; record LinkedIn's bot-blocked response and the runtime Gmail action separately.
- [x] Record local build, bundle, image, dependency, and browser-suite measurements without presenting them as production measurements.
- [x] Prepare the post-deployment release checklist for SEO, external links, performance, accessibility, and cross-browser verification.
- [x] Confirm that documentation distinguishes verified source behavior from unverified production behavior.
- [ ] Confirm owner approval for the production origin, domain, and hosting provider.
- [ ] Record the approved production values and configuration plan for `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] Decide whether privacy-conscious analytics are needed; do not add them without explicit approval.

## TASK-010 — Production Deployment & Live Verification

Approval-gated. Do not deploy until the owner explicitly approves TASK-010. Follow the
handoff and post-deployment checklist in [LAUNCH_READINESS.md](LAUNCH_READINESS.md).

- [ ] Obtain explicit owner approval before deployment.
- [ ] Configure the approved production origin, host, domain, and environment values.
- [ ] Build and deploy only after approval and configuration are complete.
- [ ] Verify canonical metadata, `/sitemap.xml`, `/robots.txt`, Open Graph/Twitter metadata, and social previews on the live origin.
- [ ] Verify external destinations and production 404 behavior when live checks are appropriate.
- [ ] Run production smoke checks and record measured performance and accessibility/cross-browser results.
- [ ] Mark post-deployment checks complete only after they have been performed against the approved deployment.

## Completed: TASK-011 — Profile Portrait & Professional Representation

Pre-deployment content and presentation work. TASK-010 remains approval-gated.

- [x] Integrated the owner-supplied portrait at `public/images/profile-portrait.webp` (1086×1448, 89,802 bytes), converted without altering identity using the already-installed image tooling. No stock or generated face was substituted.
- [x] Added the shared `ProfilePortrait` component using Next.js Image, an intrinsic 3:4 ratio, reserved dimensions, responsive sizing, eager loading with high fetch priority only in the homepage hero, and descriptive alternative text.
- [x] Used the portrait in the homepage hero and the About-page introduction. The mobile homepage places it after the concise introduction and before the primary actions; the About layout stacks it after the intro copy on small screens.
- [x] Applied the agreed positioning, “Full-Stack Web Developer specializing in modern business web applications,” and clarified the business workflows the portfolio demonstrates without implying paid client work.
- [x] Kept the homepage introduction concise and expanded the About copy around customer-facing websites, booking, ordering, dashboards, internal operations, and remote international collaboration.
- [x] Updated the homepage and About metadata descriptions and standardized the footer positioning capitalization.
- [x] Added browser coverage for both portraits at 390px and 1440px, including the expected source, alternative text, loaded natural dimensions, and intrinsic aspect ratio without horizontal clipping.
- [x] Validation in an isolated worktree: `npm ci`, `npm run lint`, `npm run typecheck`, production build with `NEXT_PUBLIC_SITE_URL=https://portfolio.test`, and the full Playwright suite (47 passed).
- [x] Inspected the homepage and About page at 390px and 1440px; no horizontal overflow or portrait distortion, and no unrelated project imagery was changed.
- Remaining personal-representation information, not present in the repository or supplied task, was intentionally not invented: years of experience, employment history, education or certifications, client names or outcomes, testimonials, pricing, and measured business results. The owner must supply and verify any of these before they are added.
- No deployment, production environment changes, domain configuration, analytics, or unrelated redesign was performed.

## Completed: TASK-013 — Case Study Enhancements

Pre-deployment case-study evidence work. TASK-010 remains approval-gated.

- [x] Verified that the four operational screenshots already present on `main` are byte-for-byte identical to the reviewed source files: NexaService `docs/Images/dashboard-lead-summary.png`, Copper Spoon `docs/screenshots/desktop-admin-dashboard.png`, Aurelia Studio `docs/screenshots/admin-overview-desktop.png`, and Maison Vale `docs/screenshots/08-admin-dashboard.png`. They were retained unchanged rather than duplicated.
- [x] Retained the Architecture, Database, and Testing links for every project and added the remaining verified documentation links: NexaService `docs/API.md`, Copper Spoon `docs/DECISIONS.md`, and Maison Vale `docs/SECURITY.md`.
- [x] Kept `operationsScreenshot` and `documentation` optional, with the existing case-study conditionals leaving projects without either field unchanged.
- [x] Added browser coverage for all four case studies: loaded local screenshots, alternative text, reserved width and height, source aspect ratio, captions, repository-scoped documentation URLs, external-link behavior, and 320px/1440px overflow and viewport checks.
- [x] Validation in an isolated worktree: `npm ci`, `npm run lint`, `npm run typecheck`, production build with `NEXT_PUBLIC_SITE_URL=https://portfolio.test`, and the full Playwright suite (56 passed).
- [x] No database/schema changes, dependencies, navigation changes, redesign, deployment, production configuration, or unrelated content changes.
- TASK-010 remains approval-gated. Priority 3 contact-flow work and Priority 4 technical-proof gaps remained open at TASK-013 completion; TASK-014 closes the identified source-level gaps.

## Completed: TASK-014 — Contact Flow & Technical Proof Gap Closure

Pre-deployment gap closure. TASK-010 remains approval-gated.

### Priority 3 — contact flow

- [x] Retained the working direct email action, Gmail compose action, copy-email control, manual-copy fallback, LinkedIn and GitHub links, enquiry guidance, and collaboration steps. No form, backend, email-delivery service, CRM, or dependency was added.
- [x] Confirmed the email action uses the approved address, the `Web project enquiry` subject, and all prefilled prompts; confirmed the Gmail action opens a prefilled message with the same recipient, subject, and template. No email was sent.
- [x] Clarified on the Contact page that both email options open a prefilled enquiry, and made the working time zone explicit as `Lagos, Nigeria (WAT, UTC+1)` on the homepage, About page, and Contact page.
- [x] Added regression coverage for the direct-email and Gmail destinations, template fields, accessible names, profile links, remote-working context, keyboard copy activation, success announcement, and clipboard-failure fallback.

### Priority 4 — technical proof

- [x] No source-level gap required a change. The homepage categorizes the stack; every project exposes a verified source repository and hosted demonstration; each case study documents scope, implementation, testing/CI evidence, documentation, and limitations; and project cards and case-study labels distinguish portfolio demonstrations from paid client work.
- [x] Added regression coverage requiring all four case studies to expose their source repository, live demonstration, demonstration label, role/scope statement, and hosted-demo limitation note.
- [x] Rechecked the current public destinations: the GitHub profile, four repositories, four hosted demonstrations, and fifteen documentation links returned HTTP 200. LinkedIn returned its expected bot-protection response (999) and still requires manual confirmation in a normal browser.

### Validation and remaining work

- [x] Validation in the isolated TASK-014 worktree: `npm ci`, `npm run lint`, `npm run typecheck`, production build with `NEXT_PUBLIC_SITE_URL=https://portfolio.test`, the full Playwright suite (59 passed), and `git diff --check`.
- [x] Responsive coverage passed at 320px, 390px, 768px, 1024px, and 1440px.
- [x] Integrated the owner's local Contact-page wording edit (a comma instead of an em dash in the introductory sentence) without replacing the TASK-014 contact-flow implementation; both changes are preserved. Re-ran lint, typecheck, the production build, and the full Playwright suite (59 passed).
- [x] No deployment, production environment or provider change, domain configuration, analytics, backend service, or unrelated redesign was performed.
- Remaining launch work is outside these source-level priorities: live-domain and production contact verification, manual LinkedIn confirmation, measured production performance, deeper accessibility/screen-reader review, and cross-browser/device testing. These remain TASK-010 or post-deployment checks.
