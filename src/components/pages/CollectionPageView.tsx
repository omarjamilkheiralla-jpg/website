import Hero, { type HeroFeature } from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import Media from "@/components/Media";
import Price from "@/components/Price";
import ProductSlider from "@/components/ProductSlider";
import Reveal from "@/components/motion/Reveal";
import type { IconName } from "@/components/Icon";
import { generic, genericAlt, product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { essentialsCopy, pureCopy, type CollectionPageCopy } from "@/content/collection-pages";
import { PRODUCT_COLLECTION, PRODUCT_SLUGS } from "@/content/products";
import { getOffers } from "@/lib/shopify/products";
import { sliderProducts } from "@/lib/slider-products";

/**
 * Art direction for the two collection pages. Icons and photography are the
 * same in both languages and pair with the copy by index, so the content files
 * carry words only.
 */
const art = {
  essentials: {
    featureIcons: ["shield", "waves", "scales"] as IconName[],
    benefitIcons: ["leaf", "molecule", "droplet", "globe"] as IconName[],
    benefitImages: [
      { src: generic.chamomile, alt: genericAlt.chamomile },
      { src: generic.labFlatlay, alt: genericAlt.labFlatlay },
      { src: generic.hairTexture, alt: genericAlt.hairTexture },
      { src: generic.leaves, alt: genericAlt.leaves },
    ],
    standardIcons: ["beaker", "droplet", "flask", "seedling"] as IconName[],
    promiseImage: { src: generic.labGlassware, alt: genericAlt.labGlassware },
    hero: {
      src: product.essentialsGroupHero,
      rtl: product.essentialsGroupHeroRtl,
      alt: productAlt.essentialsGroupHero,
    },
  },
  pure: {
    featureIcons: ["leaf", "droplet", "lotus", "sparkle"] as IconName[],
    benefitIcons: ["leaf", "molecule", "droplet", "globe"] as IconName[],
    benefitImages: [
      { src: generic.vaseLinen, alt: genericAlt.vaseLinen },
      { src: generic.labFlaskFlower, alt: genericAlt.labFlaskFlower },
      { src: generic.hairWaves, alt: genericAlt.hairWaves },
      { src: generic.foliage, alt: genericAlt.foliage },
    ],
    standardIcons: ["beaker", "flask", "droplet", "seedling"] as IconName[],
    promiseImage: { src: generic.labOverhead, alt: genericAlt.labOverhead },
    hero: {
      src: product.pureBottleHero,
      rtl: product.pureBottleHeroRtl,
      alt: productAlt.pureBottleHero,
    },
  },
} as const;

export const collectionPageCopy = { essentials: essentialsCopy, pure: pureCopy };

export default async function CollectionPageView({
  collection,
  locale,
}: {
  collection: keyof typeof art;
  locale: Locale;
}) {
  const copy: CollectionPageCopy = collectionPageCopy[collection][locale];
  const design = art[collection];

  /* This collection's own products, in the order the range is listed. */
  const slugs = PRODUCT_SLUGS.filter(
    (slug) => PRODUCT_COLLECTION[slug] === `/collections/${collection}`,
  );
  const cards = sliderProducts(locale, slugs, await getOffers());

  const heroFeatures: HeroFeature[] = copy.features.map((label, i) => ({
    icon: design.featureIcons[i],
    label,
  }));

  const benefits: Benefit[] = copy.benefits.map((benefit, i) => ({
    icon: design.benefitIcons[i],
    title: benefit.title,
    body: benefit.body,
    image: design.benefitImages[i].src,
    imageAlt: design.benefitImages[i].alt,
  }));

  const standards: Standard[] = copy.standards.map((label, i) => ({
    icon: design.standardIcons[i],
    label,
  }));

  return (
    <>
      <Hero
        eyebrow={copy.eyebrow}
        title={copy.title}
        ornament
        body={copy.intro}
        features={heroFeatures}
        image={design.hero.src}
        imageRtl={design.hero.rtl}
        imageLabel={design.hero.alt}
        actions={
          <CTAButton href={localePath(locale, "/collections")}>{copy.heroCta}</CTAButton>
        }
      />

      {/*
        The collection's own products.

        A carousel needs neighbours to turn away either side; with a single
        product it would be one card revolving in an empty rail, so Pure gets a
        plain card instead. The rule is the count, not the collection, so adding
        a second Pure product turns the rail on by itself.
      */}
      <section className="border-t border-gold/20 bg-cream py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-deep">{copy.productsEyebrow}</p>
            <h2 className="mt-3 text-[2rem] leading-tight sm:text-4xl">{copy.productsTitle}</h2>
          </Reveal>
        </div>

        {cards.length > 1 ? (
          <Reveal className="mt-12" delay={0.1}>
            <ProductSlider products={cards} locale={locale} />
          </Reveal>
        ) : (
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
            {cards.map((card) => (
              <Reveal key={card.name} className="mt-10" delay={0.1}>
                <article className="card-lift mx-auto flex max-w-sm flex-col overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                  <Media
                    src={card.image}
                    alt={card.imageAlt}
                    ratio="square"
                    bordered={false}
                    placeholderTone="cream"
                    sizes="(max-width: 640px) 100vw, 384px"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-gold-deep">{card.collection}</p>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-green">{card.name}</h3>
                    {card.sub ? (
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.sub}</p>
                    ) : null}
                    {card.note ? (
                      <p className="mt-2 text-xs leading-relaxed text-gold-deep">{card.note}</p>
                    ) : null}
                    {card.price ? (
                      <Price
                        locale={locale}
                        price={card.price}
                        compareAt={card.compareAt}
                        size="sm"
                        className="mt-3"
                      />
                    ) : null}
                    <div className="mt-auto pt-6">
                      <ArrowLink href={card.href} label={`${card.cta} — ${card.name}`}>
                        {card.cta}
                      </ArrowLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <BenefitStrip heading={copy.benefitsHeading} benefits={benefits} />

      <PromiseBand
        image={design.promiseImage.src}
        imageAlt={design.promiseImage.alt}
        heading={copy.promiseHeading}
        body={copy.promiseBody}
        standards={standards}
        statement={copy.statement}
      />
    </>
  );
}
