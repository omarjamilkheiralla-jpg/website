import type { Metadata } from "next";
import Hero, { type HeroFeature } from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import { generic, genericAlt, product, productAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "Rosica Pure | Advanced Botanical Care",
  description:
    "Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience.",
};

const heroFeatures: HeroFeature[] = [
  { icon: "leaf", label: "Pure" },
  { icon: "droplet", label: "Clean" },
  { icon: "lotus", label: "Restore" },
  { icon: "sparkle", label: "Revitalize" },
];

/** Benefit copy transcribed from the approved Pure artwork. */
const benefits: Benefit[] = [
  {
    icon: "leaf",
    title: "Minimal & Pure",
    body: "Sulfate-free formulations powered by carefully selected botanical ingredients.",
    image: generic.vaseLinen,
    imageAlt: genericAlt.vaseLinen,
  },
  {
    icon: "molecule",
    title: "Effective Botanicals",
    body: "Advanced botanical complexes work in harmony to nourish, strengthen, and restore.",
    image: generic.labFlaskFlower,
    imageAlt: genericAlt.labFlaskFlower,
  },
  {
    icon: "droplet",
    title: "Scalp & Hair Care",
    body: "Thoughtfully developed to support scalp comfort and promote the look of healthy, beautiful hair.",
    image: generic.hairScalp,
    imageAlt: genericAlt.hairScalp,
  },
  {
    icon: "globe",
    title: "Conscious by Nature",
    body: "Created with care for you and the planet using responsible and sustainable practices.",
    image: generic.foliage,
    imageAlt: genericAlt.foliage,
  },
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
        title="Rosica Pure"
        ornament
        body="Pure, minimal, and effective. Sulfate-free care with advanced botanical ingredients for a healthier beauty experience."
        features={heroFeatures}
        image={product.pureBottleHero}
        imageLabel={productAlt.pureBottleHero}
        actions={<CTAButton href="/collections">View All Pure Products</CTAButton>}
      />

      <BenefitStrip heading="Collection benefits" benefits={benefits} />

      <PromiseBand
        image={generic.labOverhead}
        imageAlt={genericAlt.labOverhead}
        heading="The Rosica Pure Promise"
        body={[
          "We combine the purity of nature with scientific innovation to create high-performance formulations that respect your hair and the planet.",
          "Pure care. Visible results. Made for you.",
        ]}
        standards={standards}
        statement={["Pure ingredients.", "Powerful results.", "Naturally beautiful."]}
      />
    </>
  );
}
