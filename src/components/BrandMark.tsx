import Link from "next/link";

/**
 * The small botanical sprig that sits in place of the dot on the "i" in the
 * Rosica wordmark.
 */
function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 30"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 29V9" />
      <path d="M12 15c0-3.4 2.6-5.8 6.6-6.4C18.2 12 15.6 14.6 12 15Z" />
      <path d="M12 21c0-3.4-2.6-5.8-6.6-6.4C5.8 18 8.4 20.6 12 21Z" />
      <circle cx="12" cy="5" r="3.4" />
      <path d="M12 1.6v6.8M8.6 5h6.8" />
    </svg>
  );
}

const sizes = {
  sm: {
    word: "text-2xl",
    sprig: "h-3.5 w-3 -top-[0.62em]",
    tagline: "text-[0.5rem] tracking-[0.22em]",
    arabic: "text-[0.6rem]",
  },
  md: {
    word: "text-3xl sm:text-[2rem]",
    sprig: "h-4 w-3.5 -top-[0.6em]",
    tagline: "text-[0.5625rem] tracking-[0.24em]",
    arabic: "text-xs",
  },
  lg: {
    word: "text-4xl sm:text-5xl",
    sprig: "h-6 w-5 -top-[0.58em]",
    tagline: "text-[0.6875rem] tracking-[0.26em]",
    arabic: "text-sm",
  },
} as const;

type BrandMarkProps = {
  size?: keyof typeof sizes;
  /** Renders the "Your Gateway To Nature" rule and its Arabic translation. */
  withTagline?: boolean;
  /** "light" is for the deep-green footer band. */
  tone?: "dark" | "light";
  /** Wraps the lockup in a link home. Off for the footer's own heading use. */
  href?: string;
  className?: string;
};

/**
 * Rosica wordmark lockup: gold serif wordmark with the botanical "i", the
 * rule-flanked English tagline, and the Arabic translation beneath it.
 */
export default function BrandMark({
  size = "md",
  withTagline = true,
  tone = "dark",
  href = "/",
  className = "",
}: BrandMarkProps) {
  const s = sizes[size];
  const taglineColor = tone === "light" ? "text-linen/80" : "text-ink-muted";

  const lockup = (
    <span className={`flex flex-col ${className}`}>
      <span
        className={`font-serif font-medium leading-none tracking-[0.02em] text-gold ${s.word}`}
      >
        Ros
        <span className="relative inline-block">
          i
          <Sprig className={`absolute left-1/2 -translate-x-1/2 text-gold ${s.sprig}`} />
        </span>
        ca
      </span>

      {withTagline ? (
        <>
          {/* Fixed-width rules rather than .ornament-rule: the lockup is a
              shrink-to-fit column, so flexible rules would collapse to zero. */}
          <span
            className={`mt-1.5 flex items-center justify-center gap-2 whitespace-nowrap uppercase ${s.tagline} ${taglineColor}`}
          >
            <span aria-hidden="true" className="h-px w-4 bg-gold/70" />
            Your Gateway To Nature
            <span aria-hidden="true" className="h-px w-4 bg-gold/70" />
          </span>
          {/* dir="rtl" so the Arabic shapes and orders correctly. */}
          <span
            dir="rtl"
            lang="ar"
            className={`mt-1 text-center font-serif ${s.arabic} ${taglineColor}`}
          >
            بوابتك إلى الطبيعة
          </span>
        </>
      ) : null}
    </span>
  );

  if (!href) return lockup;

  return (
    <Link
      href={href}
      aria-label="Rosica — home"
      className="inline-flex transition-opacity duration-300 hover:opacity-80"
    >
      {lockup}
    </Link>
  );
}
