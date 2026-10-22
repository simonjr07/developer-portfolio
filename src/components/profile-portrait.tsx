import Image from "next/image";

const PORTRAIT_SRC = "/images/profile-portrait.webp";
const PORTRAIT_WIDTH = 1086;
const PORTRAIT_HEIGHT = 1448;
const PORTRAIT_ALT =
  "Portrait of Simon Chikaobi, full-stack web developer, in a workspace with a code editor in the background.";

type ProfilePortraitProps = {
  eager?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Owner-supplied portrait, rendered at its intrinsic 3:4 aspect ratio.
 * Width and height are always reserved, so there is no layout shift and
 * no crop or stretch at any viewport width.
 */
export function ProfilePortrait({
  eager = false,
  sizes = "(min-width: 1024px) 352px, 320px",
  className = "",
}: ProfilePortraitProps) {
  return (
    <figure className={`overflow-hidden rounded-3xl border border-border bg-surface ${className}`}>
      <Image
        src={PORTRAIT_SRC}
        alt={PORTRAIT_ALT}
        width={PORTRAIT_WIDTH}
        height={PORTRAIT_HEIGHT}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-auto w-full"
      />
    </figure>
  );
}
