import type { Localised } from "@/lib/i18n";

export type HomeCopy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  title: string;
  intro: string;
  heroPrimary: string;
  heroSecondary: string;

  valuesHeading: string;
  values: { title: string; body: string }[];
  valuesCta: string;

  ingredientsEyebrow: string;
  ingredientsTitle: string;
  ingredientsBody: string;
  ingredientsCta: string;
  featuredHeading: string;
  /** Honey, Propolis, Aloe Vera, Rosemary — order matters. */
  ingredients: { name: string; body: string }[];
  ingredientExplore: string;

  collectionsEyebrow: string;
  collectionsTitle: string;
  collectionsBody: string;
  collectionsCta: string;
  collections: { name: string; tagline: string; body: string; cta: string }[];
  collectionsFooter: string;

  closingHeading: string;
  ritualEyebrow: string;
  ritualIntro: string;
  ritualCta: string;
  ritualStepsHeading: string;
  ritual: { title: string; body: string }[];
  communityEyebrow: string;
  communityBody: string;
  communityCta: string;
};

export const homeCopy: Localised<HomeCopy> = {
  en: {
    metaTitle: "Rosica | Inspired by Nature. Refined Through Science.",
    metaDescription:
      "Discover a premium natural beauty experience inspired by nature and elevated through modern cosmetic science. Premium botanical care, thoughtfully formulated by Rosica.",

    eyebrow: "Botanical Beauty",
    title: "Inspired by Nature.\nRefined Through Science.",
    intro:
      "Premium natural beauty developed through thoughtful formulation, carefully selected botanical ingredients, and a commitment to everyday care.",
    heroPrimary: "Explore Collections",
    heroSecondary: "Learn Our Story",

    valuesHeading: "Why Rosica?",
    values: [
      {
        title: "Botanical Expertise",
        body: "We carefully select botanical ingredients known for their quality, heritage, and compatibility with modern cosmetic formulations.",
      },
      {
        title: "Modern Cosmetic Science",
        body: "Every formula combines nature with contemporary cosmetic science to deliver reliable daily care.",
      },
      {
        title: "Thoughtful Formulation",
        body: "Every Rosica product is developed with purpose, integrity, and attention to every detail—from ingredients to packaging.",
      },
    ],
    valuesCta: "Discover More",

    ingredientsEyebrow: "Ingredient Library",
    ingredientsTitle: "The Power of Botanical Ingredients",
    ingredientsBody:
      "Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products, explaining their traditional uses, cosmetic benefits, and role within each formulation.",
    ingredientsCta: "Explore All Ingredients",
    featuredHeading: "Featured ingredients",
    ingredients: [
      { name: "Honey", body: "A natural humectant rich in sugars that helps retain moisture." },
      {
        name: "Propolis",
        body: "A bee-derived ingredient valued in cosmetic care for its protective and soothing properties.",
      },
      { name: "Aloe Vera", body: "Helps hydrate, soothe, and support scalp comfort." },
      {
        name: "Rosemary",
        body: "Traditionally valued in hair care to support the appearance and vitality of hair.",
      },
    ],
    ingredientExplore: "Explore",

    collectionsEyebrow: "Our Collections",
    collectionsTitle: "Two Collections. Complete Care.",
    collectionsBody: "Rosica currently offers two complementary collections.",
    collectionsCta: "View All Products",
    collections: [
      {
        name: "Rosica Essentials",
        tagline: "Nourish. Repair. Protect.",
        body: "Created for everyday nourishment, repair, and protection with carefully balanced botanical formulations.",
        cta: "Discover Essentials",
      },
      {
        name: "Rosica PURE",
        tagline: "Revitalize. Strengthen. Energize.",
        body: "Designed to revitalize and strengthen with advanced botanical ingredients for a refreshing premium care experience.",
        cta: "Discover PURE",
      },
    ],
    collectionsFooter:
      "Together they represent the beginning of Rosica’s growing natural beauty portfolio.",

    closingHeading: "The Rosica ritual and community",
    ritualEyebrow: "Rosica Ritual",
    ritualIntro: "A simple routine for healthier, stronger hair.",
    ritualCta: "See the Collections",
    ritualStepsHeading: "The three-step ritual",
    ritual: [
      { title: "Cleanse", body: "Gently remove impurities while preparing the hair." },
      { title: "Condition", body: "Help restore softness and improve manageability." },
      {
        title: "Maintain",
        body: "Support long-term healthy-looking hair through consistent botanical care.",
      },
    ],
    communityEyebrow: "Follow Rosica",
    communityBody:
      "New launches, botanical stories and the world behind the formulas — shared first with our community.",
    communityCta: "Follow Rosica",
  },

  ar: {
    metaTitle: "روزيكا | مستوحاة من الطبيعة. مصقولة بالعلم.",
    metaDescription:
      "اكتشف تجربة جمال طبيعي فاخرة مستوحاة من الطبيعة ومصقولة بعلوم التجميل الحديثة. عناية نباتية فاخرة، مصمّمة بعناية من روزيكا.",

    eyebrow: "الجمال النباتي",
    title: "مستوحاة من الطبيعة.\nمصقولة بالعلم.",
    intro:
      "عناية نباتية فاخرة، صُممت بتركيبات مدروسة ومكوّنات مختارة بعناية، لترافقك في عنايتك اليومية.",
    heroPrimary: "استكشف المجموعات",
    heroSecondary: "تعرّف على قصتنا",

    valuesHeading: "لماذا روزيكا؟",
    values: [
      {
        title: "خبرة نباتية",
        body: "نختار بعناية مكوّنات نباتية معروفة بجودتها وإرثها وتوافقها مع تركيبات التجميل الحديثة.",
      },
      {
        title: "علوم التجميل الحديثة",
        body: "تجمع كل تركيبة بين الطبيعة وعلوم التجميل الحديثة، لتقدّم عناية يومية مدروسة.",
      },
      {
        title: "تركيبة مدروسة",
        body: "يُطوّر كل منتج من روزيكا بعناية وهدف واضح واهتمام بكل تفصيل، من المكوّنات وصولًا إلى التغليف.",
      },
    ],
    valuesCta: "اكتشف المزيد",

    ingredientsEyebrow: "مكتبة المكوّنات",
    ingredientsTitle: "قوة المكوّنات النباتية",
    ingredientsBody:
      "الطبيعة في قلب كل تركيبة من روزيكا. تعرّفك مكتبة المكوّنات على النباتات المختارة بعناية وراء منتجاتنا، وتشرح استخداماتها التقليدية وفوائدها التجميلية ودورها في كل تركيبة.",
    ingredientsCta: "استكشف جميع المكوّنات",
    featuredHeading: "أبرز المكوّنات",
    ingredients: [
      { name: "العسل", body: "مرطّب طبيعي غني بالسكريات يساعد على الاحتفاظ بالرطوبة." },
      {
        name: "البروبوليس",
        body: "مكوّن مستخلص من النحل يُقدَّر في العناية التجميلية لخصائصه الواقية والمهدّئة.",
      },
      { name: "الألوفيرا", body: "يساعد على الترطيب والتهدئة ودعم راحة فروة الرأس." },
      {
        name: "إكليل الجبل",
        body: "يُقدَّر تقليديًا في العناية بالشعر لدعم مظهر الشعر وحيويته.",
      },
    ],
    ingredientExplore: "اكتشف",

    collectionsEyebrow: "مجموعاتنا",
    collectionsTitle: "مجموعتان. بداية واحدة.",
    collectionsBody:
      "تقدّم روزيكا حاليًا مجموعتيها الأوليين ضمن بداية محفظتها المتنامية للعناية الجمالية الطبيعية.",
    collectionsCta: "تصفّح جميع المنتجات",
    collections: [
      {
        name: "روزيكا إسينشالز",
        tagline: "تغذية. إصلاح. حماية.",
        body: "عناية يومية صُممت للتغذية والإصلاح والحماية، بتركيبات نباتية متوازنة بعناية.",
        cta: "اكتشف Rosica Essentials",
      },
      {
        name: "روزيكا بيور",
        tagline: "عناية لطيفة. استعادة. تجدد.",
        body: "عناية نباتية لطيفة صُممت لتنظيف الشعر وإنعاشه، ودعم نعومته وإشراقه الطبيعي.",
        cta: "اكتشف Rosica Pure",
      },
    ],
    collectionsFooter: "معًا تمثّلان بداية محفظة روزيكا المتنامية للجمال الطبيعي.",

    closingHeading: "طقوس روزيكا ومجتمعها",
    ritualEyebrow: "طقوس روزيكا",
    ritualIntro: "روتين بسيط لعناية يومية متكاملة بالشعر.",
    ritualCta: "تصفّح المجموعات",
    ritualStepsHeading: "الطقوس الثلاثية",
    ritual: [
      { title: "١ — تنظيف", body: "يزيل الشوائب بلطف ويهيّئ الشعر للعناية التالية." },
      {
        title: "٢ — ترطيب وتنعيم",
        body: "يساعد على استعادة النعومة والترطيب وسهولة التصفيف.",
      },
      {
        title: "٣ — عناية مستمرة",
        body: "يدعم مظهر الشعر المعتنى به من خلال روتين نباتي منتظم.",
      },
    ],
    communityEyebrow: "تابع روزيكا",
    communityBody:
      "الإصدارات الجديدة وحكايات النباتات والعالم خلف التركيبات — نشاركها أولًا مع مجتمعنا.",
    communityCta: "تابعنا",
  },
};
