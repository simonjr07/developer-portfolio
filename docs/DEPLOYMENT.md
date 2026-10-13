# Deployment

Deployment is intentionally out of scope until explicitly approved. No provider or domain has been configured by this task.

## Public contact destination

The approved public work email is `simonchikaobi.work@gmail.com`. The contact page uses `NEXT_PUBLIC_CONTACT_EMAIL` when configured and otherwise falls back to this approved address. Before deployment, set `NEXT_PUBLIC_CONTACT_EMAIL=simonchikaobi.work@gmail.com` in the intended Vercel Preview and Production environments. This is public information, not a secret. Do not add or overwrite a local `.env` file for this task. Next.js inlines `NEXT_PUBLIC_` values at build time, so changing the Vercel value requires a new build and redeployment. Vercel was not configured or changed as part of TASK-005.1.

## Planned release path

1. Complete route and content implementation through TASK-006.
2. Complete the testing and CI/CD work in TASK-007.
3. Choose a Next.js-compatible hosting provider with explicit approval.
4. Configure only required environment values; intentionally supply the public contact address if approved, and never commit secrets.
5. Run a production smoke test against the approved deployment.

The current app has no database, authentication, email service, or runtime secrets, so V1 should remain deployable as a straightforward Next.js application.
