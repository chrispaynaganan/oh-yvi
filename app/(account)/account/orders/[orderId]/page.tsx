import type { Metadata } from "next";
import { Suspense } from "react";
import OrderDetailView from "@/components/account/OrderDetailView";

export const metadata: Metadata = { title: "Order details — Oh, Yvi!" };

export default function OrderDetailPage() {
  return (
    <main className="scrollbar-soft min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-site px-15 pt-14 pb-12">
        <Suspense fallback={<div aria-hidden className="h-150" />}>
          <OrderDetailView />
        </Suspense>
      </div>
    </main>
  );
}