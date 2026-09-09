import type { SliderProduct } from "@/components/ProductSlider";
import { productPath } from "@/components/pages/ProductView";
import { productPhoto } from "@/lib/product-media";
import { localePath, type Locale } from "@/lib/i18n";
import { PRODUCT_NAMES, productChrome, productPages, type ProductSlug } from "@/content/products";
import type { Offers } from "@/lib/shopify/types";

/**
 * Builds the carousel's cards for a given set of products.
 *
 * Shared because the carousel now appears on three pages — the collections
 * index and each of the two collection pages — and a card assembled slightly
 * differently on one of them is the kind of difference nobody notices until a
 * price or a link is wrong on exactly one page.
 *
 * Everything comes from the product content file rather than from the
 * collections page's own copy, which used to carry a parallel list of subtitles
 * matched to products by array position. That list said the same words, and
 * would have had to be extended by hand for every page that wanted a carousel.
 */
export function sliderProducts(
  locale: Locale,
  slugs: readonly ProductSlug[],
  offers: Offers,
): SliderProduct[] {
  const chrome = productChrome[locale];

  return slugs.map((slug) => {
    const copy = productPages[locale][slug];
    const photo = productPhoto[slug];

    return {
      name: PRODUCT_NAMES[slug],
      sub: copy.sub,
      collection: copy.collection,
      /* Who the bottle is for, said on the card itself. Choosing between three
         shampoos is the whole job of a collection page, and hair type is what
         the choice actually turns on. */
      note: copy.suitedTo,
      cta: chrome.moreCta,
      image: photo.src,
      imageAlt: photo.alt,
      href: localePath(locale, productPath(slug)),
      price: offers[slug]?.price,
      compareAt: offers[slug]?.compareAt,
    };
  });
}
