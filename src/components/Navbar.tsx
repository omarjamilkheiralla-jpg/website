"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import { primaryNav } from "@/lib/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.125rem] w-[1.125rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
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

  const navLinkClass = (active: boolean) =>
    `relative py-1 text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 hover:text-gold ${
      active ? "text-green" : "text-ink-muted"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out ${
        solid
          ? "bg-cream/95 shadow-[0_10px_30px_-24px_rgba(30,30,26,0.6)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-green focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <BrandMark size="sm" />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((link) => {
              const active = isActive(pathname, link.href);

              if (!link.children) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={navLinkClass(active)}
                    >
                      {link.label}
                      {/* Gold underline marks the current section. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-gold transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
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
                    className={`${navLinkClass(active)} flex items-center gap-1.5`}
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 12 8"
                      className={`h-2 w-2.5 transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M1 1.5 6 6.5l5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-1 h-px origin-left bg-gold transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>

                  <ul
                    id={`${menuId}-collections`}
                    className={`absolute left-1/2 top-full w-52 -translate-x-1/2 border border-gold/30 bg-cream py-2 shadow-[0_18px_40px_-28px_rgba(30,30,26,0.55)] ${
                      expanded ? "block" : "hidden"
                    }`}
                  >
                    <li>
                      <Link
                        href={link.href}
                        className="block px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:bg-linen hover:text-green"
                      >
                        All Collections
                      </Link>
                    </li>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:bg-linen hover:text-green"
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

        {/* Utilities: search, language toggle, Buy Now */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/search"
            aria-label="Search Rosica"
            className="hidden h-9 w-9 items-center justify-center text-green transition-colors duration-300 hover:text-gold sm:flex"
          >
            <SearchIcon />
          </Link>

          <span aria-hidden="true" className="hidden h-5 w-px bg-gold/40 sm:block" />

          {/* TODO: point at the Arabic locale once the RTL build is ready */}
          <Link
            href="/ar"
            lang="ar"
            dir="rtl"
            hrefLang="ar"
            className="hidden font-serif text-sm text-green transition-colors duration-300 hover:text-gold sm:block"
          >
            العربية
          </Link>

          <Link
            href="/where-to-buy"
            className="hidden rounded-sm bg-green px-5 py-2.5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-cream transition-[background-color,color,transform] duration-300 ease-out hover:scale-[1.03] hover:bg-gold hover:text-ink motion-reduce:hover:scale-100 sm:inline-block"
          >
            Buy Now
          </Link>

          {/* Mobile trigger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-green xl:hidden"
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
      </div>

      {/* Mobile navigation */}
      <nav
        id={`${menuId}-mobile`}
        aria-label="Primary mobile"
        hidden={!mobileOpen}
        className="border-t border-gold/25 bg-cream xl:hidden"
      >
        <ul className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-8">
          {primaryNav.map((link) => (
            <li key={link.href} className="border-b border-gold/15 last:border-b-0">
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="block py-3.5 text-[0.6875rem] uppercase tracking-[0.16em] text-green"
              >
                {link.label}
              </Link>
              {link.children ? (
                <ul className="pb-3 pl-4">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block py-2 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-gold"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li className="flex items-center gap-4 pt-5 pb-2">
            <Link
              href="/where-to-buy"
              className="flex-1 rounded-sm bg-green px-5 py-3 text-center text-[0.625rem] font-medium uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Buy Now
            </Link>
            <Link
              href="/ar"
              lang="ar"
              dir="rtl"
              hrefLang="ar"
              className="font-serif text-sm text-green"
            >
              العربية
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
