import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default function ContactPage() {
  return <SiteShell><Container className="py-16 sm:py-24"><SectionHeading level="h1" eyebrow="Contact" title="A clear contact path will follow." description="The contact experience is planned for TASK-005 and will use only approved, available contact details." /></Container></SiteShell>;
}
