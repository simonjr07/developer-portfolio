# Testing and Verification

## Required checks

Run from the repository root:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
git diff --check
```

Pull requests targeting `main` or the TASK-004 feature branch also run the same lint, TypeScript, and production-build checks in `.github/workflows/validate.yml` with Node.js 22. The additional target supports validation of a stacked TASK-005 pull request while TASK-004 remains open.

## Local smoke test

Start the development server with `npm run dev`, open `http://localhost:3000`, and confirm the responsive shell renders without console or server errors. Check the menu and route placeholders at 320px, 390px, tablet, and desktop widths when browser tooling permits. Route-specific smoke tests will be added as routes are implemented.

For TASK-005, production smoke checks should request `/`, `/services`, `/about`, `/contact`, `/projects`, and representative project case studies. Confirm HTTP 200 responses, route-specific titles, one page-level heading, and the honest contact fallback when `NEXT_PUBLIC_CONTACT_EMAIL` is absent. The configured email action requires an owner-approved public address and should be checked only after that value is intentionally provided. Browser viewport inspection was unavailable during TASK-005; keyboard behavior remains the existing shared navigation behavior, and global CSS respects reduced-motion preferences.

## Quality expectations

- TypeScript remains strict and has no errors.
- ESLint passes without ignored errors.
- Production build completes.
- Responsive layouts are checked at mobile, tablet, and desktop widths.
- Keyboard focus, semantic landmarks, color contrast, and reduced-motion considerations are checked before release.
