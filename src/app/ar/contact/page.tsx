import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { contactCopy } from "@/content/contact";

export const metadata: Metadata = {
  title: contactCopy.ar.metaTitle,
  description: contactCopy.ar.metaDescription,
};

export default function ArabicContactPage() {
  return <ContactView locale="ar" />;
}
