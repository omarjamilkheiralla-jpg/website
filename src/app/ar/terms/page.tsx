import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "الشروط التي تسري عند استخدام موقع روزيكا وخدماته.",
};

export default function ArabicTermsPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="الشؤون القانونية"
      title="الشروط والأحكام"
      body="الشروط التي تسري عند استخدامك لموقع روزيكا وخدماته."
    />
  );
}
