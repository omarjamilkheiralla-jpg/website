import type { Metadata } from "next";
import Hero, { type HeroFeature } from "@/components/Hero";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import Icon from "@/components/Icon";
import Media from "@/components/Media";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import Reveal from "@/components/motion/Reveal";
import { generic, genericAlt, product } from "@/lib/media";

export const metadata: Metadata = {
  title: "Rosica PURE | Advanced Botanical Care",
  description:
    "Rosica PURE is our advanced botanical care collection, created for those who value purity, simplicity, and high-performance formulations — led by the Botanical Restore Shampoo.",
};

const heroFeatures: HeroFeature[] = [
  { icon: "leaf", label: "Pure" },
  { icon: "droplet", label: "Clean" },
  { icon: "lotus", label: "Restore" },
  { icon: "sparkle", label: "Revitalize" },
];

const benefits: Benefit[] = [
  {
    icon: "leaf",
    title: "Minimal & Pure",
    body: "Sulfate-free formulations powered by carefully selected botanical ingredients for gentle everyday cleansing.",
    image: generic.leaves,
    imageAlt: genericAlt.leaves,
  },
  {
    icon: "molecule",
    title: "Effective Botanicals",
    body: "Advanced botanical complexes work together to nourish, strengthen, and restore healthy-looking hair.",
    image: generic.labFlowerTube,
    imageAlt: genericAlt.labFlowerTube,
  },
  {
    icon: "droplet",
    title: "Scalp & Hair Care",
    body: "Balanced formulations help support scalp comfort while promoting soft, healthy, and revitalized hair.",
    image: generic.hairTexture,
    imageAlt: genericAlt.hairTexture,
  },
  {
    icon: "globe",
    title: "Conscious by Nature",
    body: "Created with respect for both people and the environment through responsible formulation and sustainable thinking.",
    image: generic.foliage,
    imageAlt: genericAlt.foliage,
  },
];

const promises = [
  "Gentle sulfate-free cleansing",
  "Botanical performance",
  "Daily scalp comfort",
  "Visible healthy-looking results",
];

const standards: Standard[] = [
  { icon: "beaker", label: "Sulfate-Free Formulas" },
  { icon: "flask", label: "Paraben-Free Formulas" },
  { icon: "droplet", label: "Silicone-Free Formulas" },
  { icon: "seedling", label: "Inspired by Nature" },
];

export default function PurePage() {
  return (
    <>
      <Hero
        eyebrow="Collection 02"
        title="Rosica PURE"
        ornament
        body={[
          "Rosica PURE represents our advanced botanical care collection, created for those who value purity, simplicity, and high-performance formulations. Every product is carefully developed with premium botanical ingredients and modern cosmetic science to deliver gentle yet effective daily care.",
          "The current PURE collection includes:",
        ]}
        bullets={["Botanical Restore Shampoo"]}
        features={heroFeatures}
        image={product.pureBottle}
        imageLabel="Botanical Restore Shampoo with aloe vera on a stone plinth"
        actions={<CTAButton href="#product">View All PURE Products</CTAButton>}
      />

      <BenefitStrip heading="Collection benefits" benefits={benefits} />

      {/* A single hero product — deliberately spacious and editorial */}
      <Section tone="cream" spacing="loose" id="product">
        <h2 className="sr-only">The Rosica PURE collection</h2>
        <div className="group grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Media
              src={product.botanicalRestoreShampoo}
              alt="Rosica PURE Botanical Restore Shampoo"
              ratio="portrait"
              placeholderTone="shell"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mx-auto max-w-md"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow text-gold-deep">Restore</p>
            <h3 className="mt-4 text-3xl sm:text-4xl">Botanical Restore Shampoo</h3>

            <span aria-hidden="true" className="ornament-rule mt-8 max-w-xs">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted">
              The Botanical Restore Shampoo combines carefully selected botanical ingredients with
              sulfate-free cleansing technology to revitalize, strengthen, and restore
              healthy-looking hair while respecting its natural balance.
            </p>
          </Reveal>
        </div>
      </Section>

      <PromiseBand
        image={generic.labGlassware}
        imageAlt={genericAlt.labGlassware}
        heading="Pure Care. Visible Results."
        body={[
          "Rosica PURE combines the purity of nature with scientific innovation to create premium botanical formulations that respect your hair, your scalp, and the environment.",
          "Our promise:",
        ]}
        promises={promises}
        standards={standards}
        statement={["Pure ingredients.", "Powerful results.", "Naturally beautiful."]}
        statementBody="Rosica PURE demonstrates our commitment to premium botanical beauty by combining carefully selected natural ingredients with modern cosmetic science to create products that are elegant, effective, and thoughtfully crafted."
      />
    </>
  );
}
