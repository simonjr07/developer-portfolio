# Deployment

Deployment is intentionally out of scope until explicitly approved. No provider or domain has been configured. The contact destination is not set in this repository.

## Public contact destination

If email contact is desired at launch, intentionally configure `NEXT_PUBLIC_CONTACT_EMAIL` in the approved hosting provider's build environment. Use an address the owner has approved for public display. This variable is exposed to visitors and must not contain a secret or private address. When it is absent or invalid, `/contact` displays an honest fallback and no email action. Do not add a `.env` file or commit an address to the repository.

## Planned release path

1. Complete route and content implementation through TASK-006.
2. Complete the testing and CI/CD work in TASK-007.
3. Choose a Next.js-compatible hosting provider with explicit approval.
4. Configure only required environment values; intentionally supply the public contact address if approved, and never commit secrets.
5. Run a production smoke test against the approved deployment.

The current app has no database, authentication, email service, or runtime secrets, so V1 should remain deployable as a straightforward Next.js application.
