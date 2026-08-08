import Link from "next/link";

/** Eight broad petals, evenly spaced — the arrangement in the brand mark. */
const PETALS = Array.from({ length: 8 }, (_, i) => i * 45);

/**
 * The Rosica botanical mark: an eight-petal flower over a pair of upswept
 * leaves and a caduceus stem of stacked beads. It stands in for the "i" in the
 * wordmark, exactly as the brand logo does.
 *
 * Traced from the logo in the approved About page artwork. Drawn as vector so
 * it stays crisp at every size — the supplied logo file is a 219px screenshot
 * and cannot be enlarged.
 */
function BotanicalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 42 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* Flower head: eight pointed, leaf-shaped petals around a small centre */}
      <g>
        {PETALS.map((angle) => (
          <path
            key={angle}
            d="M21 1c4.5 7 5.7 13.2 0 20.5-5.7-7.3-4.5-13.5 0-20.5Z"
            transform={`rotate(${angle} 21 21.5)`}
          />
        ))}
        <circle cx="21" cy="21.5" r="3.1" />
      </g>

      {/* Leaf pair, sweeping upward and outward from the stem */}
      <path d="M21 55.5c-7.8-1.2-14-6.2-15.8-15 7.4.7 13.6 6 15.8 15Z" />
      <path d="M21 55.5c7.8-1.2 14-6.2 15.8-15-7.4.7-13.6 6-15.8 15Z" />

      {/* Caduceus stem: stacked beads tapering to a fine tail */}
      <ellipse cx="21" cy="60.5" rx="4.3" ry="3.5" />
      <ellipse cx="21" cy="68.5" rx="3.7" ry="3.1" />
      <ellipse cx="21" cy="76" rx="3.1" ry="2.7" />
      <ellipse cx="21" cy="82.6" rx="2.5" ry="2.2" />
      <ellipse cx="21" cy="88" rx="1.8" ry="1.7" />
      {/* Fine strands crossing the beads, giving the braided read */}
      <path d="M15.6 64.2h10.8v1H15.6ZM16.4 72h9.2v1h-9.2ZM17.2 79.2h7.6v.9h-7.6ZM18 85.2h6v.8h-6Z" />
      <path d="M20.3 90.6h1.4L21 100Z" />
    </svg>
  );
}

const sizes = {
  sm: {
    word: "text-2xl",
    tagline: "text-[0.5625rem] tracking-[0.06em]",
    arabic: "text-[0.6rem]",
  },
  md: {
    word: "text-3xl sm:text-[2rem]",
    tagline: "text-[0.6875rem] tracking-[0.07em]",
    arabic: "text-xs",
  },
  lg: {
    word: "text-4xl sm:text-5xl",
    tagline: "text-[0.875rem] tracking-[0.08em]",
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
      {/*
        Exposed as a labelled image so assistive tech announces "Rosica" once
        rather than spelling the botanical "i" out of the wordmark.

        Gold on cream is 2.06:1, below the 3:1 an automated contrast checker
        asks of large text. That is deliberate and permitted: WCAG 1.4.3 exempts
        text that is part of a logo or brand name, and this is the approved
        lockup. Do not darken it to satisfy a linter — the tagline beneath is
        real text and does carry a passing contrast ratio.
      */}
      <span
        role="img"
        aria-label="Rosica"
        className={`font-serif font-medium leading-none tracking-[0.02em] text-gold ${s.word}`}
      >
        <span aria-hidden="true">
          Ros
          {/* The mark replaces the letter, as it does in the brand logo. */}
          <span className="relative inline-block h-[1em] w-[0.38em] align-baseline">
            <BotanicalMark className="absolute bottom-[-0.12em] left-1/2 h-[1.10em] w-auto -translate-x-1/2 text-gold" />
          </span>
          ca
        </span>
      </span>

      {withTagline ? (
        <>
          {/* Fixed-width rules rather than .ornament-rule: the lockup is a
              shrink-to-fit column, so flexible rules would collapse to zero. */}
          <span
            className={`mt-1.5 flex items-center justify-center gap-2.5 whitespace-nowrap font-serif ${s.tagline} ${taglineColor}`}
          >
            <span aria-hidden="true" className="h-px w-5 bg-gold/80" />
            Your Gateway To Nature
            <span aria-hidden="true" className="h-px w-5 bg-gold/80" />
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
