import { Suspense } from "react";
import CheckoutSteps, { CheckoutStepsPlaceholder } from "@/components/checkout/CheckoutSteps";

// Bag → Checkout → Confirmation share this layout, so the step bar
// stays on screen and animates between pages instead of reloading.
export default function FlowLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-site px-15 pt-11.75">
      <Suspense fallback={<CheckoutStepsPlaceholder />}>
        <CheckoutSteps />
      </Suspense>
      {children}
    </div>
  );
}