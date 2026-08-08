import type { Metadata } from "next";
import BrandMark from "@/components/BrandMark";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import Icon from "@/components/Icon";
import Media from "@/components/Media";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "Ingredient Library | The Power of Botanical Ingredients",
  description:
    "Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products.",
};

/**
 * The four featured botanicals. Names only — the brief supplies no descriptive
 * copy for them, and product-adjacent claims are not ours to invent.
 */
const ingredients = [
  { name: "Honey", image: generic.honey, alt: genericAlt.honey },
  { name: "Propolis", image: generic.propolis, alt: genericAlt.propolis },
  { name: "Aloe Vera", image: generic.aloeVera, alt: genericAlt.aloeVera },
  { name: "Rosemary", image: generic.rosemary, alt: genericAlt.rosemary },
];

export default function IngredientsPage() {
  return (
    <>
      {/* Brand lockup leads the page, as requested */}
      <section className="bg-shell">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-36 text-center sm:px-8 sm:pt-44">
          <Reveal className="flex justify-center">
            <BrandMark size="lg" href="" className="items-center" />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow mt-12 text-gold-deep">Ingredient Library</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
              The Power of Botanical Ingredients
            </h1>

            <span
              aria-hidden="true"
              className="ornament-rule mx-auto mt-8 max-w-sm"
            >
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-muted">
              Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces
              the carefully selected botanicals behind our products, explaining their traditional
              uses, cosmetic benefits, and role within each formulation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The botanicals */}
      <Section tone="cream" spacing="loose">
        <h2 className="sr-only">Featured botanical ingredients</h2>
        <RevealGroup
          as="ul"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {ingredients.map((ingredient) => (
            <RevealItem as="li" key={ingredient.name} className="h-full">
              <article className="card-lift group flex h-full flex-col border border-gold/20 bg-shell p-5 hover:border-gold/60">
                <Media
                  src={ingredient.image}
                  alt={ingredient.alt}
                  ratio="square"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
                <h3 className="mt-6 pb-1 text-center text-[0.6875rem] uppercase tracking-[0.18em] text-green">
                  {ingredient.name}
                </h3>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing band */}
      <Section tone="green">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl text-cream sm:text-4xl">
              Every formula begins with a botanical.
            </h2>
            <span aria-hidden="true" className="mx-auto mt-8 block h-px w-24 bg-gold" />
            <p className="mt-8 text-base leading-relaxed text-linen/85">
              See how these ingredients come together across the Rosica collections.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CTAButton href="/collections" variant="light">
                Explore Collections
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
