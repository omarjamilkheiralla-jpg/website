"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import { primaryNav } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownWrapper = useRef<HTMLLIElement | null>(null);
  const menuId = useId();

  // Close everything on navigation — adjusted during render rather than in an
  // effect, so the menus never flash open on the new route.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  // Transparent over the hero, solid Cream once scrolled past it.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen || Boolean(openDropdown);

  // Dismiss the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;

    function onPointerDown(event: MouseEvent) {
      if (!dropdownWrapper.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenDropdown(null);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out ${
        solid
          ? "border-gold/25 bg-cream/95 shadow-[0_10px_30px_-24px_rgba(30,30,26,0.6)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-green focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.16em] text-green uppercase transition-colors hover:text-gold"
        >
          Rosica
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((link) => {
              const active = isActive(pathname, link.href);

              if (!link.children) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`link-underline text-sm tracking-wide transition-colors hover:text-gold ${
                        active ? "text-green" : "text-ink-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              const expanded = openDropdown === link.label;

              return (
                <li
                  key={link.href}
                  ref={dropdownWrapper}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${menuId}-collections`}
                    onClick={() => setOpenDropdown(expanded ? null : link.label)}
                    className={`link-underline flex items-center gap-1.5 text-sm tracking-wide transition-colors hover:text-gold ${
                      active ? "text-green" : "text-ink-muted"
                    }`}
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 12 8"
                      className={`h-2 w-3 transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M1 1.5 6 6.5l5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <ul
                    id={`${menuId}-collections`}
                    className={`absolute left-1/2 top-full w-56 -translate-x-1/2 border border-gold/30 bg-cream py-2 shadow-[0_18px_40px_-28px_rgba(30,30,26,0.55)] ${
                      expanded ? "block" : "hidden"
                    }`}
                  >
                    <li>
                      <Link
                        href={link.href}
                        className="block px-5 py-2.5 text-sm text-ink-muted transition-colors hover:bg-linen hover:text-green"
                      >
                        All Collections
                      </Link>
                    </li>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-ink-muted transition-colors hover:bg-linen hover:text-green"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <CTAButton href="/collections" size="sm">
            Explore Collections
          </CTAButton>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-green lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={`${menuId}-mobile`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M5 5l14 14M19 5 5 19" />
            ) : (
              <>
                <path d="M3.5 7h17" />
                <path d="M3.5 12h17" />
                <path d="M3.5 17h17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile navigation */}
      <nav
        id={`${menuId}-mobile`}
        aria-label="Primary mobile"
        hidden={!mobileOpen}
        className="border-t border-gold/25 bg-cream lg:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-8">
          {primaryNav.map((link) => (
            <li key={link.href} className="border-b border-gold/15 last:border-b-0">
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="block py-3.5 text-sm tracking-wide text-green"
              >
                {link.label}
              </Link>
              {link.children ? (
                <ul className="pb-3 pl-4">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block py-2 text-sm text-ink-muted transition-colors hover:text-gold"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li className="pt-5 pb-2">
            <CTAButton href="/collections" size="sm" className="w-full">
              Explore Collections
            </CTAButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}
