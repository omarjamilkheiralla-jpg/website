"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "./CartProvider";
import { cartCopy } from "@/content/cart";
import { freeShippingNote } from "@/content/offer";
import { GIFT_BOX_HANDLE, giftBoxCopy } from "@/content/gift-box";
import { formatMoney } from "@/lib/shopify/client";
import { productPhoto } from "@/lib/product-media";
import { product, productAlt } from "@/lib/media";
import { PRODUCT_SLUGS, type ProductSlug } from "@/content/products";
import { localePath, type Locale } from "@/lib/i18n";
import type { GiftBox } from "@/lib/shopify/types";

/**
 * The bag.
 *
 * Slides in from the inline end — right in English, left in Arabic — so it
 * arrives from the side the reader's eye leaves from, like the rest of the
 * site's mirroring.
 *
 * Photography comes from the site's own catalogue rather than Shopify, keyed
 * by the product handle. The brand's shots are the approved ones, and it means
 * a line item renders instantly instead of waiting on a second image host.
 */

const photoFor = (handle: string) => {
  if ((PRODUCT_SLUGS as string[]).includes(handle)) return productPhoto[handle as ProductSlug];
  /* The gift box is not one of the four products, but it is the one other
     thing that can appear as a line — when it is all that is left in the bag —
     and a line item with an empty frame beside it reads as a broken image. */
  if (handle === GIFT_BOX_HANDLE) return { src: product.giftBox, alt: productAlt.giftBox };
  return null;
};

