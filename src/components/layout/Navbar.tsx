"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const headerClassName = [
    "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300",
    isScrolled
      ? "border-line bg-background/70"
      : "border-transparent bg-background/40",
  ].join(" ");

  const mobilePanelClassName = [
    "overflow-hidden border-t bg-background/80 backdrop-blur-xl transition-[max-height,opacity,border-color] duration-300 ease-out md:hidden",
    isMenuOpen
      ? "max-h-96 border-line opacity-100"
      : "max-h-0 border-transparent opacity-0",
  ].join(" ");

  return (
    <header className={headerClassName}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 sm:px-8 md:h-[4.5rem]">
        <a
          href="#inicio"
          onClick={closeMenu}
          aria-label="Diego Morga, ir al inicio"
          className="group inline-flex items-end gap-1.5 rounded-sm"
        >
          <span className="font-serif text-2xl leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
            Diego Morga
          </span>
          <span
            aria-hidden="true"
            className="mb-0.5 size-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-3.5 py-2 text-sm text-muted transition-colors duration-200 after:absolute after:inset-x-3.5 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent/70 after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 focus-visible:text-foreground focus-visible:after:scale-x-100 lg:px-4 lg:after:inset-x-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="group hidden items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-2 text-sm font-medium text-accent transition-colors duration-300 hover:border-accent/60 hover:bg-accent/20 hover:text-accent-strong md:inline-flex"
          >
            Hablemos
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMenuOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
            className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 text-foreground transition-colors duration-200 hover:border-line-strong hover:bg-surface-elevated/80 md:hidden"
          >
            <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        inert={!isMenuOpen}
        className={mobilePanelClassName}
      >
        <nav
          aria-label="Navegación móvil"
          className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4 sm:px-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-base text-muted transition-colors duration-200 hover:bg-surface/70 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-muted px-4 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/20 hover:text-accent-strong"
          >
            Hablemos
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="size-3.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
