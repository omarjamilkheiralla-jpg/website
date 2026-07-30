import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "العربية",
  description: "النسخة العربية من موقع روزيكا قيد الإعداد.",
};

/**
 * Placeholder for the Arabic locale. This release is LTR-only, but the route
 * exists so the language toggle in the navbar never dead-ends — and it doubles
 * as a check that the layout renders correctly under dir="rtl".
 */
export default function ArabicPage() {
  return (
    <Section tone="shell" spacing="loose" className="pt-40">
      <Reveal>
        <div dir="rtl" lang="ar" className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">العربية</p>
          <h1 className="mt-5 text-4xl sm:text-5xl">النسخة العربية قريبًا</h1>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            نعمل حاليًا على إعداد النسخة العربية من موقع روزيكا.
          </p>
          <Link
            href="/"
            className="link-underline mt-10 inline-block text-sm text-green transition-colors hover:text-gold-deep"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
