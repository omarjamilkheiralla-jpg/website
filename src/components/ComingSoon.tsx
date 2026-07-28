import Hero from "./Hero";
import Section from "./Section";
import CTAButton from "./CTAButton";
import Reveal from "./motion/Reveal";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  /** Kept intentionally plain — real copy for these pages is still to come. */
  body: string;
};

/**
 * Shared shell for routes that exist in the IA but have no content yet
 * (Journal, Contact, Ingredient Library, FAQs, legal pages).
 */
export default function ComingSoon({ eyebrow, title, body }: ComingSoonProps) {
  return (
    <>
      <Hero eyebrow={eyebrow} title={title} body={body} variant="panel" />

      <Section tone="cream" spacing="loose">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-base text-ink-muted">
            This page is coming soon. In the meantime, explore the Rosica collections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="/collections">Explore Collections</CTAButton>
            <CTAButton href="/about" variant="secondary">
              Learn Our Story
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
