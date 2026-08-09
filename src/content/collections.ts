import type { Localised } from "@/lib/i18n";

export type CollectionsCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroCta: string;
  listHeading: string;
  /** Essentials then Pure — order matters. */
  collections: {
    eyebrow: string;
    name: string;
    body: string;
    features: string[];
    cta: string;
  }[];
  philosophyHeading: string;
  pillars: { title: string; body: string }[];

  productsEyebrow: string;
  productsTitle: string;
  productsBody: string;
  /**
   * Product names and sub-lines are transcribed from the packaging in the
   * photography — nothing here is written for them. The names stay in Latin in
   * both languages, as they are printed on the bottle.
   */
  products: { sub: string; collection: string; cta: string }[];
};

export const collectionsCopy: Localised<CollectionsCopy> = {
  en: {
    metaTitle: "Collections | Two Collections. Complete Botanical Care.",
    metaDescription:
      "Thoughtfully crafted formulations, inspired by nature, refined through science, and made to elevate your natural beauty.",
    eyebrow: "Our Collections",
    title: "Two Collections. Complete Botanical Care.",
    intro:
      "Thoughtfully crafted formulations, inspired by nature, refined through science, and made to elevate your natural beauty.",
    heroCta: "Explore Our Collections",
    listHeading: "The Rosica collections",
    collections: [
      {
        eyebrow: "Rosica",
        name: "Essentials",
        body: "Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect.",
        features: ["Nourish", "Strengthen", "Protect", "Balance"],
        cta: "Explore Essentials",
      },
      {
        eyebrow: "Rosica",
        name: "Pure",
        body: "Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience.",
        features: ["Pure", "Clean", "Restore", "Revitalize"],
        cta: "Explore Pure",
      },
    ],
    philosophyHeading: "The Rosica philosophy",
    pillars: [
      {
        title: "Botanical Expertise",
        body: "Carefully selected natural ingredients you can trust.",
      },
      { title: "Scientific Innovation", body: "Advanced research and modern formulation." },
      { title: "Thoughtful Formulation", body: "Every product created with purpose and care." },
      {
        title: "Responsible Beauty",
        body: "We care for you and the planet every step of the way.",
      },
    ],

    productsEyebrow: "All Products",
    productsTitle: "The Full Rosica Range",
    productsBody:
      "Every product across both collections, from daily cleansing to deep repair.",
    products: [
      { sub: "Repair Shampoo", collection: "Essentials", cta: "View in Essentials" },
      { sub: "Cleanse Shampoo", collection: "Essentials", cta: "View in Essentials" },
      {
        sub: "Intense Nourishment for All Hair Types",
        collection: "Essentials",
        cta: "View in Essentials",
      },
      { sub: "Sulfate-Free", collection: "PURE", cta: "View in Pure" },
    ],
  },
  ar: {
    metaTitle: "المجموعات | مجموعتان. عناية نباتية متكاملة.",
    metaDescription:
      "تركيبات مصنوعة بعناية، مستوحاة من الطبيعة، مصقولة بالعلم، وصُممت لتبرز جمالك الطبيعي.",
    eyebrow: "مجموعاتنا",
    title: "مجموعتان. عناية نباتية متكاملة.",
    intro: "تركيبات مصنوعة بعناية، مستوحاة من الطبيعة، مصقولة بالعلم، وصُممت لتبرز جمالك الطبيعي.",
    heroCta: "استكشفي مجموعاتنا",
    listHeading: "مجموعات روزيكا",
    collections: [
      {
        eyebrow: "روزيكا",
        name: "إسينشالز",
        body: "أساسيات العناية اليومية بقوة الطبيعة. تركيبات لطيفة وفعّالة تنظّف وتغذّي وتحمي.",
        features: ["تغذية", "تقوية", "حماية", "توازن"],
        cta: "استكشفي إسينشالز",
      },
      {
        eyebrow: "روزيكا",
        name: "بيور",
        body: "نقية وبسيطة وفعّالة. عناية خالية من السلفات بمكوّنات نباتية متطوّرة لتجربة جمال أكثر صحة.",
        features: ["نقاء", "نظافة", "استعادة", "تنشيط"],
        cta: "استكشفي بيور",
      },
    ],
    philosophyHeading: "فلسفة روزيكا",
    pillars: [
      { title: "خبرة نباتية", body: "مكوّنات طبيعية مختارة بعناية يمكنك الوثوق بها." },
      { title: "ابتكار علمي", body: "أبحاث متقدّمة وتركيبات حديثة." },
      { title: "تركيب مدروس", body: "كل منتج صُنع بهدف واضح وعناية فائقة." },
      { title: "جمال مسؤول", body: "نهتم بكِ وبالكوكب في كل خطوة." },
    ],

    productsEyebrow: "جميع المنتجات",
    productsTitle: "تشكيلة روزيكا الكاملة",
    productsBody:
      "كل منتجات المجموعتين، من التنظيف اليومي حتى الإصلاح العميق.",
    products: [
      { sub: "شامبو الإصلاح", collection: "إسينشالز", cta: "اعرضيه في إسينشالز" },
      { sub: "شامبو التنظيف", collection: "إسينشالز", cta: "اعرضيه في إسينشالز" },
      {
        sub: "تغذية مكثفة لجميع أنواع الشعر",
        collection: "إسينشالز",
        cta: "اعرضيه في إسينشالز",
      },
      { sub: "خالٍ من السلفات", collection: "بيور", cta: "اعرضيه في بيور" },
    ],
  },
};
