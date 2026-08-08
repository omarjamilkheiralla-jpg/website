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
import { generic, genericAlt, product, productAlt } from "@/lib/media";

export const metadata: Metadata = {
  title: "About Rosica | Rooted in Nature. Driven by Science.",
  description:
    "Rosica combines carefully selected botanical ingredients with modern cosmetic science to create premium beauty products that are effective, refined, and designed for everyday rituals.",
};

const philosophy: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "seedling",
    title: "Nature First",
    body: "We begin with carefully selected botanical ingredients.",
  },
  {
    icon: "flask",
    title: "Science Backed",
    body: "Every formulation is developed using modern cosmetic science.",
  },
  {
    icon: "droplet",
    title: "Pure & Safe",
    body: "We formulate only what is needed, avoiding unnecessary complexity.",
  },
  {
    icon: "globe",
    title: "Sustainable Choice",
    body: "We care for people, nature, and responsible business practices.",
  },
];

const manufacturingMarks: { icon: IconName; label: string }[] = [
  { icon: "certificate", label: "High Quality Standards" },
  { icon: "shield", label: "Safe & Ethical Processes" },
  { icon: "globe", label: "Environmentally Responsible" },
  { icon: "beaker", label: "Certified Manufacturing" },
];

const qualityMarks: { icon: IconName; label: string }[] = [
  { icon: "leaf", label: "Carefully Selected Ingredients" },
  { icon: "droplet", label: "Premium Formulations" },
  { icon: "certificate", label: "Uncompromising Quality" },
  { icon: "sparkle", label: "Effective and Elegant" },
];

const collectionCards = [
  {
    name: "Rosica Essentials",
    tagline: "Nourish. Repair. Protect.",
    body: "Rosica Essentials provides everyday botanical care designed to nourish, repair, and protect.",
    cta: "Discover Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  {
    name: "Rosica PURE",
    tagline: "Revitalize. Strengthen. Energize.",
    body: "Rosica PURE offers advanced botanical formulations created to revitalize, strengthen, and energize.",
    cta: "Discover PURE",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: productAlt.pureBottle,
  },
];

const promiseValues: { icon: IconName; label: string }[] = [
  { icon: "seedling", label: "Botanical Excellence" },
  { icon: "mortar", label: "Thoughtful Formulation" },
  { icon: "sparkle", label: "Visible Results" },
  { icon: "leaf", label: "Inspired by Nature" },
];

