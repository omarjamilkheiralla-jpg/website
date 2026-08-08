import type { Metadata } from "next";
import Hero, { type HeroFeature } from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import BenefitStrip, { type Benefit } from "@/components/BenefitStrip";
import PromiseBand, { type Standard } from "@/components/PromiseBand";
import { generic, genericAlt, product, productAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "Rosica Essentials | Daily Botanical Care",
  description:
    "Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect for healthy, beautiful hair every day.",
};

const heroFeatures: HeroFeature[] = [
  { icon: "shield", label: "Protect" },
  { icon: "waves", label: "Strengthen" },
  { icon: "scales", label: "Balance" },
];

/** Benefit copy transcribed from the approved Essentials artwork. */
const benefits: Benefit[] = [
  {
    icon: "leaf",
    title: "Natural & Gentle",
    body: "Formulated with carefully selected botanical ingredients to be gentle on your hair and scalp every day.",
    image: generic.chamomile,
    imageAlt: genericAlt.chamomile,
  },
  {
    icon: "molecule",
    title: "Effective Results",
    body: "Advanced botanicals work in harmony to cleanse, nourish, and strengthen from root to tip.",
    image: generic.labFlatlay,
    imageAlt: genericAlt.labFlatlay,
  },
  {
    icon: "droplet",
    title: "For All Hair Types",
    body: "Balanced formulations suitable for all hair types, including color-treated and chemically treated hair.",
    image: generic.hairTexture,
    imageAlt: genericAlt.hairTexture,
  },
  {
    icon: "globe",
    title: "Conscious by Nature",
    body: "Created with care for you and the planet using responsible and sustainable practices.",
    image: generic.leaves,
    imageAlt: genericAlt.leaves,
  },
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
        body="Daily care essentials powered by nature. Gentle, effective formulations that cleanse, nourish, and protect for healthy, beautiful hair every day."
        features={heroFeatures}
        image={product.essentialsGroupHero}
        imageLabel={productAlt.essentialsGroupHero}
        actions={<CTAButton href="/collections">View All Essentials</CTAButton>}
      />

      <BenefitStrip heading="Collection benefits" benefits={benefits} />

      <PromiseBand
        image={generic.labGlassware}
        imageAlt={genericAlt.labGlassware}
        heading="The Rosica Essentials Promise"
        body={[
          "We believe beautiful hair begins with gentle care and powerful botanicals. Our Essentials collection brings together the best of nature and science to deliver visible results you can feel every day.",
        ]}
        standards={standards}
        statement={["Rooted in nature.", "Refined by science.", "Made for you."]}
      />
    </>
  );
}
