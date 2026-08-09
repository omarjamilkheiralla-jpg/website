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
  /** "compact" stays on one row inside the narrow footer column. */
  layout?: "inline" | "compact";
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
