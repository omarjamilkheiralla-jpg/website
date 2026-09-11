import type { Localised } from "@/lib/i18n";

/**
 * The gift box.
 *
 * The box is a real Shopify product — "Rosica Gift Box", handle
 * `rosica-gift-box` — and it has to be, because the bag is a Shopify cart and
 * a Shopify cart holds variant ids and nothing else. There is no way to attach
 * a loose charge to a Shopify checkout from the storefront, so anything that
 * is to appear on the invoice and in the total the customer is charged has to
 * exist as a product first.
 *
 * The handle below is the whole connection between the two. Rename the product
 * in Shopify and nothing breaks; change its *handle* and the box silently
 * stops appearing, because the lookup then finds nothing.
 *
 * Two settings in the Shopify admin keep it working:
 *
 *   Sales channels  the Headless channel must be ticked. The Storefront API
 *                   only sees products published to it — the Online Store
 *                   channel that serves shop.rosica.ae is a different one, so
 *                   a box visible there can still be invisible here.
 *   Inventory       leave "Track quantity" unchecked, or the box sells out and
 *                   the toggle disappears without warning.
 *
 * Whenever the lookup comes back empty — unconfigured, unreachable, wrong
 * handle, out of stock, not on the Headless channel — the bag renders exactly
 * as it did before the box existed: no toggle, no empty space, no error.
 *
 * A note on the delivery offer: the site counts the whole bag towards the
 * three-product threshold, gift box included, because Shopify's automatic
 * discount counts total item quantity and cannot be told to ignore one
 * product. Both sides therefore agree, which is the thing that matters in
 * front of a customer. If you would rather the box did not count, scope the
 * discount in Shopify to a collection holding only the four bottles, and
 * exclude it from the count in CartDrawer in the same sitting.
 */

/** The product handle in Shopify. Change here and in the admin together. */
export const GIFT_BOX_HANDLE = "rosica-gift-box";

type GiftBoxCopy = {
  /** The offer, on the toggle. */
  label: string;
  /** One line under it, saying what it is. */
  note: string;
  /** Announced to a screen reader in place of the visual pairing. */
  a11y: string;
  /**
   * The last word before the bag hands over to Shopify's checkout.
   *
   * Shown once, and only when the box is not already in the bag. Shopify's
   * checkout page cannot be added to without Shopify Plus, so this is the
   * final place the offer can be made at all — which is the reason it exists,
   * and the reason it is allowed to be more than a tick box.
   */
  prompt: {
    eyebrow: string;
    title: string;
    body: string;
    /** Primary: takes the offer, then continues to checkout. */
    accept: string;
    /** Secondary: continues without it. Never a dead end. */
    decline: string;
    /** Names the dialog for assistive technology. */
    a11y: string;
  };
};

export const giftBoxCopy: Localised<GiftBoxCopy> = {
  en: {
    label: "Add a gift box",
    note: "Your order boxed and ribboned, ready to give.",
    a11y: "Add a gift box to this order",
    prompt: {
      eyebrow: "Special offer",
      title: "Make it a gift",
      body:
        "Your order arrives in our signature black box, lined with Rosica tissue and finished with a handwritten card, inside the gold-embossed carrying bag — so it is ready to give the moment it lands, with nothing left to wrap.",
      accept: "Add the gift box",
      decline: "Continue without",
      a11y: "Add a gift box before checkout",
    },
  },
  ar: {
    label: "أضيفي علبة هدية",
    note: "طلبك في علبة أنيقة مع شريطة، جاهز للإهداء.",
    a11y: "إضافة علبة هدية إلى هذا الطلب",
    prompt: {
      eyebrow: "عرض خاص",
      title: "اجعليها هدية",
      body:
        "يصل طلبك في علبة روزيكا السوداء المميّزة، مبطّنة بورق حريري وبطاقة شكر مكتوبة بخط اليد، داخل حقيبة بشعار ذهبي — جاهز للإهداء فور وصوله، دون حاجة إلى أي تغليف.",
      accept: "أضيفي علبة الهدية",
      decline: "المتابعة بدونها",
      a11y: "إضافة علبة هدية قبل إتمام الطلب",
    },
  },
};
