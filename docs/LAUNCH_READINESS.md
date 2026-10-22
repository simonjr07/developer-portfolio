# Launch Readiness

Status: Preparation audit complete as of 2026-10-22. The site has not been deployed,
is not claimed to be production-ready, and has not been verified on a live domain.
TASK-010 remains approval-gated.

This document records the launch-readiness audit, the checks that were actually
performed, the decisions that remain open, and the handoff to TASK-010. It does not
replace `docs/DEPLOYMENT.md`, `docs/TESTING.md`, or `docs/TASKS.md`.

## Baseline

- Branch: `portfolio/task-009-launch-readiness`, based on `a27dc85` (the merge of TASK-008D PR #23).
- Application: Next.js 16.4.0 App Router, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3.
- Runtime shape: standard Next.js server using `next start`; not a static export.
- CI: `.github/workflows/validate.yml` runs on pull requests on Node.js 22 with the
  synthetic test origin `https://portfolio.test`.
- No hosting provider, domain, DNS record, production environment, or deployment has
  been selected or configured.

## A. Hosting, domain, and site origin

### Current behavior

`NEXT_PUBLIC_SITE_URL` is the only source of the canonical site origin. It is read at
build time by the root metadata, canonical/Open Graph helpers, `robots.txt`, and
`sitemap.xml`.

The current policy is:

- Missing, blank, malformed, or non-HTTP values fail closed.
- Public origins must use HTTPS.
- Plain HTTP is accepted only for `localhost`, `127.0.0.1`, and `[::1]` development hosts.
- Paths and trailing path segments are removed; the normalized origin is used.
- With no valid origin, canonical URLs and absolute social-image URLs are omitted,
  the sitemap is empty, and robots metadata/file prevent indexing.
- With a valid origin, canonical URLs, absolute social metadata, sitemap entries, and
  robots sitemap reference use that origin.

### Unresolved decisions

- Select a hosting provider.
- Approve the production domain and canonical origin.
- Confirm DNS ownership/access and the TLS/HTTPS approach.
- Confirm the host supports the required Next.js runtime, image optimization, and the
  statically generated `/social-card` route.

### Provider considerations

Vercel is the provider implied by the existing documentation and is the most direct
fit for Next.js 16 image optimization and runtime behavior. Other Next.js-compatible
Node hosts may work but must be evaluated for image optimization, build/runtime
support, custom domains, HTTPS, caching, and deployment rollback.

This audit does not select or approve a provider.

### Required inputs before configuration

- Approved provider and hosting plan.
- Approved domain and canonical HTTPS origin.
- DNS access and permission to change DNS records.
- Confirmation that the host uses Node.js 22 or a compatible supported runtime.
- Owner approval to configure production environment values and build the production
  deployment.

## B. Environment configuration and security

### Application variables

| Variable | Classification | Used by | Local | CI | Production | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public, build-time | Metadata, robots, sitemap | Optional; unset or loopback HTTP is allowed | Set to `https://portfolio.test` | Required for indexing and canonical SEO | Inlined into the build; rebuild after changing |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public, build-time | Contact page | Optional; falls back to the approved work email | Not required | Recommended: `simonchikaobi.work@gmail.com` | Validated at render time; invalid values fall back to no email action |

### Test-only variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `CI` | Local/CI tooling | Enables Playwright retries, worker limits, and `forbidOnly` |
| `PLAYWRIGHT_BASE_URL` | Local/CI tooling | Overrides the default `http://127.0.0.1:3100` test URL |

### Security findings

- No application secret is currently required.
- No tracked `.env` file or production credential was found. `.gitignore` excludes
  `.env` and `.env.*` while allowing `.env.example`.
- `NEXT_PUBLIC_` values are public and must never contain credentials or private data.
- The site has no authentication, database, payment processing, contact form, or
  server action. The `/social-card` route is a static Node-runtime route handler.
- Custom application security headers (for example CSP, Referrer-Policy, or
  X-Content-Type-Options) are not configured in `next.config.ts`; the host's defaults
  and TLS handling must be reviewed before launch.
- `npm audit --omit=dev` reports 0 production dependency vulnerabilities. `npm ci`
  reports five high-severity advisories in the development tooling graph
  (`eslint-config-next`/`fast-glob`/`micromatch`/`braces`); no safe in-line upgrade is
  currently offered without an incompatible change. This is not a production runtime
  vulnerability in the current dependency inventory, but it should be rechecked
  before TASK-010.

### Missing configuration

- Production `NEXT_PUBLIC_SITE_URL` is not set.
- Production `NEXT_PUBLIC_CONTACT_EMAIL` is not set in a hosting environment.
- No production environment or secret store exists yet.
- If analytics, error monitoring, or a form service is added later, the resulting
  credentials must be classified explicitly and stored outside source control.

## C. Analytics decision

No analytics provider, tracking script, cookie, or analytics dependency is present.

Decision needed:

- Whether the portfolio needs analytics at all.
- If yes, what to measure: page views, referrers, link clicks, case-study engagement,
  or contact/copy-email actions.
- Which privacy model applies: cookieless aggregate analytics versus cookie-based
  analytics, and whether consent is required in the relevant jurisdictions.

Recommendation: launch without analytics unless the owner needs traffic evidence. If
analytics is approved, prefer a privacy-conscious aggregate option that avoids
cross-site tracking and advertising profiles, document the provider and data
retention, and add it in a separate approved task. Do not add tracking code during
TASK-009.

Owner approval is required before any analytics implementation.

## D. Performance

### Checks performed

- Production build completed locally in an isolated worktree with
  `NEXT_PUBLIC_SITE_URL=https://portfolio.test`.
- Next.js generated 16 routes, including the homepage, public pages, four case
  studies, 404, robots, sitemap, icons, and social card.
- Client static chunks: 10 files, 645,681 bytes raw and approximately 199,585 bytes
  gzip on this machine.
- Font files: 141,020 bytes (two WOFF2 files).
- Total `.next/static` output: 787,124 bytes raw.
- Eight project images in `public/projects/`: 2,890,415 bytes raw. They are rendered
  through `next/image`, so production delivery depends on the host's image optimizer.
- `npm audit --omit=dev`: 0 production vulnerabilities.

These are local build-artifact measurements, not Lighthouse scores, field data, or
production transfer sizes. No production CDN, cache policy, compression behavior,
LCP, CLS, or INP measurement is available before deployment.

### Remaining work

- Run Lighthouse or an equivalent audit against the approved production URL in TASK-010.
- Measure mobile and desktop LCP, CLS, and INP with production caching and image
  optimization enabled.
- Confirm cache headers, compression, immutable asset caching, and image formats on
  the host.
- Establish a lightweight performance budget and record results after deployment.

## E. Accessibility

### Automated coverage present

- Playwright checks a single visible `h1` on each public route and case study.
- Skip link, brand link, mobile menu button, and desktop navigation focus visibility
  are checked.
- Mobile navigation open/close, Escape handling, focus restoration, and route-change
  closing are checked.
- Landmarks, labelled navigation regions, breadcrumb labelling, technology lists,
  image alternative text, live-region copy feedback, and button/link accessible names
  are present in the implementation and exercised in part by the browser suite.
- Reduced-motion CSS disables smooth scrolling and collapses transition/animation
  durations.

### Not performed

- No axe, pa11y, Lighthouse accessibility, or equivalent automated WCAG audit is
  installed or was run.
- No screen-reader session (NVDA, JAWS, VoiceOver, or TalkBack) was performed.
- No manual contrast, zoom/reflow, forced-colors, or full keyboard-only journey review
  was performed.
- Automated checks do not establish WCAG conformance.

### TASK-010 manual checks

- Complete a keyboard-only journey through navigation, project cards, case studies,
  contact actions, and the mobile menu.
- Verify focus order and visible focus at all breakpoints.
- Check color contrast for text, borders, focus indicators, and status/error states.
- Test 200% zoom and narrow reflow.
- Test with a screen reader at mobile and desktop widths.
- Verify reduced-motion behavior and any animation or status announcement.
- Record results separately from automated checks; do not claim full conformance from
  a local browser run.

## F. Browser and device verification

Completed automated coverage:

- Chromium via Playwright at 320px, 390px, 768px, 1024px, and 1440px.
- Public routes, four case studies, 404 routes, navigation, project cards, contact
  destinations, copy-email success/failure, responsive containment, and keyboard focus.

Not performed:

- Firefox, WebKit/Safari, Edge, and real iOS/Android device testing are not configured
  or installed.
- Visual regression, zoom/reflow, and touch-specific testing beyond Chromium's mobile
  viewport emulation are not covered.

Recommended launch matrix: current Chrome and Edge, current Firefox, current Safari on
macOS and iOS, plus a real small-screen Android device. Repeat the critical journey on
each: homepage, projects listing, one case study, services, about, contact, copy email,
mobile menu, and a 404.

## G. External links and public content

On 2026-10-22, 22 public HTTP destinations were checked with a redirect-following
request:

- GitHub profile, all four project repositories, and all twelve repository
  documentation links: HTTP 200.
- Four live project demonstrations: HTTP 200.
- LinkedIn profile: HTTP 999 from the automated client, consistent with bot
  protection. This is not evidence that the profile is unavailable; verify manually
  before launch.

The Gmail compose URL is generated at runtime from the approved recipient and message
template and was not fetched as a static link. The `mailto:` destination, subject, and
body are covered by the browser suite; no email was sent.

No placeholder, TODO, FIXME, lorem-ipsum, or example-domain content was found in the
public application source. The only `example.com` occurrence is documentation in a
source comment. Public project descriptions retain their existing demonstration and
limitation language; this audit did not rewrite positioning or claims.

Remaining checks:

- Manually confirm the LinkedIn profile opens in a normal authenticated browser.
- Recheck external destinations after launch and confirm the owner still wants each
  live demonstration and repository linked.
- Confirm the approved contact email remains current.
- Recheck that hosted demos still disclose fictional data, simulated payments, and
  other limitations.

## H. TASK-010 deployment and post-deployment checklist

### Before deployment

- [ ] Obtain explicit owner approval for the provider, domain, canonical origin, and
      production environment values.
- [ ] Decide whether analytics is needed; if approved, add it separately with privacy
      and consent requirements documented.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the approved HTTPS origin.
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` to the approved public address.
- [ ] Confirm Node.js 22 or a compatible runtime, image optimization, HTTPS, caching,
      and the `/social-card` route work on the selected host.
- [ ] Confirm no secrets are placed in `NEXT_PUBLIC_` variables or committed files.
- [ ] Review host security headers and TLS configuration.
- [ ] Prepare a rollback target and confirm access to the previous deployment.

### After deployment

- [ ] Confirm the production build and deployment completed from the intended commit.
- [ ] Verify the real HTTPS domain, redirects, and certificate.
- [ ] Verify canonical URLs, Open Graph/Twitter metadata, `/robots.txt`, and
      `/sitemap.xml` on the live origin.
- [ ] Verify the social card and icons load over HTTPS.
- [ ] Verify the contact email action, Gmail compose action, copy-email success/failure,
      LinkedIn, GitHub, project repositories, documentation links, and live demos.
- [ ] Run the public-route, 404, mobile-menu, and contact journeys against production.
- [ ] Run the TASK-010 performance and accessibility checks and record actual results.
- [ ] Check error monitoring, hosting logs, and rollback readiness.
- [ ] Record final owner sign-off.

No deployment, DNS change, domain purchase, production configuration change, or live
verification has been performed.

## Decision and approval register

| Item | Decision needed | Recommendation | Owner approval | Resolve in |
| --- | --- | --- | --- | --- |
| Hosting provider | Choose and approve a provider | Evaluate Vercel first for Next.js 16 fit; confirm alternatives if needed | Required | TASK-010 |
| Domain and canonical origin | Approve domain, DNS ownership, and HTTPS origin | Use one stable HTTPS origin; never use a preview URL as canonical | Required | TASK-010 |
| Analytics | Decide whether to measure traffic and how | Defer unless needed; if approved, use privacy-conscious aggregate analytics | Required | TASK-009 decision, implemented separately |
| Contact environment value | Approve and configure public email | Keep the approved work email current | Required | TASK-010 |
| Performance budget | Set acceptable launch measurements | Establish after production measurement; do not invent a score | Recommended | TASK-010 |
| Security headers / monitoring | Decide whether host defaults are sufficient | Review before launch; add only with a concrete need | Recommended | TASK-010 |

## Validation summary

Passed in an isolated worktree:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- Production build with `NEXT_PUBLIC_SITE_URL=https://portfolio.test`
- Full Playwright suite: 43 passed
- `npm audit --omit=dev`: 0 production vulnerabilities
- Missing-origin and invalid public-HTTP builds failed closed as documented

Not run or not available:

- Production deployment and live-domain checks
- Lighthouse or field performance measurements
- Automated WCAG engine and screen-reader review
- Firefox, WebKit, Edge, and real-device testing
- Manual LinkedIn confirmation in a normal browser

Checks requiring a deployed site:

- Live canonical/social/robots/sitemap verification
- Production cache, compression, image optimization, and Core Web Vitals
- Production error monitoring and rollback exercise
- Final external-link and contact journey verification on the real domain
