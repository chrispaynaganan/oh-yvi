import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Affiliates — Oh, Yvi!" };

export default function AffiliatesPage() {
  return (
    <>
      <AccountHeading title="Affiliates" />
      <EmptyState
        className="mt-12.5"
        message="Your affiliate dashboard is coming soon. You’ll see your referral link, earnings and payouts here."
        cta={{ label: "Go to my orders", href: "/account/orders" }}
      />
    </>
  );
}