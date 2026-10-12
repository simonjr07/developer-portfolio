import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function AboutPage() {
  return <SiteShell><Container className="py-16 sm:py-24"><SectionHeading level="h1" eyebrow="About" title="A factual owner profile will follow." description="The about experience, including the larger authentic owner portrait, is planned for TASK-005." /></Container></SiteShell>;
}
