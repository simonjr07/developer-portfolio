import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

/**
 * Shared pill-button classes. Exported so plain anchors that cannot use
 * Next Link (e.g. the mailto action on the contact page) render exactly
 * the same button as ButtonLink instead of hand-copying the classes.
 */
export function buttonLinkClassName(variant: ButtonVariant = "primary", className = "") {
  const variantClasses =
    variant === "primary"
      ? "bg-accent text-background hover:bg-[#9bc5ff] active:bg-[#8ab8fb]"
      : "border border-border bg-transparent text-primary hover:border-accent hover:text-accent active:border-accent";

  return `inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${variantClasses} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={buttonLinkClassName(variant, className)} {...props} />;
}
