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

## Automated browser tests

The Playwright suite lives in `tests/e2e/` and uses Chromium.

### Route coverage

The suite requests `/`, `/services`, `/about`, `/contact`, `/projects`, and all four project case studies. Each route must return HTTP 200 and render exactly one visible page-level `h1` with the expected heading.

An unknown URL must return HTTP 404 and render the custom not-found page with working homepage and projects links.

### Responsive coverage

The homepage, projects listing, services, about, contact, and the NexaService case study are checked at 320px, 390px, 768px, 1024px, and 1440px.

At every viewport, the checks cover:

- No horizontal page overflow.
- A visible, unclipped `h1`.
- A visible primary action that stays inside the viewport.
- Visible main content and the appropriate desktop or mobile navigation.
- No visible interactive element within `main` (`main a`, `main button`) extending beyond the viewport. Header and footer interactive controls are not yet included in this containment assertion; page-level horizontal overflow is still checked. Expanding the assertion to header and footer controls is planned.

The mobile navigation is additionally opened at 320px, 390px, and 768px to verify that its links are visible and usable, that Escape closes it and restores focus to the menu button, and that following a link closes it.

### Contact, navigation, and focus

The contact checks verify the approved `mailto:` destination and subject, the LinkedIn profile URL, and the GitHub profile URL. They do not send email, submit customer data, or contact external services.

Navigation checks open each primary navigation destination and each project card's case study. Keyboard checks confirm visible focus on the skip link, brand link, mobile menu button, and desktop navigation.

## CI behavior

Pull requests targeting `main` (and the existing TASK-004 validation branch) run `.github/workflows/validate.yml` on Node.js 22:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `npx playwright install --with-deps chromium`
6. `npm run test:e2e`

The job has a 20-minute timeout. Tests start their own production server on port `3100`. The workflow does not deploy anything.

## Scope and limitations

These are browser smoke and responsive checks, not a full accessibility audit, cross-browser certification, visual-regression suite, or performance benchmark. Only Chromium is tested. The suite verifies rendered behavior and destinations; it does not execute external links or email actions.

Playwright's `test-results/` and `playwright-report/` output directories are ignored by Git.
