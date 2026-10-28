import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { productsSection } from "@/data/homepage";
import { products } from "@/data/products";

export default function ProductShowcase() {
  return (
    <section className="mt-17.5 bg-surface-muted">
      <div className="mx-auto max-w-site px-15 pt-19 pb-20.5">
        <SectionHeader {...productsSection} />
        <div className="mt-23.25 grid grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}