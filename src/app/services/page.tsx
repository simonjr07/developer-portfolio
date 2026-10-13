import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Services | Developer Portfolio",
  description: "Business websites and custom web applications shaped around useful, maintainable business workflows.",
};

const services = [
  {
    number: "01",
    title: "Business websites and landing pages",
    problem: "Give people a clear understanding of what a business offers and a useful next step, without making them work to find it.",
    deliverables: ["Responsive service and company pages", "Clear content structure and calls to action", "Enquiry flows and content areas suited to the business"],
    examples: [{ name: "NexaService", href: "/projects/nexaservice" }],
  },
  {
    number: "02",
    title: "Custom web applications and dashboards",
    problem: "Bring a repeatable business process into one purpose-built interface when generic tools do not fit the workflow.",
    deliverables: ["Role-aware staff and admin experiences", "Searchable operational queues and status flows", "Carefully modeled records and useful summaries"],
    examples: [{ name: "NexaService", href: "/projects/nexaservice" }, { name: "Copper Spoon", href: "/projects/copper-spoon" }],
  },
  {
    number: "03",
    title: "Booking, ordering, and commerce workflows",
    problem: "Make multi-step customer journeys easier to complete while keeping availability, order details, pricing, and operational handoff coherent.",
    deliverables: ["Service discovery and appointment booking", "Menu, cart, and order-management flows", "Product catalogues and inventory-aware commerce"],
    examples: [
      { name: "Aurelia Studio", href: "/projects/aurelia-studio" },
      { name: "Copper Spoon", href: "/projects/copper-spoon" },
      { name: "Maison Vale", href: "/projects/maison-vale" },
    ],
  },
  {
    number: "04",
    title: "Improvements to existing applications",
    problem: "Make an existing product easier to use, extend a workflow, or improve the structure of a codebase without losing sight of the current system.",
    deliverables: ["Scoped interface or workflow improvements", "Integration and data-flow work agreed during discovery", "Testing, documentation, and a maintainable handover"],
    examples: [{ name: "See engineering decisions across the case studies", href: "/projects" }],
  },
];

const process = [
  { number: "01", title: "Discover", detail: "Understand the business context, users, current tools, and the problem that matters most." },
  { number: "02", title: "Define the scope", detail: "Agree on outcomes, priorities, constraints, assumptions, and a practical first release before implementation." },
  { number: "03", title: "Implement", detail: "Build in clear steps, keeping the interface and underlying workflow understandable as the work takes shape." },
  { number: "04", title: "Test and review", detail: "Check the agreed flows, review the result together, and resolve issues within the defined scope." },
  { number: "05", title: "Handover", detail: "Provide the agreed code, notes, and next-step guidance so the work can be operated and maintained." },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-label="Services introduction">
          <SectionHeading
            level="h1"
            eyebrow="Services"
            title="Practical web work, shaped around how your business operates."
            description="From a clear business website to the custom workflows behind it, I can help plan and build modern web experiences around a real need. The right scope starts with understanding the problem—not choosing a technology first."
          />
        </section>

        <section aria-label="Service options" className="mt-12 grid gap-4 lg:mt-16">
          {services.map((service) => (
            <Card key={service.number} className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-accent">{service.number} · SERVICE AREA</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">{service.problem}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-primary">Possible deliverables</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-secondary">
                    {service.deliverables.map((deliverable) => <li key={deliverable}>— {deliverable}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary">Related demonstrations</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6">
                    {service.examples.map((example) => (
                      <li key={example.href}>
                        <Link href={example.href} className="rounded-sm text-accent underline decoration-border underline-offset-4 hover:text-primary">{example.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section aria-label="Proposed working process" className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
          <SectionHeading
            level="h2"
            eyebrow="A proposed working process"
            title="Clear steps, from first conversation to handover."
            description="Every engagement is different. These are the steps I would use to make scope, progress, and review clear—not a claim about past client engagements."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step) => (
              <li key={step.number}>
                <Card className="h-full p-6">
                  <span className="font-mono text-xs text-accent">{step.number}</span>
                  <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary">{step.detail}</p>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-surface px-6 py-10 sm:mt-20 sm:px-10 sm:py-12">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">Not sure which service fits?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">Start with the business problem and what you would like to change. We can clarify the scope together before deciding whether a project is a good fit.</p>
          <div className="mt-6"><ButtonLink href="/contact">Share a project brief</ButtonLink></div>
        </section>
      </Container>
    </SiteShell>
  );
}
