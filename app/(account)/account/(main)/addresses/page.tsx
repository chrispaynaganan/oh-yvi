import type { Metadata } from "next";
import AccountHeading from "@/components/account/AccountHeading";
import AddressesView from "@/components/account/AddressesView";

export const metadata: Metadata = { title: "My Addresses — Oh, Yvi!" };

export default function AddressesPage() {
  return (
    <>
      <AccountHeading
        title="My Addresses"
        description="Your primary address is selected automatically at checkout. You can change it anytime before confirming your payment."
      />
      <AddressesView />
    </>
  );
}