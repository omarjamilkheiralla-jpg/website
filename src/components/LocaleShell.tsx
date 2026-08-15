"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import { CartProvider } from "./cart/CartProvider";
import CartDrawer from "./cart/CartDrawer";
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
export default function LocaleShell({
  children,
  /** Whether /api/chat has an API key. Decided on the server; see layout.tsx. */
  assistant,
  /** Whether the Shopify store is wired up. Also decided on the server. */
  shop,
}: {
  children: React.ReactNode;
  assistant: boolean;
  shop: boolean;
}) {
  const locale = localeFromPathname(usePathname());

  const chrome = (
    <div dir={dirFor(locale)} lang={locale}>
      <Navbar locale={locale} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      {/* Inside the dir wrapper so the panels pin to the correct side. */}
      <ChatWidget locale={locale} ai={assistant} />
      {shop ? <CartDrawer locale={locale} /> : null}
    </div>
  );

  /* No provider when there is no store: without it `useCart` returns null and
     every cart control removes itself, leaving the site as it was before. */
  return shop ? <CartProvider>{chrome}</CartProvider> : chrome;
}
