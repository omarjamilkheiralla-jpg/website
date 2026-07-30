import type { Metadata } from "next";
import Hero, { type HeroFeature } from "@/components/Hero";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "Rosica Essentials | Everyday Botanical Care",
  description:
    "Rosica Essentials is our everyday botanical care collection, thoughtfully created to cleanse, nourish, repair, and protect with carefully selected botanical ingredients and modern cosmetic science.",
};

/** The three approved Essentials products — no others. */
const products = [
  { name: "Honey & Propolis Repair Shampoo", tag: "Repair" },
  { name: "Purifying & Fresh Cleanse Shampoo", tag: "Cleanse" },
  { name: "Deep Repair Conditioner", tag: "Condition" },
];

const heroFeatures: HeroFeature[] = [
  { icon: "shield", label: "Protect" },
  { icon: "waves", label: "Strengthen" },
  { icon: "scales", label: "Balance" },
];

const benefits: Benefit[] = [
  {
    icon: "leaf",
    title: "Natural & Gentle",
    body: "Carefully selected botanical ingredients help cleanse and care for hair while respecting its natural balance.",
    image: "Chamomile flowers in a glass dish",
  },
  {
    icon: "molecule",
    title: "Effective Results",
    body: "Advanced botanical formulations help nourish, strengthen, and improve the overall appearance of healthy-looking hair.",
    image: "Botanical formulation in laboratory glassware",
  },
  {
    icon: "droplet",
    title: "Suitable for Everyday Care",
    body: "Balanced formulations designed for regular use and suitable for most hair types, including color-treated and chemically treated hair.",
    image: "Close-up of healthy, softly waved hair",
  },
  {
    icon: "globe",
    title: "Conscious by Nature",
    body: "Every Rosica Essentials product is developed with respect for both people and the environment through thoughtful formulation and responsible manufacturing.",
    image: "Fresh botanical leaves on a pale background",
  },
];

const promises = [
  "Gentle botanical cleansing",
  "Balanced daily nourishment",
  "Visible healthy-looking results",
  "Premium care you can trust",
];

const standards: Standard[] = [
  { icon: "beaker", label: "Paraben-Free Formulas" },
  { icon: "droplet", label: "Silicone-Free Formulas" },
  { icon: "flask", label: "Mineral Oil-Free Formulas" },
  { icon: "seedling", label: "Inspired by Nature" },
];

export default function EssentialsPage() {
  return (
    <>
      <Hero
        eyebrow="Collection 01"
        title="Rosica Essentials"
        ornament
        body={[
          "Rosica Essentials is our everyday botanical care collection, thoughtfully created to cleanse, nourish, repair, and protect. Combining carefully selected botanical ingredients with modern cosmetic science, every formula is designed to deliver effective daily care while maintaining the perfect balance between performance and gentleness.",
          "The collection currently includes:",
        ]}
        bullets={products.map((product) => product.name)}
        features={heroFeatures}
        imageLabel="The three Rosica Essentials products with honeycomb and botanicals"
        actions={<CTAButton href="#products">View All Essentials</CTAButton>}
      />

      <BenefitStrip heading="Collection benefits" benefits={benefits} />

      {/* The three products */}
      <Section tone="cream" id="products">
        <h2 className="sr-only">The Rosica Essentials collection</h2>
        <RevealGroup className="grid gap-8 md:grid-cols-3" stagger={0.11}>
          {products.map((product) => (
            <RevealItem key={product.name} className="h-full">
              <article className="card-lift group flex h-full flex-col items-center border border-gold/20 bg-shell p-8 text-center hover:border-gold/60">
                {/* TODO: replace with real product photo */}
                <ImagePlaceholder
                  label={`${product.name} product photography`}
                  ratio="portrait"
                  tone="cream"
                  rounded={false}
                />
                <p className="eyebrow mt-8 text-gold-deep">{product.tag}</p>
                <h3 className="mt-3 text-xl sm:text-2xl">{product.name}</h3>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <PromiseBand
        image="Botanical cuttings in laboratory glassware on a sunlit bench"
        heading="The Rosica Essentials Promise"
        body={[
          "Rosica Essentials combines the purity of nature with the precision of cosmetic science to create formulations you can rely on every day.",
          "Our promise is simple:",
        ]}
        promises={promises}
        standards={standards}
        statement={["Rooted in nature.", "Refined by science.", "Made for you."]}
        statementBody="Every Rosica Essentials product reflects our belief that premium everyday care should be effective, elegant, and inspired by the natural world."
      />
    </>
  );
}
