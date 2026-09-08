import type { ProductSlug } from "@/content/products";

/** A money value as Shopify returns it — the amount is a decimal string. */
export type Money = { amount: string; currencyCode: string };

/** What the site needs to know about a product's commerce state. */
export type ProductOffer = {
  /** Shopify's variant id, the thing a cart line points at. */
  variantId: string;
  price: Money;
  /**
   * The former price, when one is set in Shopify and is genuinely higher.
   * Absent otherwise — the UI shows a strike-through only when this exists,
   * so a product with no compare-at price simply shows its price.
   */
  compareAt?: Money;
  availableForSale: boolean;
};

/**
 * Offers keyed by the site's own product slug.
 *
 * The Shopify handles happen to match the slugs exactly today. `matchSlug`
 * still goes through an explicit check rather than a cast, so the day someone
 * renames a product in Shopify the price quietly disappears from that page
 * instead of a wrong price appearing on another one.
 */
export type Offers = Partial<Record<ProductSlug, ProductOffer>>;

/**
 * The gift box add-on. Null everywhere until the product exists in Shopify.
 *
 * No compare-at: an add-on is not on offer, and striking a price through on
 * something a customer is deciding whether to add reads as pressure rather
 * than as a saving.
 */
export type GiftBox = {
  variantId: string;
  price: Money;
};

export type CartLine = {
  id: string;
  quantity: number;
  total: Money;
  variantId: string;
  productTitle: string;
  productHandle: string;
  unitPrice: Money;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: Money;
  lines: CartLine[];
};

/** The raw shapes, only as far as we read them. */
export type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: Money };
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          price: Money;
        };
      };
    }[];
  };
};

/** Flattens Shopify's edge/node nesting into something a component can use. */
export function toCart(raw: RawCart): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: raw.cost.subtotalAmount,
    lines: raw.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      total: node.cost.totalAmount,
      variantId: node.merchandise.id,
      productTitle: node.merchandise.product.title,
      productHandle: node.merchandise.product.handle,
      unitPrice: node.merchandise.price,
    })),
  };
}
