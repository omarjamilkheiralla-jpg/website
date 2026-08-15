import type { Localised } from "@/lib/i18n";

/**
 * The four products, each with a page of its own.
 *
 * Everything factual here — size, hair type, the named ingredients and the
 * free-from claims — is read off the packaging in the brand photography. The
 * descriptions are the business's own wording. Nothing is written for the
 * products: if a claim is not on the pack it is not on the page.
 *
 * Note the asymmetry in `freeFrom`: sulfate-free is NOT a brand-wide claim. Two
 * shampoos carry it and Purifying & Fresh does not, so its list simply omits
 * it. Do not add the claim to that product.
 *
 * The Shopify store was password-protected when these were written, so the
 * merchandising copy there could not be mirrored. When the store opens, check
 * these against it rather than assuming they match.
 */

export type ProductSlug =
  | "honey-propolis-repair-shampoo"
  | "purifying-fresh-cleanse-shampoo"
  | "deep-repair-conditioner"
  | "botanical-restore-shampoo";

export type ProductCopy = {
  metaTitle: string;
  metaDescription: string;
  /** The collection eyebrow, as it appears on the Collections page. */
  collection: string;
  /** The line printed beneath the name on the bottle. */
  sub: string;
  lede: string;
  size: string;
  suitedTo: string;
  keyIngredients: string[];
  freeFrom: string[];
  /** Anything the label makes explicit that the lists above would hide. */
  note?: string;
};

/** Names are printed on the bottle and stay in Latin script in both languages. */
export const PRODUCT_NAMES: Record<ProductSlug, string> = {
  "honey-propolis-repair-shampoo": "Honey & Propolis Repair Shampoo",
  "purifying-fresh-cleanse-shampoo": "Purifying & Fresh Cleanse Shampoo",
  "deep-repair-conditioner": "Deep Repair Conditioner",
  "botanical-restore-shampoo": "Botanical Restore Shampoo",
};

/** Order matters: it is the order of the Collections carousel. */
export const PRODUCT_SLUGS: ProductSlug[] = [
  "honey-propolis-repair-shampoo",
  "purifying-fresh-cleanse-shampoo",
  "deep-repair-conditioner",
  "botanical-restore-shampoo",
];

/** Which collection page each product belongs to. */
export const PRODUCT_COLLECTION: Record<ProductSlug, "/collections/essentials" | "/collections/pure"> = {
  "honey-propolis-repair-shampoo": "/collections/essentials",
  "purifying-fresh-cleanse-shampoo": "/collections/essentials",
  "deep-repair-conditioner": "/collections/essentials",
  "botanical-restore-shampoo": "/collections/pure",
};

