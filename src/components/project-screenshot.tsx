import Image from "next/image";

type ProjectScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel size of the source capture, from src/data/projects. */
  width: number;
  height: number;
  sizes?: string;
};

/**
 * Project screenshot rendered at its intrinsic aspect ratio.
 *
 * The source captures are ~2.17:1 (1920×1080 for Maison Vale) with
 * important content at the edges, so this deliberately does NOT use
 * `fill` + `object-cover` in a fixed 16/9 frame — that cropped the
 * sides of three of the four captures. The browser reserves the exact
 * space from width/height, so there is no layout shift and no crop
 * at any viewport width.
 */
export function ProjectScreenshot({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ProjectScreenshotProps) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full" />
      </div>
      {caption ? <figcaption className="mt-3 text-xs leading-5 text-secondary">{caption}</figcaption> : null}
    </figure>
  );
}
