export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  type: "physical" | "digital";
  collectionIds: string[];
  inStock: boolean;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  image?: string;
};