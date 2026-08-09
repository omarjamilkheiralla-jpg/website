import BrandMark from "@/components/BrandMark";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import Icon from "@/components/Icon";
import Media from "@/components/Media";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { ingredientsCopy } from "@/content/ingredients";

/** Photography for the four botanicals, in the same order as the copy. */
const photos = [
  { image: generic.honey, alt: genericAlt.honey },
  { image: generic.propolis, alt: genericAlt.propolis },
  { image: generic.aloeVera, alt: genericAlt.aloeVera },
  { image: generic.rosemary, alt: genericAlt.rosemary },
];

export default function IngredientsView({ locale }: { locale: Locale }) {
  const copy = ingredientsCopy[locale];

  return (
    <>
      {/* Brand lockup leads the page, as requested */}
      <section className="bg-shell">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-36 text-center sm:px-8 sm:pt-44">
          <Reveal className="flex justify-center">
            <BrandMark size="lg" href="" className="items-center" />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow mt-12 text-gold-deep">{copy.eyebrow}</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              {copy.title}
            </h1>

            <span aria-hidden="true" className="ornament-rule mx-auto mt-8 max-w-sm">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted">
              {copy.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The botanicals */}
      <Section tone="cream" spacing="loose">
        <h2 className="sr-only">{copy.listHeading}</h2>
        <RevealGroup
          as="ul"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {copy.items.map((ingredient, i) => (
            <RevealItem as="li" key={ingredient.name} className="h-full">
              <article className="card-lift group flex h-full flex-col rounded-md border border-gold/20 bg-shell p-5 hover:border-gold/60">
                <Media
                  src={photos[i].image}
                  alt={photos[i].alt}
                  ratio="square"
                  rounded
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
                <h3 className="mt-6 text-center text-[0.6875rem] uppercase tracking-[0.18em] text-green">
                  {ingredient.name}
                </h3>
                <p className="mt-3 pb-1 text-center text-sm leading-relaxed text-ink-muted">
                  {ingredient.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing band */}
      <Section tone="green">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl text-cream sm:text-4xl">{copy.closingTitle}</h2>
            <span aria-hidden="true" className="mx-auto mt-8 block h-px w-24 bg-gold" />
            <p className="mt-8 text-base leading-relaxed text-linen/85">{copy.closingBody}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CTAButton href={localePath(locale, "/collections")} variant="light">
                {copy.closingCta}
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
