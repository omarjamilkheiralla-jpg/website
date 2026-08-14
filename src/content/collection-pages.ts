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
      "Daily care essentials inspired by nature. Gentle, effective formulations designed to cleanse, nourish, and protect for soft, healthy-looking hair every day.",
    eyebrow: "Collection 01",
    title: "Rosica Essentials",
    intro:
      "Daily care essentials inspired by nature. Gentle, effective formulations designed to cleanse, nourish, and protect for soft, healthy-looking hair every day.",
    features: ["Nourish", "Cleanse", "Repair"],
    benefitsHeading: "Collection benefits",
    benefits: [
      {
        title: "Natural & Gentle",
        body: "Formulated with carefully selected botanical ingredients for gentle, everyday hair and scalp care.",
      },
      {
        title: "Effective Care",
        body: "Thoughtfully formulated ingredients work together to cleanse, nourish, condition, and care for your hair.",
      },
      {
        title: "For All Hair Types",
        body: "Thoughtfully developed formulas designed to support a variety of hair care needs.",
      },
      {
        title: "Conscious by Nature",
        body: "Created with thoughtful choices and consideration for people.",
      },
    ],
    promiseHeading: "The Rosica Essentials Promise",
    promiseBody: [
      "We believe beautiful hair begins with thoughtful care. The Rosica Essentials collection combines carefully selected ingredients with modern cosmetic science to support your everyday hair care routine.",
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
      "أساسيات للعناية اليومية، مستوحاة من الطبيعة. تركيبات مدروسة تنظّف وتغذّي وتعتني بالشعر، لتمنحه مظهرًا ناعمًا وحيويًا كل يوم.",
    features: ["حماية", "عناية", "توازن"],
    benefitsHeading: "مزايا المجموعة",
    benefits: [
      {
        title: "طبيعية ولطيفة",
        body: "مصمّمة بمكوّنات نباتية مختارة بعناية لتكون لطيفة على شعرك وفروة رأسك كل يوم.",
      },
      {
        title: "عناية فعّالة",
        body: "تجمع تركيباتنا بين مكوّنات نباتية مختارة وتقنيات حديثة للعناية بالشعر، لتنظيفه وتغذيته والعناية به من الجذور حتى الأطراف.",
      },
      {
        title: "لجميع أنواع الشعر",
        body: "تركيبات متوازنة تناسب جميع أنواع الشعر.",
      },
      {
        title: "عناية واعية",
        body: "صُممت بعناية، مع مراعاة الإنسان في كل اختيار.",
      },
    ],
    promiseHeading: "وعد روزيكا إسينشالز",
    promiseBody: [
      "نؤمن بأن جمال الشعر يبدأ بعناية مدروسة ومكوّنات مختارة بعناية. تجمع مجموعة روزيكا إسينشالز بين المكوّنات النباتية وتقنيات العناية الحديثة لتمنح شعرك عناية متوازنة في روتينك اليومي.",
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
      "Pure, minimal, and thoughtfully formulated. Sulfate-free care with carefully selected botanical ingredients for gentle, effective everyday hair care.",
    eyebrow: "Collection 02",
    title: "Rosica Pure",
    intro:
      "Pure, minimal, and thoughtfully formulated. Sulfate-free care with carefully selected botanical ingredients for gentle, effective everyday hair care.",
    features: ["Gentle", "Cleanse", "Restore", "Refresh"],
    benefitsHeading: "Collection benefits",
    benefits: [
      {
        title: "Minimal & Pure",
        body: "A sulfate-free formula made with carefully selected botanical ingredients for gentle everyday care.",
      },
      {
        title: "Selected Botanicals",
        body: "A thoughtful blend of botanical ingredients and modern hair care technology helps leave hair feeling soft, smooth, refreshed, and cared for.",
      },
      {
        title: "Scalp & Hair Care",
        body: "Thoughtfully developed to support scalp comfort and promote the look of healthy, beautiful hair.",
      },
      {
        title: "Conscious by Nature",
        body: "Created with thoughtful choices and consideration for people.",
      },
    ],
    promiseHeading: "The Rosica Pure Promise",
    promiseBody: [
      "The Rosica PURE collection brings together carefully selected ingredients and modern cosmetic science to create gentle, thoughtfully formulated hair care for your everyday routine.",
      "Pure care. Thoughtfully made for you.",
    ],
    standards: [
      "Sulfate-Free Formulas",
      "Paraben-Free Formulas",
      "Silicone-Free Formulas",
      "Inspired by Nature",
    ],
    statement: ["Thoughtful ingredients.", "Refined by science.", "Naturally beautiful."],
    heroCta: "View All Pure Products",
  },
  ar: {
    metaTitle: "روزيكا بيور | العناية النباتية المتقدّمة",
    metaDescription:
      "نقية وبسيطة وفعّالة. عناية خالية من السلفات بمكوّنات نباتية متطوّرة لتجربة جمال أكثر صحة.",
    eyebrow: "المجموعة الثانية",
    title: "روزيكا بيور",
    intro:
      "نقية وبسيطة ومدروسة بعناية. تركيبة خالية من السلفات بمكوّنات نباتية مختارة بعناية، لعناية يومية لطيفة وفعّالة بالشعر.",
    features: ["نقاء", "تنظيف", "عناية", "انتعاش"],
    benefitsHeading: "مزايا المجموعة",
    benefits: [
      {
        title: "بساطة ونقاء",
        body: "تركيبة خالية من السلفات، بمكوّنات نباتية مختارة بعناية، لعناية يومية لطيفة.",
      },
      {
        title: "مكوّنات نباتية مختارة",
        body: "مزيج مدروس من المكوّنات النباتية وتقنيات العناية الحديثة، يساعد على منح الشعر ملمسًا ناعمًا وانسيابيًا وإحساسًا بالانتعاش.",
      },
      {
        title: "عناية بالشعر وفروة الرأس",
        body: "طُوّرت بعناية لدعم راحة فروة الرأس وإبراز مظهر الشعر الصحي والجميل.",
      },
      {
        title: "عناية واعية",
        body: "صُممت بعناية، مع مراعاة الإنسان في كل اختيار.",
      },
    ],
    promiseHeading: "وعد روزيكا بيور",
    promiseBody: [
      "تجمع مجموعة روزيكا بيور بين مكوّنات مختارة بعناية وعلوم التجميل الحديثة، لتقديم عناية لطيفة ومدروسة بالشعر تناسب روتينك اليومي.",
      "عناية نقية. مدروسة بعناية. صُنعت من أجلك.",
    ],
    standards: [
      "تركيبة خالية من السلفات",
      "تركيبة خالية من البارابين",
      "تركيبة خالية من السيليكون",
      "مستوحاة من الطبيعة",
    ],
    statement: ["مكوّنات مختارة بعناية.", "مصقولة بالعلم.", "جمال مستوحى من الطبيعة."],
    heroCta: "تصفّحي منتجات بيور",
  },
};
