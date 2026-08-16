import type { Localised } from "@/lib/i18n";

/**
 * The furniture around the FAQ page.
 *
 * The questions and answers themselves are NOT here — they live in
 * chat-answers.ts, which is the site's single question bank. The assistant in
 * the corner of every page and this page read the same 26 entries, so an answer
 * can never be right in one place and stale in the other. Add a question there
 * and it appears in both.
 *
 * That is also why this page needs no new copy to be written: every answer was
 * already drawn from the About page, the collection pages, the Ingredient
 * Library, the two policies and the contact details. Nothing here claims
 * anything the site does not already claim.
 */
export type FaqCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string[];
  /** Heading above the topic list that runs alongside the answers. */
  contentsHeading: string;
  /** The closing block, for anything the page did not answer. */
  closing: {
    heading: string;
    body: string;
    cta: string;
  };
};

export const faqCopy: Localised<FaqCopy> = {
  en: {
    metaTitle: "FAQs",
    metaDescription:
      "Answers to the questions we are asked most often about Rosica products, ingredients, delivery, returns and how to reach the team.",
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    lede: [
      "The questions we are asked most often, grouped by subject.",
      "If yours is not here, the team reads every email and answers within one to two business days.",
    ],
    contentsHeading: "Topics",
    closing: {
      heading: "Still have a question?",
      body: "Write to us and someone from the team will come back to you within one to two business days.",
      cta: "Contact Rosica",
    },
  },
  ar: {
    metaTitle: "الأسئلة الشائعة",
    metaDescription:
      "إجابات عن الأسئلة الأكثر تكرارًا حول منتجات روزيكا ومكوّناتها والتوصيل والإرجاع وطريقة التواصل مع الفريق.",
    eyebrow: "الأسئلة الشائعة",
    title: "الأسئلة الأكثر تكرارًا",
    lede: [
      "الأسئلة التي تصلنا أكثر من غيرها، مرتّبة بحسب الموضوع.",
      "وإن لم تجد سؤالك هنا، فالفريق يقرأ كل رسالة ويردّ خلال يوم إلى يومَي عمل.",
    ],
    contentsHeading: "المواضيع",
    closing: {
      heading: "ما زال لديك سؤال؟",
      body: "راسلنا وسيعاود أحد أفراد الفريق التواصل معك خلال يوم إلى يومَي عمل.",
      cta: "تواصل مع روزيكا",
    },
  },
};
