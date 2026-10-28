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
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};