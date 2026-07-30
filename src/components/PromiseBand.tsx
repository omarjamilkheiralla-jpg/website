import Icon, { type IconName } from "./Icon";
import ImagePlaceholder from "./ImagePlaceholder";
import Reveal from "./motion/Reveal";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";

export type Standard = { icon: IconName; label: string };

type PromiseBandProps = {
  image: string;
  heading: string;
  body: string[];
  /** The short promise list that follows the body copy. */
  promises: string[];
  standards: Standard[];
  /** Closing brand statement, one line per array entry. */
  statement: string[];
  statementBody: string;
};

/**
 * The promise band from the approved collection designs: photography on the
 * left, the collection promise and its formula standards through the middle,
 * and the closing brand statement on the right.
 */
export default function PromiseBand({
  image,
  heading,
  body,
  promises,
  standards,
  statement,
  statementBody,
}: PromiseBandProps) {
  return (
    <section className="bg-linen">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)_minmax(0,1.15fr)]">
        {/* TODO: replace with real photography */}
        <div className="group bg-linen">
          <ImagePlaceholder
            label={image}
            tone="cream"
            rounded={false}
            bordered={false}
            fill
            className="h-full min-h-64"
          />
        </div>

        <Reveal className="bg-linen px-8 py-14 sm:px-10 lg:px-12">
          <h2 className="text-3xl sm:text-[2.125rem]">{heading}</h2>

          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 font-serif text-lg text-green">
                <span aria-hidden="true" className="h-px w-5 shrink-0 bg-gold" />
                {promise}
              </li>
            ))}
          </ul>

          <h3 className="sr-only">Formula standards</h3>
          <RevealGroup
            as="ul"
            className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/25 pt-8 lg:grid-cols-4"
            stagger={0.08}
          >
            {standards.map((standard) => (
              <RevealItem as="li" key={standard.label} className="flex items-center gap-3">
                <span className="shrink-0 text-gold">
                  <Icon name={standard.icon} className="h-7 w-7" />
                </span>
                <span className="text-sm leading-snug text-ink-muted">{standard.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal
          className="flex flex-col justify-center bg-linen px-8 py-14 sm:px-10 lg:px-12"
          delay={0.12}
        >
          <h2 className="text-[1.75rem] leading-snug">
            {statement.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <span aria-hidden="true" className="ornament-rule mt-8 max-w-56">
            <Icon name="sparkle" className="h-3.5 w-3.5" />
          </span>

          <p className="mt-8 text-sm leading-relaxed text-ink-muted">{statementBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
