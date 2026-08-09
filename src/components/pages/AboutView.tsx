import Hero from "@/components/Hero";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Icon, { type IconName } from "@/components/Icon";
import Media from "@/components/Media";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { generic, genericAlt, product, productAlt } from "@/lib/media";
import { localePath, type Locale } from "@/lib/i18n";
import { aboutCopy } from "@/content/about";

/** Art direction, paired with the copy by index. */
const philosophyIcons: IconName[] = ["seedling", "flask", "droplet", "globe"];

const pillarArt = [
  {
    id: undefined as string | undefined,
    image: generic.labFlowerTube,
    imageAlt: genericAlt.labFlowerTube,
    href: "/ingredients",
    markIcons: [] as IconName[],
  },
  {
    id: "quality",
    image: generic.labGlassware,
    imageAlt: genericAlt.labGlassware,
    href: undefined,
    markIcons: ["certificate", "shield", "globe", "beaker"] as IconName[],
  },
  {
    id: undefined,
    image: generic.soapLinen,
    imageAlt: genericAlt.soapLinen,
    href: undefined,
    markIcons: ["leaf", "droplet", "beaker", "sparkle"] as IconName[],
  },
];

const collectionArt = [
  {
    href: "/collections/essentials",
    image: product.essentialsGroup,
    imageAlt: productAlt.essentialsGroup,
  },
  { href: "/collections/pure", image: product.pureBottle, imageAlt: productAlt.pureBottle },
];

const promiseIcons: IconName[] = ["seedling", "mortar", "sparkle", "leaf"];

/** Icon-and-label row used by the manufacturing, quality and promise panels. */
function MarkRow({ labels, icons }: { labels: string[]; icons: IconName[] }) {
  return (
    <RevealGroup as="ul" className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6" stagger={0.07}>
      {labels.map((label, i) => (
        <RevealItem as="li" key={label} className="flex flex-col items-center text-center">
          <span className="text-gold">
            <Icon name={icons[i]} className="h-7 w-7" />
          </span>
          <span className="mt-2.5 text-[0.6875rem] leading-snug text-ink-muted">{label}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default function AboutView({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];
  const to = (href: string) => localePath(locale, href);

  return (
    <>
      <Hero
        eyebrow={copy.eyebrow}
        title={copy.title}
        body={copy.intro}
        image={product.rangeGroupHero}
        imageRtl={product.rangeGroupHeroRtl}
        imageLabel={productAlt.rangeGroupHero}
        actions={<CTAButton href="#our-story">{copy.heroCta}</CTAButton>}
      />

      {/* Story and philosophy share one band, as in the artwork */}
      <section id="our-story" className="border-t border-gold/20 bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)_minmax(0,1.5fr)]">
          <div className="group bg-shell">
            <Media
              src={generic.shadowWall}
              alt={genericAlt.shadowWall}
              fill
              bordered={false}
              placeholderTone="cream"
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="h-full min-h-[24rem]"
            />
          </div>

          <Reveal className="bg-shell px-8 py-12 sm:px-9">
            <p className="eyebrow text-gold-deep">{copy.storyEyebrow}</p>
            <h2 className="mt-3 text-[1.75rem] sm:text-3xl">{copy.storyTitle}</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
              {copy.storyBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7">
              <ArrowLink href={to("/collections")}>{copy.storyCta}</ArrowLink>
            </div>
          </Reveal>

          <Reveal className="bg-shell px-8 py-12 sm:px-9" delay={0.1} id="philosophy">
            <p className="eyebrow text-gold-deep">{copy.philosophyEyebrow}</p>
            <h2 className="sr-only">{copy.philosophyHeading}</h2>
            {/* Two across, not four: at four the copy wrapped to a column of
                single words at this cell width. */}
            <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              {copy.philosophy.map((item, i) => (
                <li key={item.title} className="text-center">
                  <span className="inline-flex text-gold">
                    <Icon name={philosophyIcons[i]} className="h-9 w-9" />
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

      {/*
        Nature × science, manufacturing and quality. Each panel carries its own
        photograph across the full cell width — narrow image columns beside the
        copy read as slivers rather than photography.
      */}
      <section className="border-t border-gold/20 bg-cream">
        <h2 className="sr-only">{copy.pillarsHeading}</h2>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-3">
          {copy.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.eyebrow}
              className="group flex flex-col bg-cream"
              delay={0.08 * i}
              id={pillarArt[i].id}
            >
              <Media
                src={pillarArt[i].image}
                alt={pillarArt[i].imageAlt}
                ratio="landscape"
                bordered={false}
                placeholderTone="shell"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              <div className="flex flex-1 flex-col px-7 py-11 sm:px-9">
                <p className="eyebrow text-gold-deep">{pillar.eyebrow}</p>
                {pillar.title ? <h3 className="mt-3 text-[1.75rem]">{pillar.title}</h3> : null}
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
                {pillar.link && pillarArt[i].href ? (
                  <div className="mt-7">
                    <ArrowLink href={to(pillarArt[i].href)}>{pillar.link}</ArrowLink>
                  </div>
                ) : null}
                {pillar.marks ? (
                  <MarkRow labels={pillar.marks} icons={pillarArt[i].markIcons} />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Collections and the promise close the page */}
      <section className="border-t border-gold/20 bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-px bg-gold/20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.25fr)_minmax(0,1fr)]">
          <Reveal className="bg-shell px-7 py-12">
            <p className="eyebrow text-gold-deep">{copy.collectionsEyebrow}</p>
            <h2 className="mt-3 text-[1.75rem] leading-tight">{copy.collectionsTitle}</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{copy.collectionsBody}</p>
            <div className="mt-7">
              <ArrowLink href={to("/collections")}>{copy.collectionsCta}</ArrowLink>
            </div>
          </Reveal>

          {copy.collections.map((collection, i) => (
            <Reveal
              key={collection.name}
              className="group flex flex-col bg-shell px-7 py-12"
              delay={0.08 * (i + 1)}
            >
              <p className="eyebrow text-gold-deep">{collection.name}</p>
              <p className="mt-3 font-serif text-lg text-green">{collection.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{collection.body}</p>
              <div className="mt-6">
                <ArrowLink href={to(collectionArt[i].href)}>{collection.cta}</ArrowLink>
              </div>
              {/* Square crop keeps every bottle whole; inset, so rounded */}
              <div className="mt-auto pt-9">
                <Media
                  src={collectionArt[i].image}
                  alt={collectionArt[i].imageAlt}
                  ratio="square"
                  rounded
                  bordered={false}
                  placeholderTone="cream"
                  sizes="(max-width: 1024px) 88vw, 320px"
                />
              </div>
            </Reveal>
          ))}

          <Reveal className="bg-shell px-7 py-12" delay={0.24} id="promise">
            <p className="eyebrow text-gold-deep">{copy.promiseEyebrow}</p>
            <h2 className="sr-only">{copy.promiseHeading}</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{copy.promiseBody}</p>
            <MarkRow labels={copy.promiseMarks} icons={promiseIcons} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
