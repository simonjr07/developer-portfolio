import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function ProjectsPage() {
  return <SiteShell><Container className="py-16 sm:py-24"><SectionHeading level="h1" eyebrow="Projects" title="Demonstration projects are coming next." description="Verified project stories for NexaService, Copper Spoon, Aurelia Studio, and Maison Vale will be added in TASK-004." /></Container></SiteShell>;
}
