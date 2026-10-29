import { bundles } from "@/data/bundles";
import { products } from "@/data/products";
import type { BagKey } from "@/lib/bag";

export type CatalogItem = {
  key: BagKey;
  name: string;
  image: string;
  unitPrice: number;
  description?: string;
  options: string[];
  href: string;
  maxQuantity: number;
};

export function resolveItem(key: BagKey): CatalogItem | null {
  const [type, slug] = key.split(":");

  if (type === "product") {
    const product = products.find((p) => p.slug === slug);
    if (!product) return null;
    return {
      key,
      name: product.name,
      image: product.images[0],
      unitPrice: product.price,
      description: product.longDescription ?? product.description,
      options: product.options ?? [],
      href: `/products/${product.slug}`,
      maxQuantity: product.stock ?? 99,
    };
  }

  const bundle = bundles.find((b) => b.slug === slug);
  if (!bundle) return null;
  return {
    key,
    name: bundle.name,
    image: bundle.image,
    unitPrice: bundle.price,
    description: bundle.description,
    options: [`${bundle.items.length} items`, "Bundle"],
    href: `/bundles/${bundle.slug}`,
    maxQuantity: 99,
  };
}