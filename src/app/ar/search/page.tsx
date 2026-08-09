import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "البحث",
  description: "ابحثي في منتجات روزيكا ومكتبة المكوّنات.",
};

export default function ArabicSearchPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="البحث"
      title="ابحثي في روزيكا"
      body="البحث في المنتجات ومكتبة المكوّنات قيد الإعداد."
    />
  );
}
