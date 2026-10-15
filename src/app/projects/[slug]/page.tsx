import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { SiteShell } from "@/components/site-shell";
import { TechnologyBadge } from "@/components/technology-badge";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      description: "This portfolio project could not be found.",
    };
  }

  return {
    title: `${project.name} Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center text-sm text-secondary sm:mb-10">
          <Link href="/projects" className="inline-flex min-h-11 items-center rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-accent">Projects</Link>
          <span aria-hidden="true" className="px-2">/</span><span aria-current="page" className="text-primary">{project.name}</span>
        </nav>

        <header className="max-w-4xl">
          <Eyebrow>Portfolio demonstration · {project.category}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-secondary">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss a project</ButtonLink>
            {project.liveDemo ? <ButtonLink href={project.liveDemo.url} variant="secondary" target="_blank" rel="noreferrer">View live demonstration</ButtonLink> : null}
            <ButtonLink href={project.repository} variant="secondary" target="_blank" rel="noreferrer">Source repository</ButtonLink>
          </div>
          {project.liveDemo ? <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">{project.liveDemo.note}</p> : <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">The source project documents local development and CI; no hosted demonstration is available.</p>}
        </header>

        <div className="mt-10 sm:mt-14">
          <ProjectScreenshot {...project.screenshot} sizes="(min-width: 1024px) 1152px, 100vw" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-14 sm:mt-20 sm:gap-16">
          <section aria-labelledby="scenario-heading" className="grid gap-6 border-t border-border pt-10 sm:pt-12 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <div><Eyebrow>01 · Context</Eyebrow><h2 id="scenario-heading" className="mt-3 text-2xl font-semibold tracking-tight text-primary">The scenario</h2></div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div><h3 className="text-sm font-semibold text-primary">Business problem explored</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.scenario}</p></div>
              <div><h3 className="text-sm font-semibold text-primary">Users and workflow</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.workflow}</p></div>
            </div>
          </section>

          <section aria-labelledby="features-heading" className="border-t border-border pt-10 sm:pt-12">
            <Eyebrow>02 · Product</Eyebrow>
            <h2 id="features-heading" className="mt-3 text-2xl font-semibold tracking-tight text-primary">Documented functionality</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {project.features.map((feature) => <li key={feature}><Card className="h-full p-6"><p className="text-sm leading-6 text-secondary">{feature}</p></Card></li>)}
            </ul>
          </section>

          <section aria-labelledby="engineering-heading" className="border-t border-border pt-10 sm:pt-12">
            <Eyebrow>03 · Engineering</Eyebrow>
            <h2 id="engineering-heading" className="mt-3 text-2xl font-semibold tracking-tight text-primary">Technical approach and decisions</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-secondary">The source project documents this stack:</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => <TechnologyBadge key={technology}>{technology}</TechnologyBadge>)}
            </ul>
            <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
              {project.engineering.map((item) => <Card key={item.title} className="h-full p-6"><h3 className="text-base font-semibold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{item.detail}</p></Card>)}
            </div>
          </section>

          <section aria-labelledby="quality-heading" className="grid gap-6 border-t border-border pt-10 sm:pt-12 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <div><Eyebrow>04 · Quality</Eyebrow><h2 id="quality-heading" className="mt-3 text-2xl font-semibold tracking-tight text-primary">Testing and verification</h2></div>
            <p className="text-sm leading-7 text-secondary">{project.quality}</p>
          </section>

          <section aria-labelledby="boundaries-heading" className="border-t border-border pt-10 sm:pt-12">
            <Eyebrow>05 · Scope and evidence</Eyebrow>
            <h2 id="boundaries-heading" className="mt-3 text-2xl font-semibold tracking-tight text-primary">What this demonstration does—and does not—claim</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">{project.boundaries.map((item) => <li key={item}><Card className="h-full p-6"><p className="text-sm leading-6 text-secondary">{item}</p></Card></li>)}</ul>
          </section>
        </div>

        <footer className="mt-16 flex flex-col gap-5 border-t border-border pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/projects" className="inline-flex min-h-11 w-fit items-center rounded-sm text-sm font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-accent">← Back to all projects</Link>
          <p className="text-sm text-secondary">Have a similar workflow to explore?</p>
          <ButtonLink href="/contact" variant="secondary">Let&apos;s talk</ButtonLink>
        </footer>
      </Container>
    </SiteShell>
  );
}
