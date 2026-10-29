import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout — Oh, Yvi!",
};

export default function CheckoutPage() {
  return (
    <main>
      <h1 className="mt-9.25 font-serif text-50 text-black max-xl:mt-8 max-xl:text-32">Let’s prepare your purchase.</h1>
      <CheckoutView />
    </main>
  );
}