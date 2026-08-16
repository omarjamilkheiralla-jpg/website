import type { MetadataRoute } from "next";
import { INDEXABLE, PLACEHOLDER_ROUTES, ROUTES, SITE_URL } from "@/lib/site";
import { localePath } from "@/lib/i18n";

/**
 * The sitemap, generated from the same route list the rest of the site uses so
 * a new page cannot be added without appearing here.
 *
 * Each entry declares its counterpart in the other language. That matters more
 * than usual on this site: without it a search engine treats /about and
 * /ar/about as two unrelated pages and has to guess which to show an Arabic
 * reader. `x-default` points at the English tree, which is the one a visitor
 * with no matching language preference should land on.
 *
 * Placeholder routes are left out. They are real pages and stay reachable, but
 * a sitemap is a list of what is worth crawling and a "coming soon" panel is
 * not that.
 *
 * While ALLOW_INDEXING is off the sitemap is served empty rather than omitted —
 * a 404 at /sitemap.xml looks like a mistake; an empty one is a clear statement
 * that there is deliberately nothing to crawl yet.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];

  const now = new Date();

  const listed = ROUTES.filter(
    (route) => !(PLACEHOLDER_ROUTES as readonly string[]).includes(route),
  );

  return listed.flatMap((route) => {
    const languages = {
      en: `${SITE_URL}${route}`,
      ar: `${SITE_URL}${localePath("ar", route)}`,
      "x-default": `${SITE_URL}${route}`,
    };

    return [
      {
        url: `${SITE_URL}${route}`,
        lastModified: now,
        // The home page is the entry point; the collections are what the site
        // is for. Everything else is supporting.
        priority: route === "/" ? 1 : route.startsWith("/collections") ? 0.8 : 0.6,
        changeFrequency: "monthly" as const,
        alternates: { languages },
      },
      {
        url: `${SITE_URL}${localePath("ar", route)}`,
        lastModified: now,
        priority: route === "/" ? 1 : route.startsWith("/collections") ? 0.8 : 0.6,
        changeFrequency: "monthly" as const,
        alternates: { languages },
      },
    ];
  });
}
