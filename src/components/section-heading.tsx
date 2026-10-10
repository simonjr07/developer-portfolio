type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, description, level = "h2" }: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      <Heading className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{title}</Heading>
      {description ? <p className="mt-4 text-base leading-7 text-secondary">{description}</p> : null}
    </div>
  );
}
