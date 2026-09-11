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
 * `keyBenefits` and `directions` are transcribed from the store's own
 * metafields — `custom.key_benefits` and `custom.directions_of_use`. They are
 * held here rather than fetched live for two reasons: Shopify has only the
 * English, and a product page should not lose half its content because the
 * Storefront API had a slow minute. Re-run the transcription if the metafields
 * change.
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
  /** From Shopify's `custom.key_benefits` metafield. */
  keyBenefits: string[];
  /** From Shopify's `custom.directions_of_use` metafield. */
  directions: string[];
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
      sub: "",
      lede: "Nourishing and repairing care for dry, normal and damaged hair.",
      size: "300 ml",
      suitedTo: "Dry, normal and damaged hair",
      keyIngredients: ["Honey", "Propolis", "Aloe vera", "Hydrolyzed collagen"],
      freeFrom: ["Sulfate-free", "Silicone-free", "Paraben-free", "Colorant-free"],
      keyBenefits: [
        "Nourishes dry and damaged hair",
        "Helps strengthen weak hair fibers",
        "Improves softness and smoothness",
        "Restores healthy-looking shine",
        "Suitable for daily use",
      ],
      directions: [
        "Apply to wet hair and gently massage into the scalp and lengths until a light lather forms.",
        "Rinse thoroughly with water. Repeat if needed.",
        "For best results, follow with Rosica Deep Repair Conditioner.",
      ],
    },
    "purifying-fresh-cleanse-shampoo": {
      metaTitle: "Purifying & Fresh Cleanse Shampoo",
      metaDescription:
        "Refreshing cleansing care for oily hair and scalps prone to excess oil, with rosemary and green tea. 300 ml, from Rosica Essentials.",
      collection: "Essentials",
      sub: "",
      lede: "Refreshing cleansing care for oily hair and scalps prone to excess oil.",
      size: "300 ml",
      suitedTo: "Oily hair and scalp",
      keyIngredients: ["Rosemary extract", "Green tea extract", "Amino acid complex"],
      freeFrom: ["Silicone-free", "Paraben-free", "Colorant-free"],
      keyBenefits: [
        "Deeply cleanses excess oil and impurities",
        "Helps maintain the scalp's natural moisture balance",
        "Leaves hair feeling fresh, light and revitalized",
        "Supports a healthy-looking scalp",
        "Suitable for regular use",
      ],
      directions: [
        "Apply to wet hair and gently massage into the scalp and lengths until a light lather forms.",
        "Rinse thoroughly with water. Repeat if needed.",
      ],
    },
    "deep-repair-conditioner": {
      metaTitle: "Deep Repair Conditioner",
      metaDescription:
        "Conditioning care designed to detangle, strengthen and repair all hair types, with honey, açaí and shea butter. 300 ml, from Rosica Essentials.",
      collection: "Essentials",
      sub: "Intense Nourishment",
      lede: "Conditioning care designed to detangle, strengthen and repair all hair types.",
      size: "300 ml",
      suitedTo: "All hair types",
      keyIngredients: ["Honey", "Açaí", "Shea butter", "Hydrolyzed collagen"],
      freeFrom: [],
      keyBenefits: [
        "Deeply nourishes dry and damaged hair",
        "Helps repair and strengthen weakened hair fibers",
        "Improves softness, smoothness and manageability",
        "Helps detangle hair while reducing frizz",
        "Enhances healthy-looking shine",
        "Suitable for daily use",
      ],
      directions: [
        "After shampooing with Rosica Shampoo, apply Deep Repair Conditioner evenly to the lengths and ends of damp hair.",
        "Gently massage through the hair and leave on for 2–5 minutes to allow the conditioning and nourishing ingredients to perform effectively.",
        "Rinse thoroughly with water. Suitable for daily use.",
      ],
    },
    "botanical-restore-shampoo": {
      metaTitle: "Botanical Restore Shampoo",
      metaDescription:
        "Gentle, sulfate-free botanical care for colour-treated, chemically treated and damaged hair, and for daily use. 300 ml, from Rosica PURE.",
      collection: "PURE",
      sub: "",
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
      keyBenefits: [
        "Gently cleanses while helping restore dry and stressed hair",
        "Helps protect the beauty of color-treated and chemically treated hair",
        "Helps maintain the beauty of protein- and keratin-treated hair",
        "Helps improve softness and smoothness",
        "Supports stronger, healthier-looking hair",
        "Enhances natural shine and manageability",
        "Suitable for daily use",
      ],
      directions: [
        "Apply to wet hair and gently massage into the scalp and lengths until a light lather forms.",
        "Rinse thoroughly with water. Repeat if needed.",
        "For best results, follow with Rosica Deep Repair Conditioner.",
      ],
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
      keyBenefits: [
        "يغذّي الشعر الجاف والتالف",
        "يساعد على تقوية الشعيرات الضعيفة",
        "يحسّن النعومة والانسيابية",
        "يعيد اللمعان الصحي للشعر",
        "مناسب للاستخدام اليومي",
      ],
      directions: [
        "يوضع على الشعر المبلّل مع تدليك فروة الرأس والأطراف بلطف حتى تتكوّن رغوة خفيفة.",
        "يُشطف جيدًا بالماء. يمكن تكرار الاستخدام عند الحاجة.",
        "للحصول على أفضل نتيجة، يُتبع ببلسم الإصلاح العميق من روزيكا.",
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
      keyBenefits: [
        "ينظّف بعمق الدهون الزائدة والشوائب",
        "يساعد على الحفاظ على توازن الرطوبة الطبيعي لفروة الرأس",
        "يترك الشعر منتعشًا وخفيفًا ومفعمًا بالحيوية",
        "يدعم مظهرًا صحيًا لفروة الرأس",
        "مناسب للاستخدام المنتظم",
      ],
      directions: [
        "يوضع على الشعر المبلّل مع تدليك فروة الرأس والأطراف بلطف حتى تتكوّن رغوة خفيفة.",
        "يُشطف جيدًا بالماء. يمكن تكرار الاستخدام عند الحاجة.",
      ],
    },
    "deep-repair-conditioner": {
      metaTitle: "بلسم الإصلاح العميق",
      metaDescription:
        "بلسم يساعد على فك التشابك وتقوية الشعر وإصلاحه لجميع أنواع الشعر، بالعسل والأساي وزبدة الشيا. ٣٠٠ مل، من مجموعة روزيكا إسينشالز.",
      collection: "إسينشالز",
      sub: "تغذية مكثفة",
      lede: "بلسم مصمّم لفك التشابك وتقوية الشعر وإصلاحه، لجميع أنواع الشعر.",
      size: "٣٠٠ مل",
      suitedTo: "جميع أنواع الشعر",
      keyIngredients: ["العسل", "الأساي", "زبدة الشيا", "الكولاجين المُحلّل"],
      freeFrom: [],
      keyBenefits: [
        "يغذّي بعمق الشعر الجاف والتالف",
        "يساعد على إصلاح الشعيرات الضعيفة وتقويتها",
        "يحسّن النعومة والانسيابية وسهولة التصفيف",
        "يساعد على فك التشابك وتقليل التطاير",
        "يعزّز اللمعان الصحي",
        "مناسب للاستخدام اليومي",
      ],
      directions: [
        "بعد غسل الشعر بشامبو روزيكا، يوزَّع بلسم الإصلاح العميق بالتساوي على أطوال الشعر وأطرافه وهو رطب.",
        "يُدلَّك بلطف ويُترك من ٢ إلى ٥ دقائق ليتيح للمكوّنات المرطّبة والمغذّية أداء دورها.",
        "يُشطف جيدًا بالماء. مناسب للاستخدام اليومي.",
      ],
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
      keyBenefits: [
        "ينظّف بلطف مع المساعدة على استعادة الشعر الجاف والمُجهد",
        "يساعد على حماية جمال الشعر المصبوغ والمعالج كيميائيًا",
        "يساعد على الحفاظ على جمال الشعر المعالج بالبروتين والكيراتين",
        "يساعد على تحسين النعومة والانسيابية",
        "يدعم شعرًا أقوى وأكثر صحة في المظهر",
        "يعزّز اللمعان الطبيعي وسهولة التصفيف",
        "مناسب للاستخدام اليومي",
      ],
      directions: [
        "يوضع على الشعر المبلّل مع تدليك فروة الرأس والأطراف بلطف حتى تتكوّن رغوة خفيفة.",
        "يُشطف جيدًا بالماء. يمكن تكرار الاستخدام عند الحاجة.",
        "للحصول على أفضل نتيجة، يُتبع ببلسم الإصلاح العميق من روزيكا.",
      ],
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
  benefitsHeading: string;
  directionsHeading: string;
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
    benefitsHeading: "Key benefits",
    directionsHeading: "Directions of use",
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
    benefitsHeading: "أبرز الفوائد",
    directionsHeading: "طريقة الاستخدام",
    moreHeading: "المزيد من روزيكا",
    moreCta: "اكتشف",
  },
};
