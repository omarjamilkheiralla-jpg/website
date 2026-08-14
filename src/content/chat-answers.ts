import type { Locale, Localised } from "@/lib/i18n";
import { SHOP_URL } from "@/lib/shop";

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
  /**
   * Optional "read more" link. An internal href is authored in English and
   * localised at render; `external: true` marks a full URL that must be left
   * alone and opened in a new tab — the online store, for instance.
   */
  link?: { href: string; label: Localised<string>; external?: boolean };
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
        "Rosica is a premium botanical beauty brand, currently offering four haircare products across two collections.",
        "Rosica Essentials — Honey & Propolis Repair Shampoo, nourishing and repairing care for dry, normal and damaged hair; Purifying & Fresh Cleanse Shampoo, refreshing cleansing care for oily hair and scalps prone to excess oil; and Deep Repair Conditioner, conditioning care designed to detangle, strengthen and repair all hair types.",
        "Rosica PURE — Botanical Restore Shampoo, gentle sulfate-free botanical care designed for all hair types, colour-treated, chemically treated and damaged hair, and daily use.",
      ],
      ar: [
        "روزيكا علامة فاخرة للجمال النباتي، تقدّم حاليًا أربعة منتجات للعناية بالشعر ضمن مجموعتين.",
        "روزيكا إسينشالز — شامبو Honey & Propolis Repair، عناية مغذّية ومصلحة للشعر الجاف والعادي والتالف؛ وشامبو Purifying & Fresh Cleanse، عناية منعشة ومنظّفة للشعر الدهني وفروة الرأس المعرّضة للدهون؛ وبلسم Deep Repair، عناية مرطّبة تساعد على فك التشابك وتقوية الشعر وإصلاحه لجميع الأنواع.",
        "روزيكا بيور — شامبو Botanical Restore، عناية نباتية لطيفة خالية من السلفات، مصمّمة لجميع أنواع الشعر والشعر المصبوغ والمعالج كيميائيًا والتالف، وللاستخدام اليومي.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "Explore all products", ar: "تصفّحي جميع المنتجات" },
    },
    next: ["collections-diff", "sulfate-free", "oily-hair", "curly-hair"],
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
        "Rosica Essentials brings together everyday haircare formulas designed for different needs — from cleansing and freshness to nourishment, repair and conditioning.",
        "Rosica PURE focuses on gentle, sulfate-free care, combining carefully selected botanical ingredients with advanced haircare technology to support scalp comfort and healthy-looking hair.",
      ],
      ar: [
        "تجمع روزيكا إسينشالز تركيبات العناية اليومية بالشعر المصمّمة لاحتياجات مختلفة — من التنظيف والانتعاش إلى التغذية والإصلاح والترطيب.",
        "أما روزيكا بيور فتركّز على العناية اللطيفة الخالية من السلفات، وتجمع بين مكوّنات نباتية مختارة بعناية وتقنيات متقدّمة للعناية بالشعر لدعم راحة فروة الرأس ومظهر الشعر الصحي.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "Explore the collections", ar: "تصفّحي المجموعات" },
    },
    next: ["sulfate-free", "oily-hair", "curly-hair", "keratin-hair"],
  },
  {
    id: "sulfate-free",
    topic: "products",
    q: { en: "Which products are sulfate-free?", ar: "أي المنتجات خالية من السلفات؟" },
    /*
      Read straight off the packs. Naming the product that does NOT carry the
      claim matters as much as naming the two that do — an answer that only
      lists the sulfate-free ones reads as though the whole range is.
    */
    a: {
      en: [
        "Two Rosica shampoos carry a sulfate-free claim: the Honey & Propolis Repair Shampoo from Rosica Essentials, and the Botanical Restore Shampoo from Rosica PURE.",
        "The Purifying & Fresh Cleanse Shampoo does not carry a sulfate-free claim on its label. Rosica product labels also indicate silicone-free, paraben-free and colorant-free formulations.",
      ],
      ar: [
        "يحمل شامبوان من روزيكا وصف الخلو من السلفات: شامبو Honey & Propolis Repair من روزيكا إسينشالز، وشامبو Botanical Restore من روزيكا بيور.",
        "أما شامبو Purifying & Fresh Cleanse فلا تحمل عبوته هذا الوصف. كما تشير عبوات روزيكا إلى تركيبات خالية من السيليكون والبارابين والملوّنات.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "Explore our products", ar: "تصفّحي منتجاتنا" },
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
    next: ["keratin-hair", "curly-hair", "contact"],
  },
  {
    id: "keratin-hair",
    topic: "products",
    q: {
      en: "Can I use these on colored hair or hair treated with keratin or protein?",
      ar: "هل يمكنني استخدامها على شعر مصبوغ أو معالج بالكيراتين أو البروتين؟",
    },
    a: {
      en: [
        "Yes. The PURE Botanical Restore Shampoo is made specifically for colour-treated, chemically treated and damaged hair — it's sulfate-free and uses natural origin surfactants.",
        "If you have a sensitivity or a specific concern, it's always worth checking the ingredients on the pack and speaking to your stylist.",
      ],
      ar: [
        "نعم. شامبو Botanical Restore من بيور مصمّم خصيصًا للشعر المصبوغ والمعالج كيميائيًا والتالف — خالٍ من السلفات ويعتمد مكوّنات تنظيف طبيعية المنشأ.",
        "وإن كانت لديك حساسية أو حالة معيّنة، يُستحسن دائمًا مراجعة المكوّنات على العبوة واستشارة مصفّف شعرك.",
      ],
    },
    link: {
      href: "/collections/pure",
      label: { en: "Explore Botanical Restore Shampoo", ar: "استكشفي شامبو Botanical Restore" },
    },
    next: ["free-from", "curly-hair", "damaged-hair"],
  },
  {
    id: "oily-hair",
    topic: "products",
    q: {
      en: "Which Rosica shampoo is suitable for oily hair?",
      ar: "أي شامبو من روزيكا يناسب الشعر الدهني؟",
    },
    a: {
      en: [
        "Rosica Essentials Purifying & Fresh Cleanse Shampoo is designed for oily hair and scalp.",
        "Its deep yet gentle cleansing formula helps remove excess oil and impurities while leaving the scalp and hair feeling clean, fresh and refreshed.",
      ],
      ar: [
        "شامبو Purifying & Fresh Cleanse من روزيكا إسينشالز مصمّم للشعر الدهني وفروة الرأس الدهنية.",
        "تساعد تركيبته المنظّفة العميقة واللطيفة على إزالة الدهون الزائدة والشوائب، مع ترك فروة الرأس والشعر بإحساس بالنظافة والانتعاش.",
      ],
    },
    link: {
      href: "/collections/essentials",
      label: {
        en: "Explore Purifying & Fresh Cleanse Shampoo",
        ar: "استكشفي شامبو Purifying & Fresh Cleanse",
      },
    },
    next: ["curly-hair", "keratin-hair", "sulfate-free"],
  },
  {
    id: "curly-hair",
    topic: "products",
    q: {
      en: "Which Rosica shampoo is suitable for curly hair?",
      ar: "أي شامبو من روزيكا يناسب الشعر المجعّد؟",
    },
    a: {
      en: [
        "Rosica PURE Botanical Restore Shampoo is suitable for curly hair.",
        "Its gentle, sulfate-free botanical formula provides effective everyday cleansing while supporting scalp comfort and helping hair feel soft, smooth and refreshed.",
      ],
      ar: [
        "شامبو Botanical Restore من روزيكا بيور يناسب الشعر المجعّد.",
        "تمنح تركيبته النباتية اللطيفة الخالية من السلفات تنظيفًا يوميًا فعّالًا، مع دعم راحة فروة الرأس ومساعدة الشعر على أن يبدو ناعمًا وانسيابيًا ومنتعشًا.",
      ],
    },
    link: {
      href: "/collections/pure",
      label: {
        en: "Explore Botanical Restore Shampoo",
        ar: "استكشفي شامبو Botanical Restore",
      },
    },
    next: ["oily-hair", "keratin-hair", "collections-diff"],
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
        "Rosica product labels indicate silicone-free, paraben-free and colorant-free formulations.",
        "In addition, the Honey & Propolis Repair Shampoo and Botanical Restore Shampoo carry a sulfate-free claim. For complete formulation details, the full ingredient list is provided on each product label.",
      ],
      ar: [
        "تشير عبوات منتجات روزيكا إلى تركيبات خالية من السيليكون والبارابين والملوّنات.",
        "إضافةً إلى ذلك، يحمل شامبو Honey & Propolis Repair وشامبو Botanical Restore وصف الخلو من السلفات. ولمعرفة تفاصيل التركيبة كاملة، تجدين قائمة المكوّنات على عبوة كل منتج.",
      ],
    },
    link: {
      href: "/collections",
      label: { en: "Explore our products", ar: "تصفّحي منتجاتنا" },
    },
    next: ["sulfate-free", "ingredients-all"],
  },

  // ------------------------------------------------------------------- brand
  {
    id: "who",
    topic: "brand",
    q: { en: "Who are Rosica?", ar: "من هي روزيكا؟" },
    a: {
      en: [
        "Rosica is a premium botanical beauty brand inspired by nature and refined through modern cosmetic science.",
        "Founded with a passion for botanical knowledge, Rosica brings together carefully selected ingredients and thoughtfully developed formulations to create effective, elegant beauty care for everyday routines.",
      ],
      ar: [
        "روزيكا علامة فاخرة للجمال النباتي، مستوحاة من الطبيعة ومصقولة بعلوم التجميل الحديثة.",
        "تأسّست بشغف بالمعرفة النباتية، وتجمع بين مكوّنات مختارة بعناية وتركيبات مدروسة لتقديم عناية جمالية فعّالة وأنيقة للروتين اليومي.",
      ],
    },
    link: { href: "/about", label: { en: "Discover our story", ar: "اكتشفي قصتنا" } },
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
        "Rosica products are manufactured in a GMP-certified facility, with careful attention to quality, safety and hygiene throughout the manufacturing process.",
        "Our formulations bring together carefully selected botanical ingredients with modern cosmetic science to create thoughtful, high-quality beauty care.",
      ],
      ar: [
        "تُصنع منتجات روزيكا في منشأة معتمدة وفق معايير GMP، مع عناية دقيقة بالجودة والسلامة والنظافة في كل مراحل التصنيع.",
        "وتجمع تركيباتنا بين مكوّنات نباتية مختارة بعناية وعلوم التجميل الحديثة لتقديم عناية جمالية مدروسة وعالية الجودة.",
      ],
    },
    link: { href: "/about", label: { en: "Discover our approach", ar: "اكتشفي نهجنا" } },
    next: ["sustainability", "free-from"],
  },
  {
    id: "sustainability",
    topic: "brand",
    q: {
      en: "How does Rosica approach sustainability?",
      ar: "كيف تتعامل روزيكا مع الاستدامة؟",
    },
    a: {
      en: [
        "Rosica believes beauty should be developed with consideration for both people and the world around us.",
        "We aim to make thoughtful choices across our products and brand as we continue to grow, while communicating our approach clearly and responsibly.",
      ],
      ar: [
        "تؤمن روزيكا بأن الجمال ينبغي أن يُطوَّر بمراعاة الإنسان والعالم من حوله.",
        "ونسعى إلى اتخاذ خيارات مدروسة في منتجاتنا وعلامتنا مع استمرار نمونا، مع توضيح نهجنا بشفافية ومسؤولية.",
      ],
    },
    link: {
      href: "/about",
      label: { en: "Learn about our philosophy", ar: "تعرّفي على فلسفتنا" },
    },
    next: ["how-made", "who"],
  },

  // ------------------------------------------------------------------ buying
  {
    id: "where-buy",
    topic: "buying",
    q: { en: "Where can I buy Rosica?", ar: "أين يمكنني شراء روزيكا؟" },
    a: {
      en: [
        "Rosica products are available online in the UAE through our official online store.",
        "Explore the Rosica collection and shop directly online.",
      ],
      ar: [
        "منتجات روزيكا متوفّرة عبر الإنترنت في الإمارات من خلال متجرنا الرسمي.",
        "تصفّحي مجموعة روزيكا واطلبي مباشرةً عبر الإنترنت.",
      ],
    },
    link: {
      href: SHOP_URL,
      external: true,
      label: { en: "Shop Rosica", ar: "تسوّقي روزيكا" },
    },
    next: ["prices", "shipping", "contact"],
  },
  {
    id: "prices",
    topic: "buying",
    q: { en: "How much do the products cost?", ar: "كم تبلغ أسعار المنتجات؟" },
    a: {
      en: [
        "Rosica products are available to shop online in the UAE.",
        "For current prices and any available offers, visit our official online store, where you'll find the latest pricing for each product.",
      ],
      ar: [
        "منتجات روزيكا متاحة للتسوّق عبر الإنترنت في الإمارات.",
        "لمعرفة الأسعار الحالية وأي عروض متاحة، زوري متجرنا الرسمي حيث تجدين أحدث الأسعار لكل منتج.",
      ],
    },
    link: {
      href: SHOP_URL,
      external: true,
      label: { en: "Shop Rosica", ar: "تسوّقي روزيكا" },
    },
    next: ["shipping", "where-buy"],
  },
  {
    id: "shipping",
    topic: "buying",
    q: { en: "Do you deliver, and where to?", ar: "هل تقومون بالتوصيل، وإلى أين؟" },
    a: {
      en: [
        "Yes. Rosica currently delivers across the UAE.",
        "Delivery options and applicable shipping charges are shown at checkout based on your order and delivery location.",
      ],
      ar: [
        "نعم. توصّل روزيكا حاليًا إلى جميع أنحاء الإمارات.",
        "وتظهر خيارات التوصيل ورسوم الشحن المطبّقة عند إتمام الطلب، بحسب طلبك وموقع التوصيل.",
      ],
    },
    link: {
      href: SHOP_URL,
      external: true,
      label: { en: "Shop Rosica", ar: "تسوّقي روزيكا" },
    },
    next: ["where-buy", "prices", "wholesale"],
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
export const OPENING: string[] = ["collections-diff", "sulfate-free", "where-buy", "range"];

export const text = <T,>(value: Localised<T>, locale: Locale): T => value[locale];
