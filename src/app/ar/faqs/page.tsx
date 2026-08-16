import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { NO_INDEX } from "@/lib/site";

export const metadata: Metadata = {
  ...NO_INDEX,
  title: "الأسئلة الشائعة",
  description: "إجابات عن الأسئلة الأكثر تكرارًا حول منتجات روزيكا ومكوّناتها وطقوس العناية.",
};

export default function ArabicFaqsPage() {
  return (
    <ComingSoon
      locale="ar"
      eyebrow="الأسئلة الشائعة"
      title="الأسئلة الأكثر تكرارًا"
      body="إجابات عن الأسئلة التي تردنا أكثر من غيرها حول منتجات روزيكا ومكوّناتها وطقوس العناية."
    />
  );
}
