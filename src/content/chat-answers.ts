import type { Locale, Localised } from "@/lib/i18n";

/**
 * The assistant's question bank.
 *
 * Every answer here is drawn from copy that already exists on the site — the
 * About page, the two collection pages, the Ingredient Library and the contact
 * details. Nothing is invented, and nothing claims more than the brand claims
 * for itself: no product treats, prevents or cures anything, and where the site
 * has not published something (prices, stockists, delivery) the answer says so
 * and points at the team rather than guessing.
 *
 * Structure and translations live together on purpose. An earlier shape kept a
 * separate array per locale, which made it possible for the two to drift out of
 * step by one entry and quietly mismatch every question after it. Here each
 * question is one object carrying both languages, so they cannot come apart.
 */

export type TopicId = "products" | "ingredients" | "brand" | "buying" | "help";

export type Question = {
  id: string;
  topic: TopicId;
  /** The button label. */
  q: Localised<string>;
  /** Answer paragraphs. */
  a: Localised<string[]>;
  /** Optional "read more" link. Href is authored in English and localised at render. */
  link?: { href: string; label: Localised<string> };
  /** Questions offered as follow-ups once this one has been answered. */
  next?: string[];
};

export const topics: { id: TopicId; label: Localised<string> }[] = [
  {
    id: "products",
    label: { en: "Products & collections", ar: "المنتجات والمجموعات" },
  },
  { id: "ingredients", label: { en: "Ingredients", ar: "المكوّنات" } },
  { id: "brand", label: { en: "About Rosica", ar: "عن روزيكا" } },
  { id: "buying", label: { en: "Buying & delivery", ar: "الشراء والتوصيل" } },
  { id: "help", label: { en: "Talk to us", ar: "تواصلي معنا" } },
];

