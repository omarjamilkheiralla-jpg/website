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
  title: "Rosica PURE | Advanced Botanical Care",
  description:
    "Rosica PURE is our advanced botanical care collection, created for those who value purity, simplicity, and high-performance formulations — led by the Botanical Restore Shampoo.",
};

const benefits = [
  {
    title: "Minimal & Pure",
    body: "Sulfate-free formulations powered by carefully selected botanical ingredients for gentle everyday cleansing.",
  },
  {
    title: "Effective Botanicals",
    body: "Advanced botanical complexes work together to nourish, strengthen, and restore healthy-looking hair.",
  },
  {
    title: "Scalp & Hair Care",
    body: "Balanced formulations help support scalp comfort while promoting soft, healthy, and revitalized hair.",
  },
  {
    title: "Conscious by Nature",
    body: "Created with respect for both people and the environment through responsible formulation and sustainable thinking.",
  },
];

const promises = [
  "Gentle sulfate-free cleansing",
  "Botanical performance",
  "Daily scalp comfort",
  "Visible healthy-looking results",
];

const standards = [
  "Sulfate-Free Formulas",
  "Paraben-Free Formulas",
  "Silicone-Free Formulas",
  "Inspired by Nature",
];

export default function PurePage() {
  return (
    <>
      <Hero
        eyebrow="COLLECTION 02"
        title="Rosica PURE"
        body={[
          "Rosica PURE represents our advanced botanical care collection, created for those who value purity, simplicity, and high-performance formulations. Every product is carefully developed with premium botanical ingredients and modern cosmetic science to deliver gentle yet effective daily care.",
          "The current PURE collection includes:",
        ]}
        bullets={["Botanical Restore Shampoo"]}
        variant="panel"
        actions={<CTAButton href="#product">View All PURE Products</CTAButton>}
      />

      {/* Single hero product — deliberately spacious */}
      <Section tone="cream" spacing="loose" id="product">
        <h2 className="sr-only">The Rosica PURE collection</h2>
        <div className="group grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            {/* TODO: replace with real product photo */}
            <ImagePlaceholder
              label="Botanical Restore Shampoo product photography"
              ratio="portrait"
              tone="linen"
              className="mx-auto max-w-md"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow text-gold-deep">Restore</p>
            <h3 className="mt-4 text-3xl sm:text-4xl">Botanical Restore Shampoo</h3>
            <span aria-hidden="true" className="mt-8 block h-px w-24 bg-gold" />
            <p className="mt-8 text-base leading-relaxed text-ink-muted">
              The Botanical Restore Shampoo combines carefully selected botanical ingredients with
              sulfate-free cleansing technology to revitalize, strengthen, and restore
              healthy-looking hair while respecting its natural balance.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Collection benefits */}
      <Section tone="linen" spacing="loose" divider>
        <Reveal className="flex justify-center">
          <SectionHeading eyebrow="COLLECTION BENEFITS" title="Purity, Precisely Formulated" />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <RevealItem key={benefit.title} className="h-full">
              <Card title={benefit.title} body={benefit.body} tone="cream" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* The PURE promise */}
      <Section tone="cream" spacing="loose">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="THE ROSICA PURE PROMISE"
            title="Pure Care. Visible Results."
            body={[
              "Rosica PURE combines the purity of nature with scientific innovation to create premium botanical formulations that respect your hair, your scalp, and the environment.",
              "Our promise:",
            ]}
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          stagger={0.09}
        >
          {promises.map((promise) => (
            <RevealItem
              as="li"
              key={promise}
              className="card-lift rounded-sm border border-gold/30 bg-linen px-6 py-5 text-center font-serif text-lg text-green hover:border-gold/70"
            >
              {promise}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <FormulaStandards standards={standards} />

      <BrandStatement
        title="Pure Ingredients. Powerful Results. Naturally Beautiful."
        body="Rosica PURE demonstrates our commitment to premium botanical beauty by combining carefully selected natural ingredients with modern cosmetic science to create products that are elegant, effective, and thoughtfully crafted."
      />
    </>
  );
}
