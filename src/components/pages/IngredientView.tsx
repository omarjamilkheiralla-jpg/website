import Section from "@/components/Section";
import ArrowLink from "@/components/ArrowLink";
import CTAButton from "@/components/CTAButton";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { productPhoto } from "@/lib/product-media";
import { ingredientPhoto } from "@/lib/ingredient-media";
import { localePath, type Locale } from "@/lib/i18n";
import { PRODUCT_NAMES, productChrome, productPages } from "@/content/products";
import { productPath } from "./ProductView";
import {
  INGREDIENT_PRODUCTS,
  ingredientChrome,
  ingredientPages,
  type IngredientSlug,
} from "@/content/ingredient-pages";

/** `/ingredients/<slug>` — one botanical's own page. */
export const ingredientPath = (slug: IngredientSlug) => `/ingredients/${slug}`;

export default function IngredientView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: IngredientSlug;
}) {
  const copy = ingredientPages[locale][slug];
  const chrome = ingredientChrome[locale];
  const photo = ingredientPhoto[slug];
  const inProducts = INGREDIENT_PRODUCTS[slug];

  return (
    <>
      <section className="bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Media
              src={photo.src}
              alt={photo.alt}
              ratio="square"
              rounded
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-gold-deep">{chrome.eyebrow}</p>
            <h1 className="mt-4 text-[2.25rem] leading-[1.1] sm:text-[2.75rem]">{copy.name}</h1>

            <span aria-hidden="true" className="ornament-rule mt-7 max-w-sm">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted">{copy.lede}</p>

            <div className="mt-9">
              <ArrowLink href={localePath(locale, "/ingredients")}>
                {chrome.backToLibrary}
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="cream">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-serif text-2xl text-green sm:text-[1.75rem]">
              {copy.natureHeading}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              {copy.nature.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-serif text-2xl text-green sm:text-[1.75rem]">
              {copy.formulationHeading}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
              {copy.formulation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Only the products whose labels name this ingredient. */}
      <Section tone="shell" divider>
        <Reveal>
          <h2 className="text-[2rem] leading-tight sm:text-4xl">{chrome.foundInHeading}</h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {inProducts.map((productSlug) => (
            <RevealItem as="li" key={productSlug} className="h-full">
              <article className="card-lift flex h-full flex-col rounded-md border border-gold/20 bg-cream p-5 hover:border-gold/60">
                <Media
                  src={productPhoto[productSlug].src}
                  alt={productPhoto[productSlug].alt}
                  ratio="square"
                  rounded
                  placeholderTone="cream"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
                <p className="eyebrow mt-5 text-gold-deep">
                  {productPages[locale][productSlug].collection}
                </p>
                <h3 className="mt-3 font-serif text-lg leading-snug text-green">
                  {PRODUCT_NAMES[productSlug]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {productPages[locale][productSlug].sub}
                </p>
                <div className="mt-auto pt-5">
                  <ArrowLink
                    href={localePath(locale, productPath(productSlug))}
                    label={`${chrome.exploreProduct} — ${PRODUCT_NAMES[productSlug]}`}
                  >
                    {chrome.exploreProduct}
                  </ArrowLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.12} className="mt-12">
          <CTAButton href={localePath(locale, "/collections")} variant="secondary">
            {productChrome[locale].viewCollection}
          </CTAButton>
        </Reveal>
      </Section>
    </>
  );
}
