import type { Localised } from "@/lib/i18n";

/**
 * Contact page copy, transcribed from the approved artwork. The address, email,
 * hours and response time are the business's own details — do not paraphrase or
 * invent alternatives here.
 */
export type ContactCopy = {
  metaTitle: string;
  metaDescription: string;

  title: string;
  lede: string;
  intro: string;

  infoHeading: string;
  /** Email, Website, Address, Response Time, Hours — order matters. */
  info: { label: string; lines: string[] }[];

  formHeading: string;
  fields: { name: string; email: string; phone: string; message: string };
  send: string;
  privacy: string;
  /** Shown once the message has actually been delivered. */
  sent: string;
  sending: string;
  /** Shown when delivery is not configured and the mail client is used instead. */
  fallback: string;
  required: string;

  newsletterHeading: string;
  newsletterBody: string;
};

const EMAIL = "info@rosica.ae";
const WEBSITE = "www.rosica.ae";
const ADDRESS = [
  "Meydan Grandstand, 6th Floor,",
  "Meydan Road, Nad Al Sheba,",
  "Dubai, United Arab Emirates",
];

export const contactCopy: Localised<ContactCopy> = {
  en: {
    metaTitle: "Contact | Get in Touch",
    metaDescription:
      "Contact Rosica with questions about our products, your order, or to learn more about our botanical care.",

    title: "Get in Touch",
    lede: "We'd love to hear from you.",
    intro:
      "Whether you have a question about our products, your order, or simply wish to learn more about Rosica, our team is here to assist you.",

    infoHeading: "Contact Information",
    info: [
      { label: "Email", lines: [EMAIL] },
      { label: "Website", lines: [WEBSITE] },
      { label: "Business Address", lines: ADDRESS },
      {
        label: "Response Time",
        lines: ["We aim to respond to all enquiries within 1–2 business days."],
      },
      { label: "Business Hours", lines: ["Monday – Friday", "9:00 AM – 6:00 PM"] },
    ],

    formHeading: "Contact Form",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
    },
    send: "Send Message",
    privacy: "Your information is kept private and secure.",
    sent: "Thank you — your message is on its way. We'll be in touch shortly.",
    sending: "Sending…",
    fallback: `We've opened your mail app instead. If nothing appeared, write to us at ${EMAIL}.`,
    required: "Please add your name, email and message.",

    newsletterHeading: "Join the Rosica Community",
    newsletterBody:
      "Be the first to discover new botanical collections, exclusive launches and special offers.",
  },

  ar: {
    metaTitle: "تواصل معنا | يسعدنا تواصلك",
    metaDescription:
      "تواصلي مع روزيكا لأي استفسار عن منتجاتنا أو طلبك، أو لمعرفة المزيد عن عنايتنا النباتية.",

    title: "يسعدنا تواصلك",
    lede: "يسعدنا أن نسمع منك.",
    intro:
      "سواء كان لديك سؤال عن منتجاتنا أو عن طلبك، أو رغبتِ ببساطة في معرفة المزيد عن روزيكا، فريقنا هنا لمساعدتك.",

    infoHeading: "معلومات التواصل",
    info: [
      { label: "البريد الإلكتروني", lines: [EMAIL] },
      { label: "الموقع الإلكتروني", lines: [WEBSITE] },
      {
        label: "العنوان",
        lines: [
          "ميدان جراندستاند، الطابق السادس،",
          "شارع ميدان، ند الشبا،",
          "دبي، الإمارات العربية المتحدة",
        ],
      },
      {
        label: "وقت الرد",
        lines: ["نسعى للرد على جميع الاستفسارات خلال يوم إلى يومَي عمل."],
      },
      { label: "ساعات العمل", lines: ["الاثنين – الجمعة", "9:00 صباحًا – 6:00 مساءً"] },
    ],

    formHeading: "نموذج التواصل",
    fields: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف (اختياري)",
      message: "رسالتك",
    },
    send: "أرسلي الرسالة",
    privacy: "معلوماتك تبقى خاصة وآمنة.",
    sent: "شكرًا لك — رسالتك في طريقها إلينا، وسنعاود التواصل قريبًا.",
    sending: "جارٍ الإرسال…",
    fallback: `فتحنا لك تطبيق البريد بدلًا من ذلك. إن لم يظهر شيء، راسلينا على ${EMAIL}.`,
    required: "يرجى كتابة اسمك وبريدك الإلكتروني ورسالتك.",

    newsletterHeading: "انضمّي إلى مجتمع روزيكا",
    newsletterBody:
      "كوني أول من يكتشف المجموعات النباتية الجديدة والإصدارات الحصرية والعروض الخاصة.",
  },
};

export const CONTACT_EMAIL = EMAIL;
