import { createPageMetadata } from "@/lib/page-metadata";
import { ButtonLink } from "@/components/button-link";
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
            description="Each entry is an independent portfolio demonstration. The case studies describe documented functionality and distinguish sandbox or fictional workflows from real-world business outcomes."
          />
        </section>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:mt-16">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>

        <section className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:mt-20 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-primary">Have a project in mind?</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-secondary">Tell me about the workflow or business problem you want to improve.</p>
          </div>
          <ButtonLink href="/contact">Get in touch</ButtonLink>
        </section>
      </Container>
    </SiteShell>
  );
}
