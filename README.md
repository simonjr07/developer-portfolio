# Simon Chikaobi — Full-Stack Web Developer

Personal portfolio for Simon Chikaobi, a full-stack web developer specializing in modern business web applications.

## Stack

- Next.js App Router
- React and TypeScript with strict checking
- Tailwind CSS
- ESLint
- `src/` directory structure with `@/*` imports

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Projects

The `/projects` listing and `/projects/[slug]` case studies describe four portfolio demonstrations: NexaService, Copper Spoon, Aurelia Studio, and Maison Vale. Each project page distinguishes documented implementation from limitations and sandbox behavior. Source links and available live demonstrations are listed per project, with sandbox and fictional-data limitations clearly stated.

The `/services` and `/about` pages describe the work and current professional direction without implying paid client engagements. The `/contact` page provides the approved public work email, LinkedIn profile, and GitHub profile. `NEXT_PUBLIC_CONTACT_EMAIL` may be configured in the hosting build environment with the approved address; see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). No contact form or message-delivery service is configured.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
git diff --check
```

The product direction, architecture, design system, roadmap, testing, deployment, and decisions are documented in [`docs/`](docs/).

Portfolio entries are demonstrations, not paid client commissions. No testimonials, commercial results, or unverified capabilities are implied. Project repository and demo links are shown only when verified.
