import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for is no longer available.",
};

export default function NotFound() {
  return (
    <>
      <Hero
        eyebrow="404"
        title="This Page Has Wandered Off."
        body="The page you are looking for is no longer available."
        variant="panel"
      />
      <Section tone="cream" spacing="loose">
        <Reveal className="flex flex-wrap justify-center gap-4">
          <CTAButton href="/">Return Home</CTAButton>
          <CTAButton href="/collections" variant="secondary">
            Explore Collections
          </CTAButton>
        </Reveal>
      </Section>
    </>
  );
}
