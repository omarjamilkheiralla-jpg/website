import type { Metadata } from "next";
import CollectionPageView from "@/components/pages/CollectionPageView";
import { essentialsCopy } from "@/content/collection-pages";

export const metadata: Metadata = {
  title: essentialsCopy.ar.metaTitle,
  description: essentialsCopy.ar.metaDescription,
};

export default function ArabicEssentialsPage() {
  return <CollectionPageView collection="essentials" locale="ar" />;
}
