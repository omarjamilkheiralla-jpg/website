import type { Metadata } from "next";
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
import { generic, genericAlt, ingredientCopy, product, productAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "Rosica | Inspired by Nature. Refined Through Science.",
  description:
    "Discover a premium natural beauty experience inspired by nature and elevated through modern cosmetic science. Premium botanical care, thoughtfully formulated by Rosica.",
};

const values: { icon: IconName; title: string; body: string; href: string }[] = [
  {
    icon: "seedling",
    title: "Botanical Expertise",
    body: "We carefully select botanical ingredients known for their quality, heritage, and compatibility with modern cosmetic formulations.",
    href: "/ingredients",
  },
  {
    icon: "flask",
    title: "Modern Cosmetic Science",
    body: "Every formula combines nature with contemporary cosmetic science to deliver reliable daily care.",
    href: "/about",
  },
  {
    icon: "mortar",
    title: "Thoughtful Formulation",
    body: "Every Rosica product is developed with purpose, integrity, and attention to every detail—from ingredients to packaging.",
    href: "/about",
  },
];

const ingredients = [
  { name: "Honey", image: generic.honey, alt: genericAlt.honey, body: ingredientCopy.Honey },
  {
    name: "Propolis",
    image: generic.propolis,
    alt: genericAlt.propolis,
    body: ingredientCopy.Propolis,
  },
  {
    name: "Aloe Vera",
    image: generic.aloeVera,
    alt: genericAlt.aloeVera,
    body: ingredientCopy["Aloe Vera"],
  },
  {
    name: "Rosemary",
    image: generic.rosemary,
    alt: genericAlt.rosemary,
    body: ingredientCopy.Rosemary,
  },
];

const collections = [
  {
    name: "Rosica Essentials",
    tagline: "Nourish. Repair. Protect.",
    body: "Created for everyday nourishment, repair, and protection with carefully balanced botanical formulations.",
    cta: "Discover Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  {
    name: "Rosica PURE",
    tagline: "Revitalize. Strengthen. Energize.",
    body: "Designed to revitalize and strengthen with advanced botanical ingredients for a refreshing premium care experience.",
    cta: "Discover PURE",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: productAlt.pureBottle,
  },
];

const ritual: { index: string; icon: IconName; title: string; body: string }[] = [
  {
    index: "1",
    icon: "droplet",
    title: "Cleanse",
    body: "Gently remove impurities while preparing the hair.",
  },
  {
    index: "2",
    icon: "waves",
    title: "Condition",
    body: "Restore softness, hydration, and manageability.",
  },
  {
    index: "3",
    icon: "leaf",
    title: "Maintain",
    body: "Support long-term healthy-looking hair through consistent botanical care.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="BOTANICAL BEAUTY"
        title="Inspired by Nature. Refined Through Science."
        body="Premium botanical beauty developed through thoughtful formulation, carefully selected ingredients, and a commitment to everyday care."
        image={product.rangeGroupHero}
        imageLabel={productAlt.rangeGroupHero}
        height="tall"
        actions={
          <>
            <CTAButton href="/collections">Explore Collections</CTAButton>
            <CTAButton href="/about" variant="secondary">
              Learn Our Story
            </CTAButton>
          </>
        }
      />

      {/* Brand values — three cells split by hairline gold rules */}
      <section id="main-content" className="border-y border-gold/20 bg-cream">
        <h2 className="sr-only">Why Rosica?</h2>
        <RevealGroup
          as="ul"
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 lg:grid-cols-3"
        >
          {values.map((value) => (
            <RevealItem as="li" key={value.title} className="bg-cream">
              <div className="flex h-full items-start gap-6 px-6 py-12 sm:px-9">
                <span className="shrink-0 text-gold">
                  <Icon name={value.icon} className="h-11 w-11" />
                </span>
                <div>
                  <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{value.body}</p>
                  <div className="mt-6">
                    <ArrowLink href={value.href} label={`Discover more about ${value.title}`}>
                      Discover More
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
              eyebrow="INGREDIENT LIBRARY"
              title="The Power of Botanical Ingredients"
              align="left"
              body="Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products, explaining their traditional uses, cosmetic benefits, and role within each formulation."
            >
              <ArrowLink href="/ingredients">Explore All Ingredients</ArrowLink>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="sr-only">Featured ingredients</h3>
            <IngredientCarousel ingredients={ingredients} />
          </Reveal>
        </div>
      </Section>

      {/* Collections */}
      <Section tone="shell" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our Collections"
              title="Two Collections. Complete Care."
              align="left"
              body="Rosica currently offers two complementary collections."
            >
              <ArrowLink href="/collections">View All Products</ArrowLink>
            </SectionHeading>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.12}>
            {collections.map((collection) => (
              <RevealItem key={collection.name} className="h-full">
                {/* The card floats, so it is rounded — and the photography runs
                    to its edges rather than sitting in a narrow side panel. */}
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                  <Media
                    src={collection.image}
                    alt={collection.imageAlt}
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
                      <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl text-base leading-relaxed text-ink-muted">
            Together they represent the beginning of Rosica&rsquo;s growing natural beauty
            portfolio.
          </p>
        </Reveal>
      </Section>

      {/*
        One horizontal band closing the page — ritual, journal and community
        side by side, as in the approved homepage. Cells are split by hairline
        gold rules and the band runs full width, so it stays square-edged.
      */}
      <section className="border-t border-gold/20 bg-cream">
        <h2 className="sr-only">The Rosica ritual, journal and community</h2>
        <RevealGroup
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 md:grid-cols-2 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,2.05fr)_minmax(0,1fr)_minmax(0,1.05fr)]"
          stagger={0.09}
        >
          {/* Ritual intro */}
          <RevealItem className="bg-cream px-7 py-10">
            <p className="eyebrow text-gold-deep">Rosica Ritual</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              A simple routine for healthier, stronger hair.
            </p>
            <div className="mt-6">
              <ArrowLink href="/journal">Learn How</ArrowLink>
            </div>
          </RevealItem>

          {/* The three steps, connected */}
          <RevealItem className="bg-cream px-7 py-10">
            <h3 className="sr-only">The three-step ritual</h3>
            <ol className="grid grid-cols-3 gap-4">
              {ritual.map((step, i) => (
                <li key={step.index} className="relative">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[0.6875rem] text-gold-deep">
                      {step.index}
                    </span>
                    <span className="text-gold">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    {i < ritual.length - 1 ? (
                      <span aria-hidden="true" className="ml-1 hidden h-px flex-1 bg-gold/35 sm:block" />
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

          {/* Journal */}
          <RevealItem className="bg-cream px-7 py-10">
            <p className="eyebrow text-gold-deep">From Our Journal</p>
            <h3 className="mt-3 text-2xl">Knowledge for Better Care</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Expert insights, ingredient science and hair care guidance for everyday life.
            </p>
            <div className="mt-5">
              <ArrowLink href="/journal">Explore Articles</ArrowLink>
            </div>
          </RevealItem>

          {/* Community */}
          <RevealItem className="group flex flex-col bg-cream px-7 py-10">
            <p className="eyebrow text-gold-deep">Join the Rosica Community</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Be the first to know about new launches, education and exclusive offers.
            </p>
            <div className="mt-5">
              <ArrowLink href="/journal">Explore Articles</ArrowLink>
            </div>
            <div className="mt-auto pt-8">
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
