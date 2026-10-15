import { createPageMetadata } from "@/lib/page-metadata";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { projects } from "@/data/projects";

export const metadata = createPageMetadata({
  title: "Projects",
  description: "Explore four full-stack portfolio demonstrations, their verified features, technical decisions, and case studies.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <SiteShell>
      <Container className="py-16 sm:py-24">
        <section aria-label="Projects introduction">
          <SectionHeading
            level="h1"
            eyebrow="Selected work"
            title="Projects built to explore real business workflows."
            description="Each entry is a portfolio demonstration, not a paid client commission. The case studies describe what the source projects document and distinguish sandbox or fictional workflows from real-world business outcomes."
          />
        </section>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:mt-16">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </SiteShell>
  );
}
