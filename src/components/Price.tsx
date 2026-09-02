import { formatMoney } from "@/lib/shopify/client";
import type { Money } from "@/lib/shopify/types";
import type { Locale } from "@/lib/i18n";

/**
 * A price, with the former price beside it when the product is reduced.
 *
 * One component for every place a price appears, so the shop grid and the
 * product page cannot end up formatting or ordering them differently.
 *
 * Order matters and is deliberately the same in both languages: the price you
 * pay comes first, the struck-through figure second. Leading with the higher
 * number reads as the price until the eye catches the line through it.
 *
 * The strike-through is `line-through` on real text rather than a drawn rule,
 * so a screen reader announces it as text and the `sr-only` labels below say
 * which is which — otherwise the two numbers are read out with no indication
 * that one of them is not what you would be charged.
 */
export default function Price({
  locale,
  price,
  compareAt,
  className = "",
  size = "md",
}: {
  locale: Locale;
  price: Money;
  compareAt?: Money;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const now = formatMoney(price.amount, price.currencyCode, locale);
  const before = compareAt
    ? formatMoney(compareAt.amount, compareAt.currencyCode, locale)
    : null;

  const scale = {
    sm: { now: "text-lg", was: "text-sm" },
    md: { now: "text-xl", was: "text-[0.9375rem]" },
    lg: { now: "text-2xl", was: "text-base" },
  }[size];

  const labels = locale === "ar"
    ? { now: "السعر الحالي", was: "السعر السابق" }
    : { now: "Current price", was: "Previous price" };

  return (
    <p className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`font-serif ${scale.now} text-green`}>
        <span className="sr-only">{labels.now} </span>
        {now}
      </span>
      {before ? (
        <span className={`font-serif ${scale.was} text-ink-muted/70 line-through`}>
          <span className="sr-only">{labels.was} </span>
          {before}
        </span>
      ) : null}
    </p>
  );
}
