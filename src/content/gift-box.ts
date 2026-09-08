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
};

export const giftBoxCopy: Localised<GiftBoxCopy> = {
  en: {
    label: "Add a gift box",
    note: "Your order boxed and ribboned, ready to give.",
    a11y: "Add a gift box to this order",
  },
  ar: {
    label: "أضيفي علبة هدية",
    note: "طلبك في علبة أنيقة مع شريطة، جاهز للإهداء.",
    a11y: "إضافة علبة هدية إلى هذا الطلب",
  },
};
