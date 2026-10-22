import type { Metadata } from "next";
import type { ReactNode } from "react";
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
import { createNotFoundMetadata, createPageMetadata } from "@/lib/page-metadata";

type ProjectRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createNotFoundMetadata(
      "Project not found",
      "This portfolio project could not be found.",
    );
  }

  return createPageMetadata({
    title: `${project.name} Case Study`,
    socialTitle: `${project.name} Case Study | Simon Chikaobi`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

/**
 * Case-study section with a sticky heading rail (ported from the earlier
 * refinement): on md+ screens the eyebrow/title stay pinned while the
 * section content scrolls, then release at the next section. On mobile
 * the heading simply stacks above the content.
 */
function CaseSection({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-10 sm:pt-12">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>{label}</Eyebrow>
          <h2 id={id} className="mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
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
          <p className="mt-4 max-w-3xl text-sm leading-6 text-secondary">
            <span className="font-medium text-primary">Role and scope:</span> {project.roleScope}
          </p>
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
          <CaseSection id="scenario-heading" label="01 · Context" title="The scenario">
            <div className="grid gap-6 sm:grid-cols-2">
              <div><h3 className="text-sm font-semibold text-primary">Business problem explored</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.scenario}</p></div>
              <div><h3 className="text-sm font-semibold text-primary">Users and workflow</h3><p className="mt-2 text-sm leading-7 text-secondary">{project.workflow}</p></div>
            </div>
          </CaseSection>

          <CaseSection id="features-heading" label="02 · Product" title="Documented functionality">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {project.features.map((feature) => <li key={feature}><Card className="h-full p-6"><p className="text-sm leading-6 text-secondary">{feature}</p></Card></li>)}
            </ul>
          </CaseSection>

          <CaseSection id="engineering-heading" label="03 · Engineering" title="Technical approach and decisions">
            <p className="max-w-3xl text-sm leading-7 text-secondary">The source project documents this stack:</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {project.technologyGroups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent">{group.label}</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.name} ${group.label} technologies`}>
                    {group.technologies.map((technology) => <TechnologyBadge key={technology}>{technology}</TechnologyBadge>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:gap-5">
              {project.engineering.map((item) => <Card key={item.title} className="h-full p-6"><h3 className="text-base font-semibold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-6 text-secondary">{item.detail}</p></Card>)}
            </div>

            {project.operationsScreenshot ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-primary">Operational interface</h3>
                <p className="mt-1 text-sm text-secondary">Verified internal workspace and administrative interface from the repository:</p>
                <div className="mt-4">
                  <ProjectScreenshot {...project.operationsScreenshot} sizes="(min-width: 1024px) 768px, 100vw" />
                </div>
              </div>
            ) : null}

            {project.documentation && project.documentation.length > 0 ? (
              <div className="mt-8 border-t border-border pt-8">
                <h3 className="text-sm font-semibold text-primary">Repository documentation</h3>
                <p className="mt-1 text-sm text-secondary">Direct links to verified technical specifications and verification suites in the repository:</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {project.documentation.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <div>
                        <div className="flex items-center justify-between text-sm font-medium text-primary group-hover:text-accent">
                          <span>{doc.title}.md</span>
                          <span aria-hidden="true" className="text-xs text-secondary transition-transform group-hover:translate-x-0.5">↗</span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-secondary">{doc.description}</p>
                      </div>
                      <span className="mt-3 text-[11px] font-medium text-accent">View source file</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </CaseSection>

          <CaseSection id="quality-heading" label="04 · Quality" title="Testing and verification">
            <p className="text-sm leading-7 text-secondary">{project.quality}</p>
          </CaseSection>

          <CaseSection id="boundaries-heading" label="05 · Scope and evidence" title="What this demonstration does—and does not—claim">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">{project.boundaries.map((item) => <li key={item}><Card className="h-full p-6"><p className="text-sm leading-6 text-secondary">{item}</p></Card></li>)}</ul>
          </CaseSection>
        </div>

        <footer className="mt-16 flex flex-col gap-5 border-t border-border pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/projects" className="inline-flex min-h-11 w-fit items-center rounded-sm text-sm font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-accent">← Back to all projects</Link>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-secondary">Have a similar workflow to explore?</p>
            <ButtonLink href="/contact" variant="secondary">Let&apos;s talk</ButtonLink>
          </div>
        </footer>
      </Container>
    </SiteShell>
  );
}
