import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  /** Overrides each product's own button text, e.g. "Add to bag" */
  ctaLabel?: string;
  /** On tablets, show only this many (the rest are hidden) */
  tabletLimit?: number;
};

export default function ProductGrid({ products, ctaLabel, tabletLimit }: ProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-xl:gap-x-3.75 max-xl:gap-y-10">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          ctaLabel={ctaLabel}
          className={tabletLimit !== undefined && i >= tabletLimit ? "max-xl:hidden" : undefined}
        />
      ))}
    </div>
  );
}