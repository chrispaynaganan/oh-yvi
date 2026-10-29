import type { Metadata } from "next";
import { Suspense } from "react";
import AccountHeading from "@/components/account/AccountHeading";
import OrdersView from "@/components/account/OrdersView";

export const metadata: Metadata = { title: "Orders — Oh, Yvi!" };

export default function OrdersPage() {
  return (
    <>
      <AccountHeading title="Orders" description="Track, review, and get help with everything you’ve ordered." />
      <Suspense fallback={<div aria-hidden className="mt-8.75 h-100" />}>
        <OrdersView />
      </Suspense>
    </>
  );
}