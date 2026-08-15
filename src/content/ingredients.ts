import type { Localised } from "@/lib/i18n";

/**
 * Ingredient Library copy. The four botanicals are listed in a fixed order and
 * the view pairs them with photography by index, so images never have to be
 * repeated per locale — only words live here.
 */
export type IngredientsCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  listHeading: string;
  /** Honey, Propolis, Aloe Vera, Rosemary — order matters. */
  items: { name: string; body: string }[];
  closingTitle: string;
  closingBody: string;
  closingCta: string;
};

export const ingredientsCopy: Localised<IngredientsCopy> = {
  en: {
    metaTitle: "Ingredient Library | The Power of Botanical Ingredients",
    metaDescription:
      "Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products.",
    eyebrow: "Ingredient Library",
    title: "The Power of Botanical Ingredients",
    intro:
      "Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products, explaining their traditional uses, cosmetic benefits, and role within each formulation.",
    listHeading: "Featured botanical ingredients",
    items: [
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
    closingTitle: "Botanical inspiration, refined by science.",
    closingBody:
      "Discover how thoughtfully selected ingredients come together across the Rosica collections.",
    closingCta: "Explore Collections",
  },
  ar: {
    metaTitle: "مكتبة المكوّنات | قوة المكوّنات النباتية",
    metaDescription:
      "الطبيعة في قلب كل تركيبة من روزيكا. تعرّفك مكتبة المكوّنات على النباتات المختارة بعناية وراء منتجاتنا.",
    eyebrow: "مكتبة المكوّنات",
    title: "قوة المكوّنات النباتية",
    intro:
      "الطبيعة في قلب كل تركيبة من روزيكا. تعرّفك مكتبة المكوّنات على النباتات المختارة بعناية وراء منتجاتنا، وتشرح استخداماتها التقليدية وفوائدها التجميلية ودورها في كل تركيبة.",
    listHeading: "أبرز المكوّنات النباتية",
    items: [
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
    closingTitle: "كل تركيبة تبدأ من نبتة.",
    closingBody: "اكتشف كيف تجتمع هذه المكوّنات في مجموعات روزيكا.",
    closingCta: "استكشف المجموعات",
  },
};
