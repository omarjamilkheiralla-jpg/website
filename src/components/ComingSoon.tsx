import Hero from "./Hero";
import Section from "./Section";
import CTAButton from "./CTAButton";
import Reveal from "./motion/Reveal";
import { localePath, type Locale } from "@/lib/i18n";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  /** Kept intentionally plain — real copy for these pages is still to come. */
  body: string;
  locale?: Locale;
};

const t = {
  en: {
    note: "This page is coming soon. In the meantime, explore the Rosica collections.",
    collections: "Explore Collections",
    story: "Learn Our Story",
  },
  ar: {
    note: "هذه الصفحة قيد الإعداد. في هذه الأثناء، تصفّح مجموعات روزيكا.",
    collections: "استكشف المجموعات",
    story: "تعرّف على قصتنا",
  },
} as const;

/**
 * Shared shell for routes that exist in the IA but have no content yet
 * (Contact, FAQs, Where to Buy, Search, legal pages).
 */
export default function ComingSoon({ eyebrow, title, body, locale = "en" }: ComingSoonProps) {
  const copy = t[locale];

  return (
    <>
      <Hero eyebrow={eyebrow} title={title} body={body} variant="panel" />

      <Section tone="cream" spacing="loose">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-base text-ink-muted">{copy.note}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href={localePath(locale, "/collections")}>{copy.collections}</CTAButton>
            <CTAButton href={localePath(locale, "/about")} variant="secondary">
              {copy.story}
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
