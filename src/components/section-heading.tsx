type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  className = "",
}: SectionHeadingProps) {
  const Heading = level;
  const titleSize = level === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";

  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading className={`mt-4 font-semibold tracking-tight text-primary ${titleSize}`}>{title}</Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
