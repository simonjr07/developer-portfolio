import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { ProfilePortraitPlaceholder } from "@/components/profile-portrait-placeholder";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { TechnologyBadge } from "@/components/technology-badge";
import { projects } from "@/data/projects";

const services = [
  { title: "Business websites", description: "Clear, considered websites that help a business explain what it does and make the next step easy." },
  { title: "Custom web applications", description: "Purpose-built application experiences for the workflows that off-the-shelf tools do not quite fit." },
  { title: "E-commerce & operations", description: "Thoughtful storefront and business-tool experiences designed around how people actually work." },
];

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"];

const process = [
  ["01", "Understand", "Align on the business, its people, and the problem worth solving."],
  ["02", "Shape", "Agree on the simplest useful scope, structure, and experience."],
  ["03", "Build", "Develop in clear steps, sharing progress and resolving details early."],
  ["04", "Refine", "Review the result together and prepare a considered handoff."],
];

export default function Home() {
  return (
    <SiteShell>
      <Container>
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
          <div>
            <Eyebrow>Full-Stack Web Developer</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">Building modern websites and applications for ambitious businesses.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">I design and build considered digital experiences that help businesses work better and move forward with confidence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projects">Explore my work</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Let&apos;s work together</ButtonLink>
            </div>
            <p className="mt-8 font-mono text-xs tracking-wide text-secondary">Thoughtful design. Useful technology. Built for real work.</p>
          </div>
          <ProfilePortraitPlaceholder />
        </section>

        <section id="selected-work" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="Selected work" title="Ideas shaped into useful digital experiences." description="A selection of portfolio demonstration projects exploring common business needs. These are demonstrations, not paid client commissions." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} headingLevel="h3" />
            ))}
          </div>
          <div className="mt-8"><ButtonLink href="/projects" variant="secondary">Explore all projects</ButtonLink></div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="What I do" title="Web experiences built around your business." description="From a first clear web presence to the custom tools behind the scenes, the focus stays on practical outcomes and a polished experience." />
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            {services.map((service, index) => <Card key={service.title} className="h-full p-6"><span className="font-mono text-xs font-medium text-accent">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold text-primary">{service.title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{service.description}</p></Card>)}
          </div>
          <div className="mt-8"><ButtonLink href="/services" variant="secondary">See services</ButtonLink></div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="Tools I work with" title="A focused modern web stack." description="The foundations used across this portfolio: a component-driven frontend with a typed, maintainable codebase." />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {stack.map((item) => <TechnologyBadge key={item}>{item}</TechnologyBadge>)}
          </ul>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="A clear process" title="Good work comes from good collaboration." description="A straightforward path from the first conversation to a considered result." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {process.map(([number, title, description]) => <li key={number}><Card className="h-full p-6"><span className="font-mono text-xs font-medium text-accent">{number}</span><h3 className="mt-5 text-lg font-semibold text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{description}</p></Card></li>)}
          </ol>
        </section>

        <section className="grid items-center gap-10 border-t border-border py-20 sm:py-28 md:grid-cols-[1fr_auto]">
          <div><SectionHeading eyebrow="A little about me" title="A practical partner for your next web project." description="I’m a full-stack web developer focused on modern business websites and applications. I care about clear communication, thoughtful details, and technology that serves a real purpose." /><div className="mt-7"><ButtonLink href="/about" variant="secondary">More about me</ButtonLink></div></div>
          <div className="hidden size-28 items-center justify-center rounded-full border border-accent/30 font-mono text-3xl text-accent md:flex" aria-hidden="true">&lt;/&gt;</div>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:mb-24 sm:px-12 sm:py-16">
          <Eyebrow>Have a project in mind?</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Let&apos;s make something useful for your business.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-secondary">Tell me what you’re working toward, and we can explore whether I’m the right partner to help.</p>
          <div className="mt-7"><ButtonLink href="/contact">Get in touch</ButtonLink></div>
        </section>
      </Container>
    </SiteShell>
  );
}
