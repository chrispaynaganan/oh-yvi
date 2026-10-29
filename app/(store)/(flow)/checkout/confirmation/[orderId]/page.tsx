import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationView from "@/components/checkout/ConfirmationView";

export const metadata: Metadata = {
  title: "Order confirmed — Oh, Yvi!",
};

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense fallback={<div aria-hidden className="mt-9.25 h-150" />}>
        <ConfirmationView />
      </Suspense>
    </main>
  );
}