/**
 * Where this site lives, and whether search engines may list it.
 *
 * One place, because a wrong value here is invisible: it does not break a page,
 * it just quietly points every canonical URL, Open Graph image and sitemap
 * entry at somewhere else. This file previously said rosica.com — a domain the
 * brand does not own.
 */

/**
 * The canonical origin. The apex, not www: www.rosica.ae is set up to redirect
 * here, so there is exactly one address search engines and shares resolve to.
 */
export const SITE_URL = "https://rosica.ae";

/**
 * Whether search engines may index the site.
 *
 * Off by default and deliberately so — several routes (FAQs, Where to Buy,
 * Privacy, Terms) are still placeholders, and a handful of thin pages indexed
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
  "/collections",
  "/collections/essentials",
  "/collections/pure",
  "/ingredients",
  "/where-to-buy",
  "/contact",
  "/faqs",
  "/privacy",
  "/terms",
] as const;
