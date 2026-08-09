import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { collectionsCopy } from "@/content/collections";

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

export default function CollectionsView({ locale }: { locale: Locale }) {
  const copy = collectionsCopy[locale];

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
                <div className="flex min-w-0 flex-1 flex-col p-8 sm:p-9">
                  <p className="eyebrow text-gold-deep">{collection.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-4xl uppercase tracking-[0.06em] text-green">
                    {collection.name}
                  </h3>

                  <span aria-hidden="true" className="ornament-rule mt-5 max-w-44">
                    <Icon name="sparkle" className="h-3 w-3" />
                  </span>

                  <p className="mt-6 text-sm leading-relaxed text-ink-muted">{collection.body}</p>

                  {/* Two across: four columns ran the tracked-out labels into
                      one another at this panel width. */}
                  <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6">
                    {collection.features.map((label, f) => (
                      <li key={label} className="flex flex-col items-center gap-2 text-center">
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
                <div className="w-[52%] shrink-0 self-stretch">
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
