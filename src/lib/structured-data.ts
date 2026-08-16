import { SITE_URL } from "./site";
import { socialLinks } from "./navigation";
import { LEGAL_ENTITY } from "@/content/legal";

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
