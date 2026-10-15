import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Surface card. Padding is intentionally NOT baked in: every caller
 * states its padding explicitly (p-5 / p-6 / p-6 sm:p-8 …). Baking a
 * default in previously meant a caller's padding class competed with
 * the default in the generated CSS instead of overriding it.
 */
export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-2xl border border-border bg-surface/80 ${className}`}>{children}</div>;
}
