import type { Address } from "@/types";

// Placeholder until accounts exist; comes from the customer's profile later.
export const savedAddress: Address = {
  label: "Home",
  recipient: "Loveline Loverez",
  phone: "0912 345 6789",
  line1: "123 Sample St., Brgy. San Isidro",
  city: "Quezon City",
  province: "Metro Manila",
  postalCode: "1100",
};

export function formatAddress(a: Address) {
  return `${a.line1}, ${a.city}, ${a.province}, ${a.postalCode}`;
}