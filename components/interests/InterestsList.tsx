"use client";

import BundleCard from "@/components/product/BundleCard";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import { useInterests } from "@/lib/interests";
import type { Bundle, Product } from "@/types";

export default function InterestsList({
  products,
  bundles,
}: {
  products: Product[];
  bundles: Bundle[];
}) {
  const interests = useInterests();

  // Server render: the browser's saved list isn't readable yet, so hold the space
  if (interests === null) return <div aria-hidden className="mt-15 h-100" />;

  const savedProducts = products.filter((p) => interests.includes(`product:${p.slug}`));
  const savedBundles = bundles.filter((b) => interests.includes(`bundle:${b.slug}`));

  if (savedProducts.length === 0 && savedBundles.length === 0) {
    return (
      <EmptyState
        className="mt-10.5"
        message="Still searching for something that catches your eye? Don’t worry! Explore our gallery of products—there’s bound to be something that piques your interest."
        cta={{ label: "See Bundles", href: "/bundles" }}
      />
    );
  }

  return (
    <>
      {savedProducts.length > 0 && (
        <div className="mt-15">
          <ProductGrid products={savedProducts} ctaLabel="Add to bag" />
        </div>
      )}
      {savedBundles.length > 0 && (
        <div className={savedProducts.length > 0 ? "mt-12" : "mt-15"}>
          <div className="grid grid-cols-3 gap-5">
            {savedBundles.map((bundle) => (
              <BundleCard key={bundle.id} {...bundle} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}