import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";
import CTAButton from "@/components/CTAButton";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export const metadata: Metadata = {
  title: "About Rosica | Rooted in Nature. Driven by Science.",
  description:
    "Rosica combines carefully selected botanical ingredients with modern cosmetic science to create premium beauty products that are effective, refined, and designed for everyday rituals.",
};

const philosophy = [
  { title: "Nature First", body: "We begin with carefully selected botanical ingredients." },
  {
    title: "Science Backed",
    body: "Every formulation is developed using modern cosmetic science.",
  },
  {
    title: "Pure & Safe",
    body: "We formulate only what is needed, avoiding unnecessary complexity.",
  },
  {
    title: "Sustainable Choice",
    body: "We care for people, nature, and responsible business practices.",
  },
];

const promiseValues = [
  "Botanical Excellence",
  "Thoughtful Formulation",
  "Visible Results",
  "Inspired by Nature",
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="ABOUT ROSICA"
        title="Rooted in Nature. Driven by Science."
        body={[
          "Rosica was founded on a simple belief: nature possesses extraordinary power to nurture, restore, and inspire confidence. By combining carefully selected botanical ingredients with modern cosmetic science, we create premium beauty products that are effective, refined, and designed for everyday rituals.",
          "Our journey begins with botanical hair care and continues toward a complete natural beauty portfolio including skin care and body care—always guided by the same commitment to quality, integrity, and innovation.",
        ]}
        variant="panel"
        actions={<CTAButton href="#our-story">Discover Our Journey</CTAButton>}
      />

      {/* Our story */}
      <Section tone="cream" id="our-story">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="group">
            {/* TODO: replace with real brand photography */}
            <ImagePlaceholder
              label="Rosica botanical ingredients arranged on linen"
              ratio="landscape"
              tone="linen"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow="OUR STORY"
              title="A Natural Beginning"
              align="left"
              body={[
                "Rosica was born from the desire to create premium botanical beauty products that unite the purity of nature with the precision of modern cosmetic science.",
                "Every formula reflects our belief that beauty should be honest, carefully crafted, and supported by ingredients chosen with purpose. Through continuous research, thoughtful formulation, and respect for nature, Rosica delivers products that elevate everyday care into a premium experience.",
              ]}
            >
              <CTAButton href="/collections">Discover Our Journey</CTAButton>
            </SectionHeading>
          </Reveal>
        </div>
      </Section>

      {/* Philosophy */}
      <Section tone="linen" divider>
        <Reveal className="flex justify-center">
          <SectionHeading eyebrow="OUR PHILOSOPHY" title="What Guides Every Formula" />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.map((item) => (
            <RevealItem key={item.title} className="h-full">
              <Card title={item.title} body={item.body} tone="cream" className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Nature + science */}
      <Section tone="cream">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="NATURE + SCIENCE"
            title="The Perfect Balance"
            body="Rosica combines botanical wisdom with scientific innovation to create products that respect the natural world while delivering visible results you can trust."
          >
            <CTAButton href="/ingredients">Learn More About Our Ingredients</CTAButton>
          </SectionHeading>
        </Reveal>
      </Section>

      {/* Manufacturing + quality promise */}
      <Section tone="linen" divider>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="MANUFACTURING"
              title="Crafted with Care"
              align="left"
              body="Our products are manufactured in facilities operating under internationally recognized quality standards, ensuring safety, consistency, hygiene, and manufacturing excellence."
            />
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow="QUALITY PROMISE"
              title="Quality You Can Trust"
              align="left"
              body="Every Rosica product reflects our commitment to carefully selected ingredients, premium formulations, and uncompromising quality. Our promise is to create natural beauty products that are effective, elegant, and developed with respect for both people and nature."
            />
          </Reveal>
        </div>
      </Section>

      {/* Collections */}
      <Section tone="cream">
        <Reveal className="flex justify-center">
          <SectionHeading
            eyebrow="COLLECTIONS"
            title="Two Collections. Complete Care."
            body={[
              "Rosica Essentials provides everyday botanical care designed to nourish, repair, and protect.",
              "Rosica PURE offers advanced botanical formulations created to revitalize, strengthen, and energize.",
              "Together they represent the first chapter of Rosica's expanding premium natural beauty portfolio.",
            ]}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/collections">View All Products</CTAButton>
              <CTAButton href="/collections/essentials" variant="secondary">
                Discover Essentials
              </CTAButton>
              <CTAButton href="/collections/pure" variant="secondary">
                Discover PURE
              </CTAButton>
            </div>
          </SectionHeading>
        </Reveal>
      </Section>

      {/* Our promise */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionHeading
              eyebrow="OUR PROMISE"
              title="Our Promise to You"
              tone="light"
              body={[
                "We are committed to creating premium natural beauty products that combine carefully selected botanical ingredients with modern cosmetic science.",
                "Every product reflects our values:",
              ]}
            />
          </Reveal>

          <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.09}>
            {promiseValues.map((value) => (
              <RevealItem
                as="li"
                key={value}
                className="rounded-sm border border-gold/30 px-5 py-4 font-serif text-lg text-cream transition-colors duration-300 hover:border-gold/70"
              >
                {value}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
