import Image from "next/image";

type ProjectScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  aspect?: string;
};

export function ProjectScreenshot({
  src,
  alt,
  caption,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "2 / 1",
}: ProjectScreenshotProps) {
  return (
    <figure>
      <div
        className="relative aspect-[2/1] overflow-hidden rounded-xl border border-border bg-surface"
        style={{ aspectRatio: aspect }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-5 text-secondary">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
