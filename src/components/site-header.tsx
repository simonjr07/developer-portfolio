"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

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
    <header className="relative border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
          Simon Chikaobi
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-secondary transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-primary md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav ref={menuRef} id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full z-10 border-b border-border bg-surface px-5 py-4 shadow-2xl shadow-black/30 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu} className="rounded-xl px-4 py-3 text-base text-secondary hover:bg-surface-raised hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
