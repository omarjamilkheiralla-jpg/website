import type { Localised } from "@/lib/i18n";

/** The shop page — the whole range on one screen, buyable in place. */
export type ShopCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Shown on a card when Shopify has no live offer for that product. */
  viewInStore: string;
  details: string;
  /** Reassurance under the grid, where a shopper looks for it. */
  note: string;
};

export const shopCopy: Localised<ShopCopy> = {
  en: {
    metaTitle: "Shop | The Rosica Range",
    metaDescription:
      "Shop the full Rosica range — four botanical haircare products across two collections, with secure checkout.",
    eyebrow: "Shop",
    title: "The Rosica Range",
    intro: "Explore the Rosica range and add your favourites to your bag.",
    viewInStore: "View in Store",
    details: "Details",
    note: "Prices in AED. Shipping and taxes are calculated at checkout.",
  },
  ar: {
    metaTitle: "المتجر | تشكيلة روزيكا",
    metaDescription:
      "تسوّق تشكيلة روزيكا كاملة — أربعة منتجات للعناية بالشعر ضمن مجموعتين، مع إتمام طلب آمن.",
    eyebrow: "المتجر",
    title: "تشكيلة روزيكا",
    intro: "استكشف تشكيلة روزيكا وأضف ما يعجبك إلى حقيبتك.",
    viewInStore: "اعرض في المتجر",
    details: "التفاصيل",
    note: "الأسعار بالدرهم الإماراتي. تُحتسب رسوم الشحن والضرائب عند إتمام الطلب.",
  },
};
