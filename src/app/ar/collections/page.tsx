import type { Metadata } from "next";
import CollectionsView from "@/components/pages/CollectionsView";
import { collectionsCopy } from "@/content/collections";

export const metadata: Metadata = {
  title: collectionsCopy.ar.metaTitle,
  description: collectionsCopy.ar.metaDescription,
};

export default function ArabicCollectionsPage() {
  return <CollectionsView locale="ar" />;
}
