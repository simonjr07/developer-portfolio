import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { ProfilePortraitPlaceholder } from "@/components/profile-portrait-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "About | Developer Portfolio",
  description: "A full-stack web developer focused on modern business websites, applications, and useful workflows.",
};

const demonstrations = [
  { name: "NexaService", href: "/projects/nexaservice", detail: "A public business website connected to a role-aware lead-management workspace." },
  { name: "Copper Spoon", href: "/projects/copper-spoon", detail: "A restaurant ordering flow with server-verified order details and staff operations." },
  { name: "Aurelia Studio", href: "/projects/aurelia-studio", detail: "An appointment-booking concept exploring availability, time zones, and scheduling constraints." },
  { name: "Maison Vale", href: "/projects/maison-vale", detail: "An e-commerce concept focused on test-mode checkout, payment state, and inventory consistency." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-label="About the developer" className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              level="h1"
              eyebrow="About"
              title="I build modern web applications around useful business workflows."
              description="I’m a full-stack web developer focused on business websites and applications: the public experiences that explain a service, and the tools that help a team manage the work behind it."
            />
            <p className="mt-6 max-w-2xl text-base leading-8 text-secondary">My current direction is to work with business owners, startups, and software teams to turn a clear problem into a thoughtful, maintainable web product. I’m interested in software that is practical to use and understandable to change—not complexity for its own sake.</p>
          </div>
          <ProfilePortraitPlaceholder className="lg:mt-2" />
        </section>

        <section aria-label="Engineering approach" className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
          <SectionHeading
            level="h2"
            eyebrow="How I approach the work"
            title="Thoughtful structure should support the real workflow."
            description="The demonstration projects give me a place to explore the trade-offs involved in building useful business software."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card className="h-full p-6">
              <h3 className="text-lg font-semibold text-primary">Understandable foundations</h3>
              <p className="mt-3 text-sm leading-7 text-secondary">Typed application code, clear boundaries, and data models that reflect the work help keep a system easier to reason about and extend.</p>
            </Card>
            <Card className="h-full p-6">
              <h3 className="text-lg font-semibold text-primary">Careful workflows</h3>
              <p className="mt-3 text-sm leading-7 text-secondary">Availability, pricing, stock, access, and status changes belong in the right parts of a system—not only in what a screen happens to display.</p>
            </Card>
            <Card className="h-full p-6">
              <h3 className="text-lg font-semibold text-primary">Verification and maintainability</h3>
              <p className="mt-3 text-sm leading-7 text-secondary">Testing important rules, reviewing edge cases, and documenting boundaries make changes more deliberate and set honest expectations.</p>
            </Card>
          </div>
        </section>

        <section aria-label="Portfolio demonstrations" className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
          <SectionHeading
            level="h2"
            eyebrow="The portfolio"
            title="Four demonstrations, four different problem spaces."
            description="These are portfolio demonstration projects, not paid client commissions or software presented as being used by real businesses. Each case study separates documented functionality from its fictional data and limitations."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {demonstrations.map((project) => (
              <li key={project.href}>
                <Card className="h-full p-6">
                  <h3 className="text-lg font-semibold">
                    <Link href={project.href} className="rounded-sm text-primary underline decoration-border underline-offset-4 hover:text-accent">{project.name}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-secondary">{project.detail}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </SiteShell>
  );
}
