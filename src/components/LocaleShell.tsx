"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { dirFor, localeFromPathname } from "@/lib/i18n";

/**
 * Wraps the chrome in the current locale's direction.
 *
 * `dir` and `lang` belong on <html>, but the root layout is shared by both
 * language trees and cannot see the route. Setting them on a wrapper around
 * everything gives the same result for logical properties, Tailwind's rtl:
 * variants and the :lang() font rules — the only thing left on <html> is the
 * scrollbar side, which is not worth a client-side flash to move.
 */
export default function LocaleShell({ children }: { children: React.ReactNode }) {
  const locale = localeFromPathname(usePathname());

  return (
    <div dir={dirFor(locale)} lang={locale}>
      <Navbar locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
