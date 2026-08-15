import type { Localised } from "@/lib/i18n";
import type { ProductSlug } from "./products";

/**
 * The Ingredient Library, one page per botanical.
 *
 * The English text is the business's own, supplied verbatim. It is deliberately
 * measured — "valued for", "traditionally associated with", "can complement" —
 * and makes no therapeutic claim and promises no result. Keep that register if
 * this is ever edited: these are cosmetics, and the Terms of Service say so.
 *
 * `foundIn` follows the "In Rosica" paragraph rather than the pack photographs,
 * because the business is the authority on its own formulations.
 */

export type IngredientSlug = "honey" | "propolis" | "aloe-vera" | "rosemary";

export type IngredientPage = {
  metaTitle: string;
  metaDescription: string;
  name: string;
  lede: string;
  natureHeading: string;
  nature: string[];
  formulationHeading: string;
  formulation: string[];
  /** Where the ingredient sits in the range, in the brand's own words. */
  rosicaHeading: string;
  rosica: string[];
};

/** Order matters: it matches the Ingredient Library and the home carousel. */
export const INGREDIENT_SLUGS: IngredientSlug[] = ["honey", "propolis", "aloe-vera", "rosemary"];

/** The products named in each ingredient's "In Rosica" paragraph. */
export const INGREDIENT_PRODUCTS: Record<IngredientSlug, ProductSlug[]> = {
  honey: ["honey-propolis-repair-shampoo", "deep-repair-conditioner"],
  propolis: ["honey-propolis-repair-shampoo"],
  "aloe-vera": ["purifying-fresh-cleanse-shampoo", "botanical-restore-shampoo"],
  rosemary: ["purifying-fresh-cleanse-shampoo"],
};

