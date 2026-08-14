import type { Localised } from "@/lib/i18n";
import type { ProductSlug } from "./products";

/**
 * The Ingredient Library, one page per botanical.
 *
 * `foundIn` is the honest part: it lists only the products whose labels name
 * that ingredient, read off the packaging. It is what stops these pages from
 * becoming general wellness writing detached from what Rosica actually sells.
 *
 * The prose describes the ingredient and its traditional cosmetic use. It
 * deliberately makes no therapeutic claim and promises no result — these are
 * cosmetics, and the Terms of Service say as much.
 */

export type IngredientSlug = "honey" | "propolis" | "aloe-vera" | "rosemary";

export type IngredientPage = {
  metaTitle: string;
  metaDescription: string;
  name: string;
  lede: string;
  /** "In nature" then "In the formulation" — two short sections. */
  natureHeading: string;
  nature: string[];
  formulationHeading: string;
  formulation: string[];
};

/** Order matters: it matches the Ingredient Library and the home carousel. */
export const INGREDIENT_SLUGS: IngredientSlug[] = ["honey", "propolis", "aloe-vera", "rosemary"];

/** Only the products whose labels name the ingredient. */
export const INGREDIENT_PRODUCTS: Record<IngredientSlug, ProductSlug[]> = {
  honey: [
    "honey-propolis-repair-shampoo",
    "deep-repair-conditioner",
    "botanical-restore-shampoo",
  ],
  propolis: ["honey-propolis-repair-shampoo"],
  "aloe-vera": ["honey-propolis-repair-shampoo", "botanical-restore-shampoo"],
  rosemary: ["purifying-fresh-cleanse-shampoo"],
};

