import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { SiteShell } from "@/components/site-shell";

export default function ProjectNotFound() {
  return (
    <SiteShell>
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">404 · Project not found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-primary">That case study isn&apos;t here.</h1>
        <p className="mt-4 max-w-xl leading-7 text-secondary">The project link may be outdated, or the slug may not match one of the published portfolio demonstrations.</p>
        <div className="mt-8"><ButtonLink href="/projects">Browse all projects</ButtonLink></div>
      </Container>
    </SiteShell>
  );
}
