import Section from "./Section";
import Reveal from "./motion/Reveal";

type BrandStatementProps = {
  title: string;
  body: string;
  tone?: "ink" | "green";
};

/** Closing full-width band that ends the collection pages. */
export default function BrandStatement({ title, body, tone = "ink" }: BrandStatementProps) {
  return (
    <Section tone={tone} spacing="loose">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl text-cream sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-8 block h-px w-24 bg-gold"
          />
          <p className="mt-8 text-base leading-relaxed text-linen/85">{body}</p>
        </div>
      </Reveal>
    </Section>
  );
}
