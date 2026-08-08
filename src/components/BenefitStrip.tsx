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
 * Four-cell benefit band. Copy sits above its photograph rather than beside it:
 * at four cells across, a side-by-side split left the image too narrow to read
 * as photography. Each image is inset from the cell edge so it floats, and is
 * therefore rounded.
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
            className={`group flex flex-col px-7 py-9 sm:px-8 ${bg}`}
          >
            <span className="text-gold">
              <Icon name={benefit.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{benefit.body}</p>

            {/* Photography closes the cell, given the full width to breathe */}
            <div className="mt-auto pt-8">
              <Media
                src={benefit.image}
                alt={benefit.imageAlt}
                ratio="landscape"
                rounded
                bordered={false}
                placeholderTone="cream"
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 300px"
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
