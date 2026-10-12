import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-2xl border border-border bg-surface/80 p-6 ${className}`}>{children}</div>;
}
