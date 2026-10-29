import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { productsSection } from "@/data/homepage";
import { products } from "@/data/products";

export default function ProductShowcase() {
  return (
    <section className="mt-17.5 bg-surface-muted max-xl:mt-15">
      <div className="mx-auto max-w-site px-15 pt-19 pb-20.5 max-xl:px-6 max-xl:pt-9 max-xl:pb-5.25">
        <SectionHeader {...productsSection} />
        <div className="mt-23.25 max-xl:mt-7.5">
          <ProductGrid products={products.slice(0, 4)} tabletLimit={3} />
        </div>
        {/* Tablet: the button moves below the products */}
        {productsSection.cta && (
          <div className="mt-7.5 flex justify-center xl:hidden">
            <Button href={productsSection.cta.href} variant="outline">
              {productsSection.cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}