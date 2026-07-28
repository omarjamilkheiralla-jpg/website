import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import CTAButton from "@/components/CTAButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import FormulaStandards from "@/components/FormulaStandards";
import BrandStatement from "@/components/BrandStatement";
import Reveal from "@/components/motion/Reveal";
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

const benefits = [
  {
    title: "Natural & Gentle",
    body: "Carefully selected botanical ingredients help cleanse and care for hair while respecting its natural balance.",
  },
  {
    title: "Effective Results",
    body: "Advanced botanical formulations help nourish, strengthen, and improve the overall appearance of healthy-looking hair.",
  },
  {
    title: "Suitable for Everyday Care",
    body: "Balanced formulations designed for regular use and suitable for most hair types, including color-treated and chemically treated hair.",
  },
  {
    title: "Conscious by Nature",
    body: "Every Rosica Essentials product is developed with respect for both people and the environment through thoughtful formulation and responsible manufacturing.",
  },
];

const promises = [
  "Gentle botanical cleansing",
  "Balanced daily nourishment",
  "Visible healthy-looking results",
  "Premium care you can trust",
];

const standards = [
  "Paraben-Free Formulas",
  "Silicone-Free Formulas",
  "Mineral Oil-Free Formulas",
  "Inspired by Nature",
];

export default function EssentialsPage() {
  return (
    <>
      <Hero
        eyebrow="COLLECTION 01"
        title="Rosica Essentials"
        body={[
          "Rosica Essentials is our everyday botanical care collection, thoughtfully created to cleanse, nourish, repair, and protect. Combining carefully selected botanical ingredients with modern cosmetic science, every formula is designed to deliver effective daily care while maintaining the perfect balance between performance and gentleness.",
          "The collection currently includes:",
        ]}
        bullets={products.map((product) => product.name)}
        variant="panel"
        actions={<CTAButton href="#products">View All Essentials</CTAButton>}
      />

      {/* The three products */}
      <Section tone="cream" id="products">
        <h2 className="sr-only">The Rosica Essentials collection</h2>
        <RevealGroup className="grid gap-8 md:grid-cols-3" stagger={0.11}>
          {products.map((product) => (
            <RevealItem key={product.name} className="h-full">
              <Card
                title={product.name}
                eyebrow={product.tag}
                tone="linen"
                align="center"
                className="h-full"
                media={
                  // TODO: replace with real product photo
                  <ImagePlaceholder
                    label={`${product.name} product photography`}
                    ratio="portrait"
                    tone="cream"
                  />
                }
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Collection benefits */}
      <Section tone="linen" divider>
        <Reveal className="flex justify-center">
          <SectionHeading eyebrow="COLLECTION BENEFITS" title="Considered Care, Every Day" />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <RevealItem key={benefit.title} className="h-full">
              <Card title={benefit.title} body={benefit.body} tone="cream" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The Essentials promise */}
      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="THE ROSICA ESSENTIALS PROMISE"
              title="Beautiful Hair Begins with Gentle Care"
              align="left"
              body={[
                "Rosica Essentials combines the purity of nature with the precision of cosmetic science to create formulations you can rely on every day.",
                "Our promise is simple:",
              ]}
            />
            <RevealGroup as="ul" className="mt-8 space-y-3" stagger={0.08}>
              {promises.map((promise) => (
                <RevealItem
                  as="li"
                  key={promise}
                  className="flex items-center gap-3 font-serif text-lg text-green"
                >
                  <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold" />
                  {promise}
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.12} className="group">
            {/* TODO: replace with real product photo */}
            <ImagePlaceholder
              label="Rosica Essentials collection in a bathroom setting"
              ratio="landscape"
              tone="linen"
            />
          </Reveal>
        </div>
      </Section>

      <FormulaStandards standards={standards} />

      <BrandStatement
        title="Rooted in Nature. Refined by Science. Made for You."
        body="Every Rosica Essentials product reflects our belief that premium everyday care should be effective, elegant, and inspired by the natural world."
      />
    </>
  );
}
