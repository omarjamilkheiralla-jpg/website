import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import IngredientCarousel from "@/components/IngredientCarousel";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt, product } from "@/lib/media";

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
  { name: "Honey", image: generic.honey, alt: genericAlt.honey },
  { name: "Propolis", image: generic.propolis, alt: genericAlt.propolis },
  { name: "Aloe Vera", image: generic.aloeVera, alt: genericAlt.aloeVera },
  { name: "Rosemary", image: generic.rosemary, alt: genericAlt.rosemary },
];

const collections = [
  {
    name: "Rosica Essentials",
    tagline: "Nourish. Repair. Protect.",
    body: "Created for everyday nourishment, repair, and protection with carefully balanced botanical formulations.",
    cta: "Discover Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: "The three Rosica Essentials products with honeycomb and botanicals",
  },
  {
    name: "Rosica PURE",
    tagline: "Revitalize. Strengthen. Energize.",
    body: "Designed to revitalize and strengthen with advanced botanical ingredients for a refreshing premium care experience.",
    cta: "Discover PURE",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: "Rosica PURE Botanical Restore Shampoo with aloe vera and rosemary",
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
        body="Discover a premium natural beauty experience inspired by nature and elevated through modern cosmetic science. At Rosica, we thoughtfully formulate every product using carefully selected botanical ingredients and advanced cosmetic expertise to deliver effective, elegant everyday care. Our journey begins with premium hair care and will continue with carefully crafted skin care and body care collections, all united by one philosophy: beauty inspired by nature."
        imageLabel="The Rosica collection arranged on stone with botanicals in soft daylight"
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
      <section className="border-y border-gold/20 bg-cream">
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
                <article className="card-lift group flex h-full flex-col border border-gold/20 bg-linen p-8 hover:border-gold/60">
                  <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                    {collection.name}
                  </h3>
                  <p className="mt-3 font-serif text-xl text-gold-deep">{collection.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{collection.body}</p>

                  <Media
                    src={collection.image}
                    alt={collection.imageAlt}
                    ratio="wide"
                    placeholderTone="cream"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="mt-8"
                  />

                  <div className="mt-8 pt-1">
                    <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
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

      {/* Ritual + Journal + Community, sharing one closing band */}
      <Section tone="cream" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Rosica Ritual"
                title="A Simple Ritual. Beautiful Results."
                align="left"
              >
                <ArrowLink href="/journal">Learn How</ArrowLink>
              </SectionHeading>
            </Reveal>

            <div className="relative mt-12">
              {/* Connecting rule between the three steps (desktop only). */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-5 hidden h-px bg-gold/35 sm:block"
              />
              <RevealGroup as="ol" className="relative grid gap-10 sm:grid-cols-3 sm:gap-8">
                {ritual.map((step) => (
                  <RevealItem as="li" key={step.index}>
                    <div className="flex items-center gap-4 sm:block">
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream font-serif text-base text-gold-deep">
                        {step.index}
                      </span>
                      <span className="mt-6 block text-gold sm:mt-7">
                        <Icon name={step.icon} className="h-8 w-8" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          {/* Journal */}
          <Reveal delay={0.12} className="group">
            <article className="card-lift flex h-full flex-col border border-gold/20 bg-shell p-8 hover:border-gold/60">
              <p className="eyebrow text-gold-deep">From Our Journal</p>
              <h2 className="mt-4 text-2xl sm:text-[1.75rem]">Knowledge for Better Care</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Explore expert articles covering botanical ingredients, everyday beauty rituals,
                ingredient education, and practical care guides designed to help you get the most
                from every Rosica product.
              </p>

              <Media
                src={generic.journal}
                alt={genericAlt.journal}
                ratio="wide"
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="mt-8"
              />

              <div className="mt-8">
                <ArrowLink href="/journal">Explore Articles</ArrowLink>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Community / newsletter */}
      <Section tone="green">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Join the Rosica Community"
              align="left"
              tone="light"
              body="Be among the first to discover new product launches, educational articles, seasonal inspiration, exclusive updates, and future Rosica collections. Join our community and stay connected to the latest in natural beauty."
            />
          </Reveal>

          <Reveal delay={0.12} className="w-full">
            <NewsletterForm tone="light" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
