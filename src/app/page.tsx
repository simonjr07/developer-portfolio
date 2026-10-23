import { createPageMetadata } from "@/lib/page-metadata";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { SectionHeading } from "@/components/section-heading";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { TechnologyBadge } from "@/components/technology-badge";
import { projects } from "@/data/projects";

export const metadata = createPageMetadata({
  description: "Simon Chikaobi is a full-stack web developer specializing in modern business web applications, from customer-facing websites to booking, ordering, and internal tools.",
  path: "/",
});

const services = [
  { title: "Business websites", description: "Clear, considered websites that help a business explain what it does and make the next step easy." },
  { title: "Custom web applications", description: "Purpose-built application experiences for the workflows that off-the-shelf tools do not quite fit." },
  { title: "E-commerce & operations", description: "Thoughtful storefront and business-tool experiences designed around how people actually work." },
];

const stackGroups = [
  {
    label: "Frontend",
    technologies: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend & data",
    technologies: ["Node.js", "PostgreSQL", "Prisma", "Auth.js"],
  },
  {
    label: "Validation, testing, and delivery",
    technologies: ["Zod", "Vitest", "GitHub Actions"],
  },
];

const process = [
  ["01", "Understand", "Align on the business, its people, and the problem worth solving."],
  ["02", "Shape", "Agree on the simplest useful scope, structure, and experience."],
  ["03", "Build", "Develop in clear steps, sharing progress and resolving details early."],
  ["04", "Refine", "Review the result together and prepare a considered handoff."],
];

const projectTypes = ["Business websites", "Booking & ordering", "Custom business tools"];

const featuredProjectSlugs = ["nexaservice", "copper-spoon", "maison-vale"];
const featuredProjects = projects.filter((project) => featuredProjectSlugs.includes(project.slug));

export default function Home() {
  return (
    <SiteShell>
      <Container>
        <section className="grid items-center gap-10 py-16 sm:py-24 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 lg:py-20">
          <div className="max-w-4xl lg:col-start-1 lg:row-start-1">
            <Eyebrow>Full-Stack Web Developer</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
              I build business websites and the tools behind them.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-secondary sm:text-xl">
              I’m Simon, a full-stack web developer specializing in modern business web applications. I build customer-facing websites and the booking, ordering, and operational tools behind them for small and medium-sized businesses, startups, founders, and teams.
            </p>
          </div>
          <ProfilePortrait eager className="mx-auto w-full max-w-xs lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-center" />
          <div className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">Explore selected work</ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Types of projects">
              {projectTypes.map((item) => (
                <li key={item} className="rounded-full border border-border px-3 py-2 text-sm text-secondary">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-secondary">
              Based in Lagos, Nigeria (WAT, UTC+1) · Available for international remote collaboration.
            </p>
            <p className="mt-2 font-mono text-xs tracking-wide text-secondary">
              Clear scope. Thoughtful implementation. Practical handoff.
            </p>
          </div>
        </section>

        <section id="selected-work" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="Selected work" title="Ideas shaped into useful digital experiences." description="Three independent demonstrations of common business workflows. Each case study explains the scope and boundaries of the work." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
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
          <SectionHeading eyebrow="Tools I work with" title="A focused modern web stack." description="A representative view of the technologies used across the demonstrations, spanning the interface, server-side data, and verification. Each project uses the subset that fits its scope." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">{group.label}</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={group.label}>
                  {group.technologies.map((item) => <TechnologyBadge key={item}>{item}</TechnologyBadge>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-20 sm:py-28">
          <SectionHeading eyebrow="A clear process" title="Good work comes from good collaboration." description="A straightforward path from the first conversation to a considered result." />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {process.map(([number, title, description]) => <li key={number}><Card className="h-full p-6"><span className="font-mono text-xs font-medium text-accent">{number}</span><h3 className="mt-5 text-lg font-semibold text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{description}</p></Card></li>)}
          </ol>
        </section>

        <section className="grid items-center gap-10 border-t border-border py-20 sm:py-28 md:grid-cols-[1fr_auto]">
          <div><SectionHeading eyebrow="A little about me" title="A practical partner for your next web project." description="I approach each project as a practical collaboration: understand the business, shape a focused scope, and build web software the team can understand and maintain." /><div className="mt-7"><ButtonLink href="/about" variant="secondary">More about me</ButtonLink></div></div>
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
