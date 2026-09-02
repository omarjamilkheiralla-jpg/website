import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Media from "@/components/Media";
import Icon from "@/components/Icon";
import Reveal from "@/components/motion/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import AddToCart from "@/components/cart/AddToCart";
import { productPhoto } from "@/lib/product-media";
import Price from "@/components/Price";
import { getOffers } from "@/lib/shopify/products";
import { SHOP_URL } from "@/lib/shop";
import { localePath, type Locale } from "@/lib/i18n";
import { PRODUCT_NAMES, PRODUCT_SLUGS, productPages } from "@/content/products";
import { shopCopy } from "@/content/shop";
import { offerCopy } from "@/content/offer";
import { productPath } from "./ProductView";

/**
 * Shop — the whole range on one page, buyable without leaving the site.
 *
 * This exists because "Buy Now" used to hand people to the Shopify storefront,
 * where they had to find the product a second time before they could buy it.
 * Here the four products sit together with their prices and an Add to Bag on
 * each, so the path from wanting a bottle to paying for one is: add, checkout.
 *
 * If Shopify is unreachable the cards keep their photography and copy and the
 * button becomes a link to the store — degraded, but never a dead end.
 */
export default async function ShopView({ locale }: { locale: Locale }) {
  const copy = shopCopy[locale];
  const offers = await getOffers();

  return (
    <>
      <section className="bg-shell">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32 text-center sm:px-8 sm:pt-40">
          <Reveal>
            <p className="eyebrow text-gold-deep">{copy.eyebrow}</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.08] sm:text-5xl">{copy.title}</h1>

            <span aria-hidden="true" className="ornament-rule mx-auto mt-8 max-w-sm">
              <Icon name="sparkle" className="h-3.5 w-3.5" />
            </span>

            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink-muted">
              {copy.intro}
            </p>

            {/* The delivery offer, stated once and before the grid — a shopper
                should know the threshold while they are still choosing, not
                discover it in the bag. */}
            <div className="mt-8 flex justify-center">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-cream px-5 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-gold-deep">
                <Icon name="sparkle" className="h-3 w-3" />
                {offerCopy[locale].headline}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="cream" spacing="default">
        <RevealGroup
          as="ul"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {PRODUCT_SLUGS.map((slug) => {
            const product = productPages[locale][slug];
            const offer = offers[slug];

            return (
              <RevealItem as="li" key={slug} className="h-full">
                <article className="card-lift group flex h-full flex-col rounded-md border border-gold/20 bg-shell p-5 hover:border-gold/60">
                  <Media
                    src={productPhoto[slug].src}
                    alt={productPhoto[slug].alt}
                    ratio="square"
                    rounded
                    placeholderTone="cream"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  />

                  <p className="eyebrow mt-5 text-gold-deep">{product.collection}</p>
                  <h2 className="mt-3 font-serif text-lg leading-snug text-green">
                    {PRODUCT_NAMES[slug]}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{product.sub}</p>

                  {offer ? (
                    <Price
                      locale={locale}
                      price={offer.price}
                      compareAt={offer.compareAt}
                      className="mt-4"
                    />
                  ) : null}

                  {/* Buying sits at the bottom of every card, on one baseline. */}
                  <div className="mt-auto pt-6">
                    {offer ? (
                      <AddToCart
                        locale={locale}
                        variantId={offer.variantId}
                        available={offer.availableForSale}
                        price={Number(offer.price.amount)}
                        currency={offer.price.currencyCode}
                        className="w-full"
                      />
                    ) : (
                      <CTAButton href={SHOP_URL} external className="w-full">
                        {copy.viewInStore}
                      </CTAButton>
                    )}

                    <div className="mt-4 flex justify-center">
                      <ArrowLink
                        href={localePath(locale, productPath(slug))}
                        label={`${copy.details} — ${PRODUCT_NAMES[slug]}`}
                      >
                        {copy.details}
                      </ArrowLink>
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-sm text-ink-muted">{copy.note}</p>
        </Reveal>
      </Section>
    </>
  );
}
