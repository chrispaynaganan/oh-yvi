import FeaturedSpotlight from "@/components/sections/FeaturedSpotlight";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <FeaturedSpotlight />
    </main>
  );
}