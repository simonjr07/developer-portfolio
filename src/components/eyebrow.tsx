type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared eyebrow (kicker) label. Single source for the mono uppercase
 * micro-label used above headings and card titles so size, tracking,
 * and colour stay identical in every section.
 */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.24em] text-accent ${className}`}>{children}</p>
  );
}
