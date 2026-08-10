import Link from "next/link";
import BrandMark from "./BrandMark";
import { footerColumnsFor, socialLinks } from "@/lib/navigation";
import { localePath, type Locale } from "@/lib/i18n";

const t = {
  en: {
    footer: "Footer",
    blurb:
      "Rosica is a premium natural beauty brand inspired by nature and refined through modern cosmetic science.",
    joinHeading: "Follow Rosica",
    joinBody:
      "New launches, botanical stories and the world behind the formulas — shared first with our community.",
    rights: "All rights reserved.",
    social: (label: string) => `Rosica on ${label}`,
  },
  ar: {
    footer: "تذييل الصفحة",
    blurb:
      "روزيكا علامة تجارية فاخرة للجمال الطبيعي، مستوحاة من الطبيعة ومصقولة بعلوم التجميل الحديثة.",
    joinHeading: "تابعي روزيكا",
    joinBody:
      "الإصدارات الجديدة وحكايات النباتات والعالم خلف التركيبات — نشاركها أولًا مع مجتمعنا.",
    rights: "جميع الحقوق محفوظة.",
    social: (label: string) => `روزيكا على ${label}`,
  },
} as const;

const socialIcons: Record<string, string> = {
  Instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0ZM7.6 3.5h8.8A4.1 4.1 0 0 1 20.5 7.6v8.8a4.1 4.1 0 0 1-4.1 4.1H7.6a4.1 4.1 0 0 1-4.1-4.1V7.6A4.1 4.1 0 0 1 7.6 3.5Zm0 1.7A2.4 2.4 0 0 0 5.2 7.6v8.8a2.4 2.4 0 0 0 2.4 2.4h8.8a2.4 2.4 0 0 0 2.4-2.4V7.6a2.4 2.4 0 0 0-2.4-2.4H7.6Z",
  Facebook:
    "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.63A21 21 0 0 0 14.28 3.5c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.73v8h3.27Z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.2 9.4h3.6V21H3.2V9.4Zm6 0h3.45v1.6h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.32 4.3 5.35V21h-3.6v-5.75c0-1.37-.03-3.13-1.95-3.13-1.95 0-2.25 1.48-2.25 3.02V21H9.2V9.4Z",
  TikTok:
    "M16.2 3.5c.3 2.2 1.6 3.5 3.8 3.7v2.5c-1.3.1-2.5-.2-3.8-1v5.6c0 4-3.2 6.4-6.5 5.6-2.6-.6-4.2-3-4-5.7.2-2.8 2.6-4.9 5.4-4.8v2.6c-.5.1-1 .2-1.4.4-1.2.5-1.8 1.8-1.4 3 .3 1.2 1.5 1.9 2.8 1.7 1.2-.2 2-1.2 2-2.6V3.5h3.1Z",
};

/** Large gold botanical line-drawing that sits in the footer's right corner. */
function BotanicalFlourish() {
  return (
    <svg
      viewBox="0 0 240 260"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M120 250V60" />
      <path d="M120 96c0-26 18-44 50-50-3 26-21 44-50 50Z" />
      <path d="M120 140c0-26 18-44 50-50-3 26-21 44-50 50Z" />
      <path d="M120 184c0-26 18-44 50-50-3 26-21 44-50 50Z" />
      <path d="M120 118c0-26-18-44-50-50 3 26 21 44 50 50Z" />
      <path d="M120 162c0-26-18-44-50-50 3 26 21 44 50 50Z" />
      <path d="M120 206c0-26-18-44-50-50 3 26 21 44 50 50Z" />
      <path d="M120 60c0-16 8-28 24-34-2 16-10 28-24 34Z" />
    </svg>
  );
}

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const currentYear = new Date().getFullYear();
  const copy = t[locale];
  const footerColumns = footerColumnsFor(locale);

  return (
    <footer className="relative overflow-hidden bg-forest text-linen">
      {/* Decorative botanical, echoing the corner flourish in the designs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 hidden h-[85%] w-64 text-gold/25 ltr:-right-10 rtl:-left-10 rtl:-scale-x-100 lg:block"
      >
        <BotanicalFlourish />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.1fr)_minmax(0,1.2fr)] lg:gap-10">
          {/* Wordmark, bilingual tagline and brand blurb */}
          <div>
            <BrandMark size="md" tone="light" href={localePath(locale, "/")} />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-linen/75">{copy.blurb}</p>
          </div>

          {/* Link columns */}
          <nav
            aria-label={copy.footer}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
          >
            {footerColumns.map((column) => (
              <div key={column.heading}>
                {/* Two-line reserve keeps every list starting on the same
                    baseline when a heading wraps. */}
                <h2 className="eyebrow flex min-h-9 items-start text-gold-soft">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link
                        href={localePath(locale, link.href)}
                        className="link-underline text-sm text-linen/75 transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/*
            Social. This block used to carry a newsletter sign-up as well; it
            was removed because nothing was connected behind it — it thanked
            people for joining and discarded the address. Put it back only
            alongside a real mailing-list provider.
          */}
          <div id="newsletter" className="scroll-mt-28">
            <h2 className="eyebrow text-gold-soft">{copy.joinHeading}</h2>
            <p className="mt-5 text-sm leading-relaxed text-linen/75">{copy.joinBody}</p>

            <ul className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={copy.social(social.label)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-linen/25 text-linen/80 transition-[color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold motion-reduce:hover:translate-y-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={socialIcons[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-gold/25 pt-7 text-center">
          <p className="text-xs tracking-wide text-linen/75">
            © {currentYear} Rosica. {copy.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