/** Shared icon + label row used by the manufacturing and quality panels. */
function MarkRow({ marks }: { marks: { icon: IconName; label: string }[] }) {
  return (
    <RevealGroup as="ul" className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.08}>
      {marks.map((mark) => (
        <RevealItem as="li" key={mark.label} className="flex flex-col items-center text-center">
          <span className="text-gold">
            <Icon name={mark.icon} className="h-8 w-8" />
          </span>
          <span className="mt-3 text-xs leading-snug text-ink-muted">{mark.label}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Rosica"
        title="Rooted in Nature. Driven by Science."
        body={[
          "Rosica was founded on a simple belief: nature possesses extraordinary power to nurture, restore, and inspire confidence. By combining carefully selected botanical ingredients with modern cosmetic science, we create premium beauty products that are effective, refined, and designed for everyday rituals.",
          "Our journey begins with botanical hair care and continues toward a complete natural beauty portfolio including skin care and body care—always guided by the same commitment to quality, integrity, and innovation.",
        ]}
        image={product.rangeGroupHero}
        imageLabel={productAlt.rangeGroupHero}
        actions={<CTAButton href="#our-story">Discover Our Journey</CTAButton>}
      />

      {/* Our story + philosophy share one band, as in the approved design */}
      <Section tone="shell" id="our-story">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal className="group">
            <Media
              src={generic.labGlassware}
              alt={genericAlt.labGlassware}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="h-full min-h-72"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Our Story"
                title="A Natural Beginning"
                align="left"
                body={[
                  "Rosica was born from the desire to create premium botanical beauty products that unite the purity of nature with the precision of modern cosmetic science.",
                  "Every formula reflects our belief that beauty should be honest, carefully crafted, and supported by ingredients chosen with purpose. Through continuous research, thoughtful formulation, and respect for nature, Rosica delivers products that elevate everyday care into a premium experience.",
                ]}
              >
                <ArrowLink href="/collections">Discover Our Journey</ArrowLink>
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.18} id="philosophy">
              <p className="eyebrow mb-5 text-gold-deep">Our Philosophy</p>
              <h2 className="sr-only">Our philosophy</h2>
              <ul className="grid gap-8 sm:grid-cols-2">
                {philosophy.map((item) => (
                  <li key={item.title}>
                    <span className="text-gold">
                      <Icon name={item.icon} className="h-9 w-9" />
                    </span>
                    <h3 className="mt-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-green">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Nature + science, manufacturing, quality */}
      <Section tone="cream" divider>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Nature × Science"
              title="The Perfect Balance"
              align="left"
              body="Rosica combines botanical wisdom with scientific innovation to create products that respect the natural world while delivering visible results you can trust."
            >
              <ArrowLink href="/ingredients">Learn More About Our Ingredients</ArrowLink>
            </SectionHeading>

            <div className="group mt-10">
              <Media
                src={generic.labFlowerTube}
                alt={genericAlt.labFlowerTube}
                ratio="landscape"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Our Manufacturing"
              title="Crafted with Care"
              align="left"
              body="Our products are manufactured in facilities operating under internationally recognized quality standards, ensuring safety, consistency, hygiene, and manufacturing excellence."
            />

            <div className="group mt-10">
              <Media
                src={generic.manufacturing}
                alt={genericAlt.manufacturing}
                ratio="landscape"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>

            <MarkRow marks={manufacturingMarks} />
          </Reveal>

          <Reveal delay={0.18} id="quality">
            <SectionHeading
              eyebrow="Quality Promise"
              title="Quality You Can Trust"
              align="left"
              body="Every Rosica product reflects our commitment to carefully selected ingredients, premium formulations, and uncompromising quality. Our promise is to create natural beauty products that are effective, elegant, and developed with respect for both people and nature."
            />
            <MarkRow marks={qualityMarks} />
          </Reveal>
        </div>
      </Section>

      {/* Collections + promise share the closing band */}
      <Section tone="shell" divider>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Our Collections"
              title="Two Collections. Complete Care."
              align="left"
              body="Together they represent the first chapter of Rosica's expanding premium natural beauty portfolio."
            >
              <ArrowLink href="/collections">View All Products</ArrowLink>
            </SectionHeading>
          </Reveal>

          <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.12}>
            {collectionCards.map((collection) => (
              <RevealItem key={collection.name} className="h-full">
                <article className="card-lift group flex h-full flex-col border border-gold/20 bg-linen p-8 hover:border-gold/60">
                  <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-green">
                    {collection.name}
                  </h3>
                  <p className="mt-3 font-serif text-xl text-gold-deep">{collection.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{collection.body}</p>

                  <Media
                    src={collection.image}
                    alt={collection.imageAlt}
                    ratio="landscape"
                    position="center bottom"
                    placeholderTone="cream"
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="mt-8"
                  />

                  <div className="mt-auto pt-8">
                    <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Our promise */}
      <Section tone="green" id="promise">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our Promise"
              title="Our Promise to You"
              align="left"
              tone="light"
              body={[
                "We are committed to creating premium natural beauty products that combine carefully selected botanical ingredients with modern cosmetic science.",
                "Every product reflects our values:",
              ]}
            />
          </Reveal>

          <RevealGroup as="ul" className="grid grid-cols-2 gap-8 self-center" stagger={0.09}>
            {promiseValues.map((value) => (
              <RevealItem as="li" key={value.label} className="flex flex-col items-center text-center">
                <span className="text-gold-soft">
                  <Icon name={value.icon} className="h-9 w-9" />
                </span>
                <span className="mt-3 text-xs leading-snug text-linen/85">{value.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
