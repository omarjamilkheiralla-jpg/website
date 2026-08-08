import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { product, productAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "Collections | Two Collections. Complete Botanical Care.",
  description:
    "Thoughtfully crafted formulations, inspired by nature, refined through science, and made to elevate your natural beauty.",
};

/**
 * Both collections share one shape so they render with identical visual weight.
 * Future categories (Skin Care, Body Care) can simply be appended here.
 */
const collections: {
  name: string;
  body: string;
  features: { icon: IconName; label: string }[];
  cta: string;
  href: string;
  image?: string;
  imageAlt: string;
}[] = [
  {
    name: "Essentials",
    body: "Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect.",
    features: [
      { icon: "droplet", label: "Nourish" },
      { icon: "waves", label: "Strengthen" },
      { icon: "shield", label: "Protect" },
      { icon: "scales", label: "Balance" },
    ],
    cta: "Explore Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  {
    name: "Pure",
    body: "Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience.",
    features: [
      { icon: "leaf", label: "Pure" },
      { icon: "droplet", label: "Clean" },
      { icon: "lotus", label: "Restore" },
      { icon: "sparkle", label: "Revitalize" },
    ],
    cta: "Explore Pure",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: productAlt.pureBottle,
  },
];

const philosophyPillars: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "seedling",
    title: "Botanical Expertise",
    body: "Carefully selected natural ingredients you can trust.",
  },
  {
    icon: "flask",
    title: "Scientific Innovation",
    body: "Advanced research and modern formulation.",
  },
  {
    icon: "mortar",
    title: "Thoughtful Formulation",
    body: "Every product created with purpose and care.",
  },
  {
    icon: "globe",
    title: "Responsible Beauty",
    body: "We care for you and the planet every step of the way.",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Hero
        eyebrow="Our Collections"
        title="Two Collections. Complete Botanical Care."
        body="Thoughtfully crafted formulations, inspired by nature, refined through science, and made to elevate your natural beauty."
        image={product.rangeGroupHero}
        imageLabel={productAlt.rangeGroupHero}
        actions={<CTAButton href="#collections">Explore Our Collections</CTAButton>}
      />

      {/* Essentials and Pure, given identical visual weight */}
      <section id="collections" className="bg-shell">
        <h2 className="sr-only">The Rosica collections</h2>
        <RevealGroup
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-14 sm:px-8 lg:grid-cols-2"
          stagger={0.12}
        >
          {collections.map((collection) => (
            <RevealItem key={collection.name} className="h-full">
              <article className="card-lift group flex h-full items-stretch overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                <div className="flex min-w-0 flex-1 flex-col p-8 sm:p-9">
                  <p className="eyebrow text-gold-deep">Rosica</p>
                  <h3 className="mt-3 font-serif text-4xl uppercase tracking-[0.06em] text-green">
                    {collection.name}
                  </h3>

                  <span aria-hidden="true" className="ornament-rule mt-5 max-w-44">
                    <Icon name="sparkle" className="h-3 w-3" />
                  </span>

                  <p className="mt-6 text-sm leading-relaxed text-ink-muted">{collection.body}</p>

                  <ul className="mt-8 grid grid-cols-4 gap-3">
                    {collection.features.map((feature) => (
                      <li
                        key={feature.label}
                        className="flex flex-col items-center gap-2 text-center"
                      >
                        <span className="text-gold">
                          <Icon name={feature.icon} className="h-6 w-6" />
                        </span>
                        <span className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
                  </div>
                </div>

                {/* Product photography runs to the panel edge, as in the artwork */}
                <div className="w-[42%] shrink-0 self-stretch">
                  <Media
                    src={collection.image}
                    alt={collection.imageAlt}
                    fill
                    bordered={false}
                    position="center bottom"
                    placeholderTone="cream"
                    sizes="(max-width: 1024px) 42vw, 22vw"
                    className="h-full min-h-72"
                  />
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Shared philosophy — full-width strip, so square-edged */}
      <section className="border-t border-gold/20 bg-cream">
        <h2 className="sr-only">The Rosica philosophy</h2>
        <RevealGroup
          as="ul"
          className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {philosophyPillars.map((pillar) => (
            <RevealItem
              as="li"
              key={pillar.title}
              className="flex items-start gap-5 bg-cream px-7 py-10"
            >
              <span className="shrink-0 text-gold">
                <Icon name={pillar.icon} className="h-10 w-10" />
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
