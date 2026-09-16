import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt } from "@/lib/media";
import { uaeCopy } from "@/content/uae";
import type { Locale } from "@/lib/i18n";

/** Paired with the copy by index: country, certification, registration. */
const markIcons: IconName[] = ["uaeMap", "rosette", "registered"];

/**
 * The home page's provenance band.
 *
 * Sits between the values strip and the ingredient library, on shell so it
 * separates itself from the cream either side without needing a heavier
 * device than the hairline rules already used across the page.
 *
 * The three marks carry an Arabic sub-label on the English site and none on
 * the Arabic one — see the note in `src/content/uae.ts`. Because that pairing
 * is a bilingual flourish rather than two facts, the sub-label is hidden from
 * assistive technology: a screen reader on the English site would otherwise
 * read each mark twice, once per language.
 */
export default function MadeInUAE({ locale }: { locale: Locale }) {
  const copy = uaeCopy[locale].home;

  return (
    <section
      aria-labelledby="uae-band"
      className="border-y border-gold/20 bg-shell"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        {/* The claim */}
        <Reveal className="px-6 py-14 sm:px-8 sm:py-16">
          <p className="eyebrow text-gold-deep">{copy.eyebrow}</p>
          <h2 id="uae-band" className="mt-2 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">
            {copy.title}
          </h2>
          <p className="mt-3 font-serif text-xl text-gold-deep sm:text-[1.375rem]">
            {copy.tagline}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
            {copy.body}
          </p>

          {/* Country, certification, registration — split by hairline rules. */}
          <RevealGroup
            as="ul"
            className="mt-10 grid max-w-2xl grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0"
            stagger={0.08}
          >
            {copy.marks.map((mark, i) => (
              <RevealItem
                as="li"
                key={mark.label}
                className={
                  i === 0
                    ? "sm:pe-5"
                    : "sm:border-s sm:border-gold/30 sm:px-5 last:sm:pe-0"
                }
              >
                <span className="flex text-gold">
                  <Icon name={markIcons[i]} className="h-9 w-9" />
                </span>
                <p className="mt-3.5 text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.16em] text-green">
                  {mark.label}
                </p>
                {mark.ar ? (
                  <p
                    aria-hidden="true"
                    dir="rtl"
                    lang="ar"
                    className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted"
                  >
                    {mark.ar}
                  </p>
                ) : null}
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        {/*
          The photograph, running to the band's edges. Its caption sits over the
          image rather than under it, as in the artwork — set on a soft scrim so
          it stays legible whatever the photograph does behind it.
        */}
        <div className="relative min-h-[15rem] lg:min-h-full">
          <Media
            src={generic.foliage}
            alt={genericAlt.foliage}
            fill
            bordered={false}
            placeholderTone="cream"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="h-full"
          />
          <p className="absolute top-8 flex flex-col gap-2.5 ltr:right-7 rtl:left-7">
            <span className="eyebrow max-w-[7.5rem] text-end text-green rtl:text-start">
              {copy.caption}
            </span>
            <span aria-hidden="true" className="h-px w-12 self-end bg-gold rtl:self-start" />
          </p>
        </div>
      </div>
    </section>
  );
}
