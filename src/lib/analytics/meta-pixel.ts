/**
 * Meta Pixel.
 *
 * One pixel — 1540839881117831 — declared once, here. Nothing else in the app
 * may call `fbq` directly; everything goes through the helpers below so that
 * the event names and parameter shapes exist in exactly one place and cannot
 * drift apart between the product page and the shop grid.
 *
 * WHAT THIS FILE DELIBERATELY DOES NOT DO
 *
 * There is no InitiateCheckout and no Purchase here, on purpose. Checkout
 * happens on shop.rosica.ae, where Shopify's own Meta integration already
 * fires both with matching catalogue ids, AED values and item counts. Firing
 * InitiateCheckout from this site as well would double-count the same shopper
 * — worse than not tracking the stage at all, because Meta would optimise
 * against inflated numbers. This site covers the journey up to the hand-off
 * and stops there.
 */

export const META_PIXEL_ID = "1540839881117831";

type Fbq = (...args: [string, ...unknown[]]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/**
 * The id Meta's catalogue is keyed on, taken from a Shopify GID.
 *
 * This matters and is easy to get wrong. The catalogue ids the business
 * supplied — 48749533724921 for Purifying & Fresh, 48750033666297 for Deep
 * Repair Conditioner — are Shopify **variant** ids, not product ids. The
 * product ids for those two are 10162073075961 and 10162473337081, and using
 * them would silently match nothing in the catalogue.
 *
 * That is why nothing is hardcoded. The variant GID is already in hand at
 * render time from the same Storefront query that supplies the price, so the
 * id is derived from live Shopify data:
 *
 *   gid://shopify/ProductVariant/48749533724921  ->  "48749533724921"
 *
 * Add a product, rename one, or change a variant, and this keeps matching with
 * nothing to update by hand.
 */
export function catalogueId(gid: string): string {
  return gid.split("/").pop() ?? gid;
}

/**
 * Send an event, waiting briefly for the pixel if the page is still loading.
 *
 * The base script is injected with Next's `afterInteractive` strategy, so on a
 * cold load a ViewContent effect can run before `fbq` exists. Rather than drop
 * the event, wait for it — capped, so a blocked or ad-filtered pixel costs a
 * few idle timers and nothing else.
 */
function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const fire = () => window.fbq?.("track", event, params);

  if (typeof window.fbq === "function") {
    fire();
    return;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    if (typeof window.fbq === "function") {
      window.clearInterval(timer);
      fire();
    } else if ((attempts += 1) > 50) {
      window.clearInterval(timer);
    }
  }, 100);
}

/**
 * Meta's own snippet, to be rendered inline and run during HTML parse.
 *
 * Deliberately not `next/script` with `afterInteractive`. That strategy delays
 * the whole thing until after hydration, which means React effects — the
 * ViewContent on a product page among them — run at a moment when `fbq` does
 * not yet exist, and have to be rescued by polling for it.
 *
 * Run inline, the tiny queue stub is defined before any component mounts, so
 * every later `fbq(...)` call is captured and replayed the instant the real
 * library arrives. The library itself is still fetched async by the snippet;
 * only the stub is synchronous, which is a few hundred bytes.
 *
 * PageView is fired here, for the document load. Route changes are handled by
 * MetaPixel, which skips its own first run so the two never overlap.
 */
export function pixelSnippet(): string {
  return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`;
}

export function trackPageView(): void {
  track("PageView");
}

type ProductEvent = {
  /** Shopify variant ids, as they appear in the Meta catalogue. */
  contentIds: string[];
  value: number;
  currency?: string;
};

export function trackViewContent({ contentIds, value, currency = "AED" }: ProductEvent): void {
  track("ViewContent", {
    content_ids: contentIds,
    content_type: "product",
    value,
    currency,
  });
}

export function trackAddToCart({ contentIds, value, currency = "AED" }: ProductEvent): void {
  track("AddToCart", {
    content_ids: contentIds,
    content_type: "product",
    value,
    currency,
  });
}
