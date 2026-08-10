import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt } from "@/lib/media";
import { socialLinks } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n";
import { contactCopy, CONTACT_EMAIL } from "@/content/contact";

/** One icon per contact detail, in the order the copy lists them. */
const infoIcons: IconName[] = ["envelope", "globe", "pin", "clock", "calendar"];

/**
 * Honeycomb line motif over the community band, echoing the comb engraved on
 * the Honey & Propolis label and the gold line work used across the site.
 */
function Honeycomb() {
  const cell = "M18 2 32 10v16L18 34 4 26V10Z";
  const at = [
    [0, 0],
    [28, 16],
    [56, 0],
    [28, -16],
    [56, 32],
    [84, 16],
  ];
  return (
    <svg
      viewBox="-10 -30 130 100"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {at.map(([dx, dy]) => (
        <path key={`${dx}-${dy}`} d={cell} transform={`translate(${dx} ${dy})`} />
      ))}
    </svg>
  );
}

export default function ContactView({ locale }: { locale: Locale }) {
  const copy = contactCopy[locale];

  return (
    <>
      {/*
        Copy beside full-height photography, as in the artwork.

        The photograph runs to the edge of the screen, so this grid is full
        width rather than inside the usual container — and the copy column pads
        itself to line its text up with every other page. The section is pushed
        down by the height of the fixed header so the navigation sits on the
        page ground rather than on top of the photograph, where the links lose
        contrast against the blossom.
      */}
      <section className="border-b border-gold/20 bg-shell lg:pt-[5.5rem]">
        <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-6 pb-16 pt-36 sm:px-8 sm:pt-44 lg:py-28 lg:pe-14 lg:ps-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pt-24">
            <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl">{copy.title}</h1>

            <span aria-hidden="true" className="ornament-rule mt-7 max-w-sm">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mt-8 text-lg text-green">{copy.lede}</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{copy.intro}</p>
          </Reveal>

          <div className="group relative min-h-[18rem] lg:min-h-[34rem]">
            <Media
              src={generic.blossomWall}
              alt={genericAlt.blossomWall}
              fill
              bordered={false}
              position="center"
              placeholderTone="cream"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full"
            />
          </div>
        </div>
      </section>

      {/* Details and the invitation to write, split by a hairline rule */}
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="text-gold">
                <Icon name="seedling" className="h-8 w-8" />
              </span>
              <h2 className="eyebrow text-green">{copy.infoHeading}</h2>
            </div>

            <RevealGroup as="ul" className="mt-10 space-y-8" stagger={0.07}>
              {copy.info.map((item, i) => (
                <RevealItem as="li" key={item.label} className="flex items-start gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon name={infoIcons[i]} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    {/* Headings default to the serif; these are UI labels. */}
                    <h3 className="font-sans text-sm font-semibold text-green">{item.label}</h3>
                    <div className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {/* The first two are addresses you can act on, so they link. */}
                      {i === 0 ? (
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="link-underline text-ink-muted transition-colors hover:text-gold-deep"
                        >
                          {item.lines[0]}
                        </a>
                      ) : i === 1 ? (
                        <a
                          href={`https://${item.lines[0]}`}
                          className="link-underline text-ink-muted transition-colors hover:text-gold-deep"
                        >
                          {item.lines[0]}
                        </a>
                      ) : (
                        item.lines.map((line) => <p key={line}>{line}</p>)
                      )}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          {/* The rule sits on this column so it disappears when they stack */}
          <Reveal
            delay={0.1}
            className="lg:border-gold/25 lg:ps-16 ltr:lg:border-l rtl:lg:border-r"
          >
            <h2 className="eyebrow text-green">{copy.writeHeading}</h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted">
              {copy.writeBody}
            </p>
            <div className="mt-9">
              {/* Opens the visitor's own mail client, already addressed. */}
              <CTAButton href={`mailto:${CONTACT_EMAIL}`} variant="gold">
                {copy.writeCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        Community band: photography and honeycomb on one side, the social
        accounts on the other. This used to hold a newsletter sign-up, which
        was removed — nothing was connected behind it, so it thanked people for
        joining and threw the address away. Following the accounts is the real
        version of the same invitation, and needs nothing configured.
      */}
      <section className="border-t border-gold/20 bg-shell">
        <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="group relative min-h-[14rem] lg:min-h-[19rem]">
            <Media
              src={generic.spireaBeige}
              alt={genericAlt.spireaBeige}
              fill
              bordered={false}
              position="center"
              placeholderTone="cream"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-8 w-[58%] text-gold/70 ltr:right-2 rtl:left-2"
            >
              <Honeycomb />
            </span>
          </div>

          <Reveal className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:ps-16 lg:pe-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <div className="flex items-center gap-4">
              <span className="text-gold">
                <Icon name="seedling" className="h-8 w-8" />
              </span>
              <h2 className="text-[1.75rem] leading-tight sm:text-[2rem]">
                {copy.followHeading}
              </h2>
            </div>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              {copy.followBody}
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-gold/45 px-5 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
