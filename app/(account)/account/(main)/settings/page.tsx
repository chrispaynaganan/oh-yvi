import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Profile Settings — Oh, Yvi!" };

export default function SettingsPage() {
  return (
    <>
      <AccountHeading title="Profile Settings" />
      <EmptyState
        className="mt-12.5"
        message="Profile settings are coming soon. You’ll be able to update your name, email and password here."
        cta={{ label: "Go to my orders", href: "/account/orders" }}
      />
    </>
  );
}