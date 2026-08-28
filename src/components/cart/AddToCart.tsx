"use client";

import { useCart } from "./CartProvider";
import { cartCopy } from "@/content/cart";
import { catalogueId, trackAddToCart } from "@/lib/analytics/meta-pixel";
import type { Locale } from "@/lib/i18n";

/**
 * Add to Bag.
 *
 * Rendered only when Shopify gave us a variant to add — the caller decides
 * that, so a page with no live offer shows the plain store link instead and
 * nobody meets a button that cannot work.
 */
export default function AddToCart({
  locale,
  variantId,
  available,
  price,
  currency,
  className = "",
}: {
  locale: Locale;
  variantId: string;
  available: boolean;
  /** Unit price, for the Meta AddToCart value. Omitted, no event is sent. */
  price?: number;
  currency?: string;
  className?: string;
}) {
  const cart = useCart();
  const copy = cartCopy[locale];

  if (!cart) return null;

  const busy = cart.status === "busy";
  const label = !available ? copy.soldOut : busy ? copy.adding : copy.addToCart;

  return (
    <button
      type="button"
      disabled={!available || busy}
      /* Analytics fires only after Shopify has accepted the line. Tracking the
         click instead would count failed adds as conversions, and a sold-out
         or expired variant is exactly when that would happen. */
      onClick={() => {
        void cart.add(variantId).then((added) => {
          if (!added || price === undefined) return;
          trackAddToCart({
            contentIds: [catalogueId(variantId)],
            value: price,
            currency,
          });
        });
      }}
      /* aria-live so the change from "Add to Bag" to "Adding…" is announced,
         which is the only feedback a screen reader gets before the drawer. */
      aria-live="polite"
      className={`group/cta inline-flex items-center justify-center gap-2.5 rounded-md bg-green px-7 py-3.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-cream transition-[background-color,color,opacity] duration-300 ease-out hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {label}
      <span className="inline-flex shrink-0 rtl:-scale-x-100">
        <svg
          viewBox="0 0 24 12"
          className="h-2 w-5 transition-transform duration-300 ease-out group-hover/cta:translate-x-1 motion-reduce:group-hover/cta:translate-x-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M0 6h22M17 1l5 5-5 5" />
        </svg>
      </span>
    </button>
  );
}
