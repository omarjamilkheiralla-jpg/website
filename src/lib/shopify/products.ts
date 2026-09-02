import { storefront } from "./client";
import { PRODUCTS_QUERY } from "./queries";
import type { Offers } from "./types";
import { PRODUCT_SLUGS, type ProductSlug } from "@/content/products";

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

    /* Only treat it as a reduction if the compare-at price is actually above
       the selling price. Shopify happily stores an equal or lower value, and
       a strike-through on the same number reads as a mistake. */
    const price = node.priceRange.minVariantPrice;
    const compare = variant.compareAtPrice;
    const reduced =
      compare && Number(compare.amount) > Number(price.amount) ? compare : undefined;

    offers[slug] = {
      variantId: variant.id,
      price,
      ...(reduced ? { compareAt: reduced } : {}),
      availableForSale: node.availableForSale && variant.availableForSale,
    };
  }
  return offers;
}
