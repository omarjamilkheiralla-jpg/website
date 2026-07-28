import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "Collections | Two Collections. Complete Botanical Care.",
  description:
    "Rosica collections are thoughtfully created to meet different beauty needs while sharing one philosophy: premium botanical care inspired by nature and refined through modern cosmetic science.",
};

/**
 * Both collections share one shape so they render with identical visual weight.
 * Future categories (Skin Care, Body Care) can simply be appended here.
 */
const collections = [
  {
    eyebrow: "COLLECTION 01",
    name: "Rosica Essentials",
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
    cta: "Explore Essentials",
    href: "/collections/essentials",
  },
  {
    eyebrow: "COLLECTION 02",
    name: "Rosica PURE",
    title: "Advanced Botanical Care",
    intro:
      "Rosica PURE represents our premium botanical collection created for those seeking gentle yet advanced daily care.",
    listLabel: null,
    products: [],
    outro:
      "The Botanical Restore Shampoo combines carefully selected botanical ingredients with sulfate-free cleansing technology to revitalize, strengthen, and restore healthy-looking hair while respecting its natural balance.",
    cta: "Explore PURE",
    href: "/collections/pure",
  },
];

const philosophyPillars = [
  "Botanical Expertise",
  "Scientific Innovation",
  "Thoughtful Formulation",
  "Responsible Beauty",
];

export default function CollectionsPage() {
  return (
    <>
      <Hero
        eyebrow="OUR COLLECTIONS"
        title="Two Collections. Complete Botanical Care."
        body={[
          "Rosica collections are thoughtfully created to meet different beauty needs while sharing one philosophy: premium botanical care inspired by nature and refined through modern cosmetic science.",
          "Every collection is developed with carefully selected ingredients, elegant formulations, and a commitment to exceptional everyday care.",
        ]}
        variant="panel"
        actions={<CTAButton href="#collections">Explore Our Collections</CTAButton>}
      />

      {/* Essentials + PURE, presented with equal visual weight */}
      <Section tone="cream" id="collections">
        <RevealGroup className="grid gap-10 lg:grid-cols-2 lg:gap-12" stagger={0.12}>
          {collections.map((collection) => (
            <RevealItem key={collection.name} className="h-full">
              <article className="card-lift group flex h-full flex-col rounded-sm border border-gold/25 bg-linen p-8 hover:border-gold/60 sm:p-10">
                {/* TODO: replace with real product photo */}
                <ImagePlaceholder
                  label={`${collection.name} collection photography`}
                  ratio="landscape"
                  tone="cream"
                />

                <p className="eyebrow mt-8 text-gold-deep">{collection.eyebrow}</p>
                <h2 className="mt-4 text-3xl sm:text-4xl">{collection.title}</h2>
                <p className="mt-2 font-serif text-lg text-ink-muted">{collection.name}</p>

                <p className="mt-6 text-base leading-relaxed text-ink-muted">{collection.intro}</p>

                {collection.products.length > 0 ? (
                  <div className="mt-6">
                    {collection.listLabel ? (
                      <p className="text-sm text-ink-muted">{collection.listLabel}</p>
                    ) : null}
                    <ul className="mt-4 space-y-3 border-l border-gold/40 pl-5">
                      {collection.products.map((product) => (
                        <li key={product} className="font-serif text-lg text-green">
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="mt-6 text-base leading-relaxed text-ink-muted">{collection.outro}</p>

                <div className="mt-auto pt-9">
                  <CTAButton href={collection.href}>{collection.cta}</CTAButton>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Collection philosophy */}
      <Section tone="linen" divider>
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="COLLECTION PHILOSOPHY"
            title="One Philosophy. Two Expressions."
            body="Although each collection serves different needs, they are united by the same Rosica philosophy:"
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {philosophyPillars.map((pillar) => (
            <RevealItem
              as="li"
              key={pillar}
              className="card-lift rounded-sm border border-gold/30 bg-cream px-5 py-6 text-center font-serif text-lg text-green hover:border-gold/70"
            >
              {pillar}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
            Every Rosica product reflects our commitment to premium quality, refined formulation,
            and respect for nature.
          </p>
        </Reveal>
      </Section>

      {/* Future vision */}
      <Section tone="cream">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="FUTURE VISION"
            title="Growing Naturally"
            body={[
              "Rosica's collections represent the beginning of a much larger vision.",
              "Following our Hair Care collections, Rosica will continue expanding into premium Skin Care and Body Care while maintaining the same commitment to botanical excellence, cosmetic science, and elegant everyday beauty.",
            ]}
          />
        </Reveal>
      </Section>
    </>
  );
}
