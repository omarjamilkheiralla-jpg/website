"use client";

import { useCart } from "./CartProvider";
import { cartCopy } from "@/content/cart";
import type { Locale } from "@/lib/i18n";

/**
 * The bag button in the navbar.
 *
 * Renders nothing until there is something in the bag. An always-visible empty
 * bag icon is shop furniture; this site is a brand site that happens to sell,
 * and the Buy Now button is the primary route. The bag appears when it has a
 * reason to.
 */
export default function CartButton({ locale }: { locale: Locale }) {
  const cart = useCart();
  const copy = cartCopy[locale];

  const count = cart?.cart?.totalQuantity ?? 0;
  if (!cart || count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => cart.setOpen(true)}
      aria-label={`${copy.open} — ${copy.itemCount(count)}`}
      className="relative flex h-10 w-10 items-center justify-center text-green transition-colors duration-300 hover:text-gold-deep"
    >
      <svg
        viewBox="0 0 20 22"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 6h18l-1.4 15H2.4L1 6Z" />
        <path d="M6.5 6V4.5a3.5 3.5 0 0 1 7 0V6" />
      </svg>
      <span className="absolute -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green px-1 text-[0.5625rem] font-medium tabular-nums text-cream ltr:-right-0.5 rtl:-left-0.5">
        {count}
      </span>
    </button>
  );
}
