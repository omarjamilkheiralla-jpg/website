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
      "Rosica was born from a simple belief: nature has the power to heal, restore, and transform. We combine the finest botanical ingredients with advanced scientific research to create premium botanical beauty that is pure, effective, and gentle.",
    heroCta: "Discover Our Journey",

    storyEyebrow: "Our Story",
    storyTitle: "A Natural Beginning",
    storyBody: [
      "Our journey began with a desire to create clean, botanical beauty that truly works. Frustrated by harsh chemicals and empty promises, we returned to nature—where the most powerful solutions exist.",
      "Through years of research and formulation, Rosica was created to deliver visible results while respecting the health of you and the planet.",
    ],
    storyCta: "Discover Our Journey",

    philosophyEyebrow: "Our Philosophy",
    philosophyHeading: "Our philosophy",
    philosophy: [
      {
        title: "Nature First",
        body: "We begin with nature's finest ingredients, carefully selected for their proven benefits.",
      },
      {
        title: "Science Backed",
        body: "Every formula is developed through research and advanced cosmetic science.",
      },
      {
        title: "Pure & Safe",
        body: "We never compromise on purity. Our formulas are gentle, effective, and free from what your skin doesn't need.",
      },
      {
        title: "Sustainable Choice",
        body: "We care for you and the planet with responsible sourcing and eco-conscious practices.",
      },
    ],

    pillarsHeading: "How Rosica is made",
    pillars: [
      {
        eyebrow: "Nature × Science",
        title: "The Perfect Balance",
        body: "We blend botanical wisdom with scientific innovation to create formulas that deliver real results—from nature, refined by science.",
        link: "Learn More About Our Ingredients",
      },
      {
        eyebrow: "Our Manufacturing",
        title: "Crafted with Care",
        body: "Our products are manufactured in world-class facilities that follow the highest standards of quality, safety, and hygiene.",
        marks: [
          "High Quality Standards",
          "Safe & Ethical Processes",
          "Environmentally Responsible",
          "Certified GMP",
        ],
      },
      {
        eyebrow: "Quality You Can Trust",
        body: "We are committed to creating premium botanical beauty that is effective, honest, and made with a deep respect for nature and for you.",
        marks: [
          "Carefully Selected Ingredients",
          "Sulfate-Free Formulas",
          "Paraben-Free Formulas",
          "Performance You Can See",
        ],
      },
    ],

    collectionsEyebrow: "Our Collections",
    collectionsTitle: "Two Collections. Complete Care.",
    collectionsBody:
      "Discover our curated ranges, each developed with purpose, crafted with nature and refined by science.",
    collectionsCta: "View All Products",
    collections: [
      {
        name: "Rosica Essentials",
        tagline: "Nourish. Repair. Protect.",
        body: "Daily care with Honey & Propolis for stronger, healthier beauty.",
        cta: "Explore Essentials",
      },
      {
        name: "Rosica Pure",
        tagline: "Revitalize. Strengthen. Energize.",
        body: "Advanced care with Rosemary & Biotin to support natural vitality and radiance.",
        cta: "Explore Pure",
      },
    ],

    promiseEyebrow: "Our Promise to You",
    promiseHeading: "Our promise to you",
    promiseBody:
      "We are committed to creating premium botanical beauty that is effective, honest, and made with a deep respect for nature and for you.",
    promiseMarks: [
      "Botanical Haircare",
      "Thoughtful Formulas",
      "Visible Results",
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
      "وُلدت روزيكا من إيمان بسيط: أن للطبيعة قدرة على الشفاء والاستعادة والتحوّل. نجمع بين أرقى المكوّنات النباتية والأبحاث العلمية المتقدّمة لابتكار جمال نباتي فاخر، نقي وفعّال ولطيف.",
    heroCta: "اكتشفي رحلتنا",

    storyEyebrow: "قصتنا",
    storyTitle: "بداية طبيعية",
    storyBody: [
      "بدأت رحلتنا برغبة في ابتكار جمال نباتي نقي يعمل فعلًا. وبعد خيبتنا من المواد الكيميائية القاسية والوعود الفارغة، عدنا إلى الطبيعة، حيث توجد أقوى الحلول.",
      "وعبر سنوات من البحث والتركيب، وُلدت روزيكا لتمنحكِ نتائج مرئية مع احترام صحتك وصحة الكوكب.",
    ],
    storyCta: "اكتشفي رحلتنا",

    philosophyEyebrow: "فلسفتنا",
    philosophyHeading: "فلسفتنا",
    philosophy: [
      {
        title: "الطبيعة أولًا",
        body: "نبدأ بأجود ما تقدّمه الطبيعة من مكوّنات، مختارة بعناية لفوائدها المثبتة.",
      },
      {
        title: "مدعومة بالعلم",
        body: "كل تركيبة تُطوّر عبر البحث وعلوم التجميل المتقدّمة.",
      },
      {
        title: "نقية وآمنة",
        body: "لا نساوم أبدًا على النقاء. تركيباتنا لطيفة وفعّالة وخالية مما لا تحتاجه بشرتك.",
      },
      {
        title: "خيار مستدام",
        body: "نهتم بكِ وبالكوكب عبر مصادر مسؤولة وممارسات صديقة للبيئة.",
      },
    ],

    pillarsHeading: "كيف تُصنع روزيكا",
    pillars: [
      {
        eyebrow: "الطبيعة × العلم",
        title: "التوازن المثالي",
        body: "نمزج حكمة النبات بالابتكار العلمي لابتكار تركيبات تمنح نتائج حقيقية، من الطبيعة ومصقولة بالعلم.",
        link: "اعرفي المزيد عن مكوّناتنا",
      },
      {
        eyebrow: "تصنيعنا",
        title: "صُنعت بعناية",
        body: "تُصنع منتجاتنا في منشآت عالمية المستوى تلتزم بأعلى معايير الجودة والسلامة والنظافة.",
        marks: [
          "معايير جودة عالية",
          "عمليات آمنة وأخلاقية",
          "مسؤولية تجاه البيئة",
          "معتمدة GMP",
        ],
      },
      {
        eyebrow: "جودة تثقين بها",
        body: "نلتزم بابتكار جمال نباتي فاخر، فعّال وصادق، ومصنوع باحترام عميق للطبيعة ولكِ.",
        marks: [
          "مكوّنات مختارة بعناية",
          "خالية من السلفات",
          "خالية من البارابين",
          "أداء ترينه بعينيك",
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