export const ingredientPages: Localised<Record<IngredientSlug, IngredientPage>> = {
  en: {
    honey: {
      metaTitle: "Honey",
      metaDescription:
        "A natural humectant rich in sugars that helps retain moisture. Where honey sits in the Rosica formulations, and why.",
      name: "Honey",
      lede: "A natural humectant rich in sugars that helps retain moisture.",
      natureHeading: "In nature",
      nature: [
        "Honey is produced by bees from floral nectar and has a long history of use in personal care. Its naturally sugar-rich composition has made it a valued ingredient in traditional beauty rituals across cultures.",
        "Honey is naturally rich in sugars with hygroscopic properties, meaning they have an affinity for water and can help retain moisture. This moisture-binding characteristic contributes to honey's long-standing use in personal care formulations designed to support softness and suppleness.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "In cosmetic formulations, honey is valued primarily for its humectant properties. Its naturally occurring sugars have an affinity for water, helping support moisture retention and contributing to a softer, more conditioned feel of the hair.",
        "In hair-care formulations, honey can complement other conditioning and moisturizing ingredients, helping support the overall sensory feel of the formula without weighing down the hair.",
      ],
      rosicaHeading: "In Rosica",
      rosica: [
        "Honey is featured in Rosica Honey & Propolis Repair Shampoo and Rosica Deep Repair Conditioner, where it forms part of carefully developed formulations designed to nourish and condition the hair.",
        "Combined with complementary ingredients selected for each formula, honey contributes to Rosica's approach to hair care: bringing together botanical ingredients and modern cosmetic formulation for hair that feels soft, smooth and cared for.",
      ],
    },
    propolis: {
      metaTitle: "Propolis",
      metaDescription:
        "A bee-derived ingredient valued in cosmetic care for its protective and soothing properties. Where propolis sits in the Rosica formulations, and why.",
      name: "Propolis",
      lede: "A bee-derived ingredient valued in cosmetic care for its protective and soothing properties.",
      natureHeading: "In nature",
      nature: [
        "Propolis is a resinous substance produced by bees from plant-derived resins collected from sources such as buds and other botanical material. Bees use it within the hive to seal small gaps and help maintain and protect the hive environment. It is sometimes referred to as “bee glue.”",
        "Propolis contains a naturally complex mixture of plant-derived compounds, and its composition can vary depending on botanical and geographical origin. It has a long history of traditional use and has also attracted interest as an ingredient in modern cosmetic formulations.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "In cosmetic formulations, propolis is valued for its protective and soothing properties. As a bee-derived ingredient with a complex composition of naturally occurring compounds, it can complement other conditioning and caring ingredients in hair and scalp formulations.",
      ],
      rosicaHeading: "In Rosica",
      rosica: [
        "Propolis is featured in the Honey & Propolis Repair Shampoo, where it is paired with honey for their complementary caring properties within a carefully developed hair-care formula.",
      ],
    },
    "aloe-vera": {
      metaTitle: "Aloe Vera",
      metaDescription:
        "Helps hydrate, soothe, and support scalp comfort. Where aloe vera sits in the Rosica formulations, and why.",
      name: "Aloe Vera",
      lede: "Helps hydrate, soothe, and support scalp comfort.",
      natureHeading: "In nature",
      nature: [
        "Aloe vera is a succulent plant whose thick leaves contain a clear, water-rich gel. This gel helps the plant retain water and adapt to dry conditions.",
        "Aloe vera gel is composed primarily of water and contains naturally occurring polysaccharides and other plant-derived compounds. It has a long history of use in personal care and cosmetic preparations, particularly in formulations designed to provide hydration and a soothing feel.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "In hair-care formulations, aloe vera is valued for its hydrating and soothing properties. Its water-rich composition and naturally occurring polysaccharides make it particularly suitable for formulations designed to support moisture and scalp comfort.",
        "It can complement cleansing and conditioning ingredients, helping create a balanced hair-care experience while supporting a soft and comfortable feel.",
      ],
      rosicaHeading: "In Rosica",
      rosica: [
        "Aloe vera is featured in Rosica Purifying & Fresh Cleanse Shampoo and Rosica PURE Botanical Restore Shampoo.",
        "In these carefully developed formulations, aloe vera works alongside other selected ingredients to support hydration and scalp comfort while contributing to gentle, effective hair care.",
      ],
    },
    rosemary: {
      metaTitle: "Rosemary",
      metaDescription:
        "Traditionally valued in hair care to support the appearance and vitality of hair. Where rosemary sits in the Rosica formulations, and why.",
      name: "Rosemary",
      lede: "Traditionally valued in hair care to support the appearance and vitality of hair.",
      natureHeading: "In nature",
      nature: [
        "Rosemary is an aromatic evergreen plant native to the Mediterranean region, where it is well adapted to warm, dry conditions.",
        "Its leaves contain a naturally complex mixture of plant compounds and aromatic constituents. Rosemary has a long history of traditional use in personal care, including preparations for the hair and scalp, and continues to be valued as a botanical ingredient in modern cosmetic formulations.",
      ],
      formulationHeading: "In the formulation",
      formulation: [
        "In hair-care formulations, rosemary is valued as a botanical ingredient for its traditional association with hair and scalp care. Rosemary extracts contain naturally occurring plant compounds that can complement other cleansing, conditioning and caring ingredients within a balanced formulation.",
        "Its use in modern hair care brings together a long botanical tradition with contemporary cosmetic formulation.",
      ],
      rosicaHeading: "In Rosica",
      rosica: [
        "Rosemary is featured in Rosica Purifying & Fresh Cleanse Shampoo, where it is combined with green tea, aloe vera and an amino acid complex as part of a carefully developed formula designed to provide effective cleansing while leaving the hair and scalp feeling fresh and cared for.",
      ],
    },
  },
  ar: {
    honey: {
      metaTitle: "العسل",
      metaDescription:
        "مرطّب طبيعي غني بالسكريات يساعد على الاحتفاظ بالرطوبة. أين يقع العسل في تركيبات روزيكا ولماذا.",
      name: "العسل",
      lede: "مرطّب طبيعي غني بالسكريات يساعد على الاحتفاظ بالرطوبة.",
      natureHeading: "في الطبيعة",
      nature: [
        "ينتج النحل العسل من رحيق الأزهار، وله تاريخ طويل في العناية الشخصية. وقد جعلت تركيبته الغنية بالسكريات منه مكوّنًا مقدَّرًا في طقوس الجمال التقليدية عبر الثقافات.",
        "العسل غني طبيعيًا بسكريات ذات خصائص استرطابية، أي أن لها ألفة للماء ويمكن أن تساعد على الاحتفاظ بالرطوبة. وهذه الخاصية في ربط الرطوبة تسهم في استخدامه الطويل في تركيبات العناية الشخصية التي تدعم النعومة والمرونة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "في التركيبات التجميلية، يُقدَّر العسل أساسًا لخصائصه المرطّبة. فسكرياته الطبيعية لها ألفة للماء، ما يساعد على دعم الاحتفاظ بالرطوبة ويسهم في ملمس أنعم للشعر.",
        "وفي تركيبات العناية بالشعر، يمكن للعسل أن يكمّل مكوّنات الترطيب والتنعيم الأخرى، ويدعم الإحساس العام بالتركيبة دون أن يثقل الشعر.",
      ],
      rosicaHeading: "في روزيكا",
      rosica: [
        "يدخل العسل في شامبو العسل والبروبوليس للإصلاح وفي بلسم الإصلاح العميق من روزيكا، ضمن تركيبات مدروسة بعناية لتغذية الشعر وترطيبه.",
        "وباجتماعه مع مكوّنات مكمّلة مختارة لكل تركيبة، يسهم العسل في مقاربة روزيكا للعناية بالشعر: الجمع بين المكوّنات النباتية والتركيب التجميلي الحديث لشعر يبدو ناعمًا وحريريًا وموضع عناية.",
      ],
    },
    propolis: {
      metaTitle: "البروبوليس",
      metaDescription:
        "مكوّن مستخلص من النحل يُقدَّر في العناية التجميلية لخصائصه الواقية والمهدّئة. أين يقع البروبوليس في تركيبات روزيكا ولماذا.",
      name: "البروبوليس",
      lede: "مكوّن مستخلص من النحل يُقدَّر في العناية التجميلية لخصائصه الواقية والمهدّئة.",
      natureHeading: "في الطبيعة",
      nature: [
        "البروبوليس مادة راتنجية ينتجها النحل من راتنجات نباتية يجمعها من مصادر مثل البراعم وغيرها من المواد النباتية. ويستخدمه النحل داخل الخلية لسدّ الفجوات الصغيرة والمساعدة على صيانة بيئة الخلية وحمايتها، ويُعرف أحيانًا بـ«غراء النحل».",
        "يحتوي البروبوليس على مزيج طبيعي معقّد من المركّبات النباتية، وقد يختلف تكوينه باختلاف الأصل النباتي والجغرافي. وله تاريخ طويل من الاستخدام التقليدي، كما نال اهتمامًا كمكوّن في التركيبات التجميلية الحديثة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "في التركيبات التجميلية، يُقدَّر البروبوليس لخصائصه الواقية والمهدّئة. وباعتباره مكوّنًا مستخلصًا من النحل بتركيبة معقّدة من المركّبات الطبيعية، يمكنه أن يكمّل مكوّنات العناية والترطيب الأخرى في تركيبات الشعر وفروة الرأس.",
      ],
      rosicaHeading: "في روزيكا",
      rosica: [
        "يدخل البروبوليس في شامبو العسل والبروبوليس للإصلاح، حيث يقترن بالعسل لخصائصهما المتكاملة في العناية ضمن تركيبة مدروسة بعناية للشعر.",
      ],
    },
    "aloe-vera": {
      metaTitle: "الألوفيرا",
      metaDescription:
        "تساعد على الترطيب والتهدئة ودعم راحة فروة الرأس. أين تقع الألوفيرا في تركيبات روزيكا ولماذا.",
      name: "الألوفيرا",
      lede: "تساعد على الترطيب والتهدئة ودعم راحة فروة الرأس.",
      natureHeading: "في الطبيعة",
      nature: [
        "الألوفيرا نبتة عصارية تحتوي أوراقها السميكة على هلام شفاف غني بالماء، يساعد النبتة على الاحتفاظ بالماء والتكيّف مع الظروف الجافة.",
        "يتكوّن هلام الألوفيرا أساسًا من الماء، ويحتوي على سكريات متعددة ومركّبات نباتية أخرى. وله تاريخ طويل في العناية الشخصية والمستحضرات التجميلية، خصوصًا في التركيبات المصمّمة للترطيب والإحساس بالتهدئة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "في تركيبات العناية بالشعر، تُقدَّر الألوفيرا لخصائصها المرطّبة والمهدّئة. وتكوينها الغني بالماء وسكرياتها المتعددة يجعلانها مناسبة بشكل خاص للتركيبات التي تدعم الرطوبة وراحة فروة الرأس.",
        "ويمكنها أن تكمّل مكوّنات التنظيف والترطيب، ما يساعد على تجربة عناية متوازنة بالشعر مع دعم ملمس ناعم ومريح.",
      ],
      rosicaHeading: "في روزيكا",
      rosica: [
        "تدخل الألوفيرا في شامبو التنظيف المنعش من روزيكا وشامبو الاستعادة النباتية من روزيكا بيور.",
        "وفي هاتين التركيبتين المدروستين بعناية، تعمل الألوفيرا إلى جانب مكوّنات مختارة أخرى لدعم الترطيب وراحة فروة الرأس، مع الإسهام في عناية لطيفة وفعّالة بالشعر.",
      ],
    },
    rosemary: {
      metaTitle: "إكليل الجبل",
      metaDescription:
        "يُقدَّر تقليديًا في العناية بالشعر لدعم مظهره وحيويته. أين يقع إكليل الجبل في تركيبات روزيكا ولماذا.",
      name: "إكليل الجبل",
      lede: "يُقدَّر تقليديًا في العناية بالشعر لدعم مظهر الشعر وحيويته.",
      natureHeading: "في الطبيعة",
      nature: [
        "إكليل الجبل نبتة عطرية دائمة الخضرة موطنها حوض البحر المتوسط، حيث تتكيّف جيدًا مع الأجواء الدافئة والجافة.",
        "تحتوي أوراقه على مزيج طبيعي معقّد من المركّبات النباتية والمكوّنات العطرية. وله تاريخ طويل من الاستخدام التقليدي في العناية الشخصية، بما في ذلك مستحضرات الشعر وفروة الرأس، وما زال مُقدَّرًا كمكوّن نباتي في التركيبات التجميلية الحديثة.",
      ],
      formulationHeading: "في التركيبة",
      formulation: [
        "في تركيبات العناية بالشعر، يُقدَّر إكليل الجبل كمكوّن نباتي لارتباطه التقليدي بالعناية بالشعر وفروة الرأس. وتحتوي خلاصاته على مركّبات نباتية طبيعية يمكنها أن تكمّل مكوّنات التنظيف والترطيب والعناية ضمن تركيبة متوازنة.",
        "واستخدامه في العناية الحديثة بالشعر يجمع بين تقليد نباتي عريق وتركيب تجميلي معاصر.",
      ],
      rosicaHeading: "في روزيكا",
      rosica: [
        "يدخل إكليل الجبل في شامبو التنظيف المنعش من روزيكا، حيث يجتمع مع الشاي الأخضر والألوفيرا ومركّب الأحماض الأمينية ضمن تركيبة مدروسة بعناية لتنظيف فعّال يترك الشعر وفروة الرأس بإحساس منعش وموضع عناية.",
      ],
    },
  },
};

/** Page furniture shared by the four ingredient pages. */
export type IngredientChrome = {
  eyebrow: string;
  backToLibrary: string;
  exploreProduct: string;
};

export const ingredientChrome: Localised<IngredientChrome> = {
  en: {
    eyebrow: "Ingredient Library",
    backToLibrary: "All ingredients",
    exploreProduct: "Explore",
  },
  ar: {
    eyebrow: "مكتبة المكوّنات",
    backToLibrary: "جميع المكوّنات",
    exploreProduct: "اكتشف",
  },
};
