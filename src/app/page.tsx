import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import CTAButton from "@/components/CTAButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "Rosica | Inspired by Nature. Refined Through Science.",
  description:
    "Discover a premium natural beauty experience inspired by nature and elevated through modern cosmetic science. Premium botanical care, thoughtfully formulated by Rosica.",
};

const values = [
  {
    title: "Botanical Expertise",
    body: "We carefully select botanical ingredients known for their quality, heritage, and compatibility with modern cosmetic formulations.",
  },
  {
    title: "Modern Cosmetic Science",
    body: "Every formula combines nature with contemporary cosmetic science to deliver reliable daily care.",
  },
  {
    title: "Thoughtful Formulation",
    body: "Every Rosica product is developed with purpose, integrity, and attention to every detail—from ingredients to packaging.",
  },
];

const ingredients = ["Honey", "Propolis", "Aloe Vera", "Rosemary"];

const collections = [
  {
    name: "Rosica Essentials",
    body: "Created for everyday nourishment, repair, and protection with carefully balanced botanical formulations.",
    cta: "Discover Essentials",
    href: "/collections/essentials",
  },
  {
    name: "Rosica PURE",
    body: "Designed to revitalize and strengthen with advanced botanical ingredients for a refreshing premium care experience.",
    cta: "Discover PURE",
    href: "/collections/pure",
  },
];

const ritual = [
  { index: "01", title: "Cleanse", body: "Gently remove impurities while preparing the hair." },
  { index: "02", title: "Condition", body: "Restore softness, hydration, and manageability." },
  {
    index: "03",
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
        imageLabel="Botanical leaves in soft natural light"
        actions={
          <>
            <CTAButton href="/collections">Explore Collections</CTAButton>
            <CTAButton href="/about" variant="secondary">
              Learn Our Story
            </CTAButton>
          </>
        }
      />

      {/* Brand values */}
      <Section tone="cream">
        <Reveal className="flex justify-center">
          <SectionHeading eyebrow="WHY ROSICA?" title="Beauty, Considered in Every Detail" />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <RevealItem key={value.title}>
              <Card title={value.title} body={value.body} tone="linen" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Ingredient library */}
      <Section tone="linen" divider>
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="INGREDIENT LIBRARY"
            title="The Power of Botanical Ingredients"
            body="Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products, explaining their traditional uses, cosmetic benefits, and role within each formulation."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-16 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4"
          stagger={0.09}
        >
          {ingredients.map((ingredient) => (
            <RevealItem as="li" key={ingredient} className="group text-center">
              {/* TODO: replace with real ingredient photography */}
              <ImagePlaceholder
                label={`${ingredient} botanical ingredient`}
                ratio="square"
                tone="cream"
              />
              <h3 className="mt-5 text-lg">{ingredient}</h3>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 flex justify-center" delay={0.1}>
          <CTAButton href="/ingredients">Explore All Ingredients</CTAButton>
        </Reveal>
      </Section>

      {/* Collections */}
      <Section tone="cream">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="COLLECTIONS"
            title="Two Collections. Complete Care."
            body="Rosica currently offers two complementary collections."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2" stagger={0.12}>
          {collections.map((collection) => (
            <RevealItem key={collection.name} className="h-full">
              <Card
                title={collection.name}
                body={collection.body}
                tone="linen"
                className="h-full"
                media={
                  // TODO: replace with real product photo
                  <ImagePlaceholder
                    label={`${collection.name} collection photography`}
                    ratio="landscape"
                    tone="cream"
                  />
                }
                footer={
                  <CTAButton href={collection.href} variant="secondary" size="sm">
                    {collection.cta}
                  </CTAButton>
                }
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-base text-ink-muted">
            Together they represent the beginning of Rosica&rsquo;s growing natural beauty
            portfolio.
          </p>
        </Reveal>
      </Section>

      {/* Ritual */}
      <Section tone="linen" divider>
        <Reveal className="flex justify-center">
          <SectionHeading eyebrow="THE ROSICA RITUAL" title="A Simple Ritual. Beautiful Results." />
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting rule between the three steps (desktop only). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gold/40 md:block"
          />
          <RevealGroup as="ol" className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {ritual.map((step) => (
              <RevealItem as="li" key={step.index}>
                <div className="flex items-center gap-4 md:block">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream font-serif text-lg text-gold-deep">
                    {step.index}
                  </span>
                  <h3 className="text-xl md:mt-6 md:text-2xl">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-14 flex justify-center" delay={0.1}>
          <CTAButton href="/journal">Learn How</CTAButton>
        </Reveal>
      </Section>

      {/* Journal */}
      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="JOURNAL"
              title="Knowledge for Better Care"
              body="Explore expert articles covering botanical ingredients, everyday beauty rituals, ingredient education, and practical care guides designed to help you get the most from every Rosica product."
              align="left"
            >
              <CTAButton href="/journal">Explore Articles</CTAButton>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.12} className="group">
            {/* TODO: replace with real editorial photography */}
            <ImagePlaceholder
              label="Rosica journal editorial photography"
              ratio="landscape"
              tone="linen"
            />
          </Reveal>
        </div>
      </Section>

      {/* Community / newsletter */}
      <Section tone="ink">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <SectionHeading
              eyebrow="COMMUNITY"
              title="Join the Rosica Community"
              body="Be among the first to discover new product launches, educational articles, seasonal inspiration, exclusive updates, and future Rosica collections. Join our community and stay connected to the latest in natural beauty."
              tone="light"
            />
          </Reveal>

          <Reveal delay={0.12} className="mt-10 w-full max-w-md">
            <NewsletterForm tone="light" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
