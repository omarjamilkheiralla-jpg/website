import Image from "next/image";
import Link from "next/link";

/**
 * The Rosica wordmark, from the brand's own artwork.
 *
 * This is a registered mark: it is placed as the supplied file and is never
 * redrawn, retraced, recoloured or rebuilt from type. Earlier revisions of this
 * component set the wordmark in Cormorant and drew the botanical "i" as an SVG
 * — that was wrong and has been removed. If the lockup needs to change, the
 * change belongs in the artwork, not here.
 */
const WORDMARK = "/images/rosica-wordmark-gold.png";

/** Intrinsic size of the trimmed artwork; the aspect never varies. */
const ART = { width: 689, height: 234 };

/** Rendered height of the wordmark per size; width follows the aspect. */
const sizes = {
  sm: {
    mark: 30,
    tagline: "text-[0.5625rem] tracking-[0.06em]",
    arabic: "text-[0.6rem]",
  },
  md: {
    mark: 38,
    tagline: "text-[0.6875rem] tracking-[0.07em]",
    arabic: "text-xs",
  },
  lg: {
    mark: 62,
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

export default function BrandMark({
  size = "md",
  withTagline = true,
  tone = "dark",
  href = "/",
  className = "",
}: BrandMarkProps) {
  const s = sizes[size];
  const taglineColor = tone === "light" ? "text-linen/80" : "text-ink-muted";
  const markHeight = s.mark;
  const markWidth = Math.round((markHeight * ART.width) / ART.height);

  /*
    items-center matters more than it looks. The tagline row is wider than the
    wordmark, so it sets the column's width — and without centring, the
    wordmark (which has a fixed width) sits flush against the start edge while
    the tagline centres itself underneath. That left the mark 36px off centre
    in the header and the footer.
  */
  const lockup = (
    <span className={`flex flex-col items-center ${className}`}>
      <Image
        src={WORDMARK}
        alt="Rosica"
        width={markWidth}
        height={markHeight}
        quality={90}
        priority={size !== "sm" ? undefined : true}
        style={{ width: markWidth, height: markHeight }}
        className="max-w-full object-contain"
      />

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
