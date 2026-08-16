import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { policyTitles, shippingDocument } from "@/content/legal-policies";

export const metadata: Metadata = {
  title: policyTitles.shipping.en.title,
  description: policyTitles.shipping.en.description,
};

export default function Page() {
  return (
    <LegalView locale="en" title={policyTitles.shipping.en.title} document={shippingDocument} />
  );
}
