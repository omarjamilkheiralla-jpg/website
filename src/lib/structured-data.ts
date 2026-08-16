import { SITE_URL } from "./site";
import { socialLinks } from "./navigation";
import { localePath, type Locale } from "./i18n";
import { productPhoto } from "./product-media";
import type { ProductOffer } from "./shopify/types";
import { LEGAL_ENTITY } from "@/content/legal";
import { PRODUCT_NAMES, productPages, type ProductSlug } from "@/content/products";
import { questions } from "@/content/chat-answers";

/**
 * Organization structured data.
 *
 * This is what tells Google that the gold wordmark belongs to Rosica, rather
 * than leaving it to guess from whatever image happens to be on a page. It is
 * also what feeds a knowledge panel: the legal name, the registered address,
 * the address to write to, and the social profiles that corroborate all of it.
 *
 * Every value here is already published somewhere on the site — the legal
 * documents, the contact page, the footer. Nothing is asserted to Google that a
 * visitor cannot also read, which is both the honest position and the one
 * Google's own guidance asks for.
 *
 * The favicon is a separate thing and needs no markup: Next serves
 * src/app/icon.png and links it, which is what appears beside a search result.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Rosica",
    legalName: LEGAL_ENTITY.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/rosica-wordmark-gold.png`,
      width: 689,
      height: 234,
    },
    image: `${SITE_URL}/images/product-range-group.jpg`,
    description:
      "Rosica is a premium botanical beauty brand inspired by nature and refined through modern cosmetic science.",
    email: LEGAL_ENTITY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: LEGAL_ENTITY.email,
      availableLanguage: ["en", "ar"],
    },
    // The profiles that let Google connect this domain to the same business.
    sameAs: socialLinks.map((link) => link.href),
  };
}

/**
 * One product, in the form Google reads.
 *
 * This is what makes a product page eligible for a price and an in-stock line
 * in the results, and it is the same markup Merchant Center reads for free
 * product listings. Every value comes from something already on the page: the
 * name off the bottle, the description from the page's own meta description,
 * the photograph the page shows, and the price and stock from the same
 * `getOffers()` call the Add to Bag button uses.
 *
 * Deliberately absent, and to stay absent until they are real:
 *
 *   - `aggregateRating` / `review` — there are no reviews. Marking up ratings
 *     that do not exist is the single fastest way to earn a manual penalty.
 *   - `gtin` / `mpn` — the products have no barcodes recorded here. `sku` is
 *     the Shopify handle, which is a real identifier rather than an invented
 *     one.
 *   - `shippingDetails` — rates and delivery times are settled at checkout and
 *     are deliberately not published (see content/legal-policies.ts). Asserting
 *     them here would contradict that.
 *
 * `offers` is omitted entirely when Shopify is unreachable. A Product without
 * an offer is valid; a Product with a price we could not confirm is not.
 */
export function productSchema(
  locale: Locale,
  slug: ProductSlug,
  offer?: ProductOffer,
) {
  const copy = productPages[locale][slug];
  const url = `${SITE_URL}${localePath(locale, `/products/${slug}`)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: PRODUCT_NAMES[slug],
    description: copy.metaDescription,
    image: `${SITE_URL}${productPhoto[slug].src}`,
    url,
    sku: slug,
    inLanguage: locale,
    brand: { "@type": "Brand", name: "Rosica" },
    ...(offer
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: offer.price.currencyCode,
            price: offer.price.amount,
            availability: offer.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${SITE_URL}/#organization` },
            /* Mirrors the published Return & Refund Policy exactly — 14 days,
               returned by post, customer pays return postage on a change of
               mind. Change this and that document together or they disagree. */
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "AE",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 14,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/ReturnShippingFees",
            },
          },
        }
      : {}),
  };
}

/**
 * The FAQ page, as a machine-readable question-and-answer set.
 *
 * A caveat worth recording rather than discovering later: since 2023 Google
 * only shows FAQ rich results for authoritative government and health sites,
 * so this will not put expandable questions under the Rosica result. It is here
 * because it is the correct, valid description of the page, and because Bing
 * and the assistants that read structured data do still use it. Nobody should
 * expect a visible change in Google from this function.
 *
 * Answers are joined into one string per question because schema.org's
 * acceptedAnswer takes a single text value.
 */
export function faqSchema(locale: Locale) {
  const url = `${SITE_URL}${localePath(locale, "/faqs")}`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: questions.map((question) => ({
      "@type": "Question",
      name: question.q[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: question.a[locale].join(" "),
      },
    })),
  };
}

/** The site itself, so search knows the two language trees are one property. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Rosica",
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
