import type { Metadata } from "next";
import FaqView from "@/components/pages/FaqView";
import { faqCopy } from "@/content/faqs";

export const metadata: Metadata = {
  title: faqCopy.en.metaTitle,
  description: faqCopy.en.metaDescription,
};

export default function FaqsPage() {
  return <FaqView locale="en" />;
}
