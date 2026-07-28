import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { footerLinks, socialLinks } from "@/lib/navigation";

const socialIcons: Record<string, string> = {
  Instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0ZM7.6 3.5h8.8A4.1 4.1 0 0 1 20.5 7.6v8.8a4.1 4.1 0 0 1-4.1 4.1H7.6a4.1 4.1 0 0 1-4.1-4.1V7.6A4.1 4.1 0 0 1 7.6 3.5Zm0 1.7A2.4 2.4 0 0 0 5.2 7.6v8.8a2.4 2.4 0 0 0 2.4 2.4h8.8a2.4 2.4 0 0 0 2.4-2.4V7.6a2.4 2.4 0 0 0-2.4-2.4H7.6Z",
  Facebook:
    "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.63A21 21 0 0 0 14.28 3.5c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.73v8h3.27Z",
  TikTok:
    "M16.2 3.5c.3 2.2 1.6 3.5 3.8 3.7v2.5c-1.3.1-2.5-.2-3.8-1v5.6c0 4-3.2 6.4-6.5 5.6-2.6-.6-4.2-3-4-5.7.2-2.8 2.6-4.9 5.4-4.8v2.6c-.5.1-1 .2-1.4.4-1.2.5-1.8 1.8-1.4 3 .3 1.2 1.5 1.9 2.8 1.7 1.2-.2 2-1.2 2-2.6V3.5h3.1Z",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-linen">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1.1fr] lg:gap-16">
          {/* Wordmark + bilingual tagline */}
          <div>
            <Link
              href="/"
              className="font-serif text-3xl uppercase tracking-[0.18em] text-cream transition-colors hover:text-gold"
            >
              Rosica
            </Link>
            <p className="mt-6 font-serif text-xl text-linen">Your Gateway To Nature</p>
            {/* dir="rtl" so the Arabic shapes correctly; alignment stays with the
                LTR column above it. */}
            <p dir="rtl" lang="ar" className="mt-2 text-left font-serif text-xl text-gold-soft">
              بوابتك إلى الطبيعة
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer">
            <h2 className="eyebrow text-gold">Explore</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-linen/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter + social */}
          <div>
            <h2 className="eyebrow text-gold">Stay Connected</h2>
            <div className="mt-6">
              <NewsletterForm tone="light" />
            </div>

            <ul className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rosica on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-linen/25 text-linen/80 transition-[color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                      <path d={socialIcons[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-gold/25 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-linen/60">
            © {currentYear} Rosica. All rights reserved.
          </p>
          <p className="eyebrow text-linen/70">Premium Natural Beauty</p>
        </div>
      </div>
    </footer>
  );
}
