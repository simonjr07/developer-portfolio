type TechnologyBadgeProps = {
  children: React.ReactNode;
};

/**
 * Shared technology badge. Rendered as an <li> so every technology
 * list (project cards, homepage stack, case studies) uses the same
 * pill geometry, type size, and colours inside a <ul>.
 */
export function TechnologyBadge({ children }: TechnologyBadgeProps) {
  return (
    <li className="rounded-full border border-border bg-surface px-3 py-1 text-xs leading-5 text-secondary">{children}</li>
  );
}
