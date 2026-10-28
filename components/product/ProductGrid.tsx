import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}