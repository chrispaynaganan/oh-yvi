import type { Metadata } from "next";
import InterestsList from "@/components/interests/InterestsList";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { bundles } from "@/data/bundles";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Interests — Oh, Yvi!",
};

export default function InterestsPage() {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-4.25">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Interests" }]} />

      <h1 className="mt-7.75 font-serif text-collection whitespace-nowrap text-accent">
        Your wishlist,
      </h1>
      <p className="mt-8.25 w-112.75 font-mono text-sm text-muted">
        We’ve placed all your interests in one place so you can visit them again without looking
        for them across multiple pages.
      </p>

      <InterestsList products={products} bundles={bundles} />
    </main>
  );
}