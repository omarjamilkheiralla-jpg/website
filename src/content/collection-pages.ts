import type { Localised } from "@/lib/i18n";

/**
 * Shared shape for the two collection detail pages. Benefits and standards are
 * fixed-length, fixed-order lists; the views pair them with icons and
 * photography by index so only words live here.
 */
export type CollectionPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Hero icon row. */
  features: string[];
  benefitsHeading: string;
  benefits: { title: string; body: string }[];
  promiseHeading: string;
  promiseBody: string[];
  standards: string[];
  statement: string[];
  heroCta: string;
};

export const essentialsCopy: Localised<CollectionPageCopy> = {
  en: {
    metaTitle: "Rosica Essentials | Daily Botanical Care",
    metaDescription:
      "Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect for healthy, beautiful hair every day.",
    eyebrow: "Collection 01",
    title: "Rosica Essentials",
    intro:
      "Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect for healthy, beautiful hair every day.",
    features: ["Protect", "Strengthen", "Balance"],
    benefitsHeading: "Collection benefits",
    benefits: [
      {
        title: "Natural & Gentle",
        body: "Formulated with carefully selected botanical ingredients to be gentle on your hair and scalp every day.",
      },
      {
        title: "Effective Results",
        body: "Advanced botanicals work in harmony to cleanse, nourish, and strengthen from root to tip.",
      },
      {
        title: "For All Hair Types",
        body: "Balanced formulations suitable for all hair types, including color-treated and chemically treated hair.",
      },
      {
        title: "Conscious by Nature",
        body: "Created with care for you and the planet using responsible and sustainable practices.",
      },
    ],
    promiseHeading: "The Rosica Essentials Promise",
    promiseBody: [
      "We believe beautiful hair begins with gentle care and powerful botanicals. Our Essentials collection brings together the best of nature and science to deliver visible results you can feel every day.",
    ],
    /*
      Taken from the printed labels, which are the authority. "Mineral Oil-Free"
      used to sit here and appears on no pack; "Colorant-Free" does, on every
      one. Sulfate-free is deliberately absent from this list: the Honey &
      Propolis Repair Shampoo is sulfate-free but the Purifying & Fresh Cleanse
      Shampoo is not, so it cannot be claimed for the collection as a whole.
    */
    standards: [
      "Paraben-Free Formulas",
      "Silicone-Free Formulas",
      "Colorant-Free Formulas",
      "Inspired by Nature",
    ],
    statement: ["Rooted in nature.", "Refined by science.", "Made for you."],
    heroCta: "View All Essentials",
  },
  ar: {
    metaTitle: "روزيكا إسينشالز | العناية النباتية اليومية",
    metaDescription:
      "أساسيات العناية اليومية بقوة الطبيعة. تركيبات لطيفة وفعّالة تنظّف وتغذّي وتحمي لشعر صحي وجميل كل يوم.",
    eyebrow: "المجموعة الأولى",
    title: "روزيكا إسينشالز",
    intro:
      "أساسيات العناية اليومية بقوة الطبيعة. تركيبات لطيفة وفعّالة تنظّف وتغذّي وتحمي، لشعر صحي وجميل كل يوم.",
    features: ["حماية", "تقوية", "توازن"],
    benefitsHeading: "مزايا المجموعة",
    benefits: [
      {
        title: "طبيعية ولطيفة",
        body: "مصمّمة بمكوّنات نباتية مختارة بعناية لتكون لطيفة على شعرك وفروة رأسك كل يوم.",
      },
      {
        title: "نتائج فعّالة",
        body: "تتناغم المكوّنات النباتية المتطوّرة لتنظّف وتغذّي وتقوّي الشعر من الجذور حتى الأطراف.",
      },
      {
        title: "لجميع أنواع الشعر",
        body: "تركيبات متوازنة تناسب جميع أنواع الشعر، بما في ذلك المصبوغ والمعالج كيميائيًا.",
      },
      {
        title: "وعي من الطبيعة",
        body: "صُنعت باهتمام بكِ وبالكوكب، وفق ممارسات مسؤولة ومستدامة.",
      },
    ],
    promiseHeading: "وعد روزيكا إسينشالز",
    promiseBody: [
      "نؤمن بأن جمال الشعر يبدأ من العناية اللطيفة والمكوّنات النباتية الفعّالة. تجمع مجموعة إسينشالز أفضل ما في الطبيعة والعلم لتمنحكِ نتائج مرئية تشعرين بها كل يوم.",
    ],
    standards: [
      "خالية من البارابين",
      "خالية من السيليكون",
      "خالية من الملوّنات",
      "مستوحاة من الطبيعة",
    ],
    statement: ["متجذّرة في الطبيعة.", "مصقولة بالعلم.", "صُنعت من أجلك."],
    heroCta: "تصفّحي إسينشالز",
  },
};