export const ingredientPages: Localised<Record<IngredientSlug, IngredientPage>> = {
  en: {
    honey: {
      metaTitle: "Honey",
      metaDescription:
        "Honey is a natural humectant, valued in cosmetic care for its ability to attract and hold moisture. Where Rosica uses it, and why.",
      name: "Honey",
      lede: "A natural humectant rich in sugars that helps retain moisture.",
      natureHeading: "In nature",
      nature: [
        "Honey is made by bees from floral nectar and has been used in personal care for as long as there are records of it — one of the oldest cosmetic ingredients still in everyday use.",
        "Its sugars are hygroscopic: they draw water from the air and hold on to it. That single property is why honey has been valued for softness and suppleness across so many traditions.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "In a shampoo or conditioner, honey behaves as a humectant — it helps the formula hold moisture against the hair rather than letting it flash off.",
        "Rosica pairs it with hydrolyzed collagen and botanical extracts so that cleansing does not have to mean stripping.",
      ],
    },
    propolis: {
      metaTitle: "Propolis",
      metaDescription:
        "Propolis is the resin bees gather to seal and protect the hive. Known for its protective and soothing properties in cosmetic care.",
      name: "Propolis",
      lede: "Known for its protective and soothing properties.",
      natureHeading: "In nature",
      nature: [
        "Propolis is the resinous material bees collect from tree buds and bark and use to seal, reinforce and protect the hive. It is sometimes called bee glue.",
        "That protective role in the hive is what drew cosmetic formulators to it, and it remains one of the most studied of the bee-derived ingredients.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "Propolis is used in cosmetic care for its protective and soothing character, most often alongside honey — the two come from the same source and are traditionally used together.",
        "In Rosica it appears in the Honey & Propolis Repair Shampoo, the product named for the pairing.",
      ],
    },
    "aloe-vera": {
      metaTitle: "Aloe Vera",
      metaDescription:
        "Aloe vera gel is a long-standing soothing and hydrating ingredient in cosmetic care. Where Rosica uses it, and why.",
      name: "Aloe Vera",
      lede: "Helps hydrate, soothe, and support skin and scalp comfort.",
      natureHeading: "In nature",
      nature: [
        "Aloe vera is a succulent whose thick leaves hold a clear gel — the plant's own way of storing water through long dry seasons.",
        "That gel is mostly water, carrying polysaccharides and other plant compounds, and it has been used on skin for centuries across a great many cultures.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "Aloe is used in hair care for hydration and for scalp comfort — a gentler note in a formula that also has to clean.",
        "Rosica includes it in the two shampoos formulated for hair that has been through something: damage, colour, or chemical treatment.",
      ],
    },
    rosemary: {
      metaTitle: "Rosemary",
      metaDescription:
        "Rosemary is one of the oldest botanicals in hair care, traditionally used to help revitalize and strengthen hair. Where Rosica uses it, and why.",
      name: "Rosemary",
      lede: "Traditionally used to help revitalize and strengthen hair.",
      natureHeading: "In nature",
      nature: [
        "Rosemary is a woody Mediterranean evergreen, aromatic in the way that only a plant built for hot, dry, stony ground tends to be.",
        "It has a long history in hair care specifically — one of the botanicals that appears in traditional hair preparations across the whole Mediterranean basin.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "Rosemary extract brings a clean, herbaceous freshness, and is traditionally associated with revitalizing hair and scalp.",
        "Rosica uses it in the Purifying & Fresh Cleanse Shampoo, together with green tea extract, where the brief is a scalp that feels genuinely refreshed.",
      ],
    },
  },
  ar: {
    honey: {
      metaTitle: "العسل",
      metaDescription:
        "العسل مرطّب طبيعي يُقدَّر في العناية التجميلية لقدرته على جذب الرطوبة والاحتفاظ بها. أين تستخدمه روزيكا ولماذا.",
      name: "العسل",
      lede: "مرطّب طبيعي غني بالسكريات يساعد على الاحتفاظ بالرطوبة.",
      natureHeading: "في الطبيعة",
      nature: [
        "ينتج النحل العسل من رحيق الأزهار، وقد استُخدم في العناية الشخصية منذ أقدم السجلات المعروفة — وهو من أقدم المكوّنات التجميلية التي ما زالت مستخدمة يوميًا.",
        "سكرياته تجذب الماء من الهواء وتحتفظ به، وهذه الخاصية وحدها هي سبب تقديره للنعومة والمرونة في تقاليد كثيرة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "في الشامبو أو البلسم، يعمل العسل كمرطّب يساعد التركيبة على الاحتفاظ بالرطوبة في الشعر.",
        "تجمعه روزيكا مع الكولاجين المُحلّل والخلاصات النباتية حتى لا يكون التنظيف على حساب ليونة الشعر.",
      ],
    },
    propolis: {
      metaTitle: "البروبوليس",
      metaDescription:
        "البروبوليس هو الراتنج الذي يجمعه النحل لحماية الخلية، ومعروف بخصائصه الواقية والمهدّئة في العناية التجميلية.",
      name: "البروبوليس",
      lede: "معروف بخصائصه الواقية والمهدّئة.",
      natureHeading: "في الطبيعة",
      nature: [
        "البروبوليس مادة راتنجية يجمعها النحل من براعم الأشجار ولحائها ويستخدمها لإحكام الخلية وتقويتها وحمايتها، ويُعرف أحيانًا بغراء النحل.",
        "هذا الدور الوقائي داخل الخلية هو ما لفت إليه أنظار مطوّري مستحضرات التجميل، وما زال من أكثر مكوّنات النحل دراسةً.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "يُستخدم البروبوليس في العناية التجميلية لخصائصه الواقية والمهدّئة، وغالبًا إلى جانب العسل — فكلاهما من المصدر نفسه ويُستخدمان معًا تقليديًا.",
        "في روزيكا يظهر في شامبو العسل والبروبوليس للإصلاح، المنتج الذي حمل اسم هذا الاقتران.",
      ],
    },
    "aloe-vera": {
      metaTitle: "الألوفيرا",
      metaDescription:
        "هلام الألوفيرا مكوّن عريق للتهدئة والترطيب في العناية التجميلية. أين تستخدمه روزيكا ولماذا.",
      name: "الألوفيرا",
      lede: "يساعد على الترطيب والتهدئة ودعم راحة فروة الرأس.",
      natureHeading: "في الطبيعة",
      nature: [
        "الألوفيرا نبتة عصارية تحتفظ أوراقها السميكة بهلام شفاف، وهي طريقة النبتة نفسها في تخزين الماء خلال مواسم الجفاف الطويلة.",
        "هذا الهلام ماء في معظمه، يحمل سكريات متعددة ومركّبات نباتية أخرى، وقد استُخدم على البشرة لقرون في ثقافات كثيرة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "تُستخدم الألوفيرا في العناية بالشعر للترطيب ولراحة فروة الرأس — لمسة ألطف في تركيبة عليها أن تنظّف أيضًا.",
        "تضعها روزيكا في الشامبوهين المخصّصين للشعر الذي مرّ بتجربة: تلف أو صبغة أو معالجة كيميائية.",
      ],
    },
    rosemary: {
      metaTitle: "إكليل الجبل",
      metaDescription:
        "إكليل الجبل من أقدم النباتات في العناية بالشعر، ويُستخدم تقليديًا لدعم حيويته وقوته. أين تستخدمه روزيكا ولماذا.",
      name: "إكليل الجبل",
      lede: "يُستخدم تقليديًا في العناية بالشعر ودعم حيويته.",
      natureHeading: "في الطبيعة",
      nature: [
        "إكليل الجبل شجيرة متوسطية دائمة الخضرة، عطرية كما تكون النباتات التي تنشأ في أرض حارة جافة وحجرية.",
        "له تاريخ طويل في العناية بالشعر تحديدًا، وهو من النباتات التي تتكرّر في وصفات الشعر التقليدية في حوض المتوسط كله.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "تمنح خلاصة إكليل الجبل انتعاشًا عشبيًا نظيفًا، وترتبط تقليديًا بتنشيط الشعر وفروة الرأس.",
        "تستخدمها روزيكا في شامبو التنظيف المنعش مع خلاصة الشاي الأخضر، حيث المطلوب فروة رأس تشعر بانتعاش حقيقي.",
      ],
    },
  },
};

/** Page furniture shared by the four ingredient pages. */
export type IngredientChrome = {
  eyebrow: string;
  foundInHeading: string;
  /** Shown when the ingredient appears in a single product. */
  backToLibrary: string;
  exploreProduct: string;
};

export const ingredientChrome: Localised<IngredientChrome> = {
  en: {
    eyebrow: "Ingredient Library",
    foundInHeading: "Where you'll find it",
    backToLibrary: "All ingredients",
    exploreProduct: "Explore",
  },
  ar: {
    eyebrow: "مكتبة المكوّنات",
    foundInHeading: "أين تجدينه",
    backToLibrary: "جميع المكوّنات",
    exploreProduct: "اكتشفي",
  },
};
