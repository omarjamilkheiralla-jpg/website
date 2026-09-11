import { storefront } from "./client";
import { GIFT_BOX_QUERY, PRODUCTS_QUERY } from "./queries";
import type { GiftBox, Money, Offers } from "./types";
import { PRODUCT_SLUGS, type ProductSlug } from "@/content/products";
import { SALE_MARKUP } from "@/content/offer";
import { GIFT_BOX_HANDLE } from "@/content/gift-box";

type ProductsResponse = {
  products: {
    edges: {
      node: {
        handle: string;
        availableForSale: boolean;
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        variants: {
          edges: {
            node: {
              id: string;
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
              compareAtPrice: { amount: string; currencyCode: string } | null;
            };
          }[];
        };
      };
    }[];
  };
};

/** Only handles the site already knows about become offers. */
function matchSlug(handle: string): ProductSlug | null {
  return (PRODUCT_SLUGS as string[]).includes(handle) ? (handle as ProductSlug) : null;
}

/**
 * The struck-through "was" figure for a price, or undefined when there is none.
 *
 * In order of preference:
 *  1. A compare-at price set in Shopify, but only when it is genuinely above
 *     the selling price -- Shopify will store an equal or lower one, and
 *     striking through the same number reads as a bug.
 *  2. Otherwise the flat markup from content/offer.ts, if it is switched on.
 *
 * Real store data always wins, so setting a proper compare-at on a variant
 * silently takes that product off the formula. Shared by the range and the
 * gift box: a rule about how a former price is decided should be written once,
 * or the bag and the offer can end up quoting different numbers.
 */
function formerPrice(price: Money, compareAt: Money | null): Money | undefined {
  if (compareAt && Number(compareAt.amount) > Number(price.amount)) return compareAt;
  if (SALE_MARKUP <= 0) return undefined;
  return {
    amount: (Number(price.amount) + SALE_MARKUP).toFixed(2),
    currencyCode: price.currencyCode,
  };
}

/**
 * Live price and stock for the range, keyed by the site's product slug.
 *
 * Returns an empty object when Shopify is unconfigured or unreachable — every
 * caller treats a missing offer as "no price to show", so the pages degrade to
 * exactly what they were before the store existed.
 *
 * Cached for five minutes. Prices on a four-product brochure site do not move
 * often, and this sits on the render path of the busiest pages.
 */
export async function getOffers(): Promise<Offers> {
  const data = await storefront<ProductsResponse>(PRODUCTS_QUERY, {}, 300);
  if (!data) return {};

  const offers: Offers = {};
  for (const { node } of data.products.edges) {
    const slug = matchSlug(node.handle);
    if (!slug) continue;

    const variant = node.variants.edges[0]?.node;
    if (!variant) continue;

    const price = node.priceRange.minVariantPrice;
    const reduced = formerPrice(price, variant.compareAtPrice);

    offers[slug] = {
      variantId: variant.id,
      price,
      ...(reduced ? { compareAt: reduced } : {}),
      availableForSale: node.availableForSale && variant.availableForSale,
    };
  }
  return offers;
}

type GiftBoxResponse = {
  product: {
    availableForSale: boolean;
    variants: {
      edges: {
        node: {
          id: string;
          availableForSale: boolean;
          price: Money;
          compareAtPrice: Money | null;
        };
      }[];
    };
  } | null;
};

/**
 * The gift box, if the store has one.
 *
 * Returns null when Shopify is unconfigured or unreachable, when no product
 * carries the handle, or when the box is out of stock — every one of those is
 * the same thing as far as the bag is concerned: do not offer it. An add-on
 * that cannot be fulfilled is worse than no add-on, because it is discovered
 * at the point of payment.
 *
 * Cached for five minutes alongside the product offers, and read on every page
 * because the bag can be opened from any of them.
 */
export async function getGiftBox(): Promise<GiftBox | null> {
  const data = await storefront<GiftBoxResponse>(
    GIFT_BOX_QUERY,
    { handle: GIFT_BOX_HANDLE },
    300,
  );
  if (!data?.product?.availableForSale) return null;

  const variant = data.product.variants.edges[0]?.node;
  if (!variant?.availableForSale) return null;

  const reduced = formerPrice(variant.price, variant.compareAtPrice);
  return {
    variantId: variant.id,
    price: variant.price,
    ...(reduced ? { compareAt: reduced } : {}),
  };
}
