import type { Metadata } from "next";
import FaqView from "@/components/pages/FaqView";
import { faqCopy } from "@/content/faqs";

export const metadata: Metadata = {
  title: faqCopy.ar.metaTitle,
  description: faqCopy.ar.metaDescription,
};

export default function ArabicFaqsPage() {
  return <FaqView locale="ar" />;
}
