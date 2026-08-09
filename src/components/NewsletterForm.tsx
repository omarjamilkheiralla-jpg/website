"use client";

import { useId, useState, type FormEvent } from "react";
import CTAButton from "./CTAButton";
import type { Locale } from "@/lib/i18n";

const t = {
  en: {
    label: "Email address",
    placeholder: "Your email address",
    button: "Subscribe",
    thanks: "Thank you for joining the Rosica community.",
  },
  ar: {
    label: "البريد الإلكتروني",
    placeholder: "بريدك الإلكتروني",
    button: "اشتراك",
    thanks: "شكرًا لانضمامك إلى مجتمع روزيكا.",
  },
} as const;

type NewsletterFormProps = {
  /** "light" sits on dark bands (footer, community section). */
  tone?: "light" | "dark";
  /**
   * "compact" stays on one row inside the narrow footer column. "pill" puts
   * the submit inside the field as a single rounded control, as the contact
   * page artwork draws it.
   */
  layout?: "inline" | "compact" | "pill";
  buttonLabel?: string;
  className?: string;
  locale?: Locale;
};

export default function NewsletterForm({
  tone = "light",
  layout = "inline",
  buttonLabel,
  className = "",
  locale = "en",
}: NewsletterFormProps) {
  const copy = t[locale];
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO: connect to the real newsletter provider.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  const light = tone === "light";
  const compact = layout === "compact";
  const pill = layout === "pill";

  if (pill) {
    return (
      <form onSubmit={handleSubmit} className={`w-full ${className}`}>
        <label htmlFor={inputId} className="sr-only">
          {copy.label}
        </label>
        <div className="flex items-center gap-2 rounded-full border border-gold/45 bg-cream ps-6 pe-2 py-1.5 transition-colors focus-within:border-gold">
          <input
            id={inputId}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={copy.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full min-w-0 bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={buttonLabel ?? copy.button}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-green transition-colors duration-300 hover:bg-gold/15 hover:text-gold-deep"
          >
            <svg
              viewBox="0 0 24 12"
              className="h-2.5 w-6 rtl:-scale-x-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M0 6h22M17 1l5 5-5 5" />
            </svg>
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-xs text-green">
          {submitted ? copy.thanks : ""}
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {copy.label}
      </label>
      <div className={compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"}>
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={copy.placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`w-full min-w-0 rounded-full border text-sm transition-colors ${
            compact ? "px-4 py-2.5 text-xs" : "px-5 py-3.5"
          } ${
            light
              ? "border-linen/30 bg-transparent text-cream placeholder:text-linen/55 focus:border-gold"
              : "border-green/30 bg-cream text-ink placeholder:text-ink-muted/70 focus:border-gold"
          }`}
        />
        <CTAButton
          type="submit"
          variant={light ? "gold" : "primary"}
          size={compact ? "sm" : "md"}
          className="shrink-0"
        >
          {buttonLabel ?? copy.button}
        </CTAButton>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-xs ${light ? "text-gold-pale" : "text-green"}`}
      >
        {submitted ? copy.thanks : ""}
      </p>
    </form>
  );
}
