import type { Metadata } from "next";
import HomeView from "@/components/pages/HomeView";
import { homeCopy } from "@/content/home";

export const metadata: Metadata = {
  title: homeCopy.en.metaTitle,
  description: homeCopy.en.metaDescription,
};

export default function HomePage() {
  return <HomeView locale="en" />;
}
