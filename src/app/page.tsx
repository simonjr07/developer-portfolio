import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Full-stack web developer</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-primary sm:text-6xl">Modern business applications, built with clarity.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">A focused portfolio shell for thoughtful digital products. The complete homepage content and owner profile will be introduced in TASK-003.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects">Explore projects</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Discuss a project</ButtonLink>
            </div>
          </div>
          <Card className="lg:mb-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Design system preview</p>
            <p className="mt-4 text-xl font-medium text-primary">Premium, spacious, and quietly technical.</p>
            <p className="mt-3 text-sm leading-6 text-secondary">Shared spacing, type, color, focus, and navigation foundations are now in place.</p>
          </Card>
        </section>

        <section className="mt-24 border-t border-border pt-12">
          <SectionHeading eyebrow="Shell foundations" title="A clear starting point for the portfolio." description="Reusable layout primitives and route placeholders keep the next implementation tasks focused on content and verified project stories." />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Responsive navigation", "Accessible foundations", "Verified content ahead"].map((item) => (
              <Card key={item} className="p-5">
                <p className="text-sm font-medium text-primary">{item}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </SiteShell>
  );
}
