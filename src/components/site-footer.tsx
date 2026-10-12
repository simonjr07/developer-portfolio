import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Full-stack web developer specializing in modern business web applications.</p>
        <Link href="/contact" className="text-accent hover:text-primary">Start a conversation</Link>
      </div>
    </footer>
  );
}
