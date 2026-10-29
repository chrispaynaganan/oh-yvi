import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  /** Overrides each product's own button text, e.g. "Add to bag" */
  ctaLabel?: string;
};

export default function ProductGrid({ products, ctaLabel }: ProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} ctaLabel={ctaLabel} />
      ))}
    </div>
  );
}