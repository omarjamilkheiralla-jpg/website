import Icon, { type IconName } from "./Icon";
import Media from "./Media";
import Reveal from "./motion/Reveal";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";

export type Standard = { icon: IconName; label: string };

type PromiseBandProps = {
  image?: string;
  imageAlt: string;
  heading: string;
  body: string[];
  standards: Standard[];
  /** Closing brand statement, one line per array entry. */
  statement: string[];
};

/**
 * The promise band from the approved collection designs: photography on the
 * left, the collection promise and its formula standards through the middle,
 * and the closing brand statement on the right. Full width, so square-edged.
 */
export default function PromiseBand({
  image,
  imageAlt,
  heading,
  body,
  standards,
  statement,
}: PromiseBandProps) {
  return (
    <section className="border-t border-gold/20 bg-linen">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,2.25fr)_minmax(0,1.15fr)]">
        <div className="group bg-linen">
          <Media
            src={image}
            alt={imageAlt}
            fill
            bordered={false}
            placeholderTone="cream"
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="h-full min-h-[20rem]"
          />
        </div>

        <Reveal className="bg-linen px-8 py-12 sm:px-10">
          <h2 className="text-[1.75rem] sm:text-3xl">{heading}</h2>

          <div className="mt-5 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-muted">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="sr-only">Formula standards</h3>
          <RevealGroup
            as="ul"
            className="mt-9 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-gold/25 pt-7 lg:grid-cols-4"
            stagger={0.08}
          >
            {standards.map((standard) => (
              <RevealItem as="li" key={standard.label} className="flex items-center gap-2.5">
                <span className="shrink-0 text-gold">
                  <Icon name={standard.icon} className="h-7 w-7" />
                </span>
                <span className="min-w-0 text-xs leading-snug text-ink-muted">
                  {standard.label}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal className="flex flex-col justify-center bg-linen px-8 py-12 sm:px-10" delay={0.12}>
          <h2 className="text-2xl leading-snug sm:text-[1.75rem]">
            {statement.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <span aria-hidden="true" className="ornament-rule mt-7 max-w-52">
            <Icon name="sparkle" className="h-3.5 w-3.5" />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