export const productPages: Localised<Record<ProductSlug, ProductCopy>> = {
  en: {
    "honey-propolis-repair-shampoo": {
      metaTitle: "Honey & Propolis Repair Shampoo",
      metaDescription:
        "Nourishing and repairing care for dry, normal and damaged hair, with honey, propolis and aloe vera. 300 ml, from Rosica Essentials.",
      collection: "Essentials",
      sub: "Repair Shampoo",
      lede: "Nourishing and repairing care for dry, normal and damaged hair.",
      size: "300 ml",
      suitedTo: "Dry, normal and damaged hair",
      keyIngredients: ["Honey", "Propolis", "Aloe vera", "Hydrolyzed collagen"],
      freeFrom: ["Sulfate-free", "Silicone-free", "Paraben-free", "Colorant-free"],
    },
    "purifying-fresh-cleanse-shampoo": {
      metaTitle: "Purifying & Fresh Cleanse Shampoo",
      metaDescription:
        "Refreshing cleansing care for oily hair and scalps prone to excess oil, with rosemary and green tea. 300 ml, from Rosica Essentials.",
      collection: "Essentials",
      sub: "Cleanse Shampoo",
      lede: "Refreshing cleansing care for oily hair and scalps prone to excess oil.",
      size: "300 ml",
      suitedTo: "Oily hair and scalp",
      keyIngredients: ["Rosemary extract", "Green tea extract", "Amino acid complex"],
      freeFrom: ["Silicone-free", "Paraben-free", "Colorant-free"],
    },
    "deep-repair-conditioner": {
      metaTitle: "Deep Repair Conditioner",
      metaDescription:
        "Conditioning care designed to detangle, strengthen and repair all hair types, with honey, açaí and shea butter. 300 ml, from Rosica Essentials.",
      collection: "Essentials",
      sub: "Intense Nourishment for All Hair Types",
      lede: "Conditioning care designed to detangle, strengthen and repair all hair types.",
      size: "300 ml",
      suitedTo: "All hair types",
      keyIngredients: ["Honey", "Açaí", "Shea butter", "Hydrolyzed collagen"],
      freeFrom: [],
    },
    "botanical-restore-shampoo": {
      metaTitle: "Botanical Restore Shampoo",
      metaDescription:
        "Gentle, sulfate-free botanical care for colour-treated, chemically treated and damaged hair, and for daily use. 300 ml, from Rosica PURE.",
      collection: "PURE",
      sub: "Sulfate-Free",
      lede: "Gentle, sulfate-free botanical care designed for all hair types — colour-treated, chemically treated and damaged hair, and daily use.",
      size: "300 ml",
      suitedTo: "Colour-treated, chemically treated and damaged hair; suitable for daily use",
      keyIngredients: [
        "Honey",
        "Açaí",
        "Hydrolyzed collagen",
        "Aloe vera",
        "Amino acid complex",
      ],
      freeFrom: ["Sulfate-free", "Silicone-free", "Paraben-free", "Colorant-free"],
      note: "Formulated with surfactants of natural origin.",
    },
  },
  ar: {
    "honey-propolis-repair-shampoo": {
      metaTitle: "شامبو العسل والبروبوليس للإصلاح",
      metaDescription:
        "عناية مغذّية ومصلحة للشعر الجاف والعادي والتالف، بالعسل والبروبوليس والألوفيرا. ٣٠٠ مل، من مجموعة روزيكا إسينشالز.",
      collection: "إسينشالز",
      sub: "شامبو الإصلاح",
      lede: "عناية مغذّية ومصلحة للشعر الجاف والعادي والتالف.",
      size: "٣٠٠ مل",
      suitedTo: "الشعر الجاف والعادي والتالف",
      keyIngredients: ["العسل", "البروبوليس", "الألوفيرا", "الكولاجين المُحلّل"],
      freeFrom: [
        "خالٍ من السلفات",
        "خالٍ من السيليكون",
        "خالٍ من البارابين",
        "خالٍ من الملوّنات",
      ],
    },
    "purifying-fresh-cleanse-shampoo": {
      metaTitle: "شامبو التنظيف المنعش",
      metaDescription:
        "عناية منعشة تنظّف الشعر الدهني وفروة الرأس المعرّضة للدهون، بإكليل الجبل والشاي الأخضر. ٣٠٠ مل، من مجموعة روزيكا إسينشالز.",
      collection: "إسينشالز",
      sub: "شامبو التنظيف",
      lede: "عناية منعشة للشعر الدهني وفروة الرأس المعرّضة للدهون الزائدة.",
      size: "٣٠٠ مل",
      suitedTo: "الشعر الدهني وفروة الرأس الدهنية",
      keyIngredients: ["خلاصة إكليل الجبل", "خلاصة الشاي الأخضر", "مركّب الأحماض الأمينية"],
      freeFrom: ["خالٍ من السيليكون", "خالٍ من البارابين", "خالٍ من الملوّنات"],
    },
    "deep-repair-conditioner": {
      metaTitle: "بلسم الإصلاح العميق",
      metaDescription:
        "بلسم يساعد على فك التشابك وتقوية الشعر وإصلاحه لجميع أنواع الشعر، بالعسل والأساي وزبدة الشيا. ٣٠٠ مل، من مجموعة روزيكا إسينشالز.",
      collection: "إسينشالز",
      sub: "تغذية مكثفة لجميع أنواع الشعر",
      lede: "بلسم مصمّم لفك التشابك وتقوية الشعر وإصلاحه، لجميع أنواع الشعر.",
      size: "٣٠٠ مل",
      suitedTo: "جميع أنواع الشعر",
      keyIngredients: ["العسل", "الأساي", "زبدة الشيا", "الكولاجين المُحلّل"],
      freeFrom: [],
    },
    "botanical-restore-shampoo": {
      metaTitle: "شامبو الاستعادة النباتية",
      metaDescription:
        "عناية نباتية لطيفة وخالية من السلفات للشعر المصبوغ والمعالج كيميائيًا والتالف، وللاستخدام اليومي. ٣٠٠ مل، من مجموعة روزيكا بيور.",
      collection: "بيور",
      sub: "خالٍ من السلفات",
      lede: "عناية نباتية لطيفة وخالية من السلفات، مصمّمة لجميع أنواع الشعر — المصبوغ والمعالج كيميائيًا والتالف، وللاستخدام اليومي.",
      size: "٣٠٠ مل",
      suitedTo: "الشعر المصبوغ والمعالج كيميائيًا والتالف، ومناسب للاستخدام اليومي",
      keyIngredients: [
        "العسل",
        "الأساي",
        "الكولاجين المُحلّل",
        "الألوفيرا",
        "مركّب الأحماض الأمينية",
      ],
      freeFrom: [
        "خالٍ من السلفات",
        "خالٍ من السيليكون",
        "خالٍ من البارابين",
        "خالٍ من الملوّنات",
      ],
      note: "مركّب بمواد تنظيف من أصل طبيعي.",
    },
  },
};

/** Page furniture shared by all four product pages. */
export type ProductChrome = {
  eyebrow: string;
  buy: string;
  viewCollection: string;
  detailsHeading: string;
  sizeLabel: string;
  suitedLabel: string;
  ingredientsLabel: string;
  freeFromLabel: string;
  moreHeading: string;
  moreCta: string;
};

export const productChrome: Localised<ProductChrome> = {
  en: {
    eyebrow: "Product",
    buy: "Buy Now",
    viewCollection: "View the collection",
    detailsHeading: "Product details",
    sizeLabel: "Size",
    suitedLabel: "Suited to",
    ingredientsLabel: "Key ingredients",
    freeFromLabel: "Formulated without",
    moreHeading: "More from Rosica",
    moreCta: "Explore",
  },
  ar: {
    eyebrow: "المنتج",
    buy: "اشتري الآن",
    viewCollection: "اعرضي المجموعة",
    detailsHeading: "تفاصيل المنتج",
    sizeLabel: "الحجم",
    suitedLabel: "مناسب لـ",
    ingredientsLabel: "أبرز المكوّنات",
    freeFromLabel: "خالٍ من",
    moreHeading: "المزيد من روزيكا",
    moreCta: "اكتشف",
  },
};
