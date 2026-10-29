import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

export default function Recommendations({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24.25 max-xl:mt-22.5">
      <h2 className="font-serif text-28 tracking-heading text-ink max-xl:text-2xl">You Might Love These Too</h2>
      <p className="mt-7 font-mono text-base text-muted max-xl:mt-4.5 max-xl:text-sm">
        Curated recommendations selected to complement this piece.
      </p>
      <div className="mt-17 max-xl:mt-10.25">
        <ProductGrid products={products} ctaLabel="Add to bag" tabletLimit={3} />
      </div>
    </section>
  );
}