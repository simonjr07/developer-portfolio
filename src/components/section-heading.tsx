import { Eyebrow } from "@/components/eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
};

/**
 * Shared section heading. One type scale per level so every page reads
 * with the same hierarchy:
 * - h1 (page title):    text-4xl → sm:text-5xl
 * - h2 (section title): text-3xl → sm:text-4xl
 */
export function SectionHeading({ eyebrow, title, description, level = "h2" }: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        className={
          level === "h1"
            ? "mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-primary sm:text-5xl"
            : "mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-primary sm:text-4xl"
        }
      >
        {title}
      </Heading>
      {description ? <p className="mt-4 max-w-prose text-base leading-7 text-secondary">{description}</p> : null}
    </div>
  );
}