export const questions: Question[] = [
  // ---------------------------------------------------------------- products
  {
    id: "range",
    topic: "products",
    q: { en: "What does Rosica make?", ar: "ماذا تقدّم روزيكا؟" },
    a: {
      en: [
        "Rosica makes botanical haircare — four products across two collections.",
        "Rosica Essentials is the daily range: the Honey & Propolis Repair Shampoo, the Purifying & Fresh Cleanse Shampoo and the Deep Repair Conditioner. Rosica PURE is the advanced range, with the sulfate-free Botanical Restore Shampoo.",
      ],
      ar: [
        "تقدّم روزيكا عناية نباتية بالشعر — أربعة منتجات ضمن مجموعتين.",
        "روزيكا إسينشالز هي مجموعة العناية اليومية: شامبو Honey & Propolis Repair، وشامبو Purifying & Fresh Cleanse، وبلسم Deep Repair. وروزيكا بيور هي المجموعة المتقدّمة، وتضم شامبو Botanical Restore الخالي من السلفات.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "See all products", ar: "تصفّحي جميع المنتجات" },
    },
    next: ["collections-diff", "sulfate-free", "conditioner"],
  },
  {
    id: "collections-diff",
    topic: "products",
    q: {
      en: "What's the difference between Essentials and PURE?",
      ar: "ما الفرق بين إسينشالز وبيور؟",
    },
    a: {
      en: [
        "Essentials is everyday care: gentle, effective formulations that cleanse, nourish and protect, balanced to suit all hair types including colour-treated and chemically treated hair.",
        "PURE is the purer, more minimal range — sulfate-free care with advanced botanical complexes, developed to support scalp comfort and the look of healthy hair.",
      ],
      ar: [
        "إسينشالز هي العناية اليومية: تركيبات لطيفة وفعّالة تنظّف وتغذّي وتحمي، ومتوازنة لتناسب جميع أنواع الشعر بما فيها المصبوغ والمعالج كيميائيًا.",
        "أما بيور فهي المجموعة الأنقى والأبسط — عناية خالية من السلفات بمركّبات نباتية متطوّرة، طُوّرت لدعم راحة فروة الرأس ومظهر الشعر الصحي.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "Compare the collections", ar: "قارني بين المجموعتين" },
    },
    next: ["sulfate-free", "coloured-hair", "damaged-hair"],
  },
  {
    id: "sulfate-free",
    topic: "products",
    q: { en: "Which products are sulfate-free?", ar: "أي المنتجات خالية من السلفات؟" },
    a: {
      en: [
        "Rosica PURE is the sulfate-free line — the Botanical Restore Shampoo is formulated without sulfates.",
        "Across both collections, every Rosica formula is free from parabens and silicones.",
      ],
      ar: [
        "روزيكا بيور هي المجموعة الخالية من السلفات — شامبو Botanical Restore مركّب دون سلفات.",
        "وفي المجموعتين معًا، كل تركيبة من روزيكا خالية من البارابين والسيليكون.",
      ],
    },
    link: {
      href: "/collections/pure",
      label: { en: "Explore PURE", ar: "استكشفي بيور" },
    },
    next: ["free-from", "collections-diff"],
  },
  {
    id: "damaged-hair",
    topic: "products",
    q: {
      en: "My hair feels dry or damaged — where should I start?",
      ar: "شعري جاف أو متضرّر — من أين أبدأ؟",
    },
    a: {
      en: [
        "The Essentials collection is built around repair. The Honey & Propolis Repair Shampoo pairs naturally with the Deep Repair Conditioner, which is made for intense nourishment across all hair types.",
        "If you'd like a recommendation for your particular hair, our team is happy to help — just email us and describe what you're working with.",
      ],
      ar: [
        "مجموعة إسينشالز مبنية حول الإصلاح. يتناغم شامبو Honey & Propolis Repair مع بلسم Deep Repair، المصمّم لتغذية مكثّفة تناسب جميع أنواع الشعر.",
        "وإن أردتِ توصية تناسب شعرك تحديدًا، يسعد فريقنا بمساعدتك — راسلينا واذكري حالة شعرك.",
      ],
    },
    link: {
      href: "/collections/essentials",
      label: { en: "Explore Essentials", ar: "استكشفي إسينشالز" },
    },
    next: ["contact", "coloured-hair"],
  },
  {
    id: "coloured-hair",
    topic: "products",
    q: {
      en: "Can I use these on coloured or treated hair?",
      ar: "هل يمكنني استخدامها على شعر مصبوغ أو معالج؟",
    },
    a: {
      en: [
        "Yes. The Essentials formulations are balanced to suit all hair types, including colour-treated and chemically treated hair.",
        "If you have a sensitivity or a specific concern, it's always worth checking the ingredients on the pack and speaking to your stylist or a dermatologist first.",
      ],
      ar: [
        "نعم. تركيبات إسينشالز متوازنة لتناسب جميع أنواع الشعر، بما في ذلك المصبوغ والمعالج كيميائيًا.",
        "وإن كانت لديك حساسية أو حالة معيّنة، يُستحسن دائمًا مراجعة المكوّنات على العبوة واستشارة مصفّف شعرك أو طبيب الجلدية أولًا.",
      ],
    },
    next: ["free-from", "damaged-hair"],
  },
  {
    id: "conditioner",
    topic: "products",
    q: { en: "Do you make a conditioner?", ar: "هل لديكم بلسم؟" },
    a: {
      en: [
        "Yes — the Deep Repair Conditioner, part of Rosica Essentials. It's made for intense nourishment and suits all hair types.",
      ],
      ar: [
        "نعم — بلسم Deep Repair، ضمن مجموعة روزيكا إسينشالز. صُمّم لتغذية مكثّفة ويناسب جميع أنواع الشعر.",
      ],
    },
    link: {
      href: "/collections/essentials",
      label: { en: "Explore Essentials", ar: "استكشفي إسينشالز" },
    },
    next: ["range", "where-buy"],
  },

  // ------------------------------------------------------------- ingredients
  {
    id: "ingredients-all",
    topic: "ingredients",
    q: { en: "What botanicals do you use?", ar: "ما المكوّنات النباتية التي تستخدمونها؟" },
    a: {
      en: [
        "Four botanicals sit at the heart of the formulations: honey, propolis, aloe vera and rosemary.",
        "Each is chosen for a specific role, and the Ingredient Library explains their traditional uses and cosmetic benefits in full.",
      ],
      ar: [
        "أربعة مكوّنات نباتية في قلب التركيبات: العسل، والبروبوليس، والألوفيرا، وإكليل الجبل.",
        "لكل منها دور محدّد، وتشرح مكتبة المكوّنات استخداماتها التقليدية وفوائدها التجميلية بالتفصيل.",
      ],
    },
    link: {
      href: "/ingredients",
      label: { en: "Open the Ingredient Library", ar: "افتحي مكتبة المكوّنات" },
    },
    next: ["honey", "propolis", "aloe", "rosemary"],
  },
  {
    id: "honey",
    topic: "ingredients",
    q: { en: "What does honey do?", ar: "ما فائدة العسل؟" },
    a: {
      en: ["Honey is a natural humectant, rich in sugars that help the hair retain moisture."],
      ar: ["العسل مرطّب طبيعي، غني بالسكريات التي تساعد الشعر على الاحتفاظ بالرطوبة."],
    },
    next: ["propolis", "aloe", "rosemary"],
  },
  {
    id: "propolis",
    topic: "ingredients",
    q: { en: "What does propolis do?", ar: "ما فائدة البروبوليس؟" },
    a: {
      en: ["Propolis is known for its protective and soothing properties."],
      ar: ["يُعرف البروبوليس بخصائصه الواقية والمهدّئة."],
    },
    next: ["honey", "aloe", "rosemary"],
  },
  {
    id: "aloe",
    topic: "ingredients",
    q: { en: "What does aloe vera do?", ar: "ما فائدة الألوفيرا؟" },
    a: {
      en: ["Aloe vera helps to hydrate and soothe, and supports scalp comfort."],
      ar: ["تساعد الألوفيرا على الترطيب والتهدئة، وتدعم راحة فروة الرأس."],
    },
    next: ["honey", "propolis", "rosemary"],
  },
  {
    id: "rosemary",
    topic: "ingredients",
    q: { en: "What does rosemary do?", ar: "ما فائدة إكليل الجبل؟" },
    a: {
      en: ["Rosemary has traditionally been used to help revitalise and strengthen hair."],
      ar: ["يُستخدم إكليل الجبل تقليديًا للمساعدة على تنشيط الشعر وتقويته."],
    },
    next: ["honey", "propolis", "aloe"],
  },
  {
    id: "free-from",
    topic: "ingredients",
    q: { en: "What are the formulas free from?", ar: "مما تخلو التركيبات؟" },
    a: {
      en: [
        "Every Rosica formula is free from parabens, silicones and mineral oils. The PURE collection is sulfate-free as well.",
        "For the complete ingredient list of a particular product, the pack carries it in full — and we're glad to answer any specific question by email.",
      ],
      ar: [
        "كل تركيبة من روزيكا خالية من البارابين والسيليكون والزيوت المعدنية. ومجموعة بيور خالية من السلفات أيضًا.",
        "أما قائمة المكوّنات الكاملة لمنتج معيّن فتجدينها على العبوة — ويسعدنا الإجابة عن أي سؤال محدّد عبر البريد الإلكتروني.",
      ],
    },
    next: ["sulfate-free", "contact"],
  },

  // ------------------------------------------------------------------- brand
  {
    id: "who",
    topic: "brand",
    q: { en: "Who are Rosica?", ar: "من هي روزيكا؟" },
    a: {
      en: [
        "Rosica was born from a simple belief: that nature has the power to heal, restore and transform.",
        "The brand combines botanical ingredients with cosmetic science to make premium botanical beauty that is pure, effective and gentle — rooted in nature, refined by science.",
      ],
      ar: [
        "وُلدت روزيكا من إيمان بسيط: أن للطبيعة قدرة على الشفاء والاستعادة والتحوّل.",
        "تجمع العلامة بين المكوّنات النباتية وعلوم التجميل لابتكار جمال نباتي فاخر، نقي وفعّال ولطيف — متجذّر في الطبيعة، مصقول بالعلم.",
      ],
    },
    link: { href: "/about", label: { en: "Read our story", ar: "اقرئي قصتنا" } },
    next: ["how-made", "sustainability", "where-based"],
  },
  {
    id: "where-based",
    topic: "brand",
    q: { en: "Where are you based?", ar: "أين مقرّكم؟" },
    a: {
      en: [
        "Rosica is based in Dubai — Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, United Arab Emirates.",
      ],
      ar: [
        "مقر روزيكا في دبي — ميدان جراندستاند، الطابق السادس، شارع ميدان، ند الشبا، الإمارات العربية المتحدة.",
      ],
    },
    next: ["contact", "hours"],
  },
  {
    id: "how-made",
    topic: "brand",
    q: { en: "How are the products made?", ar: "كيف تُصنع المنتجات؟" },
    a: {
      en: [
        "Rosica products are manufactured in world-class facilities that follow the highest standards of quality, safety and hygiene, and the manufacturing is GMP certified.",
        "Every formula is developed through research and advanced cosmetic science, starting from carefully selected botanical ingredients.",
      ],
      ar: [
        "تُصنع منتجات روزيكا في منشآت عالمية المستوى تلتزم بأعلى معايير الجودة والسلامة والنظافة، والتصنيع معتمد وفق GMP.",
        "وتُطوَّر كل تركيبة عبر البحث وعلوم التجميل المتقدّمة، انطلاقًا من مكوّنات نباتية مختارة بعناية.",
      ],
    },
    link: { href: "/about", label: { en: "How Rosica is made", ar: "كيف تُصنع روزيكا" } },
    next: ["sustainability", "free-from"],
  },
  {
    id: "sustainability",
    topic: "brand",
    q: { en: "Is Rosica sustainable?", ar: "هل روزيكا مستدامة؟" },
    a: {
      en: [
        "Sustainability is one of the brand's four principles: caring for you and the planet through responsible sourcing and eco-conscious practices.",
        "The manufacturing is described as environmentally responsible, with safe and ethical processes.",
      ],
      ar: [
        "الاستدامة أحد مبادئ العلامة الأربعة: الاهتمام بكِ وبالكوكب عبر مصادر مسؤولة وممارسات صديقة للبيئة.",
        "ويوصف التصنيع بأنه مسؤول تجاه البيئة، بعمليات آمنة وأخلاقية.",
      ],
    },
    link: { href: "/about", label: { en: "Read our promise", ar: "اقرئي وعدنا" } },
    next: ["how-made", "who"],
  },

  // ------------------------------------------------------------------ buying
  {
    id: "where-buy",
    topic: "buying",
    q: { en: "Where can I buy Rosica?", ar: "أين يمكنني شراء روزيكا؟" },
    a: {
      en: [
        "Our official store and retail partner listings are still on their way — that page isn't published yet.",
        "In the meantime, email us and we'll tell you exactly how to get hold of the products.",
      ],
      ar: [
        "متجرنا الرسمي وقائمة متاجر التجزئة ما زالت قيد الإعداد — تلك الصفحة لم تُنشر بعد.",
        "في هذه الأثناء، راسلينا وسنخبرك تحديدًا بكيفية الحصول على المنتجات.",
      ],
    },
    next: ["contact", "shipping"],
  },
  {
    id: "prices",
    topic: "buying",
    q: { en: "How much do the products cost?", ar: "كم تبلغ أسعار المنتجات؟" },
    a: {
      en: [
        "Prices aren't published on the site yet, so I can't quote you one — I'd rather send you to the team than guess.",
        "Email us and you'll get current pricing straight from them.",
      ],
      ar: [
        "الأسعار لم تُنشر على الموقع بعد، لذا لا أستطيع ذكر سعر — وأفضّل تحويلك إلى الفريق بدلًا من التخمين.",
        "راسلينا وستصلك الأسعار الحالية منهم مباشرة.",
      ],
    },
    next: ["contact", "where-buy"],
  },
  {
    id: "shipping",
    topic: "buying",
    q: { en: "Do you deliver, and where to?", ar: "هل تقومون بالتوصيل، وإلى أين؟" },
    a: {
      en: [
        "Delivery areas and shipping details aren't published on the site yet, so anything I told you would be a guess.",
        "The team can confirm what's possible for your location — just drop them an email.",
      ],
      ar: [
        "مناطق التوصيل وتفاصيل الشحن لم تُنشر على الموقع بعد، لذا سيكون أي جواب مني تخمينًا.",
        "يمكن للفريق تأكيد ما هو متاح لموقعك — يكفي أن تراسليهم عبر البريد.",
      ],
    },
    next: ["contact", "where-buy"],
  },
  {
    id: "wholesale",
    topic: "buying",
    q: { en: "Can I stock Rosica in my store?", ar: "هل يمكنني بيع روزيكا في متجري؟" },
    a: {
      en: [
        "Yes — wholesale enquiries are welcome, and they go straight to the team.",
        "Email us with your business details and what you'd like to stock, and someone will come back to you within 1–2 business days.",
      ],
      ar: [
        "نعم — نرحّب باستفسارات الجملة، وتصل مباشرة إلى الفريق.",
        "راسلينا بتفاصيل نشاطك التجاري وما ترغبين في توفيره، وسيعاود أحدهم التواصل معك خلال يوم إلى يومَي عمل.",
      ],
    },
    next: ["contact"],
  },

  // -------------------------------------------------------------------- help
  {
    id: "contact",
    topic: "help",
    q: { en: "How do I contact the team?", ar: "كيف أتواصل مع الفريق؟" },
    a: {
      en: [
        "By email, at info@rosica.ae. The team aims to answer every enquiry within 1–2 business days.",
      ],
      ar: [
        "عبر البريد الإلكتروني على info@rosica.ae. ويسعى الفريق للرد على كل استفسار خلال يوم إلى يومَي عمل.",
      ],
    },
    link: { href: "/contact", label: { en: "Open the contact page", ar: "افتحي صفحة التواصل" } },
    next: ["hours", "social"],
  },
  {
    id: "hours",
    topic: "help",
    q: { en: "What are your opening hours?", ar: "ما ساعات العمل لديكم؟" },
    a: {
      en: [
        "Monday to Friday, 9:00 AM to 6:00 PM. Emails sent outside those hours are answered on the next business day.",
      ],
      ar: [
        "من الاثنين إلى الجمعة، من 9:00 صباحًا حتى 6:00 مساءً. والرسائل الواردة خارج هذه الساعات يُرد عليها في يوم العمل التالي.",
      ],
    },
    next: ["contact", "where-based"],
  },
  {
    id: "social",
    topic: "help",
    q: { en: "Are you on social media?", ar: "هل أنتم على وسائل التواصل؟" },
    a: {
      en: [
        "Yes — you'll find Rosica on Instagram at @rosicanaturalcare, and on Facebook as Rosica Natural Care.",
      ],
      ar: [
        "نعم — تجدين روزيكا على إنستغرام باسم @rosicanaturalcare، وعلى فيسبوك باسم Rosica Natural Care.",
      ],
    },
    next: ["contact", "who"],
  },
];

const byId = new Map(questions.map((q) => [q.id, q]));

export const questionById = (id: string) => byId.get(id);

export const questionsInTopic = (topic: TopicId) =>
  questions.filter((q) => q.topic === topic);

/** Shown first, before any topic is chosen — the questions asked most. */
export const OPENING: string[] = ["collections-diff", "sulfate-free", "where-buy", "contact"];

export const text = <T,>(value: Localised<T>, locale: Locale): T => value[locale];
