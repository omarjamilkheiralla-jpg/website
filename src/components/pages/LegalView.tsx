import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import {
  LEGAL_ENTITY,
  legalChrome,
  type LegalDocument,
  type LegalSection,
} from "@/content/legal";

type LegalViewProps = {
  locale: Locale;
  /** The heading and lede, translated; the document body is not. */
  title: string;
  document: LegalDocument;
};

function Blocks({ section }: { section: LegalSection }) {
  return (
    <div className="mt-5 space-y-5 text-[0.9375rem] leading-[1.85] text-ink-muted">
      {section.blocks.map((block, index) => {
        if (block.kind === "subheading") {
          return (
            <h3
              key={`${section.id}-${index}`}
              className="pt-3 font-serif text-lg text-green"
            >
              {block.text}
            </h3>
          );
        }

        if (block.kind === "list") {
          return (
            <div key={`${section.id}-${index}`} className="space-y-3">
              <p>{block.lead}</p>
              <ul className="space-y-2 border-s border-gold/40 ps-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }

        return <p key={`${section.id}-${index}`}>{block.text}</p>;
      })}
    </div>
  );
}

/**
 * Shared shell for the Terms of Service and the Privacy Policy.
 *
 * The document body is always rendered left-to-right and marked `lang="en"`,
 * including on the Arabic pages: the supplied documents are English, and
 * English prose set right-to-left is unreadable. The furniture around it — the
 * heading, the contents list heading, the note explaining the language — is
 * translated.
 */
export default function LegalView({ locale, title, document }: LegalViewProps) {
  const chrome = legalChrome[locale];
  const lede = [document.updated, chrome.languageNote].filter(Boolean) as string[];

  return (
    <>
      <Hero eyebrow={chrome.eyebrow} title={title} body={lede} variant="panel" />

      <Section tone="cream" spacing="default">
        <div dir="ltr" lang="en" className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          {/*
            A 25-section contract is unusable without a way in, so the contents
            list travels with the reader on wide screens and sits above the
            document on narrow ones.
          */}
          <Reveal
            as="nav"
            aria-label={`${document.title} — ${chrome.contentsHeading}`}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="eyebrow text-gold-deep">{chrome.contentsHeading}</h2>
            <ol className="mt-5 space-y-2.5 text-sm text-ink-muted">
              {document.sections
                .filter((section) => !section.untitled)
                .map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="transition-colors duration-300 hover:text-green"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href="#contact"
                  className="transition-colors duration-300 hover:text-green"
                >
                  {document.contact.heading}
                </a>
              </li>
            </ol>
          </Reveal>

          <div className="max-w-3xl space-y-12">
            {document.sections.map((section) => (
              <Reveal
                key={section.id}
                as="section"
                id={section.id}
                offset={16}
                className="scroll-mt-28 border-t border-gold/25 pt-9 first:border-t-0 first:pt-0"
              >
                {section.untitled ? null : (
                  <>
                    {section.label ? (
                      <p className="eyebrow text-gold-deep">{section.label}</p>
                    ) : null}
                    <h2
                      className={`font-serif text-2xl text-green sm:text-[1.75rem] ${
                        section.label ? "mt-3" : ""
                      }`}
                    >
                      {section.heading}
                    </h2>
                  </>
                )}
                <Blocks section={section} />
              </Reveal>
            ))}

            <Reveal
              as="section"
              id="contact"
              offset={16}
              className="scroll-mt-28 border-t border-gold/25 pt-9"
            >
              {document.contact.label ? (
                <p className="eyebrow text-gold-deep">{document.contact.label}</p>
              ) : null}
              <h2
                className={`font-serif text-2xl text-green sm:text-[1.75rem] ${
                  document.contact.label ? "mt-3" : ""
                }`}
              >
                {document.contact.heading}
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.85] text-ink-muted">
                {document.contact.lead}
              </p>

              <address className="mt-6 not-italic">
                <p className="font-serif text-lg text-green">{LEGAL_ENTITY.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{LEGAL_ENTITY.tradingAs}</p>
                <p className="mt-4 text-sm text-ink-muted">
                  <a
                    href={`mailto:${LEGAL_ENTITY.email}`}
                    className="underline decoration-gold/60 underline-offset-4 transition-colors duration-300 hover:text-green"
                  >
                    {LEGAL_ENTITY.email}
                  </a>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {LEGAL_ENTITY.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{LEGAL_ENTITY.license}</p>
              </address>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
