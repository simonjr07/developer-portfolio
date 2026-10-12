import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-accent text-background hover:bg-[#9bc5ff]"
      : "border border-border bg-transparent text-primary hover:border-accent hover:text-accent";

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${variantClasses} ${className}`}
      {...props}
    />
  );
}
