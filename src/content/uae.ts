import type { Localised } from "@/lib/i18n";

/**
 * Where Rosica is made, in the three places it is said.
 *
 *   footer  one line under the brand blurb, on every page
 *   home    the band between the values strip and the ingredient library
 *   about   the manufacturing pillar, which gains "in the UAE"
 *
 * All three live here so the claim is worded once. It is a regulatory
 * statement as much as a design one — it has to agree with the packs, the
 * trade licence and the product registrations — so if manufacturing ever
 * moves, this file is the only edit.
 *
 * On the bilingual rule: the English site carries the Arabic sub-label under
 * each mark, the way the Arabic sits under the wordmark. The Arabic site drops
 * it, because there the sub-label would only be the mark's own label again,
 * and a badge repeating itself reads as a mistake rather than a flourish.
 * `marks[].ar` is therefore null in Arabic, and the components skip it.
 */

type Mark = {
  label: string;
  /** The Arabic companion, or null where it would repeat `label`. */
  ar: string | null;
};

type UaeCopy = {
  /** The footer line, on every page. Rendered either side of a gold bullet. */
  footer: { made: string; gmp: string };

  /** The home-page band. */
  home: {
    eyebrow: string;
    title: string;
    tagline: string;
    body: string;
    marks: [Mark, Mark, Mark];
    /** The small caption set against the photograph. */
    caption: string;
    /** Names the band for assistive technology and the skip structure. */
    a11y: string;
  };
};

export const uaeCopy: Localised<UaeCopy> = {
  en: {
    footer: {
      made: "Proudly Made in the UAE",
      gmp: "GMP-Certified Manufacturing",
    },
    home: {
      eyebrow: "Proudly",
      title: "Made in the UAE",
      tagline: "Crafted locally. Made with care.",
      body: "Rosica products are manufactured in the United Arab Emirates in a GMP-certified facility and registered with the relevant UAE authorities.",
      marks: [
        { label: "UAE Made", ar: "صُنع في الإمارات" },
        { label: "GMP-Certified", ar: "تصنيع معتمد وفق GMP" },
        { label: "UAE Registered", ar: "منتجات مسجلة في الإمارات" },
      ],
      caption: "Nature rooted in the UAE",
      a11y: "Made in the United Arab Emirates",
    },
  },
  ar: {
    footer: {
      made: "صُنع بفخر في الإمارات",
      gmp: "تصنيع معتمد وفق معايير GMP",
    },
    home: {
      eyebrow: "بكل فخر",
      title: "صُنع في الإمارات",
      tagline: "مصنوعة محليًا، بعناية فائقة.",
      body: "تُصنع منتجات روزيكا في الإمارات العربية المتحدة في منشأة معتمدة وفق معايير GMP، ومسجّلة لدى الجهات المعنية في الدولة.",
      marks: [
        { label: "صُنع في الإمارات", ar: null },
        { label: "تصنيع معتمد وفق GMP", ar: null },
        { label: "منتجات مسجلة في الإمارات", ar: null },
      ],
      caption: "طبيعة متجذّرة في الإمارات",
      a11y: "صُنع في الإمارات العربية المتحدة",
    },
  },
};
