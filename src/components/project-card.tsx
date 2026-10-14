import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Card } from "@/components/card";
import { ProjectScreenshot } from "@/components/project-screenshot";
import type { PortfolioProject } from "@/data/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Card className="flex flex-col overflow-hidden p-3 sm:p-4">
      <ProjectScreenshot {...project.screenshot} sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">
          {project.category}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-primary">
          <Link href={`/projects/${project.slug}`} className="rounded-sm transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-secondary">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology} className="tech-badge">
              {technology}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-1">
          <ButtonLink href={`/projects/${project.slug}`}>Read case study</ButtonLink>
          {project.liveDemo ? (
            <a
              className="rounded-sm px-2 py-2 text-sm font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              href={project.liveDemo.url}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
              <span className="sr-only">: {project.liveDemo.note}</span>
            </a>
          ) : (
            <span className="text-xs text-secondary">No hosted demo</span>
          )}
        </div>
      </div>
    </Card>
  );
}
