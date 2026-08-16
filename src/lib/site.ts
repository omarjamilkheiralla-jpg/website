/**
 * Where this site lives, and whether search engines may list it.
 *
 * One place, because a wrong value here is invisible: it does not break a page,
 * it just quietly points every canonical URL, Open Graph image and sitemap
 * entry at somewhere else. This file previously said rosica.com — a domain the
 * brand does not own.
 */

/**
 * The canonical origin.
 *
 * www, not the apex: the hosting redirects rosica.ae to www.rosica.ae, so this
 * has to be the address that actually serves — a canonical URL pointing at a
 * redirect is a small self-inflicted wound. It also matches the address the
 * contact page and the packaging already give out.
 */
export const SITE_URL = "https://www.rosica.ae";

/**
 * Whether search engines may index the site.
 *
 * Off by default and deliberately so — FAQs is still a placeholder, and a handful of thin pages indexed
 * early is a slow thing to undo. Set ALLOW_INDEXING=true in the hosting
 * environment and redeploy when there is real content behind every link.
 *
 * This is belt and braces alongside Vercel's Deployment Protection: if
 * protection is ever lifted without anyone thinking about search, the site is
 * still not listed.
 */
export const INDEXABLE = process.env.ALLOW_INDEXING === "true";

/** Every page, authored once in English; the Arabic tree mirrors it under /ar. */
export const ROUTES = [
  "/",
  "/about",
  "/shop",
  "/collections",
  "/collections/essentials",
  "/collections/pure",
  "/products/honey-propolis-repair-shampoo",
  "/products/purifying-fresh-cleanse-shampoo",
  "/products/deep-repair-conditioner",
  "/products/botanical-restore-shampoo",
  "/ingredients",
  "/ingredients/honey",
  "/ingredients/propolis",
  "/ingredients/aloe-vera",
  "/ingredients/rosemary",
  "/contact",
  "/faqs",
  "/privacy",
  "/terms",
] as const;
