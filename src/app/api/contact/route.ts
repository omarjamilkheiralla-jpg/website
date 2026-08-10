import { NextResponse } from "next/server";
import { autoReply } from "@/content/auto-reply";

/**
 * Delivers a contact form submission to the business inbox, then sends the
 * visitor an acknowledgement.
 *
 * Sending goes through Resend's HTTP API — one fetch, no SDK and no SMTP
 * connection to hold open, which is what a serverless function wants. The
 * credentials live only in environment variables; nothing is committed.
 *
 *   RESEND_API_KEY      required, from resend.com
 *   CONTACT_FROM_EMAIL  required, an address on a domain verified in Resend
 *   CONTACT_TO_EMAIL    optional, defaults to the published inbox
 *
 * Until those are set the route answers 503 with `reason: "unconfigured"`, and
 * the form quietly falls back to opening the visitor's own mail client. That
 * way the page is never a dead end, whatever the deployment is missing.
 */

export const runtime = "nodejs";
/** Never prerender: this reads request bodies and secrets. */
export const dynamic = "force-dynamic";

const TO = process.env.CONTACT_TO_EMAIL ?? "info@rosica.ae";
const LIMITS = { name: 120, email: 200, phone: 60, message: 5000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
  /** Only ever set for our own fixed copy — never for anything a visitor typed. */
  html?: string;
};

function send(key: string, from: string, mail: Mail) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
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
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !from) {
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
    const sent = await send(key, from, {
      to: TO,
      // So hitting reply in the inbox writes back to the visitor.
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      text: body,
    });

    if (!sent.ok) {
      // The provider's response may carry the visitor's address; keep it out
      // of the logs and tell the client only that it failed.
      console.error("Contact form: Resend responded", sent.status);
      return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }
  } catch {
    console.error("Contact form: could not reach the mail provider");
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }

  /*
    Acknowledge the visitor.

    Deliberately after the enquiry has landed, and deliberately unable to fail
    the request: by this point the message is safely in the business inbox, and
    a missing acknowledgement is not a reason to tell someone their message
    didn't go through. Replies go to the business, not to the no-reply sender.
  */
  try {
    const acknowledged = await send(key, from, {
      to: email,
      replyTo: TO,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });
    if (!acknowledged.ok) {
      console.error("Contact form: auto-reply rejected", acknowledged.status);
    }
  } catch {
    console.error("Contact form: could not send the auto-reply");
  }

  return NextResponse.json({ ok: true });
}
