import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "أين تجدنا",
  description: "اعثري على روزيكا عبر متجرنا الرسمي ومتاجر التجزئة الشريكة وطلبات الجملة.",
};

export default function ArabicWhereToBuyPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="أين تجدنا"
      title="اعثري على روزيكا بالقرب منك"
      body="قوائم متجرنا الرسمي ومتاجر التجزئة الشريكة في طريقها إليك. في هذه الأثناء، تصفّحي المجموعات وتواصلي معنا لطلبات الجملة."
    />
  );
}
