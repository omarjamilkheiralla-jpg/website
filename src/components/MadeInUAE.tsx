import Icon from "@/components/Icon";
import { provenance } from "@/content/provenance";
import type { Locale } from "@/lib/i18n";

/**
 * The country-of-origin mark.
 *
 * Two shapes, one source of words:
 *
 *   band    a full-width strip, rules running out to either side. Built for
 *           the foot of the home page, where it reads as a seal closing the
 *           page rather than as another section asking to be read.
 *   inline  a compact lockup that sits inside an existing block — used under
 *           the manufacturing pillar on the About page, where the surrounding
 *           copy already carries the argument and this only has to confirm it.
 *
 * The Arabic companion line only appears on the English site; see the note in
 * `src/content/provenance.ts` for why.
 *
 * How the mark is announced follows from that, and it is the one subtle part.
 * When both lines are shown the pairing is decorative — a screen reader that
 * read it straight would say the same claim twice, once per language — so the
 * lockup is hidden and a single clean sentence is announced in its place. When
 * only one line is shown there is nothing to flatten, so it is left plainly
 * readable: adding the sr-only sentence there would reintroduce exactly the
 * duplication the two-line case exists to avoid.
 */
export default function MadeInUAE({
  locale,
  variant = "band",
  className = "",
}: {
  locale: Locale;
  variant?: "band" | "inline";
  className?: string;
}) {
  const copy = provenance[locale];
  const paired = copy.second !== null;

  const lockup = (
    <>
      {/* Only when the visible pairing is being hidden from assistive tech. */}
      {paired ? <span className="sr-only">{copy.a11y}</span> : null}
      <span
        {...(paired ? { "aria-hidden": true as const } : {})}
        className={`flex flex-col gap-1.5 ${
          variant === "band" ? "items-center" : "items-start"
        }`}
      >
        <span className="flex items-center gap-2.5 text-gold">
          <Icon name="certificate" className="h-4 w-4" />
          <span className="eyebrow text-gold-deep">{copy.primary}</span>
        </span>
        {/*
          This line is Arabic whichever tree it renders in, so it carries its
          own dir and lang rather than inheriting the page's.
        */}
        {copy.second ? (
          <span dir="rtl" lang="ar" className="text-[0.8125rem] leading-relaxed text-ink-muted">
            {copy.second}
          </span>
        ) : null}
      </span>
    </>
  );

  if (variant === "inline") {
    return <p className={className}>{lockup}</p>;
  }

  return (
    <div className={`border-t border-gold/20 bg-cream ${className}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-6 py-8 sm:gap-7 sm:px-8 sm:py-10">
        <span aria-hidden="true" className="h-px flex-1 bg-gold/35" />
        <p className="text-center">{lockup}</p>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/35" />
      </div>
    </div>
  );
}
