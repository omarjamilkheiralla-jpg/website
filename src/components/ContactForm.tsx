"use client";

import { useId, useState, type FormEvent } from "react";
import CTAButton from "./CTAButton";
import Icon from "./Icon";
import { CONTACT_EMAIL, type ContactCopy } from "@/content/contact";

type Status = "idle" | "sending" | "sent" | "handed-off";

const EMPTY = { name: "", email: "", phone: "", message: "", company: "" };

/**
 * Contact form.
 *
 * Submissions post to /api/contact, which delivers them to the business inbox.
 * If that route reports it has no mail credentials — or cannot be reached at
 * all — the details are handed to the visitor's own mail client instead, so the
 * page is never a dead end on a deployment that is missing configuration.
 */
export default function ContactForm({ copy }: { copy: ContactCopy }) {
  const id = useId();
  const [form, setForm] = useState(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const incomplete = !form.name.trim() || !form.email.trim() || !form.message.trim();

  /** Last resort: compose the message in whatever mail app the visitor has. */
  function handOff() {
    const body = [
      `${copy.fields.name}: ${form.name}`,
      `${copy.fields.email}: ${form.email}`,
      form.phone.trim() ? `${copy.fields.phone}: ${form.phone}` : null,
      "",
      form.message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    setStatus("handed-off");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `${copy.formHeading} — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    if (incomplete || status === "sending") return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("sent");
        setForm(EMPTY);
        setAttempted(false);
        return;
      }
    } catch {
      // Falls through to the mail client below.
    }
    handOff();
  }

  const field =
    "w-full rounded-md border border-gold/35 bg-cream px-5 py-4 text-sm text-ink transition-colors duration-300 placeholder:text-ink-muted/70 focus:border-gold focus:outline-none";

  const notice =
    attempted && incomplete
      ? copy.required
      : status === "sent"
        ? copy.sent
        : status === "handed-off"
          ? copy.fallback
          : "";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="sr-only">
            {copy.fields.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder={copy.fields.name}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="sr-only">
            {copy.fields.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.fields.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={field}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-phone`} className="sr-only">
          {copy.fields.phone}
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={copy.fields.phone}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={field}
        />
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-message`} className="sr-only">
          {copy.fields.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          placeholder={copy.fields.message}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, catnip for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>

      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs leading-relaxed text-green">
        {notice}
      </p>

      <div className="mt-3">
        <CTAButton type="submit" variant="gold" disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.send}
        </CTAButton>
      </div>

      <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-ink-muted">
        <span className="mt-px shrink-0 text-gold">
          <Icon name="shield" className="h-4 w-4" />
        </span>
        <span>{copy.privacy}</span>
      </p>
    </form>
  );
}
