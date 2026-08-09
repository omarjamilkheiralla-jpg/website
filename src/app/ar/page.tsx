import type { Metadata } from "next";
import HomeView from "@/components/pages/HomeView";
import { homeCopy } from "@/content/home";

export const metadata: Metadata = {
  title: homeCopy.ar.metaTitle,
  description: homeCopy.ar.metaDescription,
};

export default function ArabicHomePage() {
  return <HomeView locale="ar" />;
}
