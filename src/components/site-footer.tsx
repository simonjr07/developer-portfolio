import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-5 py-2 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-primary">Simon Chikaobi</p>
          <p className="mt-1 leading-6">Full-Stack Web Developer specializing in modern business web applications.</p>
        </div>
        <nav aria-label="Contact and social links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/contact" className="inline-flex min-h-11 items-center rounded-sm px-1 text-accent transition-colors hover:text-primary">Start a conversation</Link>
          <a href="https://www.linkedin.com/in/simon-chikaobi-286166373/" rel="me" className="inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-primary" aria-label="LinkedIn profile for Simon Chikaobi">LinkedIn</a>
          <a href="https://github.com/simonjr07" rel="me" className="inline-flex min-h-11 items-center rounded-sm px-1 transition-colors hover:text-primary" aria-label="GitHub profile for Simon Chikaobi">GitHub</a>
        </nav>
      </Container>
    </footer>
  );
}
