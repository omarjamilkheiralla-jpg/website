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

  /*
    There is deliberately no contact form. Sending mail from the site would
    need a mailbox credential in the deployment, and a form that cannot send is
    worse than none — so the page asks people to email directly instead, which
    works from every device with nothing to configure and nothing to break.
  */
  writeHeading: string;
  writeBody: string;
  writeCta: string;

  followHeading: string;
  followBody: string;
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

    writeHeading: "Write to Us",
    writeBody:
      "Email is the quickest way to reach us. Please include the relevant details about your enquiry — whether regarding an order, a product, or a wholesale request — and our team will respond within 1–2 business days.",
    writeCta: `Email ${EMAIL}`,

    followHeading: "Follow Rosica",
    followBody:
      "New launches, botanical stories and the world behind the formulas — shared first with our community.",
  },

  ar: {
    metaTitle: "تواصل معنا | يسعدنا تواصلك",
    metaDescription:
      "تواصلي مع روزيكا لأي استفسار عن منتجاتنا أو طلبك، أو لمعرفة المزيد عن عنايتنا النباتية.",

    title: "تواصل معنا",
    lede: "يسعدنا أن نسمع منك.",
    intro:
      "سواء كان لديك سؤال عن منتجاتنا أو طلبك، أو كنت ترغب في معرفة المزيد عن روزيكا، فإن فريقنا هنا لمساعدتك.",

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
        label: "مدة الرد",
        lines: ["نسعى للرد على جميع الاستفسارات خلال يوم إلى يومَي عمل."],
      },
      { label: "ساعات العمل", lines: ["الاثنين – الجمعة", "9:00 صباحًا – 6:00 مساءً"] },
    ],

    writeHeading: "راسلينا",
    writeBody:
      "البريد الإلكتروني أسرع طريقة للوصول إلينا. اذكري أكبر قدر من التفاصيل عن استفسارك — طلبك، أو منتج معيّن، أو استفسار عن الجملة — وسيعاود فريقنا التواصل معك خلال يوم إلى يومَي عمل.",
    writeCta: `راسلينا على ${EMAIL}`,

    followHeading: "تابعي روزيكا",
    followBody:
      "الإصدارات الجديدة وحكايات النباتات والعالم خلف التركيبات — نشاركها أولًا مع مجتمعنا.",
  },
};

export const CONTACT_EMAIL = EMAIL;
