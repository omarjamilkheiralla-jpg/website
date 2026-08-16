import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { NO_INDEX } from "@/lib/site";

export const metadata: Metadata = {
  ...NO_INDEX,
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
