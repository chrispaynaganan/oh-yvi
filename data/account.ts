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
  return [a.line1, a.city, a.province, a.postalCode].filter(Boolean).join(", ");
}

// ---------- Placeholders until accounts exist ----------

export const currentUser = {
  name: "Juan Dela Cruz",
  email: "juandc@gmail.com",
  avatar: "/images/avatars/juan.png",
};

export type SavedAddress = Address & { id: string };

const recipient = "Loveline Loverez";

export const sampleAddresses: SavedAddress[] = [
  { id: "home", label: "Home", recipient, phone: "0912 345 6789", line1: "123 Sample St., Brgy. San Isidro", city: "Quezon City", province: "Metro Manila", postalCode: "1100" },
  { id: "office", label: "Office", recipient, phone: "0912 345 6789", line1: "123 Sample St., Brgy. San Isidro", city: "Quezon City", province: "Metro Manila", postalCode: "1100" },
  { id: "mobile", label: "Mobile", recipient, phone: "0917 654 3210", line1: "Apartment 5B, Greenfield Tower", city: "Mandaluyong City", province: "Metro Manila", postalCode: "1550" },
  { id: "billing", label: "Billing", recipient, phone: "0933 112 3344", line1: "Unit 12, Lotus Residences", city: "Pasig City", province: "Metro Manila", postalCode: "1600" },
  { id: "warehouse", label: "Warehouse", recipient, phone: "0998 223 4455", line1: "Blk 7 Lot 9, Industrial Park", city: "Calamba City", province: "Laguna", postalCode: "4023" },
  { id: "fax", label: "Fax", recipient, phone: "(02) 8765 4321", line1: "123 Sample St., Brgy. San Isidro", city: "Quezon City", province: "Metro Manila", postalCode: "1100" },
];

export type LibraryItem = {
  key: string;
  name: string;
  image: string;
  format: string;
  size: string;
  /** ISO date */
  purchasedAt: string;
  /** Product page, when the item is still sold */
  href?: string;
};

export const sampleLibrary: LibraryItem[] = [
  { key: "digital-planner-2027", name: "Digital Planner 2027", image: "/images/account/digital-thumb.png", format: "PDF", size: "12.2MB", purchasedAt: "2026-07-13" },
  { key: "wellness-journal-2027", name: "Wellness Journal 2027", image: "/images/account/digital-thumb.png", format: "EPUB", size: "8.5MB", purchasedAt: "2026-08-01" },
  { key: "finance-tracker-2027", name: "Finance Tracker 2027", image: "/images/account/digital-thumb.png", format: "XLSX", size: "5.1MB", purchasedAt: "2026-06-20" },
  { key: "meal-planner-2027", name: "Meal Planner 2027", image: "/images/account/digital-thumb.png", format: "PDF", size: "10.3MB", purchasedAt: "2026-07-30" },
  { key: "travel-itinerary-2027", name: "Travel Itinerary 2027", image: "/images/account/digital-thumb.png", format: "DOCX", size: "7.8MB", purchasedAt: "2026-08-15" },
  { key: "project-management-guide-2027", name: "Project Management Guide 2027", image: "/images/account/digital-thumb.png", format: "PDF", size: "15.6MB", purchasedAt: "2026-09-05" },
];