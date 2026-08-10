import { CONTACT_EMAIL } from "./contact";

/**
 * The acknowledgement sent back to anyone who writes in through the contact
 * form.
 *
 * This wording was supplied by the brand and is used verbatim — do not reword,
 * shorten or "improve" it. If the copy needs to change, change it here and
 * nowhere else, so the form and the inbox never drift apart.
 *
 * Both a plain-text and an HTML version are sent: the text is what the template
 * says, and the HTML is the same words with the website address as a real link.
 * Nothing the visitor typed is interpolated into either, so there is no markup
 * to escape.
 */

const WEBSITE = "www.rosica.ae";
const WEBSITE_URL = "https://www.rosica.ae";

const SIGN_OFF = [
  "Warm regards,",
  "Rosica Natural Care",
  "Your Gateway To Nature",
  CONTACT_EMAIL,
];

const PARAGRAPHS = [
  "Dear Valued Customer,",
  "Thank you for reaching out to Rosica.",
  "We have received your inquiry and appreciate your interest in our natural care products.",
  "Our team will review your message and respond within 1–2 business days.",
  "We look forward to assisting you.",
];

const text = [...PARAGRAPHS, [...SIGN_OFF, WEBSITE].join("\n")].join("\n\n");

const html = [
  `<div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.7;color:#1e1e1a">`,
  ...PARAGRAPHS.map((line) => `<p style="margin:0 0 16px">${line}</p>`),
  `<p style="margin:0">`,
  [
    ...SIGN_OFF,
    `<a href="${WEBSITE_URL}" style="color:#7a5d22">${WEBSITE}</a>`,
  ].join("<br>"),
  `</p>`,
  `</div>`,
].join("");

export const autoReply = {
  subject: "Thank You for Contacting Rosica",
  text,
  html,
} as const;
