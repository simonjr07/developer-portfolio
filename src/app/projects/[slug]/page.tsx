import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SiteShell><Container className="py-16 sm:py-24"><SectionHeading level="h1" eyebrow="Project detail" title={`Case study: ${slug}`} description="This route is reserved for a verified case study and will be implemented in TASK-004." /></Container></SiteShell>;
}
