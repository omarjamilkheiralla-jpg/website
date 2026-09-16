"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "./CartProvider";
import { cartCopy } from "@/content/cart";
import type { Locale } from "@/lib/i18n";

/** How long the confirmation stays before it takes itself away. */
const DWELL_MS = 4500;

/**
 * "Added to your bag".
 *
 * Replaces throwing the drawer open on every add. It confirms and gets out of
 * the way, and carries a way into the bag for anyone who wants to go there now.
 *
 * Pinned to the inline end so it never lands on the chat launcher, which is
 * pinned to the inline start — bottom-right in English, bottom-left in Arabic,
 * and mirrored for each.
 *
 * The announcement is a `role="status"` region that is always mounted, rather
 * than one that appears with the toast: a live region inserted at the same
 * moment as its text is not reliably read, and the whole point of it is the
 * person who cannot see the toast arrive.
 */
export default function CartToast({ locale }: { locale: Locale }) {
  const cart = useCart();
  const copy = cartCopy[locale];
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(false);

  const added = cart?.added ?? null;
  const seq = added?.seq ?? 0;
  const message = added
    ? added.title
      ? copy.added(added.title)
      : copy.addedFallback
    : "";

  /*
    Whether the bag was already open when the add landed, held in a ref so the
    check below reads the value at that moment without making it a dependency
    and restarting the timer every time the drawer opens or closes.
  */
  const bagOpen = useRef(false);
  useEffect(() => {
    bagOpen.current = Boolean(cart?.open);
  }, [cart?.open]);

  /*
    Keyed on `seq`, not on the object: adding the same bottle twice has to
    restart the timer, and two identical adds are indistinguishable otherwise.

    Nothing is shown when the add came from inside the open bag — which is how
    the gift box is added, both from its toggle and from the offer before
    checkout. A toast confirming something you are already looking at is noise,
    and over the drawer it would be noise in the way.
  */
  useEffect(() => {
    if (!seq || bagOpen.current) return;
    setShown(true);
    const timer = window.setTimeout(() => setShown(false), DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [seq]);

  if (!cart) return null;

  /*
    Derived rather than another effect clearing `shown`: opening the bag makes
    the confirmation redundant — the bag says it better, and both sit at the
    same stacking level, so a toast left up would paint over the drawer.
    The timer keeps running underneath, which is what should happen; closing
    the bag part-way through does not resurrect a stale message, because by
    then `shown` has usually already lapsed.
  */
  const visible = shown && !cart.open;

  return (
    <>
      {/* Always mounted, so the text landing inside it is what changes. */}
      <p role="status" aria-live="polite" className="sr-only">
        {visible ? message : ""}
      </p>

      <div className="pointer-events-none fixed bottom-5 end-5 z-50 flex justify-end sm:bottom-7 sm:end-7">
        <AnimatePresence>
          {visible ? (
            <motion.div
              key={seq}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex max-w-[min(22rem,calc(100vw-2.5rem))] items-start gap-3.5 rounded-md border border-gold/30 bg-cream px-5 py-4 shadow-[0_12px_34px_-18px_rgba(30,30,26,0.5)]"
            >
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold">
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z" />
                  <path d="m6.4 10.2 2.5 2.5 4.7-5" />
                </svg>
              </span>

              <div className="min-w-0">
                {/* aria-hidden: the live region above already carries this. */}
                <p aria-hidden="true" className="text-sm leading-snug text-green">
                  {message}
                </p>
                <button
                  type="button"
                  onClick={() => cart.setOpen(true)}
                  className="link-underline mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-gold-deep transition-colors duration-300 hover:text-green"
                >
                  {copy.viewBag}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShown(false)}
                aria-label={copy.dismiss}
                className="-me-1.5 -mt-1.5 shrink-0 rounded-sm p-1.5 text-ink-muted/70 transition-colors duration-300 hover:text-green"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
