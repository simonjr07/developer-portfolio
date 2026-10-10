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

Pull requests targeting `main` also run the same lint, TypeScript, and production-build checks in `.github/workflows/validate.yml` with Node.js 22.

## Local smoke test

Start the development server with `npm run dev`, open `http://localhost:3000`, and confirm the responsive shell renders without console or server errors. Check the menu and route placeholders at 320px, 390px, tablet, and desktop widths when browser tooling permits. Route-specific smoke tests will be added as routes are implemented.

## Quality expectations

- TypeScript remains strict and has no errors.
- ESLint passes without ignored errors.
- Production build completes.
- Responsive layouts are checked at mobile, tablet, and desktop widths.
- Keyboard focus, semantic landmarks, color contrast, and reduced-motion considerations are checked before release.
