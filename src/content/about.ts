import type { Localised } from "@/lib/i18n";

export type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroCta: string;

  storyEyebrow: string;
  storyTitle: string;
  storyBody: string[];
  storyCta: string;

  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophy: { title: string; body: string }[];

  pillarsHeading: string;
  /** Nature × Science, Manufacturing, Quality — order matters. */
  pillars: {
    eyebrow: string;
    title?: string;
    body: string;
    link?: string;
    marks?: string[];
  }[];

  collectionsEyebrow: string;
  collectionsTitle: string;
  collectionsBody: string;
  collectionsCta: string;
  /** Essentials then Pure. */
  collections: { name: string; tagline: string; body: string; cta: string }[];

  promiseEyebrow: string;
  promiseHeading: string;
  promiseBody: string;
  promiseMarks: string[];
};

export const aboutCopy: Localised<AboutCopy> = {
  en: {
    metaTitle: "About Rosica | Rooted in Nature. Driven by Science.",
    metaDescription:
      "Rosica combines the finest botanical ingredients with advanced scientific research to create premium botanical beauty that is pure, effective, and gentle.",
    eyebrow: "About Rosica",
    title: "Rooted in Nature. Driven by Science.",
    intro:
      "Rosica was born from a belief in the potential of nature, thoughtfully refined through modern cosmetic science. We bring together carefully selected botanical ingredients and considered formulation to create premium natural beauty designed for everyday care.",
    heroCta: "Discover Our Journey",

    storyEyebrow: "Our Story",
    storyTitle: "A Natural Beginning",
    storyBody: [
      "Rosica began with a passion for botanical knowledge and a vision of creating beauty products that bring nature and modern cosmetic science together with purpose.",
      "Built on learning, curiosity, and a commitment to thoughtful formulation, Rosica was created to offer considered beauty care inspired by nature and refined through science.",
    ],
    storyCta: "Discover Our Journey",

    philosophyEyebrow: "Our Philosophy",
    philosophyHeading: "Our philosophy",
    philosophy: [
      {
        title: "Nature First",
        body: "We thoughtfully select botanical ingredients for their quality and role within our formulations.",
      },
      {
        title: "Science-Backed",
        body: "Every formula brings botanical ingredients together with modern cosmetic science and thoughtful formulation.",
      },
      {
        title: "Thoughtful Formulation",
        body: "Every product is developed with purpose, balancing carefully selected ingredients with performance and everyday care.",
      },
      {
        title: "Quality with Purpose",
        body: "From formulation to presentation, we approach every Rosica product with care, attention, and a commitment to quality.",
      },
    ],

    pillarsHeading: "How Rosica is made",
    pillars: [
      {
        eyebrow: "Nature × Science",
        title: "The Perfect Balance",
        body: "We bring botanical knowledge together with modern cosmetic science to create thoughtfully formulated beauty care—inspired by nature and refined through science.",
        link: "Learn More About Our Ingredients",
      },
      {
        eyebrow: "Our Manufacturing",
        title: "Crafted with Care",
        body: "Our products are manufactured in a GMP-certified facility, with careful attention to quality, safety, and hygiene throughout the manufacturing process.",
        marks: [
          "High Quality Standards",
          "Controlled Manufacturing Processes",
          "Quality-Controlled Production",
          "Certified GMP",
        ],
      },
      {
        eyebrow: "Quality You Can Trust",
        body: "We are committed to creating premium botanical beauty through thoughtful formulation, carefully selected ingredients, and consistent attention to quality.",
        /*
          Sulfate-free was here as a brand-wide claim and is not one: the
          Purifying & Fresh Cleanse Shampoo's label does not carry it. Silicone-
          free does appear on every pack, so it stands in.
        */
        marks: [
          "Carefully Selected Ingredients",
          "Silicone-Free Formulas",
          "Paraben-Free Formulas",
          "Thoughtful Formulation",
        ],
      },
    ],

    collectionsEyebrow: "Our Collections",
    collectionsTitle: "Two Collections. One Beginning.",
    collectionsBody:
      "Discover our first two collections, each thoughtfully developed with purpose, inspired by nature and refined through science.",
    collectionsCta: "View All Products",
    collections: [
      {
        name: "Rosica Essentials",
        tagline: "Nourish. Repair. Protect.",
        body: "Everyday hair care created to cleanse, nourish, condition, and support beautifully cared-for hair.",
        cta: "Explore Essentials",
      },
      {
        name: "Rosica Pure",
        tagline: "Gentle. Restore. Renew.",
        body: "Gentle botanical hair care created to cleanse, refresh, and support soft, naturally radiant hair.",
        cta: "Explore Pure",
      },
    ],

    promiseEyebrow: "Our Promise to You",
    promiseHeading: "Our promise to you",
    promiseBody:
      "Our promise is thoughtful beauty care—guided by botanical knowledge, refined through modern cosmetic science, and created with uncompromising attention to quality.",
    promiseMarks: [
      "Botanical Beauty",
      "Thoughtful Formulas",
      "Purposeful Care",
      "Inspired by Nature",
    ],
  },

  ar: {
    metaTitle: "عن روزيكا | متجذّرة في الطبيعة. مدفوعة بالعلم.",
    metaDescription:
      "تجمع روزيكا بين أرقى المكوّنات النباتية والأبحاث العلمية المتقدّمة لابتكار جمال نباتي فاخر، نقي وفعّال ولطيف.",
    eyebrow: "عن روزيكا",
    title: "متجذّرة في الطبيعة. مدفوعة بالعلم.",
    intro:
      "وُلدت روزيكا من إيمان بسيط: أن للطبيعة قدرة على التجدد والاستعادة والتحوّل. نمزج بين أجود المكوّنات النباتية والابتكار العلمي المتقدّم لنقدّم عناية نباتية فاخرة، نقية وفعّالة ولطيفة.",
    heroCta: "اكتشفي رحلتنا",

    storyEyebrow: "قصتنا",
    storyTitle: "بداية طبيعية",
    storyBody: [
      "بدأت رحلتنا برغبة في ابتكار عناية نباتية نقية وفعّالة. وبعيدًا عن المكوّنات القاسية والوعود المبالغ فيها، عدنا إلى الطبيعة، حيث نجد فيها مصدر إلهامنا.",
      "ومن خلال البحث وتطوير التركيبات، وُلدت روزيكا لتقدّم عناية مدروسة ونتائج ملموسة، مع احترام الطبيعة والبيئة.",
    ],
    storyCta: "اكتشفي رحلتنا",

    philosophyEyebrow: "فلسفتنا",
    philosophyHeading: "فلسفتنا",
    philosophy: [
      {
        title: "الطبيعة أولًا",
        body: "نبدأ بأجود المكوّنات المستوحاة من الطبيعة، والمختارة بعناية لفوائدها المعروفة.",
      },
      {
        title: "العلم أساس تركيباتنا",
        body: "تُطوَّر كل تركيبة بالاستناد إلى البحث وعلوم التجميل الحديثة.",
      },
      {
        title: "نقية ومدروسة",
        body: "نولي النقاء عناية خاصة، ونطوّر تركيبات لطيفة وفعّالة بعناية.",
      },
      {
        title: "خيار مسؤول",
        body: "نهتم بالبيئة من خلال خيارات مدروسة وممارسات مسؤولة.",
      },
    ],

    pillarsHeading: "كيف تُصنع روزيكا",
    pillars: [
      {
        eyebrow: "الطبيعة × العلم",
        title: "التوازن المثالي",
        body: "نمزج خبرة المكوّنات النباتية بالابتكار العلمي لنطوّر تركيبات مدروسة تجمع بين الطبيعة والعلم.",
        link: "اعرفي المزيد عن مكوّناتنا",
      },
      {
        eyebrow: "تصنيعنا",
        title: "مصنوعة بعناية",
        body: "تُصنع منتجاتنا في منشآت عالمية المستوى تلتزم بأعلى معايير الجودة والسلامة والنظافة.",
        marks: [
          "معايير جودة عالية",
          "ممارسات مسؤولة ومدروسة",
          "مسؤولية تجاه البيئة",
          "تصنيع وفق معايير GMP",
        ],
      },
      {
        eyebrow: "جودة تثقين بها",
        body: "نلتزم بابتكار جمال نباتي فاخر، فعّال وصادق، ومصنوع باحترام عميق للطبيعة ولكِ.",
        marks: [
          "مكوّنات مختارة بعناية",
          "خالية من السيليكون",
          "خالية من البارابين",
          "عناية بأداء مدروس",
        ],
      },
    ],

    collectionsEyebrow: "مجموعاتنا",
    collectionsTitle: "مجموعتان. عناية متكاملة.",
    collectionsBody:
      "اكتشفي تشكيلاتنا المنتقاة، كل واحدة طُوّرت بهدف واضح، وصُنعت من الطبيعة وصُقلت بالعلم.",
    collectionsCta: "تصفّحي جميع المنتجات",
    collections: [
      {
        name: "روزيكا إسينشالز",
        tagline: "تغذية. إصلاح. حماية.",
        body: "عناية يومية بالعسل والبروبوليس لجمال أقوى وأكثر صحة.",
        cta: "استكشفي إسينشالز",
      },
      {
        name: "روزيكا بيور",
        tagline: "تنشيط. تقوية. حيوية.",
        body: "عناية متقدّمة بإكليل الجبل والبيوتين لدعم الحيوية والإشراق الطبيعي.",
        cta: "استكشفي بيور",
      },
    ],

    promiseEyebrow: "وعدنا لكِ",
    promiseHeading: "وعدنا لكِ",
    promiseBody:
      "نلتزم بابتكار جمال نباتي فاخر، فعّال وصادق، ومصنوع باحترام عميق للطبيعة ولكِ.",
    promiseMarks: [
      "عناية نباتية بالشعر",
      "تركيبات مدروسة",
      "نتائج مرئية",
      "مستوحاة من الطبيعة",
    ],
  },
};
