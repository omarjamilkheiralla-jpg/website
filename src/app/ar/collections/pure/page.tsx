import type { Metadata } from "next";
import CollectionPageView from "@/components/pages/CollectionPageView";
import { pureCopy } from "@/content/collection-pages";

export const metadata: Metadata = {
  title: pureCopy.ar.metaTitle,
  description: pureCopy.ar.metaDescription,
};

export default function ArabicPurePage() {
  return <CollectionPageView collection="pure" locale="ar" />;
}
