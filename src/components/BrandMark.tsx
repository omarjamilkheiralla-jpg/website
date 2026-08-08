import Link from "next/link";

/** Petal angles for the daisy head, evenly spaced around the centre. */
const PETALS = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * The Rosica botanical mark: a daisy head over a pair of leaves and a braided
 * caduceus stem. It stands in for the "i" in the wordmark, exactly as the
 * brand logo does.
 *
 * Drawn as vector rather than placed as a bitmap so it stays crisp at every
 * size — the supplied logo file is a 219px screenshot and cannot be enlarged.
 */
function BotanicalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 80"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Daisy head — roughly the top third of the mark, as in the logo */}
      <g>
        {PETALS.map((angle) => (
          <ellipse key={angle} cx="20" cy="7" rx="2.0" ry="6.6" transform={`rotate(${angle} 20 15)`} />
        ))}
        <circle cx="20" cy="15" r="3.2" />
      </g>

      {/* Leaf pair, sweeping outward beneath the head */}
      <path d="M19.1 49.5c-1.9-4.8-6.2-8.3-12.9-9.4 1.4 6 5.8 9.9 12.9 9.4Z" />
      <path d="M20.9 49.5c1.9-4.8 6.2-8.3 12.9-9.4-1.4 6-5.8 9.9-12.9 9.4Z" />

      {/* Braided stem: mirrored strands crossing a central axis, tapering to a point */}
      <path d="M20 30c-3.8 3.5-3.8 7 0 10.5 3.8-3.5 3.8-7 0-10.5Z" />
      <path d="M20 41c-3.2 3.1-3.2 6.2 0 9.3 3.2-3.1 3.2-6.2 0-9.3Z" />
      <path d="M20 50.6c-2.7 2.7-2.7 5.4 0 8.1 2.7-2.7 2.7-5.4 0-8.1Z" />
      <path d="M20 59c-2.1 2.2-2.1 4.4 0 6.6 2.1-2.2 2.1-4.4 0-6.6Z" />
      <path d="M20 66c-1.6 1.7-1.6 3.4 0 5.1 1.6-1.7 1.6-3.4 0-5.1Z" />
      <path d="M20 71.6c-.9 1.15-.9 2.3 0 3.45.9-1.15.9-2.3 0-3.45Z" />
      <path d="M19.55 75.6h.9L20 79.6Z" />
    </svg>
  );
}

const sizes = {
  sm: {
    word: "text-2xl",
    tagline: "text-[0.5rem] tracking-[0.22em]",
    arabic: "text-[0.6rem]",
  },
  md: {
    word: "text-3xl sm:text-[2rem]",
    tagline: "text-[0.5625rem] tracking-[0.24em]",
    arabic: "text-xs",
  },
  lg: {
    word: "text-4xl sm:text-5xl",
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
        {/* The mark replaces the letter, as it does in the brand logo. The
            letter itself stays for screen readers and for copied text. */}
        <span className="relative inline-block h-[1em] w-[0.30em] align-baseline">
          <span className="sr-only">i</span>
          <BotanicalMark className="absolute bottom-[-0.05em] left-1/2 h-[0.88em] w-auto -translate-x-1/2 text-gold" />
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
