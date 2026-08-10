import nodemailer from "nodemailer";

/**
 * Outbound mail for the contact form.
 *
 * There are two ways to send, and the deployment picks by which variables it
 * has. Both exist because they fail in different places:
 *
 *   SMTP    — uses a mailbox you already own. No DNS work, so this is the quick
 *             path when rosica.ae's email is already running somewhere. Needs
 *             the provider to allow SMTP AUTH (an app password, usually).
 *   Resend  — an HTTP API, no connection to hold open, which suits a
 *             serverless function better. Needs the sending domain verified,
 *             which means adding DNS records.
 *
 * SMTP wins if both are configured, on the grounds that someone who filled in
 * four SMTP variables meant it.
 *
 * Every credential comes from the environment. Nothing here is committed, and
 * no error path logs an address or a message body.
 */

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
  /** Only ever set for our own fixed copy — never for anything a visitor typed. */
  html?: string;
};

export type Transport = "smtp" | "resend";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
};

function smtpConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;
  return {
    host: SMTP_HOST,
    // 587 is submission-with-STARTTLS, which is what nearly every provider wants.
    port: Number(SMTP_PORT) || 587,
    user: SMTP_USER,
    password: SMTP_PASSWORD,
  };
}

/**
 * Which transport this deployment can use, and the address it sends from.
 * Returns null when neither is configured — the caller answers 503 and the form
 * falls back to the visitor's own mail client.
 */
export function mailerFor(): { transport: Transport; from: string } | null {
  const smtp = smtpConfig();
  // With SMTP the authenticated mailbox is a sane default sender; most
  // providers reject a From that isn't the account anyway.
  const from = process.env.CONTACT_FROM_EMAIL || smtp?.user;
  if (!from) return null;

  if (smtp) return { transport: "smtp", from };
  if (process.env.RESEND_API_KEY) return { transport: "resend", from };
  return null;
}

/**
 * One connection per call. Serverless containers are reused, but a pooled SMTP
 * connection left open between invocations gets dropped by the provider and
 * fails the *next* send rather than this one — which is much harder to
 * diagnose than paying for a handshake.
 */
async function sendSmtp(config: SmtpConfig, from: string, mail: Mail) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // Port 465 is implicit TLS; everything else negotiates STARTTLS.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.password },
  });

  try {
    await transporter.sendMail({
      from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      ...(mail.html ? { html: mail.html } : {}),
    });
  } finally {
    transporter.close();
  }
}

async function sendResend(from: string, mail: Mail) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      ...(mail.html ? { html: mail.html } : {}),
    }),
  });

  if (!response.ok) {
    // The provider echoes the recipient back; keep that out of the thrown text.
    throw new Error(`Resend responded ${response.status}`);
  }
}

/** Sends, or throws. The message never appears in the error. */
export async function sendMail(
  { transport, from }: { transport: Transport; from: string },
  mail: Mail,
) {
  if (transport === "smtp") {
    const config = smtpConfig();
    if (!config) throw new Error("SMTP is no longer configured");
    return sendSmtp(config, from, mail);
  }
  return sendResend(from, mail);
}
