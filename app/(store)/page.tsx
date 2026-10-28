import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedSpotlight from "@/components/sections/FeaturedSpotlight";
import Hero from "@/components/sections/Hero";
import Newsletter from "@/components/sections/Newsletter";
import OccasionShowcase from "@/components/sections/OccasionShowcase";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SaleAndStory from "@/components/sections/SaleAndStory";
import TrustStrip from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <FeaturedSpotlight />
      <CategoryGrid />
      <ProductShowcase />
      <OccasionShowcase />
      <SaleAndStory />
      <Newsletter />
    </main>
  );
}