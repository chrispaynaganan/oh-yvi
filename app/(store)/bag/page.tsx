import type { Metadata } from "next";
import BagView from "@/components/bag/BagView";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Your bag — Oh, Yvi!",
};

export default function BagPage() {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
      <CheckoutSteps className="mt-8" />
      <h1 className="mt-9.25 font-serif text-50 text-black">Your bag</h1>
      <BagView />
    </main>
  );
}