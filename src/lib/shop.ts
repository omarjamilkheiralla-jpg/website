/**
 * The Rosica online store.
 *
 * The branded address: shop.rosica.ae is the store's primary domain, its
 * certificate is issued, and it serves publicly. Shopify redirects the
 * myshopify address here anyway, so linking to it directly saves a hop and
 * keeps the brand in the address bar.
 *
 * This is only the fallback destination now — where a Buy button goes when the
 * Storefront API has not answered and there is no variant to add. The ordinary
 * path is /shop, which sells without leaving the site.
 */
export const SHOP_URL = "https://shop.rosica.ae";
