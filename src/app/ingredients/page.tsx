import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Ingredient Library",
  description:
    "The carefully selected botanicals behind Rosica products — their traditional uses, cosmetic benefits, and role within each formulation.",
};

export default function IngredientsPage() {
  return (
    <ComingSoon
      eyebrow="INGREDIENT LIBRARY"
      title="The Power of Botanical Ingredients"
      body="Nature is at the heart of every Rosica formulation. Our Ingredient Library introduces the carefully selected botanicals behind our products, explaining their traditional uses, cosmetic benefits, and role within each formulation."
    />
  );
}
