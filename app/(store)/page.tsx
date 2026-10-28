import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedSpotlight from "@/components/sections/FeaturedSpotlight";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import TrustStrip from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <FeaturedSpotlight />
      <CategoryGrid />
      <ProductShowcase />
    </main>
  );
}