import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";
import { aboutCopy } from "@/content/about";

export const metadata: Metadata = {
  title: aboutCopy.ar.metaTitle,
  description: aboutCopy.ar.metaDescription,
};

export default function ArabicAboutPage() {
  return <AboutView locale="ar" />;
}
