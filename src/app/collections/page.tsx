import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt, product } from "@/lib/media";

export const metadata: Metadata = {
  title: "Collections | Two Collections. Complete Botanical Care.",
  description:
    "Rosica collections are thoughtfully created to meet different beauty needs while sharing one philosophy: premium botanical care inspired by nature and refined through modern cosmetic science.",
};

/**
 * Both collections share one shape so they render with identical visual weight.
 * Future categories (Skin Care, Body Care) can simply be appended here.
 */
const collections: {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  listLabel: string | null;
  products: string[];
  outro: string;
  features: { icon: IconName; label: string }[];
  cta: string;
  href: string;
  image?: string;
  imageAlt: string;
}[] = [
  {
    eyebrow: "Collection 01",
    name: "Essentials",
    title: "Daily Botanical Care",
    intro:
      "Rosica Essentials is designed for everyday nourishment, repair, protection, and balance.",
    listLabel: "The collection includes:",
    products: [
      "Honey & Propolis Repair Shampoo",
      "Purifying & Fresh Cleanse Shampoo",
      "Deep Repair Conditioner",
    ],
    outro:
      "Together they help cleanse, strengthen, nourish, and protect healthy-looking hair while providing a luxurious daily care experience.",
    features: [
      { icon: "droplet", label: "Nourish" },
      { icon: "waves", label: "Strengthen" },
      { icon: "shield", label: "Protect" },
      { icon: "scales", label: "Balance" },
    ],
    cta: "Explore Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: "The three Rosica Essentials products with honeycomb and botanicals",
  },
  {
    eyebrow: "Collection 02",
    name: "PURE",
    title: "Advanced Botanical Care",
    intro:
      "Rosica PURE represents our premium botanical collection created for those seeking gentle yet advanced daily care.",
    listLabel: null,
    products: [],
    outro:
      "The Botanical Restore Shampoo combines carefully selected botanical ingredients with sulfate-free cleansing technology to revitalize, strengthen, and restore healthy-looking hair while respecting its natural balance.",
    features: [
      { icon: "leaf", label: "Pure" },
      { icon: "droplet", label: "Clean" },
      { icon: "lotus", label: "Restore" },
      { icon: "sparkle", label: "Revitalize" },
    ],
    cta: "Explore PURE",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: "Rosica PURE Botanical Restore Shampoo with aloe vera and rosemary",
  },
];

const philosophyPillars: { icon: IconName; label: string; }[] = [
  { icon: "seedling", label: "Botanical Expertise" },
  { icon: "flask", label: "Scientific Innovation" },
  { icon: "mortar", label: "Thoughtful Formulation" },
  { icon: "globe", label: "Responsible Beauty" },
];

export default function CollectionsPage() {
  return (
    <>
      <Hero
        eyebrow="Our Collections"
        title="Two Collections. Complete Botanical Care."
        body={[
          "Rosica collections are thoughtfully created to meet different beauty needs while sharing one philosophy: premium botanical care inspired by nature and refined through modern cosmetic science.",
          "Every collection is developed with carefully selected ingredients, elegant formulations, and a commitment to exceptional everyday care.",
        ]}
        image={product.rangeGroup}
        imageLabel="The full Rosica range arranged on stone with honeycomb, aloe and rosemary"
        actions={<CTAButton href="#collections">Explore Our Collections</CTAButton>}
      />

      {/* Essentials + PURE, presented with equal visual weight */}
      <Section tone="shell" id="collections">
        <h2 className="sr-only">The Rosica collections</h2>
        <RevealGroup className="grid grid-cols-1 gap-8 lg:grid-cols-2" stagger={0.12}>
          {collections.map((collection) => (
            <RevealItem key={collection.name} className="h-full">
              <article className="card-lift group flex h-full flex-col border border-gold/25 bg-linen p-8 hover:border-gold/60 sm:p-10">
                <p className="eyebrow text-gold-deep">Rosica</p>
                <h3 className="mt-3 text-4xl uppercase tracking-[0.06em] sm:text-[2.5rem]">
                  {collection.name}
                </h3>

                <span aria-hidden="true" className="ornament-rule mt-6 max-w-48">
                  <Icon name="sparkle" className="h-3 w-3" />
                </span>

                <p className="mt-6 font-serif text-xl text-green">{collection.title}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">{collection.intro}</p>

                {collection.products.length > 0 ? (
                  <div className="mt-6">
                    {collection.listLabel ? (
                      <p className="text-sm text-ink-muted">{collection.listLabel}</p>
                    ) : null}
                    <ul className="mt-4 space-y-2.5 border-l border-gold/40 pl-5">
                      {collection.products.map((product) => (
                        <li key={product} className="font-serif text-lg text-green">
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="mt-6 text-base leading-relaxed text-ink-muted">{collection.outro}</p>

                <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
                  {collection.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex min-w-[4rem] flex-col items-center gap-2 text-center"
                    >
                      <span className="text-gold">
                        <Icon name={feature.icon} className="h-7 w-7" />
                      </span>
                      <span className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Media
                  src={collection.image}
                  alt={collection.imageAlt}
                  ratio="wide"
                  placeholderTone="cream"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="mt-9"
                />

                <div className="mt-auto pt-9">
                  <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Collection philosophy */}
      <section className="border-y border-gold/20 bg-cream">
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 sm:px-8 sm:pt-24">
          <Reveal className="flex justify-center">
            <SectionHeading
              eyebrow="Collection Philosophy"
              title="One Philosophy. Two Expressions."
              body="Although each collection serves different needs, they are united by the same Rosica philosophy:"
            />
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {philosophyPillars.map((pillar) => (
            <RevealItem
              as="li"
              key={pillar.label}
              className="flex items-center gap-5 bg-cream px-6 py-10 sm:px-8"
            >
              <span className="shrink-0 text-gold">
                <Icon name={pillar.icon} className="h-10 w-10" />
              </span>
              <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                {pillar.label}
              </h3>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-8 sm:pb-24">
          <Reveal delay={0.1}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
              Every Rosica product reflects our commitment to premium quality, refined formulation,
              and respect for nature.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Future vision */}
      <Section tone="shell">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Future Vision"
              title="Growing Naturally"
              align="left"
              body={[
                "Rosica's collections represent the beginning of a much larger vision.",
                "Following our Hair Care collections, Rosica will continue expanding into premium Skin Care and Body Care while maintaining the same commitment to botanical excellence, cosmetic science, and elegant everyday beauty.",
              ]}
            />
          </Reveal>

          <Reveal delay={0.12} className="group">
            <Media
              src={generic.labFlowerTube}
              alt={genericAlt.labFlowerTube}
              ratio="landscape"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
