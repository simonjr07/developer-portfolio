import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-2 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div>
          <p className="text-primary">Simon Chikaobi</p>
          <p className="mt-1">Full-stack web developer specializing in modern business web applications.</p>
        </div>
        <nav aria-label="Contact and social links" className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/contact" className="text-accent hover:text-primary">Start a conversation</Link>
          <a href="https://www.linkedin.com/in/simon-chikaobi-286166373/" rel="me" className="hover:text-primary" aria-label="LinkedIn profile for Simon Chikaobi">LinkedIn</a>
          <a href="https://github.com/simonjr07" rel="me" className="hover:text-primary" aria-label="GitHub profile for Simon Chikaobi">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
