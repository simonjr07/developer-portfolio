import Link from "next/link";
import { Card } from "@/components/card";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { TechnologyBadge } from "@/components/technology-badge";
import type { PortfolioProject } from "@/data/projects";

type ProjectCardProps = {
  project: PortfolioProject;
  /** h2 on the projects listing (under the page h1), h3 on the homepage (under the section h2). */
  headingLevel?: "h2" | "h3";
};

/**
 * Whole-card navigation via the stretched-link pattern: the title link's
 * ::after covers the card, so the entire card is one clear target with a
 * single keyboard stop. The live-demo link stays above it (relative z-10)
 * as a separate, independent target.
 */
export function ProjectCard({ project, headingLevel = "h2" }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <Card className="group relative flex h-full flex-col p-3 transition-colors focus-within:border-accent/50 hover:border-accent/50 sm:p-4">
      <ProjectScreenshot {...project.screenshot} sizes="(min-width: 768px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <Eyebrow>{project.category}</Eyebrow>
        <Heading className="mt-2 text-2xl font-semibold tracking-tight text-primary">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-sm transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-accent"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="mt-3 text-sm leading-6 text-secondary">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.technologies.slice(0, 4).map((technology) => (
            <TechnologyBadge key={technology}>{technology}</TechnologyBadge>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-6">
          <span
            aria-hidden="true"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors group-hover:bg-[#9bc5ff]"
          >
            Read case study
            <span className="transition-transform motion-safe:group-hover:translate-x-0.5">→</span>
          </span>
          {project.liveDemo ? (
            <a
              className="relative z-10 inline-flex min-h-11 items-center rounded-sm px-2 text-sm font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              href={project.liveDemo.url}
              target="_blank"
              rel="noreferrer"
            >
              Live demo<span className="sr-only">: {project.liveDemo.note}</span>
            </a>
          ) : (
            <span className="text-xs text-secondary">No hosted demo</span>
          )}
        </div>
      </div>
    </Card>
  );
}
