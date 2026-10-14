import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { SiteShell } from "@/components/site-shell";
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
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-secondary">
          <Link href="/projects" className="rounded-sm underline decoration-border underline-offset-4 hover:text-accent">Projects</Link>
          <span aria-hidden="true" className="px-2">/</span><span aria-current="page" className="text-primary">{project.name}</span>
        </nav>

        <header className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Portfolio demonstration · {project.category}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-6xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-secondary">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss a project</ButtonLink>
            {project.liveDemo ? <a className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-primary hover:border-accent hover:text-accent" href={project.liveDemo.url} target="_blank" rel="noreferrer">View live demonstration</a> : null}
            <a className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-primary hover:border-accent hover:text-accent" href={project.repository} target="_blank" rel="noreferrer">Source repository</a>
          </div>
          {project.liveDemo ? <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">{project.liveDemo.note}</p> : <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">The source project documents local development and CI; no hosted demonstration is available.</p>}
        </header>

        <div className="mt-10 sm:mt-14">
          <ProjectScreenshot {...project.screenshot} sizes="(min-width: 1024px) 1152px, 100vw" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:mt-20">
          <section aria-labelledby="scenario-heading" className="grid gap-6 border-t border-border pt-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">01 · Context</p><h2 id="scenario-heading" className="mt-3 text-2xl font-semibold text-primary">The scenario</h2></div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div><h3 className="text-sm font-semibold text-primary">Business problem explored</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.scenario}</p></div>
              <div><h3 className="text-sm font-semibold text-primary">Users and workflow</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.workflow}</p></div>
            </div>
          </section>

          <section aria-labelledby="features-heading" className="border-t border-border pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">02 · Product</p>
            <h2 id="features-heading" className="mt-3 text-2xl font-semibold text-primary">Documented functionality</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => <li key={feature}><Card className="h-full p-5"><p className="text-sm leading-6 text-secondary">{feature}</p></Card></li>)}
            </ul>
          </section>

          <section aria-labelledby="engineering-heading" className="border-t border-border pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">03 · Engineering</p>
            <h2 id="engineering-heading" className="mt-3 text-2xl font-semibold text-primary">Technical approach and decisions</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-secondary">The source project documents this stack: {project.technologies.join(", ")}.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.engineering.map((item) => <Card key={item.title} className="p-5"><h3 className="text-sm font-semibold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{item.detail}</p></Card>)}
            </div>
          </section>

          <section aria-labelledby="quality-heading" className="grid gap-6 border-t border-border pt-8 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">04 · Quality</p><h2 id="quality-heading" className="mt-3 text-2xl font-semibold text-primary">Testing and verification</h2></div>
            <p className="text-sm leading-7 text-secondary">{project.quality}</p>
          </section>

          <section aria-labelledby="boundaries-heading" className="border-t border-border pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Scope and evidence</p>
            <h2 id="boundaries-heading" className="mt-3 text-2xl font-semibold text-primary">What this demonstration does—and does not—claim</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{project.boundaries.map((item) => <li key={item} className="text-sm leading-6 text-secondary">{item}</li>)}</ul>
          </section>
        </div>

        <footer className="mt-16 flex flex-col gap-5 border-t border-border pt-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/projects" className="w-fit rounded-sm text-sm font-medium text-secondary underline decoration-border underline-offset-4 hover:text-accent">← Back to all projects</Link>
          <p className="text-sm text-secondary">Have a similar workflow to explore?</p>
          <ButtonLink href="/contact" variant="secondary">Let&apos;s talk</ButtonLink>
        </footer>
      </Container>
    </SiteShell>
  );
}
