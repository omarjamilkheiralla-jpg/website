import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { policyTitles, shippingDocument } from "@/content/legal-policies";

export const metadata: Metadata = {
  title: policyTitles.shipping.ar.title,
  description: policyTitles.shipping.ar.description,
};

export default function Page() {
  return (
    <LegalView locale="ar" title={policyTitles.shipping.ar.title} document={shippingDocument} />
  );
}
