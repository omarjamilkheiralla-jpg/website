import type { Localised } from "@/lib/i18n";

/**
 * Where Rosica is made.
 *
 * The line is bilingual on the English site and single-language on the Arabic
 * one, and that asymmetry is deliberate rather than an oversight. A provenance
 * mark is read as much as a seal as it is as a sentence: on the English site
 * the Arabic beneath it is part of the mark, the same way the Arabic sits
 * under the wordmark. On the Arabic site that second line would simply be the
 * first line again, so it is dropped — a badge repeating itself reads as a
 * mistake, not as a flourish.
 *
 * `second` is therefore null in Arabic, and the component skips it rather than
 * rendering an empty element.
 *
 * On the claim itself: this states a country of manufacture, which is a
 * regulatory statement as well as a design one. It has to agree with what the
 * packs and the trade licence say. If manufacturing ever moves, this file is
 * the one place to change — nothing else in the site hard-codes a country.
 */

type Provenance = {
  /** The line the page is written in. */
  primary: string;
  /** The companion line, or null when it would only repeat `primary`. */
  second: string | null;
  /** Read in place of the pairing, which is decorative to a screen reader. */
  a11y: string;
  /** The longer form, used where the mark sits beside body copy. */
  long: string;
};

export const provenance: Localised<Provenance> = {
  en: {
    primary: "Made in the UAE",
    second: "صُنع في الإمارات العربية المتحدة",
    a11y: "Made in the United Arab Emirates",
    long: "Formulated and made in the United Arab Emirates.",
  },
  ar: {
    primary: "صُنع في الإمارات العربية المتحدة",
    second: null,
    a11y: "صُنع في الإمارات العربية المتحدة",
    long: "مركّبة ومصنوعة في الإمارات العربية المتحدة.",
  },
};
