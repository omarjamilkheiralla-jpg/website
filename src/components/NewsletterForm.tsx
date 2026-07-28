"use client";

import { useId, useState, type FormEvent } from "react";
import CTAButton from "./CTAButton";

type NewsletterFormProps = {
  /** "light" sits on dark bands (footer, community section). */
  tone?: "light" | "dark";
  buttonLabel?: string;
  className?: string;
};

export default function NewsletterForm({
  tone = "light",
  buttonLabel = "Subscribe",
  className = "",
}: NewsletterFormProps) {
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

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`w-full rounded-full border px-5 py-3.5 text-sm transition-colors ${
            light
              ? "border-linen/30 bg-transparent text-cream placeholder:text-linen/55 focus:border-gold"
              : "border-green/30 bg-cream text-ink placeholder:text-ink-muted/70 focus:border-gold"
          }`}
        />
        <CTAButton type="submit" variant={light ? "gold" : "primary"} className="shrink-0">
          {buttonLabel}
        </CTAButton>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-xs ${light ? "text-gold-soft" : "text-green"}`}
      >
        {submitted ? "Thank you for joining the Rosica community." : ""}
      </p>
    </form>
  );
}
