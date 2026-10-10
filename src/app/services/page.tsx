import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function ServicesPage() {
  return <SiteShell><Container className="py-16 sm:py-24"><SectionHeading level="h1" eyebrow="Services" title="Service positioning will follow." description="The services experience is planned for TASK-005. No unfinished service claims are presented here." /></Container></SiteShell>;
}
