import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import IngredientCarousel from "@/components/IngredientCarousel";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt, product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { homeCopy } from "@/content/home";

/** Art direction, paired with the copy by index. */
const valueArt = [
  { icon: "seedling" as IconName, href: "/ingredients" },
  { icon: "flask" as IconName, href: "/about" },
  { icon: "mortar" as IconName, href: "/about" },
];

const ingredientPhotos = [
  { image: generic.honey, alt: genericAlt.honey },
  { image: generic.propolis, alt: genericAlt.propolis },
  { image: generic.aloeVera, alt: genericAlt.aloeVera },
  { image: generic.rosemary, alt: genericAlt.rosemary },
];

const collectionArt = [
  {
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  { href: "/collections/pure", image: product.pureBottle, imageAlt: productAlt.pureBottle },
];

const ritualIcons: IconName[] = ["droplet", "waves", "leaf"];

export default function HomeView({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const to = (href: string) => localePath(locale, href);

  const ingredients = copy.ingredients.map((ingredient, i) => ({
    name: ingredient.name,
    body: ingredient.body,
    image: ingredientPhotos[i].image,
    alt: ingredientPhotos[i].alt,
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
        height="tall"
        actions={
          <>
            <CTAButton href={to("/collections")}>{copy.heroPrimary}</CTAButton>
            <CTAButton href={to("/about")} variant="secondary">
              {copy.heroSecondary}
            </CTAButton>
          </>
        }
      />

      {/* Brand values — three cells split by hairline gold rules */}
      <section id="main-content" className="border-y border-gold/20 bg-cream">
        <h2 className="sr-only">{copy.valuesHeading}</h2>
        <RevealGroup
          as="ul"
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 lg:grid-cols-3"
        >
          {copy.values.map((value, i) => (
            <RevealItem as="li" key={value.title} className="bg-cream">
              <div className="flex h-full items-start gap-6 px-6 py-12 sm:px-9">
                <span className="shrink-0 text-gold">
                  <Icon name={valueArt[i].icon} className="h-11 w-11" />
                </span>
                <div>
                  <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{value.body}</p>
                  <div className="mt-6">
                    <ArrowLink href={to(valueArt[i].href)} label={`${copy.valuesCta} — ${value.title}`}>
                      {copy.valuesCta}
                    </ArrowLink>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Ingredient library */}
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={copy.ingredientsEyebrow}
              title={copy.ingredientsTitle}
              align="left"
              body={copy.ingredientsBody}
            >
              <ArrowLink href={to("/ingredients")}>{copy.ingredientsCta}</ArrowLink>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="sr-only">{copy.featuredHeading}</h3>
            <IngredientCarousel
              ingredients={ingredients}
              href={to("/ingredients")}
              exploreLabel={copy.ingredientExplore}
              locale={locale}
            />
          </Reveal>
        </div>
      </Section>

      {/* Collections */}
      <Section tone="shell" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={copy.collectionsEyebrow}
              title={copy.collectionsTitle}
              align="left"
              body={copy.collectionsBody}
            >
              <ArrowLink href={to("/collections")}>{copy.collectionsCta}</ArrowLink>
            </SectionHeading>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.12}>
            {copy.collections.map((collection, i) => (
              <RevealItem key={collection.name} className="h-full">
                {/* The card floats, so it is rounded — and the photography runs
                    to its edges rather than sitting in a narrow side panel. */}
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                  <Media
                    src={collectionArt[i].image}
                    alt={collectionArt[i].imageAlt}
                    ratio="landscape"
                    bordered={false}
                    placeholderTone="cream"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 440px"
                  />

                  <div className="flex min-w-0 flex-1 flex-col p-7">
                    <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                      {collection.name}
                    </h3>
                    <p className="mt-3 font-serif text-xl text-gold-deep">{collection.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{collection.body}</p>
                    <div className="mt-auto pt-7">
                      <ArrowLink href={to(collectionArt[i].href)}>{collection.cta}</ArrowLink>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl text-base leading-relaxed text-ink-muted">
            {copy.collectionsFooter}
          </p>
        </Reveal>
      </Section>

      {/*
        One horizontal band closing the page — the ritual and the community side
        by side. Cells are split by hairline gold rules and the band runs full
        width, so it stays square-edged.
      */}
      <section className="border-t border-gold/20 bg-cream">
        <h2 className="sr-only">{copy.closingHeading}</h2>
        <RevealGroup
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 md:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)_minmax(0,1.1fr)]"
          stagger={0.09}
        >
          {/* Ritual intro */}
          <RevealItem className="bg-cream px-7 py-10">
            <p className="eyebrow text-gold-deep">{copy.ritualEyebrow}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{copy.ritualIntro}</p>
            <div className="mt-6">
              <ArrowLink href={to("/collections")}>{copy.ritualCta}</ArrowLink>
            </div>
          </RevealItem>

          {/* The three steps, connected */}
          <RevealItem className="bg-cream px-7 py-10">
            <h3 className="sr-only">{copy.ritualStepsHeading}</h3>
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
              {copy.ritual.map((step, i) => (
                <li key={step.title} className="relative">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[0.6875rem] text-gold-deep">
                      {i + 1}
                    </span>
                    <span className="text-gold">
                      <Icon name={ritualIcons[i]} className="h-5 w-5" />
                    </span>
                    {i < copy.ritual.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="ms-1 hidden h-px flex-1 bg-gold/35 sm:block"
                      />
                    ) : null}
                  </div>
                  <h4 className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-green">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </RevealItem>

          {/* Community */}
          <RevealItem className="group flex flex-col bg-cream px-7 py-10">
            <p className="eyebrow text-gold-deep">{copy.communityEyebrow}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{copy.communityBody}</p>
            <div className="mt-5">
              {/* Jumps to the social links at the foot of the page. */}
              <ArrowLink href="#newsletter">{copy.communityCta}</ArrowLink>
            </div>
            {/*
              pt-8, not mt-auto pt-8. Pushing the photograph to the bottom of a
              stretched grid cell meant the tallest neighbour dictated this
              card's height and the difference showed up as a dead band of cream
              above the footer — most of a screen of it on a phone. Letting the
              image sit directly under the link keeps the padding generous and
              the section as tall as its content.
            */}
            <div className="pt-8">
              <Media
                src={generic.journal}
                alt={genericAlt.journal}
                ratio="landscape"
                rounded
                bordered={false}
                sizes="(max-width: 768px) 88vw, 300px"
              />
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
