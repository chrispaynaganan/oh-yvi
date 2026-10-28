export type ProductStatus = "available" | "out_of_stock" | "preorder";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  type: "physical" | "digital";
  collectionSlugs: string[];
  status: ProductStatus;
  badge?: string;
  /** Button text before the price, e.g. "Get notepad" → "Get notepad (₱175)" */
  buttonLabel: string;
    /** Full text on the product page (cards use `description`) */
  longDescription?: string;
  specs?: string[];
  details?: { title: string; body: string }[];
  /** "Usually Bought With" products */
  boughtWithSlugs?: string[];
  bundleIds?: string[];
  /** ISO date; shows the red "promo ends in" timer */
  promoEndsAt?: string;
  /** Most a customer can pick in the quantity stepper */
  stock?: number;
};

export type CollectionKind = "category" | "occasion";

export type Collection = {
  id: string;
  slug: string;
  kind: CollectionKind;
  /** Card title, e.g. "For Voice Artists" */
  name: string;
  /** Breadcrumb label, e.g. "Voice Artists" (defaults to name) */
  shortName?: string;
  /** Big page title, e.g. "For Voice Artists," (defaults to name) */
  heading?: string;
  /** Short text shown on cards */
  description: string;
  /** The two paragraphs at the top of the collection page */
  intro?: string;
  aside?: string;
  image: string;
  bundleIds?: string[];
};

export type BundleItem = { name: string; price: number };

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  image: string;
  /** The bundle price; "save" is calculated from the item prices */
  price: number;
  items: BundleItem[];
};