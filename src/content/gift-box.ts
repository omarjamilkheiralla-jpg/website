import type { Localised } from "@/lib/i18n";

/**
 * The gift box.
 *
 * ⚠ This file describes a gift box; it does not create one. The box has to
 * exist in Shopify as a real product, because the bag is a Shopify cart and a
 * Shopify cart holds variant ids and nothing else. There is no way to attach a
 * loose charge to a Shopify checkout from the storefront — if the box is to
 * appear on the invoice and in the total the customer is charged, Shopify has
 * to know it as a product.
 *
 * To switch it on:
 *
 *   Shopify admin → Products → Add product
 *   Title:     Gift Box            (whatever you like — the site shows the
 *                                   copy below, not the Shopify title)
 *   Handle:    gift-box            (must match GIFT_BOX_HANDLE)
 *   Price:     whatever it costs
 *   Inventory: uncheck "Track quantity", or it will sell out
 *   Shipping:  it ships inside the same parcel, so give it no weight
 *   Sales channels: tick the Headless channel, or the Storefront API cannot
 *                   see it and this stays invisible
 *
 * Until such a product exists the lookup returns null and the bag renders
 * exactly as it does today — no toggle, no empty space, no error.
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
export const GIFT_BOX_HANDLE = "gift-box";

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
