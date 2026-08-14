import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { legalTitles, privacyDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: legalTitles.privacy.ar.title,
  description: legalTitles.privacy.ar.description,
};

export default function ArabicPrivacyPage() {
  return (
    <LegalView
      locale="ar"
      title={legalTitles.privacy.ar.title}
      document={privacyDocument}
    />
  );
}