export const pureCopy: Localised<CollectionPageCopy> = {
  en: {
    metaTitle: "Rosica Pure | Advanced Botanical Care",
    metaDescription:
      "Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience.",
    eyebrow: "Collection 02",
    title: "Rosica Pure",
    intro:
      "Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience.",
    features: ["Pure", "Clean", "Restore", "Revitalize"],
    benefitsHeading: "Collection benefits",
    benefits: [
      {
        title: "Minimal & Pure",
        body: "Sulfate-free formulations powered by carefully selected botanical ingredients.",
      },
      {
        title: "Effective Botanicals",
        body: "Advanced botanical complexes work in harmony to nourish, strengthen, and restore.",
      },
      {
        title: "Scalp & Hair Care",
        body: "Thoughtfully developed to support scalp comfort and promote the look of healthy, beautiful hair.",
      },
      {
        title: "Conscious by Nature",
        body: "Created with care for you and the planet using responsible and sustainable practices.",
      },
    ],
    promiseHeading: "The Rosica Pure Promise",
    promiseBody: [
      "We combine the purity of nature with scientific innovation to create high-performance formulations that respect your hair and the planet.",
      "Pure care. Visible results. Made for you.",
    ],
    standards: [
      "Sulfate-Free Formulas",
      "Paraben-Free Formulas",
      "Silicone-Free Formulas",
      "Inspired by Nature",
    ],
    statement: ["Pure ingredients.", "Powerful results.", "Naturally beautiful."],
    heroCta: "View All Pure Products",
  },
  ar: {
    metaTitle: "روزيكا بيور | العناية النباتية المتقدّمة",
    metaDescription:
      "نقية وبسيطة وفعّالة. عناية خالية من السلفات بمكوّنات نباتية متطوّرة لتجربة جمال أكثر صحة.",
    eyebrow: "المجموعة الثانية",
    title: "روزيكا بيور",
    intro:
      "نقية وبسيطة وفعّالة. عناية خالية من السلفات بمكوّنات نباتية متطوّرة لتجربة جمال أكثر صحة.",
    features: ["نقاء", "نظافة", "استعادة", "تنشيط"],
    benefitsHeading: "مزايا المجموعة",
    benefits: [
      {
        title: "بساطة ونقاء",
        body: "تركيبات خالية من السلفات بقوة مكوّنات نباتية مختارة بعناية.",
      },
      {
        title: "مكوّنات نباتية فعّالة",
        body: "تتناغم المركّبات النباتية المتطوّرة لتغذّي الشعر وتقوّيه وتعيد إليه حيويته.",
      },
      {
        title: "عناية بالشعر وفروة الرأس",
        body: "طُوّرت بعناية لدعم راحة فروة الرأس وإبراز مظهر الشعر الصحي والجميل.",
      },
      {
        title: "وعي من الطبيعة",
        body: "صُنعت باهتمام بكِ وبالكوكب، وفق ممارسات مسؤولة ومستدامة.",
      },
    ],
    promiseHeading: "وعد روزيكا بيور",
    promiseBody: [
      "نجمع بين نقاء الطبيعة والابتكار العلمي لابتكار تركيبات عالية الأداء تحترم شعرك وتحترم الكوكب.",
      "عناية نقية. نتائج مرئية. صُنعت من أجلك.",
    ],
    standards: [
      "خالية من السلفات",
      "خالية من البارابين",
      "خالية من السيليكون",
      "مستوحاة من الطبيعة",
    ],
    statement: ["مكوّنات نقية.", "نتائج قوية.", "جمال طبيعي."],
    heroCta: "تصفّحي منتجات بيور",
  },
};
