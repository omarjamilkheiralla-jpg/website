import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

/**
 * robots.txt.
 *
 * A real file rather than meta tags alone, because the two do different jobs: a
 * meta robots tag is only seen once a page has been fetched, while this is read
 * before anything else and covers the routes that render no HTML at all.
 *
 * /api is disallowed in both states. Nothing under it is a page — the chat
 * route answers POST only — and a crawler that finds it can do nothing useful
 * but can cost money.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
