export type Locale = "en" | "ar";

/** Copy that differs per locale, keyed by locale. */
export type Localised<T> = Record<Locale, T>;

export const dirFor = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/**
 * Arabic lives under /ar, so every in-page link has to be prefixed. Paths are
 * authored once in English and rewritten here rather than duplicated in the
 * Arabic content files, so the two locales can never drift out of sync.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (!path.startsWith("/")) return path;
  // Hash-only and external links pass through untouched.
  if (path.startsWith("//")) return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** True when the pathname belongs to the Arabic tree. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** The same route in the other language, for the navbar's language toggle. */
export function alternatePath(locale: Locale, pathname: string): string {
  if (locale === "ar") {
    const stripped = pathname.replace(/^\/ar/, "");
    return stripped === "" ? "/" : stripped;
  }
  return localePath("ar", pathname);
}
