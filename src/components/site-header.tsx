"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonLinkClassName } from "@/components/button-link";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  // Section match so a case study (/projects/nexaservice) still marks Projects active.
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // No route-change effect needed: mobile links close the menu on tap, and
  // SiteShell (with this header) remounts per page, resetting menu state.
  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    if (isMenuOpen) {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="inline-flex min-h-11 shrink-0 items-center rounded-sm font-mono text-xs uppercase tracking-[0.24em] text-accent"
        >
          Simon Chikaobi
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center px-1 text-sm transition-colors hover:text-primary ${
                  active ? "font-medium text-accent hover:text-accent" : "text-secondary"
                }`}
              >
                {item.label}
                {active ? <span aria-hidden="true" className="absolute inset-x-1 bottom-1.5 h-0.5 rounded-full bg-accent" /> : null}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className={buttonLinkClassName("primary", "max-lg:hidden")}>
          Start a project
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-primary transition-colors hover:border-accent hover:text-accent lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav ref={menuRef} id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full z-10 border-b border-border bg-surface px-5 py-4 shadow-2xl shadow-black/30 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-base transition-colors hover:bg-surface-raised hover:text-primary ${
                    active ? "bg-surface-raised font-medium text-accent hover:text-accent" : "text-secondary"
                  }`}
                >
                  {item.label}
                  {active ? <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" /> : null}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={buttonLinkClassName("primary", "mt-3 w-full")}
            >
              Start a project
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
