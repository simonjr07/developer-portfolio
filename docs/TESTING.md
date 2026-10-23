# Testing and Verification

## Required checks

Run from the repository root:

```bash
npm ci
npx playwright install chromium
npm run lint
npm run typecheck
npm run build
npm run test:e2e
git diff --check
```

`npm run test:e2e` runs Playwright against the production build. The test configuration starts `next start` on port `3100`, so it does not reuse a development server and does not require an already-running server. A production build must exist before the command runs.

For the configured-origin SEO assertions, set `NEXT_PUBLIC_SITE_URL=https://portfolio.test` before `npm run build` and keep it set while running the tests. The suite only runs those assertions when the configured hostname ends in `.test`; this synthetic test origin is not a deployed or approved production domain. Without it, the configured-origin tests are skipped, while the title and description checks still run. The GitHub Actions validation job sets this value for both the build and test steps.

## Automated browser tests

The Playwright suite lives in `tests/e2e/` and uses Chromium.

### Route coverage

The suite requests `/`, `/services`, `/about`, `/contact`, `/projects`, and all four project case studies. Each route must return HTTP 200 and render exactly one visible page-level `h1` with the expected heading.

An unknown URL must return HTTP 404 and render the custom not-found page with working homepage and projects links. A nonexistent project URL must also return HTTP 404, render the project-specific not-found heading, avoid rendering a valid case study, and expose a browse-all-projects link to `/projects`.

### Case-study evidence

All four case studies are checked for an operational-interface screenshot, repository documentation links, and access to their verified source repository and hosted demonstration. The image must load from its verified local asset path, expose the documented alternative text, width, height, and caption, preserve its source aspect ratio, and remain within the viewport at 320px and 1440px. Documentation links must match the project repository, open in a new tab, and include their title, description, and source-file cue. Metadata checks also require each documentation URL to be unique and scoped to that project's `docs/` directory on the `main` branch. Repository and demo links must match the project data, open in a new tab, and retain their demonstration/limitation notes.

### Metadata, robots, and sitemap

The suite checks the homepage title and description and the case-study page title and description. It also checks that root and project 404 responses expose explicit not-found titles, descriptions, and social titles, omit canonical/Open Graph URLs, and include noindex/nofollow robots and Googlebot metadata. With a test-only origin configured, it additionally checks canonical URLs, Open Graph and Twitter metadata, the social-card URL, robots indexing rules and sitemap reference, and sitemap entries for the five public routes and four known case studies. These checks verify generated output for the synthetic test origin only; they do not verify a live domain, deployment, or production configuration.

### Site-origin policy

Playwright also runs Node-level checks for `getSiteUrl()` in `tests/e2e/site-url.spec.ts`. Missing, blank, malformed, non-HTTP, and plain-HTTP public origins must fail closed. HTTPS origins are normalized to their origin with any path removed, while HTTP remains available for `localhost`, `127.0.0.1`, and `[::1]` development hosts.

### Responsive coverage

The homepage, projects listing, services, about, contact, and the NexaService case study are checked at 320px, 390px, 768px, 1024px, and 1440px.

At every viewport, the checks cover:

- No horizontal page overflow.
- A visible, unclipped `h1`.
- A visible primary action that stays inside the viewport.
- Visible main content and the appropriate desktop or mobile navigation.
- No visible `header`, `main`, or `footer` link or button extending beyond the viewport. The assertion uses those three landmarks and the `a`/`button` selectors within them, ignoring hidden and zero-size elements. The page-level horizontal-overflow check remains separate.

The mobile navigation is additionally opened at 320px, 390px, and 768px to verify that its links are visible and usable, that Escape closes it and restores focus to the menu button, and that following a link closes it.

A dedicated portrait check verifies that the homepage hero and About page load `profile-portrait.webp`, expose the expected alternative text, reserve the loaded natural dimensions, preserve the source 3:4 aspect ratio, and remain within the viewport at 390px and 1440px.

### Contact, navigation, and focus

The contact checks verify the approved `mailto:` destination, subject, prefilled prompts, accessible name, direct-address presentation, Gmail compose URL and template, LinkedIn profile URL, GitHub profile URL, and the explicit Lagos/UTC+1 remote-working context on the homepage, About page, and Contact page. Copy-email tests stub `navigator.clipboard.writeText` to resolve and reject in isolated tests, then verify keyboard activation, the success announcement, or the manual-copy fallback. They do not use the real system clipboard or require browser permission. No test sends email, submits customer data, or contacts external services.

Navigation checks open each primary navigation destination and each project card's case study. Keyboard checks confirm visible focus on the skip link, brand link, mobile menu button, and desktop navigation.

## CI behavior

Pull requests targeting `main` (and the existing TASK-004 validation branch) run `.github/workflows/validate.yml` on Node.js 22:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `npx playwright install --with-deps chromium`
6. `npm run test:e2e`

The job sets `NEXT_PUBLIC_SITE_URL=https://portfolio.test` for the build and test steps. This is a synthetic test-only origin, not a deployed domain or approved production configuration. The job has a 20-minute timeout. Tests start their own production server on port `3100`. The workflow does not deploy anything.

## Scope and limitations

These are browser smoke, responsive, interaction, and generated-SEO checks, not a full accessibility audit, cross-browser certification, visual-regression suite, or performance benchmark. Only Chromium is tested. SEO assertions use a synthetic test origin, not a live domain. The suite verifies rendered behavior and destinations; it does not execute external links or email actions.

Playwright's `test-results/` and `playwright-report/` output directories are ignored by Git.
