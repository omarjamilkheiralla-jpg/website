/**
 * The Shopify Storefront API.
 *
 *   SHOPIFY_STORE_DOMAIN      e.g. rosica-8306.myshopify.com
 *   SHOPIFY_STOREFRONT_TOKEN  the Headless channel's public access token
 *
 * Both are read server-side only. The Storefront public token is designed to be
 * safe in browser code, but keeping it here means it never ships in the bundle,
 * so rotating it is a redeploy rather than a hunt — and cart mutations go
 * through our own route where they can be shaped and rate-limited.
 *
 * Every call is written to fail soft. If Shopify is slow, down, or simply not
 * configured, `storefront` returns null and the page renders without prices
 * rather than throwing — a product page with no price is disappointing, a
 * product page that 500s is broken.
 */

/** The version this code is written against. Bump deliberately, never floating. */
const API_VERSION = "2026-07";

/** Shopify is on the critical render path; do not let it hang a page. */
const TIMEOUT_MS = 6000;

export type StorefrontResult<T> = T | null;

function endpoint(): string | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain || !process.env.SHOPIFY_STOREFRONT_TOKEN) return null;
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

/** True when the store is wired up. Views use this to decide what to render. */
export const shopifyConfigured = () => endpoint() !== null;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * Runs a Storefront query.
 *
 * `revalidate` is seconds of cache; pass 0 for cart mutations, which must never
 * be served from a cache.
 */
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = 300,
): Promise<StorefrontResult<T>> {
  const url = endpoint();
  if (!url) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      ...(revalidate === false || revalidate === 0
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });

    if (!response.ok) {
      console.error(`Storefront API ${response.status}`);
      return null;
    }

    const body = (await response.json()) as GraphQLResponse<T>;
    if (body.errors?.length) {
      console.error("Storefront API errors:", body.errors.map((e) => e.message).join("; "));
      return null;
    }
    return body.data ?? null;
  } catch (error) {
    // Abort on timeout lands here too, which is the point.
    console.error("Storefront API request failed:", error);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Formats a Shopify money value.
 *
 * Shopify returns decimal strings ("45.0"), never numbers. Whole amounts print
 * without decimals — "AED 45", not "AED 45.00" — which is how prices are
 * written on a premium shelf.
 */
export function formatMoney(amount: string, currencyCode: string, locale: string): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) return `${currencyCode} ${amount}`;

  return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
