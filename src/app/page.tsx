export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-between rounded-3xl border border-white/10 bg-surface p-8 shadow-2xl shadow-black/20 sm:p-12">
        <header className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
            Developer Portfolio
          </p>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-secondary">
            Foundation · Task 001
          </span>
        </header>

        <section className="max-w-3xl py-20">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
            Full-stack web developer
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
            Modern business applications, built with clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">
            The portfolio foundation is ready. Projects, services, about, and
            contact experiences will be added in the next implementation tasks.
          </p>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span>Dark Premium Tech direction</span>
          <span className="font-mono text-xs">/src/app · strict TypeScript</span>
        </footer>
      </div>
    </main>
  );
}
