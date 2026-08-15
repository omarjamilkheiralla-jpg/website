import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { productPhoto } from "@/lib/product-media";
import AddToCart from "@/components/cart/AddToCart";
import { formatMoney } from "@/lib/shopify/client";
import { getOffers } from "@/lib/shopify/products";
import { SHOP_URL } from "@/lib/shop";
import { localePath, type Locale } from "@/lib/i18n";
import {
  PRODUCT_COLLECTION,
  PRODUCT_NAMES,
  PRODUCT_SLUGS,
  productChrome,
  productPages,
  type ProductSlug,
} from "@/content/products";

/** `/products/<slug>` — one product's own page. */
export const productPath = (slug: ProductSlug) => `/products/${slug}`;

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gold/25 pt-5">
      <dt className="eyebrow text-gold-deep">{label}</dt>
      <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}

export default async function ProductView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ProductSlug;
}) {
  /* Live price and stock. An empty result means Shopify is unconfigured or
     unreachable, and the page falls back to the plain store link. */
  const offers = await getOffers();
  const offer = offers[slug];

  const copy = productPages[locale][slug];
  const chrome = productChrome[locale];
  const name = PRODUCT_NAMES[slug];
  const photo = productPhoto[slug];
  const others = PRODUCT_SLUGS.filter((other) => other !== slug);

  return (
    <>
      {/* Hero: the bottle beside its own copy. */}
      <section className="bg-shell">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <Media
              src={photo.src}
              alt={photo.alt}
              ratio="square"
              rounded
              placeholderTone="cream"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-gold-deep">{copy.collection}</p>
            <h1 className="mt-4 text-[2.25rem] leading-[1.1] sm:text-[2.75rem]">{name}</h1>
            <p className="mt-3 font-serif text-xl text-green">{copy.sub}</p>

            <span aria-hidden="true" className="ornament-rule mt-7 max-w-sm">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted">{copy.lede}</p>

            {offer ? (
              <p className="mt-7 font-serif text-2xl text-green">
                {formatMoney(offer.price.amount, offer.price.currencyCode, locale)}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-4">
              {offer ? (
                <AddToCart
                  locale={locale}
                  variantId={offer.variantId}
                  available={offer.availableForSale}
                />
              ) : (
                <CTAButton href={SHOP_URL} external>
                  {chrome.buy}
                </CTAButton>
              )}
              <CTAButton
                href={localePath(locale, PRODUCT_COLLECTION[slug])}
                variant="secondary"
              >
                {chrome.viewCollection}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is actually on the pack. */}
      <Section tone="cream">
        <Reveal className="max-w-2xl">
          <h2 className="text-[2rem] leading-tight sm:text-4xl">{chrome.detailsHeading}</h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            <Detail label={chrome.sizeLabel}>{copy.size}</Detail>
            <Detail label={chrome.suitedLabel}>{copy.suitedTo}</Detail>
            <Detail label={chrome.ingredientsLabel}>
              {copy.keyIngredients.join(" · ")}
            </Detail>
            {copy.freeFrom.length > 0 ? (
              <Detail label={chrome.freeFromLabel}>{copy.freeFrom.join(" · ")}</Detail>
            ) : null}
          </dl>

          {copy.note ? (
            <p className="mt-10 max-w-2xl border-s-2 border-gold/50 ps-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              {copy.note}
            </p>
          ) : null}
        </Reveal>
      </Section>

      {/* The rest of the range. */}
      <Section tone="shell" divider>
        <Reveal>
          <h2 className="text-[2rem] leading-tight sm:text-4xl">{chrome.moreHeading}</h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
          stagger={0.09}
        >
          {others.map((other) => (
            <RevealItem as="li" key={other} className="h-full">
              <article className="card-lift flex h-full flex-col rounded-md border border-gold/20 bg-cream p-5 hover:border-gold/60">
                <Media
                  src={productPhoto[other].src}
                  alt={productPhoto[other].alt}
                  ratio="square"
                  rounded
                  placeholderTone="cream"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
                <p className="eyebrow mt-5 text-gold-deep">
                  {productPages[locale][other].collection}
                </p>
                <h3 className="mt-3 font-serif text-lg leading-snug text-green">
                  {PRODUCT_NAMES[other]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {productPages[locale][other].sub}
                </p>
                {offers[other] ? (
                  <p className="mt-3 font-serif text-lg text-green">
                    {formatMoney(
                      offers[other].price.amount,
                      offers[other].price.currencyCode,
                      locale,
                    )}
                  </p>
                ) : null}
                <div className="mt-auto pt-5">
                  <ArrowLink
                    href={localePath(locale, productPath(other))}
                    label={`${chrome.moreCta} — ${PRODUCT_NAMES[other]}`}
                  >
                    {chrome.moreCta}
                  </ArrowLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
