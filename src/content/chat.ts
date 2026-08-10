import type { Localised } from "@/lib/i18n";

/**
 * Interface copy for the Rosica assistant.
 *
 * The assistant's own answers are generated; everything a visitor reads before
 * they type — the greeting, the suggestions, the error lines — is written here
 * so it stays on-brand and identical every time.
 */
export type ChatCopy = {
  /** Accessible name for the floating launcher. */
  open: string;
  close: string;
  title: string;
  subtitle: string;
  greeting: string;
  /** Starter questions, shown until the visitor sends something. */
  suggestions: string[];
  placeholder: string;
  send: string;
  thinking: string;
  /** Shown in the transcript when a reply could not be fetched. */
  error: string;
  /** Shown when the visitor is sending faster than the limiter allows. */
  busy: string;
  /** Permanent footnote under the input. */
  disclaimer: string;
};

export const chatCopy: Localised<ChatCopy> = {
  en: {
    open: "Chat with Rosica",
    close: "Close chat",
    title: "Rosica Assistant",
    subtitle: "Botanical care, answered",
    greeting:
      "Hello, and welcome to Rosica. Ask me anything about our collections, our botanicals or how to reach the team.",
    suggestions: [
      "What's the difference between Essentials and PURE?",
      "Which products are sulfate-free?",
      "Tell me about your botanical ingredients",
    ],
    placeholder: "Ask about Rosica…",
    send: "Send",
    thinking: "Typing…",
    error: "Sorry — something went wrong there. Please try again, or write to info@rosica.ae.",
    busy: "One moment, please — that's a few messages very quickly. Try again shortly.",
    disclaimer:
      "An assistant, not the team. For orders and stockists, please use the contact page.",
  },
  ar: {
    open: "تحدّثي مع روزيكا",
    close: "إغلاق المحادثة",
    title: "مساعدة روزيكا",
    subtitle: "إجابات عن العناية النباتية",
    greeting:
      "أهلًا بكِ في روزيكا. اسأليني عن مجموعاتنا أو مكوّناتنا النباتية أو كيفية التواصل مع الفريق.",
    suggestions: [
      "ما الفرق بين إسينشالز وبيور؟",
      "أي المنتجات خالية من السلفات؟",
      "حدّثيني عن المكوّنات النباتية",
    ],
    placeholder: "اسألي عن روزيكا…",
    send: "إرسال",
    thinking: "جارٍ الكتابة…",
    error: "عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا على info@rosica.ae.",
    busy: "لحظة من فضلك — هذه رسائل كثيرة بسرعة. حاولي مجددًا بعد قليل.",
    disclaimer:
      "مساعدة آلية، وليست الفريق. للطلبات ونقاط البيع، يرجى استخدام صفحة التواصل.",
  },
};
