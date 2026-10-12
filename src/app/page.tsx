import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

const projects = [
  { name: "NexaService", type: "Business website · Admin dashboard", note: "A demonstration concept for a service business." },
  { name: "Copper Spoon", type: "Restaurant ordering", note: "A demonstration concept for a restaurant ordering experience." },
  { name: "Aurelia Studio", type: "Booking · Appointments", note: "A demonstration concept for appointment scheduling." },
  { name: "Maison Vale", type: "E-commerce · Inventory", note: "A demonstration concept for premium commerce and inventory." },
];

const services = [
  { title: "Business websites", description: "Clear, considered websites that help a business explain what it does and make the next step easy." },
  { title: "Custom web applications", description: "Purpose-built application experiences for the workflows that off-the-shelf tools do not quite fit." },
  { title: "E-commerce & operations", description: "Thoughtful storefront and business-tool experiences designed around how people actually work." },
];

const process = [
  ["01", "Understand", "Align on the business, its people, and the problem worth solving."],
  ["02", "Shape", "Agree on the simplest useful scope, structure, and experience."],
  ["03", "Build", "Develop in clear steps, sharing progress and resolving details early."],
  ["04", "Refine", "Review the result together and prepare a considered handoff."],
];

function PortraitPlaceholder() {
  return (
    <figure aria-label="Abstract profile artwork placeholder; authentic portrait to be supplied by the owner" className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-surface">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#25374c_0%,#141b24_55%,#10151c_100%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 sm:size-64" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 sm:size-48" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2rem] border border-accent/40 bg-accent/5 sm:size-28" />
      <div aria-hidden="true" className="absolute left-[28%] top-[28%] size-2 rounded-full bg-accent" />
      <div aria-hidden="true" className="absolute right-[25%] top-[56%] size-1.5 rounded-full bg-accent/70" />
      <figcaption className="absolute inset-x-5 bottom-5 rounded-xl border border-border/80 bg-background/80 p-4 backdrop-blur-sm">
        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">Profile image</span>
        <span className="mt-1 block text-sm text-secondary">Authentic portrait to be added when supplied</span>
      </figcaption>
    </figure>
  );
}

function ProjectPreview({ index }: { index: number }) {
  return (
    <div aria-hidden="true" className="relative aspect-[1.55/1] overflow-hidden rounded-xl border border-border bg-background p-4">
      <div className="flex items-center gap-1.5 border-b border-border pb-3">
        <span className="size-1.5 rounded-full bg-secondary/50" /><span className="size-1.5 rounded-full bg-secondary/30" /><span className="size-1.5 rounded-full bg-secondary/20" />
        <span className="ml-auto h-1.5 w-12 rounded-full bg-secondary/20" />
      </div>
      <div className="mt-4 grid h-[calc(100%-2.25rem)] grid-cols-[1fr_0.7fr] gap-3">
        <div className="flex flex-col justify-between">
          <div><div className="h-2 w-3/4 rounded bg-accent/50" /><div className="mt-2 h-1.5 w-full rounded bg-secondary/20" /><div className="mt-1.5 h-1.5 w-2/3 rounded bg-secondary/15" /></div>
          <div className="h-6 w-16 rounded-full bg-accent/15" />
        </div>
        <div className={`rounded-lg border border-border ${index % 2 ? "bg-accent/10" : "bg-surface"}`}><div className="m-3 h-1.5 w-1/2 rounded bg-secondary/25" /><div className="mx-3 mt-2 h-8 rounded bg-accent/10" /></div>
      </div>
      <span className="absolute bottom-2 right-3 font-mono text-[0.55rem] uppercase tracking-wider text-secondary">Concept preview</span>
    </div>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <Container>
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Full-Stack Web Developer</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">Building modern websites and applications for ambitious businesses.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">I design and build considered digital experiences that help businesses work better and move forward with confidence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects">Explore my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Let&apos;s work together</ButtonLink>
            </div>
            <p className="mt-8 font-mono text-xs tracking-wide text-secondary">Thoughtful design. Useful technology. Built for real work.</p>
          </div>
          <PortraitPlaceholder />
        </section>

        <section id="selected-work" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="Selected work" title="Ideas shaped into useful digital experiences." description="A selection of portfolio demonstration projects exploring common business needs. These are demonstrations, not paid client commissions." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Card key={project.name} className="p-4 sm:p-5">
                <ProjectPreview index={index} />
                <div className="px-1 pb-1 pt-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-accent">{project.type}</p>
                  <h3 className="mt-2 text-xl font-semibold text-primary">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{project.note}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8"><ButtonLink href="/projects" variant="secondary">Explore all projects</ButtonLink></div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="What I do" title="Web experiences built around your business." description="From a first clear web presence to the custom tools behind the scenes, the focus stays on practical outcomes and a polished experience." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service, index) => <Card key={service.title} className="p-6"><span className="font-mono text-xs text-accent">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold text-primary">{service.title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{service.description}</p></Card>)}
          </div>
          <div className="mt-8"><ButtonLink href="/services" variant="secondary">See services</ButtonLink></div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="Tools I work with" title="A focused modern web stack." description="The foundations used across this portfolio: a component-driven frontend with a typed, maintainable codebase." />
          <div className="mt-8 flex flex-wrap gap-3" aria-label="Technologies">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"].map((item) => <span key={item} className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-primary">{item}</span>)}
          </div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="A clear process" title="Good work comes from good collaboration." description="A straightforward path from the first conversation to a considered result." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, description]) => <li key={number}><Card className="h-full p-6"><span className="font-mono text-xs text-accent">{number}</span><h3 className="mt-5 text-lg font-semibold text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{description}</p></Card></li>)}
          </ol>
        </section>

        <section className="grid items-center gap-10 border-t border-border py-20 sm:py-28 md:grid-cols-[1fr_auto]">
          <div><SectionHeading eyebrow="A little about me" title="A practical partner for your next web project." description="I’m a full-stack web developer focused on modern business websites and applications. I care about clear communication, thoughtful details, and technology that serves a real purpose." /><div className="mt-7"><ButtonLink href="/about" variant="secondary">More about me</ButtonLink></div></div>
          <div className="hidden size-28 items-center justify-center rounded-full border border-accent/30 font-mono text-3xl text-accent md:flex" aria-hidden="true">&lt;/&gt;</div>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:mb-24 sm:px-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Have a project in mind?</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Let&apos;s make something useful for your business.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-secondary">Tell me what you’re working toward, and we can explore whether I’m the right partner to help.</p>
          <div className="mt-7"><ButtonLink href="/contact">Get in touch</ButtonLink></div>
        </section>
      </Container>
    </SiteShell>
  );
}
