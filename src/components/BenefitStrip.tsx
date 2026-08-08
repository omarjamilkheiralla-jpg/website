import Icon, { type IconName } from "./Icon";
import Media from "./Media";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";

export type Benefit = {
  icon: IconName;
  title: string;
  body: string;
  /** Path under /public, or undefined to fall back to the placeholder. */
  image?: string;
  /** Alt text for the image — also the placeholder's description. */
  imageAlt: string;
};

/**
 * Four-cell benefit band. Each cell pairs a gold line icon and copy with
 * imagery alongside it, bleeding to the cell edge — the treatment used on the
 * collection pages in the approved designs.
 */
export default function BenefitStrip({
  benefits,
  heading,
  tone = "shell",
}: {
  benefits: Benefit[];
  /** Screen-reader heading for the band. */
  heading: string;
  tone?: "shell" | "linen";
}) {
  const bg = tone === "shell" ? "bg-shell" : "bg-linen";

  return (
    <section className={bg}>
      <h2 className="sr-only">{heading}</h2>
      <RevealGroup
        as="ul"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
      >
        {benefits.map((benefit) => (
          <RevealItem
            as="li"
            key={benefit.title}
            className={`group flex items-stretch gap-4 ${bg}`}
          >
            <div className="flex min-w-0 flex-1 flex-col py-9 pl-7 sm:pl-8">
              <span className="text-gold">
                <Icon name={benefit.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{benefit.body}</p>
            </div>

            {/* Imagery runs to the cell edge alongside the copy */}
            <div className="w-[38%] shrink-0 self-stretch">
              <Media
                src={benefit.image}
                alt={benefit.imageAlt}
                fill
                bordered={false}
                placeholderTone="cream"
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 130px"
                className="h-full min-h-44"
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
