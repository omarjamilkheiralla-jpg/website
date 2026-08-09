import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { contactCopy } from "@/content/contact";

export const metadata: Metadata = {
  title: contactCopy.en.metaTitle,
  description: contactCopy.en.metaDescription,
};

export default function ContactPage() {
  return <ContactView locale="en" />;
}
