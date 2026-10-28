import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { productsSection } from "@/data/homepage";
import { products } from "@/data/products";

export default function ProductShowcase() {
  return (
    <section className="mt-17.5 bg-surface-muted">
      <div className="mx-auto max-w-site px-15 pt-19 pb-20.5">
        <SectionHeader {...productsSection} />
        <div className="mt-23.25">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}