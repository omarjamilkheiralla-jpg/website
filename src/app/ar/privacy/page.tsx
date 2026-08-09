import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "كيف تجمع روزيكا معلوماتك الشخصية وتستخدمها وتحميها.",
};

export default function ArabicPrivacyPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="الشؤون القانونية"
      title="سياسة الخصوصية"
      body="كيف تجمع روزيكا المعلومات الشخصية التي تشاركينها معنا، وكيف تستخدمها وتحميها."
    />
  );
}
