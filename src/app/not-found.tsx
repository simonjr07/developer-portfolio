import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SiteShell } from "@/components/site-shell";
import { createNotFoundMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createNotFoundMetadata(
  "Page not found",
  "The requested page could not be found.",
);

export default function NotFound() {
  return (
    <SiteShell>
      <Container className="flex min-h-[60vh] items-center py-20 sm:py-28">
        <section aria-labelledby="not-found-title" className="max-w-2xl">
          <Eyebrow>404 · Page not found</Eyebrow>
          <h1
            id="not-found-title"
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl"
          >
            That page isn’t here.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg">
            The link may be outdated, or the page may have moved. You can return
            to the homepage or browse the portfolio projects instead.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Back to homepage</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Explore projects
            </ButtonLink>
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}
