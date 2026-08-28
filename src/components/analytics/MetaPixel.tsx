"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics/meta-pixel";

/**
 * PageView on client-side navigation.
 *
 * The pixel itself is bootstrapped by an inline script in the layout, which
 * fires the PageView for the document load. This handles every navigation
 * after that — App Router routing is client-side, so no document load happens
 * and the snippet never runs again. Without this, a shopper going
 * home -> shop -> product is one page view and a 100% bounce.
 *
 * It has to be a Client Component: the layout is a Server Component and never
 * runs in a browser.
 *
 * The `first` ref is what stops this and the snippet from both counting the
 * same arrival. `usePathname` alone, because `useSearchParams` would opt every
 * page out of static rendering and nothing here varies by query string.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false; // the inline snippet already sent this one
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}
