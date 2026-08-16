import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import ArrowLink from "@/components/ArrowLink";
import Reveal from "@/components/motion/Reveal";
import { faqSchema } from "@/lib/structured-data";
import { localePath, type Locale } from "@/lib/i18n";
import { faqCopy } from "@/content/faqs";
import { questionsInTopic, text, topics } from "@/content/chat-answers";

/**
 * The FAQ page.
 *
 * Rendered from the same question bank the assistant uses, grouped by topic.
 * Every answer is plain text in the HTML rather than hidden behind a
 * disclosure: a question a reader has to click to see is a question a search
 * engine has to work to find, and there is no length here that needs hiding.
 */
export default function FaqView({ locale }: { locale: Locale }) {
  const copy = faqCopy[locale];

  return (
    <>
      <script
        type="application/ld+json"
        // Built from the content files, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(locale)) }}
      />

      <Hero
        eyebrow={copy.eyebrow}
        title={copy.title}
        body={copy.lede}
        variant="panel"
      />

      <Section tone="cream" spacing="default">
        <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          {/* Travels with the reader on a wide screen, sits above on a narrow one. */}
          <Reveal
            as="nav"
            aria-label={`${copy.title} — ${copy.contentsHeading}`}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="eyebrow text-gold-deep">{copy.contentsHeading}</h2>
            <ol className="mt-5 space-y-2.5 text-sm text-ink-muted">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href={`#${topic.id}`}
                    className="transition-colors duration-300 hover:text-green"
                  >
                    {text(topic.label, locale)}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="max-w-3xl space-y-14">
            {topics.map((topic) => (
              <Reveal
                key={topic.id}
                as="section"
                id={topic.id}
                offset={16}
                className="scroll-mt-28 border-t border-gold/25 pt-9 first:border-t-0 first:pt-0"
              >
                <h2 className="font-serif text-2xl text-green sm:text-[1.75rem]">
                  {text(topic.label, locale)}
                </h2>

                <dl className="mt-8 space-y-10">
                  {questionsInTopic(topic.id).map((question) => (
                    <div key={question.id} id={question.id} className="scroll-mt-28">
                      <dt className="font-serif text-lg leading-snug text-green">
                        {text(question.q, locale)}
                      </dt>
                      <dd className="mt-4 space-y-4 text-[0.9375rem] leading-[1.85] text-ink-muted">
                        {text(question.a, locale).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {question.link ? (
                          <p className="pt-1">
                            {question.link.external ? (
                              <a
                                href={question.link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-green underline decoration-gold/60 underline-offset-4 transition-colors duration-300 hover:text-gold-deep"
                              >
                                {text(question.link.label, locale)}
                              </a>
                            ) : (
                              <ArrowLink
                                href={localePath(locale, question.link.href)}
                                /* The same "Shop Rosica" label appears under
                                   several answers, so the accessible name has
                                   to carry its question with it. */
                                label={`${text(question.link.label, locale)} — ${text(question.q, locale)}`}
                              >
                                {text(question.link.label, locale)}
                              </ArrowLink>
                            )}
                          </p>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="shell" divider>
        <Reveal className="max-w-2xl">
          <h2 className="text-[2rem] leading-tight sm:text-4xl">
            {copy.closing.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            {copy.closing.body}
          </p>
          <div className="mt-8">
            <CTAButton href={localePath(locale, "/contact")}>
              {copy.closing.cta}
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
