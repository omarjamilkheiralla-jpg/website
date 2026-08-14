import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import ProductSlider, { type SliderProduct } from "@/components/ProductSlider";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { collectionsCopy } from "@/content/collections";
import { PRODUCT_NAMES, PRODUCT_SLUGS } from "@/content/products";
import { productPhoto } from "@/lib/product-media";
import { productPath } from "@/components/pages/ProductView";

/**
 * Art direction, paired with the copy by index. Adding a Skin Care or Body
 * Care collection means one entry here and one in the content file.
 */
const art = [
  {
    href: "/collections/essentials",
    featureIcons: ["droplet", "waves", "shield", "scales"] as IconName[],
    image: product.essentialsGroupPanel,
    imageAlt: productAlt.essentialsGroupPanel,
  },
  {
    href: "/collections/pure",
    featureIcons: ["leaf", "droplet", "lotus", "sparkle"] as IconName[],
    image: product.pureBottlePanel,
    imageAlt: productAlt.pureBottlePanel,
  },
];

const pillarIcons: IconName[] = ["seedling", "flask", "mortar", "globe"];

/**
 * The four products, in the order they are listed in the content file. Names
 * are the ones printed on the bottles and stay in Latin in both languages.
 *
 * Each card now opens the product's own page rather than its collection, which
 * is where the size, hair type, named ingredients and Buy Now live.
 */
const productArt = PRODUCT_SLUGS.map((slug) => ({
  name: PRODUCT_NAMES[slug],
  image: productPhoto[slug].src,
  imageAlt: productPhoto[slug].alt,
  href: productPath(slug),
}));

export default function CollectionsView({ locale }: { locale: Locale }) {
  const copy = collectionsCopy[locale];

  const sliderProducts: SliderProduct[] = copy.products.map((item, i) => ({
    name: productArt[i].name,
    sub: item.sub,
    collection: item.collection,
    cta: item.cta,
    image: productArt[i].image,
    imageAlt: productArt[i].imageAlt,
    href: localePath(locale, productArt[i].href),
  }));

  return (
    <>
      <Hero
        eyebrow={copy.eyebrow}
        title={copy.title}
        body={copy.intro}
        image={product.rangeGroupHero}
        imageRtl={product.rangeGroupHeroRtl}
        imageLabel={productAlt.rangeGroupHero}
        actions={<CTAButton href="#collections">{copy.heroCta}</CTAButton>}
      />

      {/* Essentials and Pure, given identical visual weight */}
      <section id="collections" className="bg-shell">
        <h2 className="sr-only">{copy.listHeading}</h2>
        <RevealGroup
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-14 sm:px-8 lg:grid-cols-2"
          stagger={0.12}
        >
          {copy.collections.map((collection, i) => (
            <RevealItem key={collection.name} className="h-full">
              <article className="card-lift group flex h-full items-stretch overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8 lg:p-9">
                  <p className="eyebrow text-gold-deep">{collection.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-2xl uppercase tracking-[0.06em] text-green sm:text-3xl lg:text-4xl">
                    {collection.name}
                  </h3>

                  <span aria-hidden="true" className="ornament-rule mt-5 max-w-44">
                    <Icon name="sparkle" className="h-3 w-3" />
                  </span>

                  <p className="mt-6 text-sm leading-relaxed text-ink-muted">{collection.body}</p>

                  {/*
                    One label per row below 480px. The copy column is only 48%
                    of a phone screen, so two tracked-out labels side by side —
                    NOURISH and STRENGTHEN — ran straight into each other with
                    no visible gap. Stacking them costs a little height and is
                    the only width-independent way to keep them apart. min-w-0
                    lets a long label wrap instead of forcing the grid wider.
                  */}
                  <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-6 min-[480px]:grid-cols-2">
                    {collection.features.map((label, f) => (
                      <li
                        key={label}
                        className="flex min-w-0 flex-col items-center gap-2 text-center"
                      >
                        <span className="text-gold">
                          <Icon name={art[i].featureIcons[f]} className="h-6 w-6" />
                        </span>
                        <span className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <ArrowLink href={localePath(locale, art[i].href)}>{collection.cta}</ArrowLink>
                  </div>
                </div>

                {/*
                  Product photography runs to the panel edge, as in the artwork.
                  The tall crop is anchored to the bottom so the bottles stay
                  whole however deep the copy column grows.
                */}
                {/*
                  Narrower on a phone. At 52% the copy column was about 120px
                  wide inside its padding, which clipped "ESSENTIALS" mid-word.
                */}
                <div className="w-[38%] shrink-0 self-stretch sm:w-[46%] lg:w-[52%]">
                  <Media
                    src={art[i].image}
                    alt={art[i].imageAlt}
                    fill
                    bordered={false}
                    position="center bottom"
                    placeholderTone="cream"
                    sizes="(max-width: 1024px) 52vw, 340px"
                    className="h-full min-h-[26rem]"
                  />
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/*
        Every product in one rail. Full-bleed rather than inside the container,
        so the peeking cards run off the edges of the screen rather than
        stopping short of them.
      */}
      <section id="products" className="border-t border-gold/20 bg-cream py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-deep">{copy.productsEyebrow}</p>
            <h2 className="mt-3 text-[2rem] leading-tight sm:text-4xl">{copy.productsTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">{copy.productsBody}</p>
          </Reveal>
        </div>

        <Reveal className="mt-12" delay={0.1}>
          <ProductSlider products={sliderProducts} locale={locale} />
        </Reveal>
      </section>

      {/* Shared philosophy — full-width strip, so square-edged */}
      <section className="border-t border-gold/20 bg-cream">
        <h2 className="sr-only">{copy.philosophyHeading}</h2>
        <RevealGroup
          as="ul"
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {copy.pillars.map((pillar, i) => (
            <RevealItem
              as="li"
              key={pillar.title}
              className="flex items-start gap-5 bg-cream px-7 py-10"
            >
              <span className="shrink-0 text-gold">
                <Icon name={pillarIcons[i]} className="h-10 w-10" />
              </span>
              <div>
                <h3 className="text-lg">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
