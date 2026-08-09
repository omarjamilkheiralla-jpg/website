import Hero, { type HeroFeature } from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import type { IconName } from "@/components/Icon";
import { generic, genericAlt, product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { essentialsCopy, pureCopy, type CollectionPageCopy } from "@/content/collection-pages";

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
      { src: generic.hairScalp, alt: genericAlt.hairScalp },
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

export default function CollectionPageView({
  collection,
  locale,
}: {
  collection: keyof typeof art;
  locale: Locale;
}) {
  const copy: CollectionPageCopy = collectionPageCopy[collection][locale];
  const design = art[collection];

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
