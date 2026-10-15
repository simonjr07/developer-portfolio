import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
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

function CaseSection({
  id,
  label,
  title,
  className = "",
  children,
}: {
  id: string;
  label: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-t border-border pt-12 ${className}`}
    >
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow">{label}</p>
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
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-secondary">
          <Link href="/projects" className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-accent">
            Projects
          </Link>
          <span aria-hidden="true" className="px-2">/</span>
          <span aria-current="page" className="text-primary">{project.name}</span>
        </nav>

        <header className="max-w-4xl">
          <p className="eyebrow">Portfolio demonstration · {project.category}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary sm:text-6xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-secondary">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss a project</ButtonLink>
            {project.liveDemo ? (
              <ButtonLink href={project.liveDemo.url} variant="secondary" target="_blank" rel="noopener noreferrer">
                View live demonstration
              </ButtonLink>
            ) : null}
            <ButtonLink href={project.repository} variant="secondary" target="_blank" rel="noopener noreferrer">
              Source repository
            </ButtonLink>
          </div>
          {project.liveDemo ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">{project.liveDemo.note}</p>
          ) : (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary">
              The source project documents local development and CI; no hosted demonstration is available.
            </p>
          )}
        </header>

        <div className="mt-10 sm:mt-14">
          <ProjectScreenshot {...project.screenshot} sizes="(min-width: 1024px) 1152px, 100vw" />
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <CaseSection id="scenario-heading" label="01 · Context" title="The scenario">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-primary">Business problem explored</h3>
                <p className="mt-2 text-sm leading-7 text-secondary">{project.scenario}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">Users and workflow</h3>
                <p className="mt-2 text-sm leading-7 text-secondary">{project.workflow}</p>
              </div>
            </div>
          </CaseSection>

          <CaseSection id="features-heading" label="02 · Product" title="Documented functionality" className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Card className="h-full p-5">
                    <p className="text-sm leading-6 text-secondary">{feature}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="engineering-heading" label="03 · Engineering" title="Technical approach and decisions" className="mt-12">
            <p className="max-w-3xl text-sm leading-7 text-secondary">
              The source project documents this stack: {project.technologies.join(", ")}.
            </p>
            <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-3">
              {project.engineering.map((item) => (
                <Card key={item.title} className="h-full p-5">
                  <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary">{item.detail}</p>
                </Card>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="quality-heading" label="04 · Quality" title="Testing and verification" className="mt-12">
            <p className="text-sm leading-7 text-secondary">{project.quality}</p>
          </CaseSection>

          <CaseSection id="boundaries-heading" label="Scope and evidence" title="What this demonstration doesand does notclaim" className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.boundaries.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-secondary">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-accent"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseSection>
        </div>

        <footer className="mt-16 flex flex-col gap-6 border-t border-border pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/projects"
            className="w-fit rounded-sm text-sm font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
          >
            ← Back to all projects
          </Link>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-secondary">Have a similar workflow to explore?</p>
            <ButtonLink href="/contact" variant="secondary">Let&apos;s talk</ButtonLink>
          </div>
        </footer>
      </Container>
    </SiteShell>
  );
}
