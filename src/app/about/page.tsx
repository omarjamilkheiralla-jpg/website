import type { Metadata } from "next";
import Hero from "@/components/Hero";
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
    "Rosica combines the finest botanical ingredients with advanced scientific research to create premium botanical beauty that is pure, effective, and gentle.",
};

type Mark = { icon: IconName; label: string };

/** Copy throughout transcribed from the approved About artwork. */
const philosophy: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "seedling",
    title: "Nature First",
    body: "We begin with nature's finest ingredients, carefully selected for their proven benefits.",
  },
  {
    icon: "flask",
    title: "Science Backed",
    body: "Every formula is developed through research and advanced cosmetic science.",
  },
  {
    icon: "droplet",
    title: "Pure & Safe",
    body: "We never compromise on purity. Our formulas are gentle, effective, and free from what your skin doesn't need.",
  },
  {
    icon: "globe",
    title: "Sustainable Choice",
    body: "We care for you and the planet with responsible sourcing and eco-conscious practices.",
  },
];

const manufacturingMarks: Mark[] = [
  { icon: "certificate", label: "High Quality Standards" },
  { icon: "shield", label: "Safe & Ethical Processes" },
  { icon: "globe", label: "Environmentally Responsible" },
  { icon: "beaker", label: "Certified GMP" },
];

const qualityMarks: Mark[] = [
  { icon: "leaf", label: "Carefully Selected Ingredients" },
  { icon: "droplet", label: "Sulfate-Free Formulas" },
  { icon: "beaker", label: "Paraben-Free Formulas" },
  { icon: "sparkle", label: "Performance You Can See" },
];

const promiseMarks: Mark[] = [
  { icon: "seedling", label: "Botanical Haircare" },
  { icon: "mortar", label: "Thoughtful Formulas" },
  { icon: "sparkle", label: "Visible Results" },
  { icon: "leaf", label: "Inspired by Nature" },
];

