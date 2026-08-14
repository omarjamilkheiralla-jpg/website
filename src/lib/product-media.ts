import { product, productAlt } from "./media";
import type { ProductSlug } from "@/content/products";

/**
 * The brand photograph for each product, keyed by slug.
 *
 * Kept beside the media catalogue rather than inside a view so the product
 * pages, the Collections carousel and anything added later all read the same
 * pairing — a product silently showing another product's bottle is exactly the
 * mistake the "never substitute product photography" rule exists to prevent.
 */
export const productPhoto: Record<ProductSlug, { src: string; alt: string }> = {
  "honey-propolis-repair-shampoo": {
    src: product.honeyPropolisRepairShampoo,
    alt: productAlt.honeyPropolisRepairShampoo,
  },
  "purifying-fresh-cleanse-shampoo": {
    src: product.purifyingFreshCleanseShampoo,
    alt: productAlt.purifyingFreshCleanseShampoo,
  },
  "deep-repair-conditioner": {
    src: product.deepRepairConditioner,
    alt: productAlt.deepRepairConditioner,
  },
  "botanical-restore-shampoo": {
    src: product.botanicalRestoreShampoo,
    alt: productAlt.botanicalRestoreShampoo,
  },
};
