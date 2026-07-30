import Icon, { type IconName } from "./Icon";
import ImagePlaceholder from "./ImagePlaceholder";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";

export type Benefit = {
  icon: IconName;
  title: string;
  body: string;
  /** Describes the imagery that belongs in this cell. */
  image: string;
};

/**
 * Full-width band of four benefits, each pairing a gold line icon and copy with
 * a small square image tile — the benefit row used on the collection pages.
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
  return (
    <section className={tone === "shell" ? "bg-shell" : "bg-linen"}>
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
            className={`group flex flex-col p-8 sm:p-9 ${
              tone === "shell" ? "bg-shell" : "bg-linen"
            }`}
          >
            <span className="text-gold">
              <Icon name={benefit.icon} className="h-8 w-8" />
            </span>
            <h3 className="mt-5 text-xl">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{benefit.body}</p>

            {/* Pushed to the bottom so the tiles align across uneven copy. */}
            <div className="mt-auto pt-7">
              {/* TODO: replace with real photography */}
              <ImagePlaceholder
                label={benefit.image}
                ratio="wide"
                tone="cream"
                rounded={false}
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