export default function CartDrawer({
  locale,
  giftBox,
}: {
  locale: Locale;
  giftBox: GiftBox | null;
}) {
  const cart = useCart();
  const copy = cartCopy[locale];
  const gift = giftBoxCopy[locale];
  const reduceMotion = useReducedMotion();
  const panel = useRef<HTMLDivElement | null>(null);
  const rtl = locale === "ar";

  /*
    What the customer just asked for, held only while Shopify is answering.

    The rest of the drawer deliberately shows nothing until the store confirms
    it, because everything else in here is money. A tick box is not money — it
    is the record of a decision already made — and leaving it to snap back to
    unticked for the length of a round trip reads as the click not registering,
    which invites a second one. Cleared as soon as the mutation settles, so the
    cart is still the thing that decides, including when it fails.
  */
  const [pendingGift, setPendingGift] = useState<boolean | null>(null);

  const open = cart?.open ?? false;
  const setOpen = cart?.setOpen;

  // Escape closes, and the page behind must not scroll while it is over it.
  useEffect(() => {
    if (!open || !setOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, setOpen]);

  // Move focus into the panel when it opens, so the keyboard follows the eye.
  useEffect(() => {
    if (open) panel.current?.focus();
  }, [open]);

  if (!cart) return null;

  const allLines = cart.cart?.lines ?? [];
  const empty = allLines.length === 0;

  /*
    The gift box is in the cart like anything else, but it is presented as a
    toggle in the footer rather than as a line with its own quantity stepper —
    "2 gift boxes" is not a thing anyone means to order.

    So it comes out of the list, and only while there is something to put in
    it. If the last bottle is removed and the box is somehow all that remains,
    it drops back into the list as an ordinary line so it can still be taken
    out. Silently removing it on the customer's behalf would be tidier and is
    exactly the kind of thing that makes a total change while nobody is
    looking.
  */
  const giftLine = giftBox
    ? allLines.find((line) => line.variantId === giftBox.variantId)
    : undefined;
  const productLines = allLines.filter((line) => line !== giftLine);
  const lines = productLines.length > 0 ? productLines : allLines;
  const showGiftToggle = Boolean(giftBox) && productLines.length > 0;
  const giftChecked = pendingGift ?? Boolean(giftLine);

  /* Counted against the whole bag, box included, because Shopify's automatic
     free-shipping discount counts total item quantity and cannot be told to
     skip one product. Agreeing with the checkout matters more here than the
     strict reading of "three products" — see content/gift-box.ts. */
  const shippingNote = freeShippingNote(locale, cart.cart?.totalQuantity ?? 0);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => cart.setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            tabIndex={-1}
            initial={{ x: reduceMotion ? 0 : rtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduceMotion ? 0 : rtl ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="absolute inset-y-0 flex w-full max-w-md flex-col bg-cream shadow-2xl outline-none ltr:right-0 rtl:left-0"
          >
            <header className="flex items-center justify-between border-b border-gold/25 px-6 py-5">
              <div>
                <h2 className="font-serif text-xl text-green">{copy.title}</h2>
                {cart.cart && cart.cart.totalQuantity > 0 ? (
                  <p className="mt-1 text-xs text-ink-muted">
                    {copy.itemCount(cart.cart.totalQuantity)}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => cart.setOpen(false)}
                aria-label={copy.close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-green transition-colors duration-300 hover:border-gold hover:text-gold-deep"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.error ? (
                <p role="alert" className="mb-5 rounded-md border border-gold/40 bg-linen px-4 py-3 text-sm text-ink-muted">
                  {copy.error}
                </p>
              ) : null}

              {empty ? (
                <div className="flex flex-col items-start gap-5 pt-6">
                  <p className="text-base text-ink-muted">{copy.empty}</p>
                  <Link
                    href={localePath(locale, "/collections")}
                    onClick={() => cart.setOpen(false)}
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-green underline decoration-gold/60 underline-offset-4 transition-colors duration-300 hover:text-gold-deep"
                  >
                    {copy.emptyCta}
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line) => {
                    const photo = photoFor(line.productHandle);
                    return (
                      <li key={line.id} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-gold/20 bg-linen">
                          {photo ? (
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="80px"
                              quality={80}
                              className="object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="font-serif text-[0.9375rem] leading-snug text-green">
                            {line.productTitle}
                          </p>
                          <p className="mt-1 text-xs text-ink-muted">
                            {formatMoney(line.unitPrice.amount, line.unitPrice.currencyCode, locale)}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                            <div className="flex items-center rounded-md border border-gold/40">
                              <button
                                type="button"
                                aria-label={copy.decrease}
                                disabled={cart.status === "busy"}
                                onClick={() => void cart.setQuantity(line.id, line.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center text-green transition-colors duration-200 hover:text-gold-deep disabled:opacity-40"
                              >
                                <svg viewBox="0 0 12 2" className="h-[1px] w-2.5" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M0 1h12" /></svg>
                              </button>
                              <span className="min-w-8 text-center text-sm tabular-nums text-ink">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={copy.increase}
                                disabled={cart.status === "busy"}
                                onClick={() => void cart.setQuantity(line.id, line.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center text-green transition-colors duration-200 hover:text-gold-deep disabled:opacity-40"
                              >
                                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 0v12M0 6h12" /></svg>
                              </button>
                            </div>

                            <span className="text-sm tabular-nums text-ink">
                              {formatMoney(line.total.amount, line.total.currencyCode, locale)}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={cart.status === "busy"}
                            onClick={() => void cart.remove(line.id)}
                            className="mt-2 self-start text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-green disabled:opacity-40"
                          >
                            {copy.removeLine}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {!empty && cart.cart ? (
              <footer className="border-t border-gold/25 px-6 py-6">
                {/* Counts down against the real bag, so the last product before
                    free delivery is the one being asked for by name. */}
                {shippingNote ? (
                  <p className="mb-5 rounded-md border border-gold/40 bg-linen px-4 py-2.5 text-center text-xs leading-relaxed text-gold-deep">
                    {shippingNote}
                  </p>
                ) : null}

                {/* The gift box. A label wrapping the checkbox, so the whole
                    row is the hit target — a 16px box is a poor one on a
                    phone. Checking it adds the Shopify variant to this same
                    cart, so it reaches the checkout, the invoice and the total
                    the way any other line does. */}
                {showGiftToggle && giftBox ? (
                  <label className="mb-5 flex cursor-pointer items-center gap-3.5 rounded-md border border-gold/40 bg-linen p-3 transition-colors duration-300 hover:border-gold has-[:disabled]:cursor-default has-[:disabled]:opacity-50">
                    <input
                      type="checkbox"
                      checked={giftChecked}
                      disabled={cart.status === "busy"}
                      aria-label={gift.a11y}
                      onChange={() => {
                        void (async () => {
                          setPendingGift(!giftChecked);
                          if (giftLine) await cart.remove(giftLine.id);
                          else await cart.add(giftBox.variantId, 1);
                          setPendingGift(null);
                        })();
                      }}
                      className="h-4 w-4 shrink-0 accent-green"
                    />

                    {/* The packaging, at the size the line items above use, so
                        the offer reads as a thing being bought rather than a
                        setting being changed. Decorative here: the label and
                        note beside it already say what it is, and a second
                        description would be read out twice. */}
                    {/* Square, because the photograph is square: a portrait
                        frame would crop the bag and the card out of it and
                        leave a dark panel that reads as nothing in particular. */}
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gold/20 bg-cream">
                      <Image
                        src={product.giftBox}
                        alt=""
                        fill
                        sizes="64px"
                        quality={80}
                        className="object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-green">
                        {gift.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                        {gift.note}
                      </span>
                    </span>
                    <span className="shrink-0 font-serif text-sm tabular-nums text-green">
                      {formatMoney(giftBox.price.amount, giftBox.price.currencyCode, locale)}
                    </span>
                  </label>
                ) : null}

                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-gold-deep">{copy.subtotal}</span>
                  <span className="font-serif text-xl tabular-nums text-green">
                    {formatMoney(cart.cart.subtotal.amount, cart.cart.subtotal.currencyCode, locale)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{copy.atCheckout}</p>

                {/* Checkout is Shopify's, and always will be — payments never
                    touch this site. A plain anchor, not next/link. */}
                <a
                  href={cart.cart.checkoutUrl}
                  className="mt-5 flex w-full items-center justify-center rounded-md bg-green px-7 py-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-green-deep"
                >
                  {copy.checkout}
                </a>
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
