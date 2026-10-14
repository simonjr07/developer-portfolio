import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SiteShell } from "@/components/site-shell";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore four full-stack portfolio demonstrations, their verified features, technical decisions, and case studies.",
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-labelledby="projects-heading">
          <p className="eyebrow">Selected work</p>
          <h1 id="projects-heading" className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">Projects built to explore real business workflows.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-secondary">Each entry is a portfolio demonstration, not a paid client commission. The case studies describe what the source projects document and distinguish sandbox or fictional workflows from real-world business outcomes.</p>
        </section>

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:mt-16">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </SiteShell>
  );
}