const collectionCards = [
  {
    name: "Rosica Essentials",
    tagline: "Nourish. Repair. Protect.",
    body: "Daily care with Honey & Propolis for stronger, healthier beauty.",
    cta: "Explore Essentials",
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  {
    name: "Rosica Pure",
    tagline: "Revitalize. Strengthen. Energize.",
    body: "Advanced care with Rosemary & Biotin to support natural vitality and radiance.",
    cta: "Explore Pure",
    href: "/collections/pure",
    image: product.pureBottle,
    imageAlt: productAlt.pureBottle,
  },
];

/** Icon-and-label row used by the manufacturing, quality and promise panels. */
function MarkRow({ marks }: { marks: Mark[] }) {
  return (
    <RevealGroup as="ul" className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6" stagger={0.07}>
      {marks.map((mark) => (
        <RevealItem as="li" key={mark.label} className="flex flex-col items-center text-center">
          <span className="text-gold">
            <Icon name={mark.icon} className="h-7 w-7" />
          </span>
          <span className="mt-2.5 text-[0.6875rem] leading-snug text-ink-muted">{mark.label}</span>
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
        body="Rosica was born from a simple belief: nature has the power to heal, restore, and transform. We combine the finest botanical ingredients with advanced scientific research to create premium botanical beauty that is pure, effective, and gentle."
        image={product.rangeGroupHero}
        imageLabel={productAlt.rangeGroupHero}
        actions={<CTAButton href="#our-story">Discover Our Journey</CTAButton>}
      />

      {/* Story and philosophy share one band, as in the artwork */}
      <section id="our-story" className="border-t border-gold/20 bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.15fr)_minmax(0,1.5fr)]">
          <div className="group bg-shell">
            <Media
              src={generic.labGlassware}
              alt={genericAlt.labGlassware}
              fill
              bordered={false}
              placeholderTone="cream"
              sizes="(max-width: 1024px) 100vw, 20vw"
              className="h-full min-h-60"
            />
          </div>

          <Reveal className="bg-shell px-8 py-12 sm:px-9">
            <p className="eyebrow text-gold-deep">Our Story</p>
            <h2 className="mt-3 text-[1.75rem] sm:text-3xl">A Natural Beginning</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
              <p>
                Our journey began with a desire to create clean, botanical beauty that truly works.
                Frustrated by harsh chemicals and empty promises, we returned to nature—where the
                most powerful solutions exist.
              </p>
              <p>
                Through years of research and formulation, Rosica was created to deliver visible
                results while respecting the health of you and the planet.
              </p>
            </div>
            <div className="mt-7">
              <ArrowLink href="/collections">Discover Our Journey</ArrowLink>
            </div>
          </Reveal>

          <Reveal className="bg-shell px-8 py-12 sm:px-9" delay={0.1} id="philosophy">
            <p className="eyebrow text-gold-deep">Our Philosophy</p>
            <h2 className="sr-only">Our philosophy</h2>
            <ul className="mt-7 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {philosophy.map((item) => (
                <li key={item.title} className="text-center">
                  <span className="inline-flex text-gold">
                    <Icon name={item.icon} className="h-9 w-9" />
                  </span>
                  <h3 className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-green">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Nature × science, manufacturing and quality */}
      <section className="border-t border-gold/20 bg-cream">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.1fr)_minmax(0,0.6fr)_minmax(0,1.1fr)_minmax(0,0.6fr)_minmax(0,1.1fr)]">
          <div className="group bg-cream">
            <Media
              src={generic.labFlowerTube}
              alt={genericAlt.labFlowerTube}
              fill
              bordered={false}
              placeholderTone="shell"
              sizes="(max-width: 1024px) 100vw, 14vw"
              className="h-full min-h-56"
            />
          </div>

          <Reveal className="bg-cream px-7 py-12">
            <p className="eyebrow text-gold-deep">Nature × Science</p>
            <h2 className="mt-3 text-[1.75rem]">The Perfect Balance</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              We blend botanical wisdom with scientific innovation to create formulas that deliver
              real results—from nature, refined by science.
            </p>
            <div className="mt-7">
              <ArrowLink href="/ingredients">Learn More About Our Ingredients</ArrowLink>
            </div>
          </Reveal>

          <div className="group bg-cream">
            <Media
              src={generic.manufacturing}
              alt={genericAlt.manufacturing}
              fill
              bordered={false}
              placeholderTone="shell"
              sizes="(max-width: 1024px) 100vw, 14vw"
              className="h-full min-h-56"
            />
          </div>

          <Reveal className="bg-cream px-7 py-12" delay={0.08} id="quality">
            <p className="eyebrow text-gold-deep">Our Manufacturing</p>
            <h2 className="mt-3 text-[1.75rem]">Crafted with Care</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Our products are manufactured in world-class facilities that follow the highest
              standards of quality, safety, and hygiene.
            </p>
            <MarkRow marks={manufacturingMarks} />
          </Reveal>

          <div className="group bg-cream">
            <Media
              src={generic.labTestTubes}
              alt={genericAlt.labTestTubes}
              fill
              bordered={false}
              placeholderTone="shell"
              sizes="(max-width: 1024px) 100vw, 14vw"
              className="h-full min-h-56"
            />
          </div>

          <Reveal className="bg-cream px-7 py-12" delay={0.16}>
            <p className="eyebrow text-gold-deep">Quality You Can Trust</p>
            <h2 className="sr-only">Quality you can trust</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              We are committed to creating premium botanical beauty that is effective, honest, and
              made with a deep respect for nature and for you.
            </p>
            <MarkRow marks={qualityMarks} />
          </Reveal>
        </div>
      </section>

      {/* Collections and the promise close the page */}
      <section className="border-t border-gold/20 bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.25fr)_minmax(0,1fr)]">
          <Reveal className="bg-shell px-7 py-12">
            <p className="eyebrow text-gold-deep">Our Collections</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight">Two Collections. Complete Care.</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Discover our curated ranges, each developed with purpose, crafted with nature and
              refined by science.
            </p>
            <div className="mt-7">
              <ArrowLink href="/collections">View All Products</ArrowLink>
            </div>
          </Reveal>

          {collectionCards.map((collection, i) => (
            <Reveal
              key={collection.name}
              className="group flex items-stretch gap-4 bg-shell"
              delay={0.08 * (i + 1)}
            >
              <div className="min-w-0 flex-1 py-12 pl-7">
                <p className="eyebrow text-gold-deep">{collection.name}</p>
                <p className="mt-3 font-serif text-lg text-green">{collection.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{collection.body}</p>
                <div className="mt-6">
                  <ArrowLink href={collection.href}>{collection.cta}</ArrowLink>
                </div>
              </div>
              <div className="w-[38%] shrink-0 self-stretch">
                <Media
                  src={collection.image}
                  alt={collection.imageAlt}
                  fill
                  bordered={false}
                  position="center bottom"
                  placeholderTone="cream"
                  sizes="(max-width: 1024px) 38vw, 16vw"
                  className="h-full min-h-56"
                />
              </div>
            </Reveal>
          ))}

          <Reveal className="bg-shell px-7 py-12" delay={0.24} id="promise">
            <p className="eyebrow text-gold-deep">Our Promise to You</p>
            <h2 className="sr-only">Our promise to you</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              We are committed to creating premium botanical beauty that is effective, honest, and
              made with a deep respect for nature and for you.
            </p>
            <MarkRow marks={promiseMarks} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
