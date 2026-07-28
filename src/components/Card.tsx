import type { ReactNode } from "react";

type CardProps = {
  title: string;
  body?: string | string[];
  eyebrow?: string;
  /** Small ordinal shown in gold serif — used by the Ritual steps. */
  index?: string;
  media?: ReactNode;
  footer?: ReactNode;
  tone?: "cream" | "linen" | "plain";
  align?: "left" | "center";
  headingLevel?: "h3" | "h4";
  className?: string;
};

const tones = {
  cream: "bg-cream border border-gold/20",
  linen: "bg-linen border border-gold/20",
  plain: "bg-transparent border border-transparent",
};

export default function Card({
  title,
  body,
  eyebrow,
  index,
  media,
  footer,
  tone = "cream",
  align = "left",
  headingLevel: Heading = "h3",
  className = "",
}: CardProps) {
  const paragraphs = typeof body === "string" ? [body] : (body ?? []);

  return (
    <article
      className={`card-lift group flex h-full flex-col rounded-sm p-8 hover:border-gold/60 ${
        tones[tone]
      } ${align === "center" ? "text-center items-center" : "text-left"} ${className}`}
    >
      {media ? <div className="mb-7 w-full">{media}</div> : null}

      {index ? (
        <span className="mb-4 font-serif text-3xl leading-none text-gold-deep" aria-hidden="true">
          {index}
        </span>
      ) : null}

      {eyebrow ? <p className="eyebrow mb-3 text-gold-deep">{eyebrow}</p> : null}

      <Heading className="text-xl sm:text-2xl">{title}</Heading>

      {paragraphs.length > 0 ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {footer ? <div className="mt-7 pt-1">{footer}</div> : null}
    </article>
  );
}
