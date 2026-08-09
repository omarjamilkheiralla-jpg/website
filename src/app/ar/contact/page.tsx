import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصلي مع روزيكا لأي استفسار عن منتجات الجمال الطبيعي الفاخرة أو المجموعات أو الشراكات.",
};

export default function ArabicContactPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="تواصل معنا"
      title="يسعدنا تواصلك"
      body="يسعدنا أن نسمع منك. تواصلي معنا لأي استفسار عن منتجات روزيكا أو المجموعات أو الشراكات."
    />
  );
}
