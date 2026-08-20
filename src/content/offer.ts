import type { Locale, Localised } from "@/lib/i18n";

/**
 * The free-delivery threshold.
 *
 * ⚠ This is a promise the SITE makes and SHOPIFY has to keep. Nothing here
 * makes delivery free — it only says so. The line is true for exactly as long
 * as a matching automatic discount exists in the store:
 *
 *   Shopify admin → Discounts → Create discount → Automatic discount
 *   Type:      Free shipping
 *   Minimum:   Minimum quantity of items = 3
 *
 * Note the shape of that: Shopify's shipping *rates* can only be conditioned on
 * order price or weight, never on how many items are in the bag, so an offer
 * counted in products has to be built as a discount rather than as a rate.
 *
 * Both sides count total quantity, so three of the same bottle qualifies just
 * as three different ones do. Keep them the same or the bag and the checkout
 * will disagree in front of a customer.
 *
 * Change the number and you are changing an advertised offer: update the
 * discount in Shopify in the same sitting.
 *
 * Deliberately not repeated in the Shipping Policy or the Terms. A promotion
 * can be withdrawn next month; a legal document should not have to be reissued
 * when it is. The policy says charges are calculated at checkout, which stays
 * true whether or not this offer is running.
 */
export const FREE_SHIPPING_MIN_ITEMS = 3;

type OfferCopy = {
  /** The standing line, shown before anyone has a bag. */
  headline: string;
  /** In the bag, once the threshold is met. */
  unlocked: string;
  /** In the bag, while it is not: "Add one more…". */
  remaining: (n: number) => string;
};

export const offerCopy: Localised<OfferCopy> = {
  en: {
    headline: "Complimentary delivery on any three products",
    unlocked: "Delivery is on us.",
    remaining: (n) =>
      n === 1
        ? "Add one more product and delivery is on us."
        : `Add ${n} more products and delivery is on us.`,
  },
  ar: {
    headline: "توصيل مجاني عند اختيار ثلاثة منتجات",
    unlocked: "التوصيل على حسابنا.",
    /* Arabic counts in three shapes, not two: one, a dual, then a plural. */
    remaining: (n) =>
      n === 1
        ? "أضف منتجًا واحدًا ليصبح التوصيل على حسابنا."
        : n === 2
          ? "أضف منتجين ليصبح التوصيل على حسابنا."
          : `أضف ${n} منتجات ليصبح التوصيل على حسابنا.`,
  },
};

/**
 * What the bag should say about delivery, or null when there is nothing useful
 * to say — an empty bag is not the moment to start selling a threshold.
 */
export function freeShippingNote(locale: Locale, quantity: number) {
  if (quantity <= 0) return null;
  const copy = offerCopy[locale];
  const short = FREE_SHIPPING_MIN_ITEMS - quantity;
  return short > 0 ? copy.remaining(short) : copy.unlocked;
}
