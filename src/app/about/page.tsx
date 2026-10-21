import { createPageMetadata } from "@/lib/page-metadata";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata = createPageMetadata({
  title: "About",
  description: "A full-stack web developer focused on modern business websites, applications, and useful workflows.",
  path: "/about",
});

const approach = [
  {
    title: "Understandable foundations",
    description: "Typed application code, clear boundaries, and data models that reflect the work help keep a system easier to reason about and extend.",
  },
  {
    title: "Careful workflows",
    description: "Availability, pricing, stock, access, and status changes belong in the right parts of a system—not only in what a screen happens to display.",
  },
  {
    title: "Verification and maintainability",
    description: "Testing important rules, reviewing edge cases, and documenting boundaries make changes more deliberate and set honest expectations.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-label="About the developer" className="max-w-4xl">
          <div>
            <SectionHeading
              level="h1"
              eyebrow="About"
              title="I build modern web applications around useful business workflows."
              description="I’m a full-stack web developer focused on business websites and applications: the public experiences that explain a service, and the tools that help a team manage the work behind it."
            />
            <p className="mt-6 max-w-2xl text-base leading-8 text-secondary">I focus on turning a clear problem into a thoughtful, maintainable web product for small and medium-sized businesses, startups, founders, and teams. I’m interested in software that is practical to use and understandable to change—not complexity for its own sake.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">View my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Get in touch</ButtonLink>
            </div>
          </div>
        </section>

        <section aria-label="Engineering approach" className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
          <SectionHeading
            level="h2"
            eyebrow="How I approach the work"
            title="Thoughtful structure should support the real workflow."
            description="The demonstration projects give me a place to explore the trade-offs involved in building useful business software."
          />
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            {approach.map((item, index) => (
              <Card key={item.title} className="h-full p-6">
                <span className="font-mono text-xs font-medium text-accent">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-secondary">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-label="Portfolio overview" className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
          <SectionHeading
            level="h2"
            eyebrow="The portfolio"
            title="See how the work is put together."
            description="The Projects page collects independent demonstrations of business websites, dashboards, and workflow-focused applications. Each case study separates documented functionality from its fictional data and limitations."
          />
          <div className="mt-8"><ButtonLink href="/projects" variant="secondary">Explore all projects</ButtonLink></div>
        </section>

        <section className="mt-20 rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:mt-24 sm:px-12 sm:py-16">
          <Eyebrow>Let&apos;s build something useful</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Have a project you&apos;d like to move forward?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-secondary">Tell me about the problem you&apos;re solving, and we can explore whether I&apos;m the right partner to help.</p>
          <div className="mt-7"><ButtonLink href="/contact">Get in touch</ButtonLink></div>
        </section>
      </Container>
    </SiteShell>
  );
}
