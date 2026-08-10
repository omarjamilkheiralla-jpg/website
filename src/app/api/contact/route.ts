import { NextResponse } from "next/server";
import { autoReply } from "@/content/auto-reply";
import { mailerFor, sendMail } from "@/lib/mail";

/**
 * Delivers a contact form submission to the business inbox, then sends the
 * visitor an acknowledgement.
 *
 * Two ways to send; the deployment picks by which variables it has. See
 * `@/lib/mail` for the trade-off and the full variable list — in short, SMTP
 * uses a mailbox you already own, Resend needs a verified domain.
 *
 *   SMTP_HOST / SMTP_USER / SMTP_PASSWORD   one route
 *   RESEND_API_KEY + CONTACT_FROM_EMAIL     the other
 *   CONTACT_TO_EMAIL                        optional, defaults to the inbox below
 *
 * With neither, the route answers 503 with `reason: "unconfigured"` and the
 * form quietly falls back to opening the visitor's own mail client, so the page
 * is never a dead end on a deployment that is missing configuration.
 */

export const runtime = "nodejs";
/** Never prerender: this reads request bodies and secrets. */
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO_EMAIL ?? "info@rosica.ae";
const LIMITS = { name: 120, email: 200, phone: 60, message: 5000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const mailer = mailerFor();

  if (!mailer) {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  /*
    Honeypot. A real visitor never sees this field, so anything in it is a bot.
    Answer as though it worked rather than 400 — a rejection just tells the
    script to try again differently.
  */
  if (clean(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const phone = clean(payload.phone, LIMITS.phone);
  const message = clean(payload.message, LIMITS.message);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Plain text only. Nothing the visitor typed is ever interpreted as markup.
  const body = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    phone ? `Phone:   ${phone}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await sendMail(mailer, {
      to: TO,
      // So hitting reply in the inbox writes back to the visitor.
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      text: body,
    });
  } catch (error) {
    // The visitor's address must not reach the logs; the transport and the
    // provider's own wording are enough to diagnose from.
    console.error(
      `Contact form: ${mailer.transport} delivery failed —`,
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }

  /*
    Acknowledge the visitor.

    Deliberately after the enquiry has landed, and deliberately unable to fail
    the request: by this point the message is safely in the business inbox, and
    a missing acknowledgement is not a reason to tell someone their message
    didn't go through. Replies go to the business, not to the sending address.
  */
  try {
    await sendMail(mailer, {
      to: email,
      replyTo: TO,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });
  } catch (error) {
    console.error(
      "Contact form: auto-reply failed —",
      error instanceof Error ? error.message : "unknown error",
    );
  }

  return NextResponse.json({ ok: true });
}
