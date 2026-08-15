import type { Localised } from "@/lib/i18n";

/**
 * Interface copy for the Rosica assistant.
 *
 * The answers themselves live in chat-answers.ts. Everything here is the
 * furniture around them — what the visitor reads before they have asked
 * anything, and what they see if something goes wrong.
 */
export type ChatCopy = {
  /** Accessible name for the floating launcher. */
  open: string;
  close: string;
  title: string;
  subtitle: string;
  greeting: string;
  /** Above the opening questions. */
  popular: string;
  /** Above the topic chips. */
  browse: string;
  /** Above the follow-up questions after an answer. */
  more: string;
  /** Restarts the conversation. */
  restart: string;
  /** Only shown when the AI assistant is configured. */
  placeholder: string;
  send: string;
  thinking: string;
  error: string;
  busy: string;
  /** Permanent footnote under the panel. */
  disclaimer: string;
  aiDisclaimer: string;
};

export const chatCopy: Localised<ChatCopy> = {
  en: {
    open: "Ask about Rosica",
    close: "Close",
    title: "Rosica Assistant",
    subtitle: "Botanical care, answered",
    greeting:
      "Hello, and welcome to Rosica. Pick a question below and I'll answer it — no typing needed.",
    popular: "Popular questions",
    browse: "Or browse a topic",
    more: "You might also ask",
    restart: "Start over",
    placeholder: "Or type your own question…",
    send: "Send",
    thinking: "Typing…",
    error: "Sorry — something went wrong there. Please try again, or write to info@rosica.ae.",
    busy: "One moment, please — that's a few messages very quickly. Try again shortly.",
    disclaimer: "Answers to common questions. For anything else, email info@rosica.ae.",
    aiDisclaimer:
      "An assistant, not the team. For orders and stockists, please email info@rosica.ae.",
  },
  ar: {
    open: "اسأل عن روزيكا",
    close: "إغلاق",
    title: "مساعدة روزيكا",
    subtitle: "إجابات عن العناية النباتية",
    greeting: "أهلًا بك في روزيكا. اختر سؤالًا من الأسفل وسأجيبك — دون الحاجة للكتابة.",
    popular: "الأسئلة الأكثر شيوعًا",
    browse: "أو تصفّح موضوعًا",
    more: "قد تسألين أيضًا",
    restart: "ابدأ من جديد",
    placeholder: "أو اكتبي سؤالك…",
    send: "إرسال",
    thinking: "جارٍ الكتابة…",
    error: "عذرًا، حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا على info@rosica.ae.",
    busy: "لحظة من فضلك — هذه رسائل كثيرة بسرعة. حاولي مجددًا بعد قليل.",
    disclaimer: "إجابات عن الأسئلة الشائعة. لأي أمر آخر، راسلنا على info@rosica.ae.",
    aiDisclaimer:
      "مساعدة آلية، وليست الفريق. للطلبات ونقاط البيع، يرجى مراسلتنا على info@rosica.ae.",
  },
};
