# Deployment

Deployment is intentionally out of scope for TASK-002. No provider, domain, environment variable, or credential has been configured.

## Planned release path

1. Complete route and content implementation through TASK-006.
2. Complete the testing and CI/CD work in TASK-007.
3. Choose a Next.js-compatible hosting provider with explicit approval.
4. Configure only required public or server-side environment values; never commit secrets.
5. Run a production smoke test against the approved deployment.

The current app has no database, authentication, or runtime secrets, so V1 should remain deployable as a straightforward Next.js application.
