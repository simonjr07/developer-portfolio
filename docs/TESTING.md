# Testing and Verification

## Required checks

Run from the repository root:

```bash
npm install
npm run lint
npm run typecheck
npm run build
git diff --check
```

## Local smoke test

Start the development server with `npm run dev`, open `http://localhost:3000`, and confirm the foundation screen renders without console or server errors. Route-specific smoke tests will be added as routes are implemented.

## Quality expectations

- TypeScript remains strict and has no errors.
- ESLint passes without ignored errors.
- Production build completes.
- Responsive layouts are checked at mobile, tablet, and desktop widths.
- Keyboard focus, semantic landmarks, color contrast, and reduced-motion considerations are checked before release.
